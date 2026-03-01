import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "./TopMenu.css";

function TopMenu() {
    const [searchValue, setSearchValue] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`top-menu ${isScrolled ? 'scrolled' : ''}`}>
            <ul className="menu-list">
                <li>
                    <Link to="/" className="menu-link">TRANG CHỦ</Link>
                </li>
                <li>
                    <Link to="/gioi-thieu" className="menu-link">GIỚI THIỆU</Link>
                </li>
                <li>
                    <Link to="/hoi-nghi-hoi-thao" className="menu-link">HỘI NGHỊ - HỘI THẢO</Link>
                </li>
                <li>
                    <Link to="/tin-hoat-dong" className="menu-link">TIN HOẠT ĐỘNG</Link>
                </li>
                <li>
                    <Link to="/tham-my" className="menu-link">THẨM MỸ</Link>
                </li>
                <li className="dropdown">
                    <span className="menu-link">CHUYÊN MÔN</span>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/da-lieu" className="dropdown-link">Bệnh Da liễu</Link>
                        </li>
                        <li>
                            <Link to="/benh-lay-truyen" className="dropdown-link">Bệnh lây truyền</Link>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="search-input"
                />
                <AiOutlineSearch className="search-icon" />
            </div>
        </nav>
    );
}

export default TopMenu;
