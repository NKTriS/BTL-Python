import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="clinic-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>Giờ làm việc</h4>
            <p>Thứ 2 - Chủ Nhật: 8:00 - 19:00</p>
          </div>
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Hotline: 1900 1234</p>
            <p>Email: info@phongkham.com</p>
            <p>Zalo: 0914 269 346</p>
          </div>

          <div className="footer-section">
            <h4>Địa chỉ</h4>
            <p>96A, đường Trần Phú, quận Hà Đông</p>
            <p>Thành phố Hà Nội</p>
          </div>

          <div className="footer-section">
            <h4>Chứng nhận</h4>
            <p>Giấy phép hoạt động: 123/GPH-SYT</p>
            <p>Chứng nhận ISO 9001:2015</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;