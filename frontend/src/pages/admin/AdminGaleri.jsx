import { AdminCrud } from "@/components/admin/AdminCrud";

const SPAN_OPTIONS = [
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
];

export default function AdminGaleri() {
  return (
    <AdminCrud
      testIdPrefix="galeri"
      title="Galeri"
      endpoint="/galeri"
      emptyNew={{
        title: "",
        type: "image",
        image_url: "",
        video_url: "",
        category: "Kegiatan",
        description: "",
        span: SPAN_OPTIONS[0],
      }}
      fields={[
        { name: "title", label: "Judul" },
        {
          name: "type",
          label: "Tipe Media",
          type: "select",
          options: [
            { value: "image", label: "Gambar" },
            { value: "video", label: "Video" },
          ],
        },
        { name: "image_url", label: "URL Gambar / Thumbnail" },
        { name: "video_url", label: "URL Video (.mp4)" },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          options: [
            "Kegiatan",
            "Rapat",
            "Seminar",
            "Workshop",
            "Lomba",
            "Diesnatalis",
            "Lainnya",
          ].map((c) => ({ value: c, label: c })),
        },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
        {
          name: "span",
          label: "Layout Bento (Span)",
          type: "select",
          options: SPAN_OPTIONS.map((s, i) => ({ value: s, label: `Layout ${i + 1}` })),
        },
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
        { key: "type", label: "Tipe" },
        { key: "category", label: "Kategori" },
      ]}
    />
  );
}
