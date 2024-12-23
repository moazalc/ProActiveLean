import AdminChecklistReview from "@/components/checklist/admin-review";

export default function AdminChecklistsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checklist İncelemeleri</h1>
      <AdminChecklistReview />
    </div>
  );
}
