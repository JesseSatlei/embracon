  import { NextApiRequest, NextApiResponse } from 'next';

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      // Simulando um retorno de mensagens
      res.status(200).json([
        { id: "1", text: "Olá, como posso ajudar?", isUser: false },
        { id: "2", text: "Oi! Preciso de ajuda.", isUser: true }
      ]);
    } else if (req.method === "POST") {
      // Aqui você processa a mensagem enviada
      const { text, isUser } = req.body;
      const newMessage = { id: String(Date.now()), text, isUser };
      // Simula o retorno de uma nova mensagem
      res.status(200).json([newMessage]);
    } else {
      res.status(405).json({ message: "Método não permitido" });
    }
  }
