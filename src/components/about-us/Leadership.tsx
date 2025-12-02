import { teams } from "@/data/LeadershipData";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";




export default function Leadership() {

  return (
    <section className="py-20 px-[5%] bg-[#f2f5fc] flex flex-col items-center justify-center gap-16 " style={{ fontFamily: 'Proxima Nova, sans-serif' }}>

      <h2 className="text-2xl md:text-5xl font-extrabold">Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-14 md:gap-16 place-items-center justify-items-center ">
        {teams.map((member, index) => (

          <div key={index} className=" w-full h-full bg-white shadow-2xl rounded-md px-6 py-8 flex items-center flex-col gap-8 lg:gap-12 min-w-xs max-w-md " >

            <div className=" w-[180px] h-[180px] md:w-[230px] md:h-[230px] flex items-center justify-center p-1  bg-gray-700 rounded-full " >
              <Image src={member.image} alt={`${member.name}-img `} height={500} width={500} className="h-full w-full object-center object-cover rounded-full " />
            </div>





            <h2 className=" text-gray-700 font-extrabold text-2xl md:text-3xl text-center " > {member.name} </h2>



            <div className="flex flex-col items-center justify-center gap-6 text-center" >
              <p className=" text-xl text-center font-semibold text-gray-500 " >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>

              <h4 className=" text-gray-700 font-bold text-lg  text-center " > {member.title} </h4>

            </div>



            <div className="w-fit flex items-center gap-4" >

              <a href={member.socials.linkedIn} className=" text-sm  text-gray-700 hover:text-white transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-gray-700 flex items-center justify-center center " >
                <Linkedin />
              </a>


              <a href={member.socials.twitter} className=" text-sm  text-gray-700 hover:text-white transition-all duration-250 transform hover:scale-125 h-10 w-10 rounded-full hover:bg-gray-700 flex items-center justify-center center " >
                <Twitter />
              </a>

            </div>







          </div>




        ))}
      </div>
    </section>
  );
}