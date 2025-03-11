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
        console.log("Dados recebidos da API:", data);
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
    const userMessage = { id: String(Date.now()), text, isUser: true };

    // Adiciona a mensagem do usuário à lista de mensagens
    setMessages((prev) => [...prev, userMessage]);

    // Envia a mensagem para a API e espera pela resposta
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isUser: true }),
      });

      const newMessages = await response.json();
      console.log('Resposta da API:', newMessages);

      // Verifica se a resposta é um array e atualiza o estado com a resposta
      if (Array.isArray(newMessages) && newMessages.length > 0) {
        // Adiciona as novas mensagens (bot) ao estado
        setMessages((prev) => [...prev, ...newMessages]);
      } else {
        console.error("Resposta da API não é um array válido:", newMessages);
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
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
