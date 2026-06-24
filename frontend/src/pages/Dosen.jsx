import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Linkedin,
  BookOpen,
  Award,
  ExternalLink,
  User,
} from "lucide-react";
import api from "@/lib/api";

// ---------------------------------------------------------------------------
// Skeleton card
// ---------------------------------------------------------------------------
function DosenCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-deep/60 h-60 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-deep/60 rounded-full w-3/4" />
        <div className="h-3 bg-deep/60 rounded-full w-1/2" />
        <div className="h-3 bg-deep/60 rounded-full w-2/3" />
        <div className="h-3 bg-deep/60 rounded-full w-1/3" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dosen Card
// ---------------------------------------------------------------------------
function DosenCard({ dosen, index }) {
  const fullName = [dosen.gelar_depan, dosen.name, dosen.gelar_belakang]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group glass rounded-2xl overflow-hidden hover:border-cyan-500/40 border border-cyan-900/20 transition-all duration-300 hover:shadow-glow-cyan flex flex-col"
    >
      {/* Photo — portrait ratio agar wajah terlihat penuh */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-deep/80">
        {dosen.photo_url ? (
          <img
            src={dosen.photo_url}
            alt={fullName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-20 h-20 text-cyan-500/30" />
          </div>
        )}
        {/* Gradient tipis hanya di bagian bawah foto */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-abyss/60 to-transparent" />
      </div>

      {/* Info — di bawah foto, terpisah jelas */}
      <div className="p-4 flex flex-col gap-2 flex-1 bg-deep/30">
        {/* Badge jabatan */}
        {dosen.jabatan && (
          <span className="self-start px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
            {dosen.jabatan}
          </span>
        )}

        {/* Nama lengkap */}
        <h3 className="headline text-sand-300 text-sm sm:text-base leading-snug">
          {fullName}
        </h3>

        {/* Divider */}
        <div className="h-px bg-cyan-900/40" />

        {/* Bidang keahlian */}
        <div className="flex-1 space-y-2">
          {dosen.bidang_keahlian && (
            <div className="flex items-start gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400/70 mt-0.5 shrink-0" />
              <p className="text-sand-300/75 text-xs leading-relaxed line-clamp-3">
                {dosen.bidang_keahlian}
              </p>
            </div>
          )}
        </div>

        {/* Social links */}
        {(dosen.email || dosen.linkedin || dosen.research_url) && (
          <div className="flex items-center gap-2 pt-2 border-t border-cyan-900/30">
            {dosen.email && (
              <a
                href={`mailto:${dosen.email}`}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-sand-300/60 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                title={dosen.email}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate max-w-[90px]">{dosen.email.split("@")[0]}</span>
              </a>
            )}
            {dosen.linkedin && (
              <a
                href={dosen.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-sand-300/60 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {dosen.research_url && (
              <a
                href={dosen.research_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-sand-300/60 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                title="Research Profile"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}


// ---------------------------------------------------------------------------
// Stats strip
// ---------------------------------------------------------------------------
function StatsStrip({ dosenList }) {
  const tetap = dosenList.filter((d) => d.jabatan?.toLowerCase().includes("tetap")).length;
  const s3 = dosenList.filter((d) =>
    d.pendidikan?.toLowerCase().includes("s3") ||
    d.gelar_depan?.toLowerCase().includes("dr") ||
    d.gelar_belakang?.toLowerCase().includes("ph.d")
  ).length;
  const keahlian = new Set(dosenList.map((d) => d.bidang_keahlian).filter(Boolean)).size;

  const stats = [
    { label: "Total Dosen", value: dosenList.length, icon: GraduationCap },
    { label: "Dosen Tetap", value: tetap, icon: Award },
    { label: "Bergelar S3/Doktor", value: s3, icon: BookOpen },
    { label: "Bidang Keahlian", value: keahlian, icon: BookOpen },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
      {stats.map(({ label, value, icon: Icon }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-2xl p-5 text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center mx-auto mb-3">
            <Icon className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="headline text-3xl text-cyan-300 mb-1">{value}</div>
          <div className="text-sand-300/55 text-xs font-mono uppercase tracking-wider">{label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function Dosen() {
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dosen")
      .then((r) => setDosenList(r.data || []))
      .catch(() => setDosenList([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="dosen-page">
      <PageHero
        eyebrow="Tenaga Pendidik"
        title="Dosen"
        highlight="Prodi TRPL"
        description="Para dosen pengampu Prodi Teknologi Rekayasa Perangkat Lunak yang membimbing mahasiswa di bidang rekayasa perangkat lunak modern."
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        {/* Stats */}
        {!loading && dosenList.length > 0 && (
          <StatsStrip dosenList={dosenList} />
        )}

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-cyan-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Staf Pengajar
          </div>
          <h2 className="headline text-2xl sm:text-3xl text-sand-300">
            Tim Pengajar Profesional
          </h2>
          <p className="text-sand-300/60 text-sm mt-2 max-w-2xl">
            Didukung oleh dosen berpengalaman di industri dan akademisi dengan keahlian yang
            relevan dengan kebutuhan era digital.
          </p>
        </motion.div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <DosenCardSkeleton key={i} />
            ))}
          </div>
        ) : dosenList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-cyan-500/60" />
            </div>
            <p className="text-sand-300/50 text-sm">Data dosen belum tersedia.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dosenList.map((dosen, index) => (
              <DosenCard key={dosen.id} dosen={dosen} index={index} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative">
            <GraduationCap className="w-10 h-10 text-cyan-300/60 mx-auto mb-4" />
            <h3 className="headline text-2xl text-sand-300 mb-2">
              Ingin Tahu Lebih Lanjut?
            </h3>
            <p className="text-sand-300/60 text-sm mb-6">
              Hubungi Himaprodi TRPL untuk informasi akademik, konsultasi, atau kolaborasi dengan
              dosen.
            </p>
            <a
              href="/kontak"
              className="btn-ocean inline-flex"
            >
              <Mail className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
