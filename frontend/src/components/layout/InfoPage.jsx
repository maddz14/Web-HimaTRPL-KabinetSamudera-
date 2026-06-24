import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Reusable informational page — used for Dosen, NETTAS, Lab Riset, Komunitas, Open Recruitment. */
export function InfoPage({ eyebrow, title, highlight, description, sections = [], cta, testId }) {
  return (
    <div data-testid={testId}>
      <PageHero eyebrow={eyebrow} title={title} highlight={highlight} description={description} />

      <section className="max-w-6xl mx-auto px-5 lg:px-10 py-14 space-y-6">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-3xl p-7 md:p-9"
          >
            {s.icon && (
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-cyan-300" />
              </div>
            )}
            <h2 className="headline text-2xl text-sand-300 mb-3">{s.title}</h2>
            {s.content && (
              <p className="text-sand-300/75 leading-relaxed whitespace-pre-line">{s.content}</p>
            )}
            {s.items && (
              <ul className="grid md:grid-cols-2 gap-3 mt-4">
                {s.items.map((it, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-ocean-gradient flex items-center justify-center text-[10px] font-mono font-bold text-sand-300 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sand-300/80 text-sm">{it}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-10 text-center"
          >
            <h3 className="headline text-2xl text-sand-300 mb-3">{cta.title}</h3>
            {cta.description && (
              <p className="text-sand-300/70 mb-6 max-w-xl mx-auto">{cta.description}</p>
            )}
            <Link to={cta.to} className="btn-ocean">
              {cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </section>
    </div>
  );
}
