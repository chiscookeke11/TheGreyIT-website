import Chatbox from "@/components/Home/ChatBox";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/UI/Navbar";




export default function WebsiteLayout({ children }: { children: React.ReactNode }) {



  return (
    < div className="relative" >
      <Navbar />
      <main>{children}</main>
      <Chatbox />
      <Footer />
    </ div >
  );
}
