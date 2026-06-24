import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Trash2, Mail, MailOpen } from "lucide-react";

export default function AdminPesan() {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get("/kontak");
      setList(data || []);
    } catch {
      /* ignore */
    }
  };
  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/kontak/${id}/read`);
    load();
  };
  const remove = async (id) => {
    if (!window.confirm("Hapus pesan ini?")) return;
    await api.delete(`/kontak/${id}`);
    load();
  };

  return (
    <div data-testid="admin-pesan-page">
      <h1 className="headline text-2xl md:text-3xl text-sand-300 mb-2">Pesan Kontak</h1>
      <p className="text-sand-300/60 text-sm mb-8">Pesan masuk dari halaman kontak.</p>

      <div className="space-y-3">
        {list.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-sand-300/50">
            Belum ada pesan masuk.
          </div>
        )}
        {list.map((m) => (
          <div
            key={m.id}
            className={`glass rounded-2xl p-5 ${
              !m.read ? "border-cyan-400/40" : ""
            }`}
            data-testid={`pesan-${m.id}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {m.read ? (
                    <MailOpen className="w-4 h-4 text-sand-300/50" />
                  ) : (
                    <Mail className="w-4 h-4 text-cyan-300" />
                  )}
                  <h3 className="headline text-base text-sand-300">{m.subject}</h3>
                </div>
                <div className="text-xs text-cyan-400/70 font-mono">
                  {m.name} · {m.email} ·{" "}
                  {new Date(m.created_at).toLocaleString("id-ID")}
                </div>
              </div>
              <div className="flex gap-2">
                {!m.read && (
                  <button
                    onClick={() => markRead(m.id)}
                    className="btn-ghost-ocean !py-1.5 !px-3 text-xs"
                  >
                    Tandai dibaca
                  </button>
                )}
                <button
                  onClick={() => remove(m.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sand-300/80 text-sm whitespace-pre-line border-t border-cyan-900/30 pt-3">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
