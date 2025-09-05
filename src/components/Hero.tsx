import Button from "./Button";
import Navbar from "./Navbar";




export default function Hero() {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-[url('/HomeHeroSection/HeroBg.png')] bg-no-repeat bg-cover bg-center relative text-center text-white font-poppins px-5 " >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,9,30,0.7)] to-[rgba(4,9,30,0.7)]"></div>
            <Navbar />
            <div className=" z-1 flex flex-col items-center gap-5  " >
                <div className="flex flex-col md:flex-row items-center gap-2  text-3xl md:text-[40px] font-bold leading-[100%] " >
                    <h1>Learn.</h1>
                    <h1>Build.</h1>
                    <h1>Advance.</h1>
                </div>

                <p className="font-medium text-sm md:text-sm max-w-[210px] md:max-w-xs " >From knowledge to skill, from classroom to career.
                    Africa’s future, built hands-on.</p>

                <Button variant="outline" >Explore Courses</Button>
            </div>
        </section>
    )
}