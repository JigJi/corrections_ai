"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  Heart,
  Scale,
  Leaf,
  Clock,
  Users,
  Star,
  Award,
  CheckCircle2,
  Sparkles,
  Volume2,
} from "lucide-react";
import clsx from "clsx";
import {
  INMATE_COURSES,
  INMATE_PROFILE,
  type Course,
  type CourseCategory,
} from "@/lib/lmsData";

const CAT_ICONS: Record<string, typeof Briefcase> = {
  "ทักษะอาชีพ": Briefcase,
  "ความรู้พื้นฐาน": BookOpen,
  "ทักษะชีวิต": Heart,
  "กฎหมาย/สิทธิ": Scale,
  "บำบัด/ปรับพฤติกรรม": Leaf,
};

const INMATE_CATS: { id: CourseCategory | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "ทั้งหมด", emoji: "📚" },
  { id: "ทักษะอาชีพ", label: "ทักษะอาชีพ", emoji: "🛠️" },
  { id: "ความรู้พื้นฐาน", label: "ความรู้พื้นฐาน", emoji: "📖" },
  { id: "ทักษะชีวิต", label: "ทักษะชีวิต", emoji: "🌟" },
  { id: "กฎหมาย/สิทธิ", label: "กฎหมาย/สิทธิ", emoji: "⚖️" },
  { id: "บำบัด/ปรับพฤติกรรม", label: "บำบัด", emoji: "💚" },
];

export default function InmateCoursesPage() {
  const [cat, setCat] = useState<CourseCategory | "all">("all");

  const filtered = useMemo(() => {
    if (cat === "all") return INMATE_COURSES;
    return INMATE_COURSES.filter((c) => c.category === cat);
  }, [cat]);

  const profile = INMATE_PROFILE;

  return (
    <div className="px-6 py-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900">เลือกหลักสูตรที่อยากเรียน</h1>
        <p className="text-sm text-navy-500">
          เรียนจบแต่ละบท ได้ XP สะสม → เลื่อน Level
          {" · "}
          <button className="inline-flex items-center gap-1 text-gold-700 hover:underline">
            <Volume2 className="h-3 w-3" />
            ฟังคำอธิบาย
          </button>
        </p>
      </div>

      {/* Category tabs — large, icon-led */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {INMATE_CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={clsx(
              "flex flex-col items-center gap-1 rounded-2xl border-2 p-3 text-xs font-semibold transition",
              cat === c.id
                ? "border-navy-900 bg-navy-900 text-white shadow-md"
                : "border-navy-200 bg-white text-navy-700 hover:border-navy-400"
            )}
          >
            <span className="text-2xl">{c.emoji}</span>
            <span className="text-center leading-tight">{c.label}</span>
          </button>
        ))}
      </div>

      {/* AI-recommended banner */}
      {cat === "all" && (
        <div className="flex items-center gap-3 rounded-2xl border border-gold-300 bg-gradient-to-r from-gold-50 via-white to-gold-50 px-5 py-3">
          <Sparkles className="h-5 w-5 flex-shrink-0 text-gold-600" />
          <div className="flex-1 text-sm text-navy-700">
            <strong>Corry แนะนำ:</strong> เริ่มจาก <strong>ทักษะอาชีพ</strong> ที่นำไปประกอบอาชีพได้ทันที
            — ถ้าจบจะได้วุฒิบัตรรับรองโดยกรมพัฒนาฝีมือแรงงาน ใช้สมัครงานได้
          </div>
        </div>
      )}

      {/* Courses */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <BigCourseCard
            key={c.id}
            course={c}
            enrolled={profile.enrolledCourseIds.includes(c.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-navy-200 bg-white p-12 text-center text-sm text-navy-500">
            ยังไม่มีหลักสูตรในหมวดนี้
          </div>
        )}
      </div>
    </div>
  );
}

function BigCourseCard({ course, enrolled }: { course: Course; enrolled: boolean }) {
  const Icon = CAT_ICONS[course.category] ?? BookOpen;
  const completed = (course.progress ?? 0) === 100;
  const inProgress = (course.progress ?? 0) > 0 && !completed;

  return (
    <Link
      href={`/inmate/learn/${course.id}`}
      className="group flex overflow-hidden rounded-2xl border-2 border-navy-100 bg-white shadow-soft transition hover:border-navy-300 hover:shadow-lg"
    >
      <div className={clsx("relative w-32 flex-shrink-0 overflow-hidden bg-gradient-to-br", course.color)}>
        <img
          src={course.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-30", course.color)} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-700">
            <Icon className="h-3 w-3" />
            {course.category} · {course.level}
          </div>
          {course.parolePoints && (
            <div className="rounded-full bg-gold-100 px-2 py-0.5 text-[11px] font-bold text-gold-800">
              +{course.parolePoints} แต้ม
            </div>
          )}
        </div>
        <div className="mt-1 text-base font-bold leading-tight text-navy-900">
          {course.title}
        </div>
        <div className="mt-1 text-xs text-navy-500 line-clamp-2">{course.subtitle}</div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-navy-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {Math.round(course.totalMinutes / 60)} ชม.
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.enrolled.toLocaleString()} คน
          </span>
          <span className="inline-flex items-center gap-1 text-gold-700">
            <Star className="h-3 w-3 fill-gold-500 text-gold-500" />
            {course.rating}
          </span>
          {course.certifyingBody && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              <Award className="h-3 w-3" />
              {course.certifyingBody}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          {completed && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5" />
              เรียนจบแล้ว · ดูวุฒิบัตร
            </div>
          )}
          {inProgress && (
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-navy-500">กำลังเรียน</span>
                <span className="font-bold text-navy-900">{course.progress}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-navy-100">
                <div
                  className={clsx("h-full bg-gradient-to-r", course.color)}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
          {!completed && !inProgress && (
            <div
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition",
                enrolled
                  ? "bg-navy-100 text-navy-700"
                  : "bg-navy-900 text-white group-hover:bg-navy-800"
              )}
            >
              {enrolled ? "เริ่มเรียน" : "สมัคร + เริ่มเรียน"}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
