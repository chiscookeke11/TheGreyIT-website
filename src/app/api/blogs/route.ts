import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export const GET = async () => {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" }
    })
    return Response.json(blogs)
}