import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/components/AuthProvider";
import "photoswipe/dist/photoswipe.css";
import { GlobalProvider } from "@/context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurpleCat-Rental",
  description: "PurpleCat-Rental",
  keywords: "PurpleCat, Rental",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className='flex flex-col bg-violet-100 min-h-screen'>
        <AuthProvider session={session}>
          <GlobalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer
              position='bottom-right'
              limit={2}
              autoClose={2000}
              newestOnTop
            />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
