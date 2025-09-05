import React from "react"




interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode,
    variant?: "outline" | "default"
    ariaLabel?: string
}


export default function Button({ children, className, ariaLabel,  variant = "outline", ...props }: ButtonProps) {

    const baseStyles = " px-6 py-2 md:py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm md:text-base font-semibold font-poppins "

    const variantStyles = variant === "outline" ? " rounded-[1000px] border-[1px] border-white bg-transparent hover:bg-white hover:text-[#000] text-white transition-all duration-300 ease-in-out " : " border-[1px] border-gray-700 text-gray-700  rounded-sm hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out  "



    return (
        <button aria-label={ariaLabel} className={` ${className} ${variantStyles} ${baseStyles} `} {...props}  >
            {children}
        </button>
    )
}