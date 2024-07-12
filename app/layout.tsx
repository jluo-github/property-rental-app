import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/AuthProvider";
import { FaHouseFloodWaterCircleArrowRight } from "react-icons/fa6";
import "photoswipe/dist/photoswipe.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurpleCat-Next-Rental",
  description: "PurpleCat-Next-Rental",
  keywords: "PurpleCat, Rental",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("server session", session);

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen bg-violet-100'>
        <AuthProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer
            position='bottom-center'
            limit={2}
            autoClose={1000}
            newestOnTop
          />
        </AuthProvider>
      </body>
    </html>
  );
}
