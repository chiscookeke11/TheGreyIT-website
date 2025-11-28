"use client"

import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types";
import { useEffect, useState } from "react"
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Spinner from "@/components/UI/Spinner";
import UserCourseCard from "@/components/user/UserCourseCard";

type Bookmark = {
  course_id: number;
  course: CourseDataTypes;
};

export default function Page() {
  const { userData } = useAppContext()
  const [bookmarkedCourses, setBookmarkedCourses] = useState<CourseDataTypes[] | null>(null)
  const [bookmarks, setbookmarks] = useState<number[] | null>(null)



  useEffect(() => {

    // Function to fetch all the bookmarked courses
    const fetchBookMarks = async () => {
      const { data, error } = await supabase.from("course").select("*").in("id", userData?.bookmarks ?? [])

      if (error) {
        console.error("Error fetching bookmarks:", error)
      }

      else {
        console.log("The bookmarkrd courses:", data, userData?.list_enrolled_courses)
        setBookmarkedCourses(data)
      }
    }


    if (userData) {
      setbookmarks(userData.bookmarks)
    }


    fetchBookMarks()
  }, [userData])


  return (
    <div className="w-full min-h-screen flex flex-col gap-7 items-start justify-start text-black bg-[#f2f5fc] p-8">
      <h1 className=" text-xl md:text-2xl font-semibold text-black   " >Wishlist</h1>

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
              <section className=" w-full mt-5  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins " >

                {bookmarkedCourses?.map((track, index) => (
                  // Course card
                  <UserCourseCard key={index} bookmarks={bookmarks} setbookmarks={setbookmarks} track={track} isBookmarked={bookmarks?.includes(Number(track.id)) ?? false}  />
                ))}

              </section>

            )
      }

    </div>
  );
}
