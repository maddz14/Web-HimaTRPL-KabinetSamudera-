import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Waves, Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user && user.role === "admin") return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const r = await login(email, password);
    setLoading(false);
    if (r.ok) navigate("/admin");
    else setErr(r.error || "Gagal masuk");
  };

  return (
    <div className="min-h-screen bg-abyss flex items-center justify-center relative overflow-hidden circuit-bg" data-testid="login-page">
      <div className="absolute inset-0 bg-ocean-gradient opacity-20" />
      <ParticleBackground density={50} />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md px-5"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-glass">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-11 h-11 rounded-full bg-ocean-gradient flex items-center justify-center shadow-glow-cyan">
              <Waves className="w-5 h-5 text-sand-300" />
            </div>
            <div>
              <div className="headline text-lg text-sand-300">Admin Login</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70">
                Kabinet Samudera
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4" data-testid="login-form">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="login-email"
                  className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sand-300 placeholder:text-sand-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="admin@kabinet.id"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="login-password"
                  className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sand-300 placeholder:text-sand-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {err && (
              <p className="text-red-400 text-sm" data-testid="login-error">
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-ocean w-full justify-center"
              data-testid="login-submit"
            >
              {loading ? "Memproses..." : "Masuk"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
