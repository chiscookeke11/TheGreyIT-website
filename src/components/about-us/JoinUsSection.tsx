import Link from "next/link";
import Button from "../UI/Button";



export default function JoinUs() {
  return (
    <section className="w-full  h-fit py-28 px-[3%] flex items-center justify-center flex-col gap-5 bg-[#ffffff] " >

      <h1 className=" text-xl md:text-3xl  font-syne font-semibold text-gray-800" >Join our Journey</h1>
      <p className="w-full max-w-xs md:max-w-none text-gray-500 text-center text-base md:text-lg font-poppins " >Take the first step towards transforming your career </p>

      <div className="flex gap-4 items-center justify-center flex-col md:flex-row mt-5 " >
        <Link href={"/our-services"} >
          <Button
            variant="default"
            className=" text-gray-700 px-7 py-2 !rounded-full !text-base "
          >
            OUR SERVICES
          </Button>
        </Link>


        <Link href={"/contact-us"} >
          <Button
            variant="default"
            className=" text-gray-700 px-7 py-2 !rounded-full !text-base "
          >
            CONTACT US
          </Button>
        </Link>
      </div>
    </section>
  )
}