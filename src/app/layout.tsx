import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="bg-gray-100 flex justify-center items-center h-screen">
        {children}
      </body>
    </html>
  );
}
