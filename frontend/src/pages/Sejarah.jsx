import { InfoPage } from "@/components/layout/InfoPage";
import { ScrollText, Milestone, Anchor } from "lucide-react";

export default function Sejarah() {
  return (
    <InfoPage
      testId="sejarah-page"
      eyebrow="Tentang Kami"
      title="Sejarah"
      highlight="HIMAPRODI TRPL"
      description="Perjalanan panjang Himpunan Mahasiswa Prodi Teknologi Rekayasa Perangkat Lunak Politeknik Kelapa Sawit Citra Widya Edukasi."
      sections={[
        {
          icon: Anchor,
          title: "Awal Berdirinya",
          content:
            "HIMAPRODI TRPL berdiri seiring dibukanya Program Studi Teknologi Rekayasa Perangkat Lunak di Politeknik Kelapa Sawit Citra Widya Edukasi. Sejak awal, organisasi ini menjadi wadah aspirasi dan pengembangan diri seluruh mahasiswa TRPL.",
        },
        {
          icon: Milestone,
          title: "Tonggak Penting",
          items: [
            "Pembentukan struktur HIMAPRODI dengan 6 departemen utama",
            "Penyelenggaraan event tahunan NETTAS pertama",
            "Kerjasama dengan industri & alumni untuk program magang",
            "Peluncuran komunitas-komunitas teknologi internal",
            "Pelantikan Kabinet Samudera periode 2025/2026",
          ],
        },
        {
          icon: ScrollText,
          title: "Filosofi Periode Kini",
          content:
            "Pada periode 2025/2026, HIMAPRODI TRPL mengusung nama Kabinet Samudera — melambangkan keluasan, kedalaman, dan daya tampung yang tak terbatas bagi setiap arus aspirasi mahasiswa.",
        },
      ]}
      cta={{
        title: "Penasaran dengan Visi & Misi kami?",
        label: "Lihat Visi & Misi",
        to: "/visi-misi",
      }}
    />
  );
}
