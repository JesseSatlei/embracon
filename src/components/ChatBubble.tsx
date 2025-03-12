import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({ text, isUser }: { text: string; isUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`p-3 rounded-lg max-w-xs ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-400"}`}
      role="alert"
      aria-live="polite"
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </motion.div>
  );
}
