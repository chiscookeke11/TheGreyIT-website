import Image from "next/image";


const coreValues = [
    "Excellence: We always give our best and aim for high quality.",
    " Integrity: We keep our promises and build trust.",
    "Innovation: We think creatively and stay ready for change.",
    " Inclusivity: We believe everyone deserves access to learning.",
    " Mentorship: We focus on building people, not just systems."
]



export default function OurMission() {
    return (
        <section className="bg-white overflow-hidden w-full px-[5%] py-10 md:py-16 flex items-center flex-col md:flex-row justify-between gap-16 !pt-32 " style={{ fontFamily: 'Proxima Nova, sans-serif' }}>



            <div className="w-full basis-1/2 flex flex-col items-start gap-4  "  >
                <h1 className="text-2xl md:text-4xl font-extrabold mb-7 "> Our Mission</h1>


                <p className="text-lg md:text-xl">
                    To empower people across Africa with strong digital and research skills.
                </p>




                <p className="text-lg md:text-xl font-medium">
                    We achieve this through practical training, mentorship, and real-life experience that prepare learners for the world of work.
                </p>




                <div className="w-full flex flex-col gap-3 items-start mt-10 " >

                    <p className="text-xl md:text-2xl font-bold" >Our Core Values</p>

                    <ul className=" flex flex-col gap-3 items-start list-disc text-lg lg:text-xl pl-5" >
                        {coreValues.map((value, i) => {
                            const [title, text] = value.split(":")

                            return (
                                <li key={i} > <span className="font-extrabold " >{title}:</span> {text} </li>
                            )
                        })}
                    </ul>
                </div>


            </div>






            <div className="w-full h-full min-h-[350px] lg:h-[700px] min-w-xs basis-1/2 flex flex-col items-center justify-center rounded-sm  overflow-hidden flex-1 "  >
                <Image
                    src="/about-us/our-mission.jpg"
                    alt="Riskified team collaborating"
                    width={1500}
                    height={1500}
                    className="w-full h-full object-cover object-center rounded-sm"
                    priority
                />


            </div>
        </section>
    );
}