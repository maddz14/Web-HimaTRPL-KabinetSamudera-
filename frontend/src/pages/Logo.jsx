import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { Anchor, Compass, Waves, Code2, Link2, Rocket } from "lucide-react";

const HIMA_ELEMENTS = [
  {
    icon: Code2,
    title: "TEKNOLOGI",
    desc: "Melambangkan komitmen HIMAPRODI TRPL dalam mengembangkan teknologi perangkat lunak yang inovatif dan berdampak bagi masyarakat.",
  },
  {
    icon: Link2,
    title: "KOLABORASI",
    desc: "Menggambarkan semangat kebersamaan dan sinergi antar mahasiswa TRPL dalam berkarya dan berprestasi bersama.",
  },
  {
    icon: Rocket,
    title: "INOVASI",
    desc: "Merepresentasikan tekad HIMAPRODI TRPL untuk terus bergerak maju, berinovasi, dan memberikan kontribusi nyata di bidang rekayasa perangkat lunak.",
  },
];

const HIMA_COLORS = [
  { name: "Biru Royal", hex: "#0153AE", desc: "Profesionalisme & teknologi" },
  { name: "Putih", hex: "#FFFFFF", desc: "Ketulusan & kemurnian akademik" },
  { name: "Navy", hex: "#023971", desc: "Kestabilan & integritas" },
  { name: "Cyan Lembut", hex: "#8FDFDD", desc: "Inovasi & adaptif" },
];

const SAMUDRA_PHILOSOPHY = [
  {
    icon: Waves,
    title: "OMBAK SAMUDRA",
    desc: "Melambangkan kekuatan, dinamika, dan pergerakan yang terus maju — semangat kabinet untuk selalu progresif.",
    img: "/assets/ombak-samudra.png",
  },
  {
    icon: Anchor,
    title: "OMBAK TERDALAM",
    desc: "Representasi ketahanan dan kekuatan dalam menghadapi tekanan — komitmen pengurus untuk konsisten meski di kedalaman tantangan.",
    img: "/assets/ombak-terdalam.png",
  },
  {
    icon: Compass,
    title: "MATAHARI & KOMPAS",
    desc: "Arah yang jelas, visi yang terarah, dan kepemimpinan yang tegas — kabinet bergerak dengan orientasi yang pasti.",
    img: "/assets/matahari-kompas.png",
  },
];

const SAMUDRA_COLORS = [
  { name: "Navy", hex: "#023971", desc: "Kekuatan, stabilitas, dan kedalaman ilmu (Ombak Terdalam)" },
  { name: "Royal Blue", hex: "#0153AE", desc: "Profesionalisme, visi, dan kepercayaan (Ombak Samudra)" },
  { name: "Light Blue", hex: "#4EA8DE", desc: "Ketenangan, keterbukaan, dan harapan (Ombak Atas)" },
  { name: "Kuning Emas", hex: "#FFB703", desc: "Arah tujuan, optimisme, dan kepemimpinan (Matahari & Kompas)" },
];

