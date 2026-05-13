import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany()
    return Response.json(courses)
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), { status: 500 })
  }
}