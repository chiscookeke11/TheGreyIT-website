"use client"

import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types";
import { useEffect, useState } from "react"
import { Clock, Heart, Radio, Star } from 'lucide-react'
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Spinner from "@/components/UI/Spinner";

type Bookmark = {
  course_id: number;
  course: CourseDataTypes;
};

export default function Page() {
  const { userData } = useAppContext()
  const [bookmarkedCourses, setBookmarkedCourses] = useState<CourseDataTypes[] | null>(null)


  useEffect(() => {

    const fetchBookMarks = async () => {
      const { data, error } = await supabase.from("course").select("*").in("id", userData?.bookmarks ?? [])

      if (error) {
        console.error("Error fetching bookmarks:", error)
      }

      else {
        console.log("The bookmarkrd courses:", data)
        setBookmarkedCourses(data)
      }
    }

    fetchBookMarks()
  }, [userData])


  return (
    <div className="w-full min-h-screen flex flex-col gap-7 items-start justify-start text-black bg-[#f2f5fc] p-8">
      <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Bookmarks</h1>

      {
        !bookmarkedCourses ?
          <div className=" w-full h-[30vh] flex items-center justify-center " >
            <Spinner />
          </div>
          :
          bookmarkedCourses.length < 1 ?
            <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh] " >
              <Image src={"/user/not-found-error-alert-svgrepo-com.svg"} alt="icon" height={500} width={500} className=" w-[250px] h-[250px] object-center " priority />
              No bookmarks found </div>
            :
            (
              <section className=" w-full mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins " >

                {bookmarkedCourses?.map((track, index) => (
                  // Course card
                  <div key={index} className=" w-full max-w-sm overflow-hidden bg-white h-full  flex flex-col items-start gap-4 rounded-md shadow-sm group relative " >
                    {/* Course image */}
                    <div className="w-full h-[220px] bg-gray-400 flex items-center justify-center rounded-xs overflow-hidden" >
                      <Image src={track.imageUrl} alt={`${track.title}-image`} height={500} width={500} className=" w-full h-full object-center object-cover rounded-xs group-hover:scale-110 duration-300 ease-in-out transition-all " />

                    </div>


                    {/* Course description */}
                    <div className="w-full flex flex-col gap-3 items-start p-3 " >
                      <div className="w-full flex items-center gap-[40%] text-sm " >
                        <small className=" flex items-center gap-2 " ><Radio size={20} /> Live</small>
                        <small className=" flex items-center gap-2 "><Clock size={20} /> 1 week</small>
                      </div>

                      <h3 className="text-base font-semibold  " >{track.title} </h3>
                      <h4 className=" text-base font-semibold  " >${track.price} </h4>
                      <hr className="w-full border-t border-gray-400 " />
                      <div className="w-full flex items-center justify-between text-sm " >
                        <p> {"Tutor"} </p>
                        <p> {track.rating} </p>

                      </div>


                    </div>

                    {/* Bookmark button  */}
                    <button className="absolute top-3 right-4 bg-white rounded-sm p-4 flex items-center justify-center text-gray-700 cursor-pointer  " >
                      <Heart size={20} />
                    </button>
                  </div>
                ))}


              </section>

            )
      }


    </div>
  );
}
