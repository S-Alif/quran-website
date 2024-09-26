import MainLayout from "@/components/MainLayout";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
