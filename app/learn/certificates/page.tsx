"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  Search,
  Download,
  ExternalLink,
  Filter,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";
import { LEARNERS, INMATE_COURSES } from "@/lib/lmsData";

interface IssuedCert {
  id: string;
  learnerId: string;
  learnerName: string;
  prisonNumber: string;
  prison: string;
  courseId: string;
  courseTitle: string;
  cover: string;
  color: string;
  image: string;
  certifyingBody: string;
  template: "vocational" | "lifeskill" | "staff";
  issuedAt: string;
  serialNo: string;
  hours: number;
  score: number;
}

export default function CertificatesAdminPage() {
  // Build issued certificates from learner enrollments
  const issued: IssuedCert[] = useMemo(() => {
    const items: IssuedCert[] = [];
    LEARNERS.forEach((l) => {
      l.enrollments
        .filter((e) => e.status === "completed")
        .forEach((e) => {
          const course = INMATE_COURSES.find((c) => c.id === e.courseId);
          if (!course) return;
          items.push({
            id: `cert-${l.id}-${e.courseId}`,
            learnerId: l.id,
            learnerName: l.name,
            prisonNumber: l.prisonNumber,
            prison: l.prison,
            courseId: course.id,
            courseTitle: course.title,
            cover: course.cover,
            color: course.color,
            image: course.image,
            certifyingBody: course.certifyingBody ?? "กรมราชทัณฑ์",
            template: course.certificateTemplate ?? "lifeskill",
            issuedAt: e.lastActivityAt,
            serialNo: `DOC-LMS-${new Date(e.lastActivityAt).getFullYear()}-${String(items.length + 1).padStart(6, "0")}`,
            hours: Math.round(course.totalMinutes / 60),
            score: e.quizScore ?? 0,
          });
        });
    });
    return items.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
  }, []);

  const [query, setQuery] = useState("");
  const [tpl, setTpl] = useState<"all" | "vocational" | "lifeskill" | "staff">("all");

  const filtered = useMemo(() => {
    let items = issued;
    if (tpl !== "all") items = items.filter((c) => c.template === tpl);
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (c) =>
          c.learnerName.toLowerCase().includes(q) ||
          c.prisonNumber.toLowerCase().includes(q) ||
          c.courseTitle.toLowerCase().includes(q) ||
          c.serialNo.toLowerCase().includes(q)
      );
    }
    return items;
  }, [issued, query, tpl]);

  const counts = {
    total: issued.length,
    vocational: issued.filter((c) => c.template === "vocational").length,
    lifeskill: issued.filter((c) => c.template === "lifeskill").length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900">วุฒิบัตร</h1>
        <div className="text-sm text-navy-500">
          วุฒิบัตรที่ออกให้ผู้เรียน · เชื่อมต่อกรมพัฒนาฝีมือแรงงานสำหรับใบรับรองอาชีพ
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="วุฒิบัตรทั้งหมด" value={counts.total} icon={Award} color="from-emerald-500 to-teal-600" />
        <StatCard label="ทักษะอาชีพ (รับรองโดยกรมพัฒนาฝีมือฯ)" value={counts.vocational} icon={CheckCircle2} color="from-blue-500 to-indigo-600" />
        <StatCard label="ทักษะชีวิต/พื้นฐาน" value={counts.lifeskill} icon={CheckCircle2} color="from-gold-500 to-amber-600" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="ring-focus flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 shadow-soft lg:w-96">
          <Search className="h-4 w-4 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาผู้เรียน / คอร์ส / เลขที่..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-300"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-navy-500">
            <Filter className="h-3 w-3" />
            ประเภท:
          </span>
          {(["all", "vocational", "lifeskill"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTpl(t)}
              className={clsx(
                "rounded-full border px-3 py-1 text-xs font-medium transition",
                tpl === t
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-200 bg-white text-navy-600 hover:border-navy-400"
              )}
            >
              {t === "all" ? "ทั้งหมด" : t === "vocational" ? "ทักษะอาชีพ" : "ทักษะชีวิต"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-navy-50/60 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
            <tr className="text-left">
              <th className="px-4 py-3">เลขที่วุฒิบัตร</th>
              <th className="px-4 py-3">ผู้รับ</th>
              <th className="px-4 py-3">หลักสูตร</th>
              <th className="px-4 py-3">รับรองโดย</th>
              <th className="px-4 py-3 text-center">คะแนน</th>
              <th className="px-4 py-3">วันออก</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-navy-50/30">
                <td className="px-4 py-3 font-mono text-[11px] text-navy-700">{c.serialNo}</td>
                <td className="px-4 py-3">
                  <Link href={`/learn/learners/${c.learnerId}`} className="hover:text-navy-700">
                    <div className="text-xs font-semibold text-navy-900">{c.learnerName}</div>
                    <div className="text-[10px] text-navy-500">
                      <span className="font-mono">{c.prisonNumber}</span> · {c.prison}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/learn/courses/${c.courseId}`} className="flex items-center gap-2 hover:text-navy-700">
                    <div className={clsx("relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br", c.color)}>
                      <img src={c.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="line-clamp-1 text-xs font-medium text-navy-900">{c.courseTitle}</div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      c.template === "vocational"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-navy-50 text-navy-700"
                    )}
                  >
                    <Award className="h-2.5 w-2.5" />
                    {c.certifyingBody}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {c.score > 0 ? (
                    <span className="text-xs font-bold text-navy-900">{c.score}</span>
                  ) : (
                    <span className="text-navy-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[11px] text-navy-600">
                  {new Date(c.issuedAt).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/inmate/certificate/cert-${c.courseId}`}
                      className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 hover:text-navy-900"
                      title="ดูวุฒิบัตร"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 hover:text-navy-900" title="ดาวน์โหลด PDF">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-navy-500">
                  ยังไม่มีวุฒิบัตรในเงื่อนไขนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: typeof Award;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
      <div className={clsx("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-3 text-3xl font-bold text-navy-900">{value}</div>
      <div className="mt-0.5 text-xs text-navy-700">{label}</div>
    </div>
  );
}
