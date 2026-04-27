"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Pencil,
  Trash2,
  Eye,
  Download,
  ChevronDown,
  Database,
  TrendingUp,
  Calendar,
  CheckCircle2,
  HardDriveUpload,
  Plug,
} from "lucide-react";
import clsx from "clsx";
import {
  MOCK_ITEMS,
  MOCK_CONNECTORS,
  CATEGORIES,
  type Category,
  type DocType,
  type KnowledgeItem,
  type Connector,
} from "@/lib/mockData";
import { TypeBadge, ClassificationBadge } from "@/components/TypeBadge";
import { UploadModal } from "@/components/UploadModal";
import { ConnectorPanel } from "@/components/ConnectorPanel";
import { AddConnectorModal } from "@/components/AddConnectorModal";
import { SyncConfigModal } from "@/components/SyncConfigModal";

const TYPES: { value: DocType | "all"; label: string }[] = [
  { value: "all", label: "ทุกประเภท" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "DOC" },
  { value: "video", label: "วิดีโอ" },
  { value: "audio", label: "เสียง" },
  { value: "image", label: "ภาพ" },
  { value: "slide", label: "สไลด์" },
];

export default function KnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>(MOCK_ITEMS);
  const [connectors, setConnectors] = useState<Connector[]>(MOCK_CONNECTORS);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<DocType | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploadOpen, setUploadOpen] = useState(false);
  const [connectorOpen, setConnectorOpen] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);
  const [syncConfigOpen, setSyncConfigOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (search && !`${it.title} ${it.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (type !== "all" && it.type !== type) return false;
      if (category !== "all" && it.category !== category) return false;
      return true;
    });
  }, [items, search, type, category]);

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((i) => i.id)));
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function deleteOne(id: string) {
    setItems(items.filter((i) => i.id !== id));
    setSelected((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
    showToast("ลบเอกสารแล้ว");
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  const stats = useMemo(() => {
    const total = items.length;
    const totalSize = items.reduce(
      (sum, i) => sum + parseFloat(i.size),
      0
    );
    return { total, totalSize: totalSize.toFixed(1) };
  }, [items]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy-400">
            <Database className="h-3.5 w-3.5" />
            Knowledge Management
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">
            คลังข้อมูลและองค์ความรู้
          </h1>
          <p className="mt-1 text-sm text-navy-500">
            อัปโหลด จัดการ และตรวจสอบเอกสารทั้งหมดที่ให้ AI ค้นได้
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" />
            อัปโหลดเอกสารใหม่
          </button>
          <button
            onClick={() => setShowConnectors((v) => !v)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-soft transition",
              showConnectors
                ? "border-navy-700 bg-navy-50 text-navy-900"
                : "border-navy-200 bg-white text-navy-700 hover:bg-navy-50"
            )}
          >
            <Plug className="h-4 w-4" />
            เชื่อมต่อแหล่งข้อมูล
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              {connectors.length}
            </span>
          </button>
        </div>
      </header>

      {showConnectors && (
        <ConnectorPanel
          connectors={connectors}
          onClose={() => setShowConnectors(false)}
          onAddClick={() => setConnectorOpen(true)}
          onConfigClick={() => setSyncConfigOpen(true)}
        onSyncNow={(id) => {
          setConnectors((cs) =>
            cs.map((c) => (c.id === id ? { ...c, status: "syncing" } : c))
          );
          setTimeout(() => {
            setConnectors((cs) =>
              cs.map((c) =>
                c.id === id
                  ? { ...c, status: "active", lastSync: new Date().toISOString() }
                  : c
              )
            );
            showToast("ซิงก์ข้อมูลเรียบร้อย");
          }, 2000);
        }}
        onRemove={(id) => {
          setConnectors((cs) => cs.filter((c) => c.id !== id));
          showToast("ลบ connector แล้ว");
        }}
        />
      )}

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Database}
          label="เอกสารทั้งหมด"
          value={stats.total.toLocaleString()}
          unit="รายการ"
          tone="navy"
        />
        <StatCard
          icon={HardDriveUpload}
          label="พื้นที่ใช้งาน"
          value={`${stats.totalSize}`}
          unit="MB"
          tone="navy"
        />
        <StatCard
          icon={CheckCircle2}
          label="Index แล้ว"
          value="100"
          unit="%"
          tone="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label="ค้นหาเดือนนี้"
          value="48,210"
          unit="ครั้ง"
          tone="gold"
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-3 border-b border-navy-100 px-5 py-3.5">
          <div className="ring-focus flex min-w-[260px] flex-1 items-center gap-2 rounded-xl border border-navy-100 bg-navy-50/40 px-3.5 py-2 transition focus-within:border-navy-400 focus-within:bg-white">
            <Search className="h-4 w-4 text-navy-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาตามชื่อหรือแท็ก..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-navy-300"
            />
          </div>

          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as DocType | "all")}
              className="ring-focus appearance-none rounded-xl border border-navy-100 bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-navy-700"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | "all")}
              className="ring-focus appearance-none rounded-xl border border-navy-100 bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-navy-700"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          </div>

          <button className="inline-flex items-center gap-1.5 rounded-xl border border-navy-100 bg-white px-3.5 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50">
            <Filter className="h-4 w-4" />
            ตัวกรองเพิ่มเติม
          </button>

          {selected.size > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-navy-200 bg-navy-50 px-3 py-1.5 text-sm">
              <span className="font-medium text-navy-800">
                เลือก {selected.size} รายการ
              </span>
              <button
                onClick={() => {
                  setItems(items.filter((i) => !selected.has(i.id)));
                  setSelected(new Set());
                  showToast(`ลบ ${selected.size} เอกสารแล้ว`);
                }}
                className="text-rose-600 hover:text-rose-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50/40 text-left text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                <th className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-navy-300 text-navy-700"
                  />
                </th>
                <th className="py-3 pr-3">เอกสาร</th>
                <th className="py-3 pr-3">หมวดหมู่</th>
                <th className="py-3 pr-3">ชั้นความลับ</th>
                <th className="py-3 pr-3">เจ้าของ</th>
                <th className="py-3 pr-3">อัปเดต</th>
                <th className="py-3 pr-3">เปิดดู</th>
                <th className="px-5 py-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr
                  key={it.id}
                  className={clsx(
                    "border-b border-navy-50 transition hover:bg-navy-50/30",
                    selected.has(it.id) && "bg-navy-50/60"
                  )}
                >
                  <td className="px-5 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.has(it.id)}
                      onChange={() => toggleOne(it.id)}
                      className="h-4 w-4 rounded border-navy-300 text-navy-700"
                    />
                  </td>
                  <td className="py-3.5 pr-3">
                    <div className="flex items-start gap-2.5">
                      <TypeBadge type={it.type} />
                      <div className="min-w-0">
                        <div className="line-clamp-1 font-medium text-navy-900">
                          {it.title}
                        </div>
                        <div className="mt-0.5 line-clamp-1 text-xs text-navy-400">
                          {it.tags.map((t) => `#${t}`).join(" ")} · {it.size}
                          {it.pages && ` · ${it.pages} หน้า`}
                          {it.duration && ` · ${it.duration}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3">
                    <span className="rounded-md border border-navy-100 bg-navy-50/50 px-2 py-0.5 text-xs font-medium text-navy-600">
                      {it.category}
                    </span>
                  </td>
                  <td className="py-3.5 pr-3">
                    <ClassificationBadge level={it.classification} />
                  </td>
                  <td className="py-3.5 pr-3 text-xs text-navy-600">{it.source}</td>
                  <td className="py-3.5 pr-3 text-xs text-navy-500">
                    <div className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(it.updatedAt).toLocaleDateString("th-TH", {
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-xs text-navy-500">
                    {it.views.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <ActionBtn icon={Eye} title="ดู" />
                      <ActionBtn icon={Download} title="ดาวน์โหลด" />
                      <ActionBtn icon={Pencil} title="แก้ไข" />
                      <ActionBtn
                        icon={Trash2}
                        title="ลบ"
                        danger
                        onClick={() => deleteOne(it.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-sm text-navy-400">
                    ไม่พบเอกสารที่ตรงกับเงื่อนไข
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/30 px-5 py-3 text-xs text-navy-500">
          <div>
            แสดง {filtered.length} จาก {items.length} รายการ
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-md border border-navy-100 bg-white px-2.5 py-1 hover:bg-navy-50 disabled:opacity-40" disabled>
              ก่อนหน้า
            </button>
            <button className="rounded-md border border-navy-200 bg-navy-900 px-2.5 py-1 text-white">
              1
            </button>
            <button className="rounded-md border border-navy-100 bg-white px-2.5 py-1 hover:bg-navy-50">
              2
            </button>
            <button className="rounded-md border border-navy-100 bg-white px-2.5 py-1 hover:bg-navy-50">
              ถัดไป
            </button>
          </div>
        </div>
      </section>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(data) => {
          const newItem: KnowledgeItem = {
            id: `k${Date.now()}`,
            title: data.title,
            excerpt: "เอกสารใหม่ที่เพิ่งเพิ่มเข้าระบบ — ระบบกำลังประมวลผล...",
            type: "pdf",
            category: data.category,
            tags: data.tags,
            updatedAt: new Date().toISOString().slice(0, 10),
            size: "2.4 MB",
            source: "อัปโหลดโดยผู้ใช้",
            pages: 12,
            classification: "ภายใน",
            views: 0,
            relevance: 0.5,
          };
          setItems([newItem, ...items]);
          showToast("เพิ่มเอกสารเข้าคลังเรียบร้อย");
        }}
      />

      <AddConnectorModal
        open={connectorOpen}
        onClose={() => setConnectorOpen(false)}
        onAdd={(c) => {
          setConnectors([c, ...connectors]);
          showToast(`เชื่อม ${c.name} สำเร็จ — เริ่ม sync แล้ว`);
        }}
      />

      <SyncConfigModal
        open={syncConfigOpen}
        onClose={() => setSyncConfigOpen(false)}
        connectors={connectors}
        onUpdate={(id, patch) => {
          setConnectors((cs) =>
            cs.map((c) => (c.id === id ? { ...c, ...patch } : c))
          );
        }}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-fade-in">
          <div className="flex items-center gap-2 rounded-full border border-navy-200 bg-navy-900 px-4 py-2.5 text-sm text-white shadow-2xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  tone,
}: {
  icon: typeof Database;
  label: string;
  value: string;
  unit: string;
  tone: "navy" | "emerald" | "gold";
}) {
  const tones = {
    navy: "bg-navy-50 text-navy-700",
    emerald: "bg-emerald-50 text-emerald-700",
    gold: "bg-gold-50 text-gold-700",
  };
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-navy-500">{label}</span>
        <div className={clsx("flex h-8 w-8 items-center justify-center rounded-lg", tones[tone])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-navy-900">{value}</span>
        <span className="text-xs text-navy-400">{unit}</span>
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  title,
  danger,
  onClick,
}: {
  icon: typeof Eye;
  title: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        "flex h-7 w-7 items-center justify-center rounded-lg transition",
        danger
          ? "text-navy-400 hover:bg-rose-50 hover:text-rose-600"
          : "text-navy-400 hover:bg-navy-100 hover:text-navy-800"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
