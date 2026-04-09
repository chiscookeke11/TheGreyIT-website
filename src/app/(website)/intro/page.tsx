import IntroCoursePageClient from "@/components/cohort-course-page/IntroCoursePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quick Intro Courses | TheGreyIT",
    description: "Start any TheGreyIT course with a quick intro session for just ₦1,000 and complete your registration/payment online.",
};

export default function Page() {
    return <IntroCoursePageClient />
}
