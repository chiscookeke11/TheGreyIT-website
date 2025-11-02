import React from "react";
import Image from "next/image";
import JoinUs from "@/components/about-us/JoinUsSection";
import OurImpact from "@/components/about-us/OurImpact";

const About = () => {
  return (
    <div className="font-poppins flex flex-col  pt-20 lg:pt-28  gap-10 bg-white ">


      <div className="bg-[#f2f5fc] w-full flex flex-col items-center justify-between gap-16  px-[3%] py-14 ">
        <div className=" w-full basis-1/2 flex flex-col items-center gap-5 " >
          <h2 className="  text-3xl md:text-5xl font-bold text-gray-700 text-center  ">About Us</h2>
          <p className="text-gray-500 text-base md:text-lg  max-w-3xl text-center ">
            We’re a company driven by purpose, creativity, and a desire to help
            businesses grow better. Our people, culture, and technology are built
            to create meaningful experiences for our customers and partners.
          </p>
        </div>

        <div className="flex justify-center max-w-5xl w-full overflow-hidden rounded-tr-[100px] rounded-bl-[100px] ">
          <Image
            src="/community-page/team.jpg"
            alt="Team collaboration"
            className=" w-full h-full object-center object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>



      <div className=" w-full flex flex-col-reverse md:flex-row  justify-evenly gap-16 items-center px-[3%] pt-16 pb-8">


        <div className="flex justify-center basis-1/2 max-w-lg   ">
          <Image
            src="/community-page/team.jpg"
            alt="Team collaboration"
            className="rounded-sm w-full h-full object-center object-cover"
            width={500}
            height={400}
          />
        </div>

        <div className=" w-full basis-1/2 flex flex-col items-start gap-5 " >
          <h3 className=" text-xl md:text-3xl  font-syne font-semibold text-gray-700">
            Our Vision
          </h3>
          <p className="text-gray-500 text-start  text-base md:text-lg ">
            Mailchimp is an email and marketing automations platform for growing
            businesses. We empower millions of customers around the world to
            start and grow their businesses with world-class marketing technology,
            award-winning customer support, and inspiring content.
          </p>
          <p className="text-gray-500 text-start text-base md:text-lg">
            Mailchimp puts data-backed recommendations at the heart of your
            marketing, so you can find and engage customers across email, social
            media, landing pages, and advertising—automatically and with the power
            of AI. In 2021, Mailchimp was acquired by Intuit.
          </p>
        </div>


      </div>
      <OurImpact/>
      <JoinUs />
    </div>

  );
};

export default About;
