"use client"

import Spinner from "@/components/UI/Spinner";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";



export default function Page() {

    const { certificatesData } = useAppContext()

    return (
        <>
            {
                !certificatesData ?
                    <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc]   ">
                        <Spinner />
                    </div>
                    :
                    certificatesData.length < 1 ?
                        (
                            <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc]   ">

                                <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
                                <h3 className="font-semibold text-2xl" >No certificates found</h3>
                            </div>
                        )
                        :
                    <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc]   ">
                      Certificates
                    </div>
            }


        </>
    )
}