import { useEffect, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";
import api from "@/lib/api";

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/project")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div data-testid="project-page">
      <PageHero
        eyebrow="Aplikasi Publik"
        title="Project"
        highlight="Showcase"
        description="Karya nyata mahasiswa TRPL dan Kabinet Samudera — dari sistem akademik hingga proyek IoT."
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-glow-cyan transition-all duration-500"
              data-testid={`project-card-${i}`}
            >
              <div className="aspect-video relative overflow-hidden bg-deep">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-abyss to-transparent" />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/80 text-abyss">
                  <Code2 className="w-3 h-3" /> Project
                </span>
              </div>
              <div className="p-5">
                <h3 className="headline text-lg text-sand-300 mb-2 group-hover:text-cyan-300 transition">
                  {p.title}
                </h3>
                <p className="text-sand-300/65 text-sm mb-4 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                    {p.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200">
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                  {p.demo_url && (
                    <a href={p.demo_url} target="_blank" rel="noreferrer" className="text-xs inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200">
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
