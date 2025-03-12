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
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jesse Satlei" />
      <meta name="keywords" content="inteligência artificial, entrevista, Jessé, tecnologia" />
      <link rel="canonical" href="https://embracon-seven.vercel.app/" />
    </Head>
      <body className="bg-gray-900 text-white flex justify-center items-center h-screen p-4">
        <div className="w-full max-w-3xl bg-gray-950 shadow-lg rounded-2xl p-6 border border-gray-800">
          {children}
        </div>
      </body>
    </html>
  );
}
