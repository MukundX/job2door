// src/app/job/[slug]/page.tsx
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import JobDetailClient from "./JobDetailClient";
import type { Job } from "./JobDetailClient";

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

interface JobCategoryJoin {
  categories?: {
    name?: string | null;
    icon?: string | null;
  } | null;
  subcategories?: {
    name?: string | null;
  } | null;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = params;

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

  let similarJobs: Job[] = [];
  let companyJobs: Job[] = [];

  const jobCategories =
    jobData.job_categories?.map((jc: JobCategoryJoin) => jc.categories?.name).filter(Boolean) || [];

  const jobSubcategories =
    jobData.job_categories?.map((jc: JobCategoryJoin) => jc.subcategories?.name).filter(Boolean) || [];

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
      const scoredJobs = similarData.map((job: Job & { job_categories?: JobCategoryJoin[] }) => {
        let score = 0;
        const jobCats = job.job_categories?.map((jc) => jc.categories?.name).filter(Boolean) || [];
        const jobSubs = job.job_categories?.map((jc) => jc.subcategories?.name).filter(Boolean) || [];

        jobSubs.forEach((sub) => {
          if (sub && jobSubcategories.includes(sub)) score += 3;
        });
        jobCats.forEach((cat) => {
          if (cat && jobCategories.includes(cat)) score += 1;
        });

        return { ...job, similarityScore: score };
      });

      similarJobs = scoredJobs
        .filter((job) => job.similarityScore > 0)
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, 3);
    }
  }

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
      companyJobs = companyData as Job[];
    }
  }

  return (
    <JobDetailClient
      job={jobData as Job}
      similarJobs={similarJobs}
      companyJobs={companyJobs}
      slug={slug}
    />
  );
}
