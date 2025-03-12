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

export { isAboutJesse };