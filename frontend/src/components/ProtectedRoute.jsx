import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children, adminOnly = true }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-abyss" data-testid="auth-loading">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
          <p className="text-cyan-300/70 font-mono text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
