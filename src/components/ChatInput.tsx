"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t">
      <input
        className="w-full p-2 border rounded placeholder:text-gray-600 text-gray-700"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
        Enviar
      </button>
    </div>
  );
}
