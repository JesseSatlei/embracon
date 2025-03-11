import { askGemini } from '@/lib/gemini';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulando um retorno de mensagens do banco de dados
    const messagesFromDatabase = [
      { id: "1", text: "Olá, como posso ajudar?", isUser: false },
      { id: "2", text: "Oi! Preciso de ajuda.", isUser: true }
    ];
    res.status(200).json(messagesFromDatabase);
  } else if (req.method === "POST") {
    const { text, isUser } = req.body;

    // Simula salvar a mensagem no banco de dados (poderia ser feito com um banco real)
    const newMessage = { id: String(Date.now()), text, isUser };
    console.log(newMessage);

    // Após salvar a mensagem do usuário, chama a API externa para obter a resposta
    try {
      const responseText = await askGemini(text); // Função que chama a API Gemini

      // Simula salvar a resposta da API no banco de dados
      const botMessage = { id: String(Date.now() + 1), text: responseText, isUser: false };

      // Retorna as mensagens com a resposta do bot (somente a resposta do bot)
      res.status(200).json([botMessage]);
    } catch (error) {
      console.error("Erro ao obter resposta da API:", error);
      res.status(500).json({ message: "Erro ao processar a resposta da API." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}