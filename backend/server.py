import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from twilio.rest import Client
from livekit import api
from livekit.api import LiveKitAPI, ListRoomsRequest

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ========== LIVEKIT ==========

async def generate_room_name():
    name = "room-" + str(uuid.uuid4())[:8]
    rooms = await get_rooms()
    while name in rooms:
        name = "room-" + str(uuid.uuid4())[:8]
    return name

async def get_rooms():
    api_instance = LiveKitAPI()
    rooms = await api_instance.room.list_rooms(ListRoomsRequest())
    await api_instance.aclose()
    return [room.name for room in rooms.rooms]

@app.route("/api/getToken")
async def get_token():
    name = request.args.get("name", "my name")
    room = request.args.get("room", None)

    if not room:
        room = await generate_room_name()

    token = api.AccessToken(
        os.getenv("LIVEKIT_API_KEY"),
        os.getenv("LIVEKIT_API_SECRET")
    ).with_identity(name).with_name(name).with_grants(
        api.VideoGrants(room_join=True, room=room)
    )

    return token.to_jwt()

# ========== ĐẶT LỊCH + GỬI SMS ==========

@app.route("/api/hen", methods=["POST"])
def dat_lich():
    data = request.get_json()

    name = data.get("name")
    phone = data.get("phone")
    date = data.get("date")
    time = data.get("time")
    reason = data.get("reason")
    doctor = data.get("doctor")

    from db_driver import DatabaseDriver
    db = DatabaseDriver()
    patient = db.get_patient_by_phone(phone)
    if not patient:
        patient = db.create_patient(name, phone)

    db.create_appointment(patient.id, date, time, reason, doctor)

    message = f"Xin chào {name}, bạn đã đặt lịch khám vào {date} lúc {time} với {doctor}."

    try:
        send_sms(phone, message)
    except Exception as e:
        print("Gửi SMS lỗi:", str(e))

    return jsonify({"message": message})

def send_sms(to_phone, message):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_phone = os.getenv("TWILIO_PHONE_NUMBER")

    if to_phone.startswith("0"):
        to_phone = "+84" + to_phone[1:]

    client = Client(account_sid, auth_token)
    client.messages.create(
        body=message,
        from_=from_phone,
        to=to_phone
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
