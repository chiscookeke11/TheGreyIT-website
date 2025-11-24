"use client"

import Spinner from "@/components/UI/Spinner";
import UserCourseCard from "@/components/user/UserCourseCard";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";




export default function Page() {
  const { userData, allCoursesData } = useAppContext()
  return (
    <div className=" rounded-xl bg-[#f2f5fc] py-7 px-6  flex items-center flex-col gap-7 justify-center   " >
      {/* <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " />
          <h3 className="font-semibold text-2xl" >No Reviews </h3> */}




      {
        !allCoursesData ?
          <div className=" w-full h-[30vh] flex items-center justify-center " >
            <Spinner />
          </div>
          :
          allCoursesData.length < 1 ?
            <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh] " >
              <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " priority />
              No course found </div>
            :
            (
              <section className=" w-full mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins " >

                {allCoursesData?.map((track, index) => (
                  // Course card
                  <Link href={`/user/reviews/${track.id}`} key={index}> <UserCourseCard track={track} /></Link>
                ))}


              </section>

            )
      }


    </div>
  )
}