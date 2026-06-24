import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowLeft,
  Ticket,
  PenLine,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";
import "./Nettas.css";

// =============================================================
// HELPERS
// =============================================================

const TARGET_DATE = new Date("2026-07-06T08:00:00+07:00");

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function useCountUp(target, shouldStart, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, shouldStart, duration]);
  return val;
}

function useInView(ref, opts = { threshold: 0.3 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      opts,
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, opts]);
  return inView;
}

// =============================================================
// SUB-COMPONENTS
// =============================================================

function Stars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.05 + 0.02,
      opacity: Math.random(),
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      fadeSpeed: Math.random() * 0.02 + 0.005,
      isPurple: Math.random() > 0.6,
    }));

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Update opacity for blinking effect
        star.opacity += star.fadeDir * star.fadeSpeed;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.fadeDir = -1;
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.fadeDir = 1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        // Add glow
        ctx.shadowBlur = star.size * 3;
        if (star.isPurple) {
          ctx.fillStyle = `rgba(168, 85, 247, ${star.opacity})`;
          ctx.shadowColor = `rgba(168, 85, 247, ${star.opacity})`;
        } else {
          ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity})`;
          ctx.shadowColor = `rgba(0, 212, 255, ${star.opacity})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="nettas-stars"
      style={{
        position: "absolute",
        inset: 0,
      }}
      aria-hidden
    />
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  const items = [
    { num: days, label: "Hari" },
    { num: hours, label: "Jam" },
    { num: minutes, label: "Menit" },
    { num: seconds, label: "Detik" },
  ];
  return (
    <div className="nettas-countdown" data-testid="nettas-countdown">
      {items.map((it) => (
        <div key={it.label} className="nettas-countdown-box">
          <div className="nettas-countdown-num">{String(it.num).padStart(2, "0")}</div>
          <div className="nettas-countdown-label">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ target, suffix = "+", label }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const val = useCountUp(target, inView);
  return (
    <div ref={ref} className="nettas-stat" data-testid={`nettas-stat-${label.toLowerCase()}`}>
      <div className="nettas-stat-num">
        {val}
        {suffix}
      </div>
      <div className="nettas-stat-label">{label}</div>
    </div>
  );
}

function SectionWrapper({ id, children, testId }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.08 });
  return (
    <section
      id={id}
      ref={ref}
      className={`nettas-section ${inView ? "is-visible" : ""}`}
      data-testid={testId}
    >
      <div className="nettas-container">{children}</div>
    </section>
  );
}

// =============================================================
// DATA
// =============================================================

const TIMELINE = [
  {
    icon: "🔑",
    title: "Registrasi & Pembukaan",
    date: "6 Juli 2026 (08:00 - 09:00)",
    desc: "Registrasi peserta, pembukaan oleh MC, sambutan Kaprodi & Direktur.",
    status: "UPCOMING",
    statusCls: "nettas-badge-up",
  },
  {
    icon: "🎤",
    title: "Talkshow and Sharing Technology",
    date: "6 Juli 2026 (09:00 - 12:00)",
    desc: "Sesi berbagi wawasan teknologi bersama pemateri ahli dari industri.",
    status: "UPCOMING",
    statusCls: "nettas-badge-up",
  },
  {
    icon: "🚀",
    title: "Pameran Teknologi",
    date: "6 Juli 2026 (13:00 - 15:00)",
    desc: "Showcase atau display teknologi yang relevan dengan tema NETTAS, serta pameran project karya mahasiswa TRPL.",
    status: "UPCOMING",
    statusCls: "nettas-badge-up",
  },
  {
    icon: "🏆",
    title: "Penutupan & Pembagian Doorprize",
    date: "6 Juli 2026 (15:00 - 16:00)",
    desc: "Sesi akhir acara, pengumuman, pembagian sertifikat, dan foto bersama.",
    status: "UPCOMING",
    statusCls: "nettas-badge-up",
  },
];

const SPEAKERS = [
  { name: "Ahdiat Leksi Siregar, S.T., M.M.", role: "Dosen Politeknik Citra Widya Edukasi", org: "", badge: "Keynote Speaker", initials: "AS" },
  { name: "Faisal Zuhfari", role: "Founder Halo Is & Creator IT", org: "", badge: "Guest Speaker", initials: "FZ" },
  { name: "Saiful Bahri, S.MSc.", role: "CTO & Founder mySAPSS", org: "", badge: "Guest Speaker", initials: "SB" },
];

const SPONSORS = ["SPONSOR 1", "SPONSOR 2", "SPONSOR 3", "SPONSOR 4", "SPONSOR 5"];
const PARTNERS = ["PARTNER 1", "PARTNER 2", "PARTNER 3", "PARTNER 4", "PARTNER 5"];

