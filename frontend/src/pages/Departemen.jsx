import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

const COLOR_CLASSES = {
  cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-300",
  teal: "from-teal-500/20 to-teal-500/5 text-teal-300",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-300",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-300",
};

export default function Departemen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/departemen").then((r) => setList(r.data || [])).catch(() => {});
  }, []);

  return (
    <div data-testid="departemen-page">
      <PageHero
        eyebrow="Organisasi"
        title="Enam"
        highlight="Departemen"
        description="Setiap departemen adalah arus yang menggerakkan kabinet — unik, tapi mengarah pada satu tujuan."
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((d, i) => {
            const Icon =
              Icons[
                d.icon
                  ? d.icon
                      .split("-")
                      .map((s) => s[0].toUpperCase() + s.slice(1))
                      .join("")
                  : "Users"
              ] || Icons.Users;
            const colorCls = COLOR_CLASSES[d.color] || COLOR_CLASSES.cyan;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative glass rounded-3xl p-7 group hover:-translate-y-1 hover:shadow-glow-cyan transition-all duration-500 overflow-hidden"
                data-testid={`dept-card-${d.short_name}`}
              >
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${colorCls} blur-3xl opacity-40 group-hover:opacity-70 transition`}
                />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorCls} flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-1">
                    {d.short_name}
                  </div>
                  <h3 className="headline text-xl text-sand-300 mb-3">{d.name}</h3>
                  <p className="text-sand-300/65 text-sm leading-relaxed mb-5 line-clamp-3">
                    {d.description}
                  </p>
                  {d.head && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Icons.User className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                      <span className="text-xs text-sand-300/70">
                        <span className="text-cyan-400/70">Kadep</span> · {d.head}
                      </span>
                    </div>
                  )}
                  {d.programs && d.programs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-cyan-900/40">
                      {d.programs.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
