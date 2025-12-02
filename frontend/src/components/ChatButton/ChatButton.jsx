import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatButton.css";

const ChatButton = () => {
  const navigate = useNavigate();
  return (
    <button className="chat-fab" onClick={() => navigate("/chat")}>
      💬
    </button>
  );
};

export default ChatButton;
