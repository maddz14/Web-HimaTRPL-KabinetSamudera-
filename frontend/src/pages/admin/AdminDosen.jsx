import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminDosen() {
  return (
    <AdminCrud
      testIdPrefix="dosen"
      title="Dosen"
      endpoint="/dosen"
      emptyNew={{
        name: "",
        gelar_depan: "",
        gelar_belakang: "",
        bidang_keahlian: "",
        jabatan: "Dosen Tetap",
        photo_url: "",
        email: "",
        linkedin: "",
        research_url: "",
      }}
      fields={[
        { name: "name", label: "Nama (tanpa gelar)" },
        { name: "gelar_depan", label: "Gelar Depan (misal: Dr., Prof.)" },
        { name: "gelar_belakang", label: "Gelar Belakang (misal: M.Kom., Ph.D.)" },
        {
          name: "jabatan",
          label: "Jabatan",
          type: "select",
          options: [
            { value: "Ketua Program Studi TRPL", label: "Ketua Program Studi TRPL" },
            { value: "Sekretaris Program Studi", label: "Sekretaris Program Studi" },
            { value: "Dosen Tetap", label: "Dosen Tetap" },
            { value: "Dosen Tidak Tetap", label: "Dosen Tidak Tetap" },
            { value: "Dosen Luar Biasa", label: "Dosen Luar Biasa" },
          ],
        },
        { name: "bidang_keahlian", label: "Bidang Keahlian" },
        { name: "photo_url", label: "URL Foto" },
        { name: "email", label: "Email Kampus" },
        { name: "linkedin", label: "URL LinkedIn (opsional)" },
        { name: "research_url", label: "URL Profil Riset/Sinta (opsional)" },
      ]}
      columns={[
        {
          key: "photo_url",
          label: "Foto",
          render: (d) =>
            d.photo_url ? (
              <img
                src={d.photo_url}
                alt=""
                className="w-10 h-10 rounded-full object-cover object-top"
              />
            ) : (
              "—"
            ),
        },
        {
          key: "name",
          label: "Nama Lengkap",
          render: (d) =>
            [d.gelar_depan, d.name, d.gelar_belakang].filter(Boolean).join(" "),
        },
        { key: "jabatan", label: "Jabatan" },
        { key: "bidang_keahlian", label: "Bidang Keahlian" },
      ]}
    />
  );
}
