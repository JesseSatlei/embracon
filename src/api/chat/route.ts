import prisma from "@/lib/prisma";
import { askGemini } from "@/lib/gemini";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { text, isUser } = req.body;

    // Verifica se a requisição está vindo com dados válidos
    if (!text || typeof isUser !== "boolean") {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    // Salva a mensagem do usuário no banco
    const userMessage = await prisma.message.create({
      data: { text, isUser: true },
    });

    // Obtém a resposta do Gemini
    const botResponse = await askGemini(text);

    // Verifica se a resposta do Gemini tem a estrutura esperada
    if (!botResponse || !botResponse.candidates || !botResponse.candidates[0].content || !botResponse.candidates[0].content.parts) {
      return res.status(500).json({ error: "Resposta inválida da API Gemini" });
    }

    // Extrai o texto da resposta do assistente
    const aiText = botResponse.candidates[0].content.parts[0].text;

    // Salva a resposta do assistente no banco
    const aiMessage = await prisma.message.create({
      data: { text: aiText, isUser: false },
    });

    // Retorna as mensagens em formato de array
    return res.status(200).json([userMessage, aiMessage]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
