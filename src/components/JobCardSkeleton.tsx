export default function JobCardSkeleton() {
  return (
    <div className="min-w-[320px] max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between p-4 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Company logo skeleton */}
        <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="flex-1">
          {/* Job title skeleton */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
          {/* Company name and location skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        
        {/* Bookmark icon skeleton */}
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      
      {/* Tags skeleton */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
      
      {/* Footer skeleton */}
      <div className="flex items-center justify-between mt-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
      </div>
    </div>
  );
}