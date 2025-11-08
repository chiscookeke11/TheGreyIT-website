import Link from "next/link"





const NavigationMenuLinks = [

    {
        label: "Blogs",
        url: "/admin"
    },
    {
        label: "Add Blog",
        url: "/admin/Add-blog"
    }
]


export default function NavigationMenu() {
    return (
        <div className="w-full py-6 px-[6%] flex items-start  gap-7 mb-10" >

            {NavigationMenuLinks.map((link, i) => (
                <Link href={link.url} key={i} className="text-white font-medium bg-gray-700 py-3 px-5 rounded-sm " > {link.label}</Link>
            ))}

        </div>
    )
}