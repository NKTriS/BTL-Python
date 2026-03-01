import React, { useState } from 'react';
import './TinHoatDong.css';

function TinHoatDong() {
    const [activeCategory, setActiveCategory] = useState('all');

    const newsItems = [
        {
            id: 1,
            category: 'event',
            title: 'Chương trình khám bệnh từ thiện tại địa phương',
            date: '01/05/2025',
            image: '/images/news/kham.jpg',
            summary: 'Bệnh viện Da liễu tổ chức chương trình khám bệnh miễn phí cho người dân có hoàn cảnh khó khăn...'
        },
        {
            id: 2,
            category: 'technology',
            title: 'Ứng dụng công nghệ mới trong điều trị nám',
            date: '28/04/2025',
            image: '/images/news/congnghe.jpg',
            summary: 'Bệnh viện vừa tiếp nhận và đưa vào sử dụng công nghệ laser mới nhất trong điều trị nám...'
        },
        {
            id: 3,
            category: 'training',
            title: 'Tập huấn kỹ năng chăm sóc da cho điều dưỡng',
            date: '25/04/2025',
            image: '/images/news/train.jpeg',
            summary: 'Chương trình đào tạo nâng cao kỹ năng chăm sóc da chuyên sâu cho đội ngũ điều dưỡng...'
        }
    ];

    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'event', name: 'Sự kiện' },
        { id: 'technology', name: 'Công nghệ' },
        { id: 'training', name: 'Đào tạo' }
    ];

    const filteredNews = activeCategory === 'all' 
        ? newsItems 
        : newsItems.filter(item => item.category === activeCategory);

    return (
        <div className="tin-hoat-dong">
            <div className="banner">
                <h1>Tin Hoạt Động</h1>
                <p>Cập nhật tin tức và hoạt động mới nhất của bệnh viện</p>
            </div>

            <div className="content">
                <div className="category-filter">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="news-grid">
                    {filteredNews.map(news => (
                        <div key={news.id} className="news-card">
                            <div className="news-image">
                                <img src={news.image} alt={news.title} />
                                <div className="news-date">{news.date}</div>
                            </div>
                            <div className="news-content">
                                <h3>{news.title}</h3>
                                <p>{news.summary}</p>
                                <button className="read-more">Xem thêm</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TinHoatDong;