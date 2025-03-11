"use client";

export default function ChatBubble({ text, isUser }: { text: string; isUser: boolean }) {
  return (
    <div className={`p-3 rounded-lg max-w-xs ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"}`}>
      {text}
    </div>
  );
}
