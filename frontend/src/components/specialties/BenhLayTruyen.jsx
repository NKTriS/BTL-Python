import React from 'react';
import './BenhLayTruyen.css';

function BenhLayTruyen() {
    return (
        <div className="benh-lay-truyen">
            <div className="banner">
                <h1>Phòng và Điều Trị Bệnh Lây Truyền</h1>
                <p>Tư vấn, chẩn đoán và điều trị kín đáo, hiệu quả</p>
            </div>

            <div className="content">
                <section className="intro-section">
                    <h2>Dịch Vụ Của Chúng Tôi</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Tư Vấn</h3>
                            <ul>
                                <li>Tư vấn phòng ngừa</li>
                                <li>Hướng dẫn bảo vệ sức khỏe</li>
                                <li>Tư vấn trước và sau xét nghiệm</li>
                            </ul>
                        </div>
                        <div className="service-card">
                            <h3>Xét Nghiệm</h3>
                            <ul>
                                <li>Xét nghiệm sàng lọc</li>
                                <li>Xét nghiệm chẩn đoán</li>
                                <li>Theo dõi điều trị</li>
                            </ul>
                        </div>
                        <div className="service-card">
                            <h3>Điều Trị</h3>
                            <ul>
                                <li>Điều trị theo phác đồ chuẩn</li>
                                <li>Theo dõi đáp ứng điều trị</li>
                                <li>Tư vấn phòng ngừa tái phát</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="commitment-section">
                    <h2>Cam Kết Của Chúng Tôi</h2>
                    <div className="commitments">
                        <div className="commitment-item">
                            <h3>Bảo Mật</h3>
                            <p>Thông tin bệnh nhân được bảo mật tuyệt đối</p>
                        </div>
                        <div className="commitment-item">
                            <h3>Chuyên Môn</h3>
                            <p>Đội ngũ bác sĩ giàu kinh nghiệm</p>
                        </div>
                        <div className="commitment-item">
                            <h3>Hiệu Quả</h3>
                            <p>Phác đồ điều trị theo tiêu chuẩn quốc tế</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BenhLayTruyen;