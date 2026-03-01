import React, { useState } from 'react';
import './HoiNghiHoiThao.css';

function HoiNghiHoiThao() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingEvents = [
        {
            id: 1,
            title: "Hội thảo về Công nghệ Laser trong điều trị da",
            date: "20/05/2025",
            location: "Hội trường chính - Bệnh viện Da liễu",
            time: "08:30 - 16:30",
            description: "Cập nhật những tiến bộ mới nhất trong ứng dụng công nghệ laser điều trị các bệnh lý da"
        },
        {
            id: 2,
            title: "Hội nghị Da liễu thẩm mỹ Quốc tế 2025",
            date: "15/06/2025",
            location: "Trung tâm Hội nghị Quốc tế",
            time: "08:00 - 17:00",
            description: "Chia sẻ kinh nghiệm và cập nhật xu hướng mới trong lĩnh vực da liễu thẩm mỹ"
        }
    ];

    const pastEvents = [
        {
            id: 3,
            title: "Hội thảo Chuyên đề về Điều trị Nám và Tàn nhang",
            date: "10/04/2025",
            location: "Hội trường 2 - Bệnh viện Da liễu",
            time: "13:30 - 17:00",
            description: "Tổng kết các phương pháp điều trị nám và tàn nhang hiệu quả"
        }
    ];

    return (
        <div className="hoi-nghi">
            <div className="banner">
                <h1>Hội Nghị - Hội Thảo</h1>
                <p>Cập nhật những kiến thức và công nghệ mới nhất trong lĩnh vực da liễu</p>
            </div>

            <div className="content">
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Sắp Diễn Ra
                    </button>
                    <button 
                        className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => setActiveTab('past')}
                    >
                        Đã Diễn Ra
                    </button>
                </div>

                <div className="events-grid">
                    {activeTab === 'upcoming' ? (
                        upcomingEvents.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-date">{event.date}</div>
                                <h3>{event.title}</h3>
                                <div className="event-details">
                                    <p><strong>Thời gian:</strong> {event.time}</p>
                                    <p><strong>Địa điểm:</strong> {event.location}</p>
                                    <p>{event.description}</p>
                                </div>
                                <button className="register-btn">Đăng ký tham dự</button>
                            </div>
                        ))
                    ) : (
                        pastEvents.map(event => (
                            <div key={event.id} className="event-card past">
                                <div className="event-date">{event.date}</div>
                                <h3>{event.title}</h3>
                                <div className="event-details">
                                    <p><strong>Thời gian:</strong> {event.time}</p>
                                    <p><strong>Địa điểm:</strong> {event.location}</p>
                                    <p>{event.description}</p>
                                </div>
                                <button className="view-summary-btn">Xem tổng kết</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default HoiNghiHoiThao;