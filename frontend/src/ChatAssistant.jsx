import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";

function ChatAssistant({ token, onClose }) {
  return (
    <div className="chat-popup">
      <button className="chat-close-button" onClick={onClose}>✕</button>
      <LiveKitRoom
        token={token}
        serverUrl={import.meta.env.VITE_LIVEKIT_URL}
        connect={true}
        video={false}
        audio={true}
      />
    </div>
  );
}

export default ChatAssistant;
