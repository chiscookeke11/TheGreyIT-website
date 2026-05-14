import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist, Geist_Mono, Inter, Lora, Poppins, Syne } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { seoKeywords } from "@/data/SEOKeywords";
import ScrollToTopBtn from "@/components/UI/ScrollToTopBtn";



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

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
})

const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm'
})


const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "TheGreyIT | Learn. Build. Advance",
  description: "Learn. Build. Advance",
  keywords: seoKeywords,
  applicationName: "TheGreyIT",
  authors: [{ name: "TheGreyIT Team", url: "https://www.thegreyit.org" }],
  creator: "TheGreyIT Team",
  publisher: "TheGreyIT Team",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  openGraph: {
    title: "TheGreyIT",
    description:
      "Build | Learn | Advance",
    url: "https://www.thegreyit.org",
    siteName: "TheGreyIT",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "TheGreyIT",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheGreyIT",
    description:
      "We help students and professionals learn the basics, build strong technical skills, and advance to higher levels of expertise.",
    site: "@thegreyit",
    creator: "@thegreyit",
    images: ["./favicon.ico"],
  },
  metadataBase: new URL("https://www.thegreyit.org"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Nv5M-GPzypWQTbwEYS96n1qQAIEElpScWowb-gpM-j0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${syne.variable} ${lora.variable} ${dm.variable} ${inter.variable} antialiased`}
      >

        <AppProvider>
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />

          <ScrollToTopBtn />
        </AppProvider>
      </body>
    </html>
  );
}
