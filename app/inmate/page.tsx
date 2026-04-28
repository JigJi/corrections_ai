"use client";

import Link from "next/link";
import {
  Award,
  TrendingUp,
  PlayCircle,
  Sparkles,
  ChevronRight,
  Briefcase,
  Heart,
  BookOpen,
  Scale,
  Leaf,
  CheckCircle2,
  Clock,
  Trophy,
  Flame,
  Star,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_PROFILE, INMATE_COURSES, type Course } from "@/lib/lmsData";

const CATEGORY_ICONS = {
  "ทักษะอาชีพ": Briefcase,
  "ความรู้พื้นฐาน": BookOpen,
  "ทักษะชีวิต": Heart,
  "กฎหมาย/สิทธิ": Scale,
  "บำบัด/ปรับพฤติกรรม": Leaf,
} as const;

// XP-based level system (gamification only — no real-world consequences)
function levelFromXp(xp: number) {
  if (xp >= 500) return { level: 5, name: "เซียน", color: "from-fuchsia-500 to-purple-600" };
  if (xp >= 300) return { level: 4, name: "ขั้นสูง", color: "from-rose-500 to-pink-600" };
  if (xp >= 150) return { level: 3, name: "ก้าวหน้า", color: "from-amber-500 to-orange-600" };
  if (xp >= 50) return { level: 2, name: "เริ่มมีฝีมือ", color: "from-emerald-500 to-teal-600" };
  return { level: 1, name: "เริ่มต้น", color: "from-blue-500 to-indigo-600" };
}

