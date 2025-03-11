"use client";

import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/chat")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na API: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos da API:", data);  // Logando a resposta
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Resposta da API não é um array:", data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  const sendMessage = async (text: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, isUser: true }),
    });

    const newMessages = await response.json();

    console.log('rsposta aq', newMessages);
    // Verifica se newMessages é um array antes de atualizar o estado
    if (Array.isArray(newMessages)) {
      setMessages((prev) => [...prev, ...newMessages]);
    } else {
      console.error("Resposta da API não é um array:", newMessages);
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 bg-white shadow-md rounded-lg h-96 overflow-y-auto">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} text={msg.text} isUser={msg.isUser} />
      ))}
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
