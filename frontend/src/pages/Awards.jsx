import { InfoPage } from "@/components/layout/InfoPage";
import { Trophy, Star, Award } from "lucide-react";

export default function Awards() {
  return (
    <InfoPage
      testId="awards-page"
      eyebrow="Agenda Khusus"
      title="HIMAPRODI"
      highlight="Awards"
      description="Penghargaan tahunan untuk individu dan tim yang berkontribusi luar biasa di lingkungan HIMAPRODI TRPL."
      sections={[
        {
          icon: Trophy,
          title: "Tentang HIMAPRODI Awards",
          content:
            "HIMAPRODI Awards adalah ajang apresiasi tahunan dari Kabinet Samudera untuk mengakui dedikasi, prestasi, dan kontribusi unggulan dari pengurus, anggota, serta mahasiswa Prodi TRPL.",
        },
        {
          icon: Star,
          title: "Kategori Penghargaan",
          items: [
            "Best Pengurus of the Year",
            "Best Departemen of the Year",
            "Most Inspiring Member",
            "Best Program Kerja",
            "Innovator Award (proyek teknologi terbaik)",
            "Lifetime Contribution (alumni)",
          ],
        },
        {
          icon: Award,
          title: "Mekanisme",
          content:
            "Pemenang ditentukan melalui kombinasi voting anggota, penilaian dewan juri (alumni & dosen), serta evaluasi kinerja sepanjang periode kepengurusan. Acara puncak digelar pada Diesnatalis HIMAPRODI TRPL.",
        },
      ]}
      cta={{ title: "Lihat agenda lainnya", label: "Kalender Kegiatan", to: "/kalender" }}
    />
  );
}
