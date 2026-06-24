import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

const DEPARTMENTS = [
  "Inti",
  "Advokasi",
  "Public Relation",
  "Kewirausahaan",
  "Web Dev",
  "PDD",
  "Pengembangan SDM",
  "Minat Bakat"
];

const ROSTER_ANGGOTA = [
  // INTI
  { name: "Ahmad Ilyas Mu'alimin", position: "Gubernur Himaprodi", department: "Inti", shortPosition: "Ketua Umum", photo_url: null },
  { name: "M. Rafly Ardiyaksa", position: "Wakil Gubernur Himaprodi", department: "Inti", shortPosition: "Wakil Ketua", photo_url: null },
  { name: "Adela Handira Syahputri", position: "Sekretaris 1", department: "Inti", shortPosition: "Sekretaris 1", photo_url: null },
  { name: "Allika Aullia", position: "Sekretaris 2", department: "Inti", shortPosition: "Sekretaris 2", photo_url: null },
  { name: "Nagita Rorencia Donan", position: "Bendahara 1", department: "Inti", shortPosition: "Bendahara 1", photo_url: null },
  { name: "Putri Abelia", position: "Bendahara 2", department: "Inti", shortPosition: "Bendahara 2", photo_url: null },

  // ADVOKASI
  { name: "Petrus Roliand Federico Girsang", position: "Koordinator Div. Advokasi", department: "Advokasi", shortPosition: "Koordinator", photo_url: null },
  { name: "Miftahul Nurul Qolbi", position: "Anggota Div. Advokasi", department: "Advokasi", shortPosition: "Anggota", photo_url: null },
  { name: "Ratna Kurnia Wati", position: "Anggota Div. Advokasi", department: "Advokasi", shortPosition: "Anggota", photo_url: null },

  // PUBLIC RELATION
  { name: "Mifta Salsabilah Lubis", position: "Koordinator Div. Public Relation", department: "Public Relation", shortPosition: "Koordinator", photo_url: null },
  { name: "Aliyya Raeni Chayara", position: "Anggota Div. Public Relation", department: "Public Relation", shortPosition: "Anggota", photo_url: null },
  { name: "Asyifa Salsabila Al-Qodri", position: "Anggota Div. Public Relation", department: "Public Relation", shortPosition: "Anggota", photo_url: null },

  // KEWIRAUSAHAAN
  { name: "Rizki Wahyu Saputra", position: "Koordinator Div. Kewirausahaan", department: "Kewirausahaan", shortPosition: "Koordinator", photo_url: null },
  { name: "Silva", position: "Anggota Div. Kewirausahaan", department: "Kewirausahaan", shortPosition: "Anggota", photo_url: null },
  { name: "Dika Prasetyawan", position: "Anggota Div. Kewirausahaan", department: "Kewirausahaan", shortPosition: "Anggota", photo_url: null },
  { name: "Nursheila Majid", position: "Anggota Div. Kewirausahaan", department: "Kewirausahaan", shortPosition: "Anggota", photo_url: null },
  { name: "Sri Wahyuni", position: "Anggota Div. Kewirausahaan", department: "Kewirausahaan", shortPosition: "Anggota", photo_url: null },

  // WEB DEV
  { name: "Rengga Bagus Kurniawan", position: "Koordinator Div. Development Web & App", department: "Web Dev", shortPosition: "Koordinator", photo_url: null },
  { name: "Ahmad Sukron Yusuf", position: "Anggota Div. Development Web & App", department: "Web Dev", shortPosition: "Anggota", photo_url: null },
  { name: "Ahmad Zulkifli", position: "Anggota Div. Development Web & App", department: "Web Dev", shortPosition: "Anggota", photo_url: null },

  // PDD
  { name: "Wira Mega Wijaya", position: "Koordinator Div. Publication, Documentation, & Design", department: "PDD", shortPosition: "Koordinator", photo_url: null },
  { name: "Albib Azrianda", position: "Anggota Div. Publication, Documentation, & Design", department: "PDD", shortPosition: "Anggota", photo_url: null },
  { name: "Baiti Rahma", position: "Anggota Div. Publication, Documentation, & Design", department: "PDD", shortPosition: "Anggota", photo_url: null },

  // PENGEMBANGAN SDM
  { name: "Lipi Enzelina Br.Sihite", position: "Koordinator Div. Pengembangan SDM", department: "Pengembangan SDM", shortPosition: "Koordinator", photo_url: null },
  { name: "Mya Aprilia Melani Putri", position: "Anggota Div. Pengembangan SDM", department: "Pengembangan SDM", shortPosition: "Anggota", photo_url: null },
  { name: "Dendi Ramadhan", position: "Anggota Div. Pengembangan SDM", department: "Pengembangan SDM", shortPosition: "Anggota", photo_url: null },

  // MINAT BAKAT
  { name: "Evanuel Syaputra Saragih", position: "Koordinator Div. Minat dan Bakat", department: "Minat Bakat", shortPosition: "Koordinator", photo_url: null },
  { name: "Rahmi Syafitri", position: "Anggota Div. Minat dan Bakat", department: "Minat Bakat", shortPosition: "Anggota", photo_url: null },
  { name: "Fathi Nabill Raffa Ruza", position: "Anggota Div. Minat dan Bakat", department: "Minat Bakat", shortPosition: "Anggota", photo_url: null }
];

