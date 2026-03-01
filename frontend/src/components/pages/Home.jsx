import React, { useState } from "react";
import "./Home.css";

const doctors = [
  {
    id: 1,
    name: "BS. Nguyễn Hữu Đạt",
    image: "/images/doctors/huudat.jpg",
    price: "500.000",
    qualifications: [
      "Danh hiệu 'Thầy thuốc Ưu tú' lần 13 năm 2020 (Bình chọn 09.2019)",
      "30 năm kinh nghiệm về Da liễu, Thẩm Mỹ Da & Phẫu Thuật Tạo Hình Thẩm Mỹ",
      "Nguyên Trưởng Khoa Phẫu thuật - Bệnh Viện Da Liễu TP. Hà Nội",
      "Giảng viên đào tạo tại Bệnh Viện Da Liễu TP. Hà Nội",
      "Tu nghiệp tại Pháp nhiều năm",
    ],
  },
  {
    id: 2,
    name: "BS. Nguyễn Khắc Trí",
    image: "/images/doctors/khactri.png",
    price: "450.000",
    qualifications: [
      "Tốt nghiệp Bác sĩ Y Khoa",
      "Chứng chỉ Chuyên sâu Khoa Da liễu",
      "28 năm kinh nghiệm Bác sĩ Da liễu",
    ],
  },
];

function Home() {
  const [bacSi, setBacSi] = useState("");
  const [ngay, setNgay] = useState("");
  const [gio, setGio] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const resetForm = () => {
    setBacSi("");
    setNgay("");
    setGio("");
    setHoTen("");
    setSoDienThoai("");
    setSelectedDoctor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: hoTen,
      phone: soDienThoai,
      date: ngay,
      time: gio,
      reason: "Khám tổng quát",
      doctor: bacSi,
    };

    try {
      const res = await fetch("/api/hen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message || "Đặt lịch thành công!");
      resetForm();
    } catch (err) {
      console.error("Lỗi khi đặt lịch:", err);
      alert("Có lỗi xảy ra khi đặt lịch!");
    }
  };

  return (
    <>
      <section className="booking-section">
        <div className="booking-container">
          <div className="left-panel">
            <h1 className="slogan">Chăm Sóc Sức Khỏe Toàn Diện</h1>
            <p className="sub-slogan">Đặt lịch khám với các bác sĩ giàu kinh nghiệm</p>

            <div className="combo-box">
              <div className="combo-title">Gói Khám Tổng Quát</div>
              <div className="combo-price">2.990.000đ</div>
              <div className="combo-note">Bao gồm 20 hạng mục xét nghiệm</div>
              <button className="book-button">Đặt lịch ngay</button>
            </div>
          </div>

          <div className="right-panel">
            <h3>ĐẶT LỊCH HẸN KHÁM</h3>
            <form className="booking-form" onSubmit={handleSubmit}>
              <select
                value={bacSi}
                onChange={(e) => {
                  setBacSi(e.target.value);
                  const doctor = doctors.find((doc) => doc.name === e.target.value);
                  setSelectedDoctor(doctor || null);
                }}
                required
              >
                <option value="">Vui lòng chọn bác sĩ</option>
                {doctors.map((doctor) => (
                  <option
                    key={doctor.id}
                    value={doctor.name}
                    data-name={doctor.name}
                    data-price={`${doctor.price}đ`}
                  >
                    {doctor.name}
                  </option>
                ))}
              </select>

              <input type="date" value={ngay} onChange={(e) => setNgay(e.target.value)} required />
              <input type="time" value={gio} onChange={(e) => setGio(e.target.value)} required />

              <input
                type="text"
                placeholder="Họ và tên"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
                required
              />

              <div className="price-display">
                <span className="price-label">Phí khám:</span>
                <span className="price-amount">
                  {selectedDoctor ? `${selectedDoctor.price}đ` : "0đ"}
                </span>
              </div>

              <button type="submit" className="next-button">
                Xác Nhận
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="doctors-section">
        <h2 className="section-title">ĐỘI NGŨ BÁC SĨ</h2>
        <div className="doctors-container">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-profile">
              <div className="doctor-image-circle">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <ul className="doctor-qualifications">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
