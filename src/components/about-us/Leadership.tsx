import { leaders } from "@/data/LeadershipData";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";



export default function Leadership() {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center font-poppins">
        <h2 className="text-2xl md:text-4xl font-bold mb-16">Our Leadership</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-20">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col items-center text-center">

              {/* Profile Image Wrapper */}
              <div className="relative w-44 h-44 md:w-48 md:h-48 rounded-full ">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />

                {/* LinkedIn Button */}
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-[#5865F2] text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>

              {/* Name */}
              <h3 className="mt-6 text-base md:text-lg font-semibold hover:text-[#5865F2] transition-colors">
                {leader.name}
              </h3>

              {/* Title */}
              <p className="text-gray-600 mt-1 text-sm md:text-base">{leader.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}