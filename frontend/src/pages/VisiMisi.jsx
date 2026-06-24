import { PageHero } from "@/components/layout/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown, GraduationCap, Users } from "lucide-react";

const DATA_TRPL = {
  visi: "Menjadi program studi yang berperan pada pengembangan perangkat lunak yang aplikatif terutama pada bidang perkelapasawitan serta bidang industri secara umum ditingkat regional pada tahun 2035.",
  misi: [
    "Menghasilkan lulusan yang berjiwa Technopreneurship dan karakter unggul, profesional serta memiliki kompetensi di bidang Rekayasa Perangkat Lunak yang aplikatif terutama dibidang Perkelapasawitan, dengan kemampuan kerja yang berdaya saing regional.",
    "Menghasilkan produk penelitian bidang Rekayasa Perangkat Lunak yang inovatif, berkualitas and bermanfaat dalam pengembangan ilmu pengetahuan dan teknologi pada masyarakat industri terutama bidang perkelapasawitan, serta masyarakat umum melalui penguatan program pengabdian kepada masyarakat.",
    "Mengembangkan kepemimpinan dan tata kelola yang memenuhi standar mutu pendidikan tinggi di tingkat nasional."
  ]
};

const DATA_KABINET = {
  visi: "Mewujudkan mahasiswa TRPL yang professional berbasis analisis dan berpikir logis, namun tetap mengedepankan empati dan kepedulian dalam setiap langkah.",
  misi: [
    "Mengoptimalkan pemanfaatan data dan teknologi dalam setiap proses pengambilan keputusan organisasi untuk menciptakan tata kelola yang efisien, transparan, dan berdampak nyata.",
    "Membangun ekosistem organisasi yang berlandaskan empati, kebersamaan, dan rasa memiliki, sehingga setiap anggota dapat tumbuh, berkontribusi, dan merasa menjadi bagian penting dari HIMA TRPL.",
    "Menumbuhkan budaya inovatif dan kreatif di kalangan mahasiswa TRPL, melalui kegiatan yang mendorong eksplorasi teknologi, riset, dan kolaborasi lintas angkatan.",
    "Mendorong pengembangan potensi dan karakter mahasiswa TRPL agar menjadi individu yang kritis, berdaya cipta, dan siap menghadapi tantangan dunia teknologi.",
    "Menguatkan peran HIMA TRPL sebagai jembatan aspirasi dan wadah kolaborasi, guna memastikan setiap suara mahasiswa tersampaikan dan setiap ide dapat diwujudkan menjadi karya nyata."
  ]
};

const MISSION_ICONS_TRPL = ["🚀", "🧪", "🏛️"];
const MISSION_ICONS_KABINET = ["📊", "🤝", "🔥", "🧠", "⚓"];

