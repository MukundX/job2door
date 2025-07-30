// import Image from "next/image";
import { useRef, useEffect } from "react";
import { Card } from "./ui/Card";

type Job = {
  title: string;
  isPromotion?: boolean;
  job_company?: { company_username?: string; location?: string };
  location?: string;
  job_type?: string;
  remoteOrOffice?: string;
  experience?: string;
  created_at?: string;
  applicants?: number;
  slug: string;
  salary_min?: number;
  salary_max?: number;
};

interface JobCardProps {
  job: Job;
  hideSalary?: boolean;
}

export default function JobCard({ job, hideSalary = false }: JobCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw initials avatar based on job title
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background color based on title hash
    const colors = ["#FACC15", "#60A5FA", "#F472B6", "#34D399", "#F87171"];
    const hash = job.title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    ctx.fillStyle = colors[hash % colors.length];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Initials
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const initials = job.title
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  }, [job.title]);

  return (

    <Card className="min-w-[320px] max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between p-4 relative">
      {/* Promoted tag - positioned at top-left corner with higher z-index */}
      {job.isPromotion && (
        <div className="absolute -top-2 -left-2 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-bold shadow-lg">
            Promoted
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Canvas Avatar */}
        <canvas
          ref={canvasRef}
          width={48}
          height={48}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          {/* Job Title as link */}
          <a
            href={`/job/${job.slug}`}
            className="font-semibold text-gray-900 dark:text-gray-100 text-base hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {job.title}
          </a>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {/* Only show location, not company name */}
            {job.job_company?.location || job.location || "Location"}
          </div>
        </div>
        <button className="ml-2 text-gray-400 dark:text-gray-500 hover:text-purple-600">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 3H7a2 2 0 0 0-2 2v16l7-5 7 5V5a2 2 0 0 0-2-2z"/>
          </svg>
        </button>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {job.job_type && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">{job.job_type}</span>
        )}
        {job.remoteOrOffice && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
            {job.remoteOrOffice === "remote" ? "Remote" : job.remoteOrOffice === "office" ? "Onsite" : "Flexible"}
          </span>
        )}
        {job.experience && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">{job.experience}</span>
        )}
        {/* Company tag - links to company profile, only as tag */}
        {job.job_company?.company_username && (
          <a
            href={`/company/${job.job_company.company_username}`}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            @{job.job_company.company_username}
          </a>
        )}
      </div>

      {/* Salary Information - only show if not hidden and salary exists */}
      {!hideSalary && job.salary_min && job.salary_max && (
        <div
  className="flex items-center space-x-2 px-1 py-1 rounded"
  style={{  marginTop: '0px' }}
>
  <span className="font-medium text-gray-800 dark:text-gray-100">Salary:</span>
  <div className="text-sm font-semibold text-green-700 dark:text-green-400">
    ₹{job.salary_min.toLocaleString()} - ₹{job.salary_max.toLocaleString()}
  </div>
</div>



      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
        <span>
          {job.created_at ? `${Math.floor((Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)) || 0} day ago` : ""}
          {job.applicants ? ` • ${job.applicants} Applicants` : ""}
        </span>
        <a
          href={`/job/${job.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 font-semibold hover:underline"
        >
          View
        </a>
      </div>
    </Card>
  );
  
}