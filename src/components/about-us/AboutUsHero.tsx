import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-start overflow-hidden px-[3%] ">
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <Image
          src="/about-us/about-us-hero.avif"
          alt="Team collaboration"
          height={1500}
          width={1500}
          className="object-cover object-center h-full w-full "
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/40 -z-0" />

      <div className="relative text-start text-white px-3  max-w-5xl  font-poppins space-y-3 ">
        <h1 className=" text-3xl md:text-4xl lg:text-7xl  font-extrabold leading-[130%] ">
         Learn. Build. Advance.
        </h1>

        <p className=" max-w-5xl text-lg lg:text-xl font-semibold text-white " >Every course and mentorship at TheGreyit reflects this simple ideology; learning should lead to building something valuable, and building should lead to progress, for individuals, communities, and Africa as a whole. </p>
      </div>
    </section>
  );
}