import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import api, { formatApiErrorDetail } from "@/lib/api";
import { Mail, Instagram, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Kontak() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErr("");
    try {
      await api.post("/kontak", form);
      setDone(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (ex) {
      setErr(formatApiErrorDetail(ex.response?.data?.detail) || ex.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="kontak-page">
      <PageHero
        eyebrow="Hubungi Kami"
        title="Kirim Pesan ke"
        highlight="Kabinet Samudera"
        description="Ide, kritik, kolaborasi, atau sekadar menyapa — kami membuka semua gelombang komunikasi."
      />

      <section className="max-w-6xl mx-auto px-5 lg:px-10 py-14 grid lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-2 space-y-4">
          {[
            { icon: Mail, label: "Email", value: "himaproditrpl@gmail.com", href: "mailto:himaproditrpl@gmail.com" },
            { icon: Instagram, label: "Instagram", value: "@himaproditrpl", href: "https://instagram.com/himaproditrpl" },
            { icon: MapPin, label: "Sekretariat", value: "Gedung TRPL, Kampus Politeknik" },
          ].map((it, i) => (
            <motion.a
              key={it.label}
              href={it.href || "#"}
              target={it.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 flex items-start gap-4 hover:shadow-glow-cyan transition group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/30 transition">
                <it.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 mb-1">
                  {it.label}
                </div>
                <div className="text-sand-300 text-sm">{it.value}</div>
              </div>
            </motion.a>
          ))}
        </aside>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass-strong rounded-3xl p-7 md:p-9 space-y-5"
          data-testid="kontak-form"
        >
          {done ? (
            <div className="text-center py-10" data-testid="kontak-success">
              <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse-glow" />
              <h3 className="headline text-2xl text-sand-300 mb-2">Pesan Terkirim</h3>
              <p className="text-sand-300/70 text-sm max-w-md mx-auto">
                Terima kasih! Tim Kabinet Samudera akan merespon pesanmu secepatnya.
              </p>
              <button
                onClick={() => setDone(false)}
                className="btn-ghost-ocean mt-6 !py-2 !px-5 text-sm"
              >
                Kirim pesan lagi
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nama" name="name" value={form.name} onChange={onChange} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
              </div>
              <Field label="Subjek" name="subject" value={form.subject} onChange={onChange} required />
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-1.5 block">
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  required
                  data-testid="kontak-message"
                  className="w-full glass rounded-xl px-4 py-3 text-sand-300 placeholder:text-sand-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>
              {err && <p className="text-red-400 text-sm">{err}</p>}
              <button
                type="submit"
                disabled={sending}
                className="btn-ocean w-full sm:w-auto justify-center"
                data-testid="kontak-submit"
              >
                <Send className="w-4 h-4" /> {sending ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </>
          )}
        </motion.form>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-1.5 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        data-testid={`kontak-${name}`}
        className="w-full glass rounded-xl px-4 py-3 text-sand-300 placeholder:text-sand-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      />
    </div>
  );
}
