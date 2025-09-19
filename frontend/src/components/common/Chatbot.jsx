import React, { useState, useEffect, useRef } from "react";

// SVG Icon Components for better readability
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

// Main App Component
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! How can I assist you today?" },
    { id: 2, sender: "user", text: "I have a question about my order." },
    {
      id: 3,
      sender: "ai",
      text: "Of course, I can help with that. Please provide your order number.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (text) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), sender: "user", text },
      ]);
      setInputValue("");
      // TODO: Add logic here to get a response from the AI
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-sans bg-gray-100">
      {/* Placeholder for website content */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Your Website Content
          </h1>
          <p className="text-gray-600 mt-2">
            The chatbot will appear at the bottom right.
          </p>
        </div>
      </div>

      {/* Chatbot UI */}
      <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
        {/* Chat Window */}
        <div
          className={`w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Chat with our AI</h3>
              <p className="text-xs text-blue-100">We're here to help!</p>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 mb-4 ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${
                    msg.sender === "ai" ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  <span>{msg.sender === "ai" ? "AI" : "U"}</span>
                </div>
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "ai"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>

        {/* Chat Bubble */}
        <button
          onClick={toggleChat}
          className={`mt-4 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 ${
            isOpen ? "hidden" : ""
          }`}
        >
          <ChatIcon />
        </button>
      </div>
    </div>
  );
}
