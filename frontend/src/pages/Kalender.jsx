import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag } from "lucide-react";

const STATUS_META = {
  planned: { label: "Direncanakan", cls: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  ongoing: { label: "Berlangsung", cls: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse-glow" },
  completed: { label: "Selesai", cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
};

export default function Kalender() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/program-kerja").then((r) => setEvents(r.data || [])).catch(() => {});
  }, []);

  return (
    <div data-testid="kalender-page">
      <PageHero
        eyebrow="Aplikasi Publik"
        title="Kalender"
        highlight="Kegiatan"
        description="Agenda lengkap program kerja, event, dan kegiatan HIMAPRODI TRPL sepanjang periode."
      />

      <section className="max-w-5xl mx-auto px-5 lg:px-10 py-14">
        <div className="space-y-4">
          {events.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center text-sand-300/60">
              Belum ada agenda terjadwal.
            </div>
          )}
          {events.map((e, i) => {
            const meta = STATUS_META[e.status] || STATUS_META.planned;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 md:p-6 grid md:grid-cols-[auto,1fr,auto] gap-5 items-start"
                data-testid={`kalender-item-${e.id}`}
              >
                <div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-ocean-gradient flex flex-col items-center justify-center shadow-glow-cyan shrink-0">
                  <Calendar className="w-5 h-5 text-sand-300 mb-0.5" />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-sand-300/80">
                    Agenda
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 inline-flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {e.department}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="headline text-lg text-sand-300 mb-1">{e.title}</h3>
                  <p className="text-sand-300/65 text-sm mb-2 line-clamp-2">{e.description}</p>
                  <div className="flex flex-wrap gap-3 text-[11px] font-mono text-cyan-400/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {e.schedule}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Kampus TRPL
                    </span>
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
