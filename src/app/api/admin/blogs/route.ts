
// app/api/admin/blogs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAdminBlogs } from "@/lib/blogs";
import { BlogPreview } from "@/types/types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const range = Number(searchParams.get("range")) || 16;

    try {
        const data: BlogPreview[] = await getAdminBlogs(page, range);

        return NextResponse.json({
            data,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}





