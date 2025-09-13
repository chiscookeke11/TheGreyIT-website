import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";





interface CustomLinkProps extends LinkProps {
    children: ReactNode;
    href: string
}




export default function CustomLink({ children, href, ...props }: CustomLinkProps) {

    const router = useRouter()
    const sleep = (time: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, time))
    }


    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const body = document.querySelector("body")

        body?.classList.add("page-transition")

        await sleep(500)

        router.push(href)

        await sleep(500)

        body?.classList.remove("page-transition")

    }




    return (
        <Link href={href} {...props} onClick={handleTransition} >
            {children}
        </Link>
    )
}