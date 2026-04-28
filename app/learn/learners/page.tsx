"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Trophy,
  Award,
  AlertCircle,
  ChevronRight,
  Filter,
  Download,
  Sparkles,
  Flame,
} from "lucide-react";
import clsx from "clsx";
import { LEARNERS, INMATE_COURSES, PRISONS, type Learner } from "@/lib/lmsData";

type StatusFilter = "all" | "active" | "inactive" | "top";

export default function LearnersAdminPage() {
  const [query, setQuery] = useState("");
  const [prison, setPrison] = useState<string>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    let items = [...LEARNERS];
    if (prison !== "all") items = items.filter((l) => l.prison === prison);
    if (status === "active") items = items.filter((l) => l.status === "active");
    if (status === "inactive") items = items.filter((l) => l.status === "inactive");
    if (status === "top") {
      items = items.sort((a, b) => b.parolePoints - a.parolePoints).slice(0, 10);
    }
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.prisonNumber.toLowerCase().includes(q) ||
          l.prison.toLowerCase().includes(q)
      );
    }
    return items;
  }, [query, prison, status]);

  const summary = {
    total: LEARNERS.length,
    active: LEARNERS.filter((l) => l.status === "active").length,
    inactive: LEARNERS.filter((l) => l.status === "inactive").length,
    topXp: 10,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">ผู้เรียน</h1>
          <div className="text-sm text-navy-500">
            จัดการผู้เรียน ติดตามความคืบหน้าการเรียนและทักษะ
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50">
          <Download className="h-4 w-4" />
          ส่งออก Excel
        </button>
      </div>

      {/* Status filter pills */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatusCard
          label="ทั้งหมด"
          value={summary.total}
          icon={Users}
          active={status === "all"}
          onClick={() => setStatus("all")}
        />
        <StatusCard
          label="กำลังเรียน Active"
          value={summary.active}
          icon={Sparkles}
          color="emerald"
          active={status === "active"}
          onClick={() => setStatus("active")}
        />
        <StatusCard
          label="ไม่เข้าเรียนนาน"
          value={summary.inactive}
          icon={AlertCircle}
          color="rose"
          active={status === "inactive"}
          onClick={() => setStatus("inactive")}
        />
        <StatusCard
          label="Top XP ผู้เรียน"
          value={summary.topXp}
          icon={Trophy}
          color="gold"
          active={status === "top"}
          onClick={() => setStatus("top")}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="ring-focus flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 shadow-soft lg:w-96">
          <Search className="h-4 w-4 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาด้วยชื่อ / เลขประจำตัว / เรือนจำ..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-navy-500">
            <Filter className="h-3 w-3" />
            เรือนจำ:
          </span>
          <select
            value={prison}
            onChange={(e) => setPrison(e.target.value)}
            className="rounded-full border border-navy-200 bg-white px-3 py-1 text-xs font-medium text-navy-700 outline-none hover:border-navy-400"
          >
            <option value="all">ทั้งหมด</option>
            {PRISONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-navy-50/60 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
            <tr className="text-left">
              <th className="px-4 py-3">ผู้เรียน</th>
              <th className="px-4 py-3">เรือนจำ · แดน</th>
              <th className="px-4 py-3 text-center">คอร์ส</th>
              <th className="px-4 py-3 text-center">วุฒิบัตร</th>
              <th className="px-4 py-3">XP / Level</th>
              <th className="px-4 py-3 text-center">เวลาเรียน</th>
              <th className="px-4 py-3">Active ล่าสุด</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {filtered.map((l) => (
              <LearnerRow key={l.id} learner={l} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-navy-500">
                  ไม่พบผู้เรียนตามเงื่อนไขที่ค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusCard({
  label,
  value,
  icon: Icon,
  color = "navy",
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  color?: "navy" | "emerald" | "rose" | "gold";
  active?: boolean;
  onClick?: () => void;
}) {
  const colorMap = {
    navy: { bg: "from-navy-700 to-navy-900", ring: "border-navy-300", text: "text-navy-700" },
    emerald: { bg: "from-emerald-500 to-teal-600", ring: "border-emerald-300", text: "text-emerald-700" },
    rose: { bg: "from-rose-500 to-pink-600", ring: "border-rose-300", text: "text-rose-700" },
    gold: { bg: "from-gold-500 to-amber-600", ring: "border-gold-300", text: "text-gold-700" },
  } as const;
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition hover:shadow-md",
        active ? c.ring : "border-navy-100"
      )}
    >
      <div className={clsx("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white", c.bg)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-2xl font-bold text-navy-900">{value}</div>
        <div className={clsx("text-[11px] font-medium", c.text)}>{label}</div>
      </div>
    </button>
  );
}

function levelFromXp(xp: number) {
  if (xp >= 500) return { level: 5, name: "เซียน" };
  if (xp >= 300) return { level: 4, name: "ขั้นสูง" };
  if (xp >= 150) return { level: 3, name: "ก้าวหน้า" };
  if (xp >= 50) return { level: 2, name: "เริ่มมีฝีมือ" };
  return { level: 1, name: "เริ่มต้น" };
}

function LearnerRow({ learner }: { learner: Learner }) {
  const completedCourses = learner.enrollments.filter((e) => e.status === "completed").length;
  const inProgressCourses = learner.enrollments.filter((e) => e.status === "in_progress").length;
  const lvl = levelFromXp(learner.parolePoints);
  const lastActive = new Date(learner.lastActiveAt);
  const daysAgo = Math.floor((Date.now() - lastActive.getTime()) / 86400000);

  // estimate learning hours from enrollments
  const learnedMin = learner.enrollments.reduce((s, e) => {
    const c = INMATE_COURSES.find((cc) => cc.id === e.courseId);
    if (!c) return s;
    return s + (c.totalMinutes * e.progress) / 100;
  }, 0);

  return (
    <tr className="hover:bg-navy-50/30">
      <td className="px-4 py-3">
        <Link
          href={`/learn/learners/${learner.id}`}
          className="flex items-center gap-3 hover:text-navy-700"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 text-xs font-bold text-white">
            {learner.name.split(" ").pop()?.[0] ?? "?"}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-navy-900">{learner.name}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-navy-500">
              <span className="font-mono">{learner.prisonNumber}</span>
              <span>·</span>
              <span>{learner.age} ปี</span>
              {learner.flags?.includes("ไม่เข้าเรียนนาน") && (
                <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
                  ไม่ active
                </span>
              )}
            </div>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3">
        <div className="text-xs font-medium text-navy-700">{learner.prison}</div>
        <div className="text-[10px] text-navy-500">{learner.block}</div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="text-xs">
          <span className="font-semibold text-emerald-700">{completedCourses}</span>
          <span className="text-navy-400"> / </span>
          <span className="text-navy-700">{completedCourses + inProgressCourses}</span>
        </div>
        <div className="text-[10px] text-navy-500">จบ / ทั้งหมด</div>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
          <Award className="h-2.5 w-2.5" />
          {learner.certificates}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-500 to-amber-600 text-xs font-bold text-white">
            {lvl.level}
          </div>
          <div>
            <div className="text-sm font-bold text-navy-900">{learner.parolePoints} XP</div>
            <div className="text-[10px] text-navy-500">{lvl.name}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="text-xs font-semibold text-navy-900">
          {Math.round(learnedMin / 60)} ชม.
        </div>
        <div className="text-[10px] text-navy-500">เรียนสะสม</div>
      </td>
      <td className="px-4 py-3">
        <div className={clsx("text-xs font-medium", daysAgo <= 3 ? "text-emerald-700" : daysAgo <= 14 ? "text-navy-700" : "text-rose-700")}>
          {daysAgo === 0 ? "วันนี้" : `${daysAgo} วันที่แล้ว`}
        </div>
        <div className="text-[10px] text-navy-500">
          {lastActive.toLocaleDateString("th-TH", { day: "numeric", month: "short" })}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          href={`/learn/learners/${learner.id}`}
          className="inline-flex items-center gap-0.5 rounded-full border border-navy-200 bg-white px-2.5 py-1 text-[10px] font-medium text-navy-700 hover:bg-navy-50"
        >
          ดู
          <ChevronRight className="h-3 w-3" />
        </Link>
      </td>
    </tr>
  );
}
