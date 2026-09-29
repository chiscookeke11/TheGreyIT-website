import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
    try {
        const { data, error } = await supabaseServer
            .from("blog")
            .select(`
                slug,
                image,
                title,
                tagline,
                author,
                publicationDate
            `)
            .eq("status", "published")
            .order("createdAt", {
                ascending: false,
            })
            .limit(4);

        if (error) {
            console.error("Error fetching recent blogs:", error);

            return NextResponse.json(
                { error: "Failed to fetch recent blogs" },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}