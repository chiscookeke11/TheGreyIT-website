import Image from "next/image";




export default function Page() {
    return (
        <div className=" rounded-xl bg-[#f2f5fc] py-7 px-6  flex items-center flex-col gap-7 justify-center h-[50vh]  " >
          <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
          <h3 className="font-semibold text-2xl" >No Reviews </h3>
        </div>
    )
}