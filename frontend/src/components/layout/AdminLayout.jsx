import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Layers,
  Calendar,
  Image as ImageIcon,
  Mail,
  LogOut,
  Waves,
  Home as HomeIcon,
  GraduationCap,
} from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/berita", label: "Berita", icon: Newspaper },
  { to: "/admin/departemen", label: "Departemen", icon: Layers },
  { to: "/admin/anggota", label: "Anggota", icon: Users },
  { to: "/admin/dosen", label: "Dosen", icon: GraduationCap },
  { to: "/admin/program-kerja", label: "Program Kerja", icon: Calendar },
  { to: "/admin/galeri", label: "Galeri", icon: ImageIcon },
  { to: "/admin/pesan", label: "Pesan Kontak", icon: Mail },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-abyss text-sand-300 flex" data-testid="admin-layout">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-cyan-900/40 glass-strong p-5 fixed inset-y-0 left-0">
        <Link to="/admin" className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-full bg-ocean-gradient flex items-center justify-center shadow-glow-cyan">
            <Waves className="w-5 h-5 text-sand-300" />
          </div>
          <div className="leading-tight">
            <div className="headline text-base text-sand-300">Samudera</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">
              Admin Panel
            </div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              data-testid={`admin-nav-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 shadow-glow-cyan"
                    : "text-sand-300/70 hover:bg-cyan-500/5 hover:text-cyan-300"
                }`
              }
            >
              <it.icon className="w-4 h-4" /> {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-cyan-900/40 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs">
            <div className="text-sand-300/90 font-medium truncate">{user?.email}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/60">
              {user?.role}
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-sand-300/70 hover:bg-cyan-500/5 hover:text-cyan-300 transition"
          >
            <HomeIcon className="w-4 h-4" /> Lihat Situs
          </Link>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 glass-strong border-b border-cyan-900/40 px-4 h-14 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-300" />
          <span className="headline text-sm">Samudera Admin</span>
        </Link>
        <button onClick={handleLogout} className="text-red-400" aria-label="Logout">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 lg:pl-64 pt-14 lg:pt-0 min-w-0">
        <div className="lg:hidden overflow-x-auto border-b border-cyan-900/40">
          <nav className="flex gap-1 p-2 min-w-max">
            {NAV.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-sand-300/60"
                  }`
                }
              >
                <it.icon className="w-3.5 h-3.5" /> {it.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-5 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
