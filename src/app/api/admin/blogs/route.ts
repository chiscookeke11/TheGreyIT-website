import { NextRequest, NextResponse } from "next/server";
import { getAdminBlogs } from "@/lib/blogs";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const requestedPage = Number(searchParams.get("page"));
    const requestedRange = Number(searchParams.get("range"));
    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const range = Number.isInteger(requestedRange) && requestedRange > 0
        ? Math.min(requestedRange, 50)
        : 16;

    try {
        const data = await getAdminBlogs(page, range);

        return NextResponse.json({ data }, {
            headers: {
                "Cache-Control": "private, no-store",
            },
        });
    } catch (error) {
        console.error("Error fetching admin blogs:", error);

        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}