const SUBNAV = [
  { id: "nettas-about", label: "Tentang" },
  { id: "nettas-timeline", label: "Rundown" },
  { id: "nettas-speakers", label: "Speakers" },
  { id: "nettas-galeri", label: "Galeri" },
  { id: "nettas-benefit", label: "Benefit" },
  { id: "nettas-sponsor", label: "Sponsor" },
  { id: "nettas-daftar", label: "Daftar" },
];

// =============================================================
// PAGE
// =============================================================

export default function Nettas() {
  const [activeId, setActiveId] = useState("nettas-hero");
  const [showBack, setShowBack] = useState(false);
  const scopeRef = useRef(null);

  // Sub-navbar active state + floating back button trigger
  useEffect(() => {
    const ids = SUBNAV.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // Floating back button: visible only when user has scrolled past hero
    const scope = scopeRef.current;
    const backIo = new IntersectionObserver(
      ([entry]) => setShowBack(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    const hero = document.getElementById("nettas-hero");
    if (hero) backIo.observe(hero);

    return () => {
      io.disconnect();
      backIo.disconnect();
    };
  }, []);

  const handleSubnavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="nettas-scope" ref={scopeRef} data-testid="nettas-page">
      {/* Background stars and mesh covering the top viewport */}
      <div className="nettas-bg-container" aria-hidden="true">
        <div className="nettas-hero-mesh" />
        <Stars />
      </div>

      {/* Transition band (hidden/height 0 as per CSS) */}
      <div className="nettas-transition-band" aria-hidden="true" />

      {/* Sub-navbar */}
      <nav className="nettas-subnav" data-testid="nettas-subnav" aria-label="NETTAS sections">
        <div className="nettas-subnav-inner">
          {SUBNAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleSubnavClick(e, s.id)}
              className={activeId === s.id ? "is-active" : ""}
              data-testid={`nettas-subnav-${s.id.replace("nettas-", "")}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Floating back button */}
      <Link
        to="/"
        className={`nettas-float-back ${showBack ? "is-visible" : ""}`}
        data-testid="nettas-float-back"
      >
        <ArrowLeft size={14} /> Kembali ke Home
      </Link>

      {/* ============ 1. HERO ============ */}
      <section id="nettas-hero" className="nettas-hero" data-testid="nettas-hero">
        <div className="nettas-hero-content">
          <img
            src="/assets/nettas-logo.png"
            alt="Logo NETTAS"
            className="nettas-hero-logo"
            data-testid="nettas-hero-logo"
          />
          <span className="nettas-pill">✦ Event Terbesar HIMAPRODI TRPL ✦</span>

          <h1 data-testid="nettas-hero-title">2ND NETTAS</h1>

          <div className="nettas-hero-sub">Engineering for impact: innovating the future of precision technology</div>
          <div className="nettas-hero-tagline">
            🗓️ 6 Juli 2026 &nbsp;|&nbsp; 📍 Poltek CWE - Auditorium Politeknik Kelapa Sawit Citra Widya Edukasi
          </div>

          <Countdown />

          <div className="nettas-cta-row">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc4Yc9kFiuH0pG_VQ5ipnQgghFvwGUNA-OSsIp058xqpgk5-A/viewform"
              target="_blank"
              rel="noreferrer"
              className="nettas-btn nettas-btn-primary"
              data-testid="nettas-cta-events"
            >
              <Ticket size={18} /> Daftar / Ambil Ticket
            </a>
          </div>
        </div>
      </section>

      {/* ============ 2. ABOUT ============ */}
      <SectionWrapper id="nettas-about" testId="nettas-about">
        <div className="nettas-section-header">
          <span className="nettas-pill">Tentang NETTAS</span>
          <h2>
            Apa itu <span className="nettas-gradient-text">NETTAS?</span>
          </h2>
          <p>
            NETTAS (Network Technology and Sharing) adalah event tahunan terbesar yang
            diselenggarakan oleh HIMAPRODI TRPL Kabinet Samudera. Menggabungkan kompetisi KTI
            (Karya Tulis Ilmiah), seminar teknologi, dan pameran inovasi mahasiswa sebagai wadah pengembangan
            akademik dan kreativitas mahasiswa TRPL.
          </p>
        </div>

        <div className="nettas-stats">
          <StatCard target={500} label="Peserta" />
          <StatCard target={10} label="Institusi" />
          <StatCard target={20} label="Sponsor & Partner" />
        </div>
      </SectionWrapper>

      {/* ============ 3. TIMELINE ============ */}
      <SectionWrapper id="nettas-timeline" testId="nettas-timeline">
        <div className="nettas-section-header">
          <span className="nettas-pill">Rangkaian Acara</span>
          <h2>
            Jadwal <span className="nettas-gradient-text">Kegiatan</span>
          </h2>
        </div>

        <div className="nettas-timeline">
          {TIMELINE.map((it, i) => (
            <div
              key={it.title}
              className={`nettas-tl-item ${i % 2 === 1 ? "right" : ""}`}
              data-testid={`nettas-timeline-item-${i}`}
            >
              <span className="nettas-tl-dot" aria-hidden />
              <div className="nettas-tl-card">
                <div className="nettas-tl-head">
                  <span className="nettas-tl-icon">{it.icon}</span>
                  <span className="nettas-tl-title">{it.title}</span>
                </div>
                <div className="nettas-tl-date">{it.date}</div>
                <p className="nettas-tl-desc">{it.desc}</p>
                <span className={`nettas-badge ${it.statusCls}`}>{it.status}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ============ 4. SPEAKERS ============ */}
      <SectionWrapper id="nettas-speakers" testId="nettas-speakers">
        <div className="nettas-section-header">
          <span className="nettas-pill">Pembicara</span>
          <h2>
            Keynote <span className="nettas-gradient-text">Speakers</span>
          </h2>
        </div>

        <div className="nettas-speakers-grid">
          {SPEAKERS.map((s, i) => (
            <div key={i} className="nettas-speaker-card" data-testid={`nettas-speaker-${i}`}>
              <div className="nettas-avatar">{s.initials}</div>
              <div className="nettas-speaker-name">{s.name}</div>
              <div className="nettas-speaker-role">{s.role}</div>
              <div className="nettas-speaker-org">{s.org}</div>
              <span className="nettas-speaker-badge">{s.badge}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ============ GALERI NETTAS ============ */}
      <SectionWrapper id="nettas-galeri" testId="nettas-galeri">
        <div className="nettas-section-header">
          <span className="nettas-pill">Galeri</span>
          <h2>
            Momen <span className="nettas-gradient-text">NETTAS</span>
          </h2>
          <p>Dokumentasi kegiatan dan kenangan terbaik NETTAS HIMAPRODI TRPL</p>
        </div>

        <div className="nettas-gallery-wrapper" data-testid="nettas-gallery">
          <div className="nettas-gallery-row nettas-gallery-row-1">
            {[
              { bg: "linear-gradient(135deg, #6c00ff, #0a0a2e)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #0a0a2e, #00d4ff)", label: "📸 NETTAS 2024" },
              { bg: "linear-gradient(135deg, #9b4dff, #050510)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #00d4ff, #6c00ff)", label: "📸 NETTAS 2024" },
              { bg: "linear-gradient(135deg, #050510, #9b4dff)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #6c00ff, #00d4ff)", label: "📸 NETTAS 2024" },
            ]
              .concat([
                { bg: "linear-gradient(135deg, #6c00ff, #0a0a2e)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #0a0a2e, #00d4ff)", label: "📸 NETTAS 2024" },
                { bg: "linear-gradient(135deg, #9b4dff, #050510)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #00d4ff, #6c00ff)", label: "📸 NETTAS 2024" },
                { bg: "linear-gradient(135deg, #050510, #9b4dff)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #6c00ff, #00d4ff)", label: "📸 NETTAS 2024" },
              ])
              .map((c, i) => (
                <div key={i} className="nettas-gallery-card" style={{ background: c.bg }}>
                  <span className="nettas-gallery-label">{c.label}</span>
                </div>
              ))}
          </div>

          <div className="nettas-gallery-row nettas-gallery-row-2">
            {[
              { bg: "linear-gradient(135deg, #0a0a2e, #6c00ff)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #00d4ff, #0a0a2e)", label: "📸 NETTAS 2024" },
              { bg: "linear-gradient(135deg, #050510, #00d4ff)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #6c00ff, #9b4dff)", label: "📸 NETTAS 2024" },
              { bg: "linear-gradient(135deg, #9b4dff, #00d4ff)", label: "📸 NETTAS 2025" },
              { bg: "linear-gradient(135deg, #00d4ff, #050510)", label: "📸 NETTAS 2024" },
            ]
              .concat([
                { bg: "linear-gradient(135deg, #0a0a2e, #6c00ff)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #00d4ff, #0a0a2e)", label: "📸 NETTAS 2024" },
                { bg: "linear-gradient(135deg, #050510, #00d4ff)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #6c00ff, #9b4dff)", label: "📸 NETTAS 2024" },
                { bg: "linear-gradient(135deg, #9b4dff, #00d4ff)", label: "📸 NETTAS 2025" },
                { bg: "linear-gradient(135deg, #00d4ff, #050510)", label: "📸 NETTAS 2024" },
              ])
              .map((c, i) => (
                <div key={i} className="nettas-gallery-card" style={{ background: c.bg }}>
                  <span className="nettas-gallery-label">{c.label}</span>
                </div>
              ))}
          </div>
        </div>

        <p className="nettas-gallery-note">Foto akan diperbarui setelah acara berlangsung</p>
      </SectionWrapper>

      {/* ============ 6. BENEFIT PESERTA ============ */}
      <SectionWrapper id="nettas-benefit" testId="nettas-benefit">
        <div className="nettas-section-header">
          <span className="nettas-pill">Fasilitas</span>
          <h2>
            Benefit <span className="nettas-gradient-text">Peserta</span>
          </h2>
          <p>Dapatkan berbagai keuntungan dan fasilitas dengan mengikuti acara NETTAS 2026</p>
        </div>

        <div className="nettas-stats">
          <div className="nettas-stat">
            <div className="nettas-stat-num">🎁</div>
            <div className="nettas-stat-label">Merchandise</div>
          </div>
          <div className="nettas-stat">
            <div className="nettas-stat-num">🛍️</div>
            <div className="nettas-stat-label">Souvenir</div>
          </div>
          <div className="nettas-stat">
            <div className="nettas-stat-num">🥤</div>
            <div className="nettas-stat-label">Snack & Drink</div>
          </div>
          <div className="nettas-stat">
            <div className="nettas-stat-num">📜</div>
            <div className="nettas-stat-label">E-Sertifikat</div>
          </div>
        </div>
      </SectionWrapper>

      {/* ============ 7. SPONSOR + DAFTAR ============ */}
      <SectionWrapper id="nettas-sponsor" testId="nettas-sponsor">
        <div className="nettas-section-header">
          <span className="nettas-pill">Didukung Oleh</span>
          <h2>
            Sponsor & <span className="nettas-gradient-text">Partner</span>
          </h2>
        </div>

        <div className="nettas-marquee-label">Sponsor Utama</div>
        <div className="nettas-marquee">
          <div className="nettas-marquee-track">
            {[...SPONSORS, ...SPONSORS].map((s, i) => (
              <div key={i} className="nettas-marquee-item">{s}</div>
            ))}
          </div>
        </div>

        <div className="nettas-marquee-label" style={{ marginTop: 24 }}>Media Partner</div>
        <div className="nettas-marquee reverse">
          <div className="nettas-marquee-track">
            {[...PARTNERS, ...PARTNERS].map((s, i) => (
              <div key={i} className="nettas-marquee-item">{s}</div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="nettas-daftar" testId="nettas-daftar">
        <div className="nettas-section-header">
          <span className="nettas-pill">Registrasi</span>
          <h2>
            Pendaftaran <span className="nettas-gradient-text">NETTAS 2026</span>
          </h2>
          <p>
            Isi formulir pendaftaran melalui Google Form resmi panitia untuk mendapatkan akses ke acara NETTAS 2026.
          </p>
        </div>

        <div className="nettas-lomba-card" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="nettas-lomba-icon">🎟️</div>
          <div className="nettas-lomba-title" style={{ fontSize: 24, marginBottom: 12 }}>Daftar / Ambil Ticket</div>

          <p className="nettas-tl-desc" style={{ marginBottom: 24, fontSize: 15 }}>
            Pendaftaran akan dialihkan ke Google Form resmi panitia.
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc4Yc9kFiuH0pG_VQ5ipnQgghFvwGUNA-OSsIp058xqpgk5-A/viewform"
            target="_blank"
            rel="noreferrer"
            className="nettas-btn nettas-btn-primary nettas-btn-full"
            style={{ justifyContent: "center" }}
          >
            <Ticket size={18} /> DAFTAR / AMBIL TICKET
          </a>

          <div className="nettas-hint" style={{ marginTop: 20 }}>
            ⚠️ Pastikan data yang diisi sudah benar sebelum mengirim formulir.
          </div>
        </div>
      </SectionWrapper>

      {/* ============ 8. FOOTER ============ */}
      <footer className="nettas-footer" data-testid="nettas-footer">
        <div className="nettas-footer-logo">NETTAS</div>
        <div className="nettas-footer-sub">
          Bagian dari HIMAPRODI TRPL Kabinet Samudera 2026
        </div>
        <div className="nettas-socials">
          <a href="https://www.instagram.com/himatrpl.cwe" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="#" target="_blank" rel="noreferrer" aria-label="TikTok">
            <Music2 size={16} />
          </a>
          <a href="#" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={16} />
          </a>
        </div>
        <div className="nettas-footer-copy">© 2026 NETTAS · HIMAPRODI TRPL</div>
        <Link to="/" className="nettas-btn nettas-btn-ghost" data-testid="nettas-footer-home">
          <ArrowLeft size={16} /> Kembali ke Halaman Utama
        </Link>
      </footer>
    </div>
  );
}
