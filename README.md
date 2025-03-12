# Next.js Chat App

Este é um projeto baseado em [Next.js](https://nextjs.org), criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

### Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/JesseSatlei/embracon.git
npm install  # ou yarn install
```

### Rodando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev  # ou yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 📂 Estrutura de Pastas

```
├── src
│   ├── api
│   │   ├── chat
│   │   │   ├── route.ts
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessages.tsx
│   ├── lib
│   │   ├── gemini.ts
│   │   ├── prisma.ts
│   ├── styles
│   │   ├── globals.css
├── prisma
│   ├── schema.prisma
├── public
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
```

### ✨ Componentes Essenciais
- **ChatBubble.tsx** ➝ Balão de conversa para assistente/usuário.
- **ChatInput.tsx** ➝ Campo de entrada para mensagens.
- **ChatMessages.tsx** ➝ Listagem de mensagens.

## 🌍 Acessibilidade (A11y)
Este projeto segue boas práticas de acessibilidade, incluindo:
- Uso de **aria-labels** e **role attributes** para leitores de tela.
- Navegação com **teclado** e **atalhos acessíveis**.
- Alto contraste e suporte para **modo escuro**.

## 🔍 SEO e Performance
- **Meta tags** essenciais para indexação.
- Uso de **Next.js Head** para otimização.
- Implementação de **Schema.org** para melhor ranqueamento.

## 🚀 Deploy no Vercel
Foi realizado o deploy na Vercel
https://embracon-seven.vercel.app/