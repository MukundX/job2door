"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import JobCard from "../../../components/JobCard";
import DashboardNavbar from "../../../components/DashboardNavbar";
import Image from "next/image";

// --- Types ---
interface Company {
  id: string;
  company_name: string;
  company_username: string;
  image_url?: string;
  location?: string;
  description?: string;
  x?: string;
  instagram?: string;
  facebook?: string;
  telegram?: string;
}

interface JobCategory {
  categories?: { name?: string; icon?: string };
  subcategories?: { name?: string };
}

interface Job {
  id: string;
  title: string;
  slug: string; // <-- Add this line
  created_at?: string;
  deadline?: string;
  isPromotion?: boolean;
  job_company?: Company;
  job_categories?: JobCategory[];
  // [key: string]: any;
}

export default function CompanyPage() {
  const params = useParams();
  const companyUsername = params.company_username as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [jobDates, setJobDates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (companyUsername) {
      fetchCompanyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyUsername]);

  const fetchCompanyData = async () => {
    try {
      // Fetch company info
      const { data: companyData } = await supabase
        .from("job_company")
        .select("*")
        .eq("company_username", companyUsername)
        .single();

      if (companyData) {
        setCompany(companyData);

        // Fetch company jobs with full details
        const { data: jobsData } = await supabase
          .from("jobs")
          .select(`
            *,
            job_company(*),
            job_categories(
              categories(name, icon),
              subcategories(name)
            )
          `)
          .eq("company", companyData.id)
          .order("created_at", { ascending: false });

        if (jobsData) {
          setJobs(jobsData);
          setFilteredJobs(jobsData);

          // Create job dates map for calendar
          const dates: { [key: string]: number } = {};
          jobsData.forEach((job: Job) => {
            if (job.created_at) {
              const date = new Date(job.created_at).toISOString().split("T")[0];
              dates[date] = (dates[date] || 0) + 1;
            }
          });
          setJobDates(dates);
        }
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobsByDate = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate("");
      setFilteredJobs(jobs);
    } else {
      setSelectedDate(date);
      const filtered = jobs.filter((job: Job) => {
        if (!job.created_at) return false;
        const jobDate = new Date(job.created_at).toISOString().split("T")[0];
        return jobDate === date;
      });
      setFilteredJobs(filtered);
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split("T")[0];
      const jobCount = jobDates[dateStr] || 0;
      const isCurrentMonth = current.getMonth() === currentMonth;
      const isToday = current.toDateString() === today.toDateString();
      const isSelected = selectedDate === dateStr;

      days.push({
        date: new Date(current),
        dateStr,
        jobCount,
        isCurrentMonth,
        isToday,
        isSelected,
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <DashboardNavbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-white dark:text-gray-200 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <DashboardNavbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-white dark:text-gray-200 text-xl">Company not found</div>
        </div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Header */}
        <Card className="p-8 mb-8 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-start gap-6">
            {company.image_url ? (
              <Image
                src={company.image_url}
                alt={company.company_name}
                width={96}
                height={96}
                className="rounded-xl object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {company.company_name?.[0] || "C"}
                </span>
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white dark:text-gray-200 mb-2 flex items-center gap-2">
                {company.company_name}
                {companyUsername === "jobler" && (
                  <span title="Verified" className="inline-block align-middle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DA1F2" style={{ display: "inline" }}>
                      <circle cx="12" cy="12" r="12" fill="#1DA1F2" />
                      <path d="M17.5 8.5l-6 6-3-3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </h1>
              <p className="text-white/80 dark:text-gray-400 mb-4">@{company.company_username}</p>
              {company.location && (
                <p className="text-white/60 dark:text-gray-500 mb-4">📍 {company.location}</p>
              )}
              {company.description && (
                <p className="text-white/80 dark:text-gray-300">{company.description}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Main Content - 7:3 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Column - Jobs (7/10) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white dark:text-gray-200">
                Jobs at {company.company_name}
                {selectedDate && (
                  <span className="text-lg font-normal text-purple-300 ml-2">
                    - {new Date(selectedDate).toLocaleDateString()}
                  </span>
                )}
              </h2>
              {selectedDate && (
                <Button
                  onClick={() => {
                    setSelectedDate("");
                    setFilteredJobs(jobs);
                  }}
                  variant="outline"
                  className="text-white dark:text-gray-300 border-white/20 dark:border-gray-600 hover:bg-white/10 dark:hover:bg-gray-700/50"
                >
                  Show All Jobs
                </Button>
              )}
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-white dark:text-gray-200 mb-2">
                  {selectedDate ? "No jobs posted on this date" : "No jobs posted yet"}
                </h3>
                <p className="text-white/60 dark:text-gray-400">
                  {selectedDate ? "Try selecting a different date." : "This company hasn't posted any jobs yet."}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Company Info & Calendar (3/10) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Social Links */}
            <Card className="p-6 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">Connect</h3>
              <div className="space-y-3">
                {company.x && (
                  <a
                    href={`https://x.com/${company.x.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">𝕏</span>
                    </div>
                    {company.x}
                  </a>
                )}
                {company.instagram && (
                  <a
                    href={`https://instagram.com/${company.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">📷</span>
                    </div>
                    {company.instagram}
                  </a>
                )}
                {company.facebook && (
                  <a
                    href={`https://facebook.com/${company.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">f</span>
                    </div>
                    {company.facebook}
                  </a>
                )}
                {company.telegram && (
                  <a
                    href={`https://t.me/${company.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✈</span>
                    </div>
                    {company.telegram}
                  </a>
                )}
              </div>
            </Card>

            {/* Job Posting Calendar */}
            <Card className="p-6 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">Job Posting Calendar</h3>
              <div className="text-center mb-4">
                <h4 className="text-white dark:text-gray-200 font-medium">{currentMonth} {currentYear}</h4>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-xs">
                {/* Day headers */}
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                  <div key={day} className="text-center text-white/60 dark:text-gray-400 font-medium p-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day.jobCount > 0 ? filterJobsByDate(day.dateStr) : null}
                    className={`
                      relative p-2 text-center rounded transition-colors
                      ${!day.isCurrentMonth ? "text-white/30 dark:text-gray-600" : "text-white/80 dark:text-gray-300"}
                      ${day.isToday ? "bg-purple-600 text-white" : ""}
                      ${day.isSelected ? "bg-pink-600 text-white" : ""}
                      ${day.jobCount > 0 && !day.isToday && !day.isSelected ? "bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/50 cursor-pointer" : ""}
                      ${day.jobCount === 0 ? "cursor-default" : ""}
                    `}
                    disabled={day.jobCount === 0}
                  >
                    {day.date.getDate()}
                    {day.jobCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {day.jobCount}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-white/60 dark:text-gray-400">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Jobs posted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span>Today</span>
                </div>
              </div>
            </Card>

            {/* Company Stats */}
            <Card className="p-6 bg-white/10 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">Company Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80 dark:text-gray-300">Total Jobs</span>
                  <span className="text-white dark:text-gray-200 font-semibold">{jobs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 dark:text-gray-300">Active Jobs</span>
                  <span className="text-white dark:text-gray-200 font-semibold">
                    {jobs.filter(job => new Date(job.deadline || "") > new Date()).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 dark:text-gray-300">Promoted Jobs</span>
                  <span className="text-white dark:text-gray-200 font-semibold">
                    {jobs.filter(job => job.isPromotion).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}