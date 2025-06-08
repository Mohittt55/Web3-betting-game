"use client";

import { useState, useRef, useEffect } from "react";

export default function MiniChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", fromUser: false },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { id: msgs.length + 1, text: input, fromUser: true }]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col w-full max-h-[300px] transition-all duration-300
      ${isOpen ? "h-[300px]" : "h-12"}
    `}>
      {/* Header / Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-[#7E1E2A] text-white px-4 py-2 rounded-t-lg select-none flex justify-between items-center"
      >
        <span className="font-semibold">Mini Chat</span>
        <button aria-label="Toggle chat" className="text-xl leading-none">
          {isOpen ? "−" : "+"}
        </button>
      </div>

      {/* Chat content */}
      {isOpen && (
        <>
          <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] p-2 rounded-md ${
                  msg.fromUser
                    ? "bg-[#7E1E2A] text-white self-end"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="px-4 py-2 border-t border-gray-300 dark:border-gray-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E1E2A] dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSend}
              className="bg-[#7E1E2A] hover:bg-[#5a151f] text-white px-3 py-1 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