function MemberCard({ a, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.025 }}
      className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 aspect-[3/4] shadow-xl group cursor-pointer z-10"
      data-testid={`member-card-${a.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Background large position text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden p-6 z-10 leading-none">
        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white/[0.03] uppercase tracking-widest text-center leading-none px-4 break-words">
          {a.shortPosition}
        </span>
      </div>

      {/* Top logos container */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-30 pointer-events-none">
        <img
          src="/assets/hima-prodi.png"
          alt="Logo HIMAPRODI"
          className="h-8 w-8 object-contain filter drop-shadow-md"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <img
          src="/assets/logo-samudera.png"
          alt="Logo Kabinet"
          className="h-8 w-8 object-contain filter drop-shadow-md"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Main card representation (with photos or abstract glow) */}
      {(() => {
        const ext = a.name === "Rizki Wahyu Saputra" ? "jpeg" : "jpg";
        const photoUrl = a.photo_url || `/assets/anggota-kami/${a.name.toUpperCase()}.${ext}`;
        return photoUrl ? (
          <img
            src={photoUrl}
            alt={a.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-900/60 to-blue-950/50 flex items-center justify-center z-0">
            <User className="w-16 h-16 text-cyan-300/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        );
      })()}

      {/* Bottom gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-20 pointer-events-none" />

      {/* Member Details */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-30 flex flex-col justify-end">
        <h3 className="headline text-base md:text-lg text-white font-bold leading-tight drop-shadow-md group-hover:text-cyan-300 transition-colors">
          {a.name}
        </h3>
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-400 mt-1.5 font-bold">
          {a.position}
        </span>
      </div>
    </motion.div>
  );
}

export default function Struktur() {
  const [selectedTab, setSelectedTab] = useState("Inti");

  const filteredMembers = ROSTER_ANGGOTA.filter(
    (m) => m.department.toLowerCase() === selectedTab.toLowerCase()
  );

  return (
    <div data-testid="struktur-page" className="relative min-h-screen pb-20">
      {/* Decorative Background Glowing Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-500/5 filter blur-3xl animate-pulse"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDuration: `${10 + i * 2}s`
            }}
          />
        ))}
      </div>

      <PageHero
        eyebrow="Kabinet Samudera"
        title="Anggota"
        highlight="Kami"
        description="Orang-orang hebat dibalik pergerakan Himaprodi TRPL periode 2025/2026."
      />

      <section className="max-w-6xl mx-auto px-5 lg:px-10 py-12 relative z-10">
        
        {/* Horizontal Navigation Tabs */}
        <div className="flex justify-start md:justify-center overflow-x-auto scrollbar-none pb-4 mb-10 gap-2 border-b border-cyan-500/10">
          <div className="flex gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedTab(dept)}
                className={`px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 ${
                  selectedTab === dept
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan scale-105"
                    : "bg-white/5 border border-cyan-500/10 text-sand-300 hover:bg-white/10 hover:border-cyan-500/30"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredMembers.map((a, i) => (
                <MemberCard key={a.name} a={a} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </section>
    </div>
  );
}
