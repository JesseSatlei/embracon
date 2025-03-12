import ChatMessages from "@/components/ChatMessages";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-semibold text-gray-200">Entrevista com a IA</h1>
      <p className="text-gray-400 text-sm text-center">
        Este assistente de IA conhece tudo sobre mim. Faça perguntas e descubra por que sou a melhor escolha para sua equipe!
      </p>
      <div className="w-full max-w-2xl p-4 bg-gray-900 rounded-xl shadow-md border border-gray-700">
        <ChatMessages />
      </div>
    </div>
  );
}
