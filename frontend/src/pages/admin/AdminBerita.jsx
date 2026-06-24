import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminBerita() {
  return (
    <AdminCrud
      testIdPrefix="berita"
      title="Berita"
      endpoint="/berita"
      emptyNew={{ title: "", excerpt: "", content: "", image_url: "", category: "Umum", author: "Admin" }}
      fields={[
        { name: "title", label: "Judul" },
        { name: "excerpt", label: "Ringkasan", type: "textarea", rows: 2 },
        { name: "content", label: "Isi", type: "textarea", rows: 8 },
        { name: "image_url", label: "URL Gambar", hint: "opsional" },
        { name: "category", label: "Kategori" },
        { name: "author", label: "Penulis" },
      ]}
      columns={[
        { key: "title", label: "Judul", render: (i) => <span className="font-medium">{i.title}</span> },
        { key: "category", label: "Kategori" },
        { key: "author", label: "Penulis" },
        {
          key: "published_at",
          label: "Tanggal",
          render: (i) => new Date(i.published_at).toLocaleDateString("id-ID"),
        },
      ]}
    />
  );
}
