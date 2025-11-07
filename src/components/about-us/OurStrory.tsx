import Image from "next/image";




export default function OurStory() {
  return (
    <section className="bg-white py-16 md:py-24" style={{ fontFamily: 'Proxima Nova, sans-serif' }}>
      <div className="mx-auto px-6 md:px-12">

        {/* MOBILE LAYOUT */}
        <div className="md:hidden space-y-10">
          <Image
            src="/about-us/our-story.jpg"
            alt="Riskified team meeting"
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded-xl shadow-xl"
            priority
          />

          <div className="space-y-7  text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">Our Story</h2>
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
                src="/about-us/our-story.jpg"
                alt="Riskified team meeting"
                width={600}
                height={800}
                className="w-full h-auto object-cover object-center rounded-xl"
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
          <div className="space-y-7  flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-9">Our Story</h2>
            {/* space-y-5 text-lg text-gray-700 leading-relaxed */}
            <div className="space-y-5 text-base lg:text-lg font-normal leading-6">
              <p>
                In 2018, a dream was born, a dream to build a community that empowers real change through practical learning.
              </p>
              <p>
                It began with one person, Abel Chidera Emmanuel, whose vision was to make digital and research education accessible, hands-on, and meaningful for every learner. He imagined a platform where young Africans could learn, build, and advance, not through theory alone, but through mentorship, creativity, and experience.
              </p>
              <p className="font-medium">
                Then came 2020. The silence of the COVID-19 era halted many voices, including this growing community. But in that silence, the dream grew stronger. The uncertainty of the world made one thing clearer , Africa needed a movement that would turn knowledge into tangible skill, and skill into opportunity. </p>

              <p>
                In 2021, Ezekwueme Augustine shared the same belief: that education must evolve beyond classrooms to become a bridge between passion and progress. Together, they nurtured this vision quietly, until 2023, when <i>The Grey IT & Educational Consults Limited</i> (Thegreyit) was officially co-founded and registered with the Corporate Affairs Commission (CAC) as a hybrid hub for technology, research, and digital education.
              </p>



              <p>
                By early 2025, TheGreyit proudly opened its first in-house training facility in Enugu, a milestone that marked the transition from an online learning community into a physical centre of innovation and impact. Since then, the mission has remained unchanged: to expand access, empower learners, and transform lives through digital literacy, research, and technology-driven education.
              </p>




            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
