"use client"

import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types";
import { useEffect, useState } from "react"

type Bookmark = {
  course_id: string;
  course: CourseDataTypes;
};

export default function Page() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from("user_bookmarks")
        .select(`
          course_id,
          course (*)
        `)
        .eq("user_id", "4f1f8edf-a8f0-4281-a2b7-143f77b86ff3");

      if (error) {
        console.error("Error fetching bookmarks", error);
        return;
      }

      if (data) {
        // Map the course array to a single object
        const formattedData: Bookmark[] = data.map((item) => ({
          course_id: item.course_id,
          course: item.course[0], // take the first course object
        }));

        setBookmarks(formattedData);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins text-black bg-[#f2f5fc]">
      <h3 className="font-semibold text-2xl">
        {bookmarks.length === 0 ? "No item found" : "Bookmarks Loaded"}
      </h3>

     {bookmarks.map((item) => (
  <div key={item.course_id}>
    <p>Course ID: {item.course_id}</p>
    {item.course ? (
      <>
        <p>Title: {item.course.title}</p>
        <p>Rating: {item.course.rating}</p>
      </>
    ) : (
      <p>No course data available</p>
    )}
  </div>
))}

    </div>
  );
}
