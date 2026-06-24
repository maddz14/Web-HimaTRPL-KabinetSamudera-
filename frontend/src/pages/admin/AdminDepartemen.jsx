import { AdminCrud } from "@/components/admin/AdminCrud";

export default function AdminDepartemen() {
  return (
    <AdminCrud
      testIdPrefix="departemen"
      title="Departemen"
      endpoint="/departemen"
      emptyNew={{
        name: "",
        short_name: "",
        description: "",
        icon: "waves",
        color: "cyan",
        head: "",
        programs: [],
      }}
      fields={[
        { name: "name", label: "Nama Departemen" },
        { name: "short_name", label: "Singkatan" },
        { name: "description", label: "Deskripsi", type: "textarea", rows: 4 },
        { name: "icon", label: "Icon (lucide-react)", hint: "cth: users, book-open, camera" },
        {
          name: "color",
          label: "Warna",
          type: "select",
          options: [
            { value: "cyan", label: "Cyan" },
            { value: "teal", label: "Teal" },
            { value: "blue", label: "Blue" },
            { value: "amber", label: "Amber" },
          ],
        },
        { name: "head", label: "Kepala Departemen" },
        { name: "programs", label: "Program (pisah dengan koma)", type: "array" },
      ]}
      columns={[
        { key: "short_name", label: "Kode" },
        { key: "name", label: "Nama" },
        { key: "head", label: "Kadep" },
      ]}
    />
  );
}
