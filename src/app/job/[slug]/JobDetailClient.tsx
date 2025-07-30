"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import DashboardNavbar from "../../../components/DashboardNavbar";
import Image from "next/image";
// import html2canvas from "html2canvas";
import("pdfjs-dist");

const getPdfThumbnail = async (pdfUrl: string): Promise<string | null> => {
  try {
    // @ts-expect-error: pdfjsLib does not have types for legacy build import
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
    return canvas.toDataURL();
  } catch {
    return null;
  }
};

// Use a proper type for attachment
interface Attachment {
  url: string;
  name: string;
  type: string;
}

const AttachmentCard = ({
  attachment,
  setAttachmentUrl,
  setShowAttachmentModal,
}: {
  attachment: Attachment;
  setAttachmentUrl: (url: string) => void;
  setShowAttachmentModal: (show: boolean) => void;
}) => {
  const [pdfThumb, setPdfThumb] = useState<string | null>(null);
  const isPdf =
    attachment.type === "application/pdf" ||
    (typeof attachment.url === "string" && attachment.url.toLowerCase().endsWith(".pdf"));
  // Only fetch thumbnail on client
  useState(() => {
    if (isPdf) {
      getPdfThumbnail(attachment.url).then(setPdfThumb);
    }
  });
  return (
    <div
      className="relative w-48 h-56 bg-blue-50 dark:bg-blue-900 rounded-xl shadow cursor-pointer hover:shadow-lg transition flex flex-col"
      onClick={() => {
        setAttachmentUrl(attachment.url);
        setShowAttachmentModal(true);
      }}
    >
      <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold
        ${isPdf ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}>
        {isPdf ? "PDF" : "IMG"}
      </span>
      <span className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded text-xs truncate max-w-[120px] font-medium text-gray-700 dark:text-gray-200">
        {attachment.name}
      </span>
      <div className="flex-1 flex items-center justify-center mt-8 mb-2 px-2">
        {isPdf ? (
          pdfThumb ? (
            // Replace <img> with <Image />
            <Image src={pdfThumb} alt={attachment.name} width={192} height={128} className="w-full h-32 object-cover rounded-lg" />
          ) : (
            <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )
        ) : (
          <Image src={attachment.url} alt={attachment.name} width={192} height={128} className="w-full h-32 object-cover rounded-lg" />
        )}
      </div>
      <span className="absolute bottom-2 right-2 text-gray-400">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </span>
    </div>
  );
};

