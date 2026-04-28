"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Headphones,
  MousePointer2,
  HelpCircle,
  Send,
  Sparkles,
  Volume2,
  Trophy,
  Pause,
  Play,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_COURSES, TUTOR_SUGGESTIONS_INMATE, type Lesson } from "@/lib/lmsData";
import { RelatedKnowledge } from "@/components/RelatedKnowledge";

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

export default function InmateCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = INMATE_COURSES.find((c) => c.id === id);
  const [activeIdx, setActiveIdx] = useState(
    course ? Math.max(0, course.lessons.findIndex((l) => !l.completed)) : 0
  );
  const [tutorOpen, setTutorOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (!course) {
    return (
      <div className="px-6 py-12 text-center text-sm text-navy-500">
        ไม่พบคอร์ส{" "}
        <Link href="/inmate/courses" className="text-navy-700 hover:underline">
          กลับ
        </Link>
      </div>
    );
  }

  const lesson = course.lessons[activeIdx];
  const completedCount = course.lessons.filter((l) => l.completed).length;
  const isQuiz = lesson.kind === "quiz";

  return (
    <div className="relative">
      <div className="space-y-4 px-5 py-5">
        {/* Back */}
        <Link
          href="/inmate/courses"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับ
        </Link>

        {/* Course header */}
        <div
          className={clsx(
            "relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-md",
            course.color
          )}
        >
          <img
            src={course.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className={clsx("absolute inset-0 bg-gradient-to-br opacity-85", course.color)} />
          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 text-5xl backdrop-blur">
            {course.cover}
          </div>
          <div className="relative flex-1">
            <div className="text-[10px] uppercase tracking-widest text-white/80">
              {course.category}
            </div>
            <div className="text-xl font-bold">{course.title}</div>
            <div className="text-xs text-white/80">{course.subtitle}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
              {course.parolePoints && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 font-bold backdrop-blur">
                  <Trophy className="h-3 w-3" />
                  +{course.parolePoints} XP เมื่อจบ
                </span>
              )}
              <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">
                เรียนจบ {completedCount}/{course.lessons.length} บท
              </span>
            </div>
          </div>
        </div>

        {/* Lesson player */}
        <div className="overflow-hidden rounded-3xl border-2 border-navy-100 bg-white shadow-md">
          {/* Big video area */}
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
            {/* Thumbnail look */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 0), radial-gradient(circle at 70% 70%, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }} />
            <div className="relative text-center">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25 active:scale-95"
              >
                {playing ? <Pause className="h-10 w-10" /> : <Play className="ml-1 h-10 w-10" />}
              </button>
              <div className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                บทที่ {activeIdx + 1} · {KIND_LABEL[lesson.kind]} · {lesson.duration}
              </div>
              <div className="mt-1 px-6 text-2xl font-bold">{lesson.title}</div>
            </div>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur">
              ▷ Demo: เนื้อหาวิดีโอจะแสดงที่นี่
            </div>
          </div>

          {/* Controls — BIG buttons for kiosk */}
          <div className="grid grid-cols-3 items-center gap-3 border-t-2 border-navy-100 bg-white p-4">
            <button
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              className="rounded-2xl border-2 border-navy-200 bg-white px-4 py-3 text-base font-bold text-navy-700 transition hover:bg-navy-50 disabled:opacity-30"
            >
              ← บทก่อน
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-100 px-4 py-3 text-sm font-semibold text-gold-800 transition hover:bg-gold-200">
              <Volume2 className="h-4 w-4" />
              อ่านออกเสียง
            </button>
            <button
              onClick={() => {
                if (isQuiz) {
                  window.location.href = `/inmate/learn/${course.id}/quiz`;
                } else {
                  setActiveIdx((i) => Math.min(course.lessons.length - 1, i + 1));
                }
              }}
              className="rounded-2xl bg-emerald-600 px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.98]"
            >
              {isQuiz ? "ทำแบบทดสอบ →" : "บทถัดไป →"}
            </button>
          </div>
        </div>

        {/* Lesson list — outline */}
        <div className="overflow-hidden rounded-3xl border-2 border-navy-100 bg-white shadow-soft">
          <div className="border-b border-navy-100 bg-gradient-to-r from-navy-50 to-white px-5 py-3">
            <div className="text-base font-bold text-navy-900">บทเรียนทั้งหมด</div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-navy-100">
              <div
                className={clsx("h-full bg-gradient-to-r", course.color)}
                style={{ width: `${course.progress ?? 0}%` }}
              />
            </div>
          </div>
          <div>
            {course.lessons.map((l, i) => (
              <BigLessonRow
                key={l.id}
                lesson={l}
                index={i}
                active={i === activeIdx}
                color={course.color}
                onClick={() => setActiveIdx(i)}
                last={i === course.lessons.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Related Knowledge from คลังความรู้ */}
        {course.relatedKnowledge && course.relatedKnowledge.length > 0 && (
          <RelatedKnowledge ids={course.relatedKnowledge} variant="kiosk" />
        )}
      </div>

      {/* Corry-Edu tutor — toggleable, anchored to kiosk frame */}
      {tutorOpen ? (
        <CorryEduTutor
          course={course.title}
          lesson={lesson.title}
          courseId={course.id}
          onClose={() => setTutorOpen(false)}
        />
      ) : (
        <button
          onClick={() => setTutorOpen(true)}
          className="absolute bottom-5 right-5 z-30 flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-600 to-gold-700 py-3 pl-3 pr-5 text-white shadow-2xl ring-4 ring-gold-300/50 transition hover:scale-105 active:scale-95"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white ring-2 ring-white">
            <Image src="/corry.png" alt="Corry" fill sizes="36px" className="object-cover" />
          </span>
          <span className="leading-tight text-left">
            <span className="block text-[10px] font-medium uppercase tracking-wider text-gold-100">
              ผู้ช่วยสอน
            </span>
            <span className="block text-sm font-bold">ถาม Corry-Edu</span>
          </span>
        </button>
      )}
    </div>
  );
}

function BigLessonRow({
  lesson,
  index,
  active,
  color,
  onClick,
  last,
}: {
  lesson: Lesson;
  index: number;
  active: boolean;
  color: string;
  onClick: () => void;
  last: boolean;
}) {
  const Icon = KIND_ICON[lesson.kind];
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-4 px-5 py-3.5 text-left transition",
        !last && "border-b border-navy-50",
        active ? "bg-gold-50/50" : "hover:bg-navy-50/40"
      )}
    >
      <div className="flex-shrink-0">
        {lesson.completed ? (
          <div className={clsx("flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-white", color)}>
            <CheckCircle2 className="h-5 w-5" />
          </div>
        ) : active ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white">
            <PlayCircle className="h-5 w-5" />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-200 bg-white text-sm font-bold text-navy-400">
            {index + 1}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={clsx(
            "text-base",
            active ? "font-bold text-navy-900" : lesson.completed ? "font-medium text-navy-700" : "font-medium text-navy-700"
          )}
        >
          {lesson.title}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-navy-500">
          <Icon className="h-3 w-3" />
          {KIND_LABEL[lesson.kind]} · {lesson.duration}
        </div>
      </div>
      {active && <ChevronRight className="h-5 w-5 text-navy-400" />}
    </button>
  );
}

