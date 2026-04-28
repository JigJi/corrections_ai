"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Volume2,
  Clock,
  RotateCcw,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_COURSES } from "@/lib/lmsData";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const GENERIC_QUIZ_BUILDER = (course: { title: string; category: string }): Question[] => [
  {
    id: "g1",
    text: `จุดประสงค์หลักของหลักสูตร "${course.title}" คืออะไร?`,
    options: [
      "เพื่อให้ผู้เรียนสามารถนำความรู้ไปใช้ในชีวิตจริงและประกอบอาชีพได้",
      "เพื่อความบันเทิงเท่านั้น",
      "เพื่อให้ครบกฎหมาย",
      "เพื่อใช้เวลาว่าง",
    ],
    correctIndex: 0,
    explanation:
      "ทุกหลักสูตรในระบบมีเป้าหมายให้ผู้เรียนนำไปใช้ได้จริง ทั้งในชีวิตประจำวันและการประกอบอาชีพ",
  },
  {
    id: "g2",
    text: "เมื่อเรียนแล้วไม่เข้าใจ ควรทำอย่างไรเป็นอันดับแรก?",
    options: [
      "ข้ามไปบทถัดไปเลย",
      "ทบทวนและถาม Corry-Edu ผู้ช่วยสอน",
      "เลิกเรียน",
      "ทำแบบทดสอบไปก่อน",
    ],
    correctIndex: 1,
    explanation:
      "Corry-Edu สามารถอธิบายเนื้อหาในมุมที่เข้าใจง่าย และให้ตัวอย่างเพิ่มเติม — ใช้ปุ่ม “ถาม Corry” มุมขวาล่างได้ตลอด",
  },
  {
    id: "g3",
    text: "การฝึกปฏิบัติซ้ำ ๆ มีผลอย่างไรต่อทักษะ?",
    options: [
      "ไม่มีผล ทักษะเกิดจากพรสวรรค์",
      "ทำให้ทักษะแข็งแรงและคงทนกว่าการเรียนแบบทฤษฎีอย่างเดียว",
      "ทำให้สับสน",
      "เสียเวลา",
    ],
    correctIndex: 1,
    explanation:
      "การฝึกซ้ำคือกุญแจของการเรียนรู้ทักษะ — ยิ่งฝึกบ่อย ยิ่งแม่นและทำได้เร็วขึ้น",
  },
  {
    id: "g4",
    text: "วุฒิบัตรที่ได้จากระบบนี้สามารถใช้ทำอะไรได้?",
    options: [
      "ใช้แทนเงินสด",
      "ใช้เป็นหลักฐานสมัครงานและรับรองทักษะ",
      "ใช้ขึ้นเครื่องบิน",
      "ไม่มีค่า",
    ],
    correctIndex: 1,
    explanation:
      "วุฒิบัตรในระบบเชื่อมต่อกรมพัฒนาฝีมือแรงงาน — ใช้เป็นหลักฐานทักษะอาชีพในการสมัครงานได้",
  },
  {
    id: "g5",
    text: "หากต้องการต่อยอดความรู้ในเรื่องนี้ ควรทำอย่างไร?",
    options: [
      "หยุดเรียนเมื่อจบ",
      "เรียนต่อหลักสูตรที่เกี่ยวข้อง + ฝึกปฏิบัติจริง + ปรึกษา Corry",
      "ลืมไปเสีย",
      "เริ่มใหม่จากศูนย์",
    ],
    correctIndex: 1,
    explanation:
      "การเรียนรู้ตลอดชีวิตคือสิ่งสำคัญ — ระบบจะแนะนำหลักสูตรที่เกี่ยวข้องเพิ่มเติมตาม progress ของคุณ",
  },
];

