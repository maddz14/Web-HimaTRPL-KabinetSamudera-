import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Newspaper, Users, Layers, Calendar, Image as ImageIcon, Mail, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const CARDS = [
  { key: "berita", label: "Berita", icon: Newspaper, to: "/admin/berita" },
  { key: "anggota", label: "Anggota", icon: Users, to: "/admin/anggota" },
  { key: "departemen", label: "Departemen", icon: Layers, to: "/admin/departemen" },
  { key: "program_kerja", label: "Program Kerja", icon: Calendar, to: "/admin/program-kerja" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, to: "/admin/galeri" },
  { key: "project", label: "Project", icon: Code2, to: "/admin/project" },
  { key: "pesan_baru", label: "Pesan Baru", icon: Mail, to: "/admin/pesan", highlight: true },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(r.data || {})).catch(() => {});
  }, []);

  return (
    <div data-testid="admin-dashboard">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-2">
          Selamat datang kembali
        </div>
        <h1 className="headline text-3xl md:text-4xl text-sand-300">
          Dashboard <span className="text-gradient-cyan">Samudera</span>
        </h1>
        <p className="text-sand-300/60 mt-2">
          Kelola seluruh konten Himaprodi TRPL dari satu tempat.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={c.to}
              data-testid={`stat-card-${c.key}`}
              className={`glass rounded-2xl p-6 flex items-start justify-between gap-4 hover:shadow-glow-cyan transition block ${
                c.highlight && stats[c.key] > 0 ? "border-cyan-400/40 animate-pulse-glow" : ""
              }`}
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 mb-1">
                  Total
                </div>
                <div className="headline text-3xl text-sand-300 mb-1">{stats[c.key] ?? 0}</div>
                <div className="text-sm text-sand-300/60">{c.label}</div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-cyan-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
