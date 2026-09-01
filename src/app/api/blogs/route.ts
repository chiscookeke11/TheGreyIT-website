import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blogs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const range = Number(searchParams.get("range") || 5);
    const search = searchParams.get("search") || "";

    try {
        const result = await getAllBlogs(page, range, search);

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}