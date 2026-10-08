import { CoursePreview } from "@/types/types";
import { unstable_cache } from "next/cache";
import { supabaseServer } from "./supabaseServer";





// this function fetches all the courses from the database table
export const getCourses = unstable_cache(
    async (): Promise<CoursePreview[]> => {
        const { data, error } = await supabaseServer
            .from("course")
            .select(`
  title,
  shorter_Description,
  onlineFee,
  inhouseFee,
  is_active,
  pdfName
            `)


        if (error) {
            console.error("Error fetching courses:", error)
            throw new Error("Failed to fetch courses")
        }

        return data as CoursePreview[]
    },

    ["courses"],
    {
        revalidate: 600,
        tags: ["courses"]
    }

)