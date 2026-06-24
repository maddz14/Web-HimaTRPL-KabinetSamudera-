import { motion } from "framer-motion";

/** Reusable section wrapper with a uniform page hero. */
export function PageHero({ eyebrow, title, highlight, description }) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden circuit-bg" data-testid="page-hero">
      <div className="absolute inset-0 bg-ocean-gradient opacity-20" />
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="relative max-w-5xl mx-auto px-5 lg:px-10">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-cyan-300 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="headline text-4xl sm:text-5xl lg:text-6xl text-sand-300 mb-5"
        >
          {title}{" "}
          {highlight && <span className="text-gradient-ocean">{highlight}</span>}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand-300/70 text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
