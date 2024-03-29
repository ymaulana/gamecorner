import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { NextAuthProvider } from "./components/Providers";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Games Corner",
  description: "Gaming Reviews, News, Tips and More.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="mx-auto flex min-h-screen flex-col px-8 py-8 shadow-xl lg:max-w-[900px] lg:px-16">
            <Navbar />
            <div className="flex-auto">{children}</div>
            <Footer />
          </div>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
