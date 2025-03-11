import { askGemini } from '@/lib/gemini';
import { NextApiRequest, NextApiResponse } from 'next';

// Informações sobre Jessé
const jesseInfo = {
  idade: 30, // Exemplo de idade
  trabalhosFeitos: 10, // Exemplo de quantidade de trabalhos
  curriculo: "Graduado em Engenharia de Software pela Universidade XYZ. Com 10 anos de experiência em desenvolvimento de software, trabalhando em diversas indústrias, incluindo tecnologia, saúde e educação. Experiência com diversas tecnologias como JavaScript, Node.js, Python, React, entre outras.",
  descricao: "Jessé é um profissional altamente qualificado e experiente, com uma vasta trajetória na área de tecnologia, sempre buscando inovação e soluções criativas para os desafios enfrentados no dia a dia. Sua experiência é um diferencial valioso para qualquer projeto.",
};

// Função para verificar se a pergunta está relacionada a Jessé
const isAboutJesse = (text: string) => {
  const keywords = ['jessé', 'carreira', 'trabalhos', 'currículo', 'contratar', 'experiência'];
  return keywords.some((keyword) => text.toLowerCase().includes(keyword));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulando um retorno de mensagens do banco de dados
    const messagesFromDatabase = [
      { id: "1", text: "Olá, como posso ajudar?", isUser: false },
    ];
    res.status(200).json(messagesFromDatabase);
  } else if (req.method === "POST") {
    const { text, isUser } = req.body;
    console.log(isUser);
    // Verifica se a mensagem é sobre Jessé
    if (isAboutJesse(text)) {
      // Cria o contexto com base nas informações de Jessé
      const jesseContext = `
        Jessé é um profissional altamente qualificado e experiente. Ele tem ${jesseInfo.idade} anos, com ${jesseInfo.trabalhosFeitos} projetos realizados. Seu currículo inclui habilidades em ${jesseInfo.curriculo}. 
        Responda com base nesse contexto: | ${text} |.
        De uma resposta concinsa, não precisa ser grande, apenas se foi pedido entre |<texto>|
      `;

      // Envia a pergunta com o contexto para a Gemini
      try {
        const responseText = await askGemini(jesseContext); // Função que chama a API Gemini

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
      const responseText = await askGemini(text); // Função que chama a API Gemini

      // Simula salvar a resposta da API no banco de dados
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
