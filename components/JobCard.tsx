<div className="flex items-center gap-3 mb-2">
  {/* Canvas Avatar */}
  <canvas
    width={40}
    height={40}
    ref={canvasRef}
    className="rounded-full border-2 border-gray-300"
  />
  {/* Job Title as link */}
  <a href={`/jobs/${job.slug}`} className="font-bold text-lg text-blue-700 hover:underline">
    {job.title}
  </a>
</div>
<div className="flex gap-2 mt-3 flex-wrap">
  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
    {job.job_type}
  </span>
  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
    {job.experience}
  </span>
  <a href={`/company/${job.job_company?.slug}`} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
    @{job.job_company?.slug}
  </a>
</div>