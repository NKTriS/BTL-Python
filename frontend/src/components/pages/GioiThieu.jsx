import React from 'react';
import { FaAward, FaHospital, FaUserMd, FaCertificate } from 'react-icons/fa';
import { MdHealthAndSafety, MdSupportAgent } from 'react-icons/md';
import './GioiThieu.css';

function GioiThieu() {
    const clinicData = {
        intro: {
            title: "Phòng Khám Da Liễu Đạt Trí",
            subtitle: "Chăm sóc sức khỏe làn da của bạn",
            description: "Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là địa chỉ tin cậy trong việc chăm sóc và điều trị các vấn đề về da."
        },
        stats: [
            { number: "10+", text: "Năm kinh nghiệm" },
            { number: "50k+", text: "Khách hàng tin tưởng" },
            { number: "95%", text: "Khách hàng hài lòng" },
            { number: "20+", text: "Giải thưởng" }
        ],
        strengths: [
            {
                icon: <FaUserMd />,
                title: "Đội Ngũ Y Bác Sĩ",
                description: "Các bác sĩ có trình độ chuyên môn cao, nhiều năm kinh nghiệm trong lĩnh vực da liễu",
                details: [
                    "Tốt nghiệp từ các trường đại học Y khoa hàng đầu",
                    "Thường xuyên cập nhật kiến thức y khoa mới",
                    "Tham gia các hội thảo quốc tế về da liễu"
                ]
            },
            {
                icon: <FaHospital />,
                title: "Cơ Sở Vật Chất",
                description: "Trang thiết bị hiện đại, đạt tiêu chuẩn quốc tế",
                details: [
                    "Máy móc nhập khẩu từ Mỹ, Đức, Hàn Quốc",
                    "Phòng khám vô trùng theo tiêu chuẩn",
                    "Không gian thoáng mát, sang trọng"
                ]
            },
            {
                icon: <MdHealthAndSafety />,
                title: "Quy Trình Điều Trị",
                description: "Tuân thủ nghiêm ngặt các quy định về an toàn y tế",
                details: [
                    "Tư vấn chi tiết trước điều trị",
                    "Theo dõi sát sao trong quá trình điều trị",
                    "Chăm sóc hậu điều trị chu đáo"
                ]
            }
        ],
        certifications: [
            {
                icon: <FaAward />,
                title: "Chứng nhận ISO 9001:2015",
                description: "Đạt chuẩn quản lý chất lượng quốc tế"
            },
            {
                icon: <FaCertificate />,
                title: "Giấy phép hoạt động",
                description: "Được Sở Y tế Hà Nội cấp phép"
            }
        ],
        services: [
            "Điều trị mụn chuyên sâu",
            "Trị nám, tàn nhang",
            "Trẻ hóa da",
            "Điều trị sẹo",
            "Chăm sóc da",
            "Thẩm mỹ không phẫu thuật"
        ],
        support: {
            icon: <MdSupportAgent />,
            title: "Hỗ Trợ 24/7",
            hotline: "0914 269 346",
            email: "info@dalieudat-tri.vn"
        }
    };

    return (
        <div className="gioi-thieu">
            <section className="hero">
                <div className="hero-content">
                    <h1>{clinicData.intro.title}</h1>
                    <p className="subtitle">{clinicData.intro.subtitle}</p>
                    <p className="description">{clinicData.intro.description}</p>
                </div>
            </section>

            <section className="stats">
                {clinicData.stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <h3>{stat.number}</h3>
                        <p>{stat.text}</p>
                    </div>
                ))}
            </section>

            <section className="strengths">
                {clinicData.strengths.map((strength, index) => (
                    <div key={index} className="strength-card">
                        <div className="icon">{strength.icon}</div>
                        <h3>{strength.title}</h3>
                        <p>{strength.description}</p>
                        <ul>
                            {strength.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className="certifications">
                <h2>Chứng Nhận & Giấy Phép</h2>
                <div className="cert-container">
                    {clinicData.certifications.map((cert, index) => (
                        <div key={index} className="cert-card">
                            <div className="icon">{cert.icon}</div>
                            <h3>{cert.title}</h3>
                            <p>{cert.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="services">
                <h2>Dịch Vụ Của Chúng Tôi</h2>
                <div className="services-grid">
                    {clinicData.services.map((service, index) => (
                        <div key={index} className="service-item">
                            <span className="service-icon">✓</span>
                            {service}
                        </div>
                    ))}
                </div>
            </section>

            <section className="support">
                <div className="support-content">
                    <div className="icon">{clinicData.support.icon}</div>
                    <h2>{clinicData.support.title}</h2>
                    <p>Hotline: {clinicData.support.hotline}</p>
                    <p>Email: {clinicData.support.email}</p>
                </div>
            </section>
        </div>
    );
}

export default GioiThieu;