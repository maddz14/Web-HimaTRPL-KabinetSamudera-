import { InfoPage } from "@/components/layout/InfoPage";
import { UsersRound, Code2, Heart } from "lucide-react";

export default function Komunitas() {
  return (
    <InfoPage
      testId="komunitas-page"
      eyebrow="Belajar Bareng"
      title="Komunitas"
      highlight="TRPL"
      description="Komunitas belajar dan berkarya mahasiswa TRPL. Tempatnya ngoprek, bertukar ide, dan tumbuh bersama."
      sections={[
        {
          icon: UsersRound,
          title: "Komunitas Aktif",
          items: [
            "TRPL.dev — Komunitas developer web & mobile",
            "AI Enthusiasts TRPL — Eksplorasi AI/ML",
            "DevOps Guild — Automation, CI/CD, Cloud",
            "Designly — UI/UX & Product Design",
            "OpenSource TRPL — Kontribusi open source",
            "Game Dev Circle — Pengembangan game",
          ],
        },
        {
          icon: Code2,
          title: "Aktivitas Rutin",
          content:
            "Setiap komunitas mengadakan study group mingguan, proyek kolaboratif, serta sharing session bersama praktisi. Terbuka untuk seluruh angkatan.",
        },
        {
          icon: Heart,
          title: "Nilai Komunitas",
          items: [
            "Inklusif — terbuka untuk semua tingkat keahlian",
            "Kolaboratif — saling mentor dan belajar",
            "Produktif — fokus pada karya nyata",
            "Berkelanjutan — knowledge sharing antar angkatan",
          ],
        },
      ]}
      cta={{
        title: "Gabung Komunitas",
        description: "Hubungi Himaprodi untuk terhubung dengan koordinator komunitas.",
        label: "Hubungi Kami",
        to: "/kontak",
      }}
    />
  );
}
