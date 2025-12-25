"use client";

import {Spinner} from "@/components/UI/Spinner";
import UserCourseCard from "@/components/user/UserCourseCard";
import { useAppContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const { userData, allCoursesData } = useAppContext();

  // Store review counts per courseId
  const [reviewCounts, setReviewCounts] = useState<{ [key: number]: number }>({});

  // Fetch reviews for each course
  useEffect(() => {
    if (!allCoursesData) return;

    const fetchAllReviews = async () => {
      const counts: { [key: number]: number } = {};

      for (const course of allCoursesData) {
        const { count, error } = await supabase
          .from("userReviews")
          .select("*", { count: "exact", head: true })
          .eq("courseId", course.id);

        if (!error && course.id) {
          counts[Number(course.id)] = count || 0;
        }
      }

      setReviewCounts(counts);
    };

    fetchAllReviews();
  }, [allCoursesData]);

  return (
    <div className="rounded-xl bg-[#f2f5fc] py-7 px-6 flex items-center flex-col gap-7 justify-center">
      <h1 className="text-xl md:text-2xl font-semibold text-black mr-auto">Reviews</h1>

      <hr className="w-full border-t border-gray-400" />

      {!allCoursesData ? (
        <div className="w-full h-[30vh] flex items-center justify-center">
          <Spinner />
        </div>
      ) : allCoursesData.length < 1 ? (
        <div className="w-full flex flex-col gap-7 items-center justify-center h-[50vh]">
          <Image
            src={"/user/not-found-error-alert-svgrepo-com.svg"}
            alt="icon"
            height={500}
            width={500}
            className="w-[250px] h-[250px] object-center"
            priority
          />
          No course found
        </div>
      ) : (
        <section className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center justify-items-center gap-5 gap-y-9 font-poppins">
          {allCoursesData.map((course, index) => (
            <Link href={`/user/reviews/${course.id}`} key={index} className="w-full h-full">
              <UserCourseCard
                isBookmarked={false}
                track={course}
                no_of_reviews={reviewCounts[Number(course.id)] || 0}
              />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
