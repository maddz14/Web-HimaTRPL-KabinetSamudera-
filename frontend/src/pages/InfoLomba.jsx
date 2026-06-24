import { InfoPage } from "@/components/layout/InfoPage";
import { Trophy, Target, Megaphone } from "lucide-react";

export default function InfoLomba() {
  return (
    <InfoPage
      testId="info-lomba-page"
      eyebrow="Aplikasi Publik"
      title="Info"
      highlight="Lomba"
      description="Kompetisi, hackathon, dan ajang prestasi yang sayang untuk dilewatkan oleh mahasiswa TRPL."
      sections={[
        {
          icon: Trophy,
          title: "Lomba Aktif",
          items: [
            "Hackathon TRPL 2026 — Tema: AI for Social Good",
            "TRPL Code Sprint — Algoritma & DSA",
            "UI/UX Challenge — Design for Sustainability",
            "Capture The Flag (CTF) Cybersecurity",
            "Startup Idea Pitch Competition",
          ],
        },
        {
          icon: Target,
          title: "Tips Mengikuti Lomba",
          items: [
            "Bentuk tim sejak awal — diversifikasi skill itu kunci",
            "Pelajari problem statement dengan teliti",
            "Buat MVP cepat, iterasi pelan",
            "Latih presentasi & pitching",
            "Manfaatkan mentor dari Lab Riset",
          ],
        },
        {
          icon: Megaphone,
          title: "Submit Info Lomba",
          content:
            "Punya info lomba lain yang ingin disebar? Kirim detailnya melalui formulir kontak — tim Humas akan segera mempublikasikannya di kanal HIMAPRODI TRPL.",
        },
      ]}
      cta={{ title: "Punya info lomba?", label: "Submit Info", to: "/kontak" }}
    />
  );
}
