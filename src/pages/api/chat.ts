import { askGemini } from '@/lib/gemini';
import { jesseInfo } from '@/utils/informations';
import { isAboutJesse } from '@/utils/isAboutJesse';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {

    const messagesFromDatabase = [
      { id: "1", text: "Olá, como posso ajudar?", isUser: false },
    ];
    res.status(200).json(messagesFromDatabase);
  } else if (req.method === "POST") {
    const { text, isUser } = req.body;
    console.log(isUser);

    if (isAboutJesse(text)) {

      const jesseContext = `
        Jessé é um profissional altamente qualificado e experiente. Ele tem ${jesseInfo.idade} anos, com ${jesseInfo.trabalhosFeitos} projetos realizados. Seu currículo inclui habilidades em ${jesseInfo.curriculo}, seus hobbies são ${jesseInfo.hobbies},
        Responda com base nesse contexto: | ${text} |.
        De uma resposta concinsa, não precisa ser grande, apenas se foi pedido entre |<texto>|
      `;

      try {
        const responseText = await askGemini(jesseContext);

        // Simula salvar a resposta da API no banco de dados
        const botMessage = { id: String(Date.now() + 1), text: responseText, isUser: false };

        // Retorna a resposta gerada pela Gemini
        res.status(200).json([botMessage]);
      } catch (error) {
        console.error("Erro ao obter resposta da API:", error);
        res.status(500).json({ message: "Erro ao processar a resposta da API." });
      }
      return;
    }

    // Caso não seja sobre Jessé, chama a API externa para gerar a resposta sem contexto
    try {
      const responseText = await askGemini(text);

      const botMessage = { id: String(Date.now() + 1), text: responseText, isUser: false };

      // Retorna a resposta da API externa
      res.status(200).json([botMessage]);
    } catch (error) {
      console.error("Erro ao obter resposta da API:", error);
      res.status(500).json({ message: "Erro ao processar a resposta da API." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
