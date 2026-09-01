import { teams } from "@/data/LeadershipData";
import Image from "next/image";
import Link from "next/link";




export default function Leadership() {

  return (
    <section className="py-20 px-[5%] bg-[#f2f5fc] flex flex-col items-center justify-center gap-16 " style={{ fontFamily: 'Proxima Nova, sans-serif' }}>

      <h2 className="text-2xl md:text-5xl font-extrabold">Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-14 md:gap-16 place-items-center justify-items-center ">
        {teams.map((member, index) => (

          <Link key={index} href={`/about-us/${member.slug}`} className="w-full  h-full"  >
            <div className=" w-full h-full min-w-xs md:min-w-sm bg-white px-6 py-8 border-[7px] border-t-[12px] border-black flex items-center flex-col gap-3 lg:gap-6   " >

              <div className=" w-[180px] h-[230px] md:w-[230px] md:h-[300px] flex items-center justify-center p-0.5  bg-black  " >
                <Image src={member.image} alt={`${member.name}-img `} height={500} width={500} className="h-full w-full object-center object-cover   " />
              </div>

              <div className="w-full flex items-center justify-center text-center gap-1 flex-col " >
                <h2 className=" text-black font-extrabold text-xl md:text-2xl text-center font-sans " > {member.name} </h2>
                <h4 className=" text-black font-medium text-lg  " > {member.title} </h4>
              </div>

            </div>
          </Link>


        ))}
      </div>
    </section>
  );
}