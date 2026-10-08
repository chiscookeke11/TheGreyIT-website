import { getCourses } from "@/lib/courses";
import { NextResponse } from "next/server";


export async function GET(request: Request) {


  try {
    const result = await getCourses()

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to fetch blogs",
      },
      {
        status: 500
      }
    )

  }

}



