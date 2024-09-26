import MainLayout from "@/components/MainLayout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>
            {children}
          </MainLayout>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
