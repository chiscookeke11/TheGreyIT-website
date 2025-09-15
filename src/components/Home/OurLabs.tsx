import { OurLabsData } from "@/data/OurlabsData"
import Image from "next/image";


interface CardProps {
    bg: string;
    title: string;
    content: string
}


const Card = ({ bg, title, content }: CardProps) => {
    return (
        <div className=" w-full max-w-md min-w-52 h-[400px] md:h-[500px] rounded-xl flex items-end justify-center bg-gray-300 relative group overflow-hidden "
        >
            <Image src={bg} alt={`${title}-image`} width={300} height={300} className="absolute top-0 left-0 h-full w-full object-cover object-center transform group-hover:scale-125 duration-600 ease-in-out  " />
            <div className="absolute inset-0 bg-black/25  group-hover:bg-white/10 duration-600 ease-in-out"></div>
            <div className=" mb-16 text-center space-y-2 text-white z-10 px-5 " >
                <h3 className="text-xl lg:text-2xl font-extrabold font-poppins" > {title} </h3>
                <p className=" text-base lg:text-lg leading-[100%]  font-syne " >{content}</p>
            </div>
        </div>
    )
}

export default function OurLabs() {
    return (
        <section className="bg-white flex items-center justify-center flex-col gap-10 py-20 px-[4%]  " >
            <div className="text-center" >
                <h2 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Our Labs</h2>
                <p className="font-normal text-base lg:text-lg font-syne " >Build your future with practical experience </p>
            </div>

            <div className=" w-full  h-full flex flex-col md:flex-row items-center justify-center gap-5 " >
                {OurLabsData.map((data, index) => (
                    <Card bg={data.image} content={data.content} title={data.title} key={index} />
                ))}

            </div>
        </section>
    )
}