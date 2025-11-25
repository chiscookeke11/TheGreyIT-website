import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Syne } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Image from "next/image";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700", "400"],
  subsets: ["latin"]
})


const syne = Syne({
  variable: "--font-syne",
  weight: ["600", "700", "400"],
})




export const metadata: Metadata = {
  title: "ThegreyIT | Learn. Build. Advance",
  description: "Learn. Build. Advance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${syne.variable} antialiased`}
      >

        <AppProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />

          <a href="https://wa.me/2349066895390" target="_blank" className="fixed z-50 text-black bottom-6 right-6  h-16 w-16 p-2 rounded-full flex items-center justify-center hover:scale-105 duration-300 ease-in-out " >
          <Image src={"/logos/WhatsApp.svg"} alt="whatsapp logo" height={500} width={500} className="w-full h-full " />
            </a>
        </AppProvider>
      </body>
    </html>
  );
}
