
import { unstable_cache } from "next/cache";
import { supabaseServer } from "./supabaseServer";
import { BlogPreview, ResearchBlogType } from "@/types/types";



// this function fetches recent blogs from the database then caches it
export const getRecentBlogs = unstable_cache(
    async (): Promise<BlogPreview[]> => {
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
                ascending: false
            })
            .limit(4);

        if (error) {
            console.error("Error fetching recent blogs:", error)
            throw new Error("Failed to fetch recent blogs")
        }

        return data as BlogPreview[];
    },

    ["recent-blogs"],
    {
        revalidate: 600,
        tags: ["blogs"]
    }
)







// this function fetches recent blogs from the database then caches it
export const getAllBlogs = (
    page: number,
    range: number,
    search: string
) =>
    unstable_cache(
        async () => {
            const from = (page - 1) * range;
            const to = from + range - 1;

            let query = supabaseServer
                .from("blog")
                .select(
                    `
            slug,
            image,
            title,
         tagline,
            author,
            publicationDate
          `,
                    { count: "exact" }
                )
                .eq("status", "published")
                .order("createdAt", { ascending: false });

            if (search.trim()) {
                query = query.or(
                    `title.ilike.%${search}%,tagline.ilike.%${search}%`
                );
            }

            const { data, error, count } = await query.range(from, to);

            if (error) {
                console.error("Error fetching blogs:", error);
                throw new Error("Failed to fetch blogs");
            }

            return {
                data,
                count: count ?? 0,
            };
        },
        [
            "blogs",
            `page-${page}`,
            `range-${range}`,
            `search-${search}`,
        ],
        {
            revalidate: 300,
            tags: ["blogs"],
        }
    )();




export async function getBlogBySlug(
    slug: string
): Promise<ResearchBlogType | null> {
    const { data, error } = await supabaseServer
        .from("blog")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) {
        console.error("Error fetching blog:", error);
        return null;
    }

    return data as ResearchBlogType;
}







// This function fetches admin blogs
export async function getAdminBlogs(
    page: number,
    range: number
) {
    const from = (page - 1) * range;
    const to = from + range - 1;

    const { data, error } = await supabaseServer
        .from("blog")
        .select(`
            id,
            slug,
image,
title,
tagline,
author,
publicationDate,
status
`)
        .order("createdAt", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Error fetching admin blogs:", error);
        throw new Error("Failed to fetch blogs");
    }

    return data;
}












