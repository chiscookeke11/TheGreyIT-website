

import { prisma } from "@/lib/prisma"


export const GET = async () => {
try {
    const blogs = await prisma.blog.findMany({
        orderBy: {createdAt: "desc"}
    })
    return Response.json(blogs)
}
catch (err) {
    console.error("Error Fetching blogs!", err)
    return new Response(JSON.stringify({err: "Failed to fetch blogs"}), {status: 500})
}
}