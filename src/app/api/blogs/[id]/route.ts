import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const {id } = await context.params
        const blog = await prisma.blog.findUnique({
            where: { id: Number(id) },
        })
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 400 })
        }

        return NextResponse.json(blog)
    }
    catch (error) {
        console.error("Error fetching blog:", error)
    }

}