import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Apa itu HIMAPRODI TRPL?",
    a: "HIMAPRODI TRPL (Himpunan Mahasiswa Prodi Teknologi Rekayasa Perangkat Lunak) adalah organisasi kemahasiswaan resmi Prodi TRPL Politeknik Kelapa Sawit Citra Widya Edukasi yang berlandaskan Tridharma Perguruan Tinggi dan Pancasila.",
  },
  {
    q: "Apa itu Kabinet Samudera?",
    a: "Kabinet Samudera adalah nama kabinet kepengurusan HIMAPRODI TRPL periode 2025/2026, mengusung filosofi keluasan dan kedalaman seperti samudera — wadah inklusif bagi seluruh mahasiswa untuk berlayar bersama menuju inovasi.",
  },
  {
    q: "Bagaimana cara bergabung menjadi pengurus HIMAPRODI?",
    a: "Pendaftaran dibuka melalui Open Recruitment yang diselenggarakan setiap awal periode kepengurusan. Informasi lengkap diumumkan melalui Instagram @himaproditrpl dan halaman Open Recruitment di website ini.",
  },
  {
    q: "Apa saja kegiatan utama HIMAPRODI TRPL?",
    a: "Kegiatan kami meliputi NETTAS (event tahunan), seminar & workshop teknologi, coding bootcamp, hackathon, kompetisi olahraga (TRPL Cup), startup weekend, hingga program pengabdian masyarakat berbasis teknologi.",
  },
  {
    q: "Apakah event HIMAPRODI TRPL terbuka untuk umum?",
    a: "Sebagian besar event seperti NETTAS, seminar publik, dan workshop terbuka untuk mahasiswa lintas prodi dan umum. Pantau kalender kegiatan kami untuk info pendaftaran terkini.",
  },
  {
    q: "Bagaimana cara menghubungi HIMAPRODI TRPL?",
    a: "Anda dapat menghubungi kami melalui email himaproditrpl@gmail.com, Instagram @himaproditrpl, atau langsung mengisi formulir di halaman Kontak Kami.",
  },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-3" data-testid="faq-accordion">
      {FAQS.map((item, i) => {
        const open = openIdx === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`glass rounded-2xl overflow-hidden transition ${
              open ? "shadow-glow-cyan" : ""
            }`}
            data-testid={`faq-item-${i}`}
          >
            <button
              onClick={() => setOpenIdx(open ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
              data-testid={`faq-trigger-${i}`}
            >
              <span className="font-semibold text-sand-300 text-base md:text-lg">{item.q}</span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300 transition-transform duration-300 ${
                  open ? "rotate-45 bg-cyan-500/30" : ""
                }`}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 md:px-6"
                >
                  <p className="pb-5 text-sand-300/75 leading-relaxed text-sm md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
