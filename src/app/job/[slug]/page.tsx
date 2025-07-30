import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import JobDetailClient from "./JobDetailClient";

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch job data server-side
  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .select(`
      *,
      job_company(*),
      job_categories(
        categories(name, icon),
        subcategories(name)
      ),
      job_education(
        education(id, name)
      )
    `)
    .eq("slug", slug)
    .single();

  if (!jobData || jobError) {
    notFound();
  }

  // Fetch similar jobs
  let similarJobs: any[] = [];
  let companyJobs: any[] = [];
  const jobCategories = jobData.job_categories?.map((jc: any) => jc.categories?.name).filter(Boolean) || [];
  const jobSubcategories = jobData.job_categories?.map((jc: any) => jc.subcategories?.name).filter(Boolean) || [];

  if (jobCategories.length > 0) {
    const { data: similarData } = await supabase
      .from("jobs")
      .select(`
        *,
        job_company(*),
        job_categories(
          categories(name),
          subcategories(name)
        )
      `)
      .neq("id", jobData.id)
      .limit(10);

    if (similarData) {
      const scoredJobs = similarData.map(job => {
        let score = 0;
        const jobCats = job.job_categories?.map((jc: any) => jc.categories?.name).filter(Boolean) || [];
        const jobSubs = job.job_categories?.map((jc: any) => jc.subcategories?.name).filter(Boolean) || [];
        jobSubs.forEach((sub: string) => {
          if (jobSubcategories.includes(sub)) score += 3;
        });
        jobCats.forEach((cat: string) => {
          if (jobCategories.includes(cat)) score += 1;
        });
        return { ...job, similarityScore: score };
      });
      similarJobs = scoredJobs
        .filter(job => job.similarityScore > 0)
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, 3);
    }
  }

  // Fetch other jobs from same company
  if (jobData.job_company?.id) {
    const { data: companyData } = await supabase
      .from("jobs")
      .select(`
        *,
        job_company(*)
      `)
      .eq("company", jobData.job_company.id)
      .neq("id", jobData.id)
      .limit(3);
    if (companyData) {
      companyJobs = companyData;
    }
  }

  // Pass all data to your client component (which contains all your UI and logic)
  return (
    <JobDetailClient
      job={jobData}
      similarJobs={similarJobs}
      companyJobs={companyJobs}
      slug={slug}
    />
  );
}