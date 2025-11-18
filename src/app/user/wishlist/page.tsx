"use client"

import { supabase } from "@/lib/supabaseClient"
import { CourseDataTypes } from "@/types/types";
import { useEffect, useState } from "react"
import { Star } from 'lucide-react'
import Image from "next/image";

type Bookmark = {
  course_id: number;
  course: CourseDataTypes;
};

export default function Page() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        return;
      }

      if (data) {
        const formattedData: Bookmark[] = (data as any[]).map((item) => ({
          course_id: item.course_id,
          course: Array.isArray(item.course) ? item.course[0] : item.course,
        }));

        setBookmarks(formattedData);
      }
      setLoading(false);
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col gap-7 items-start justify-start text-black bg-[#f2f5fc] p-8">
      <h3 className="font-semibold text-2xl">
        {bookmarks.length === 0 ? "No bookmarks found" : `My Bookmarks (${bookmarks.length})`}
      </h3>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.course_id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow min-w-[250px] "
          >
            <div className="w-full h-40 bg-gray-200 overflow-hidden">
              <Image
                src={bookmark.course.imageUrl}
                alt={bookmark.course.title}
                className="w-full h-full object-cover"
                height={500}
                width={500}
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg flex-1">{bookmark.course.title}</h4>
                <span className="text-blue-600 font-bold text-sm ml-2">₹{bookmark.course.price.toLocaleString()}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{bookmark.course.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{bookmark.course.rating}</span>
                </div>
                <span>{bookmark.course.duration}</span>
              </div>

              {bookmark.course.pdfName && (
                <p className="text-xs text-gray-400 truncate">
                  📄 {bookmark.course.pdfName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
