"use client"

import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"

const Spinner = () => {
    return (
        <div className="h-10 w-10 rounded-full border-4 border-gray-white border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
    )
}

export default function Page() {
    const COOLDOWN_SECONDS = 180
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [countdown, setCountdown] = useState(COOLDOWN_SECONDS)
    const router = useRouter()





    // Check localStorage for persisted timer
    useEffect(() => {
        const savedEndTime = localStorage.getItem("resetCooldownEnd")
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime)
            const now = new Date().getTime()
            if (endTime > now) {
                setIsCounting(true)
                setCountdown(Math.ceil((endTime - now) / 1000))
            } else {
                localStorage.removeItem("resetCooldownEnd")
            }
        }
    }, [])

    // Countdown effect
    useEffect(() => {
        if (!isCounting) return

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setIsCounting(false)
                    localStorage.removeItem("resetCooldownEnd")
                    return COOLDOWN_SECONDS
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isCounting])

    // function to send update password link to the user
    const sendResetLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://the-grey-it-website.vercel.app/update_password"
        })

        if (error) {
            toast.error(`Failed to send link: ${error.message}`)
            console.error(error.message)
            const isRateLimitError = "status" in error && error.status === 429

            if (isRateLimitError) {
                const endTime = new Date().getTime() + COOLDOWN_SECONDS * 1000
                localStorage.setItem("resetCooldownEnd", endTime.toString())
                setCountdown(COOLDOWN_SECONDS)
                setIsCounting(true)
                toast.error(`Too many requests. Please wait ${COOLDOWN_SECONDS} seconds and try again.`)
            } else {
                toast.error(`Failed to send link: ${error.message}`)
            }
            setLoading(false)
            return
        }
        router.push(`/forget-password?email=${email}`)
        setEmail("")
        setLoading(false)

        // Start cooldown
        const endTime = new Date().getTime() + COOLDOWN_SECONDS * 1000
        localStorage.setItem("resetCooldownEnd", endTime.toString())
        setCountdown(COOLDOWN_SECONDS)
        setIsCounting(true)
    }

    return (
        <div className="w-full h-screen flex items-center justify-center px-[5%]">
            <form
                onSubmit={sendResetLink}
                className="w-full max-w-2xl bg-white flex items-center justify-center flex-col gap-2 px-6 py-10 rounded-lg font-poppins"
            >
                <h1 className="text-gray-700 font-bold text-xl md:text-3xl mb-5">
                    Enter Your Email
                </h1>

                {/* Email input */}
                <label htmlFor="email" className="w-full flex flex-col items-start gap-1 ">
                    <span className="text-base font-medium">Email</span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="JohnDoe@gmail.com"
                        className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm"
                    />
                </label>


                <Link href={"/user"} className=" text-sm ml-auto font-medium hover:font-medium hover:transition-all duration-300 ease-in-out text-gray-700 mb-3" >Sign in</Link>

                {/* Timer display */}
                {isCounting && (
                    <p className="mt-3 mb-4 ml-auto text-gray-500 text-xs ">
                        Please wait {countdown}s before sending another link.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading || isCounting || !email}
                    className={` font-syne bg-gray-700 w-full max-w-xs text-white hover:bg-transparent hover:text-gray-700 mb-5 px-6 py-3 flex items-center justify-center font-medium focus:outline-none text-base md:text-lg border-[1px] transition-all duration-300 ease-in-out border-gray-700 rounded-sm ${isCounting ? "cursor-not-allowed  " : "cursor-pointer"}  `}
                >
                    {loading ? <Spinner /> : "Send reset link"}
                </button>


            </form>
        </div>
    )
}
