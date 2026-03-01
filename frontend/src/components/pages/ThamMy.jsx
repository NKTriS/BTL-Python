import React, { useState } from 'react';
import './ThamMy.css';
import { createBooking } from '../../services/bookingService';

const aestheticServices = [
	{
		id: 1,
		category: 'Điều trị mụn',
		icon: '🔬',
		treatments: [
			{
				name: 'Trị mụn theo phác đồ y khoa',
				price: 'từ 500.000đ',
				description: 'Điều trị tận gốc, ngăn ngừa tái phát',
				includes: [
					'Thăm khám và tư vấn chuyên sâu',
					'Điều trị theo phác đồ cá nhân hóa',
					'Kê đơn thuốc và hướng dẫn chăm sóc'
				]
			},
			{
				name: 'Điều trị thâm sau mụn',
				price: 'từ 800.000đ',
				description: 'Công nghệ laser hiện đại',
				includes: [
					'Công nghệ Laser Toning',
					'Liệu trình điều trị chuẩn y khoa',
					'Phục hồi da sau điều trị'
				]
			},
			{
				name: 'Trị sẹo rỗ do mụn',
				price: 'từ 1.200.000đ',
				description: 'Phục hồi bề mặt da',
				includes: [
					'Công nghệ PRP kết hợp Laser CO2',
					'Tái tạo bề mặt da',
					'Cải thiện kết cấu da'
				]
			}
		]
	},
	{
		id: 2,
		category: 'Điều trị nám và đốm nâu',
		icon: '⚡',
		treatments: [
			{
				name: 'Trị nám da chuyên sâu',
				price: 'từ 1.500.000đ',
				description: 'Công nghệ Laser Toning',
				includes: [
					'Phân tích cường độ nám',
					'Điều trị đúng nguyên nhân',
					'Ngăn ngừa tái phát'
				]
			},
			{
				name: 'Điều trị tàn nhang',
				price: 'từ 900.000đ',
				description: 'An toàn, hiệu quả cao',
				includes: [
					'Công nghệ Laser Q-Switch',
					'Loại bỏ tàn nhang nhẹ nhàng',
					'Bảo vệ da sau điều trị'
				]
			}
		]
	},
	{
		id: 3,
		category: 'Trẻ hóa và chăm sóc da',
		icon: '✨',
		treatments: [
			{
				name: 'Trẻ hóa da đa tầng',
				price: 'từ 2.000.000đ',
				description: 'Công nghệ Ultherapy chuẩn Mỹ',
				includes: [
					'Nâng cơ không phẫu thuật',
					'Tái tạo collagen tự nhiên',
					'Kết quả duy trì lâu dài'
				]
			},
			{
				name: 'Chăm sóc da chuyên sâu',
				price: 'từ 600.000đ',
				description: 'Liệu trình cá nhân hóa',
				includes: [
					'Phân tích tình trạng da',
					'Điều trị theo nhu cầu',
					'Hướng dẫn chăm sóc tại nhà'
				]
			}
		]
	}
];

function ThamMy() {
	const [activeTab, setActiveTab] = useState('categories');
	const [selectedService, setSelectedService] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [bookingForm, setBookingForm] = useState({
		name: '',
		phone: '',
		date: '',
		time: '',
		note: ''
	});

	// Render treatments list
	const renderTreatments = () => {
		return (
			<div className="treatments-list">
				{aestheticServices.map((category) => (
					<div key={category.id} className="service-category">
						<div className="category-header">
							<span className="category-icon">{category.icon}</span>
							<h2>{category.category}</h2>
						</div>
						<div className="treatments-grid">
							{category.treatments.map((treatment, index) => (
								<div key={index} className="treatment-card">
									<h3 className="treatment-name">{treatment.name}</h3>
									<p className="treatment-description">{treatment.description}</p>
									<span className="treatment-price">{treatment.price}</span>
									<button
										className="book-button"
										onClick={() => {
											setSelectedService(treatment);
											setIsModalOpen(true);
										}}
									>
										Đặt lịch ngay
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			name: bookingForm.name,
			phone: bookingForm.phone,
			date: bookingForm.date,
			time: bookingForm.time,
			reason: selectedService ? selectedService.name : "Dịch vụ thẩm mỹ",
			doctor: bookingForm.doctor,
		};

		try {
			const res = await fetch("/api/hen", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			alert(data.message || "Đặt lịch thành công!");
			setIsModalOpen(false);
			setBookingForm({
				name: "",
				phone: "",
				date: "",
				time: "",
				note: "",
				doctor: "",
			});
		} catch (err) {
			console.error("Lỗi khi gửi form:", err);
			alert("Có lỗi xảy ra khi đặt lịch!");
		}
	};


	return (
		<div className="tham-my-container">
			<div className="hero-section">
				<h1>Dịch Vụ Thẩm Mỹ</h1>
				<p>Khám phá các liệu trình chăm sóc và điều trị thẩm mỹ tiên tiến</p>
			</div>

			{renderTreatments()}

			{isModalOpen && (
				<div className="booking-modal">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="booking-title">ĐẶT LỊCH HẸN KHÁM</h2>

						</div>
						<form onSubmit={handleSubmit} className="simple-booking-form">
							<select
								value={bookingForm.doctor}
								onChange={(e) => setBookingForm({ ...bookingForm, doctor: e.target.value })}
								required
							>
								<option value="">Vui lòng chọn bác sĩ</option>
								<option value="BS. Nguyễn Hữu Đạt">BS. Nguyễn Hữu Đạt</option>
								<option value="BS. Nguyễn Khắc Trí">BS. Nguyễn Khắc Trí</option>
							</select>

							<input
								type="date"
								value={bookingForm.date}
								onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
								min={new Date().toISOString().split('T')[0]}
								required
							/>

							<input
								type="time"
								value={bookingForm.time}
								onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
								required
							/>

							<input
								type="text"
								placeholder="Họ và tên"
								value={bookingForm.name}
								onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
								required
							/>

							<input
								type="tel"
								placeholder="Số điện thoại"
								value={bookingForm.phone}
								onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
								required
							/>

							<div className="modal-buttons">
								<button
									type="button"
									className="cancel-btn"
									onClick={() => setIsModalOpen(false)}
								>
									Hủy
								</button>
								<button type="submit" className="submit-btn">
									Đặt lịch khám
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default ThamMy;