
import { PrismaClient } from "@prisma/client"





const prisma = new PrismaClient()

const main = async () => {
await prisma.blog.createMany({
    data: [
        {
            title: "The first blog",
            content: "The first thing to be posted",
            author: "Nedu",
            category: "test",
            image: "nedu image"
        }
    ]
})
}

main()
.then(() => console.log("Seeded Successfully"))
.catch((err) => console.error(err))
.finally(async () => await prisma.$disconnect())