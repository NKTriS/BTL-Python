from __future__ import annotations
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    llm
)
from livekit.agents.multimodal import MultimodalAgent
from livekit.plugins import openai
from dotenv import load_dotenv
from api import AssistantFnc, normalize_phone_number, is_valid_phone
from prompts import WELCOME_MESSAGE, INSTRUCTIONS, LOOKUP_PHONE_MESSAGE
from langdetect import detect
import os

load_dotenv()

def is_vietnamese(text: str) -> bool:
    try:
        return detect(text) == "vi"
    except:
        return False

async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    participant = await ctx.wait_for_participant()
    user_name = participant.identity or "quý khách"
    model = openai.realtime.RealtimeModel(
        instructions=INSTRUCTIONS(user_name),
        voice="shimmer",
        temperature=0.8,
        modalities=["audio", "text"]
    )
    assistant_fnc = AssistantFnc()
    assistant = MultimodalAgent(model=model, fnc_ctx=assistant_fnc)
    assistant.start(ctx.room)

    session = model.sessions[0]
    user_name = participant.identity or "quý khách"

    session.conversation.item.create(
        llm.ChatMessage(
            role="assistant",
            content=WELCOME_MESSAGE(user_name)
        )
    )
    session.response.create()

    @session.on("user_speech_committed")
    async def on_user_speech_committed(msg: llm.ChatMessage):
        if isinstance(msg.content, list):
            msg.content = "\n".join("[image]" if isinstance(x, llm.ChatImage) else x for x in msg)

        if not is_vietnamese(msg.content):
            session.conversation.item.create(
                llm.ChatMessage(
                    role="assistant",
                    content="Xin lỗi, tôi chỉ hỗ trợ tiếng Việt. Vui lòng nói lại bằng tiếng Việt nhé."
                )
            )
            session.response.create()
            return

        normalized_phone = normalize_phone_number(msg.content)

        if assistant_fnc.has_patient():
            if "đặt lịch" in msg.content or "hẹn khám" in msg.content:
                await handle_booking()
            elif "đổi lịch" in msg.content or "thay đổi lịch" in msg.content:
                await handle_reschedule()
            else:
                handle_query(msg)
        elif is_valid_phone(normalized_phone):
            find_profile(msg)
        else:
            session.conversation.item.create(
                llm.ChatMessage(
                    role="assistant",
                    content="Xin vui lòng đọc số điện thoại của bạn để tôi kiểm tra hồ sơ."
                )
            )
            session.response.create()

    async def handle_reschedule():
        await assistant.say("Anh/chị vui lòng cung cấp mã lịch hẹn cần thay đổi (số thứ tự lịch khám).")
        appointment_id_text = await assistant.listen_text()
        appointment_id = int(''.join(filter(str.isdigit, appointment_id_text)))

        await assistant.say("Ngày khám mới là ngày nào?")
        new_date = await assistant.listen_text()

        await assistant.say("Giờ khám mới là lúc mấy giờ?")
        new_time = await assistant.listen_text()

        await assistant.say("Lý do khám mới là gì ạ?")
        new_reason = await assistant.listen_text()

        await assistant.say("Anh/chị muốn đổi sang bác sĩ nào?")
        new_doctor = await assistant.listen_text()

        result = assistant_fnc.update_appointment(appointment_id, new_date, new_time, new_reason, new_doctor)
        await assistant.say(result)

    async def handle_booking():
        await assistant.say("Bạn muốn đặt lịch khám vào ngày nào?")
        date = await assistant.listen_text()

        await assistant.say("Vào lúc mấy giờ?")
        time = await assistant.listen_text()

        await assistant.say("Bạn muốn khám về vấn đề gì ạ?")
        reason = await assistant.listen_text()

        await assistant.say(
            "Hiện tại phòng khám có ba bác sĩ: bác sĩ Nguyễn Hữu Đạt, bác sĩ Nguyễn Khắc Trí."
        )
        await assistant.say("Anh có muốn chọn bác sĩ nào không ạ? Thông tin chi tiết về các bác sĩ có thể xem trên trang web của chúng tôi.")


        response = await assistant.listen_text()
        doctor = "chưa chọn"

        if "chọn sau" in response.lower():
            await assistant.say("Dạ được, anh có thể chọn bác sĩ sau.")
        elif "có" in response.lower():
            await assistant.say("Anh muốn chọn bác sĩ nào ạ?")
            doctor = await assistant.listen_text()
        else:
            await assistant.say("Tôi hiểu, vậy tôi sẽ ghi nhận lịch mà chưa chỉ định bác sĩ cụ thể.")

        await assistant.say(f"Tôi sẽ lên lịch khám vào {date} lúc {time} cho anh. Xin anh chờ trong giây lát.")


        result = assistant_fnc.create_appointment_with_doctor(date, time, reason, doctor)
        await assistant.say(result)

    def find_profile(msg: llm.ChatMessage):
        session.conversation.item.create(
            llm.ChatMessage(
                role="system",
                content=LOOKUP_PHONE_MESSAGE(msg)
            )
        )
        session.response.create()

    def handle_query(msg: llm.ChatMessage):
        session.conversation.item.create(
            llm.ChatMessage(
                role="user",
                content=msg.content
            )
        )
        session.response.create()

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
