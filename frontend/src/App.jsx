import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

// Layout Components
import TopMenu from "./components/layout/TopMenu";
import Footer from "./components/layout/Footer";
import LiveKitModal from "./components/LiveKitModal";
import ChatAssistant from "./ChatAssistant";

// Page Components
import Home from "./components/pages/Home";
import GioiThieu from './components/pages/GioiThieu';
import HoiNghiHoiThao from './components/pages/HoiNghiHoiThao';
import TinHoatDong from './components/pages/TinHoatDong';
import ThamMy from './components/pages/ThamMy';
import Login from './components/pages/Login';

// Specialty Pages
import BenhDaLieu from './components/specialties/BenhDaLieu';
import BenhLayTruyen from './components/specialties/BenhLayTruyen';

import './styles/common.css';
import "./App.css";

function App() {
  const [showSupport, setShowSupport] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState(null);

  const handleChatClose = () => {
    setShowChat(false);
    setToken(null);
  };

  return (
    <Router>
      <div className="app">
        <TopMenu />
        <main className="main-content">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/hoi-nghi-hoi-thao" element={<HoiNghiHoiThao />} />
            <Route path="/tin-hoat-dong" element={<TinHoatDong />} />
            <Route path="/tham-my" element={<ThamMy />} />
            <Route path="/login" element={<Login />} />
            
            {/* Specialty Routes */}
            <Route path="/da-lieu" element={<BenhDaLieu />} />
            <Route path="/benh-lay-truyen" element={<BenhLayTruyen />} />
          </Routes>
        </main>
        <Footer />

        <div className="support-button" onClick={() => setShowSupport(true)}>
          <span>Trợ lý hỗ trợ y tế</span>
        </div>

        {showSupport && (
          <div className="modal-overlay">
            <LiveKitModal
              setShowSupport={setShowSupport}
              onTokenReceived={(token) => {
                setToken(token);
                setShowChat(true);
                setShowSupport(false);
              }}
            />
          </div>
        )}

        {showChat && token && (
          <ChatAssistant 
            token={token} 
            onClose={handleChatClose}
            onError={(error) => {
              console.error('Chat error:', error);
              handleChatClose();
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
