import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Syne } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";



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
        </AppProvider>
      </body>
    </html>
  );
}
