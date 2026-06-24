import { InfoPage } from "@/components/layout/InfoPage";
import { FlaskConical, Code2, Cpu } from "lucide-react";

export default function LabRiset() {
  return (
    <InfoPage
      testId="lab-riset-page"
      eyebrow="Riset & Inovasi"
      title="Lab"
      highlight="Riset TRPL"
      description="Wadah bagi mahasiswa TRPL untuk bereksperimen, mengembangkan prototipe, dan menghasilkan karya teknologi yang berdampak."
      sections={[
        {
          icon: FlaskConical,
          title: "Fokus Penelitian",
          items: [
            "AI / Machine Learning & Generative AI",
            "Cloud & DevOps Engineering",
            "IoT & Smart Systems",
            "Software Architecture & Performance",
            "Data Engineering & Analytics",
            "UI/UX Research & Prototyping",
          ],
        },
        {
          icon: Code2,
          title: "Program & Kolaborasi",
          content:
            "Lab Riset TRPL rutin menggelar mentoring mingguan, proyek kolaborasi lintas angkatan, dan publikasi karya ilmiah. Mahasiswa didampingi dosen pembimbing dan mentor alumni.",
        },
        {
          icon: Cpu,
          title: "Fasilitas",
          items: [
            "Workstation untuk pelatihan & coding session",
            "GPU Server untuk eksperimen AI/ML",
            "Akses cloud credit untuk deployment proyek",
            "Library referensi dan dokumentasi internal",
          ],
        },
      ]}
      cta={{
        title: "Tertarik Bergabung?",
        description: "Daftar menjadi anggota Lab Riset TRPL dan wujudkan ide teknologimu.",
        label: "Open Recruitment",
        to: "/open-recruitment",
      }}
    />
  );
}
