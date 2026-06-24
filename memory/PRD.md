# Kabinet Samudera — HIMAPRODI TRPL

## Original Problem Statement
Website HIMAPRODI TRPL (Kabinet Samudera) dengan nav HIMTIKA-style + event NETTAS sebagai one-page scroll futuristik. Theme utama: Digital Ocean (navy/cyan/sand); NETTAS: override tema navy+ungu futuristik.

- **Admin credentials**: see `/app/memory/test_credentials.md`

## Architecture
```
backend/
├── server.py, auth.py, models.py, seed_data.py

frontend/src/
├── App.js
├── context/AuthContext.jsx
├── lib/api.js
├── components/
│   ├── ProtectedRoute.jsx
│   ├── layout/ (Navbar, Footer, PublicLayout, AdminLayout, PageHero, InfoPage)
│   ├── effects/ (ParticleBackground, WaveDivider, TypingText, TopMarquee,
│   │             HeroCarousel, CountUp, FaqAccordion)
│   └── admin/AdminCrud.jsx
└── pages/
    Public:
    ├── Home (hero carousel + counters + FAQ + 4-col footer integration)
    ├── Nettas.jsx + Nettas.css  ← ONE-PAGE SCROLL (8 sub-sections)
    ├── Profil, VisiMisi, Struktur, Departemen, Galeri, Kontak, Login
    ├── Sejarah, Logo, Awards
    ├── SeminarWorkshop, Bootcamp, Diesnatalis
    ├── Berita, BeritaDetail, Kalender, InfoLomba, Project
    ├── Komunitas, LabRiset, OpenRecruitment, Dosen
    Admin:
    └── Dashboard, AdminBerita, AdminDepartemen, AdminAnggota,
        AdminProgramKerja, AdminGaleri, AdminPesan
```

## Navigation (HIMTIKA-style)
Home · Tentang Kami ▾(6) · Agenda ▾(1) · Events ▾(4, incl. NETTAS) · Aplikasi Publik ▾(4) · Komunitas · Login · Get in Touch

## NETTAS One-Page Scroll (/nettas)
Tema override: navy `#050510` + ungu `#6c00ff` + cyan `#00d4ff`. Fonts: Orbitron (heading) + Space Grotesk (body). Scoped CSS (`.nettas-scope` + `nettas-*` classes).

### 8 Sub-sections (with sticky sub-navbar + floating back button)
1. **Hero** — mesh gradient bergerak, 100 particle stars, heading NETTAS glitch, live countdown ke 15 Aug 2026, 2 CTA (Daftar Events / Daftar Lomba Essay)
2. **About** — 3 stat card counter animated (500+ peserta, 10+ institusi, 20+ sponsor)
3. **Timeline** — 5 item zig-zag dengan icon, tanggal, badge status
4. **Lomba Essay** — 1 card besar dengan tema Indonesia Emas 2045, 5 subtema, 4 syarat, CTA
5. **Speakers** — 3 card TBA dengan avatar gradient + badge
6. **Hadiah** — total Rp 5.000.000+ + 4 podium (Juara 1/2/3 + Best Paper)
7. **Sponsor** — 2 marquee track (sponsor kiri→kanan, partner kanan→kiri)
8. **Daftar** — 2 card dual CTA (Events ungu / Lomba cyan)
9. **Footer NETTAS** — logo gradient + 3 sosmed + copyright + tombol kembali

### Animasi
- Mesh gradient `meshMove 15s`
- Glitch heading `glitch 4s`
- Star float random 3-8s
- Countdown `setInterval 1000ms`
- Counter up via IntersectionObserver
- Fade-in on scroll (`.nettas-section.is-visible`)
- Marquee infinite 30s

### Sub-navbar + Floating Back
- Sub-navbar sticky di bawah main navbar (top: 72px)
- 6 link: Tentang / Timeline / Lomba Essay / Speakers / Hadiah / Daftar
- Active state auto berpindah via IntersectionObserver rootMargin `-30% 0px -60% 0px`
- Floating back button (pojok kiri bawah) muncul setelah keluar hero, klik → `/`

## Key API Endpoints
- **Auth**: `POST /api/auth/login` `/logout` `/me` (httpOnly cookies)
- **Public**: `/api/site-info` `/berita` `/departemen` `/anggota` `/program-kerja` `/galeri` `POST /kontak`
- **Admin**: full CRUD + `GET /admin/stats`

## Completed
### MVP (Feb 2026)
Backend FastAPI + MongoDB + JWT + admin seed + dummy data. 21/21 backend pytest pass.

### Repo-Sync + HIMTIKA-Style Restructure (Feb 2026)
- 3 logos + photos from `maddz14/web-hima-trpl`
- Full nav redesign, hero carousel, counters, FAQ, 4-col footer
- 9 new pages. 50/50 frontend assertions pass.

### NETTAS One-Page Scroll (Feb 2026 — latest)
- Scoped futuristic theme (Orbitron + Space Grotesk, purple+cyan+navy)
- 8 sub-sections end-to-end
- Sticky sub-navbar with auto active-state on scroll
- Floating back-to-home button
- Live countdown, glitch heading, mesh gradient, 100 particle stars
- **Testing: 42/42 frontend assertions pass (iteration_3), zero bugs**

## Known / Deferred
- (P1) Registration CTAs (Daftar Events / Daftar Lomba) still use `href="#"` placeholders — replace with Google Form / Eventbrite URLs when available.
- (P2) Speakers TBA (expected per spec).
- (P3) Footer TikTok/YouTube `href="#"` — add real URLs when published.
- (P3) `/api/auth/me` 401 console noise on public pages (cosmetic).

## Future / Backlog
- Object storage for image uploads (P1)
- Upload real speaker photos to replace avatar gradient
- Real sponsor logos to replace placeholder pills
- Password reset UI
- Rich-text editor for Berita

## Credentials
See `/app/memory/test_credentials.md`.
