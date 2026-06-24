import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminProgramKerja() {
  return (
    <AdminCrud
      testIdPrefix="program-kerja"
      title="Program Kerja"
      endpoint="/program-kerja"
      emptyNew={{
        title: "",
        department: "",
        description: "",
        schedule: "",
        status: "planned",
        image_url: "",
      }}
      fields={[
        { name: "title", label: "Judul Program" },
        { name: "department", label: "Departemen" },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 4 },
        { name: "schedule", label: "Jadwal", hint: "cth: Maret 2026" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "planned", label: "Direncanakan" },
            { value: "ongoing", label: "Berlangsung" },
            { value: "completed", label: "Selesai" },
          ],
        },
        { name: "image_url", label: "URL Gambar", hint: "opsional" },
      ]}
      columns={[
        { key: "title", label: "Judul" },
        { key: "department", label: "Dept" },
        { key: "schedule", label: "Jadwal" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