export default function Logo() {
  return (
    <div data-testid="logo-page">
      <PageHero
        eyebrow="Identitas Visual"
        title="Filosofi"
        highlight="Logo"
        description="Setiap elemen dalam logo HIMAPRODI TRPL dan Kabinet Samudra menyimpan makna mendalam."
      />

      {/* ========== BAGIAN 1: LOGO HIMAPRODI TRPL ========== */}
      <section
        className="max-w-6xl mx-auto px-5 lg:px-10 py-16"
        data-testid="logo-hima-section"
        style={{
          background: "rgba(1, 83, 174, 0.06)",
          borderRadius: 24,
          border: "1px solid rgba(1, 83, 174, 0.25)",
          marginTop: 24,
        }}
      >
        <div className="text-center mb-10 px-4 pt-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-cyan-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Identitas Organisasi
          </span>
          <h2 className="headline text-3xl md:text-4xl text-sand-300 mb-3">
            Logo <span className="text-gradient-cyan">HIMAPRODI TRPL</span>
          </h2>
          <p className="text-sand-300/65 text-sm max-w-2xl mx-auto">
            Identitas resmi Himpunan Mahasiswa Program Studi Teknologi Rekayasa Perangkat Lunak
            Politeknik Citra Widya Edukasi.
          </p>
        </div>

        {/* Logo display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
          data-testid="hima-logo-showcase"
        >
          <div className="flex justify-center">
            <img
              src="/assets/hima-prodi.png"
              alt="Logo HIMAPRODI TRPL"
              className="w-[200px] h-[200px] object-contain"
              style={{ filter: "drop-shadow(0 0 30px rgba(1,83,174,0.4))" }}
            />
          </div>
        </motion.div>

        <p className="text-sand-300/75 leading-relaxed text-center max-w-3xl mx-auto mb-10">
          Logo HIMAPRODI TRPL mencerminkan identitas mahasiswa Teknologi Rekayasa Perangkat Lunak
          yang inovatif, adaptif, dan berorientasi pada pengembangan teknologi masa depan. Setiap
          elemen dalam logo merepresentasikan nilai-nilai utama organisasi.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {HIMA_ELEMENTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-7 transition hover:-translate-y-1"
              style={{
                background: "rgba(1, 83, 174, 0.1)",
                border: "1px solid rgba(1, 83, 174, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(1, 83, 174, 0.45)";
                e.currentTarget.style.borderColor = "#0153AE";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(1, 83, 174, 0.35)";
              }}
              data-testid={`hima-element-${p.title.toLowerCase()}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(1, 83, 174, 0.25)" }}
              >
                <p.icon className="w-6 h-6" style={{ color: "#8FDFDD" }} />
              </div>
              <h3 className="headline text-xl text-sand-300 mb-2">{p.title}</h3>
              <p className="text-sand-300/65 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="headline text-xl text-sand-300 mb-5 text-center">
          Makna <span className="text-gradient-cyan">Warna</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
          {HIMA_COLORS.map((c) => (
            <div key={c.name} className="rounded-xl overflow-hidden border border-cyan-900/30">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3 bg-deep">
                <div className="text-sand-300 font-medium text-sm">{c.name}</div>
                <div className="font-mono text-[10px] text-cyan-300">{c.hex}</div>
                <div className="text-[10px] text-sand-300/60 mt-1">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== DIVIDER ========== */}
      <div className="max-w-6xl mx-auto px-5 lg:px-10 py-10 flex items-center gap-5">
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(2,57,113,0.6), transparent)",
          }}
        />
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-strong text-xs font-mono uppercase tracking-widest text-cyan-300 whitespace-nowrap">
          ✦ Kabinet Samudra 2026 ✦
        </span>
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(2,57,113,0.6), transparent)",
          }}
        />
      </div>

      {/* ========== BAGIAN 2: LOGO KABINET SAMUDRA ========== */}
      <section
        className="max-w-6xl mx-auto px-5 lg:px-10 py-16 mb-16"
        data-testid="logo-samudra-section"
        style={{
          background: "rgba(2, 57, 113, 0.08)",
          borderRadius: 24,
          border: "1px solid rgba(2, 57, 113, 0.3)",
        }}
      >
        <div className="text-center mb-10 px-4 pt-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-cyan-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Kabinet Samudera 2026
          </span>
          <h2 className="headline text-3xl md:text-4xl text-sand-300 mb-3">
            Logo <span className="text-gradient-ocean">Kabinet Samudera</span>
          </h2>
        </div>

        {/* Hero logo + 3 variants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 mb-10"
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            border: "1px solid rgba(2, 57, 113, 0.4)",
          }}
          data-testid="samudera-logo-showcase"
        >
          {/* Hero variant: Logo Kabinet Utama */}
          <div className="flex justify-center mb-10">
            <img
              src="/assets/logo-samudera.png"
              alt="Logo Kabinet Samudera"
              className="w-48 md:w-60 animate-float"
              style={{ filter: "drop-shadow(0 0 40px rgba(1,83,174,0.6))" }}
              data-testid="samudera-hero-logo"
            />
          </div>


        </motion.div>

        {/* Filosofi 3 elements */}
        <h3 className="headline text-xl text-sand-300 mb-5 text-center">
          Filosofi <span className="text-gradient-ocean">Elemen</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {SAMUDRA_PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-7 transition hover:-translate-y-1"
              style={{
                background: "rgba(2, 57, 113, 0.12)",
                border: "1px solid rgba(2, 57, 113, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(2, 57, 113, 0.5)";
                e.currentTarget.style.borderColor = "#023971";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(2, 57, 113, 0.4)";
              }}
              data-testid={`samudra-element-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={p.img} alt={p.title} className="w-12 h-12 object-contain" />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(2, 57, 113, 0.25)" }}
                >
                  <p.icon className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <h3 className="headline text-base text-sand-300 mb-2">{p.title}</h3>
              <p className="text-sand-300/65 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="headline text-xl text-sand-300 mb-5 text-center">
          Makna <span className="text-gradient-ocean">Warna</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
          {SAMUDRA_COLORS.map((c) => (
            <div key={c.name} className="rounded-xl overflow-hidden border border-cyan-900/30">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3 bg-deep">
                <div className="text-sand-300 font-medium text-sm">{c.name}</div>
                <div className="font-mono text-[10px] text-cyan-300">{c.hex}</div>
                <div className="text-[10px] text-sand-300/60 mt-1">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
