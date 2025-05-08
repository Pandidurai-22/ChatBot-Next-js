"use client";

import Chatbot from "./components/chatbot";
import "./styles/chatbot.css";

export default function Home() {

  const handleChatbotMessage = (message: string) => {
    console.log("Chatbot message:", message);
  };

  return (
    <div className={`min-h-screen overflow-hidden bg-white flex justify-center items-center flex-col`}>
      <div className={`flex-1 w-full flex flex-col overflow-y-auto justify-center items-center bg-white p-2`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-12 px-2 rounded-lg">
            <div className={`h-full flex flex-col rounded-lg `}>
              <Chatbot onMessage={handleChatbotMessage}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
