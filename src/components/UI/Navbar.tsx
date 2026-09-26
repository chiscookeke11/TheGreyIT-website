"use client";

import { navLinksData } from "@/data/navlinks";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CustomLink from "./CustomLink";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

const darkNavbarBackgroundRoutes = new Set([
    "/",
    "/about-us",
    "/our-services",
    "/courses",
    "/intro",
]);

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const pathName = usePathname();
    const mobileNavRef = useRef<HTMLDivElement | null>(null);

    /*
     * Pages where the navbar sits on top of a dark hero/background.
     */
    const hasDarkNavbarBackground =
        darkNavbarBackgroundRoutes.has(pathName);

    const navbarContentClass = hasDarkNavbarBackground
        ? "text-white before:bg-white"
        : "text-[#171717] before:bg-[#171717]";

    /*
     * Get the current authenticated user.
     */
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error && error.message !== "Auth session missing!") {
                console.error("Auth check failed:", error);
            }

            setUser(data.user ?? null);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    /*
     * Lock body scrolling when the mobile menu is open
     * and close the menu when clicking outside.
     */
    useEffect(() => {
        document.body.style.overflowY = showMenu ? "hidden" : "auto";

        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileNavRef.current &&
                !mobileNavRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflowY = "auto";
        };
    }, [showMenu]);

    /*
     * The pathname is now the source of truth.
     *
     * This means we don't need activeNav from context.
     */
    const isActiveRoute = (url: string) => {
        return pathName === url;
    };

    return (
        <nav
            className={`
                absolute
                text-white
                z-50
                top-0
                left-0
                w-full
                flex
                items-center
                justify-between
                py-[4%]
                pt-[5%]
                md:pt-[3%]
                px-[6%]
            `}
        >
            {/* Logo */}
            <Link href="/">
                {hasDarkNavbarBackground ? (
                    <Image
                        src="/logos/thegreyitlogo.png"
                        width={180}
                        height={180}
                        alt="TheGreyIT-logo"
                        className="object-center w-[100px]"
                    />
                ) : (
                    <Image
                        src="/logos/THEGREYAElogoBlack.png"
                        width={180}
                        height={180}
                        alt="TheGreyIT-logo"
                        className="object-center w-[100px]"
                    />
                )}
            </Link>

            {/* Desktop menu */}
            <ul className="w-fit hidden lg:flex items-center gap-5">
                {navLinksData.map((navlink) => {
                    const active = isActiveRoute(navlink.url);

                    return (
                        <li
                            key={navlink.url}
                            className={`
                                text-sm
                                font-semibold
                                font-poppins
                                ${navbarContentClass}
                                relative
                                before:absolute
                                before:bottom-[-5px]
                                before:left-[50%]
                                before:translate-x-[-50%]
                                before:w-0
                                before:h-[3px]
                                hover:before:w-full
                                before:transition-all
                                before:duration-300
                                before:ease-in-out
                                ${active
                                    ? "before:w-full"
                                    : "before:w-0"
                                }
                            `}
                        >
                            <CustomLink href={navlink.url}>
                                {navlink.label}
                            </CustomLink>
                        </li>
                    );
                })}

                {/* User */}
                <Link
                    href="/user"
                    className="
                        hidden
                        text-base
                        font-semibold
                        font-poppins
                        bg-white
                        text-gray-700
                        py-2
                        px-4
                        rounded-[8px]
                        hover:rounded-[50px]
                        transition-all
                        duration-300
                        ease-in-out
                    "
                >
                    {user ? "Dashboard" : "Sign In"}
                </Link>
            </ul>

            {/* Mobile menu button */}
            <button
                onClick={() => setShowMenu(true)}
                className={`
                    flex
                    items-center
                    justify-center
                    lg:hidden
                    cursor-pointer
                    border-none
                    outline-none
                    ${navbarContentClass}
                `}
                aria-label="Open navigation menu"
            >
                <Menu size={27} />
            </button>

            {/* Mobile menu */}
            <div
                ref={mobileNavRef}
                className={`
                    fixed
                    top-0
                    right-0
                    h-screen
                    bg-gray-700
                    w-[50%]
                    min-w-xs
                    z-20
                    flex
                    items-start
                    flex-col
                    gap-7
                    py-6
                    px-5
                    transform
                    transition-transform
                    duration-150
                    ease-in-out
                    ${showMenu
                        ? "translate-x-0"
                        : "translate-x-[500%]"
                    }
                `}
            >
                {/* Close button */}
                <button
                    onClick={() => setShowMenu(false)}
                    className="
                        ml-auto
                        border-none
                        outline-none
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                        text-white
                    "
                    aria-label="Close navigation menu"
                >
                    <X />
                </button>

                <ul className="w-fit flex flex-col items-start gap-8 pl-5">
                    {navLinksData.map((navlink) => {
                        const active = isActiveRoute(navlink.url);

                        return (
                            <li
                                key={navlink.url}
                                onClick={() => setShowMenu(false)}
                                className={`
                                    text-base
                                    font-poppins
                                    text-white
                                    ${active
                                        ? "font-semibold"
                                        : ""
                                    }
                                `}
                            >
                                <CustomLink href={navlink.url}>
                                    {navlink.label}
                                </CustomLink>
                            </li>
                        );
                    })}

                    <Link
                        href="/user"
                        onClick={() => setShowMenu(false)}
                        className="
                            text-base
                            hidden
                            font-semibold
                            font-poppins
                            bg-white
                            text-gray-700
                            py-2
                            px-4
                            rounded-sm
                        "
                    >
                        {user ? "Dashboard" : "Sign In"}
                    </Link>
                </ul>
            </div>
        </nav>
    );
}