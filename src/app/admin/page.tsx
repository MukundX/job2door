"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/Button";

// Helper for slug
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  // Auth
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Tabs
  const [tab, setTab] = useState<"create" | "all" | "company" | "categories">("create");

  // Form states
  const [jobTitle, setJobTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugAvailable, setSlugAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [applyLink, setApplyLink] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState<string | null>(null);

  interface Category { id: string; name: string; }
  interface Subcategory { id: string; name: string; category_id: string; }
  interface Job { id: string; title: string; company: string; slug: string; apply_link: string; }
  interface Education { id: string; name: string; }

  
  
  interface CompanySuggestion { id: string; company_name: string; }
  const [companySuggestions, setCompanySuggestions] = useState<CompanySuggestion[]>([]);
  const [companyAddedMsg, setCompanyAddedMsg] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Fulltime");
  const [workType, setWorkType] = useState("remote");
  const [experience, setExperience] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [isPromotion, setIsPromotion] = useState(false);
  const [deadline, setDeadline] = useState(""); // <-- Add this line
  const [showCatModal, setShowCatModal] = useState(false);
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [attachmentInputs, setAttachmentInputs] = useState<string[]>(["", "", "", "", ""]);

  // Category & Subcategory
  // const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [addCatMsg, setAddCatMsg] = useState("");
  const [addSubcatMsg, setAddSubcatMsg] = useState("");

  // Add these state hooks near your other useState hooks
const [aboutRole, setAboutRole] = useState("");
const [qualificationsInput, setQualificationsInput] = useState("");
const [responsibilitiesInput, setResponsibilitiesInput] = useState("");
const [attachmentsInput, setAttachmentsInput] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
const [remoteOrOffice, setRemoteOrOffice] = useState("remote");
const [attachmentsList, setAttachmentsList] = useState<{url: string, name: string, size: string, type: string}[]>([]);
const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);
const [selectedSubcatIds, setSelectedSubcatIds] = useState<string[]>([]);
// const [educationOptions, setEducationOptions] = useState<any[]>([]);
const [selectedEducations, setSelectedEducations] = useState<string[]>([]);

