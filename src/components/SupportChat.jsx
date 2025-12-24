import React, { useState, useRef, useEffect, useContext } from "react";
import { FaPaperPlane, FaRobot, FaMinus } from "react-icons/fa";
import aiApi from "../services/aiApi.js";
import { UserContext } from "../contexts/UserContext.jsx";
import "../css/SupportChat.css";
import ReactMarkdown from 'react-markdown';

const SupportChat = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Tin nhắn chào mừng tự động khi mở chat lần đầu
  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
            const helloText = user 
                ? `Chào ${user.full_name || user.username}! 👋\nRoomSafe AI có thể giúp gì cho việc ${user.role === 'LANDLORD' ? 'quản lý trọ' : 'tìm phòng'} của bạn?`
                : "Xin chào! 👋\nMình là trợ lý ảo RoomSafe. Bạn cần tìm phòng trọ hay đăng tin?";
            
            const timeNow = new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'});
            
            setMessages([{ sender: "bot", text: helloText, time: timeNow }]);
            setIsTyping(false);
        }, 800);
    }
  }, [isOpen, user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timeNow = new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'});

    // 1. Thêm tin nhắn User
    const userMsg = { sender: "user", text: input, time: timeNow };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 2. Gọi AI
      const role = user?.role || "GUEST";
      const res = await aiApi.chat(userMsg.text, role);
      
      const botMsg = { 
          sender: "bot", 
          text: res.data.reply, 
          time: new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'})
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Xin lỗi, server đang bận. Bạn thử lại sau nhé! 😓", time: timeNow }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="support-wrapper">
      {/* NÚT MỞ WIDGET */}
      {!isOpen && (
        <button className="support-btn" onClick={() => setIsOpen(true)}>
          <FaRobot size={30} />
        </button>
      )}

      {/* CỬA SỔ CHAT */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="cw-header">
            <div className="cw-brand">
                <div className="cw-avatar-box">
                    <div className="cw-bot-img"><FaRobot/></div>
                    <div className="cw-status-dot"></div>
                </div>
                <div className="cw-info">
                    <h3>Trợ lý RoomSafe</h3>
                    <p>Luôn sẵn sàng hỗ trợ 24/7</p>
                </div>
            </div>
            <button className="cw-close" onClick={() => setIsOpen(false)}>
                <FaMinus size={14}/>
            </button>
          </div>

          {/* Body */}
          <div className="cw-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`cw-msg ${msg.sender}`}>
                <div className="cw-bubble">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    <span className="cw-time">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
                <div className="cw-msg bot">
                    <div className="typing-indicator">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form className="cw-footer" onSubmit={handleSend}>
            <div className="cw-input-group">
                <input 
                    className="cw-input" 
                    placeholder="Nhập câu hỏi của bạn..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="cw-send-btn" type="submit" disabled={isTyping}>
                    <FaPaperPlane />
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportChat;