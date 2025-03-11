import { askGemini } from '@/lib/gemini';
import { NextApiRequest, NextApiResponse } from 'next';

const jesseInfo = {
  idade: 24,
  trabalhosFeitos: 10,
  curriculo: "Graduado em Analise e Desenvolvimento de Sistemas pela Fatec. Com 5 a 6 anos de experiência em desenvolvimento de software, trabalhando em diversas indústrias, incluindo tecnologia, saúde e educação. Experiência com diversas tecnologias como Backend Developer | Node - PHP - Typescript - Python - Golang - Nest - Docker",
  descricao: `Jessé é um profissional dedicado e experiente em desenvolvimento de software, com expertise em diversas tecnologias.
Ao longo da sua carreira, trabalhou em empresas como Diwe, Ilia e Irroba E-commerce, desempenhando papéis-chave no desenvolvimento de soluções personalizadas para clientes e na manutenção de microsserviços e sistemas de grande escala. Como parte de equipes multidisciplinares, ele foi responsável por analisar, projetar e implementar novas funcionalidades, sempre priorizando a qualidade, segurança e eficiência dos sistemas. Sua especialização inclui:
- Backend Developer | Node - PHP - Typescript - Python - Golang - Nest - Docker
- Experiência com NodeJS, Golang, Git, APIs REST, padrões de projeto e bancos de dados relacionais como MySQL e PostgreSQL.
- Trabalhou com frameworks como NestJS e Koa.
- Está constantemente buscando aprender novas tecnologias para oferecer soluções eficazes aos clientes.
Se precisar de mais informações sobre Jessé, continue perguntando.`,
  hobbies: `Jessé tem como hobbies jogar video games (God of war o favorito), musculução, animes (Naruto o favorito), luta no geral, estudos pela alura, corrida, participou de varias corridas`
};

const isAboutJesse = (text: string) => {
  const keywords = [
    'jessé', 'jesse', 'jess',
    'carreira', 'trabalhos', 'currículo', 'experiência', 'contratar',
    'me fale mais dele', 'descreva ele', 'fale mais dele',
    'habilidades', 'profissional', 'background', 'formação', 'portfólio',
    'projetos', 'empregos', 'tecnologias', 'stack', 'expertise',
    'desenvolvedor', 'programador', 'backend', 'software engineer',
    'qualificações', 'especializações', 'skills', 'histórico',
    'porque contratar', 'porque escolher', 'porque trabalhar com',
    'sobre ele', 'quem é', 'quem foi', 'trajetória',
    'desempenho', 'conquistas', 'diferenciais', 'competências'
  ];
  return keywords.some((keyword) => text.toLowerCase().includes(keyword));
};

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
