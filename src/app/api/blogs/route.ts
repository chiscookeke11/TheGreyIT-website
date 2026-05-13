

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"



// Function to fetch all blogs
export const GET = async () => {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { publicationDate: "desc" }
        })
        return Response.json(blogs)
    }
    catch (err) {
        return new Response(JSON.stringify({ err: "Failed to fetch blogs" }), { status: 500 })
    }
}




// Function to post a blog
export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { title, content, author, image, publicationDate } = body

        if (!title || !content || !author || !image || !publicationDate) {
            return NextResponse.json(
                { error: "Missing required fields", title, content, author, image, publicationDate },
                { status: 400 }
            )
        }

        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                author,
                image,
                publicationDate,
            }
        })

        return NextResponse.json(newBlog, { status: 201 })
    }
    catch (err) {
        return NextResponse.json(
            { error: "Failed to create blog!" },
            { status: 500 }
        )
    }
}



