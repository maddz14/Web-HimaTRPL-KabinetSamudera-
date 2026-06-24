import { InfoPage } from "@/components/layout/InfoPage";
import { Mic, BookOpen, Users } from "lucide-react";

export default function SeminarWorkshop() {
  return (
    <InfoPage
      testId="seminar-workshop-page"
      eyebrow="Events"
      title="Seminar &"
      highlight="Workshop"
      description="Ruang belajar dan diskusi bersama praktisi industri, akademisi, dan komunitas teknologi."
      sections={[
        {
          icon: Mic,
          title: "Tentang Seminar & Workshop TRPL",
          content:
            "Seminar dan workshop diselenggarakan rutin oleh Departemen Akademik & Keilmuan untuk menghadirkan topik-topik teknologi terkini, mulai dari AI, cloud, DevOps, hingga soft skills profesional.",
        },
        {
          icon: BookOpen,
          title: "Topik Populer",
          items: [
            "GenAI & LLM Engineering",
            "Cloud Native Development",
            "Software Testing & QA",
            "DevOps & CI/CD Pipelines",
            "UI/UX & Product Thinking",
            "Career Workshop & Industry Talk",
          ],
        },
        {
          icon: Users,
          title: "Untuk Siapa?",
          content:
            "Terbuka bagi mahasiswa TRPL, mahasiswa lintas prodi, alumni, dan masyarakat umum yang tertarik dengan dunia rekayasa perangkat lunak.",
        },
      ]}
      cta={{ title: "Cek jadwal terdekat", label: "Kalender Kegiatan", to: "/kalender" }}
    />
  );
}
