import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminAnggota() {
  return (
    <AdminCrud
      testIdPrefix="anggota"
      title="Anggota"
      endpoint="/anggota"
      emptyNew={{
        name: "",
        position: "",
        department: "",
        photo_url: "",
        bio: "",
        instagram: "",
        linkedin: "",
      }}
      fields={[
        { name: "name", label: "Nama" },
        { name: "position", label: "Jabatan" },
        { name: "department", label: "Departemen", hint: "Inti / PSDM / AKADEMIK / dll." },
        { name: "photo_url", label: "URL Foto", hint: "opsional" },
        { name: "bio", label: "Bio", type: "textarea", rows: 3 },
        { name: "instagram", label: "Instagram (@handle)" },
        { name: "linkedin", label: "LinkedIn URL" },
      ]}
      columns={[
        { key: "name", label: "Nama" },
        { key: "position", label: "Jabatan" },
        { key: "department", label: "Dept" },
      ]}
    />
  );
}
