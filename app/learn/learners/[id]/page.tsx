"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Printer,
  TrendingUp,
  Flame,
  BookOpen,
} from "lucide-react";
import clsx from "clsx";
import { LEARNERS, INMATE_COURSES } from "@/lib/lmsData";

function levelFromXp(xp: number) {
  if (xp >= 500) return { level: 5, name: "เซียน", color: "from-fuchsia-500 to-purple-600" };
  if (xp >= 300) return { level: 4, name: "ขั้นสูง", color: "from-rose-500 to-pink-600" };
  if (xp >= 150) return { level: 3, name: "ก้าวหน้า", color: "from-amber-500 to-orange-600" };
  if (xp >= 50) return { level: 2, name: "เริ่มมีฝีมือ", color: "from-emerald-500 to-teal-600" };
  return { level: 1, name: "เริ่มต้น", color: "from-blue-500 to-indigo-600" };
}

export default function LearnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const learner = LEARNERS.find((l) => l.id === id);

  if (!learner) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center text-sm text-navy-500">
        ไม่พบผู้เรียน{" "}
        <Link href="/learn/learners" className="text-navy-700 hover:underline">
          กลับ
        </Link>
      </div>
    );
  }

  const xp = learner.parolePoints;
  const lvl = levelFromXp(xp);
  const nextThreshold = lvl.level === 5 ? xp : [50, 150, 300, 500][lvl.level - 1];
  const prevThreshold = [0, 50, 150, 300, 500][lvl.level - 1];
  const lvlProgress =
    lvl.level === 5
      ? 100
      : Math.round(((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100);

  const completedCourses = learner.enrollments.filter((e) => e.status === "completed");
  const inProgressCourses = learner.enrollments.filter((e) => e.status === "in_progress");

  const totalLearnedMin = learner.enrollments.reduce((s, e) => {
    const c = INMATE_COURSES.find((cc) => cc.id === e.courseId);
    if (!c) return s;
    return s + (c.totalMinutes * e.progress) / 100;
  }, 0);

  const lastActive = new Date(learner.lastActiveAt);
  const daysAgo = Math.floor((Date.now() - lastActive.getTime()) / 86400000);

  return (
    <div className="space-y-5">
      <Link
        href="/learn/learners"
        className="inline-flex items-center gap-1 text-xs font-medium text-navy-500 hover:text-navy-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        กลับไปรายชื่อผู้เรียน
      </Link>

      {/* Bio header */}
      <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
        {/* Profile card */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-2xl font-bold text-white shadow-md">
              {learner.name.split(" ").pop()?.[0] ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xl font-bold text-navy-900">{learner.name}</div>
              <div className="font-mono text-xs text-navy-500">{learner.prisonNumber}</div>
              <div className="mt-1 flex items-center gap-2 text-[11px]">
                <span
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold",
                    learner.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : learner.status === "inactive"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-navy-100 text-navy-700"
                  )}
                >
                  ● {learner.status === "active" ? "Active" : learner.status === "inactive" ? "ไม่ active" : "ปิดการใช้งาน"}
                </span>
                <span className="text-navy-500">
                  Active ล่าสุด {daysAgo === 0 ? "วันนี้" : `${daysAgo} วันที่แล้ว`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-navy-100 pt-4 text-sm">
            <Detail label="อายุ" value={`${learner.age} ปี`} />
            <Detail label="เรือนจำ" value={learner.prison} />
            <Detail label="แดน/ห้อง" value={learner.block} />
            <Detail
              label="ลงทะเบียนระบบ"
              value={new Date(learner.lastActiveAt).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          </div>
        </div>

        {/* XP / Level hero */}
        <div className="overflow-hidden rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-white via-gold-50/40 to-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-700">
            <Trophy className="h-3.5 w-3.5" />
            XP สะสม + ระดับการเรียน
          </div>

          <div className="mt-3 flex items-end gap-5">
            <div
              className={clsx(
                "flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br text-4xl font-bold text-white shadow-md",
                lvl.color
              )}
            >
              {lvl.level}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-navy-500">
                Level {lvl.level}
              </div>
              <div className="text-xl font-bold text-navy-900">{lvl.name}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gold-700">{xp}</span>
                <span className="text-sm text-navy-500">XP</span>
              </div>
            </div>
          </div>

          {lvl.level < 5 && (
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-navy-100">
                <div
                  className={clsx("h-full bg-gradient-to-r", lvl.color)}
                  style={{ width: `${lvlProgress}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-navy-900">{lvlProgress}%</span>
                <span className="text-navy-600">
                  อีก <strong className="text-gold-700">{nextThreshold - xp} XP</strong> เลื่อน Level{" "}
                  {lvl.level + 1}
                </span>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50">
              <Printer className="h-4 w-4" />
              พิมพ์ประวัติการเรียน
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid gap-3 md:grid-cols-4">
        <Stat icon={CheckCircle2} label="คอร์สเรียนจบ" value={completedCourses.length} color="text-emerald-700" />
        <Stat icon={PlayCircle} label="กำลังเรียน" value={inProgressCourses.length} color="text-blue-700" />
        <Stat icon={Award} label="วุฒิบัตร" value={learner.certificates} color="text-gold-700" />
        <Stat
          icon={Clock}
          label="เวลาเรียนรวม"
          value={Math.round(totalLearnedMin / 60)}
          color="text-navy-900"
          sub="ชั่วโมง"
        />
      </div>

      {/* AI insight banner */}
      <div className="overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 via-white to-gold-50 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
          <div className="flex-1 text-sm">
            <strong className="text-navy-900">Corry วิเคราะห์:</strong>{" "}
            <span className="text-navy-700">
              ผู้เรียนคนนี้มี learning velocity{" "}
              <strong className="text-emerald-700">สูงกว่าค่าเฉลี่ย 18%</strong> ·
              เรียนจบ {completedCourses.length} คอร์ส · มีแนวโน้มเลื่อนเป็น{" "}
              <strong className="text-gold-700">Level {lvl.level + 1}</strong> ใน{" "}
              <strong className="text-gold-700">~{Math.max(7, Math.round((nextThreshold - xp) / 4))} วัน</strong>{" "}
              หากรักษาอัตราเดิม
            </span>
          </div>
        </div>
      </div>

      {/* Enrollments table */}
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <div className="border-b border-navy-100 p-4">
          <div className="text-sm font-bold text-navy-900">การลงทะเบียนเรียน</div>
          <div className="text-[11px] text-navy-500">
            {learner.enrollments.length} คอร์ส · จบ {completedCourses.length} · กำลังเรียน{" "}
            {inProgressCourses.length}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-navy-50/40 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
            <tr className="text-left">
              <th className="px-4 py-2.5">หลักสูตร</th>
              <th className="px-4 py-2.5 text-center">สถานะ</th>
              <th className="px-4 py-2.5">ความคืบหน้า</th>
              <th className="px-4 py-2.5 text-center">คะแนน</th>
              <th className="px-4 py-2.5 text-right">Active ล่าสุด</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {learner.enrollments.map((e) => {
              const course = INMATE_COURSES.find((c) => c.id === e.courseId);
              if (!course) return null;
              return (
                <tr key={e.courseId} className="hover:bg-navy-50/30">
                  <td className="px-4 py-3">
                    <Link
                      href={`/learn/courses/${course.id}`}
                      className="flex items-center gap-2.5 hover:text-navy-700"
                    >
                      <div className={clsx("relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br", course.color)}>
                        <img src={course.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-navy-900">{course.title}</div>
                        <div className="text-[10px] text-navy-500">{course.category}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {e.status === "completed" ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        จบ
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        <PlayCircle className="h-2.5 w-2.5" />
                        เรียน
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-navy-100">
                        <div
                          className={clsx("h-full bg-gradient-to-r", course.color)}
                          style={{ width: `${e.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-navy-700">{e.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {e.quizScore ? (
                      <span className="text-xs font-bold text-navy-900">{e.quizScore}</span>
                    ) : (
                      <span className="text-navy-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-[11px] text-navy-500">
                    {new Date(e.lastActivityAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-navy-500">{label}</span>
      <span className="font-semibold text-navy-900">{value}</span>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  color,
  sub,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: number | string;
  color: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-navy-500">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={clsx("text-2xl font-bold", color)}>{value}</span>
        {sub && <span className="text-xs text-navy-500">{sub}</span>}
      </div>
    </div>
  );
}
