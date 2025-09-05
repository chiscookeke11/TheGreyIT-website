import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins  = Poppins({
  variable: "--font-poppins",
  weight: "600",
  subsets: ["latin"]
})


const syne = Syne({
  variable: "--font-syne",
  weight: "600",
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
        {children}
      </body>
    </html>
  );
}
