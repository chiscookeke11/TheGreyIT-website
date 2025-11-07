import Image from "next/image"



const brands = [
    "TheGreyvo – focuses on branding and design for businesses. ",
    "The Grey Research – supports research training, data analysis, and academic publishing. ",
    "TheGreyit – offers hands-on IT, programming, and cybersecurity training. "
]


export default function WhoWeAreSection() {
    return (
        <section className=" bg-white overflow-hidden w-full px-[5%] py-10 md:py-16 flex items-start flex-col md:flex-row justify-between gap-20 !pt-32  " style={{ fontFamily: 'Proxima Nova, sans-serif' }}  >




            <div className="w-full h-full min-w-xs basis-1/2 flex flex-col items-center justify-center rounded-sm  overflow-hidden  "  >
                <Image
                    src="/about-us/THEGREYIT-LOGO-2-2048x359.png"
                    alt="Riskified team collaborating"
                    width={1500}
                    height={1500}
                    className="w-full h-full object-cover object-center rounded-sm"
                    priority
                />


            </div>





            <div className="w-full basis-1/2 flex flex-col items-start gap-4  "  >
                <h1 className="text-2xl md:text-4xl font-extrabold mb-3 text-gray-700 "> Who We Are</h1>


                <p className="text-lg md:text-xl">
                    The Grey IT & Educational Consults Limited is a growing organisation focused on technology, research, and education. We provide both online and physical learning to help students, professionals, and young innovators gain practical and job-ready skills.
                </p>

                <div className="w-full flex flex-col gap-3 items-start mt-10 " >

                    <p className="text-xl md:text-2xl font-bold text-gray-700 " >We work through three main brands: </p>

                    <ul className=" flex flex-col gap-3 items-start list-decimal text-lg lg:text-xl pl-5 py-3  " >
                        {brands.map((brand, i) => {
                            const [title, text] = brand.split("–")

                            return (
                                <li key={i} > <span className="font-extrabold text-gray-700" >{title}:</span> {text} </li>
                            )
                        })}
                    </ul>
                </div>


                <p className="text-lg md:text-xl font-medium">
                    We believe in learning by doing. Our training connects mentorship, creativity, and teamwork to help people make real impact.
                </p>


                <div className="w-full flex flex-col items-start gap-2 my-7 " >
                    <h5 className="text-xl md:text-2xl font-extrabold text-gray-700">Our Vision</h5>
                    <p className="text-lg md:text-xl">To become Africa’s most trusted centre for technology, research, and education.

                        We aim to bridge digital skills with lifelong learning and help build a new generation of innovators. </p>
                </div>






            </div>





        </section>
    )
}