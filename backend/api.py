from livekit.agents import llm
import logging
from typing import Annotated
from db_driver import DatabaseDriver
import re
import re
logger = logging.getLogger("user-data")
logger.setLevel(logging.INFO)

DB = DatabaseDriver()

def normalize_phone_number(text: str) -> str:
    text = text.lower()
    text = text.replace("số điện thoại", "")
    text = text.replace("số", "")
    text = text.replace("là", "")
    text = text.replace("-", "")
    text = text.replace(".", "")
    # Chỉ lấy các chữ số
    digits = re.findall(r'\d+', text)
    return ''.join(digits)

def is_valid_phone(phone: str) -> bool:
    return 9 <= len(phone) <= 11 and phone.isdigit()

class AssistantFnc(llm.FunctionContext):
    def __init__(self):
        super().__init__()
        self._patient = None
        self._appointment_info = None
        self._user_name = None

    @llm.ai_callable(description="Tra cứu bệnh nhân theo số điện thoại")
    def lookup_patient(self, phone: Annotated[str, llm.TypeInfo(description="Số điện thoại của bệnh nhân")]):
        phone = normalize_phone_number(phone)
        logger.info("Tra cứu với số điện thoại: %s", phone)

        if not is_valid_phone(phone):
            return "Số điện thoại không hợp lệ. Vui lòng đọc lại số điện thoại hợp lệ (9-11 số)."

        patient = DB.get_patient_by_phone(phone)
        if patient is None:
            return "Không tìm thấy bệnh nhân. Vui lòng cung cấp thông tin để tạo hồ sơ mới."

        self._patient = patient
        return f"Đã tìm thấy bệnh nhân: {patient.name} - {patient.phone}"

    @llm.ai_callable(description="Tạo hồ sơ bệnh nhân mới")
    def create_patient(self,
                       name: Annotated[str, llm.TypeInfo(description="Họ và tên bệnh nhân")],
                       phone: Annotated[str, llm.TypeInfo(description="Số điện thoại bệnh nhân")]):
        phone = normalize_phone_number(phone)
        logger.info("Tạo hồ sơ cho số điện thoại: %s", phone)

        if not is_valid_phone(phone):
            return "Số điện thoại không hợp lệ. Vui lòng đọc lại số điện thoại hợp lệ (9-11 số)."

        patient = DB.create_patient(name, phone)
        self._patient = patient
        return f"Đã tạo hồ sơ cho bệnh nhân: {patient.name} - {patient.phone}"

    @llm.ai_callable(description="Đặt lịch khám cho bệnh nhân")
    def create_appointment(self,
                           date: Annotated[str, llm.TypeInfo(description="Ngày khám (YYYY-MM-DD)")],
                           time: Annotated[str, llm.TypeInfo(description="Giờ khám (HH:MM)")],
                           reason: Annotated[str, llm.TypeInfo(description="Lý do khám bệnh")],
                           doctor: Annotated[str, llm.TypeInfo(description="Tên bác sĩ hoặc 'chưa chọn'")]):
        if not self._patient:
            return "Chưa có hồ sơ bệnh nhân."

        DB.create_appointment(self._patient.id, date, time, reason, doctor)
        return f"Đã đặt lịch khám cho {self._patient.name} vào {date} lúc {time}, lý do: {reason}, bác sĩ: {doctor}."

    def has_patient(self):
        return self._patient is not None

    @llm.ai_callable(description="Thay đổi lịch hẹn đã đặt")
    def update_appointment(self,
                           appointment_id: Annotated[int, llm.TypeInfo(description="Mã lịch hẹn cần thay đổi")],
                           new_date: Annotated[str, llm.TypeInfo(description="Ngày khám mới (YYYY-MM-DD)")],
                           new_time: Annotated[str, llm.TypeInfo(description="Giờ khám mới (HH:MM)")],
                           new_reason: Annotated[str, llm.TypeInfo(description="Lý do khám mới")],
                           new_doctor: Annotated[str, llm.TypeInfo(description="Tên bác sĩ mới")]):
        if not self._patient:
            return "Bạn cần đăng nhập hoặc cung cấp thông tin bệnh nhân trước khi thay đổi lịch."

        success = DB.update_appointment(appointment_id, new_date, new_time, new_reason, new_doctor)
        if success:
            return f"Đã cập nhật lịch hẹn {appointment_id} thành công."
        else:
            return f"Không tìm thấy lịch hẹn với mã {appointment_id} hoặc không cập nhật được."

    @llm.ai_callable(description="Chuẩn bị đặt lịch khám, sau đó để người dùng chọn bác sĩ")
    def prepare_appointment(self,
                            date: Annotated[str, llm.TypeInfo(description="Ngày khám (YYYY-MM-DD)")],
                            time: Annotated[str, llm.TypeInfo(description="Giờ khám (HH:MM)")],
                            reason: Annotated[str, llm.TypeInfo(description="Lý do khám bệnh")]):
        if not self._patient:
            return "Chưa có hồ sơ bệnh nhân. Vui lòng tra cứu hoặc tạo mới hồ sơ trước."

        self._appointment_info = {
            "patient_id": self._patient.id,
            "date": date,
            "time": time,
            "reason": reason
        }
        return "Phòng khám hiện có hai bác sĩ: bác sĩ Đạt và bác sĩ Trí. Bạn muốn chọn ai?"

    @llm.ai_callable(description="Người dùng chọn bác sĩ cho lịch hẹn")
    def choose_doctor(self, doctor_name: Annotated[str, llm.TypeInfo(description="Tên bác sĩ: 'Đạt' hoặc 'Trí'")]):
        if not self._appointment_info:
            return "Chưa có thông tin lịch hẹn. Vui lòng cung cấp ngày, giờ và lý do khám trước."

        info = self._appointment_info
        info["doctor"] = doctor_name

        DB.create_appointment(info["patient_id"], info["date"], info["time"], info["reason"], doctor_name)
        self._appointment_info = None  # clear sau khi lưu
        return f"Bạn đã chọn bác sĩ {doctor_name}. Lịch khám vào {info['date']} lúc {info['time']} đã được ghi nhận."
