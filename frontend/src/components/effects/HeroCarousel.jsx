import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    image: "/assets/anggota-hima.jpg",
    badge: "Kabinet Samudera 2026",
    title: "HIMPUNAN MAHASISWA",
    titleAccent: "PRODI TRPL",
    description:
      "Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL) — pengembangan perangkat lunak modern, inovatif, dan aplikatif untuk industri.",
  },
  {
    image: "/assets/anggota-hima2.png",
    badge: "Berlayar Bersama",
    title: "BELAJAR · BERKARYA",
    titleAccent: "BERKOLABORASI",
    description:
      "Wadah mahasiswa TRPL untuk tumbuh dalam ekosistem teknologi yang inklusif, produktif, dan bermakna.",
  },
  {
    image: "/assets/anggota-hima3.png",
    badge: "Menuju Inovasi",
    title: "TEKNOLOGI",
    titleAccent: "MERAJUT MASA DEPAN",
    description:
      "Dari coding bootcamp hingga hackathon — jadilah bagian dari gelombang inovasi di bidang Teknologi Rekayasa Perangkat Lunak.",
  },
];

export function HeroCarousel({ children }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      style={{
        height: "100vh",
        borderBottomLeftRadius: "48px",
        borderBottomRightRadius: "48px",
      }}
      data-testid="hero-section"
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-abyss/85 via-abyss/65 to-ocean/70" />
          <div className="absolute inset-0 circuit-bg opacity-30" />
        </motion.div>
      </AnimatePresence>

      {/* Glow blobs */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-ocean/30 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-5 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl w-full text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-strong text-xs font-mono uppercase tracking-widest text-cyan-300 mb-8">
              <span className="text-amber-400">★</span>
              {slide.badge}
            </div>

            <h1
              className="headline text-4xl sm:text-6xl lg:text-7xl text-sand-300 mb-6 tracking-tight"
              data-testid="hero-title"
            >
              {slide.title}
              <br />
              <span className="text-gradient-ocean">{slide.titleAccent}</span>
            </h1>

            <p className="text-base md:text-lg text-sand-300/85 max-w-3xl mx-auto mb-10 leading-relaxed">
              {slide.description}
            </p>

            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10" data-testid="hero-indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            data-testid={`hero-indicator-${i}`}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === idx ? "w-10 bg-cyan-400" : "w-2 bg-sand-300/40 hover:bg-sand-300/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
