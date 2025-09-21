import Button from "./Button";




export default function ContactForm() {
    return (
        <form action="" className="w-full max-w-4xl bg-[#f2f5fc] py-6 px-4 flex flex-col items-start gap-10 ">


            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10   " >

                <label htmlFor="firstName" className=" flex flex-col gap-1 items-start font-medium text-sm text-[#8D8D8D]  " >
                    <span>First Name</span>
                    <input name="firstName" id="firstName" placeholder="John" type="text" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black " />
                </label>


                <label htmlFor="lastName" className=" flex flex-col gap-1 items-start font-medium text-sm text-black ">
                    <span>Last Name</span>
                    <input name="lastName" id="lastName" placeholder="Doe" type="text" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black " />
                </label>




                <label htmlFor="email" className=" flex flex-col gap-1 items-start font-medium text-sm text-[#8D8D8D]">
                    <span>Email</span>
                    <input name="email" id="email" placeholder="johndoe@gmail.com" type="email" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black " />
                </label>



                <label htmlFor="phoneNumber" className=" flex flex-col gap-1 items-start font-medium text-sm text-black">
                    <span>Phone Number</span>
                    <input name="phoneNumber" id="phoneNumber" placeholder="+234 903 6745 8789" className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black " />
                </label>
            </div>


  <label htmlFor="phoneNumber" className=" flex flex-col gap-1 items-start font-medium text-sm text-black w-full">
    <span>Wrte your message</span>
    <textarea name="message" id="message" placeholder="Your Message" rows={1}  className=" w-full py-2 px-3 border-b-2 border-b-gray-600 text-base font-medium text-black  outline-none " ></textarea>
  </label>





            <Button variant="default" className="font-syne !bg-gray-700 !text-white ml-auto" >Send Message</Button>
        </form>
    )
}