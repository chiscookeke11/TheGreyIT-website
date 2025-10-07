import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"




export const GET = async () => {
    try {
        const recentBlogs = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
            take: 4
        })
        return NextResponse.json(recentBlogs, { status: 200 })
    }
    catch (err) {
        console.error("Error fetching recent blogs:", err)
        return NextResponse.json(
            { error: "Falied to fetch recent blogs" },
            { status: 500 }
        )
    }
}