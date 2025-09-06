import { OurLabsData } from "@/data/OurlabsData"


interface CardProps {
    bg: string;
    title: string;
    content: string
}


const Card = ({ bg, title, content }: CardProps) => {
    return (
        <div className=" basis-1/3 max-w-md min-w-sm h-[500px] rounded-xl flex items-end justify-center bg-amber-600 relative "
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="absolute inset-0 bg-black/15"></div>
            <div className=" mb-16 text-center space-y-2 text-white z-10" >
                <h3 className="text-xl lg:text-2xl font-extrabold font-poppins" > {title} </h3>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default function OurLabs() {
    return (
        <section className="bg-white flex items-center justify-center flex-col gap-10 py-20 px-[4%] " >
            <div className="text-center" >
                <h2 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Our Labs</h2>
                <p className="font-normal text-base lg:text-lg font-syne " >Build your future with practical experience </p>
            </div>

            <div className=" w-full bg-red-600 h-full flex items-center justify-center gap-5 " >
                {OurLabsData.map((data, index) => (
                    <Card bg={data.image} content={data.content} title={data.title} key={index} />
                ))}

            </div>
        </section>
    )
}