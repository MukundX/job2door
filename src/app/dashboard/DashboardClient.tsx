"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import JobCard from "../../components/JobCard";
import DashboardNavbar from "../../components/DashboardNavbar";

// Define a Job type for your jobs
interface Job {
  id: string;
  title: string;
  slug: string; // Added slug property
  job_type?: string;
  job_categories?: Array<{
    categories?: { name?: string };
    subcategories?: { name?: string };
  }>;
  location?: string;
  job_company?: {
    location?: string;
  };
  remoteOrOffice?: string;
  salary_min?: number;
  salary_max?: number;
}

interface DashboardClientProps {
  initialRecentJobs: Job[];
  initialPromotionJobs: Job[];
}

export default function DashboardClient({
  initialRecentJobs,
  initialPromotionJobs,
}: DashboardClientProps) {
  const router = useRouter();

  // Search/filter state
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [remoteOrOffice, setRemoteOrOffice] = useState("all");
  const [minSalary, setMinSalary] = useState(0);
  const [jobType, setJobType] = useState("all");

  // Jobs state from server
  const [recentJobs] = useState<Job[]>(initialRecentJobs); // Remove setRecentJobs
  const [promotionJobs] = useState<Job[]>(initialPromotionJobs); // Remove setPromotionJobs
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get user location (browser)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation(`Lat: ${pos.coords.latitude.toFixed(2)}, Lon: ${pos.coords.longitude.toFixed(2)}`);
        },
        () => setUserLocation("Location unavailable")
      );
    }
  }, []);

  // Handle search (client-side filtering)
  const handleSearch = () => {
    setIsSearching(true);
    let jobs = recentJobs;
    if (category) jobs = jobs.filter(job => job.job_categories?.some(jc => jc.categories?.name?.toLowerCase().includes(category.toLowerCase())));
    if (subcategory) jobs = jobs.filter(job => job.job_categories?.some(jc => jc.subcategories?.name?.toLowerCase().includes(subcategory.toLowerCase())));
    if (location) jobs = jobs.filter(job => (job.location?.toLowerCase().includes(location.toLowerCase()) || job.job_company?.location?.toLowerCase().includes(location.toLowerCase())));
    if (remoteOrOffice !== "all") jobs = jobs.filter(job => job.remoteOrOffice === remoteOrOffice);
    if (minSalary > 0) jobs = jobs.filter(job => typeof job.salary_min === "number" && job.salary_min >= minSalary);
    if (jobType !== "all") jobs = jobs.filter(job => job.job_type === jobType);
    setFilteredJobs(jobs);
    setIsSearching(false);
  };

  // Clear search results
  const clearSearch = () => {
    setFilteredJobs([]);
    setCategory("");
    setSubcategory("");
    setLocation("");
    setRemoteOrOffice("all");
    setMinSalary(0);
    setJobType("all");
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Search Bar & Heading */}
      <div className="max-w-4xl mx-auto mt-8 px-4 mb-8">
        <div className="flex items-center justify-between mb-6"></div>
        <div
          className="bg-white/10 dark:bg-gray-800/50 rounded-xl shadow-lg flex items-center px-6 py-4 cursor-pointer"
          onClick={() => router.push('/search')}
        >
          <span className="text-white/80 dark:text-gray-300 flex-1">Search for jobs by category, location, salary...</span>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Search</Button>
        </div>
        {showFilters && (
          <div className="bg-white/10 dark:bg-gray-800/50 rounded-xl shadow-lg mt-4 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white dark:text-gray-300 mb-1">Category</label>
              <input value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400" placeholder="e.g. Engineering" />
            </div>
            <div>
              <label className="block text-white dark:text-gray-300 mb-1">Subcategory</label>
              <input value={subcategory} onChange={e => setSubcategory(e.target.value)} className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400" placeholder="e.g. Frontend" />
            </div>
            <div>
              <label className="block text-white dark:text-gray-300 mb-1">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400" placeholder="e.g. New York" />
              <div className="text-xs text-purple-200 dark:text-purple-300 mt-1">Your location: {userLocation}</div>
              <div className="flex gap-2 mt-2">
                <label className="text-white dark:text-gray-300 text-sm">
                  <input type="radio" checked={remoteOrOffice === "all"} onChange={() => setRemoteOrOffice("all")} /> All
                </label>
                <label className="text-white dark:text-gray-300 text-sm">
                  <input type="radio" checked={remoteOrOffice === "remote"} onChange={() => setRemoteOrOffice("remote")} /> Remote
                </label>
                <label className="text-white dark:text-gray-300 text-sm">
                  <input type="radio" checked={remoteOrOffice === "office"} onChange={() => setRemoteOrOffice("office")} /> Office
                </label>
              </div>
            </div>
            <div>
              <label className="block text-white dark:text-gray-300 mb-1">Min. Salary</label>
              <input
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={minSalary}
                onChange={e => setMinSalary(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-purple-200 dark:text-purple-300 mt-1">₹{minSalary}</div>
            </div>
            <div>
              <label className="block text-white dark:text-gray-300 mb-1">Job Type</label>
              <select value={jobType} onChange={e => setJobType(e.target.value)} className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200">
                <option value="all">All</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
              {filteredJobs.length > 0 && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="text-white dark:text-gray-300 border-white/20 dark:border-gray-600 hover:bg-white/10 dark:hover:bg-gray-700/50"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {filteredJobs.length > 0 && (
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-white dark:text-gray-200 font-bold">Search Results ({filteredJobs.length})</h2>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="text-white dark:text-gray-300 border-white/20 dark:border-gray-600 hover:bg-white/10 dark:hover:bg-gray-700/50"
            >
              Clear Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-6">
            {isSearching ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-w-[320px] max-w-xs w-full">
                  <JobCardSkeleton />
                </div>
              ))
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="min-w-[320px] max-w-xs w-full">
                  <JobCard job={job} hideSalary={true} />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Recently Added Jobs & Promotion Jobs */}
      <div className="w-full flex justify-center">
        <div className="w-full px-4 mt-10 max-w-full lg:max-w-none overflow-x-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap- justify-center w-full">
            {/* Recent Jobs - 7/10 columns */}
            <div className="lg:col-span-7 mx-auto">
              <h2 className="text-xl text-white dark:text-gray-200 font-bold mb-4 text-center">Recently Added Jobs</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {recentJobs.slice(0, 10).map(job => (
                  <div key={job.id} className="min-w-[320px] max-w-xs w-full">
                    <JobCard job={job} hideSalary={true} />
                  </div>
                ))}
              </div>
            </div>
            {/* Promotion Jobs - 3/10 columns */}
            <div className="lg:col-span-3 mx-auto">
              <h2 className="text-xl text-white dark:text-gray-200 font-bold mb-4 text-center">Promotion Jobs</h2>
              <div className="flex flex-col gap-6 items-center">
                {promotionJobs.map(job => (
                  <div key={job.id} className="min-w-[320px] max-w-xs w-full">
                    <JobCard job={job} hideSalary={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}