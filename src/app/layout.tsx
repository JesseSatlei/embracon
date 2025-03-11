import Head from "next/head";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <Head>
        <title>Entrevista IA - Jessé</title>
        <meta name="description" content="Uma IA treinada para responder perguntas sobre Jessé e sua carreira." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center h-screen p-4">
        <div className="w-full max-w-3xl bg-gray-950 shadow-lg rounded-2xl p-6 border border-gray-800">
          {children}
        </div>
      </body>
    </html>
  );
}