function CorryEduTutor({
  course,
  lesson,
  courseId,
  onClose,
}: {
  course: string;
  lesson: string;
  courseId: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: `สวัสดีครับ! ผมคือ Corry-Edu ผู้ช่วยเรียนของคุณ\n\nกำลังเรียนเรื่อง "${lesson}" อยู่ใช่มั้ยครับ?\nถามอะไรก็ได้นะ ผมอธิบายให้ฟังแบบง่ายๆ`,
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "ai",
        text:
          courseId === "ic1"
            ? `ขั้นตอนการตีไข่ก่อนผสมแป้ง สำคัญเพราะ:\n\n1. ไข่จะเข้ากันดีกับน้ำตาล\n2. แป้งจะไม่จับตัวเป็นก้อน\n3. เนื้อขนมจะนุ่มฟู\n\nลองคิดเหมือนเวลาเราตีน้ำกับน้ำมันให้เข้ากันก่อน ค่อยใส่อย่างอื่น 👍\n\nมีอะไรอยากถามเพิ่มไหมครับ?`
            : `ผมจะอธิบายให้ฟังแบบง่ายๆ นะครับ:\n\nเรื่องนี้สำคัญเพราะนำไปใช้ได้จริงในชีวิตประจำวัน และช่วยให้สมัครงานได้ง่ายขึ้น\n\nถ้าตรงไหนยังไม่เข้าใจ บอกผมได้นะครับ — ผมจะหาตัวอย่างเพิ่มให้`,
      },
    ]);
    setInput("");
  }

  const suggestions =
    TUTOR_SUGGESTIONS_INMATE[courseId] ?? TUTOR_SUGGESTIONS_INMATE.default;

  return (
    <aside className="absolute bottom-5 right-5 z-30 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border-2 border-gold-200 bg-gradient-to-br from-white to-gold-50/30 shadow-2xl animate-fade-in">
      <div className="flex items-center gap-2.5 border-b border-gold-200 bg-gradient-to-r from-gold-50 to-white px-3 py-2.5">
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white ring-2 ring-gold-400">
          <Image src="/corry.png" alt="Corry-Edu" fill sizes="36px" className="object-cover" />
        </div>
        <div className="flex-1 leading-tight">
          <div className="flex items-center gap-1 text-sm font-bold text-navy-900">
            Corry-Edu
            <Sparkles className="h-3 w-3 text-gold-500" />
          </div>
          <div className="text-[10px] text-navy-500">ผู้ช่วยตอบคำถาม</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-navy-500 hover:bg-navy-100 hover:text-navy-900"
          title="ปิด"
        >
          ✕
        </button>
        <div className="hidden">
          ● พร้อม
        </div>
      </div>

      <div className="flex-1 space-y-2.5 overflow-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={clsx("flex gap-1.5", m.role === "user" ? "justify-end" : "justify-start")}
          >
            {m.role === "ai" && (
              <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold-300">
                <Image src="/corry.png" alt="" fill sizes="24px" className="object-cover" />
              </div>
            )}
            <div
              className={clsx(
                "max-w-[240px] whitespace-pre-line rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                m.role === "user"
                  ? "rounded-br-sm bg-navy-900 text-white"
                  : "rounded-bl-sm border border-navy-100 bg-white text-navy-800 shadow-soft"
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-navy-100 bg-white p-2.5">
        <div className="mb-2 flex flex-wrap gap-1">
          {suggestions.slice(0, 3).map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-gold-200 bg-gold-50 px-2 py-0.5 text-[10px] font-medium text-gold-800 hover:bg-gold-100"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ถาม Corry..."
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-navy-300"
          />
          <button
            type="submit"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-white hover:bg-navy-800"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
}
