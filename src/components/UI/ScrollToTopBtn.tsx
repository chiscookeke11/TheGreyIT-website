"use client"

import { scrollToTop } from "@/lib/utils";
import { ChevronUp } from "lucide-react";




export default function ScrollToTopBtn() {
    return (
        <button onClick={scrollToTop} aria-label="Scroll to top" className=" fixed bottom-3 left-3 bg-gray-700 flex items-center justify-center size-10 md:size-12 cursor-pointer rounded-full text-white opacity-35 hover:opacity-100 transition-all duration-150 ease-in-out " >
            <ChevronUp />
        </button>
    )
}