import Button from "@/components/UI/Button";
import Image from "next/image";




export default function Page() {
    return (
        <>
            {/* max-w-6xl previously */}
            <section className="max-w-8xl mx-auto mt-32 grid md:grid-cols-2 gap-6 items-center px-4 font-poppins">
                {/* <!-- Team Image --> */}
                <Image
                    src="/community-page/team.jpg"
                    alt="Team working together"
                    className="rounded-lg shadow-lg w-full object-cover h-[350px] md:h-[420px]"
                    height={500}
                    width={500}
                />

                {/* <!-- Text Content --> */}
                <div className="flex flex-col justify-center text-center md:text-left space-y-5">
                    <h2 className="text-5xl text-gray-700 font-semibold ">
                        PEACE
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        True peace is not just the absence of conflict, it is the presence of
                        fairness, opportunity, and compassion. We work to bring people together,
                        empowering communities through education, healthcare, and sustainable
                        initiatives that nurture both heart and mind. Every helping hand moves us
                        closer to a world where every child can dream freely, every voice is
                        valued, and every person has the chance to build a brighter tomorrow.
                    </p>

                    <button
                        className="self-center md:self-start md:mb-14 bg-gray-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 cursor-pointer"
                    >
                        Be a Volunteer
                    </button>
                </div>
            </section>


            {/* <!-- Info Section --> */}
            {/* do this md:grid-cols-grid-cols-[2fr_1fr_1fr] for unique effect */}
            <section
  className="max-w-7xl lg:gap-16 mx-auto grid md:grid-cols-3 gap-10 my-20 px-2 md:px-6 text-sm font-poppins"
>
  {/* <!-- Featured Project --> */}
  <div>
    <h3
      className="text-xl font-syne font-semibold mb-2 border-b-2 border-primary inline-block text-dark"
    >
      Featured Project
    </h3>

    {/* Project List (stacked vertically) */}
    <div className="space-y-10">
      {/* Project 1 */}
      <div className="md:-mx-6 flex flex-col md:flex-row items-start md:items-center gap-10">
        <Image
          src="/community-page/hands.jpg"
          alt="Project"
          className="rounded-lg shadow-md w-full md:w-[60%] h-[240px] object-cover"
          height={500}
          width={500}
        />
        <div className="md:w-[50%]">
          <p className="leading-relaxed text-gray-700">
            Our team provides education and shelter for underprivileged children,
            giving them hope and opportunities for a better future.
          </p>
          <Button
            variant="default"
            className="mt-4 bg-gray-700 text-white px-5 py-2 !rounded-full"
          >
            More
          </Button>
        </div>
      </div>

      {/* Project 2 */}
      <div className="md:-mx-6 flex flex-col md:flex-row items-start md:items-center gap-10">
        <Image
          src="/community-page/hands.jpg"
          alt="Project"
          className="rounded-lg shadow-md w-full md:w-[60%] h-[240px] object-cover"
          height={500}
          width={500}
        />
        <div className="md:w-[50%]">
          <p className="leading-relaxed text-gray-700">
            Through our food and health outreach, we bring nourishment and care to
            struggling families, ensuring no one is left behind.
          </p>
          <Button
            variant="default"
            className="mt-4 bg-gray-700 text-white px-5 py-2 !rounded-full"
          >
            More
          </Button>
        </div>
      </div>

      {/* Project 3 */}
      <div className="md:-mx-6 flex flex-col md:flex-row items-start md:items-center gap-10">
        <Image
          src="/community-page/hands.jpg"
          alt="Project"
          className="rounded-lg shadow-md w-full md:w-[60%] h-[240px] object-cover"
          height={500}
          width={500}
        />
        <div className="md:w-[50%]">
          <p className="leading-relaxed text-gray-700">
            We empower communities through skill-building and small business
            programs that create sustainable sources of income.
          </p>
          <Button
            variant="default"
            className="mt-4 bg-gray-700 text-white px-5 py-2 !rounded-full"
          >
            More
          </Button>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- News & Events --> */}
  <div className="md:ml-12">
    <h3
      className="text-xl font-syne font-semibold mb-4 border-b-2 border-primary inline-block text-dark"
    >
      News & Events
    </h3>
    <ul className="space-y-4 text-gray-700">
      <li>
        <span className="text-primary font-semibold">November 24, 2025</span><br />
        Launch of our clean water initiative in rural areas.
      </li>
      <li>
        <span className="text-primary font-semibold">October 18, 2025</span><br />
        Fundraising for community learning centers.
      </li>
      <li>
        <span className="text-primary font-semibold">September 05, 2025</span><br />
        Volunteers&apos; training program begins.
      </li>
    </ul>
  </div>

  {/* <!-- Program Areas --> */}
  <div>
    <h3
      className="text-xl font-syne font-semibold mb-4 border-b-2 border-primary inline-block text-dark"
    >
      Program Areas
    </h3>
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      <li>Child Welfare</li>
      <li>Education & Empowerment</li>
      <li>Health Services</li>
      <li>Community Development</li>
      <li>Emergency Relief</li>
    </ul>
  </div>
</section>
       </>
    )
}