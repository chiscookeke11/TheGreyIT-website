import type React from "react"
import { cn } from "@/lib/utils"

interface LoaderProps {
  depth?: number
  className?: string
}

export function Spinner({ depth = 6, className }: LoaderProps) {
  // Base classes for each nested div
  const baseClasses = "rounded-full border-2 border-transparent p-2 "

  const currentStyle =
    "border-t-gray-700 border-b-gray-400 animate-[loader-rotate_3.5s_linear_infinite]"

  // Recursive function to render nested divs
  const renderNested = (remainingDepth: number): React.ReactNode => {
    if (remainingDepth <= 0) return null
    return <div className={cn(baseClasses, currentStyle, "h-full")}>{renderNested(remainingDepth - 1)}</div>
  }

  return <div className={cn("relative w-[150px] h-[150px] overflow-hidden", className)}>{renderNested(depth)}</div>
}
