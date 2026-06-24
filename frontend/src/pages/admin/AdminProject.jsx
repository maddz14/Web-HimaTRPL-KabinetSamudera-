import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminProject() {
  return (
    <AdminCrud
      testIdPrefix="project"
      title="Project"
      endpoint="/project"
      emptyNew={{
        title: "",
        description: "",
        category: "Web App",
        image_url: "",
        demo_url: "",
        github_url: "",
      }}
      fields={[
        { name: "title", label: "Judul Proyek" },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          options: [
            "Web App",
            "Mobile App",
            "IoT",
            "Game",
            "AI/ML",
            "Lainnya",
          ].map((c) => ({ value: c, label: c })),
        },
        { name: "image_url", label: "URL Gambar (Cover)" },
        { name: "demo_url", label: "URL Demo" },
        { name: "github_url", label: "URL Source Code (GitHub dll)" },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 4 },
      ]}
      columns={[
        {
          key: "image_url",
          label: "Preview",
          render: (i) =>
            i.image_url ? (
              <img src={i.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              "—"
            ),
        },
        { key: "title", label: "Judul" },
        { key: "category", label: "Kategori" },
      ]}
    />
  );
}
