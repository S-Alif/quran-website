import MainLayout from "@/components/MainLayout";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata = {
  title: "Qur\'An Web",
  description: "Qur\'An Web, a place where everyone can read and listen to Qur\'An",
  icons: {
    icon: "/images/QuranApp-logo-green.png",
  },
}

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
          <NextTopLoader
            color="#f25518"
            initialPosition={0.10}
            height={3}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #fff,0 0 5px #fff"
            zIndex={100003}
          />

          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
