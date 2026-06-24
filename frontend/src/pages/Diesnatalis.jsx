import { InfoPage } from "@/components/layout/InfoPage";
import { Cake, PartyPopper, Users } from "lucide-react";

export default function Diesnatalis() {
  return (
    <InfoPage
      testId="diesnatalis-page"
      eyebrow="Events"
      title="Diesnatalis"
      highlight="HIMAPRODI TRPL"
      description="Perayaan tahunan kelahiran HIMAPRODI TRPL — momen syukur, refleksi, dan apresiasi untuk seluruh keluarga besar."
      sections={[
        {
          icon: Cake,
          title: "Tentang Diesnatalis",
          content:
            "Diesnatalis HIMAPRODI TRPL adalah perayaan ulang tahun organisasi yang menghadirkan rangkaian acara meriah, mulai dari syukuran, talkshow alumni, hingga pertunjukan kreatif mahasiswa.",
        },
        {
          icon: PartyPopper,
          title: "Rangkaian Acara",
          items: [
            "Syukuran & doa bersama",
            "Talkshow Inspiratif Alumni",
            "Lomba kreasi mahasiswa",
            "Pertunjukan seni & musik",
            "HIMAPRODI Awards Night",
            "Pesta keluarga besar TRPL",
          ],
        },
        {
          icon: Users,
          title: "Siapa yang Hadir?",
          content:
            "Pengurus aktif, alumni, dosen, calon mahasiswa, dan keluarga besar TRPL berkumpul untuk merayakan perjalanan organisasi sekaligus mempererat tali silaturahmi.",
        },
      ]}
      cta={{ title: "Lihat highlight tahun lalu", label: "Galeri", to: "/galeri" }}
    />
  );
}
