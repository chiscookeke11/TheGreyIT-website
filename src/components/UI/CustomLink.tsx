"use client";

import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

interface CustomLinkProps extends LinkProps {
    children: ReactNode;
    href: string;
}

export default function CustomLink({
    children,
    href,
    ...props
}: CustomLinkProps) {
    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}