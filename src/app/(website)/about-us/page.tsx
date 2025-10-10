import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section className="font-poppins">
      {/* --- Hero Section (from about 3) py-20 previously --- */}
      <div className="bg-[#f2f5fc] pt-32 pb-22 h-[80vh] ">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-6xl font-bold text-gray-700 mb-4">About Us</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We’re a company driven by purpose, creativity, and a desire to help
              businesses grow better. Our people, culture, and technology are built
              to create meaningful experiences for our customers and partners.
            </p>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition">
              Join Our Journey
            </button>
          </div>

          <div className="flex justify-center">
             <Image
              src="/community-page/team.jpg"
              alt="Team collaboration"
              className="rounded-2xl w-full md:w-4/5 object-cover"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* --- Main About Section (from about 1) --- */}
      <div className="bg-[#f2f5fc] py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-syne font-semibold mb-4 text-gray-700">
              About Mailchimp
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Mailchimp is an email and marketing automations platform for growing
              businesses. We empower millions of customers around the world to
              start and grow their businesses with world-class marketing technology,
              award-winning customer support, and inspiring content.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Mailchimp puts data-backed recommendations at the heart of your
              marketing, so you can find and engage customers across email, social
              media, landing pages, and advertising—automatically and with the power
              of AI. In 2021, Mailchimp was acquired by Intuit.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/community-page/team.jpg"
              alt="Team collaboration"
              className="rounded-2xl w-full md:w-4/5 object-cover"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
