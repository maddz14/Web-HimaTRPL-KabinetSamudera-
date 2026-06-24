import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { type: "link", to: "/", label: "Home", end: true },
  {
    type: "dropdown",
    label: "Tentang Kami",
    items: [
      { to: "/sejarah", label: "Sejarah" },
      { to: "/logo", label: "Logo" },
      { to: "/visi-misi", label: "Visi & Misi" },
      { to: "/dosen", label: "Dosen" },
      { to: "/struktur", label: "Struktur Organisasi" },
      { to: "/galeri", label: "Galeri HIMAPRODI TRPL" },
      { to: "/kontak", label: "Kontak Kami" },
    ],
  },
  {
    type: "dropdown",
    label: "Agenda",
    items: [{ to: "/awards", label: "HIMAPRODI Awards" }],
  },
  {
    type: "dropdown",
    label: "Events",
    items: [
      { to: "/nettas", label: "NETTAS" },
      { to: "/seminar-workshop", label: "Seminar & Workshop" },
      { to: "/bootcamp", label: "Bootcamp" },
      { to: "/diesnatalis", label: "Diesnatalis" },
    ],
  },
  {
    type: "dropdown",
    label: "Aplikasi Publik",
    items: [
      { to: "/berita", label: "Blog / Artikel / Berita" },
      { to: "/kalender", label: "Kalender Kegiatan" },
      { to: "/info-lomba", label: "Info Lomba" },
      { to: "/project", label: "Project" },
    ],
  },
  { type: "link", to: "/komunitas", label: "Komunitas" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 inset-x-0 z-50 glass-strong border-b border-cyan-900/40"
      data-testid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-[72px] gap-4">
        {/* 3 logos */}
        <Link to="/" className="flex items-center gap-2 shrink-0" data-testid="navbar-logo">
          <img src="/assets/logo-cwe.png" alt="Politeknik CWE" className="h-9 w-9 lg:h-10 lg:w-10 object-contain" />
          <img src="/assets/hima-prodi.png" alt="Himaprodi TRPL" className="h-9 w-9 lg:h-10 lg:w-10 object-contain rounded" />
          <img src="/assets/logo-samudera.png" alt="Kabinet Samudera" className="h-9 w-9 lg:h-10 lg:w-10 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1 mx-auto" ref={dropdownRef}>
          {NAV.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenMenu((m) => (m === item.label ? null : item.label))}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}-btn`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition ${openMenu === item.label
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "text-sand-300/80 hover:text-cyan-300 hover:bg-cyan-500/5"
                    }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition ${openMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full mt-2 left-0 w-60 glass-strong rounded-xl p-1.5 border border-cyan-900/40 shadow-xl"
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}-menu`}
                    >
                      {item.items.map((si) => (
                        <Link
                          key={si.to}
                          to={si.to}
                          onClick={() => setOpenMenu(null)}
                          className="block px-3.5 py-2 rounded-lg text-sm text-sand-300/80 hover:bg-cyan-500/10 hover:text-cyan-300 transition"
                          data-testid={`nav-link-${si.to.replace(/\//g, "")}`}
                        >
                          {si.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-sm font-medium transition ${isActive
                    ? "bg-cyan-500/15 text-cyan-300 shadow-glow-cyan"
                    : "text-sand-300/80 hover:text-cyan-300 hover:bg-cyan-500/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {user && user.role === "admin" ? (
            <>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm text-sand-300/80 hover:text-cyan-300"
                data-testid="navbar-admin-link"
              >
                <LayoutDashboard className="w-4 h-4" /> Admin
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-sand-300/70 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                data-testid="navbar-logout-btn"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-sand-300/80 hover:text-cyan-300 transition"
              data-testid="navbar-login-btn"
            >
              <UserIcon className="w-4 h-4" /> Login
            </Link>
          )}
          <Link
            to="/kontak"
            className="btn-ocean !py-2 !px-4 text-sm"
            data-testid="navbar-getintouch-btn"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="xl:hidden p-2 rounded-lg text-sand-300"
          data-testid="navbar-mobile-toggle"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden glass-strong border-t border-cyan-900/40 max-h-[80vh] overflow-y-auto"
            data-testid="navbar-mobile-menu"
          >
            <nav className="flex flex-col p-4 gap-1 max-w-7xl mx-auto">
              {NAV.map((item) =>
                item.type === "link" ? (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-medium transition ${isActive ? "bg-cyan-500/15 text-cyan-300" : "text-sand-300/80 hover:bg-cyan-500/5"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <div key={item.label}>
                    <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">
                      {item.label}
                    </div>
                    {item.items.map((si) => (
                      <NavLink
                        key={si.to}
                        to={si.to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `px-6 py-2 rounded-lg text-sm transition block ${isActive ? "bg-cyan-500/15 text-cyan-300" : "text-sand-300/70 hover:bg-cyan-500/5"
                          }`
                        }
                      >
                        · {si.label}
                      </NavLink>
                    ))}
                  </div>
                ),
              )}
              <div className="border-t border-cyan-900/40 mt-2 pt-3 flex gap-2">
                {user && user.role === "admin" ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost-ocean flex-1 justify-center !py-2 text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Admin
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost-ocean flex-1 justify-center !py-2 text-sm"
                  >
                    <UserIcon className="w-4 h-4" /> Login
                  </Link>
                )}
                <Link
                  to="/kontak"
                  onClick={() => setMobileOpen(false)}
                  className="btn-ocean flex-1 justify-center !py-2 text-sm"
                >
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
