import { supabase } from "../../lib/supabase";
import DashboardClient from "./DashboardClient";

export async function generateMetadata() {
  return {
    title: "Dashboard | Job2Door",
    description: "Your personalized job dashboard on Jobler.",
    alternates: {
      canonical: "https://jobler.com/dashboard",
    },
  };
}

export default async function DashboardPage() {
  const { data: recentJobs = [] } = await supabase
    .from("jobs")
    .select(`
      *,
      job_company(*),
      job_categories(
        categories(name, icon),
        subcategories(name)
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: promotionJobs = [] } = await supabase
    .from("jobs")
    .select(`
      *,
      job_company(*),
      job_categories(
        categories(name, icon),
        subcategories(name)
      )
    `)
    .eq("isPromotion", true)
    .order("created_at", { ascending: false });

  return (
    <DashboardClient
      initialRecentJobs={recentJobs ?? []}
      initialPromotionJobs={promotionJobs ?? []}
    />
  );
}
