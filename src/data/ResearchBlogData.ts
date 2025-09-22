import { ResearchBlogType } from "@/types/types";

export const researchBlogData: ResearchBlogType[] = [
  {
    id: 1,
    image: "/basketball.png",
    category: "TRAVEL",
    title: "Research on CyberSecurity",
    author: "Nedu",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: 2,
    image: "/mountain.png",
    category: "ADVENTURE",
    title: "Exploring the Swiss Alps",
    author: "Chisom",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: 3,
    image: "/laptop.png",
    category: "TECH",
    title: "Future of AI in Education",
    author: "Emmanuel",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 4,
    image: "/city.png",
    category: "LIFESTYLE",
    title: "Living in a Smart City",
    author: "Ada",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    id: 5,
    image: "/ocean.png",
    category: "NATURE",
    title: "The Healing Power of the Ocean",
    author: "Ugo",
    createdAt: new Date(new Date().setHours(new Date().getHours() - 4)),
  },
];
