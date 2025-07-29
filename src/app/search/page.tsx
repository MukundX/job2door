"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/Button";
import JobCard from "../../components/JobCard";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import DashboardNavbar from "../../components/DashboardNavbar";

// Custom Dropdown Component
const CustomDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select option",
  icon = "⏰"
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: string }[];
  placeholder?: string;
  icon?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200 border border-white/20 dark:border-gray-600 focus:border-purple-500 focus:outline-none transition-all duration-300 flex items-center justify-between hover:bg-white/30 dark:hover:bg-gray-600/50"
      >
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/50 shadow-2xl z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-white/80 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Category Selection Modal Component
const CategoryModal = ({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onToggleCategory,
  title = "Select Categories"
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategories: string[];
  onToggleCategory: (categoryName: string) => void;
  title?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white dark:text-gray-200">{title}</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onToggleCategory(cat.name)}
                className={`
                  p-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 text-center
                  ${selectedCategories.includes(cat.name)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/20 dark:bg-gray-700/50 text-white/80 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
                  }
                `}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-white/20 dark:border-gray-700/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Subcategory Selection Modal Component
const SubcategoryModal = ({
  isOpen,
  onClose,
  subcategories,
  selectedSubcategories,
  onToggleSubcategory,
  selectedCategories,
  title = "Select Subcategories"
}: {
  isOpen: boolean;
  onClose: () => void;
  subcategories: any[];
  selectedSubcategories: string[];
  onToggleSubcategory: (subcategoryName: string) => void;
  selectedCategories: string[];
  title?: string;
}) => {
  if (!isOpen) return null;

  const filteredSubcategories = subcategories.filter(sub =>
    selectedCategories.length === 0 || selectedCategories.includes(sub.categories?.name)
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white dark:text-gray-200">{title}</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {selectedCategories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-white/60 dark:text-gray-400">Please select categories first to see subcategories</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredSubcategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => onToggleSubcategory(sub.name)}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 text-center
                    ${selectedSubcategories.includes(sub.name)
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                      : 'bg-white/20 dark:bg-gray-700/50 text-white/80 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
                    }
                  `}
                >
                  <div className="font-medium">{sub.name}</div>
                  <div className="text-xs opacity-75 mt-1">{sub.categories?.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-white/20 dark:border-gray-700/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Dual Range Slider Component
const DualRangeSlider = ({
  min,
  max,
  minValue,
  maxValue,
  step = 1,
  onChange
}: {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange: (min: number, max: number) => void;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);

  return (
    <div className="relative">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-white/80 dark:text-gray-300">
          Min: <span className="font-semibold text-purple-300">{formatSalary(minValue)}</span>
        </span>
        <span className="text-sm text-white/80 dark:text-gray-300">
          Max: <span className="font-semibold text-purple-300">{formatSalary(maxValue)}</span>
        </span>
      </div>

      <div className="relative" ref={sliderRef}>
        {/* Track */}
        <div className="h-2 bg-white/20 dark:bg-gray-700 rounded-lg relative">
          {/* Active range */}
          <div
            className="absolute h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
        </div>

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxValue - step);
            onChange(value, maxValue);
          }}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb z-10 pointer-events-auto"
          style={{ zIndex: minValue > maxValue - (max - min) * 0.05 ? 20 : 10 }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minValue + step);
            onChange(minValue, value);
          }}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb z-20 pointer-events-auto"
          style={{ zIndex: maxValue < minValue + (max - min) * 0.05 ? 10 : 20 }}
        />
      </div>

      <div className="flex justify-between text-xs text-white/60 dark:text-gray-400 mt-2">
        <span>₹0</span>
        <span>₹20L+</span>
      </div>
    </div>
  );
};

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search state
  const [userLocation, setUserLocation] = useState("");
  const [remoteOrOffice, setRemoteOrOffice] = useState("all");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(200000);
  const [jobType, setJobType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [experience, setExperience] = useState("any");

  // Data state
  const [jobs, setJobs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCatLoading, setIsCatLoading] = useState(true);

  // Modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);

  // Get user location with reverse geocoding
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const location = `${data.city || data.locality || 'Unknown'}, ${data.principalSubdivision || data.countryName || 'Unknown'}`;
            setUserLocation(location);
          } catch (error) {
            setUserLocation("Location unavailable");
          }
        },
        () => setUserLocation("Location unavailable")
      );
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsCatLoading(true);
    try {
      const { data: categoriesData, error: catError } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      const { data: subcategoriesData, error: subError } = await supabase
        .from("subcategories")
        .select("*, categories(name)")
        .order("name");

      if (catError) {
        const { data: fallbackData } = await supabase
          .from("jobs")
          .select("category")
          .not("category", "is", null);
        if (fallbackData) {
          const uniqueCategories = [...new Set(fallbackData.map(job => job.category))];
          const fallbackCategories = uniqueCategories.map((cat, index) => ({
            id: `fallback-${index}`,
            name: cat,
            icon: '📁'
          }));
          setCategories(fallbackCategories);
        }
      } else {
        setCategories(categoriesData || []);
      }

      if (subError) {
        const { data: fallbackData } = await supabase
          .from("jobs")
          .select("subcategory")
          .not("subcategory", "is", null);
        if (fallbackData) {
          const uniqueSubcategories = [...new Set(fallbackData.map(job => job.subcategory))];
          const fallbackSubcategories = uniqueSubcategories.map((sub, index) => ({
            id: `fallback-sub-${index}`,
            name: sub,
            categories: { name: 'General' }
          }));
          setSubcategories(fallbackSubcategories);
        }
      } else {
        setSubcategories(subcategoriesData || []);
      }
    } catch (error) {
      setCategories([]);
      setSubcategories([]);
    } finally {
      setIsCatLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Fetch all jobs (with categories/subcategories if needed)
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          job_company(*),
          job_categories(
            categories(name, icon),
            subcategories(name)
          )
        `);

      if (error) {
        console.error("Supabase error:", error);
        setJobs([]);
        setIsLoading(false);
        return;
      }

      let filteredJobs = data || [];

      // Keyword filter in JS
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.full_job_detail &&
          JSON.stringify(job.full_job_detail).toLowerCase().includes(kw)
        );
      }

      // Category filter in JS
      // Category filter in JS
      if (selectedCategories.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          job.job_categories.some((cat: any) =>
            selectedCategories.includes(cat.categories?.name)
          )
        );
      }

      // Subcategory filter in JS
      if (selectedSubcategories.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
          job.job_categories.some((sub: any) =>
            selectedSubcategories.includes(sub.subcategories?.name)
          )
        );
      }

      // Salary Filtering
      if (minSalary > 0) {
        filteredJobs = filteredJobs.filter(job => job.salary_min >= minSalary);
      }
      if (maxSalary < 200000) {
        filteredJobs = filteredJobs.filter(job => job.salary_max <= maxSalary);
      }

      // Job Type Filtering
      if (jobType !== "all") {
        filteredJobs = filteredJobs.filter(job => job.job_type === jobType);
      }

      // Experience Filtering
      if (experience !== "any") {
        if (experience === "fresher") {
          filteredJobs = filteredJobs.filter(job => job.experience_years <= 1);
        } else if (experience.includes("-")) {
          const [minExp, maxExp] = experience.split("-").map(Number);
          filteredJobs = filteredJobs.filter(
            job =>
              job.experience_years >= minExp && job.experience_years <= maxExp
          );
        } else {
          filteredJobs = filteredJobs.filter(
            job => job.experience_years >= Number(experience)
          );
        }
      }

      console.log(`Total jobs fetched: ${data.length}`);
      console.log(`Jobs after filtering: ${filteredJobs.length}`);
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Search error:", error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategoryName)
        ? prev.filter(s => s !== subcategoryName)
        : [...prev, subcategoryName]
    );
  };

  const clearFilters = () => {
    setRemoteOrOffice("all");
    setMinSalary(0);
    setMaxSalary(200000);
    setJobType("all");
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setJobs([]);
    setExperience("any");
  };

  const handleSalaryChange = (min: number, max: number) => {
    setMinSalary(min);
    setMaxSalary(max);
  };

  const jobTypeOptions = [
    { value: "all", label: "All Types", icon: "🌐" },
    { value: "fulltime", label: "Full Time", icon: "⏰" },
    { value: "parttime", label: "Part Time", icon: "🕐" },
    { value: "contract", label: "Contract", icon: "📝" },
    { value: "internship", label: "Internship", icon: "🎓" }
  ];

  const updateUrlWithParams = () => {
    const params = new URLSearchParams();
    if (remoteOrOffice !== "all") params.set("remoteOrOffice", remoteOrOffice);
    if (minSalary > 0) params.set("minSalary", minSalary.toString());
    if (maxSalary < 200000) params.set("maxSalary", maxSalary.toString());
    if (jobType !== "all") params.set("jobType", jobType);
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
    if (selectedSubcategories.length > 0) params.set("subcategories", selectedSubcategories.join(","));
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (experience !== "any") params.set("experience", experience);
    router.push(`/search?${params.toString()}`);
  };

  // Sync state with URL query parameters
  useEffect(() => {
  const params = searchParams;
  const keywordParam = params.get("keyword");
  const categoriesParam = params.get("categories");
  const subcategoriesParam = params.get("subcategories");
  const jobTypeParam = params.get("jobType");
  const experienceParam = params.get("experience");
  const minSalaryParam = params.get("minSalary");
  const maxSalaryParam = params.get("maxSalary");

  if (categoriesParam) setSelectedCategories(categoriesParam.split(","));
  if (subcategoriesParam) setSelectedSubcategories(subcategoriesParam.split(","));
  if (keywordParam) setKeyword(keywordParam);
  if (jobTypeParam) setJobType(jobTypeParam);
  if (experienceParam) setExperience(experienceParam);
  if (minSalaryParam) setMinSalary(Number(minSalaryParam));
  if (maxSalaryParam) setMaxSalary(Number(maxSalaryParam));
}, [searchParams]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [
    keyword,
    selectedCategories,
    selectedSubcategories,
    jobType,
    experience,
    minSalary,
    maxSalary,
    remoteOrOffice
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-white dark:text-gray-200 mb-4">Find Your Dream Job</h1>
          {userLocation ? (
            <p className="text-lg text-purple-200 dark:text-purple-300 mb-6">
              📍 You are at <span className="font-semibold">{userLocation}</span>
            </p>
          ) : (
            <div className="h-6 w-48 bg-white/20 dark:bg-gray-700/50 rounded animate-pulse mb-6"></div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Search Filters */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50 lg:sticky lg:top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white dark:text-gray-200">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white dark:text-gray-200 flex items-center">
                    <span className="mr-2">🏷️</span> Categories
                  </h3>
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="text-xs text-purple-300 hover:text-purple-200 transition-colors px-2 py-1 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    View All & Select
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                  <div className="flex flex-wrap gap-2 pr-2">
                    {isCatLoading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-white/20 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
                      ))
                    ) : (
                      categories.slice(0, 8).map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.name)}
                          className={`
                            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105
                            ${selectedCategories.includes(cat.name)
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : 'bg-white/20 dark:bg-gray-700/50 text-white/80 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
                            }
                          `}
                        >
                          <span className="mr-1">{cat.icon}</span>
                          {cat.name}
                        </button>
                      ))
                    )}
                    {!isCatLoading && categories.length > 8 && (
                      <button
                        onClick={() => setShowCategoryModal(true)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80 transition-all duration-300"
                      >
                        +{categories.length - 8} more
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {selectedCategories.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white dark:text-gray-200 flex items-center">
                      <span className="mr-2">🎯</span> Subcategories
                    </h3>
                    <button
                      onClick={() => setShowSubcategoryModal(true)}
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors px-2 py-1 rounded-md bg-white/10 hover:bg-white/20"
                    >
                      View All & Select
                    </button>
                  </div>
                  <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
                    <div className="flex flex-wrap gap-2 pr-2">
                      {isCatLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-10 w-24 bg-white/20 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
                        ))
                      ) : (
                        subcategories
                          .filter(sub => selectedCategories.includes(sub.categories?.name))
                          .slice(0, 6)
                          .map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => toggleSubcategory(sub.name)}
                              className={`
                                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105
                                ${selectedSubcategories.includes(sub.name)
                                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                                  : 'bg-white/20 dark:bg-gray-700/50 text-white/80 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
                                }
                              `}
                            >
                              {sub.name}
                            </button>
                          ))
                      )}
                      {!isCatLoading && subcategories.filter(sub => selectedCategories.includes(sub.categories?.name)).length > 6 && (
                        <button
                          onClick={() => setShowSubcategoryModal(true)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80 transition-all duration-300"
                        >
                          +{subcategories.filter(sub => selectedCategories.includes(sub.categories?.name)).length - 6} more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Work Type */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4 flex items-center">
                  <span className="mr-2">🏢</span> Work Type
                </h3>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All", icon: "🌐" },
                    { value: "remote", label: "Remote", icon: "🏠" },
                    { value: "office", label: "Office", icon: "🏢" }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setRemoteOrOffice(option.value)}
                      className={`
                        flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105
                        ${remoteOrOffice === option.value
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                          : 'bg-white/20 dark:bg-gray-700/50 text-white/80 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/50'
                        }
                      `}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4 flex items-center">
                  <span className="mr-2">⏰</span> Job Type
                </h3>
                <CustomDropdown
                  value={jobType}
                  onChange={setJobType}
                  options={jobTypeOptions}
                  placeholder="Select job type"
                  icon="⏰"
                />
              </div>

              {/* Dual Range Salary Slider */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4 flex items-center">
                  <span className="mr-2">💰</span> Salary Range
                </h3>
                <DualRangeSlider
                  min={0}
                  max={200000}
                  minValue={minSalary}
                  maxValue={maxSalary}
                  step={5000}
                  onChange={handleSalaryChange}
                />
              </div>

              {/* Keyword Search */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4 flex items-center">
                  <span className="mr-2">🔑</span> Keyword
                </h3>
                <input
                  type="text"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="e.g. Btech, React, Python"
                  className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400"
                />
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4 flex items-center">
                  <span className="mr-2">🎓</span> Experience
                </h3>
                <select
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full rounded px-3 py-2 bg-white/20 dark:bg-gray-700/50 text-white dark:text-gray-200"
                >
                  <option value="any">Any</option>
                  <option value="fresher">Fresher</option>
                  <option value="1">1+ Years</option>
                  <option value="2">2+ Years</option>
                  <option value="3">3+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🔍</span>
                    Search Jobs
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Right Content Area - Job Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white dark:text-gray-200">
                {jobs.length > 0 ? `Found ${jobs.length} jobs` : isLoading ? "Searching..." : "Search for jobs"}
              </h2>
            </div>
            {/* Selected Filters Chips */}
            <div className="mb-4 overflow-x-auto whitespace-nowrap flex items-center" style={{ scrollbarWidth: "thin" }}>
              {/* ...chips... */}
            </div>
            <div className="flex flex-wrap gap-6">
              {isLoading ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="min-w-[320px] max-w-xs w-full">
                    <JobCardSkeleton />
                  </div>
                ))
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="min-w-[320px] max-w-xs w-full">
                    <JobCard job={job} percentMatch={job.percentMatch} />
                  </div>
                ))
              )}
            </div>
            {!isLoading && jobs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">No jobs found</h3>
                <p className="text-white/60 dark:text-gray-400 text-lg mb-6">Try adjusting your search filters to find more opportunities.</p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Selection Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        title="Select Categories"
      />

      {/* Subcategory Selection Modal */}
      <SubcategoryModal
        isOpen={showSubcategoryModal}
        onClose={() => setShowSubcategoryModal(false)}
        subcategories={subcategories}
        selectedSubcategories={selectedSubcategories}
        onToggleSubcategory={toggleSubcategory}
        selectedCategories={selectedCategories}
        title="Select Subcategories"
      />

      <style jsx global>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 2;
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 2;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #db2777);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .chip {
          display: inline-block;
          background: #eee;
          color: #333;
          border-radius: 16px;
          padding: 4px 12px;
          margin-right: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}