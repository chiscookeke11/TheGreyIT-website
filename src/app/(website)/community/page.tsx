import Button from "@/components/UI/Button";
import Image from "next/image";




export default function Page() {
    return (
        <>
            <section className="max-w-6xl mx-auto  mt-32 grid md:grid-cols-2 gap-6 items-center px-4 font-poppins">
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
                        className="self-center md:self-start bg-gray-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 cursor-pointer"
                    >
                        Be a Volunteer
                    </button>
                </div>
            </section>


            {/* <!-- Info Section --> */}
            <section
                className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 my-20 px-4 text-sm font-poppins "
            >
                {/* <!-- Featured Project --> */}
                <div>
                    <h3
                        className="text-xl font-syne font-semibold mb-4 border-b-2 border-primary inline-block text-dark"
                    >
                        Featured Project
                    </h3>
                    <Image
                        src="/community-page/hands.jpg"
                        alt="Project"
                        className="rounded-lg shadow-md mb-3 w-full h-[200px] object-cover"
                        height={500}
                        width={500}
                    />
                    <p className="leading-relaxed text-gray-700">
                        Our team is dedicated to providing education and shelter for
                        underprivileged children. Together, we make lasting change.
                    </p>
                    <Button variant="default" className="mt-4 bg-gray-700 text-white px-5 py-2 !rounded-full"  >
                        More
                    </Button>
                </div>

                {/* <!-- News & Events --> */}
                <div>
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
                    <ul className="list-disc list-inside space-y-2 text-gray-700  ">
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