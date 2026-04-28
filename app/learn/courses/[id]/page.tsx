"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Eye,
  Plus,
  GripVertical,
  PlayCircle,
  FileText,
  Headphones,
  MousePointer2,
  HelpCircle,
  Sparkles,
  Users,
  Award,
  Clock,
  Star,
  Trophy,
  Save,
  Trash2,
  CheckCircle2,
  Database,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_COURSES, LEARNERS, type Lesson } from "@/lib/lmsData";
import { MOCK_ITEMS } from "@/lib/mockData";

const KIND_ICON = {
  video: PlayCircle,
  reading: FileText,
  audio: Headphones,
  interactive: MousePointer2,
  quiz: HelpCircle,
};

const KIND_LABEL = {
  video: "วิดีโอ",
  reading: "อ่าน",
  audio: "เสียง",
  interactive: "ฝึกปฏิบัติ",
  quiz: "แบบทดสอบ",
};

export default function CourseEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = INMATE_COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center text-sm text-navy-500">
        ไม่พบคอร์ส{" "}
        <Link href="/learn/courses" className="text-navy-700 hover:underline">
          กลับไปหน้าหลักสูตร
        </Link>
      </div>
    );
  }

  // Stats for this course
  const enrollments = LEARNERS.flatMap((l) =>
    l.enrollments.filter((e) => e.courseId === course.id).map((e) => ({ learner: l, enrollment: e }))
  );
  const completed = enrollments.filter((x) => x.enrollment.status === "completed");
  const inProgress = enrollments.filter((x) => x.enrollment.status === "in_progress");
  const avgScore =
    enrollments
      .map((x) => x.enrollment.quizScore ?? 0)
      .filter((s) => s > 0)
      .reduce((a, b, _, arr) => a + b / arr.length, 0) || 0;

  const relatedItems = (course.relatedKnowledge ?? [])
    .map((kid) => MOCK_ITEMS.find((m) => m.id === kid))
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/learn/courses"
          className="inline-flex items-center gap-1 text-xs font-medium text-navy-500 hover:text-navy-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          กลับไปรายการหลักสูตร
        </Link>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={clsx("relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br shadow-md", course.color)}>
              <img src={course.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gold-700">
                {course.category} · ระดับ{course.level}
              </div>
              <h1 className="text-2xl font-bold text-navy-900">{course.title}</h1>
              <div className="text-sm text-navy-500">{course.subtitle}</div>
            </div>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <Link
              href={`/inmate/learn/${course.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              <Eye className="h-4 w-4" />
              ดูในมุมผู้เรียน
            </Link>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
              <Save className="h-4 w-4" />
              บันทึก
            </button>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid gap-3 md:grid-cols-4">
        <MiniStat icon={Users} label="ผู้เรียนทั้งหมด" value={enrollments.length} />
        <MiniStat icon={CheckCircle2} label="เรียนจบแล้ว" value={completed.length} color="text-emerald-700" />
        <MiniStat icon={PlayCircle} label="กำลังเรียน" value={inProgress.length} color="text-blue-700" />
        <MiniStat
          icon={Star}
          label="คะแนนเฉลี่ย"
          value={avgScore > 0 ? Math.round(avgScore) : "—"}
          color="text-gold-700"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: Lessons editor */}
        <div className="space-y-5">
          {/* AI suggestion */}
          <div className="overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 via-white to-gold-50 p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
              <div className="flex-1">
                <div className="text-sm font-bold text-navy-900">Corry แนะนำ</div>
                <div className="mt-0.5 text-xs text-navy-700">
                  ผู้เรียนหลายคนมี quiz score ต่ำในบทที่ 5 — ลองเพิ่มบทเรียนเสริมเรื่อง
                  <strong> "การคำนวณต้นทุน-กำไรขายเบเกอรี่"</strong> ก่อนแบบทดสอบ
                </div>
                <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-gold-700">
                  สร้างบทเรียนใหม่ด้วย AI
                </button>
              </div>
            </div>
          </div>

          {/* Lessons list */}
          <div className="rounded-2xl border border-navy-100 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-navy-100 p-4">
              <div>
                <div className="text-sm font-bold text-navy-900">บทเรียน</div>
                <div className="text-[11px] text-navy-500">
                  {course.lessons.length} บท · รวม{" "}
                  {Math.round(course.totalMinutes / 60)} ชม. {course.totalMinutes % 60} นาที
                </div>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800">
                <Plus className="h-3.5 w-3.5" />
                เพิ่มบท
              </button>
            </div>
            <div className="divide-y divide-navy-50">
              {course.lessons.map((l, i) => (
                <LessonRow key={l.id} lesson={l} index={i} />
              ))}
            </div>
          </div>

          {/* Course meta */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-navy-900">
              <Pencil className="h-4 w-4 text-gold-600" />
              ข้อมูลหลักสูตร
            </div>
            <div className="space-y-3">
              <Field label="ชื่อหลักสูตร" value={course.title} />
              <Field label="คำโปรย" value={course.subtitle} />
              <Field label="คำอธิบาย" value={course.description} multiline />
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="หมวดหมู่" value={course.category} />
                <Field label="ระดับ" value={course.level} />
                <Field label="XP เมื่อเรียนจบ" value={course.parolePoints ? `+${course.parolePoints}` : "—"} />
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-navy-900">
              <Trophy className="h-4 w-4 text-gold-600" />
              สิ่งที่ผู้เรียนจะได้
            </div>
            <ul className="space-y-1.5">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: settings + related knowledge */}
        <div className="space-y-5">
          {/* Cover */}
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
            <div className={clsx("relative aspect-video overflow-hidden bg-gradient-to-br", course.color)}>
              <img src={course.image} alt="" className="h-full w-full object-cover" />
              <button className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900 backdrop-blur hover:bg-white">
                <Pencil className="h-3 w-3" />
                เปลี่ยนรูป
              </button>
            </div>
            <div className="p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-navy-500">
                Cover image
              </div>
              <div className="mt-1 break-all font-mono text-[10px] text-navy-500">
                {course.image.slice(0, 60)}...
              </div>
            </div>
          </div>

          {/* Certificate settings */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-navy-900">
              <Award className="h-4 w-4 text-gold-600" />
              วุฒิบัตร
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-navy-500">รับรองโดย</span>
                <span className="font-semibold text-navy-900">
                  {course.certifyingBody ?? "กรมราชทัณฑ์"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Template</span>
                <span className="rounded-full bg-navy-100 px-2 py-0.5 font-medium text-navy-700">
                  {course.certificateTemplate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">ชั่วโมง</span>
                <span className="font-semibold text-navy-900">
                  {Math.round(course.totalMinutes / 60)} ชม.
                </span>
              </div>
            </div>
            <button className="mt-3 w-full rounded-lg border border-navy-200 bg-white py-1.5 text-[11px] font-medium text-navy-700 hover:bg-navy-50">
              ดูตัวอย่างวุฒิบัตร
            </button>
          </div>

          {/* Related knowledge */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-navy-900">
              <Database className="h-4 w-4 text-gold-600" />
              องค์ความรู้ที่เกี่ยวข้อง
            </div>
            <div className="text-[11px] text-navy-500">
              {relatedItems.length} เอกสารจากคลังความรู้ — Corry จัดอันดับอัตโนมัติ
            </div>
            <div className="mt-3 space-y-2">
              {relatedItems.map((it) => (
                <div
                  key={it!.id}
                  className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50/40 p-2.5"
                >
                  <FileText className="h-3.5 w-3.5 flex-shrink-0 text-navy-500" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium text-navy-900">
                      {it!.title}
                    </div>
                    <div className="text-[10px] text-navy-500">{it!.category}</div>
                  </div>
                </div>
              ))}
              {relatedItems.length === 0 && (
                <div className="rounded-lg border border-dashed border-navy-200 p-3 text-center text-[11px] text-navy-500">
                  ยังไม่ได้เลือกเอกสาร
                </div>
              )}
            </div>
            <button className="mt-3 w-full rounded-lg border border-navy-200 bg-white py-1.5 text-[11px] font-medium text-navy-700 hover:bg-navy-50">
              + เพิ่มจากคลังความรู้
            </button>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              Danger Zone
            </div>
            <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-300 bg-white px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-100">
              <Trash2 className="h-3.5 w-3.5" />
              ลบหลักสูตร
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonRow({ lesson, index }: { lesson: Lesson; index: number }) {
  const Icon = KIND_ICON[lesson.kind];
  return (
    <div className="group flex items-center gap-3 px-4 py-3 hover:bg-navy-50/30">
      <button className="flex-shrink-0 rounded-lg p-1 text-navy-300 hover:bg-navy-100 hover:text-navy-700">
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy-100 text-xs font-bold text-navy-700">
        {index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-navy-900">{lesson.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-navy-500">
          <span className="inline-flex items-center gap-0.5">
            <Icon className="h-3 w-3" />
            {KIND_LABEL[lesson.kind]}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            {lesson.duration}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
        <button className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-100 hover:text-navy-900">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-lg p-1.5 text-navy-500 hover:bg-rose-100 hover:text-rose-700">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  color = "text-navy-900",
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-navy-500">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className={clsx("mt-1 text-2xl font-bold", color)}>{value}</div>
    </div>
  );
}

function Field({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-navy-500">{label}</div>
      {multiline ? (
        <div className="mt-1 rounded-lg border border-navy-200 bg-navy-50/40 px-3 py-2 text-xs leading-relaxed text-navy-800">
          {value}
        </div>
      ) : (
        <div className="mt-0.5 text-sm font-medium text-navy-900">{value}</div>
      )}
    </div>
  );
}
