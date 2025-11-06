import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden px-[3%] ">
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <Image
          src="/community-page/team.jpg"
          alt="Team collaboration"
          height={500}
          width={500}
          className="object-cover object-center h-full w-full "
          priority

        />
      </div>

      <div className="absolute inset-0 bg-black/40 -z-0" />

      <div className="relative text-center text-white px-3  max-w-4xl  font-poppins">
        <h1 className=" text-3xl md:text-5xl  font-extrabold">
          Building a safer ecommerce world through the power of AI
        </h1>
      </div>
    </section>
  );
}