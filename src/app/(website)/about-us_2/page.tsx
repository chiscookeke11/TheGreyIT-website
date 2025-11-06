import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";






function AboutHero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/community-page/tea"
          alt="Team collaboration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/40 -z-0" />

      <div className="relative text-left text-white px-6 max-w-4xl font-poppins">
        <h1 className="text-6xl leading-[70px] font-extrabold">
          Building a safer ecommerce world through the power of AI
        </h1>
        {/* <p className="mt-6 text-lg md:text-xl font-light">
          Detect fraud, approve transactions, and build customer trust using intelligent automation.
        </p>
        <button className="mt-10 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition">
          Let's Talk
        </button> */}
      </div>
    </section>
  );
}

function OurMission() {
  return (
    <section className="bg-white overflow-hidden">
  {/* Container */}
  <div className="mx-auto px-6 md:px-12 py-16 md:py-24">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Text */}
      <div className="space-y-7 text-gray-800 font-poppins">
        <h1 className="text-2xl font-extrabold leading-[36px]">
          Our Mission
        </h1>

        <p className="text-base leading-relaxed">
          Riskified aims to empower your business to unleash ecommerce growth by <span className="font-semibold">outsmarting risk.</span> Ecommerce fraud teams play a crucial role in enabling their company’s growth and profitability. To do so, you require an enterprise-grade fraud and risk intelligence solution that can efficiently combat fraud, curb policy abuse, and boost revenue to the max. The problem is, the speed, scale, and sophistication of fraud and abuse can stretch the team and profit margins thin.
        </p>

        <p className="text-base font-medium">
          We believe risk should never keep you from growing your business
          with confidence.
        </p>

        <p className="text-base leading-relaxed">
          That’s why we don’t just promise great business outcomes — we are{" "}
          <span className="font-semibold">accountable</span> for them. As
          part of the strongest network of merchant brands that rely on our
          accurate machine learning approach, you can shift fraud chargeback
          liability and optimize performance according to your risk
          tolerance and business goals. Take risk off the table with
          Riskified, and put your business on the sure path to growth and
          profitability.
        </p>
      </div>

      {/* Image – Hidden on mobile, visible from md and up */}
      <div className="relative hidden md:block">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 z-10" />

        {/* Sharp rectangle with soft shadow */}
        <div className="overflow-hidden shadow-2xl rounded-xl">
          <Image
            src="/community-page/test.jpg"
            alt="Riskified team collaborating"
            width={720}
            height={960}
            className="w-full h-full object-cover rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

function OurStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* MOBILE LAYOUT */}
        <div className="md:hidden space-y-10">
          <Image
            src="/community-page/About_story-1.jpg"
            alt="Riskified team meeting"
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded-xl shadow-xl"
            priority
          />

          <div className="space-y-7 font-poppins text-center">
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                In 2013, <strong>Eido Gal</strong> and <strong>Assaf Feldman</strong> founded Riskified with the aim of enhancing the ecommerce experience for both merchants and consumers. As the landscape of shopping underwent significant transformations, traditional methods struggled to adapt. Their conviction in a more tech-forward approach drove them forward.
              </p>
              <p>
                Riskified is a pioneer in using AI to fight fraud, leveraging big data and machine learning to approve more orders that merchants might otherwise decline. We now also protect customers from malicious account takeover attacks, combat payment failures at checkout, help merchants block abuse while upholding consumer-friendly policies, and more.
              </p>
              <p className="font-medium">
                Our global team merges expertise in ecommerce fraud, payments, and customer insights to support pioneering ecommerce merchants worldwide. We help eliminate risk and uncertainty from their operations, empowering them to thrive in the ever-evolving digital landscape.
              </p>
            </div>
          </div>

          <Image
            src="/community-page/About_story-2.jpg"
            alt="Founders Eido & Assaf"
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded-xl shadow-xl"
            priority
          />
        </div>

        {/* DESKTOP LAYOUT*/}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: stacked images */}
          <div className="space-y-20">
            <div className="overflow-hidden shadow-xl">
              <Image
                src="/community-page/About_story-1.jpg"
                alt="Riskified team meeting"
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>

            <div className="overflow-hidden shadow-xl -mt-12 ml-12">
              <Image
                src="/community-page/About_story-2.jpg"
                alt="Founders Eido & Assaf"
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Right: vertically centered text */}
          <div className="space-y-7 font-poppins flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold leading-9">Our Story</h2>
            {/* space-y-5 text-lg text-gray-700 leading-relaxed */}
            <div className="space-y-5 text-base font-normal leading-6">
              <p>
                In 2013, <strong>Eido Gal</strong> and <strong>Assaf Feldman</strong> founded Riskified with the aim of enhancing the ecommerce experience for both merchants and consumers. As the landscape of shopping underwent significant transformations, traditional methods struggled to adapt. Their conviction in a more tech-forward approach drove them forward.
              </p>
              <p>
                Riskified is a pioneer in using AI to fight fraud, leveraging big data and machine learning to approve more orders that merchants might otherwise decline. We now also protect customers from malicious account takeover attacks, combat payment failures at checkout, help merchants block abuse while upholding consumer-friendly policies, and more.
              </p>
              <p className="font-medium">
                Our global team merges expertise in ecommerce fraud, payments, and customer insights to support pioneering ecommerce merchants worldwide. We help eliminate risk and uncertainty from their operations, empowering them to thrive in the ever-evolving digital landscape.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



