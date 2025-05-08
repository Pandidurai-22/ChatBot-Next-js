"use client";

import React, { useState, useRef, useEffect } from "react";
import '../styles/chatbot.css';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onMessage: (message: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock responses for different inputs
  const mockResponses: { [key: string]: string } = {
    'hello': 'Hi there! How can I help you today?',
    'how are you': 'I\'m doing well, thank you for asking!',
    'help': 'I can help you with various tasks. Just let me know what you need!',
    'default': 'I understand. Is there anything specific you\'d like to know?'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        content: mockResponses[input.toLowerCase()] || mockResponses['default'],
        role: "bot",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);

      if (onMessage) {
        onMessage(botResponse.content);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg">
      <div className="flex-1 flex flex-col rounded-lg shadow-xl overflow-hidden bg-[#ECECEC] chat-container">
        <div className="header-chatbot p-4 flex flex-col gap-3 bg-[#ECECEC] sticky top-0 z-10 border-b-4 border-white">
          <h3 className="text-lg text-black font-semibold">AI Assistant</h3>
        </div>

        <div className="flex-1 chatbot-body p-4 flex flex-col bg-[#ECECEC]">
          <div className="message-container flex-1 overflow-y-auto space-y-4 px-2 pb-4 pt-2 pr-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.role === "user" ? "user" : ""}`}
              >
                <div className="message-wrapper">
                  <div className={`message-bubble ${message.role === "user" ? "user-message" : "bot-message"}`}>
                    <div className="message-content">
                      <p className="text-sm leading-relaxed break-words">
                        {message.content}
                      </p>
                      <div className="timestamp text-gray-600">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="message-bubble bot-message bg-white p-4 rounded-2xl max-w-[85%] shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex input-chatbot items-center space-x-3 bg-[#ECECEC] p-4 rounded-lg mt-2 sticky bottom-0 z-10 border-t border-gray-200">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="chat-input w-full p-3 rounded-full border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              className="send-button flex-shrink-0 p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={handleSend}
            >
              <svg
                className="w-5 h-5 transform rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
