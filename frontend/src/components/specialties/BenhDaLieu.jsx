import React from 'react';
import './BenhDaLieu.css';

function BenhDaLieu() {
    const diseases = [
        {
            id: 1,
            name: 'Bệnh Vảy Nến',
            symptoms: ['Da đỏ có vảy trắng bạc', 'Ngứa và đau', 'Khớp sưng đau'],
            treatments: ['Thuốc bôi tại chỗ', 'Liệu pháp ánh sáng', 'Thuốc uống điều trị'],
            image: '/images/diseases/Benh-vay-nen.jpg'
        },
        {
            id: 2,
            name: 'Viêm Da Cơ Địa',
            symptoms: ['Da khô và ngứa', 'Mẩn đỏ', 'Da bong tróc'],
            treatments: ['Kem dưỡng ẩm', 'Thuốc kháng viêm', 'Chăm sóc da đặc biệt'],
            image: '/images/diseases/viem-da-co-dia.jpg'
        },
        {
            id: 3,
            name: 'Mụn Trứng Cá',
            symptoms: ['Mụn đầu đen', 'Mụn mủ', 'Sẹo mụn'],
            treatments: ['Thuốc bôi trị mụn', 'Thuốc uống', 'Điều trị bằng laser'],
            image: '/images/diseases/mun.jpg'
        }
    ];

    return (
        <div className="benh-da-lieu">
            <div className="banner">
                <h1>Điều Trị Bệnh Da Liễu</h1>
                <p>Chẩn đoán và điều trị hiệu quả các bệnh về da</p>
            </div>

            <div className="content">
                <div className="diseases-grid">
                    {diseases.map(disease => (
                        <div key={disease.id} className="disease-card">
                            <div className="disease-image">
                                <img src={disease.image} alt={disease.name} />
                            </div>
                            <div className="disease-content">
                                <h2>{disease.name}</h2>
                                <div className="symptoms">
                                    <h3>Triệu chứng:</h3>
                                    <ul>
                                        {disease.symptoms.map((symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="treatments">
                                    <h3>Phương pháp điều trị:</h3>
                                    <ul>
                                        {disease.treatments.map((treatment, index) => (
                                            <li key={index}>{treatment}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="consult-btn">Đặt lịch tư vấn</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BenhDaLieu;