import { MetadataRoute } from "next";



export default function sitemap(): MetadataRoute.Sitemap {

    const baseURL = "https://www.thegreyit.org/"

    return [
        {
            url: baseURL,
             lastModified: new Date(),
             changeFrequency: "weekly",
             priority: 1,
        },
        {
            url: `${baseURL}/about`,
             lastModified: new Date(),
             changeFrequency: "monthly",
             priority: 0.8,
        },
          {
            url: `${baseURL}/research-blog`,
             lastModified: new Date(),
             changeFrequency: "weekly",
             priority: 2,
        },
    ]
}