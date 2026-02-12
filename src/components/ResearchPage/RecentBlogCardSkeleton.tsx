


export default function RecentBlogCardSkeleton() {
  return (
    <div className="w-full h-full flex items-center font-poppins px-1 gap-4 pb-3 border-b border-gray-700 animate-pulse">

      {/* Image Skeleton */}
      <div className="size-[100px] shrink-0 rounded-xs bg-gray-700" />

      {/* Text Section */}
      <div className="w-full flex flex-col items-start gap-2 py-2">

        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-700 rounded" />

        {/* Content preview */}
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-2/3 bg-gray-700 rounded" />

        {/* Author + Date */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-20 bg-gray-700 rounded" />
          <div className="h-4 w-[1px] bg-gray-600" />
          <div className="h-3 w-16 bg-gray-700 rounded" />
        </div>

      </div>
    </div>
  )
}
