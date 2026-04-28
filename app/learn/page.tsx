"use client";

import Link from "next/link";
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  Plus,
  FileText,
  Clock,
  Trophy,
} from "lucide-react";
import clsx from "clsx";
import {
  LEARNERS,
  INMATE_COURSES,
  PRISONS,
  getLearnerStats,
  getCourseStats,
} from "@/lib/lmsData";

export default function AdminDashboard() {
  const stats = getLearnerStats();
  const courseStats = getCourseStats().sort((a, b) => b.enrolled - a.enrolled);

  // Total learning hours (sum of completed lessons)
  const totalLearningHours = LEARNERS.reduce((s, l) => {
    return s + l.enrollments.reduce((ls, e) => {
      const c = INMATE_COURSES.find((cc) => cc.id === e.courseId);
      if (!c) return ls;
      return ls + (c.totalMinutes * e.progress) / 100;
    }, 0);
  }, 0) / 60;

  // Top learner by XP (positive framing)
  const topLearner = [...LEARNERS]
    .sort((a, b) => b.parolePoints - a.parolePoints)[0];

  // Activity feed (last 7 days)
  const recentActivity = LEARNERS.flatMap((l) =>
    l.enrollments.map((e) => ({
      learner: l,
      enrollment: e,
      course: INMATE_COURSES.find((c) => c.id === e.courseId),
    }))
  )
    .filter((a) => a.course)
    .sort(
      (a, b) =>
        new Date(b.enrollment.lastActivityAt).getTime() -
        new Date(a.enrollment.lastActivityAt).getTime()
    )
    .slice(0, 6);

  // Prison breakdown
  const prisonBreakdown = PRISONS.map((p) => {
    const count = LEARNERS.filter((l) => l.prison === p).length;
    return { prison: p, count };
  })
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">ภาพรวมระบบ</h1>
          <div className="text-sm text-navy-500">
            สถานะการเรียนทั้งหมดของผู้เรียน · อัปเดตล่าสุด {new Date().toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/learn/learners"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
          >
            <FileText className="h-4 w-4" />
            ดูผู้เรียนทั้งหมด
          </Link>
          <Link
            href="/learn/courses"
            className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" />
            สร้างคอร์สใหม่
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Users}
          color="from-navy-700 to-navy-900"
          label="ผู้เรียน Active"
          value={stats.active}
          sub={`/ ${stats.total} คน · ${Math.round((stats.active / stats.total) * 100)}% active`}
          trend="+3 สัปดาห์นี้"
        />
        <KpiCard
          icon={BookOpen}
          color="from-blue-500 to-indigo-600"
          label="หลักสูตรเปิดใช้งาน"
          value={INMATE_COURSES.length}
          sub={`รวมเรียน ${stats.totalEnrollments} ครั้ง · จบ ${stats.completionRate}%`}
        />
        <KpiCard
          icon={Award}
          color="from-emerald-500 to-teal-600"
          label="วุฒิบัตรที่ออก"
          value={stats.totalCertificates}
          sub="ใบ · เชื่อมกรมพัฒนาฝีมือฯ"
          trend="+5 เดือนนี้"
        />
        <KpiCard
          icon={Trophy}
          color="from-gold-500 to-amber-600"
          label="XP สะสมทั้งระบบ"
          value={stats.totalParolePoints}
          sub={`รวม ${Math.round(totalLearningHours).toLocaleString()} ชม. การเรียน`}
          highlight
        />
      </div>

      {/* AI insight */}
      <div className="flex items-center gap-4 rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 via-white to-gold-50 p-5 shadow-soft">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-amber-600 text-white shadow-md">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-navy-900">
            Corry สรุปสัปดาห์นี้
          </div>
          <div className="mt-0.5 text-xs leading-relaxed text-navy-700">
            ผู้เรียน <strong>{stats.active}</strong> คน active ·{" "}
            <strong className="text-emerald-700">{stats.completedEnrollments}</strong> การเรียนจบหลักสูตร ·{" "}
            ผู้เรียนยอดเยี่ยมประจำสัปดาห์: <strong className="text-gold-700">{topLearner?.name.replace("นาย", "").replace("นางสาว", "น.ส.")}</strong>{" "}
            ({topLearner?.parolePoints} XP) — คอร์สที่ engagement สูงสุด:{" "}
            <strong>{courseStats[0]?.course.title}</strong>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Completion rate donut */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
            <TrendingUp className="h-4 w-4 text-gold-600" />
            อัตราเรียนจบหลักสูตร
          </div>
          <div className="mt-4 flex items-center gap-5">
            <DonutChart percent={stats.completionRate} />
            <div className="flex-1 space-y-2">
              <Legend
                label="เรียนจบ"
                count={stats.completedEnrollments}
                color="bg-emerald-500"
              />
              <Legend
                label="กำลังเรียน"
                count={stats.totalEnrollments - stats.completedEnrollments}
                color="bg-blue-500"
              />
              <div className="border-t border-navy-100 pt-2 text-[11px] text-navy-500">
                รวม {stats.totalEnrollments} การลงทะเบียน
              </div>
            </div>
          </div>
        </div>

        {/* Prison breakdown */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <Users className="h-4 w-4 text-gold-600" />
              ผู้เรียนแยกตามเรือนจำ
            </div>
            <Link
              href="/learn/learners"
              className="text-xs font-medium text-navy-600 hover:text-navy-900 hover:underline"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="space-y-2.5">
            {prisonBreakdown.map((p) => (
              <BarRow
                key={p.prison}
                label={p.prison}
                value={p.count}
                max={Math.max(...prisonBreakdown.map((x) => x.count))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top courses */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <BookOpen className="h-4 w-4 text-gold-600" />
              หลักสูตรยอดนิยม
            </div>
            <Link
              href="/learn/courses"
              className="text-xs font-medium text-navy-600 hover:text-navy-900 hover:underline"
            >
              จัดการคอร์ส →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-navy-100">
            <table className="w-full text-sm">
              <thead className="bg-navy-50/60">
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                  <th className="px-4 py-2.5">หลักสูตร</th>
                  <th className="px-4 py-2.5 text-center">ผู้เรียน</th>
                  <th className="px-4 py-2.5 text-center">จบ</th>
                  <th className="px-4 py-2.5 text-center">คะแนนเฉลี่ย</th>
                  <th className="px-4 py-2.5 text-right">% จบ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {courseStats.slice(0, 5).map(({ course, enrolled, completed, avgScore, completionRate }) => (
                  <tr key={course.id} className="hover:bg-navy-50/30">
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/learn/courses/${course.id}`}
                        className="flex items-center gap-2.5 hover:text-navy-700"
                      >
                        <div className={clsx("relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br", course.color)}>
                          <img src={course.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-navy-900">
                            {course.title}
                          </div>
                          <div className="text-[10px] text-navy-500">{course.category}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-center text-xs font-semibold text-navy-900">
                      {enrolled}
                    </td>
                    <td className="px-4 py-2.5 text-center text-xs text-emerald-700">
                      {completed}
                    </td>
                    <td className="px-4 py-2.5 text-center text-xs">
                      {avgScore > 0 ? (
                        <span className="font-semibold text-navy-900">{avgScore}</span>
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-navy-100">
                          <div
                            className={clsx("h-full bg-gradient-to-r", course.color)}
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-navy-700">
                          {completionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <Clock className="h-4 w-4 text-gold-600" />
              กิจกรรมล่าสุด
            </div>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <ActivityRow
                key={i}
                learnerName={a.learner.name}
                courseTitle={a.course!.title}
                courseColor={a.course!.color}
                courseImage={a.course!.image}
                progress={a.enrollment.progress}
                date={a.enrollment.lastActivityAt}
                completed={a.enrollment.status === "completed"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  color,
  label,
  value,
  sub,
  trend,
  highlight,
}: {
  icon: typeof Users;
  color: string;
  label: string;
  value: number;
  sub: string;
  trend?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border bg-white p-5 shadow-soft",
        highlight ? "border-gold-300" : "border-navy-100"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            color
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            {trend}
          </div>
        )}
      </div>
      <div className="mt-3 text-3xl font-bold text-navy-900">{value.toLocaleString()}</div>
      <div className="mt-0.5 text-xs font-medium text-navy-700">{label}</div>
      <div className="mt-1 text-[11px] text-navy-500">{sub}</div>
    </div>
  );
}

function DonutChart({ percent }: { percent: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <div className="relative h-24 w-24 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#donutGrad)"
          strokeWidth="10"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="donutGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-navy-900">{percent}%</div>
        <div className="text-[9px] uppercase tracking-wider text-navy-500">เรียนจบ</div>
      </div>
    </div>
  );
}

function Legend({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={clsx("h-2.5 w-2.5 rounded-full", color)} />
      <span className="flex-1 text-navy-600">{label}</span>
      <span className="font-bold text-navy-900">{count}</span>
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
      <div className="truncate text-xs font-medium text-navy-700">{label}</div>
      <div className="h-5 overflow-hidden rounded-md bg-navy-50">
        <div
          className="h-full bg-gradient-to-r from-navy-600 to-navy-800 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="w-8 text-right text-xs font-bold text-navy-900">{value}</div>
    </div>
  );
}

function ActivityRow({
  learnerName,
  courseTitle,
  courseColor,
  courseImage,
  progress,
  date,
  completed,
}: {
  learnerName: string;
  courseTitle: string;
  courseColor: string;
  courseImage: string;
  progress: number;
  date: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={clsx("relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br", courseColor)}>
        <img src={courseImage} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs">
          <span className="font-semibold text-navy-900">{learnerName.replace("นาย", "").replace("นางสาว", "น.ส.")}</span>
          <span className="text-navy-500">
            {completed ? " เรียนจบ " : " เรียนต่อ "}
          </span>
          <span className="font-medium text-navy-700">{courseTitle}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-navy-500">
          {completed ? (
            <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              จบ 100%
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5">
              <PlayCircle className="h-3 w-3" />
              {progress}%
            </span>
          )}
          <span>·</span>
          <span>
            {new Date(date).toLocaleDateString("th-TH", { day: "numeric", month: "short" })}
          </span>
        </div>
      </div>
    </div>
  );
}
