import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Waves, Target, Compass, Heart } from "lucide-react";

export default function Profil() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    api.get("/site-info").then((r) => setInfo(r.data || {})).catch(() => {});
  }, []);

  return (
    <div data-testid="profil-page">
      <PageHero
        eyebrow="Tentang Kami"
        title="Profil"
        highlight="Kabinet Samudera"
        description={info.description || "Memuat deskripsi kabinet..."}
      />

      <section className="max-w-6xl mx-auto px-5 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="headline text-2xl text-sand-300">Filosofi Samudera</h2>
            </div>
            <p className="text-sand-300/70 leading-relaxed">
              Nama <span className="text-cyan-300 font-semibold">Samudera</span> melambangkan
              keluasan, kedalaman, dan daya tampung yang tak terbatas. Seperti samudera yang
              mampu menampung berbagai arus, Himaprodi TRPL hadir sebagai ruang untuk
              seluruh mahasiswa bertumbuh, berkolaborasi, dan menemukan arahnya masing-masing.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-cyan-300" />
              </div>
              <h2 className="headline text-2xl text-sand-300">Tujuan</h2>
            </div>
            <p className="text-sand-300/70 leading-relaxed">
              Menjadi ekosistem pembelajaran dan pengembangan diri yang terbuka, adaptif,
              dan berdampak — baik secara akademik, profesional, maupun sosial — bagi
              seluruh mahasiswa Teknologi Rekayasa Perangkat Lunak.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-2 space-y-5">
          {[
            { icon: Compass, label: "Periode", value: info.periode || "2025/2026" },
            { icon: Heart, label: "Nilai Inti", value: "Kolaborasi · Inovasi · Dedikasi" },
            { icon: Waves, label: "Tagline", value: info.tagline || "Himaprodi TRPL" },
          ].map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                <it.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 mb-1">
                  {it.label}
                </div>
                <div className="text-sand-300 font-medium">{it.value}</div>
              </div>
            </motion.div>
          ))}
        </aside>
      </section>
    </div>
  );
}
