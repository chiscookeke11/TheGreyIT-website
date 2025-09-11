import ResearchCard from "../UI/ResearchCard";



export default function ResearchSection() {
    return (
        <section className=" w-full bg-white px-[4%] py-20 flex items-center justify-center flex-col gap-10 font-syne " >
        <h5 className="text-black text-2xl lg:text-3xl font-extrabold font-poppins" >Research Section </h5>


        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center  gap-10 " >

            <ResearchCard/>
            <ResearchCard/>
            <ResearchCard/>

        </div>
        </section>
    )
}