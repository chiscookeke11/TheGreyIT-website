import { CohortCoursePreview } from "@/types/types";
import { unstable_cache } from "next/cache";
import { supabaseServer } from "./supabaseServer";

export const fetchCohortCourses = unstable_cache(
    async (): Promise<CohortCoursePreview[]> => {
        const { data, error } = await supabaseServer
            .from("cohort_2026_courses")
            .select(`
                title,
                imageUrl,
                duration,
                online_fee,
                inhouse_fee,
                id,
                slug
            `);

        if (error) {
            console.error("Error fetching cohort courses:", error);
            throw new Error("Failed to fetch cohort courses");
        }

        return data as CohortCoursePreview[];
    },
    ["cohort_courses"],
    {
        revalidate: 3600,
        tags: ["cohort_courses"],
    }
);