const SAMPLE_QUIZ: Record<string, Question[]> = {
  ic1: [
    {
      id: "q1",
      text: "ทำไมต้องร่อนแป้งก่อนผสม?",
      options: [
        "เพื่อให้แป้งดูสวย",
        "เพื่อขจัดสิ่งสกปรกและทำให้แป้งฟู",
        "เพื่อลดน้ำหนักแป้ง",
        "ไม่จำเป็นต้องร่อน",
      ],
      correctIndex: 1,
      explanation: "การร่อนแป้งช่วยขจัดก้อนแป้งและสิ่งสกปรก ทั้งยังเพิ่มอากาศให้แป้งฟูขึ้นเมื่ออบ",
    },
    {
      id: "q2",
      text: "อุณหภูมิเตาอบเหมาะสำหรับขนมปังโฮลวีทคือ?",
      options: ["100°C", "150°C", "180-200°C", "250°C"],
      correctIndex: 2,
      explanation: "ขนมปังต้องการความร้อน 180-200°C เพื่อให้ผิวกรอบและเนื้อในนุ่ม",
    },
    {
      id: "q3",
      text: "ถ้าขนมปังไม่ขึ้นฟู สาเหตุที่พบบ่อยคือ?",
      options: [
        "ยีสต์หมดอายุ หรือใช้น้ำร้อนเกินไปทำให้ยีสต์ตาย",
        "ใช้แป้งน้อยเกินไป",
        "ไม่ได้ใส่น้ำตาล",
        "อบนานเกินไป",
      ],
      correctIndex: 0,
      explanation: "ยีสต์เป็นจุลินทรีย์ที่ตายเมื่อโดนน้ำร้อนเกิน 50°C ใช้น้ำอุ่น 35-40°C จะปลอดภัย",
    },
    {
      id: "q4",
      text: "ต้นทุนต่อชิ้น = ?",
      options: [
        "ราคาขาย ÷ จำนวนที่ทำ",
        "(วัตถุดิบ + ค่าแก๊ส + ค่าบรรจุภัณฑ์) ÷ จำนวนที่ทำ",
        "วัตถุดิบ × 2",
        "ราคาขายลบกำไร",
      ],
      correctIndex: 1,
      explanation: "ต้นทุนต่อชิ้นต้องรวมต้นทุนทั้งหมดที่ใช้ (วัตถุดิบ พลังงาน บรรจุภัณฑ์) แล้วหารจำนวนที่ผลิตได้",
    },
    {
      id: "q5",
      text: "ราคาขายควรตั้งอย่างไร?",
      options: [
        "ต้นทุน × 1.5 ถึง 2 เท่า",
        "ต้นทุน + 5 บาท",
        "เท่ากับต้นทุน",
        "ตามใจชอบ",
      ],
      correctIndex: 0,
      explanation: "หลักทั่วไปคือบวกกำไร 50-100% เพื่อให้ครอบคลุมค่าใช้จ่ายอื่นและมีกำไรเหลือ",
    },
  ],
};

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = INMATE_COURSES.find((c) => c.id === id);
  const questions =
    SAMPLE_QUIZ[id] ?? (course ? GENERIC_QUIZ_BUILDER(course) : SAMPLE_QUIZ.ic1);

  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!course)
    return (
      <div className="px-6 py-12 text-center">
        <Link href="/inmate/courses">กลับ</Link>
      </div>
    );

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const correctCount = questions.filter((qq) => answers[qq.id] === qq.correctIndex).length;
  const passed = correctCount >= Math.ceil(questions.length * 0.6);
  const earnedPoints = passed ? course.parolePoints ?? 10 : 0;

  function pickAnswer(idx: number) {
    if (showFeedback) return;
    setSelected(idx);
    setAnswers((a) => ({ ...a, [q.id]: idx }));
    setShowFeedback(true);
  }

  function next() {
    setShowFeedback(false);
    setSelected(null);
    if (isLast) setStep("result");
    else setCurrent((c) => c + 1);
  }

  function restart() {
    setStep("quiz");
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setShowFeedback(false);
  }

  if (step === "result") {
    return (
      <div className="flex min-h-[640px] flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg rounded-3xl border-2 border-navy-100 bg-white p-8 text-center shadow-md">
          <div
            className={clsx(
              "mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl shadow-lg",
              passed ? "bg-emerald-100" : "bg-amber-100"
            )}
          >
            {passed ? "🎉" : "💪"}
          </div>
          <div className="mt-4 text-[11px] uppercase tracking-widest text-navy-500">
            ผลแบบทดสอบ
          </div>
          <h1 className="mt-1 text-3xl font-bold text-navy-900">
            {passed ? "ผ่านแล้ว ยอดเยี่ยม!" : "ลองอีกครั้งนะครับ"}
          </h1>
          <div className="mt-2 text-sm text-navy-600">
            ตอบถูก{" "}
            <span className="text-2xl font-bold text-navy-900">{correctCount}</span>
            <span className="text-navy-500"> / {questions.length} ข้อ</span>
          </div>

          {passed && (
            <div className="mt-6 rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-gold-50 to-white p-5">
              <div className="flex items-center justify-center gap-2 text-gold-700">
                <Trophy className="h-5 w-5" />
                <div className="text-sm font-bold">ได้รับ XP แล้ว!</div>
              </div>
              <div className="mt-2 text-4xl font-bold text-navy-900">
                +{earnedPoints} <span className="text-base">XP</span>
              </div>
              <div className="mt-1 text-[11px] text-navy-600">
                เก่งมาก! เรียนต่อเพื่อเลื่อน Level
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={restart}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-navy-200 bg-white py-3 text-sm font-bold text-navy-700 hover:bg-navy-50"
            >
              <RotateCcw className="h-4 w-4" />
              ทำใหม่
            </button>
            {passed ? (
              <Link
                href={`/inmate/certificate/cert-${course.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700"
              >
                ดูวุฒิบัตร →
              </Link>
            ) : (
              <Link
                href={`/inmate/learn/${course.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-navy-900 py-3 text-sm font-bold text-white shadow-md hover:bg-navy-800"
              >
                ทบทวนบทเรียน
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-5">
      <Link
        href={`/inmate/learn/${course.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับไปบทเรียน
      </Link>

      <div className="mx-auto mt-4 max-w-3xl">
        {/* Progress + AI badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-gold-300 bg-gold-50 px-3 py-1 text-[11px] font-bold text-gold-800">
            <Sparkles className="h-3.5 w-3.5" />
            แบบทดสอบนี้สร้างโดย Corry-Edu จากเนื้อหาคอร์ส
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-600">
            <Clock className="h-3.5 w-3.5" />
            ข้อ {current + 1} / {questions.length}
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-navy-100">
          <div
            className={clsx("h-full bg-gradient-to-r transition-all", course.color)}
            style={{ width: `${((current + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mt-6 rounded-3xl border-2 border-navy-100 bg-white p-7 shadow-md">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
            คำถามที่ {current + 1}
          </div>
          <div className="mt-2 flex items-start gap-3">
            <h2 className="flex-1 text-2xl font-bold leading-tight text-navy-900">
              {q.text}
            </h2>
            <button className="flex-shrink-0 rounded-full border-2 border-gold-200 bg-gold-50 p-2 text-gold-700 hover:bg-gold-100">
              <Volume2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correctIndex;
              const showRightWrong = showFeedback;
              return (
                <button
                  key={i}
                  onClick={() => pickAnswer(i)}
                  disabled={showFeedback}
                  className={clsx(
                    "flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition",
                    showRightWrong
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : isSelected
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-navy-100 bg-white text-navy-400"
                      : isSelected
                      ? "border-navy-900 bg-navy-50 text-navy-900"
                      : "border-navy-200 bg-white text-navy-800 hover:border-navy-400 hover:bg-navy-50/50"
                  )}
                >
                  <div
                    className={clsx(
                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      showRightWrong && isCorrect
                        ? "bg-emerald-500 text-white"
                        : showRightWrong && isSelected && !isCorrect
                        ? "bg-rose-500 text-white"
                        : "bg-navy-100 text-navy-700"
                    )}
                  >
                    {showRightWrong && isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : showRightWrong && isSelected && !isCorrect ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </div>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-5 rounded-2xl border-2 border-navy-100 bg-gradient-to-r from-gold-50/50 to-white p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div className="flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
                    Corry อธิบาย
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-navy-800">
                    {q.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={next}
              disabled={!showFeedback}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-30"
            >
              {isLast ? "ดูผลคะแนน →" : "ข้อถัดไป →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
