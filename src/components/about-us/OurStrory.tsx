import Image from "next/image";




export default function OurStory() {
  return (
    <section className="bg-white py-16 md:py-24 md:px-[5%] flex flex-col md:flex-row gap-10 lg:gap-16  items-center justify-center  " style={{ fontFamily: 'Proxima Nova, sans-serif' }}>


      <div className=" flex flex-col items-end gap-10 md:gap-20 lg:gap-28 justify-between basis-1/2 h-full  " >

        <div className=" w-full lg:w-[80%]  lg:min-h-[350px] lg:h-[450px] flex items-center justify-center " >
          <Image
            src="/about-us/our-story.jpg"
            alt="Riskified team meeting"
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center md:rounded-xl"
            priority
          />
        </div>





        <div className=" w-full md:w-[67%] aspect-16/9 hidden md:flex items-center justify-center  " >
          <Image
            src="/about-us/second-image.jpg"
            alt="team"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover md:rounded-xl"
            priority
          />
        </div>


      </div>



      <div className=" flex flex-col items-start gap-5 basis-1/2 text-base lg:text-lg font-normal px-[5%] md:px-0 " >

        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 text-gray-700"> Our Story</h1>

        <p className="text-lg md:text-xl font-medium">
          In 2018, a dream was born, a dream to build a community that empowers real change through practical learning.
        </p>
        <p className="text-lg md:text-xl font-medium">
          It began with one person, Abel Chidera Emmanuel, whose vision was to make digital and research education accessible, hands-on, and meaningful for every learner. He imagined a platform where young Africans could learn, build, and advance, not through theory alone, but through mentorship, creativity, and experience.
        </p>
        <p className="text-lg md:text-xl font-medium">
          Then came 2020. The silence of the COVID-19 era halted many voices, including this growing community. But in that silence, the dream grew stronger. The uncertainty of the world made one thing clearer , Africa needed a movement that would turn knowledge into tangible skill, and skill into opportunity. </p>

        <p className="text-lg md:text-xl font-medium">
          In 2021, Ezekwueme Augustine shared the same belief: that education must evolve beyond classrooms to become a bridge between passion and progress. Together, they nurtured this vision quietly, until 2023, when <i>The Grey IT & Educational Consults Limited</i> (Thegreyit) was officially co-founded and registered with the Corporate Affairs Commission (CAC) as a hybrid hub for technology, research, and digital education.
        </p>



        <p className="text-lg md:text-xl font-medium">
          By early 2025, TheGreyit proudly opened its first in-house training facility in Enugu, a milestone that marked the transition from an online learning community into a physical centre of innovation and impact. Since then, the mission has remained unchanged: to expand access, empower learners, and transform lives through digital literacy, research, and technology-driven education.
        </p>
      </div>



      <div className=" w-full flex  aspect-16/9 md:hidden items-center justify-center " >
        <Image
       src="/about-us/second-image.jpg"
          alt="Team"
          width={1000}
          height={1000}
          className="w-full h-auto object-cover md:rounded-xl"
          priority
        />
      </div>








    </section>
  );
}