function Leadership() {
  const leaders = [
    {
      name: "Eido Gal",
      title: "CEO & Co-Founder",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Assaf Feldman",
      title: "CTO & Co-Founder",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Aglika Dotcheva",
      title: "CFO",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Ravi Kumaraswami",
      title: "President of Worldwide Field Operations",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Jeff Otto",
      title: "Chief Marketing Officer",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Dana Teplitsky",
      title: "SVP, Global HR",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Shahar Yaari",
      title: "SVP, Product",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Eric Treichel",
      title: "General Counsel",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Nadav Lobel",
      title: "SVP, Account Management & Analytics",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
    {
      name: "Avi Shauli",
      title: "SVP, Engineering",
      image: "/community-page/Me.png", // <- replace
      linkedin: "https://www.linkedin.com",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center font-poppins">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Leadership</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-20">
          {leaders.map((leader, index) => (
            <div key={index} className="flex flex-col items-center text-center">

              {/* Profile Image Wrapper */}
              <div className="relative w-44 h-44 md:w-48 md:h-48">
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
                  className="absolute bottom-1 right-1 bg-[#5865F2] text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>

              {/* Name */}
              <h3 className="mt-6 text-lg font-semibold hover:text-[#5865F2] transition-colors">
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

function Principles() {
  const principles = [
    {
      title: "Client Success First",
      subtitle: "When our clients win, we win.",
      text: "We build enduring and trusted partnerships and stay focused on solving their most pressing challenges. This isn’t talk — it’s our business model.",
    },
    {
      title: "Drive Results",
      subtitle: "Use data to connect the dots.",
      text: "Take ownership, be accountable, and deliver on promises. Be resourceful and creative along the way. Results speak louder than rhetoric.",
    },
    {
      title: "Think Long-Term",
      subtitle: "Sustainable decisions > quick wins.",
      text: "We invest in relationships, strategies, and solutions that last. Integrity and consistency shape every action.",
    },
    {
      title: "Collaborate & Elevate",
      subtitle: "We go further when we go together.",
      text: "We share knowledge, support each other, and build environments where everyone grows stronger.",
    },
  ];

  // git add path/to/about-us_2

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 font-poppins">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Our Operating Principles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {principles.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="font-semibold mb-3">{item.subtitle}</p>
            <p className="text-gray-600 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}



// ✅ Only ONE default export here
export default function Page() {
  return (
    <>
      <AboutHero />
      <OurMission />
      <OurStory />
      <Leadership />
      <Principles />
    </>
  );
}
