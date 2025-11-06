import Image from "next/image";




export default function OurStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto px-6 md:px-12">

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
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-5 text-base lg:text-lg text-gray-700 leading-relaxed">
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
            <h2 className="text-2xl md:text-4xl font-extrabold leading-9">Our Story</h2>
            {/* space-y-5 text-lg text-gray-700 leading-relaxed */}
            <div className="space-y-5 text-base lg:text-lg font-normal leading-6">
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
