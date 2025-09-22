"use client"


import Footer from "@/components/Home/Footer";
import Navbar from "@/components/UI/Navbar";



export default function WebsiteLayout({ children }: { children: React.ReactNode }) {



  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
