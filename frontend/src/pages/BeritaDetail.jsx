import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [b, setB] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api
      .get(`/berita/${slug}`)
      .then((r) => setB(r.data))
      .catch(() => setErr("Berita tidak ditemukan."));
  }, [slug]);

  if (err)
    return (
      <div className="min-h-[60vh] flex items-center justify-center" data-testid="berita-detail-notfound">
        <div className="text-center">
          <p className="text-sand-300/60 mb-4">{err}</p>
          <Link to="/berita" className="btn-ghost-ocean">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </div>
      </div>
    );

  if (!b) return <div className="min-h-[60vh] flex items-center justify-center text-sand-300/60">Memuat...</div>;

  return (
    <article className="relative" data-testid="berita-detail-page">
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {b.image_url && (
          <img src={b.image_url} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent" />
        <div className="absolute inset-0 circuit-bg opacity-40" />
        <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-5 lg:px-10 py-10">
          <Link
            to="/berita"
            className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-mono mb-4 hover:text-cyan-200"
          >
            <ArrowLeft className="w-4 h-4" /> Semua Berita
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="headline text-3xl md:text-5xl text-sand-300 max-w-3xl"
          >
            {b.title}
          </motion.h1>
          <div className="flex flex-wrap gap-4 mt-5 text-cyan-400/80 text-sm font-mono">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> {b.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {b.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />{" "}
              {new Date(b.published_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-12">
        <p className="text-lg text-cyan-200/80 font-medium leading-relaxed mb-6 border-l-2 border-cyan-400 pl-5">
          {b.excerpt}
        </p>
        <div className="prose prose-invert max-w-none text-sand-300/80 leading-relaxed whitespace-pre-line">
          {b.content}
        </div>
      </div>
    </article>
  );
}
