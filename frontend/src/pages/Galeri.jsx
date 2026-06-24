import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, X, Image as ImageIcon, Video, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import InteractiveBentoGallery, { BentoSkeleton } from "@/components/ui/interactive-bento-gallery";

// ---------------------------------------------------------------------------
// Span cycle — auto-assigned per index agar layout bento selalu terjaga
// ---------------------------------------------------------------------------
const SPAN_CYCLE = [
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
];

// ---------------------------------------------------------------------------
// Map API response → MediaItemType yang dipakai InteractiveBentoGallery
// ---------------------------------------------------------------------------
function mapToMediaItem(g, index) {
  return {
    id: g.id,
    type: g.type || "image",
    title: g.title,
    desc: g.description || "",
    url: g.type === "video" ? (g.video_url || g.image_url) : g.image_url,
    image_url: g.image_url,
    video_url: g.video_url,
    category: g.category,
    span: g.span || SPAN_CYCLE[index % SPAN_CYCLE.length],
  };
}

// ---------------------------------------------------------------------------
// AddMediaDialog — modal form untuk tambah item baru
// ---------------------------------------------------------------------------
function AddMediaDialog({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    type: "image",
    image_url: "",
    video_url: "",
    category: "Kegiatan",
    description: "",
    span: SPAN_CYCLE[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Judul wajib diisi.");
    if (form.type === "image" && !form.image_url.trim()) return setError("URL gambar wajib diisi.");
    if (form.type === "video" && !form.video_url.trim()) return setError("URL video wajib diisi.");

    setLoading(true);
    try {
      await api.post("/galeri", {
        title: form.title,
        type: form.type,
        image_url: form.image_url || form.video_url, // fallback agar backend tidak error
        video_url: form.video_url || null,
        category: form.category,
        description: form.description,
        span: form.span,
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Gagal menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2 rounded-xl text-sm bg-abyss/60 border border-cyan-900/40 text-sand-300 placeholder-sand-300/30 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-abyss/80 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.93, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-md bg-deep/90 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-abyss/60 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="headline text-sand-300 text-xl">Tambah Media</h2>
              <p className="text-sand-300/50 text-xs mt-0.5">Upload gambar atau video ke galeri</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-cyan-500/10 text-sand-300/50 hover:text-cyan-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type toggle */}
            <div className="flex gap-2">
              {[
                { value: "image", label: "Gambar", Icon: ImageIcon },
                { value: "video", label: "Video", Icon: Video },
              ].map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: value }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium border transition
                    ${form.type === value
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                      : "border-cyan-900/30 text-sand-300/50 hover:border-cyan-700/40 hover:text-sand-300/80"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                Judul *
              </label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Nama kegiatan..." className={inputCls} />
            </div>

            {/* Media URL */}
            {form.type === "image" ? (
              <div>
                <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                  URL Gambar *
                </label>
                <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." className={inputCls} />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                    URL Video * (.mp4)
                  </label>
                  <input name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://...mp4" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                    URL Thumbnail (opsional)
                  </label>
                  <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://... (gambar cover)" className={inputCls} />
                </div>
              </>
            )}

            {/* Category */}
            <div>
              <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                Kategori
              </label>
              <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                {["Kegiatan", "Rapat", "Seminar", "Workshop", "Lomba", "Diesnatalis", "Lainnya"].map((c) => (
                  <option key={c} value={c} style={{ background: "#001219" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Span / layout */}
            <div>
              <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                Ukuran Layout Bento
              </label>
              <select name="span" value={form.span} onChange={handleChange} className={inputCls}>
                {[
                  { label: "Kolom 1, Baris 3 (Portrait)", value: SPAN_CYCLE[0] },
                  { label: "Kolom 2, Baris 2 (Landscape)", value: SPAN_CYCLE[1] },
                  { label: "Kolom 1, Baris 2 (Kotak kecil)", value: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2" },
                  { label: "Kolom 2, Baris 3 (Banner lebar)", value: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2" },
                ].map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: "#001219" }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-sand-300/60 mb-1 font-mono uppercase tracking-wider">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                placeholder="Keterangan singkat..."
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-medium text-sm transition-all
                         bg-gradient-to-r from-lagoon to-ocean text-abyss hover:brightness-110
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Simpan ke Galeri
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Galeri Page
// ---------------------------------------------------------------------------
export default function Galeri() {
  const { user } = useAuth();
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const isAdmin = user && user.role === "admin";

  const fetchGaleri = async () => {
    try {
      const { data } = await api.get("/galeri");
      setRawList(data || []);
    } catch {
      setRawList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  // Map raw API data → MediaItemType dengan auto-span
  const mediaItems = rawList.map(mapToMediaItem);

  return (
    <div data-testid="galeri-page">
      <PageHero
        eyebrow="Dokumentasi"
        title="Galeri"
        highlight="Kegiatan"
        description="Rekam jejak visual dari setiap gelombang aktivitas Kabinet Samudera."
      />

      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
        {/* Admin action bar */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end mb-6"
          >
            <button
              onClick={() => setShowAddDialog(true)}
              data-testid="add-media-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all
                         bg-gradient-to-r from-lagoon to-ocean text-abyss hover:brightness-110 hover:scale-[1.02]
                         shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              Tambah Media
            </button>
          </motion.div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <BentoSkeleton count={7} />
        ) : mediaItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <ImageIcon className="w-7 h-7 text-cyan-500/60" />
            </div>
            <p className="text-sand-300/50 text-sm">
              Belum ada foto atau video galeri.
            </p>
            {isAdmin && (
              <button
                onClick={() => setShowAddDialog(true)}
                className="mt-4 btn-ghost-ocean text-sm"
              >
                Tambah media pertama
              </button>
            )}
          </motion.div>
        ) : (
          <InteractiveBentoGallery
            mediaItems={mediaItems}
            title="Galeri Kegiatan HIMA"
            description="Koleksi momen terbaik kegiatan organisasi kita"
          />
        )}
      </section>

      {/* Add Media Dialog */}
      {showAddDialog && (
        <AddMediaDialog
          onClose={() => setShowAddDialog(false)}
          onSuccess={() => {
            setLoading(true);
            fetchGaleri();
          }}
        />
      )}
    </div>
  );
}