// Background animation for floating ocean bubbles
function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-500/5 filter blur-lg"
          style={{
            width: Math.random() * 120 + 60,
            height: Math.random() * 120 + 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 60, 0],
            x: [0, 40, -40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Custom Bubble card for Vision statement
function VisionBubble({ text, speaker, emoji }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative p-6 bg-cyan-950/30 border border-cyan-400/30 rounded-3xl text-sand-200 my-2 shadow-inner"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{emoji}</span>
        <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">{speaker}</span>
      </div>
      <p className="text-sand-100 text-base md:text-lg leading-relaxed italic relative z-10 font-medium">
        "{text}"
      </p>
      
      {/* Decorative dots to give bubble cartoon/retro gaming feel */}
      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400/20" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-cyan-400/20" />
    </motion.div>
  );
}

// Bouncy Accordion Item
function AccordionItem({ title, isOpen, onToggle, onClickTrigger, emojiType, children }) {
  return (
    <motion.div
      className="border border-cyan-500/20 rounded-2xl overflow-hidden glass mb-5 shadow-lg relative group z-10"
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <button
        onClick={(e) => {
          onClickTrigger(e.clientX, e.clientY, emojiType);
          onToggle();
        }}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors relative z-10"
      >
        <span className="headline text-lg md:text-xl text-sand-300 flex items-center gap-3">
          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
            {emojiType === "trpl" ? "🎓" : "⚓"}
          </span>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.25 : 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
        >
          <ChevronDown className="w-6 h-6 text-cyan-300" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-6 pt-0 border-t border-cyan-500/10 relative z-10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Interactive Poll Mini Game
function VotingGame({ onVote }) {
  const [sawitVotes, setSawitVotes] = useState(() => {
    return parseInt(localStorage.getItem("poll_sawit_votes") || "42", 10);
  });
  const [samuderaVotes, setSamuderaVotes] = useState(() => {
    return parseInt(localStorage.getItem("poll_samudera_votes") || "68", 10);
  });
  const [lastVote, setLastVote] = useState(null);
  const [jokeText, setJokeText] = useState("");

  const jokes = {
    trpl: [
      "Sawit Go Digital! 🚀 Menghasilkan minyak kelapa sawit & baris kode premium!",
      "Coding sambil nunggu panen sawit, mantap! 🌴💻",
      "Format PC: Clean. Panen Sawit: Sukses. TRPL Jaya! 🎓",
      "Lulusan TRPL anti-error, siap menguasai industri! 🔥"
    ],
    kabinet: [
      "Ahoooy Kapten! 🏴‍☠️ Mengarungi samudera teknologi!",
      "Dayung terus aspirasimu sampai ke ujung pantai! 🌊⚓",
      "Kru kabinet siap bertempur melawan ombak deadline! 🐙",
      "Empati & kepedulian adalah kompas kami! 🐬❤️"
    ]
  };

  const handleVote = (e, type) => {
    onVote(e.clientX, e.clientY, type);
    const list = jokes[type];
    const randomJoke = list[Math.floor(Math.random() * list.length)];
    setJokeText(randomJoke);
    setLastVote(type);

    if (type === "trpl") {
      const val = sawitVotes + 1;
      setSawitVotes(val);
      localStorage.setItem("poll_sawit_votes", val.toString());
    } else {
      const val = samuderaVotes + 1;
      setSamuderaVotes(val);
      localStorage.setItem("poll_samudera_votes", val.toString());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 p-6 md:p-8 rounded-3xl border-2 border-dashed border-cyan-500/20 glass relative overflow-hidden text-center z-10"
    >
      <div className="absolute top-2 right-2 text-3xl opacity-20 pointer-events-none select-none">🎮</div>
      
      <h3 className="headline text-xl md:text-2xl text-sand-200 mb-2">TENTUKAN DUKUNGANMU! ⚔️</h3>
      <p className="text-cyan-400 text-xs md:text-sm font-mono tracking-wider mb-6">TIM MANA YANG PALING KECE & LUCU?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-6">
        {/* TEAM TRPL */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-cyan-950/40 border border-emerald-500/30 flex flex-col justify-between items-center group cursor-pointer shadow-lg"
          onClick={(e) => handleVote(e, "trpl")}
        >
          <div className="text-5xl mb-3 group-hover:animate-bounce">🌴</div>
          <h4 className="headline text-lg text-emerald-300">Tim Kelapa Sawit</h4>
          <span className="text-xs font-mono text-emerald-400/80 mb-4">PRODI TRPL</span>
          <div className="text-2xl font-bold font-mono text-sand-200 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-400/30">
            {sawitVotes} Dukungan
          </div>
        </motion.div>

        {/* TEAM KABINET */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-500/30 flex flex-col justify-between items-center group cursor-pointer shadow-lg"
          onClick={(e) => handleVote(e, "kabinet")}
        >
          <div className="text-5xl mb-3 group-hover:animate-bounce">⚓</div>
          <h4 className="headline text-lg text-blue-300">Tim Bajak Laut</h4>
          <span className="text-xs font-mono text-blue-400/80 mb-4">KABINET SAMUDERA</span>
          <div className="text-2xl font-bold font-mono text-sand-200 bg-blue-500/20 px-4 py-2 rounded-xl border border-blue-400/30">
            {samuderaVotes} Dukungan
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {lastVote && (
          <motion.div
            key={jokeText}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className={`p-4 rounded-xl max-w-lg mx-auto border ${
              lastVote === "trpl"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-blue-950/40 border-blue-500/40 text-blue-300"
            }`}
          >
            <p className="font-mono text-xs md:text-sm leading-relaxed">{jokeText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function VisiMisi() {
  const [openTrpl, setOpenTrpl] = useState(null); // 'visi' | 'misi' | null
  const [openKabinet, setOpenKabinet] = useState(null);
  const [particles, setParticles] = useState([]);
  
  const containerRef = useRef(null);

  const spawnParticles = (clientX, clientY, type) => {
    if (!containerRef.current) return;
    
    // Get mouse coordinate relative to relative container
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const emojis = type === 'trpl'
      ? ["💻", "🎓", "🌴", "✨", "🧠", "💡", "🚀"]
      : ["🚢", "🌊", "🐙", "⚓", "⛵", "🐬", "🌴", "🪙"];

    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.4;
      const speed = 3 + Math.random() * 4;
      return {
        id: Date.now() + Math.random() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (3 + Math.random() * 3), // drift upwards
        scale: 0.6 + Math.random() * 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
  };

  const toggleTrpl = (section) => {
    setOpenTrpl(openTrpl === section ? null : section);
  };

  const toggleKabinet = (section) => {
    setOpenKabinet(openKabinet === section ? null : section);
  };

  return (
    <div data-testid="visi-misi-page" ref={containerRef} className="relative overflow-hidden min-h-screen">
      {/* Background blobs */}
      <FloatingBubbles />

      {/* Particle overlay container */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 0.2, opacity: 1, rotate: p.rotation }}
              animate={{
                x: p.x + p.vx * 25,
                y: p.y + p.vy * 25 - 60,
                opacity: 0,
                scale: p.scale * 1.4,
                rotate: p.rotation + p.rotationSpeed * 15
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onAnimationComplete={() => {
                setParticles((prev) => prev.filter((item) => item.id !== p.id));
              }}
              className="absolute select-none text-2xl"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <PageHero
        eyebrow="Tujuan & Arah"
        title="Visi &"
        highlight="Misi"
        description="Landasan utama perjalanan Program Studi dan Kabinet Samudera menuju masa depan yang gemilang."
      />

      <section className="max-w-4xl mx-auto px-5 lg:px-10 py-16 relative z-10">
        
        {/* PRODI TRPL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 flex items-center justify-center shadow-glow-cyan cursor-pointer"
            >
              <GraduationCap className="w-7 h-7 text-cyan-300 animate-pulse" />
            </motion.div>
            <div>
              <h2 className="headline text-2xl md:text-3xl text-sand-300">Program Studi TRPL</h2>
              <p className="text-cyan-400 text-xs md:text-sm font-mono tracking-wider mt-1">TEKNOLOGI REKAYASA PERANGKAT LUNAK</p>
            </div>
          </div>

          <AccordionItem
            title="Visi Program Studi"
            isOpen={openTrpl === 'visi'}
            onToggle={() => toggleTrpl('visi')}
            onClickTrigger={spawnParticles}
            emojiType="trpl"
          >
            <VisionBubble 
              text={DATA_TRPL.visi}
              speaker="Kaprodi TRPL"
              emoji="🌴💻"
            />
          </AccordionItem>

          <AccordionItem
            title="Misi Program Studi"
            isOpen={openTrpl === 'misi'}
            onToggle={() => toggleTrpl('misi')}
            onClickTrigger={spawnParticles}
            emojiType="trpl"
          >
            <ol className="space-y-4">
              {DATA_TRPL.misi.map((m, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.08 }}
                  className="flex gap-4 items-start p-3 rounded-xl hover:bg-cyan-500/5 transition-all duration-300 group"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 flex items-center justify-center text-xl shadow-md group-hover:scale-125 transition-transform duration-300">
                    {MISSION_ICONS_TRPL[i] || "✨"}
                  </span>
                  <div className="pt-1">
                    <span className="text-xs font-mono text-cyan-400 block mb-0.5">MISI {String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sand-200 leading-relaxed text-sm md:text-base font-medium">{m}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </AccordionItem>
        </motion.div>

        {/* KABINET SAMUDERA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center shadow-glow-cyan cursor-pointer"
            >
              <Users className="w-7 h-7 text-cyan-300" />
            </motion.div>
            <div>
              <h2 className="headline text-2xl md:text-3xl text-sand-300">Kabinet Samudera</h2>
              <p className="text-cyan-400 text-xs md:text-sm font-mono tracking-wider mt-1">HIMAPRODI TRPL</p>
            </div>
          </div>

          <AccordionItem
            title="Visi Kabinet Samudera"
            isOpen={openKabinet === 'visi'}
            onToggle={() => toggleKabinet('visi')}
            onClickTrigger={spawnParticles}
            emojiType="kabinet"
          >
            <VisionBubble 
              text={DATA_KABINET.visi}
              speaker="Kahim Samudera"
              emoji="⚓🌊"
            />
          </AccordionItem>

          <AccordionItem
            title="Misi Kabinet Samudera"
            isOpen={openKabinet === 'misi'}
            onToggle={() => toggleKabinet('misi')}
            onClickTrigger={spawnParticles}
            emojiType="kabinet"
          >
            <ol className="space-y-4">
              {DATA_KABINET.misi.map((m, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.08 }}
                  className="flex gap-4 items-start p-3 rounded-xl hover:bg-cyan-500/5 transition-all duration-300 group"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center text-xl shadow-md group-hover:scale-125 transition-transform duration-300">
                    {MISSION_ICONS_KABINET[i] || "✨"}
                  </span>
                  <div className="pt-1">
                    <span className="text-xs font-mono text-cyan-400 block mb-0.5">MISI {String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sand-200 leading-relaxed text-sm md:text-base font-medium">{m}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </AccordionItem>
        </motion.div>

        {/* Mini Game Section */}
        <VotingGame onVote={spawnParticles} />

      </section>
    </div>
  );
}
