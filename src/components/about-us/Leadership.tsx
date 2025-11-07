import { teams } from "@/data/LeadershipData";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";



export default function Leadership() {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center font-poppins">
        <h2 className="text-2xl md:text-4xl font-bold mb-16">Our Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-14 md:gap-16 place-items-center justify-items-center ">
          {teams.map((leader, index) => (

            <div key={index} className=" w-full bg-white shadow-2xl rounded-md px-6 py-8 flex items-center flex-col gap-8 min-w-sm" >

              <div className=" w-[230px] h-[230px] flex items-center justify-center p-2 rounded-full bg-gray-700  " >
                <Image src={leader.image} alt={`${leader.name}-img `} height={500} width={500} className="h-full w-full object-center object-cover rounded-full " />
              </div>

            </div>




          ))}
        </div>
      </div>
    </section>
  );
}