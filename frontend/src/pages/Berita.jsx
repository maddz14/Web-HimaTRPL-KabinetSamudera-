import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function Berita() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/berita")
      .then((r) => setList(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="berita-page">
      <PageHero
        eyebrow="Redaksi"
        title="Berita &"
        highlight="Artikel"
        description="Dokumentasi kegiatan, liputan program, dan cerita dari seluruh penjuru Kabinet Samudera."
      />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        {loading ? (
          <div className="text-center text-sand-300/60 py-12">Memuat...</div>
        ) : list.length === 0 ? (
          <div className="text-center text-sand-300/60 py-12">Belum ada berita.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((b, i) => (
              <motion.article
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-500"
                data-testid={`berita-card-${b.slug}`}
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
                    <p className="text-sand-300/60 text-sm line-clamp-2 mb-4">{b.excerpt}</p>
                    <div className="flex items-center justify-between text-[11px] text-cyan-400/70 font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3 h-3" /> {b.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />{" "}
                        {new Date(b.published_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-cyan-300 text-sm font-medium">
                      Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
