import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Play } from "lucide-react";

const STATUS_META = {
  planned: { label: "Direncanakan", icon: Clock, cls: "bg-sand-500/20 text-sand-300 border-sand-500/30" },
  ongoing: { label: "Berlangsung", icon: Play, cls: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 animate-pulse-glow" },
  completed: { label: "Selesai", icon: CheckCircle2, cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
};

export default function ProgramKerja() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/program-kerja").then((r) => setList(r.data || [])).catch(() => {});
  }, []);

  const filtered = filter === "all" ? list : list.filter((p) => p.status === filter);

  return (
    <div data-testid="program-kerja-page">
      <PageHero
        eyebrow="Aksi"
        title="Program"
        highlight="Kerja"
        description="Agenda strategis Kabinet Samudera sepanjang periode. Dari kaderisasi hingga hackathon."
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="flex flex-wrap gap-2 mb-10" data-testid="program-filter">
          {[
            ["all", "Semua"],
            ["planned", "Direncanakan"],
            ["ongoing", "Berlangsung"],
            ["completed", "Selesai"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              data-testid={`filter-${v}`}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition ${
                filter === v
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                  : "glass text-sand-300/60 hover:text-cyan-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => {
            const meta = STATUS_META[p.status] || STATUS_META.planned;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 group"
                data-testid={`program-card-${p.id}`}
              >
                <div className="aspect-video relative overflow-hidden bg-deep">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss to-transparent" />
                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider ${meta.cls}`}
                  >
                    <meta.icon className="w-3 h-3" />
                    {meta.label}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-abyss/70 text-cyan-300 border border-cyan-500/30">
                    {p.department}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="headline text-lg text-sand-300 mb-2">{p.title}</h3>
                  <p className="text-sand-300/60 text-sm mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-1.5 text-cyan-400/80 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {p.schedule}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
