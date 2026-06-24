import { InfoPage } from "@/components/layout/InfoPage";
import { Megaphone, Users, ClipboardList } from "lucide-react";

export default function OpenRecruitment() {
  return (
    <InfoPage
      testId="open-recruitment-page"
      eyebrow="Bergabunglah"
      title="Open"
      highlight="Recruitment"
      description="Ikut berlayar bersama Kabinet Samudera. Daftarkan dirimu menjadi bagian dari gelombang perubahan di Himaprodi TRPL."
      sections={[
        {
          icon: Megaphone,
          title: "Periode Pendaftaran",
          content:
            "Open Recruitment Kabinet Samudera dibuka setiap awal periode kepengurusan. Pantau pengumuman resmi melalui Instagram @himaproditrpl dan halaman Blog.",
        },
        {
          icon: Users,
          title: "Posisi yang Dibuka",
          items: [
            "Staff PSDM (Pengembangan Sumber Daya Manusia)",
            "Staff Akademik & Keilmuan",
            "Staff Humas",
            "Staff Media & Informasi",
            "Staff Minat & Bakat",
            "Staff Kewirausahaan",
          ],
        },
        {
          icon: ClipboardList,
          title: "Alur Rekrutmen",
          items: [
            "Pengumuman & pembukaan pendaftaran online",
            "Seleksi berkas & motivation letter",
            "Wawancara dengan pengurus inti",
            "Pengumuman anggota terpilih",
            "Pelantikan & onboarding",
          ],
        },
      ]}
      cta={{
        title: "Siap berlayar bersama kami?",
        description: "Hubungi Himaprodi TRPL untuk info lengkap periode rekrutmen berikutnya.",
        label: "Hubungi Kami",
        to: "/kontak",
      }}
    />
  );
}
