"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  BookOpen,
  Users,
  Clock,
  Star,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
  Sparkles,
  Award,
  CheckCircle2,
  Filter,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_COURSES, getCourseStats, type CourseCategory } from "@/lib/lmsData";
import { CorrySuggestPanel } from "@/components/CorrySuggestPanel";

const CATEGORIES: (CourseCategory | "all")[] = [
  "all",
  "ทักษะอาชีพ",
  "ความรู้พื้นฐาน",
  "ทักษะชีวิต",
  "กฎหมาย/สิทธิ",
  "บำบัด/ปรับพฤติกรรม",
];

export default function CoursesAdminPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CourseCategory | "all">("all");
  const [view, setView] = useState<"grid" | "table">("table");

  const courseStats = getCourseStats();

  const filtered = useMemo(() => {
    let items = courseStats;
    if (cat !== "all") items = items.filter((s) => s.course.category === cat);
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (s) =>
          s.course.title.toLowerCase().includes(q) ||
          s.course.subtitle.toLowerCase().includes(q) ||
          s.course.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return items;
  }, [courseStats, query, cat]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">หลักสูตร</h1>
          <div className="text-sm text-navy-500">
            จัดการเนื้อหาคอร์ส บทเรียน แบบทดสอบ และวุฒิบัตร · ทั้งหมด{" "}
            <strong>{INMATE_COURSES.length}</strong> หลักสูตร
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/learn/courses/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" />
            สร้างคอร์สใหม่
          </Link>
        </div>
      </div>

      {/* Corry's proactive suggestions */}
      <CorrySuggestPanel />

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="ring-focus flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 shadow-soft lg:w-96">
          <Search className="h-4 w-4 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาคอร์ส..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-300"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-navy-500">
            <Filter className="inline h-3 w-3" /> หมวด:
          </span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                cat === c
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-600 hover:border-navy-400"
              )}
            >
              {c === "all" ? "ทั้งหมด" : c}
            </button>
          ))}
          <div className="ml-2 flex overflow-hidden rounded-full border border-navy-200 bg-white">
            <button
              onClick={() => setView("table")}
              className={clsx(
                "px-3 py-1 text-xs font-medium",
                view === "table" ? "bg-navy-900 text-white" : "text-navy-600"
              )}
            >
              ตาราง
            </button>
            <button
              onClick={() => setView("grid")}
              className={clsx(
                "px-3 py-1 text-xs font-medium",
                view === "grid" ? "bg-navy-900 text-white" : "text-navy-600"
              )}
            >
              การ์ด
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {view === "table" ? (
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-navy-50/60 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
              <tr className="text-left">
                <th className="px-4 py-3">หลักสูตร</th>
                <th className="px-4 py-3">หมวด · ระดับ</th>
                <th className="px-4 py-3 text-center">บทเรียน</th>
                <th className="px-4 py-3 text-center">เวลา</th>
                <th className="px-4 py-3 text-center">ผู้เรียน</th>
                <th className="px-4 py-3 text-center">% จบ</th>
                <th className="px-4 py-3 text-center">XP</th>
                <th className="px-4 py-3 text-center">วุฒิบัตร</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {filtered.map(({ course, enrolled, completionRate }) => (
                <tr key={course.id} className="hover:bg-navy-50/30">
                  <td className="px-4 py-3">
                    <Link
                      href={`/learn/courses/${course.id}`}
                      className="flex items-center gap-3 hover:text-navy-700"
                    >
                      <div className={clsx("relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br", course.color)}>
                        <img src={course.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-sm font-semibold text-navy-900">
                          {course.title}
                        </div>
                        <div className="line-clamp-1 text-[11px] text-navy-500">
                          {course.subtitle}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-navy-700">{course.category}</div>
                    <div className="text-[10px] text-navy-500">ระดับ{course.level}</div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs font-semibold text-navy-900">
                    {course.lessons.length}
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-navy-600">
                    {Math.round(course.totalMinutes / 60)} ชม.
                  </td>
                  <td className="px-4 py-3 text-center text-xs font-semibold text-navy-900">
                    {enrolled}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-navy-100">
                        <div
                          className={clsx("h-full bg-gradient-to-r", course.color)}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-navy-700">
                        {completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.parolePoints ? (
                      <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[11px] font-bold text-gold-800">
                        +{course.parolePoints}
                      </span>
                    ) : (
                      <span className="text-navy-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.certifyingBody ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        <Award className="h-2.5 w-2.5" />
                        รับรอง
                      </span>
                    ) : (
                      <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] text-navy-500">
                        ภายใน
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/learn/courses/${course.id}`}
                        className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
                        title="แก้ไข"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/inmate/learn/${course.id}`}
                        className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
                        title="ดูในมุมผู้เรียน (Kiosk)"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <button className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-50 hover:text-navy-900">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-navy-500">
                    ไม่พบหลักสูตรที่ตรงกับการค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(({ course, enrolled, completed, completionRate, avgScore }) => (
            <Link
              key={course.id}
              href={`/learn/courses/${course.id}`}
              className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition hover:shadow-lg"
            >
              <div className={clsx("relative h-32 overflow-hidden bg-gradient-to-br", course.color)}>
                <img src={course.image} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-30", course.color)} />
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                  {course.category} · {course.level}
                </div>
                <div className="mt-1 line-clamp-1 text-sm font-bold text-navy-900">
                  {course.title}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <Stat label="ผู้เรียน" value={enrolled} icon={Users} />
                  <Stat label="จบ" value={completed} icon={CheckCircle2} />
                  <Stat label="คะแนน" value={avgScore || "—"} icon={Star} />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className={clsx("h-full bg-gradient-to-r", course.color)}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: typeof Users;
}) {
  return (
    <div>
      <div className="flex items-center justify-center gap-0.5 text-navy-500">
        <Icon className="h-2.5 w-2.5" />
        <span className="text-[9px]">{label}</span>
      </div>
      <div className="text-sm font-bold text-navy-900">{value}</div>
    </div>
  );
}
