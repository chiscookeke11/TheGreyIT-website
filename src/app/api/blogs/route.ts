

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"



// Function to fetch all blogs
export const GET = async () => {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" }
        })
        return Response.json(blogs)
    }
    catch (err) {
        console.error("Error Fetching blogs!", err)
        return new Response(JSON.stringify({ err: "Failed to fetch blogs" }), { status: 500 })
    }
}




// Function to post a blog
export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { title, content, author, category, image } = body

        if (!title || !content || !author || !category || !image) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                author,
                category,
                image,
            }
        })

        return NextResponse.json(newBlog, { status: 201 })
    }
    catch (err) {
        console.error("Error creatinbg blog", err)
        return NextResponse.json(
            { error: "Failed to create blog!" },
            { status: 500 }
        )
    }
}



