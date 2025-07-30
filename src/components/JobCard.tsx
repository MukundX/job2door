import Image from "next/image";
import { Card } from "./ui/Card";
// TODO: Replace with correct import path for Job type
// import type { Job } from "../app/search/page";
type Job = {
  title: string;
  isPromotion?: boolean;
  job_company?: {
    image_url?: string;
    company_name?: string;
    company_username?: string;
    location?: string;
  };
  location?: string;
  job_type?: string;
  remoteOrOffice?: string;
  experience?: string;
  salary_min?: number;
  salary_max?: number;
  created_at?: string;
  applicants?: number;
  slug: string;
};

interface JobCardProps {
  job: Job;
  percentMatch?: number;
}

export default function JobCard({ job }: JobCardProps) {
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
        <Image
          src={job.job_company?.image_url || "/default-logo.png"}
          alt={job.title}
          width={48}
          height={48}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-base">{job.title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {job.job_company?.company_name ? (
              <a
                href={`/company/${job.job_company.company_username}`}
                className="hover:underline font-medium text-blue-600 dark:text-blue-400"
              >
                {job.job_company.company_name}
              </a>
            ) : (
              <span>Company</span>
            )}
            {" • "}
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
        {/* Company tag - links to company profile */}
        {job.job_company?.company_name && (
          <a
            href={`/company/${job.job_company.company_username}`}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            @{job.job_company.company_username}
          </a>
        )}
      </div>
      
      {/* Salary Information */}
      {(job.salary_min || job.salary_max) && (
        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-green-700 dark:text-green-300">💰 Salary</span>
            <span className="text-sm font-bold text-green-800 dark:text-green-200">
              {job.salary_min && job.salary_max ? (
                `₹${(job.salary_min / 100000).toFixed(1)}L - ₹${(job.salary_max / 100000).toFixed(1)}L`
              ) : job.salary_min ? (
                `₹${(job.salary_min / 100000).toFixed(1)}L+`
              ) : (
                `Up to ₹${((job.salary_max ?? 0) / 100000).toFixed(1)}L`
              )}
            </span>
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