const [categories, setCategories] = useState<Category[]>([]);
const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
const [jobs, setJobs] = useState<Job[]>([]);
const [educationOptions, setEducationOptions] = useState<Education[]>([]);
// Custom select popups
  const [catPopup, setCatPopup] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [subcatPopup, setSubcatPopup] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const catBtnRef = useRef<HTMLButtonElement>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const subcatBtnRef = useRef<HTMLButtonElement>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  // All jobs
  // const [jobs, setJobs] = useState<any[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  // Company profile form
  const [companyProfile, setCompanyProfile] = useState({
    company_name: "",
    company_username: "",
    description: "",
    location: "",
    x: "",
    instagram: "",
    facebook: "",
    telegram: "",
  });
  const [companyProfileMsg, setCompanyProfileMsg] = useState("");

  // Password auth (simple, replace with env or secure backend in production)
  const ADMIN_PASSWORD = "jobleradmin2024"; // Change this!

  // Auth check
  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  };

  // Slug auto-create and check
  useEffect(() => {
    if (!jobTitle) {
      setSlug("");
      setSlugAvailable(true);
      return;
    }
    const newSlug = slugify(jobTitle);
    setSlug(newSlug);
    supabase.from("jobs").select("id").eq("slug", newSlug).then(({ data }) => {
      setSlugAvailable(!data || data.length === 0);
    });
  }, [jobTitle]);

  // Tag suggestions
  useEffect(() => {
    if (tagInput.length > 0) {
      supabase
        .from("jobs")
        .select("tags")
        .limit(20)
        .then(({ data }) => {
          const allTags = Array.from(
            new Set(
              (data || [])
                .flatMap((j: any) => j.tags || [])
                .filter((t: string) => t && t.toLowerCase().includes(tagInput.toLowerCase()))
            )
          );
          setTagSuggestions(allTags);
        });
    } else {
      setTagSuggestions([]);
    }
  }, [tagInput]);

  // Company suggestions
  useEffect(() => {
    if (company.length > 0) {
      supabase
        .from("job_company")
        .select("*")
        .ilike("company_name", `%${company}%`)
        .limit(10)
        .then(({ data }) => setCompanySuggestions(data || []));
    } else {
      setCompanySuggestions([]);
    }
  }, [company]);

  // Fetch categories
  useEffect(() => {
    supabase.from("categories").select("*").then(({ data }) => setCategories(data || []));
  }, []);

  // Fetch subcategories for selected categories
  useEffect(() => {
  if (tab === "categories") {
      supabase
        .from("subcategories")
        .select("*")
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching subcategories:", error);
          }
          setSubcategories(data || []);
        });
    }
  }, [tab]);

  // All jobs fetch
  useEffect(() => {
    if (isAuthed && tab === "all") {
      setJobsLoading(true);
      supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50)
        .then(({ data }) => {
          setJobs(data || []);
          setJobsLoading(false);
        });
    }
  }, [isAuthed, tab]);

  // Education options fetch
  useEffect(() => {
    supabase.from("education").select("*").then(({ data }) => setEducationOptions(data || []));
  }, []);

  // Add tag
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    setTagInput("");
  };
  const handleRemoveTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  // Handle job delete
  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);
    if (error) {
      alert("Failed to delete job: " + error.message);
    } else {
      setJobs(jobs => jobs.filter(job => job.id !== jobId));
    }
  };

  // Add new company (quick add)
  // const handleAddCompany = () => {
  //   if (company) {
  //     supabase
  //       .from("job_company")
  //       .insert([{ company_name: company }])
  //       .then(() => {
  //         setCompanyAddedMsg(`Company: ${company} added in list`);
  //         setTimeout(() => setCompanyAddedMsg(""), 3000);
  //         setCompanySuggestions([]);
  //       });
  //   }
  // };

  // Add new category
  const handleAddCategory = async () => {
    if (newCategory) {
      const { error } = await supabase.from("categories").insert([{ name: newCategory }]);
      if (!error) {
        setAddCatMsg(`Category: ${newCategory} added`);
        setNewCategory("");
        supabase.from("categories").select("*").then(({ data }) => setCategories(data || []));
        setTimeout(() => setAddCatMsg(""), 3000);
      }
    }
  };

  // Add new subcategory
  const handleAddSubcategory = async () => {
    // Use catManageView if present, otherwise fallback to selectedCategories[0]
    const categoryId = catManageView?.id || selectedCategories[0];
    if (newSubcategory && categoryId) {
      const { error } = await supabase.from("subcategories").insert([
        { name: newSubcategory, category_id: categoryId },
      ]);
      if (!error) {
        setAddSubcatMsg(`Subcategory: ${newSubcategory} added`);
        setNewSubcategory("");
        // Refresh subcategories
        supabase
          .from("subcategories")
          .select("*")
          .then(({ data }) => setSubcategories(data || []));
        setTimeout(() => setAddSubcatMsg(""), 3000);
      }
    }
  };

  // Custom multi-select for categories
  const handleCategorySelect = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(cid => cid !== id));
      setSelectedSubcategories(selectedSubcategories.filter(subId => {
        const sub = subcategories.find((s) => s.id === subId)
        return sub?.category_id !== id;
      }));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // Custom multi-select for subcategories
  const handleSubcategorySelect = (id: string) => {
    if (selectedSubcategories.includes(id)) {
      setSelectedSubcategories(selectedSubcategories.filter(sid => sid !== id));
    } else {
      setSelectedSubcategories([...selectedSubcategories, id]);
    }
  };

  // Post job
  const [postError, setPostError] = useState("");
  const [postSuccess, setPostSuccess] = useState("");
  const handlePostJob = async () => {
  setPostError("");
  setPostSuccess("");

  if (!jobTitle || !slugAvailable || !applyLink || !companyId) {
    setPostError("Fill all required fields and ensure slug is unique and company is selected.");
    return;
  }

  const qualifications = qualificationsInput.split("\n").map(q => q.trim()).filter(Boolean);
  const responsibilities = responsibilitiesInput.split("\n").map(r => r.trim()).filter(Boolean);
  const attachments = attachmentsList.map(att => ({
    url: att.url,
    name: att.name,
    size: att.size,
    type: att.type,
  }));

  // Get selected education names
  const selectedEducationNames = educationOptions
    .filter(edu => selectedEducations.includes(edu.id))
    .map(edu => edu.name)
    .join(",");

  // Construct the full_job_detail JSON object
  const fullJobDetail = {
    title: jobTitle,
    slug,
    description,
    tags,
    apply_link: applyLink,
    total_seats: totalSeats,
    deadline,
    company: companyId,
    location,
    job_type: jobType,
    work_type: workType,
    experience,
    salary_min: salaryMin,
    salary_max: salaryMax,
    isPromotion,
    about_role: aboutRole,
    qualifications,
    responsibilities,
    attachments,
    remoteOrOffice,
  };

  try {
    // Insert job with education_names column
    const { data, error } = await supabase.from("jobs").insert([
      {
        title: jobTitle,
        slug,
        description,
        tags,
        apply_link: applyLink,
        total_seats: totalSeats,
        deadline,
        company: companyId,
        location,
        job_type: jobType,
        work_type: workType,
        experience,
        salary_min: salaryMin,
        salary_max: salaryMax,
        isPromotion,
        about_role: aboutRole,
        qualifications,
        responsibilities,
        attachments,
        remoteOrOffice,
        full_job_detail: fullJobDetail,
        education_names: selectedEducationNames, // <-- update column here
      },
    ]);

    if (error) {
      setPostError(error.message);
      return;
    }

    const jobsData = data as { id: string }[] | null;

    // Insert into job_categories junction table
    if (jobsData && jobsData[0]?.id) {
      await Promise.all(
        selectedCategories.flatMap(catId =>
          selectedSubcategories
            .filter(subId => {
              const sub = subcategories.find((s: any) => s.id === subId);
              return sub?.category_id === catId;
            })
            .map(subId =>
              supabase.from("job_categories").insert([
                {
                  job_id: jobsData[0].id,
                  category_id: catId,
                  subcategory_id: subId,
                  company_id: companyId,
                },
              ])
            )
        )
      );

      // Upsert job_education table
      await supabase.from("job_education").delete().eq("job_id", jobsData[0].id);
      if (selectedEducations.length > 0) {
        await supabase.from("job_education").insert(
          selectedEducations.map(education_id => ({
            job_id: jobsData[0].id,
            education_id,
          }))
        );
      }
    }

    setPostSuccess("Job posted successfully!");
  } catch (error) {
    setPostError("An error occurred while posting the job.");
    console.error(error);
  }
};

    const [catManageView, setCatManageView] = useState<null | { id: string, name: string }>(null);


  // Company profile form submit
  const handleCompanyProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyProfile({ ...companyProfile, [e.target.name]: e.target.value });
  };
  const handleCompanyProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { company_name, company_username } = companyProfile;
    if (!company_name || !company_username) {
      setCompanyProfileMsg("Company name and username are required.");
      return;
    }
    const { error } = await supabase.from("job_company").insert([companyProfile]);
    if (error) setCompanyProfileMsg(error.message);
    else {
      setCompanyProfileMsg("Company profile created!");
      setCompanyProfile({
        company_name: "",
        company_username: "",
        description: "",
        location: "",
        x: "",
        instagram: "",
        facebook: "",
        telegram: "",
      });
    }
  };

  

  // Helper to get file info from URL (type and size)
  async function getFileInfo(url: string): Promise<{name: string, size: string, type: string} | null> {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const sizeHeader = res.headers.get("content-length");
      const contentType = res.headers.get("content-type") || "";
      let type = "";
      if (contentType.includes("pdf")) type = "PDF";
      else if (contentType.startsWith("image/")) type = "IMAGE";
      else return null; // Only allow PDF and images

      const name = url.split("/").pop() || "file";
      const size = sizeHeader ? `${(Number(sizeHeader) / (1024 * 1024)).toFixed(1)} MB` : "";
      return { name, size, type };
    } catch {
      return null;
    }
  }

  // Handle opening the modal
  const handleOpenAttachmentsModal = () => {
    setAttachmentInputs(attachmentsList.map(att => att.url).concat(Array(5).fill("")).slice(0, 5));
    setShowAttachmentsModal(true);
  };

  // Handle input change in modal
  const handleAttachmentInputChange = (idx: number, value: string) => {
    setAttachmentInputs(inputs => {
      const updated = [...inputs];
      updated[idx] = value;
      return updated;
    });
  };

  // Handle Done in modal
  const handleAttachmentsDone = async () => {
    const urls = attachmentInputs
      .map(url => url.trim())
      .filter(Boolean)
      .slice(0, 5);

    const files: { url: string; name: string; size: string; type: string }[] = [];
    for (const url of urls) {
      const info = await getFileInfo(url);
      if (!info) continue; // Skip if not image/pdf
      files.push({ url, ...info });
    }
    setAttachmentsList(files);
    setAttachmentsInput(urls.join(", "));
    setShowAttachmentsModal(false);
  };

  // Remove attachment from list
  const handleRemoveAttachment = (url: string) => {
    const updated = attachmentsList.filter(att => att.url !== url);
    setAttachmentsList(updated);
    setAttachmentsInput(updated.map(att => att.url).join(", "));
  };

  // Parse attachments from input
  const parseAttachments = (input: string) => {
    return input
      .split(",")
      .map(url => url.trim())
      .filter(Boolean)
      .map(url => {
        const name = url.split("/").pop() || "";
        const ext = name.split(".").pop()?.toUpperCase() || "";
        let type = "";
        if (ext === "PDF") type = "PDF";
        else if (["PNG", "JPG", "JPEG", "GIF", "WEBP"].includes(ext)) type = "Image";
        else if (["DOC", "DOCX"].includes(ext)) type = "Word";
        else if (["XLS", "XLSX"].includes(ext)) type = "Excel";
        else type = ext;
        // Size can't be detected from URL alone, so leave as empty string
        return { url, name, size: "", type };
      });
  };// eslint-disable-line @typescript-eslint/no-unused-vars

  // Helper arrays for bulk selection
  const allCatIds = categories.map((cat: any) => cat.id);
  const allSubcatIds = catManageView 
    ? subcategories.filter((s) => s.category_id === catManageView.id).map((s) => s.id)
    : []; // eslint-disable-line @typescript-eslint/no-unused-vars

  // Bulk delete handler for categories and subcategories
  const handleBulkDelete = async () => {
    if (!catManageView) {
      // Bulk delete categories
      if (
        selectedCatIds.length > 0 &&
        window.confirm("Delete selected categories and all their subcategories?")
      ) {
        await Promise.all(
          selectedCatIds.map(async catId => {
            await supabase.from("categories").delete().eq("id", catId);
            await supabase.from("subcategories").delete().eq("category_id", catId);
          })
        );
        setCategories(categories.filter(c => !selectedCatIds.includes(c.id)));
        setSubcategories(subcategories.filter(s => !selectedCatIds.includes(s.category_id)));
        setSelectedCatIds([]);
      }
    } else {
      // Bulk delete subcategories
      if (
        selectedSubcatIds.length > 0 &&
        window.confirm("Delete selected subcategories?")
      ) {
        await Promise.all(
          selectedSubcatIds.map(async subId => {
            await supabase.from("subcategories").delete().eq("id", subId);
          })
        );
        setSubcategories(subcategories.filter(s => !selectedSubcatIds.includes(s.id)));
        setSelectedSubcatIds([]);
      }
    }
  };

  const handleDeleteCategory = async (catId: string) => { 
  if (!window.confirm("Delete this category and all its subcategories?")) return;
  await supabase.from("categories").delete().eq("id", catId);
  await supabase.from("subcategories").delete().eq("category_id", catId);
  setCategories(categories.filter(c => c.id !== catId));
  setSubcategories(subcategories.filter(s => s.category_id !== catId));
}; // eslint-disable-line @typescript-eslint/no-unused-vars

