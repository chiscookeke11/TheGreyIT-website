export default function ResearchHeroSkeleton() {
  return (
    <div className="w-full h-[55vh] animate-pulse rounded-lg overflow-hidden bg-gray-200 flex flex-col md:flex-row gap-6 p-6">

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-full bg-gray-700 rounded-lg" />

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">

        {/* Tag / small label */}
        <div className="h-4 w-24 bg-gray-700 rounded" />

        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-700 rounded" />
        <div className="h-6 w-2/3 bg-gray-700 rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-gray-700 rounded mt-2" />
        <div className="h-4 w-5/6 bg-gray-700 rounded" />
        <div className="h-4 w-2/3 bg-gray-700 rounded" />

        {/* Author + Date */}
        <div className="flex items-center gap-3 mt-4">
          <div className="h-4 w-20 bg-gray-700 rounded" />
          <div className="h-4 w-[1px] bg-gray-600" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>

      </div>
    </div>
  )
}
