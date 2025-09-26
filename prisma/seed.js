import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
    await prisma.course.createMany({
        data: [
            {
                title: "Software Engineering",
                description: "Become a pro software Engineer",
                duration: "12 weeks",
                price: 10000,
                imageUrl:
                    "https://images.unsplash.com/photo-1581091012184-5c8a5c9f9f6e",
                rating: 5,
            },
            {
                title: "Data Science & Analytics",
                description:
                    "Learn Python, Power BI, and data-driven decision making.",
                duration: "10 weeks",
                price: 8500,
                imageUrl:
                    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
                rating: 4,
            },
            {
                title: "AI & Cybersecurity",
                description:
                    "Master AI tools, secure systems, and ethical hacking.",
                duration: "14 weeks",
                price: 12000,
                imageUrl:
                    "https://images.unsplash.com/photo-1605902711622-cfb43c4437b0",
                rating: 5,
            },
            {
                title: "UI/UX & Digital Design",
                description:
                    "Design user-friendly products with Figma, Adobe XD, and more.",
                duration: "8 weeks",
                price: 7500,
                imageUrl:
                    "https://images.unsplash.com/photo-1587614295999-6fef5f9e4a8d",
                rating: 4,
            },
            {
                title: "Academic Research & Writing",
                description:
                    "From thesis writing to global journal publishing.",
                duration: "6 weeks",
                price: 6000,
                imageUrl:
                    "https://images.unsplash.com/photo-1584697964195-bc34e3f2c0f3",
                rating: 3,
            },
            {
                title: "Office Productivity & Digital Literacy",
                description:
                    "Learn Microsoft Office, Google Workspace, and workplace digital skills.",
                duration: "5 weeks",
                price: 5000,
                imageUrl:
                    "https://images.unsplash.com/photo-1504691342899-7f87a2c7d61a",
                rating: 4,
            },
            {
                title: "Kids & Junior Tech",
                description:
                    "Fun coding, robotics, and safe internet practices for kids.",
                duration: "6 weeks",
                price: 4000,
                imageUrl:
                    "https://images.unsplash.com/photo-1581092334477-d2a211cb47a7",
                rating: 5,
            },
        ],
    })
}

main()
    .then(() => console.log("Seeded Successfully"))
    .catch((err) => console.error(err))
    .finally(async () => await prisma.$disconnect())
