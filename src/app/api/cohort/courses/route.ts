
import { fetchCohortCourses } from "@/lib/cohort_courses";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await fetchCohortCourses();

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching cohort courses:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch cohort courses",
            },
            {
                status: 500,
            }
        );
    }
}