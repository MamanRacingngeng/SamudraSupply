import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Samudra Supply",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-surface px-5 py-10 dark:bg-page sm:px-8">
      <div className="mx-auto max-w-6xl">
        <AdminDashboard />
      </div>
    </main>
  );
}
