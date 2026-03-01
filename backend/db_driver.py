from __future__ import annotations
import sqlite3
from typing import Optional, Annotated
from dataclasses import dataclass
from contextlib import contextmanager
import logging

logger = logging.getLogger("db-driver")
logger.setLevel(logging.INFO)

# --------- Data Classes ---------
@dataclass
class Patient:
    id: int
    name: str
    phone: str

@dataclass
class Appointment:
    id: int
    patient_id: str   # sửa từ int thành str
    date: str
    time: str
    reason: str
    doctor: str       # thêm trường doctor


# --------- Database Driver ---------
class DatabaseDriver:
    def __init__(self, db_path: str = "clinic_db.sqlite"):
        self.db_path = db_path
        self._init_db()

    @contextmanager
    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        try:
            yield conn
        finally:
            conn.close()

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS patients (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    phone TEXT NOT NULL
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS appointments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    patient_id INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    time TEXT NOT NULL,
                    reason TEXT NOT NULL,
                    doctor TEXT NOT NULL,
                    FOREIGN KEY (patient_id) REFERENCES patients(id)
                )
            """)
            conn.commit()
            logger.info("Database initialized.")

    # --------- Patient Methods ---------
    def create_patient(self, name: str, phone: str) -> Patient:
        with self._get_connection() as conn:
            cursor = conn.cursor()

            # Tìm id bệnh nhân lớn nhất hiện tại
            cursor.execute("SELECT id FROM patients ORDER BY id DESC LIMIT 1")
            last = cursor.fetchone()
            if last and last[0].startswith("BN"):
                last_num = int(last[0][2:])  # lấy phần số sau BN
                new_num = last_num + 1
            else:
                new_num = 1

            new_id = f"BN{new_num:02d}"  # format BN01, BN02, BN03,...

            cursor.execute(
                "INSERT INTO patients (id, name, phone) VALUES (?, ?, ?)",
                (new_id, name, phone)
            )
            conn.commit()
            logger.info("Created patient: %s - %s - %s", new_id, name, phone)
            return Patient(id=new_id, name=name, phone=phone)

    def get_patient_by_phone(self, phone: str) -> Optional[Patient]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, phone FROM patients WHERE phone = ?",
                (phone,)
            )
            row = cursor.fetchone()
            if not row:
                logger.info("Patient not found with phone: %s", phone)
                return None
            logger.info("Found patient: %s", row)
            return Patient(id=row[0], name=row[1], phone=row[2])

    # --------- Appointment Methods ---------
    def create_appointment(self, patient_id: str, date: str, time: str, reason: str, doctor: str) -> Appointment:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO appointments (patient_id, date, time, reason, doctor) VALUES (?, ?, ?, ?, ?)",
                (patient_id, date, time, reason, doctor)
            )
            conn.commit()
            return Appointment(id=cursor.lastrowid, patient_id=patient_id, date=date, time=time, reason=reason, doctor=doctor)


    def get_appointments_by_patient(self, patient_id: str) -> list[Appointment]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, patient_id, date, time, reason, doctor FROM appointments WHERE patient_id = ?",
                (patient_id,)
            )
            rows = cursor.fetchall()
            logger.info("Found %d appointments for patient_id %s", len(rows), patient_id)
            return [
                Appointment(
                    id=row[0], patient_id=row[1], date=row[2],
                    time=row[3], reason=row[4], doctor=row[5]
                ) for row in rows
            ]

    def update_appointment(self, appointment_id: int, new_date: str, new_time: str, new_reason: str,
                           new_doctor: str) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                UPDATE appointments
                SET date = ?, time = ?, reason = ?, doctor = ?
                WHERE id = ?
                """,
                (new_date, new_time, new_reason, new_doctor, appointment_id)
            )
            conn.commit()
            return cursor.rowcount > 0  # Trả về True nếu có dòng bị ảnh hưởng

