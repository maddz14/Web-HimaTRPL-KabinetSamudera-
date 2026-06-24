import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Newspaper,
  User as UserIcon,
  Eye,
  ScrollText,
  Image as ImageIcon,
  Briefcase,
  CalendarDays,
  Trophy,
  Users,
  Code2,
} from "lucide-react";
import { HeroCarousel } from "@/components/effects/HeroCarousel";
import { CountUp } from "@/components/effects/CountUp";
import { FaqAccordion } from "@/components/effects/FaqAccordion";
import api from "@/lib/api";

const KENALI_CARDS = [
  {
    icon: Eye,
    title: "Visi & Misi",
    desc: "Arah dan langkah strategis Kabinet Samudera mengarungi periode kepengurusan.",
    to: "/visi-misi",
    accent: "from-cyan-500/30 to-cyan-500/5",
  },
  {
    icon: ImageIcon,
    title: "Filosofi Logo",
    desc: "Makna di balik visual identitas HIMAPRODI TRPL dan Kabinet Samudera.",
    to: "/logo",
    accent: "from-amber-500/30 to-amber-500/5",
  },
  {
    icon: ScrollText,
    title: "Sejarah",
    desc: "Perjalanan HIMAPRODI TRPL dari masa ke masa hingga periode saat ini.",
    to: "/sejarah",
    accent: "from-teal-500/30 to-teal-500/5",
  },
];

