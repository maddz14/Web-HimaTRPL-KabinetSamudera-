import { useEffect, useState } from "react";
import api, { formatApiErrorDetail } from "@/lib/api";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

/** Generic admin CRUD page. Pass config to reuse. */
export function AdminCrud({
  title,
  endpoint,
  idField = "id",
  fields,
  columns,
  emptyNew,
  testIdPrefix,
}) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get(endpoint);
      setItems(data || []);
    } catch (e) {
      setErr(formatApiErrorDetail(e.response?.data?.detail));
    }
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  const startNew = () => setEditing({ ...emptyNew });
  const startEdit = (it) => setEditing({ ...it });
  const cancel = () => {
    setEditing(null);
    setErr("");
  };

  const save = async () => {
    setSaving(true);
    setErr("");
    try {
      // Build payload with only the configured fields (exclude server-managed)
      const payload = {};
      fields.forEach((f) => {
        let v = editing[f.name];
        if (f.type === "array") {
          if (typeof v === "string") v = v.split(",").map((s) => s.trim()).filter(Boolean);
          else if (!Array.isArray(v)) v = [];
        }
        if (f.type === "number") v = Number(v) || 0;
        payload[f.name] = v ?? f.default ?? "";
      });
      if (editing[idField]) {
        await api.put(`${endpoint}/${editing[idField]}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      await load();
      setEditing(null);
    } catch (e) {
      setErr(formatApiErrorDetail(e.response?.data?.detail) || e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (it) => {
    if (!window.confirm(`Hapus "${it[columns[0].key] || "item"}"?`)) return;
    try {
      await api.delete(`${endpoint}/${it[idField]}`);
      await load();
    } catch (e) {
      setErr(formatApiErrorDetail(e.response?.data?.detail));
    }
  };

  return (
    <div data-testid={`admin-${testIdPrefix}-page`}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="headline text-2xl md:text-3xl text-sand-300">{title}</h1>
          <p className="text-sand-300/60 text-sm mt-1">Kelola data {title.toLowerCase()}.</p>
        </div>
        <button
          onClick={startNew}
          className="btn-ocean !py-2 !px-4 text-sm"
          data-testid={`admin-${testIdPrefix}-new`}
        >
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {err && <div className="mb-4 text-red-400 text-sm glass rounded-xl px-4 py-3">{err}</div>}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-cyan-900/40 bg-cyan-500/5">
              <tr>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className="text-left px-4 py-3 font-mono uppercase text-[10px] tracking-widest text-cyan-400/80"
                  >
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-10 text-sand-300/50">
                    Belum ada data.
                  </td>
                </tr>
              )}
              {items.map((it) => (
                <tr key={it[idField]} className="border-b border-cyan-900/20 hover:bg-cyan-500/5">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-sand-300/85 align-top">
                      {c.render
                        ? c.render(it)
                        : typeof it[c.key] === "object"
                        ? JSON.stringify(it[c.key])
                        : String(it[c.key] ?? "—").slice(0, 80)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(it)}
                        className="p-1.5 rounded-lg text-cyan-300 hover:bg-cyan-500/10"
                        data-testid={`admin-${testIdPrefix}-edit-${it[idField]}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => remove(it)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                        data-testid={`admin-${testIdPrefix}-delete-${it[idField]}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 bg-abyss/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={cancel}
          data-testid={`admin-${testIdPrefix}-modal`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-5">
              <h2 className="headline text-xl text-sand-300">
                {editing[idField] ? "Edit" : "Tambah"} {title}
              </h2>
              <button onClick={cancel} className="p-1.5 text-sand-300/60 hover:text-sand-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <FieldInput
                  key={f.name}
                  field={f}
                  value={editing[f.name]}
                  onChange={(v) => setEditing((e) => ({ ...e, [f.name]: v }))}
                  testId={`admin-${testIdPrefix}-field-${f.name}`}
                />
              ))}
              {err && <p className="text-red-400 text-sm">{err}</p>}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={save}
                  disabled={saving}
                  className="btn-ocean flex-1 justify-center"
                  data-testid={`admin-${testIdPrefix}-save`}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button onClick={cancel} className="btn-ghost-ocean">
                  Batal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange, testId }) {
  const common =
    "w-full glass rounded-xl px-4 py-2.5 text-sand-300 placeholder:text-sand-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm";
  const displayVal = field.type === "array" && Array.isArray(value) ? value.join(", ") : value ?? "";
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 mb-1.5 block">
        {field.label}
        {field.hint && <span className="ml-1 text-sand-300/40 normal-case">· {field.hint}</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          data-testid={testId}
          rows={field.rows || 5}
          className={`${common} resize-none`}
          value={displayVal}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "select" ? (
        <select
          data-testid={testId}
          className={common}
          value={displayVal}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-deep">
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          data-testid={testId}
          type={field.type === "number" ? "number" : "text"}
          className={common}
          value={displayVal}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
