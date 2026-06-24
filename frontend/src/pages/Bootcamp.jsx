import { InfoPage } from "@/components/layout/InfoPage";
import { Code2, Rocket, Zap } from "lucide-react";

export default function Bootcamp() {
  return (
    <InfoPage
      testId="bootcamp-page"
      eyebrow="Events"
      title="Coding"
      highlight="Bootcamp"
      description="Pelatihan intensif untuk mahasiswa TRPL siap terjun ke industri perangkat lunak."
      sections={[
        {
          icon: Code2,
          title: "Tentang Bootcamp TRPL",
          content:
            "Coding Bootcamp Kabinet Samudera adalah program pelatihan terfokus selama 4-6 minggu yang membahas teknologi modern dengan pendekatan project-based learning.",
        },
        {
          icon: Rocket,
          title: "Track yang Tersedia",
          items: [
            "Fullstack Web Development (React + FastAPI)",
            "Mobile App Development (Flutter / React Native)",
            "Data Engineering & Analytics",
            "AI/ML Foundations",
            "DevOps & Cloud Engineering",
            "UI/UX Design Sprint",
          ],
        },
        {
          icon: Zap,
          title: "Benefit Peserta",
          items: [
            "Sertifikat resmi HIMAPRODI TRPL",
            "Mentor dari alumni & industri",
            "Portofolio proyek nyata",
            "Networking & job referral",
          ],
        },
      ]}
      cta={{ title: "Daftar Bootcamp Selanjutnya", label: "Hubungi Kami", to: "/kontak" }}
    />
  );
}
