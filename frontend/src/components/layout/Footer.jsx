import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Twitter, Youtube, Linkedin } from "lucide-react";

const COLS = [
  {
    title: "Tentang Kami",
    links: [
      { to: "/sejarah", label: "Sejarah" },
      { to: "/logo", label: "Logo & Filosofi" },
      { to: "/visi-misi", label: "Visi & Misi" },
      { to: "/struktur", label: "Struktur Organisasi" },
      { to: "/galeri", label: "Galeri" },
      { to: "/kontak", label: "Kontak Kami" },
    ],
  },
  {
    title: "Events",
    links: [
      { to: "/nettas", label: "NETTAS" },
      { to: "/seminar-workshop", label: "Seminar & Workshop" },
      { to: "/bootcamp", label: "Bootcamp" },
      { to: "/diesnatalis", label: "Diesnatalis" },
      { to: "/awards", label: "HIMAPRODI Awards" },
    ],
  },
  {
    title: "Aplikasi Publik",
    links: [
      { to: "/berita", label: "Blog & Artikel" },
      { to: "/kalender", label: "Kalender Kegiatan" },
      { to: "/info-lomba", label: "Info Lomba" },
      { to: "/project", label: "Project" },
      { to: "/komunitas", label: "Komunitas" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative mt-20 border-t border-cyan-900/40 bg-abyss grain"
      data-testid="footer"
    >
      <div className="absolute inset-0 circuit-bg opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Branding + Media */}
        <div data-testid="footer-col-media">
          <div className="flex items-center gap-2 mb-4">
            <img src="/assets/logo-cwe.png" alt="Politeknik CWE" className="h-10 w-10 object-contain" />
            <img src="/assets/hima-prodi.png" alt="HIMAPRODI TRPL" className="h-10 w-10 object-contain rounded" />
            <img src="/assets/logo-samudera.png" alt="Kabinet Samudera" className="h-10 w-10 object-contain" />
          </div>
          <div className="headline text-lg text-sand-300 mb-1">HIMAPRODI TRPL</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 mb-4">
            Kabinet Samudera · 2025/2026
          </div>
          <p className="text-sand-300/60 text-sm leading-relaxed mb-5">
            Himpunan Mahasiswa Prodi Teknologi Rekayasa Perangkat Lunak Politeknik Kelapa Sawit Citra
            Widya Edukasi.
          </p>
          <h4 className="font-mono uppercase text-[10px] tracking-widest text-cyan-400/70 mb-3">
            Media Sosial
          </h4>
          <div className="flex gap-2">
            {[
              { icon: Instagram, href: "https://instagram.com/himaproditrpl", label: "Instagram" },
              { icon: Youtube, href: "#", label: "YouTube" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Cols 2-4: Link groups */}
        {COLS.map((col) => (
          <div key={col.title} data-testid={`footer-col-${col.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <h4 className="font-mono uppercase text-xs tracking-widest text-cyan-400/70 mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sand-300/70 hover:text-cyan-300 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {col.title === "Tentang Kami" && (
              <ul className="mt-6 space-y-2.5 text-sm text-sand-300/70">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                  <a href="mailto:himaproditrpl@gmail.com" className="hover:text-cyan-300">
                    himaproditrpl@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                  <span className="leading-snug">Politeknik Kelapa Sawit Citra Widya Edukasi</span>
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="relative border-t border-cyan-900/30 py-5 text-center text-xs font-mono text-sand-300/40">
        © {new Date().getFullYear()} HIMAPRODI TRPL · Kabinet Samudera · Berlayar Bersama, Menuju Inovasi
      </div>
    </footer>
  );
}