const handleDeleteSubcategory = async (subId: string) => {  
  if (!window.confirm("Delete this subcategory?")) return;
  await supabase.from("subcategories").delete().eq("id", subId);
  setSubcategories(subcategories.filter(s => s.id !== subId));
}; // eslint-disable-line @typescript-eslint/no-unused-vars

  // UI
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded px-3 py-2 mb-4 border border-gray-300 dark:border-gray-700"
            placeholder="Enter admin password"
          />
          {authError && <div className="text-red-500 mb-2 text-center">{authError}</div>}
          <Button className="w-full bg-purple-600 text-white" onClick={handleAuth}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-0 py-4 overflow-x-hidden">
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-6">
      <div className="w-full box-border px-0 sm:px-2"> {/* Responsive padding for all content */}
        <div className="flex gap-2 mb-4 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <Button className={`px-3 py-1 text-sm whitespace-nowrap ${tab === "create" ? "bg-purple-600 text-white" : ""}`} onClick={() => setTab("create")}>
            Create Job
          </Button>
          <Button className={`px-3 py-1 text-sm whitespace-nowrap ${tab === "all" ? "bg-purple-600 text-white" : ""}`} onClick={() => setTab("all")}>
            All Jobs
          </Button>
          <Button className={`px-3 py-1 text-sm whitespace-nowrap ${tab === "company" ? "bg-purple-600 text-white" : ""}`} onClick={() => setTab("company")}>
            Company
          </Button>
          <Button className={`px-3 py-1 text-sm whitespace-nowrap ${tab === "categories" ? "bg-purple-600 text-white" : ""}`} onClick={() => setTab("categories")}>
            Categories
          </Button>
        </div>

        {/* --- Company Profile Tab --- */}
        {tab === "company" && (
          <form onSubmit={handleCompanyProfileSubmit} className="space-y-4">
            <h2 className="text-xl font-bold mb-2">Create Company Profile</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                name="company_name"
                value={companyProfile.company_name}
                onChange={handleCompanyProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Username</label>
              <input
                name="company_username"
                value={companyProfile.company_username}
                onChange={handleCompanyProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={companyProfile.description}
                onChange={handleCompanyProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                name="location"
                value={companyProfile.location}
                onChange={handleCompanyProfileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 ">
              <div>
                <label className="block text-sm font-medium text-gray-700">X (Twitter)</label>
                <input
                  name="x"
                  value={companyProfile.x}
                  onChange={handleCompanyProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  name="instagram"
                  value={companyProfile.instagram}
                  onChange={handleCompanyProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook</label>
                <input
                  name="facebook"
                  value={companyProfile.facebook}
                  onChange={handleCompanyProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telegram</label>
                <input
                  name="telegram"
                  value={companyProfile.telegram}
                  onChange={handleCompanyProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                />
              </div>
            </div>
            {companyProfileMsg && <div className="text-green-600">{companyProfileMsg}</div>}
            <Button type="submit" className="bg-purple-600 text-white">Create Company</Button>
          </form>
        )}

        {/* --- Create Job Tab --- */}
        {tab === "create" && (
          <form
            onSubmit={e => {
              e.preventDefault();
              handlePostJob();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  placeholder="Enter job title"
                  required
                />
              </div>
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">job/</span>
                  <input
                    type="text"
                    value={slug}
                    readOnly
                    className={`block w-full rounded-md border ${slugAvailable ? "border-gray-300" : "border-red-500"} shadow-sm bg-black text-white px-3 py-2`}
                  />
                  {!slugAvailable && <span className="text-xs text-red-600">Slug is already taken.</span>}
                </div>
              </div>

              

{/* Education Required */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Education Required</label>
  <div className="flex flex-wrap gap-2">
    {educationOptions.map(edu => (
      <button
        key={edu.id}
        type="button"
        onClick={() =>
          setSelectedEducations(prev =>
            prev.includes(edu.id)
              ? prev.filter(id => id !== edu.id)
              : [...prev, edu.id]
          )
        }
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
          ${selectedEducations.includes(edu.id)
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
          }`}
      >
        {edu.name}
      </button>
    ))}
  </div>
  {selectedEducations.length === 0 && (
    <div className="text-xs text-gray-400 mt-1">Select at least one education tag if required.</div>
  )}
</div>



              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  rows={2}
                  placeholder="Describe the job"
                />
              </div>
              {/* About Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">About Role</label>
                <textarea
                  value={aboutRole}
                  onChange={e => setAboutRole(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  rows={2}
                  placeholder="Describe the role"
                />
              </div>
              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualifications (one per line)</label>
                <textarea
                  value={qualificationsInput}
                  onChange={e => setQualificationsInput(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  rows={3}
                  placeholder="Qualification 1&#10;Qualification 2"
                />
              </div>
              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Responsibilities (one per line)</label>
                <textarea
                  value={responsibilitiesInput}
                  onChange={e => setResponsibilitiesInput(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  rows={3}
                  placeholder="Responsibility 1&#10;Responsibility 2"
                />
              </div>
              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Attachments (PDF/Image, max 5, paste links separated by space or comma)
                </label>
                <input
                  type="text"
                  value={attachmentsList.map(att => att.url).join(", ")}
                  readOnly
                  onClick={handleOpenAttachmentsModal}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white cursor-pointer px-3 py-2"
                  placeholder="Click to add attachments"
                />
                <div className="mt-2 space-y-1">
                  {attachmentsList.map(att => (
                    <div key={att.url} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      <a href={att.url} target="_blank" rel="noopener noreferrer" className="font-medium underline">{att.name}</a>
                      <span className="text-xs text-gray-500">{att.size}</span>
                      <span className="text-xs text-gray-500">{att.type}</span>
                      <button
                        type="button"
                        className="text-red-500 text-xs ml-2"
                        onClick={() => handleRemoveAttachment(att.url)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {attachmentsList.length === 5 && (
                    <div className="text-xs text-yellow-600">Maximum 5 attachments allowed.</div>
                  )}
                </div>
              </div>
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Type to add tag"
                  />
                  <Button type="button" onClick={() => handleAddTag(tagInput)}>
                    Add
                  </Button>
                </div>
                {tagSuggestions.length > 0 && (
                  <div className="mt-1 rounded bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
                    {tagSuggestions.map(suggestion => (
                      <div
                        key={suggestion}
                        onClick={() => handleAddTag(suggestion)}
                        className="cursor-pointer px-3 py-1 hover:bg-purple-100 dark:hover:bg-purple-900 text-black dark:text-white"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 flex-wrap mt-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center">
                      {tag}
                      <button type="button" className="ml-1 text-xs text-red-500" onClick={() => handleRemoveTag(tag)}>✕</button>
                    </span>
                  ))}
                </div>
              </div>
              {/* Apply Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Apply Link</label>
                <input
                  type="url"
                  value={applyLink}
                  onChange={e => setApplyLink(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  placeholder="Enter application link"
                  required
                />
              </div>
              {/* Total Seats */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Seats</label>
                <input
                  type="number"
                  value={totalSeats}
                  onChange={e => setTotalSeats(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  placeholder="Enter total seats"
                />
              </div>
              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                />
              </div>
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => {
                    setCompany(e.target.value);
                    setCompanyId(null);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  placeholder="Enter company name"
                  required
                  autoComplete="off"
                />
                {companyId && (
                  <div className="text-green-600 text-xs mt-1">Company selected</div>
                )}
                {companySuggestions.length > 0 && (
                  <div className="mt-1 rounded bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
                    {companySuggestions.map(companyObj => (
                      <div
                        key={companyObj.id}
                        onClick={() => {
                          setCompany(companyObj.company_name);
                          setCompanyId(companyObj.id);
                          setCompanySuggestions([]);
                        }}
                        className="cursor-pointer px-3 py-1 hover:bg-purple-100 dark:hover:bg-purple-900 text-black dark:text-white"
                      >
                        {companyObj.company_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                  placeholder="Location"
                />
              </div>
              {/* Work Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Type</label>
                <select
                  value={remoteOrOffice}
                  onChange={e => setRemoteOrOffice(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                >
                  <option value="remote">Remote</option>
                  <option value="office">Office</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Type</label>
                <select
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                >
                  <option value="Fulltime">Fulltime</option>
                  <option value="Parttime">Parttime</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              {/* Salary Min/Max */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Salary Min</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={e => setSalaryMin(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                    placeholder="₹"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Salary Max</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={e => setSalaryMax(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                    placeholder="₹"
                  />
                </div>
              </div>
              {/* Promoted */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Promoted?</label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={isPromotion}
                    onChange={e => setIsPromotion(e.target.checked)}
                    className="mr-2"
                  />
                  <span>{isPromotion ? "Yes" : "No"}</span>
                </div>
              </div>
              {/* --- Category Multi-select with Custom Popup --- */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Categories & Subcategories</label>
                <button
                  type="button"
                  className="mt-1 w-full text-left px-3 py-2 border rounded-md bg-white dark:bg-gray-800 shadow-sm text-black dark:text-white"
                  onClick={() => setShowCatModal(true)}
                >
                  {selectedCategories.length === 0
                    ? "Select categories"
                    : categories
                        .filter(cat => selectedCategories.includes(cat.id))
                        .map(cat => cat.name)
                        .join(", ")}
                </button>
              </div>
              {/* Modal for category/subcategory selection */}
              {showCatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
                    <button
                      className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      onClick={() => setShowCatModal(false)}
                      aria-label="Close"
                    >×</button>
                    <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Select Categories & Subcategories</h2>
                    
                    {/* Add Category */}
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                        placeholder="Add new category"
                      />
                      <Button type="button" className="bg-purple-600 text-white" onClick={handleAddCategory}>
                        Add Category
                      </Button>
                    </div>
                    {addCatMsg && <div className="text-green-600 text-xs mb-2">{addCatMsg}</div>}

                    <div className="mb-2 font-semibold text-black dark:text-white">Categories</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategorySelect(category.id)}
                          className={`px-3 py-1 rounded-full border transition
                            ${selectedCategories.includes(category.id)
                              ? "bg-purple-600 text-white border-purple-700"
                              : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"}
                            hover:bg-purple-200 dark:hover:bg-purple-900`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>

                    {/* Add Subcategory (only if one category selected) */}
                    {selectedCategories.length === 1 && (
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={newSubcategory}
                          onChange={e => setNewSubcategory(e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2"
                          placeholder={`Add subcategory to "${categories.find(c => c.id === selectedCategories[0])?.name || ""}"`}
                        />
                        <Button type="button" className="bg-pink-600 text-white" onClick={handleAddSubcategory}>
                          Add Subcategory
                        </Button>
                      </div>
                    )}
                    {addSubcatMsg && <div className="text-green-600 text-xs mb-2">{addSubcatMsg}</div>}

                    {selectedCategories.length > 0 && (
                      <>
                        <div className="mt-4 mb-2 font-semibold text-black dark:text-white">Subcategories</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {subcategories
                            .filter(sub => selectedCategories.includes(sub.category_id))
                            .map(subcategory => (
                              <button
                                key={subcategory.id}
                                type="button"
                                onClick={() => handleSubcategorySelect(subcategory.id)}
                                className={`px-3 py-1 rounded-full border transition
                                  ${selectedSubcategories.includes(subcategory.id)
                                    ? "bg-pink-600 text-white border-pink-700"
                                    : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"}
                                  hover:bg-pink-200 dark:hover:bg-pink-900`}
                              >
                                {subcategory.name}
                              </button>
                            ))}
                        </div>
                      </>
                    )}
                    <div className="flex justify-end mt-6">
                      <Button type="button" className="bg-purple-600 text-white" onClick={() => setShowCatModal(false)}>
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {postError && <p className="mt-4 text-sm text-red-600">{postError}</p>}
            {postSuccess && <p className="mt-4 text-sm text-green-600">{postSuccess}</p>}
            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                onClick={() => {
                  setJobTitle("");
                  setSlug("");
                  setDescription("");
                  setTags([]);
                  setApplyLink("");
                  setTotalSeats("");
                  setDeadline("");
                  setCompany("");
                  setCompanyId(null);
                  setLocation("");
                  setJobType("Fulltime");
                  setWorkType("Remote");
                  setExperience("");
                  setSalaryMin("");
                  setSalaryMax("");
                  setIsPromotion(false);
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                  setAboutRole("");
                  setQualificationsInput("");
                  setResponsibilitiesInput("");
                  setAttachmentsInput("");
                  setAttachmentsList([]);
                  setSelectedEducations([]);
                }}
                className="bg-gray-300 text-gray-700"
              >
                Clear
              </Button>
              <Button type="submit" className="bg-purple-600 text-white">
                Post Job
              </Button>
            </div>
          </form>
        )}
        

        {/* --- All Jobs Tab --- */}
        {tab === "all" && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Jobs</h2>
            {jobsLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="border rounded p-4 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.company}</div>
                      <div className="text-xs text-gray-500">{job.slug}</div>
                      <div className="text-xs text-gray-500">{job.apply_link}</div>
                    </div>
                    <Button
                      type="button"
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- Categories Management Tab --- */}
        {tab === "categories" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
            {!catManageView ? (
              <>
                {/* Add Category Button and Input */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2 w-[90%]"
                    placeholder="Add new category"
                  />
                  <Button type="button" className="bg-purple-600 text-white px-3 py-2" onClick={handleAddCategory}>
                    Add Category
                  </Button>
                </div>
                {addCatMsg && <div className="text-green-600 text-xs mb-2">{addCatMsg}</div>}

                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCatIds.length === allCatIds.length && allCatIds.length > 0}
                    onChange={e =>
                      setSelectedCatIds(e.target.checked ? allCatIds : [])
                    }
                    className="mr-2"
                  />
                  <span className="font-semibold">Select All Categories</span>
                </div>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">
                      <div className="flex items-center flex-1">
                        <input
                          type="checkbox"
                          checked={selectedCatIds.includes(cat.id)}
                          onChange={e => {
                            setSelectedCatIds(val =>
                              e.target.checked
                                ? [...val, cat.id]
                                : val.filter(id => id !== cat.id)
                            );
                          }}
                          className="mr-2"
                        />
                        <button
                          className="font-semibold text-left flex-1"
                          onClick={() => {
                            setCatManageView(cat);
                            setSelectedSubcatIds([]);
                          }}
                        >
                          {cat.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    className="bg-red-600 text-white px-3 py-1"
                    onClick={handleBulkDelete}
                    disabled={selectedCatIds.length === 0}
                  >
                    Delete Selected
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <Button type="button" className="mr-2 px-2 py-1 text-xs" onClick={() => setCatManageView(null)}>
                    ← Back
                  </Button>
                  <span className="font-bold">{catManageView.name}</span>
                </div>
                {/* Add Subcategory Button and Input */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={e => setNewSubcategory(e.target.value)}
                    className="mr-2"
                  />
                  <span className="font-semibold">Select All Subcategories</span>
                </div>
                {/* Subcategories List or No Subcategories Message */}
                {subcategories.filter(s => s.category_id === catManageView.id).length === 0 ? (
                  <div className="flex items-center justify-center py-8 animate-pulse text-gray-500 font-semibold text-lg">
                    No subcategories of {catManageView.name}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {subcategories
                      .filter(s => s.category_id === catManageView.id)
                      .map(sub => (
                        <div key={sub.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
                          <div className="flex items-center flex-1">
                            <input
                              type="checkbox"
                              checked={selectedSubcatIds.includes(sub.id)}
                              onChange={e => {
                                setSelectedSubcatIds(val =>
                                  e.target.checked
                                    ? [...val, sub.id]
                                    : val.filter(id => id !== sub.id)
                                );
                              }}
                              className="mr-2"
                            />
                            <span>{sub.name}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    className="bg-red-600 text-white px-3 py-1 text-xs"
                    onClick={handleBulkDelete}
                    disabled={selectedSubcatIds.length === 0}
                  >
                    Delete Selected
                  </Button>
                  <Button
                    type="button"
                    className="bg-gray-400 text-white px-3 py-1 text-xs"
                    onClick={() => setCatManageView(null)}
                  >
                    Back to Categories
                  </Button>
                </div>
              </>
            )}
          </div>
        )}


        {/* --- Company Profile Tab --- */}
        </div>
      </div>

      

      {/* --- Attachments Modal --- */}
      {showAttachmentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 w-full max-w-md max-w-full max-h-[90vh] overflow-y-auto relative">

            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setShowAttachmentsModal(false)}
              aria-label="Close"
            >×</button>
            <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Add up to 5 Attachments</h2>
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map(idx => (
                <input
                  key={idx}
                  type="text"
                  value={attachmentInputs[idx] || ""}
                  onChange={e => handleAttachmentInputChange(idx, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
                  placeholder={`Attachment URL ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button type="button" className="bg-purple-600 text-white" onClick={handleAttachmentsDone}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

