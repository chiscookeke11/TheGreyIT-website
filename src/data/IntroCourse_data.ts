import { QuickIntroClass } from "@/types/types";

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export const quickIntroClasses: QuickIntroClass[] = [
    {
        slug: slugify("Junior Data Analyst — Quick Intro"),
        title: "Junior Data Analyst — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Not sure if data analysis is for you? This intro class gives you a real taste of what the full course covers. In one focused session, you'll handle actual data, build a simple chart, and walk away knowing whether this is the direction you want to take. No experience needed. No pressure.",
        covers: [
            "What data analysts actually do day-to-day in real jobs",
            "How to open, read, and make sense of a basic dataset in Excel",
            "Creating your first chart from raw numbers",
            "What tools you'll use in the full course and why they matter",
            "The kinds of jobs and opportunities available in data",
        ],
        whoShouldCome: [
            "Anyone curious about data but not sure where to start",
            "Students or job seekers exploring tech career options",
            "Business owners who want to understand what data analysis could do for them",
        ],
        format: "One live session — online or in-person. Bring your curiosity, leave with clarity.",
    },
    {
        slug: slugify("Web Development (Junior) — Quick Intro"),
        title: "Web Development (Junior) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "This intro class breaks down how websites work and what it actually feels like to build one. You'll write real HTML and CSS in the session — not just watch it happen — and by the end you'll have made something visible in a browser with your own hands. It's the fastest way to know if coding is for you.",
        covers: [
            "How websites are actually structured and what the browser does with your code",
            "Writing your first HTML — headings, text, images, and links",
            "Adding basic styling with CSS to change colours, fonts, and layout",
            "What the full course covers and where it can take you",
            "Common myths about coding and what learning to code is really like",
        ],
        whoShouldCome: [
            "Complete beginners who've always been curious about coding",
            "People who've tried online tutorials but wanted a real human to guide them",
            "Anyone considering the full Junior Web Developer course",
        ],
        format: "One live session — online or in-person. You'll actually write code, not just watch.",
    },
    {
        slug: slugify("A.I Engineering (Entry-Level) — Quick Intro"),
        title: "A.I Engineering (Entry-Level) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Everyone is talking about AI, but very few people understand what's actually happening under the hood. This class demystifies it. You'll see how AI tools are built, get a feel for working with an AI API, and understand the difference between using AI and engineering with it. Perfect for anyone trying to figure out if AI engineering is the direction they want to go.",
        covers: [
            "What AI actually is versus what most people think it is",
            "The difference between machine learning, LLMs, and general AI",
            "How developers actually build things using AI tools and APIs",
            "A hands-on demo: making an AI API do something useful",
            "What the entry-level AI Engineering course covers and what it prepares you for",
        ],
        whoShouldCome: [
            "Curious beginners who want to understand AI beyond headlines and hype",
            "Students and professionals exploring tech career options",
            "Anyone thinking about the full A.I Engineering course",
        ],
        format: "One live session — online or in-person. Expect a demo, a discussion, and a hands-on activity.",
    },
    {
        slug: slugify("Mobile Developer (Junior) — Quick Intro"),
        title: "Mobile Developer (Junior) — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "You'll actually build something in this class — a very simple app — using beginner-friendly tools. By the end of the session you'll understand how mobile apps are made, what the development process looks like, and whether the full Junior Mobile Developer course is the right next step for you.",
        covers: [
            "How mobile apps work and what happens when you tap a button on your phone",
            "The difference between no-code tools and real coding for mobile",
            "Hands-on: building a basic app screen in Thunkable",
            "What platforms (Android vs iOS) mean for developers",
            "What the full Junior Mobile Developer course covers and where it leads",
        ],
        whoShouldCome: [
            "Anyone who's ever thought 'I wish I could build an app'",
            "Students and creatives looking for a tech direction to pursue",
            "People who have an app idea and want to know if they can make it themselves",
        ],
        format: "One live session — online or in-person. You will build something you can open on a phone.",
    },
    {
        slug: slugify("Brand Designer — Quick Intro"),
        title: "Brand Designer — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Think design is just for naturally creative people? Think again. This intro class teaches you the core principles behind good design — and then puts them straight into practice. You'll create a real piece of graphic content in the session and leave with a clearer idea of whether the Brand Designer course is right for you.",
        covers: [
            "The four design principles every good graphic designer understands",
            "How colour and typography actually work together (and why it matters)",
            "What makes a logo good versus bad — and why",
            "Hands-on: creating a simple branded graphic using Canva or Photoshop",
            "What the full Brand Designer course covers and the freelance opportunities it unlocks",
        ],
        whoShouldCome: [
            "Beginners who've always been drawn to design but didn't know where to start",
            "Business owners who want to create their own brand graphics",
            "Anyone curious about design as a career or side income",
        ],
        format: "One live session — online or in-person. You will create something real by the end.",
    },
    {
        slug: slugify("Certified Digital Marketer — Quick Intro"),
        title: "Certified Digital Marketer — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "This class pulls back the curtain on digital marketing. You'll learn how social media algorithms actually work, what makes an ad effective, and what separates random posting from a real content strategy. Practical and fast-paced, it's designed to give you enough real knowledge to decide whether the full Digital Marketer course is your next move.",
        covers: [
            "How social media platforms decide what content to show people (and how to use that)",
            "The difference between organic content and paid advertising",
            "What makes a good caption, ad headline, or call to action",
            "A live look inside the Meta Ads Manager",
            "What the full Digital Marketer course covers and the career paths it opens",
        ],
        whoShouldCome: [
            "Small business owners who want to stop guessing and start marketing with intention",
            "Content creators who want to understand the business side of social media",
            "Anyone thinking about a career in digital marketing or brand management",
        ],
        format: "One live session — online or in-person. Fast, practical, no fluff.",
    },
    {
        slug: slugify("Cybersecurity Basics — Quick Intro"),
        title: "Cybersecurity Basics — Quick Intro",
        subtitle: "₦10,000 — Single Session",
        about: "Most people know cybersecurity is important. Very few actually understand how attacks work. This intro class changes that. You'll see real examples of how hackers think and operate, run through a basic security assessment, and learn the first things every person working online should have in place. It's practical from the first minute.",
        covers: [
            "How the most common attacks — phishing, malware, social engineering — actually work",
            "Why strong passwords and two-factor authentication matter more than people realise",
            "A basic personal security audit: how exposed are you right now?",
            "What cybersecurity professionals actually do in their jobs",
            "What the full Cybersecurity Basics course covers and the roles it prepares you for",
        ],
        whoShouldCome: [
            "Anyone who wants to be safer online at home or at work",
            "Students and job seekers exploring cybersecurity as a career path",
            "Business owners worried about protecting their data and systems",
        ],
        format: "One live session — online or in-person. Eye-opening and practical from the start.",
    },
];