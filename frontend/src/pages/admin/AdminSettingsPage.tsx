import { useEffect, useState } from "react";
import { AdminPageHeader } from "../../components/admin/AdminTable";

const STORAGE_KEY = "app_settings";

type Settings = {
  email?: string;
  phone?: string;
  name?: string;
  brand?: string;
  canonical_url?: string;
};

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      // ignore
    }
  }

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Settings" description="Application preferences prepared for backend persistence." />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <label className="block">
            <span className="font-semibold text-white">Site name</span>
            <input value={settings.name ?? ""} onChange={(e) => update("name", e.target.value)} placeholder="Site name" className="mt-2 w-full rounded-md border border-white/10 bg-transparent p-2 text-sm" />
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <label className="block">
            <span className="font-semibold text-white">Brand</span>
            <input value={settings.brand ?? ""} onChange={(e) => update("brand", e.target.value)} placeholder="Brand (e.g. MOSES DEV)" className="mt-2 w-full rounded-md border border-white/10 bg-transparent p-2 text-sm" />
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <label className="block">
            <span className="font-semibold text-white">Contact email</span>
            <input value={settings.email ?? ""} onChange={(e) => update("email", e.target.value)} placeholder="contact@example.com" className="mt-2 w-full rounded-md border border-white/10 bg-transparent p-2 text-sm" />
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <label className="block">
            <span className="font-semibold text-white">Contact phone</span>
            <input value={settings.phone ?? ""} onChange={(e) => update("phone", e.target.value)} placeholder="+233 24 000 0000" className="mt-2 w-full rounded-md border border-white/10 bg-transparent p-2 text-sm" />
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5 md:col-span-2">
          <label className="block">
            <span className="font-semibold text-white">Canonical URL</span>
            <input value={settings.canonical_url ?? ""} onChange={(e) => update("canonical_url", e.target.value)} placeholder="https://example.com" className="mt-2 w-full rounded-md border border-white/10 bg-transparent p-2 text-sm" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={handleSave} className="rounded-md bg-violet-500 px-4 py-2 font-semibold text-white">Save Settings</button>
        {saved ? <span className="text-sm text-emerald-400">Saved</span> : <span className="text-sm text-slate-400">Changes are saved to local dev storage</span>}
      </div>
    </section>
  );
}