function Typewriter({ words, speed = 80, delay = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const word = words[currentWordIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => word.slice(0, prev.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return (
    <span style={{ color: "#4EA8DE" }}>
      {currentText}
      <span className="w-[3px] h-[1.1em] bg-cyan-400 inline-block ml-1 align-middle animate-pulse" />
    </span>
  );
}

export default function Home() {
  const [latestBerita, setLatestBerita] = useState([]);
  const [latestGaleri, setLatestGaleri] = useState([]);
  const [stats, setStats] = useState({ proker: 8, anggota: 25, events: 4 });

  useEffect(() => {
    (async () => {
      try {
        const [b, statsRes, galeriRes] = await Promise.all([
          api.get("/berita?limit=3"),
          api.get("/public-stats"),
          api.get("/galeri?limit=4"),
        ]);
        setLatestBerita(b.data);
        setStats({ proker: statsRes.data.program_kerja, anggota: statsRes.data.anggota, events: statsRes.data.berita });
        setLatestGaleri(galeriRes.data || []);
      } catch {
        /* silent */
      }
    })();
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO carousel — full screen, rounded bottom */}
      <HeroCarousel>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/sejarah"
            className="btn-ocean !bg-gradient-to-br !from-amber-500 !to-orange-600 text-abyss font-semibold"
            data-testid="hero-cta-tentang"
          >
            <ArrowRight className="w-4 h-4" /> Tentang Kami
          </Link>
          <Link to="/berita" className="btn-ghost-ocean" data-testid="hero-cta-blog">
            <Newspaper className="w-4 h-4" /> Baca Blog
          </Link>
        </div>
      </HeroCarousel>



      {/* ABOUT — Ketua + Wakil + counters */}
      <section className="py-20 relative" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-3">
              Tentang Kami
            </div>
            <h2 className="headline text-3xl md:text-5xl text-sand-300 mb-5">
              Berlayar Bersama,{" "}
              <br />
              <Typewriter
                words={[
                  "Menuju Inovasi",
                  "Mengarungi Teknologi",
                  "Menjelajahi Samudera",
                  "Membangun Masa Depan",
                ]}
              />
            </h2>
            <p className="text-sand-300/75 leading-relaxed mb-6">
              HIMAPRODI TRPL melalui <strong className="text-cyan-300">Kabinet Samudera</strong> berkomitmen
              menjadi rumah pengembangan diri yang inklusif, kolaboratif, dan berdampak. Kami membawa
              mahasiswa Prodi Teknologi Rekayasa Perangkat Lunak menjelajahi kedalaman teknologi dan
              keluasan kolaborasi.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-5 mt-8" data-testid="counters">
              {[
                { icon: Briefcase, num: stats.proker, suffix: "+", label: "Program Kerja" },
                { icon: CalendarDays, num: stats.events, suffix: "+", label: "Event" },
                { icon: Users, num: stats.anggota, suffix: "+", label: "Pengurus" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5 text-center" data-testid={`counter-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <s.icon className="w-5 h-5 text-cyan-300 mx-auto mb-2" />
                  <CountUp
                    target={s.num}
                    suffix={s.suffix}
                    className="block headline text-3xl md:text-4xl text-gradient-cyan mb-1"
                  />
                  <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-sand-300/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ketua + Wakil cards */}
          <div className="flex items-start justify-center gap-3 md:gap-5">
            {[
              { name: "Ahmad Ilyas Mu'alimin", role: "Ketua Umum", photo: "/assets/anggotahima/ilyas.png", float: "animate-leader-float" },
              { name: "M.Rafly Ardiyaksa", role: "Wakil Ketua", photo: "/assets/anggotahima/rafly.png", float: "animate-leader-float-delay" },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative w-1/2 max-w-[260px] rounded-3xl overflow-visible m-4 ${i === 1 ? "mt-16 md:mt-24" : ""} ${p.float}`}
                data-testid={`leader-${p.role.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Cyan glow edge */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    zIndex: 50,
                    boxShadow:
                      "0 0 0 1px rgba(34, 211, 238, 0.6), 0 0 16px 4px rgba(34, 211, 238, 0.35), 0 0 40px 10px rgba(34, 211, 238, 0.2)",
                  }}
                />

                {/* Photo fills the card fully */}
                <div className="aspect-[4/5] w-full relative rounded-3xl overflow-hidden">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Text content */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max max-w-[90%] px-4 py-2 md:px-5 md:py-3 text-center rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold mb-1">
                    {p.role}
                  </div>
                  <h3 className="headline text-sm md:text-base text-white leading-snug">{p.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-start-2 text-center mt-4">
            <div className="headline text-lg md:text-xl tracking-wide">
              <span className="text-sand-300 font-bold">KABINET SAMUDERA</span>{" "}
              <span className="text-cyan-300 font-bold">2025-2026</span>
            </div>
          </div>
        </div>
      </section>



      {/* BLOG TERKINI */}
      <section className="py-20 relative" data-testid="blog-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-2">
              Aplikasi Publik
            </div>
            <h2 className="headline text-3xl md:text-5xl text-sand-300 mb-3">
              Blog <span className="text-gradient-cyan">Terkini</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {latestBerita.map((b, i) => (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-500"
              >
                <Link to={`/berita/${b.slug}`} className="block">
                  <div className="aspect-video relative overflow-hidden bg-deep">
                    {b.image_url && (
                      <img
                        src={b.image_url}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/80 text-abyss">
                      {b.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="headline text-lg text-sand-300 group-hover:text-cyan-300 transition mb-2 line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-sand-300/60 text-sm line-clamp-2">{b.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI TERKINI — maksimal 4 foto (2 baris), tombol Lihat Semua ke /galeri */}
      <section className="py-20 relative circuit-bg" data-testid="galeri-preview-section">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-2">
                Momen Bersama
              </div>
              <h2 className="headline text-3xl md:text-5xl text-sand-300">
                Galeri <span className="text-gradient-cyan">Kegiatan</span>
              </h2>
            </div>
            <Link to="/galeri" className="btn-ghost-ocean">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {latestGaleri.length === 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-deep/60 animate-pulse aspect-video" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 auto-rows-[180px] sm:auto-rows-[220px]">
              {latestGaleri.slice(0, 4).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sand-300 text-xs sm:text-sm font-medium line-clamp-1">{item.title}</p>
                    {item.category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                        {item.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tombol Lihat Semua bawah — tampil di semua layar termasuk HP */}
          <div className="mt-8 text-center">
            <Link to="/galeri" className="btn-ocean inline-flex">
              Lihat Semua Foto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative" data-testid="faq-section">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-2">
              Pertanyaan Umum
            </div>
            <h2 className="headline text-3xl md:text-5xl text-sand-300 mb-3">
              FAQ <span className="text-gradient-cyan">HIMAPRODI TRPL</span>
            </h2>
            <p className="text-sand-300/65 text-sm">
              Jawaban atas pertanyaan yang sering diajukan tentang HIMAPRODI TRPL dan Kabinet Samudera.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="relative glass-strong rounded-3xl p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ocean/30 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-[auto,1fr] gap-8 items-center">
              <img
                src="/assets/logo-samudera.png"
                alt="Kabinet Samudera"
                className="w-32 md:w-40 mx-auto drop-shadow-[0_0_30px_rgba(10,147,150,0.4)] animate-float"
              />
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
                  <Code2 className="w-3.5 h-3.5" /> Kabinet Samudera · Periode 2025/2026
                </div>
                <h3 className="headline text-2xl md:text-4xl text-sand-300 mb-3">
                  Siap berlayar bersama <span className="text-gradient-cyan">Kabinet Samudera?</span>
                </h3>
                <p className="text-sand-300/70 mb-6 leading-relaxed">
                  Bergabunglah menjadi bagian dari gelombang inovasi HIMAPRODI TRPL.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/kontak" className="btn-ocean">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/awards" className="btn-ghost-ocean">
                    <Trophy className="w-4 h-4" /> HIMAPRODI Awards
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