function getTimeLeft(deadline: string) {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return "Deadline passed";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m left`;
}

// Use a proper type for job
export interface Job {
  id: string;
  title: string;
  job_company?: {
    company_name?: string;
    company_username?: string;
    location?: string;
  };
  location?: string;
  job_type?: string;
  remoteOrOffice?: string;
  experience?: string;
  created_at?: string;
  applicants?: number;
  deadline?: string;
  about_role?: string;
  description?: string;
  qualifications?: string[];
  responsibilities?: string[];
  education_names?: string;
  attachments?: Attachment[];
  tags?: string[];
  apply_link?: string;
  job_categories?: Array<{
    categories?: { name?: string };
    subcategories?: { name?: string };
  }>;
  salary?: number;
}

const SimilarJobCard = ({ job }: { job: Job }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
        {job.job_company?.company_name?.[0] || job.title?.[0] || 'J'}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{job.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {job.job_company?.company_name || 'Company'} • {job.job_company?.location || job.location || 'Location'}
        </p>
      </div>
      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
    <div className="flex gap-2 mb-3">
      {job.job_type && (
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
          {job.job_type}
        </span>
      )}
      {job.remoteOrOffice && (
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
          {job.remoteOrOffice === "remote" ? "Remote" : job.remoteOrOffice === "office" ? "Onsite" : "Flexible"}
        </span>
      )}
      {job.experience && (
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
          {job.experience}
        </span>
      )}
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400">
      {job.created_at ? `${Math.floor((Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)) || 0} day ago` : ""} • 
      {job.applicants ? ` ${job.applicants} Applicants` : " New"}
    </div>
  </div>
);

export default function JobDetailClient({
  job,
  similarJobs,
  companyJobs,
  slug,
}: {
  job: Job;
  similarJobs: Job[];
  companyJobs: Job[];
  slug: string;
}) {
  // Attachment & Share modal states
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const timeLeft = job.deadline ? getTimeLeft(job.deadline) : null;

  // SEO data
  const jobTitle = job.title || 'Job Opportunity';
  const companyName = job.job_company?.company_name || 'Company';
  const location = job.job_company?.location || job.location || 'Remote';
  const salary = job.salary ? `$${job.salary.toLocaleString()}` : 'Competitive salary';
  const jobType = job.job_type || 'Full-time';
  // const description = job.about_role || job.description || 'Exciting job opportunity';
  const pageTitle = `${jobTitle} at ${companyName} - ${location} | Jobler`;
  const pageDescription = `${jobTitle} position at ${companyName} in ${location}. ${jobType} role with ${salary}. Apply now on Jobler - India's leading job portal.`;
  const canonicalUrl = `https://jobler.com/job/${slug}`;

  // Share handler
  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <DashboardNavbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Job Details */}
            <div className="flex-1 lg:w-2/3">
              <div id="job-detail-main">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {job.job_company?.company_name?.[0] || job.title?.[0] || 'J'}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{job.title}</h1>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                          {job.job_company?.company_username ? (
                            <Link
                              href={`/company/${job.job_company.company_username}`}
                              className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                            >
                              {job.job_company?.company_name || 'Company'}
                            </Link>
                          ) : (
                            <span className="font-medium">{job.job_company?.company_name || 'Company'}</span>
                          )}
                          <span>•</span>
                          <span>{job.job_company?.location || job.location || 'Location'}</span>
                        </div>
                        <div className="flex gap-2">
                          {job.job_type && (
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                              {job.job_type}
                            </span>
                          )}
                          {job.remoteOrOffice && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                              {job.remoteOrOffice === "remote" ? "Remote" : job.remoteOrOffice === "office" ? "Onsite" : "Flexible"}
                            </span>
                          )}
                          {job.experience && (
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                              {job.experience}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 hidden lg:flex">
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center"
                      >
                        Apply Now
                      </a>
                      <button
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        onClick={handleShare}
                        title="Share"
                      >
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {timeLeft && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-6">
                      <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{timeLeft}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* About this role */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About this role</h2>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {job.about_role || job.description || "No description available for this position."}
                  </div>
                </div>
                {/* Qualification */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Qualification</h2>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {job.qualifications && job.qualifications.length > 0 ? (
                      job.qualifications.map((qualification: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{qualification}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>At least {job.experience || "2-4 years"} of relevant experience in {job.job_categories?.[0]?.categories?.name || "related field"} or related roles.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Knowledge of industry best practices and modern development methodologies.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Strong problem-solving skills and attention to detail.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Experience with collaborative tools and team environments.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Responsibility */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Responsibility</h2>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {job.responsibilities && job.responsibilities.length > 0 ? (
                      job.responsibilities.map((responsibility: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{responsibility}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Design and develop high-quality solutions that meet business requirements and user needs.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Collaborate with cross-functional teams to deliver projects on time and within scope.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Maintain code quality, perform testing, and ensure optimal performance across different platforms.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Stay updated with industry trends and contribute to continuous improvement initiatives.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Education Required */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Education Required</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.education_names
                      ? job.education_names.split(",").map((name: string, idx: number) => (
                          <span key={idx} className="px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium text-sm">
                            {name.trim()}
                          </span>
                        ))
                      : <span className="text-gray-500 dark:text-gray-400">No specific education required.</span>
                    }
                  </div>
                </div>
                {/* Attachment */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Attachment</h2>
                  <div className="flex gap-4 flex-wrap">
                    {job.attachments && job.attachments.length > 0 ? (
                      job.attachments.map((attachment: Attachment, index: number) => (
                        <AttachmentCard
                          key={index}
                          attachment={attachment}
                          setAttachmentUrl={setAttachmentUrl}
                          setShowAttachmentModal={setShowAttachmentModal}
                        />
                      ))
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400">No attachments available.</div>
                    )}
                  </div>
                </div>
                {/* Tags Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mt-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.tags) && job.tags.length > 0 ? (
                      job.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 font-medium text-sm">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">No tags for this job.</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Attachment Modal */}
              {showAttachmentModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg max-w-lg w-full relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-purple-600"
                      onClick={() => setShowAttachmentModal(false)}
                    >
                      ✕
                    </button>
                    {attachmentUrl.endsWith(".pdf") ? (
                      <iframe src={attachmentUrl} className="w-full h-96 rounded" />
                    ) : (
                      <img src={attachmentUrl} alt="Attachment" className="w-full h-96 object-contain rounded" />
                    )}
                  </div>
                </div>
              )}
              {/* Share Modal */}
              {showShareModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg max-w-md w-full relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-purple-600"
                      onClick={() => setShowShareModal(false)}
                    >
                      ✕
                    </button>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="mb-2 text-gray-700 dark:text-gray-300">{pageDescription}</div>
                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Share this job on your favorite platform or copy the link below!
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.title)}&url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-400 text-white rounded"
                      >
                        Share on X
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                      >
                        Facebook
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${window.location.href}&text=${encodeURIComponent(job.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-400 text-white rounded"
                      >
                        Telegram
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded"
                      >
                        Copy Link
                      </button>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs text-gray-600 dark:text-gray-300 break-all">
                      {window.location.href}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Right Panel - Similar Jobs & Company Jobs */}
            <div className="lg:w-1/3 space-y-6 pb-24 lg:pb-0">
              {/* Similar Jobs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {similarJobs.length > 0 ? (
                    similarJobs.map((similarJob: Job) => (
                      <SimilarJobCard key={similarJob.id} job={similarJob} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p>No similar jobs found</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Other Jobs From Company */}
              {job.job_company && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Other Jobs From {job.job_company.company_name}
                  </h3>
                  <div className="space-y-4">
                    {companyJobs.length > 0 ? (
                      companyJobs.map((companyJob: Job) => (
                        <SimilarJobCard key={companyJob.id} job={companyJob} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p>No other jobs from this company</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sticky Apply Button for mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-xl font-semibold shadow transition"
            >
              Apply Now
            </a>
            <button
              className="ml-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              onClick={handleShare}
              title="Share"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}