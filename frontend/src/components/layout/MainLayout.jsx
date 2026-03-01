import { useState } from 'react';
import LiveKitModal from '../LiveKitModal';
import ChatAssistant from '../../ChatAssistant';

function MainLayout({ children }) {
    const [showSupport, setShowSupport] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [token, setToken] = useState(null);

    const handleChatClose = () => {
        setShowChat(false);
        setToken(null);
    };

    return (
        <>
            {children}

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
        </>
    );
}

export default MainLayout;