export default function InmateDashboard() {
  const profile = INMATE_PROFILE;
  const xp = profile.parolePoints;
  const lvl = levelFromXp(xp);
  const nextThreshold =
    lvl.level === 5 ? xp : [50, 150, 300, 500][lvl.level - 1];
  const prevThreshold = [0, 50, 150, 300, 500][lvl.level - 1];
  const lvlProgress = lvl.level === 5
    ? 100
    : Math.round(((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100);

  const enrolled = INMATE_COURSES.filter((c) =>
    profile.enrolledCourseIds.includes(c.id)
  );
  const inProgress = enrolled.filter(
    (c) => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100
  );
  const completed = enrolled.filter((c) => (c.progress ?? 0) === 100);

  // Streak: just a demo number
  const streak = 12;

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Greeting */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm text-navy-500">สวัสดี</div>
          <h1 className="text-2xl font-bold text-navy-900">
            คุณ{profile.name.replace("นาย", "")}
          </h1>
          <div className="text-xs text-navy-500">
            พร้อมเรียนต่อแล้วใช่มั้ยครับ?
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5">
          <Flame className="h-4 w-4 text-orange-600" />
          <div className="text-xs">
            <strong className="text-orange-700">{streak}</strong>
            <span className="text-navy-600"> วันต่อเนื่อง</span>
          </div>
        </div>
      </div>

      {/* Hero stats — 3 cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Level + XP */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 p-6 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold-300/80">
              <Trophy className="h-3.5 w-3.5" />
              ระดับของคุณ
            </div>
            <div className="mt-2 flex items-end gap-3">
              <div
                className={clsx(
                  "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold shadow-md",
                  lvl.color
                )}
              >
                {lvl.level}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50">Level {lvl.level}</div>
                <div className="text-xl font-bold">{lvl.name}</div>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gold-300">{xp}</span>
              <span className="text-sm text-white/60">XP สะสม</span>
            </div>
            {lvl.level < 5 && (
              <>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
                    style={{ width: `${lvlProgress}%` }}
                  />
                </div>
                <div className="mt-1 text-[11px] text-white/60">
                  อีก <strong className="text-gold-300">{nextThreshold - xp} XP</strong> จะเลื่อน Level{" "}
                  {lvl.level + 1}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Courses progress */}
        <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50/50 p-6 shadow-soft">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            ความคืบหน้าหลักสูตร
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-navy-900">{completed.length}</span>
            <span className="text-base text-navy-500">/ {enrolled.length} คอร์ส</span>
          </div>
          <div className="mt-1 text-xs text-navy-600">
            กำลังเรียน <strong>{inProgress.length}</strong> คอร์ส
          </div>
          <Link
            href="/inmate/courses"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ดูคอร์สทั้งหมด <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Certificates */}
        <Link
          href="#"
          className="group rounded-3xl border-2 border-gold-200 bg-gradient-to-br from-white to-gold-50/50 p-6 shadow-soft transition hover:shadow-lg"
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold-700">
            <Award className="h-3.5 w-3.5" />
            วุฒิบัตรของคุณ
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-navy-900">
              {profile.certificates.length}
            </span>
            <span className="text-base text-navy-500">ใบ</span>
          </div>
          <div className="mt-1 text-xs text-navy-600">
            ใช้สมัครงานได้ทันที — รับรองโดยกรมพัฒนาฝีมือฯ
          </div>
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-700 group-hover:text-gold-900">
            ดูทั้งหมด <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>

      {/* Continue learning */}
      {inProgress.length > 0 && (
        <section>
          <SectionHeader
            icon={PlayCircle}
            title="เรียนต่อจากที่ค้างไว้"
            subtitle="กลับมาเรียนต่อได้ทุกเมื่อ"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {inProgress.slice(0, 2).map((c) => (
              <ContinueCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section>
        <SectionHeader
          icon={Sparkles}
          title="Corry แนะนำสำหรับคุณ"
          subtitle="คอร์สที่เหมาะกับโปรไฟล์ของคุณ"
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {INMATE_COURSES.filter((c) => !profile.enrolledCourseIds.includes(c.id))
            .slice(0, 4)
            .map((c) => (
              <RecommendedCard key={c.id} course={c} />
            ))}
        </div>
      </section>

      {/* Certificates list */}
      {profile.certificates.length > 0 && (
        <section>
          <SectionHeader
            icon={Award}
            title="วุฒิบัตรที่ได้รับแล้ว"
            subtitle="ใช้เป็นหลักฐานสมัครงาน"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {profile.certificates.map((c) => (
              <Link
                key={c.id}
                href={`/inmate/certificate/${c.id}`}
                className="group flex items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50 p-4 shadow-soft transition hover:shadow-lg"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                  <Award className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700">วุฒิบัตร</div>
                  <div className="line-clamp-1 text-sm font-bold text-navy-900">{c.courseTitle}</div>
                  <div className="mt-0.5 text-[11px] text-navy-500">
                    {c.serialNo} · {new Date(c.issuedAt).toLocaleDateString("th-TH")}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-navy-400 group-hover:text-navy-700" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Award;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2 text-base font-bold text-navy-900">
          <Icon className="h-4 w-4 text-gold-600" />
          {title}
        </div>
        <div className="text-[11px] text-navy-500">{subtitle}</div>
      </div>
    </div>
  );
}

function ContinueCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/inmate/learn/${course.id}`}
      className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-navy-100 bg-white p-4 shadow-soft transition hover:shadow-lg"
    >
      <div className={clsx("relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-md", course.color)}>
        <img src={course.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-30", course.color)} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-medium uppercase tracking-wider text-gold-600">
          {course.category}
        </div>
        <div className="truncate text-sm font-bold text-navy-900">{course.title}</div>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-navy-500">
          <span>{course.progress}% เสร็จ</span>
          {course.parolePoints && (
            <span className="text-gold-700">+{course.parolePoints} XP เมื่อจบ</span>
          )}
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-100">
          <div
            className={clsx("h-full bg-gradient-to-r", course.color)}
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
      <ChevronRight className="h-5 w-5 flex-shrink-0 text-navy-400 transition group-hover:translate-x-0.5 group-hover:text-navy-700" />
    </Link>
  );
}

function RecommendedCard({ course }: { course: Course }) {
  const Icon = CATEGORY_ICONS[course.category as keyof typeof CATEGORY_ICONS] ?? BookOpen;
  return (
    <Link
      href={`/inmate/learn/${course.id}`}
      className="group block overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition hover:shadow-lg"
    >
      <div className={clsx("relative h-24 overflow-hidden bg-gradient-to-br", course.color)}>
        <img
          src={course.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-30", course.color)} />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gold-600">
          <Icon className="h-3 w-3" />
          {course.category}
        </div>
        <div className="mt-1 text-sm font-semibold leading-tight text-navy-900 line-clamp-2">
          {course.title}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="text-navy-500 inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {Math.round(course.totalMinutes / 60)} ชม.
          </span>
          {course.parolePoints && (
            <span className="rounded-full bg-gold-100 px-2 py-0.5 font-bold text-gold-800">
              +{course.parolePoints} XP
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
