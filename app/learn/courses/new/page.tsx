"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Save,
  Check,
  Loader2,
  PlayCircle,
  FileText,
  Headphones,
  MousePointer2,
  HelpCircle,
  Image as ImageIcon,
  Database,
  GripVertical,
  Lightbulb,
  X,
  Eye,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";
import { MOCK_ITEMS } from "@/lib/mockData";
import { findSuggestion } from "@/lib/courseSuggestions";

// =============== Suggestion banks ===============

interface Suggestion<T> {
  id: string;
  value: T;
  reasoning?: string;
}

interface LessonDraft {
  title: string;
  kind: "video" | "reading" | "audio" | "interactive" | "quiz";
  duration: string;
}

// Topic-aware suggestion engine (mock)
function pickTopicProfile(title: string) {
  const t = title.toLowerCase();
  if (t.includes("เบเกอรี่") || t.includes("ขนม") || t.includes("ปัง")) return "bakery";
  if (t.includes("ตัดผม") || t.includes("บาร์เบอร์") || t.includes("ช่างผม")) return "barber";
  if (t.includes("ช่างไฟ") || t.includes("ไฟฟ้า")) return "electrician";
  if (t.includes("กาแฟ") || t.includes("บาริสต้า")) return "barista";
  if (t.includes("เกษตร") || t.includes("ผัก") || t.includes("ปลูก")) return "farming";
  if (t.includes("ภาษาอังกฤษ") || t.includes("english")) return "english";
  if (t.includes("คอม") || t.includes("คอมพิวเตอร์") || t.includes("it")) return "computer";
  if (t.includes("ความโกรธ") || t.includes("อารมณ์") || t.includes("เครียด")) return "emotion";
  return "generic";
}

const SUBTITLE_BANK: Record<string, string[]> = {
  bakery: [
    "เริ่มจากศูนย์ ทำขนมปัง คุกกี้ เค้ก ได้ใน 5 ชั่วโมง",
    "หลักสูตรช่างเบเกอรี่มาตรฐานกรมพัฒนาฝีมือแรงงาน ระดับ 1",
    "เรียนทำเบเกอรี่ครบทุกขั้น พร้อมคำนวณต้นทุนและการตลาด",
  ],
  barber: [
    "เริ่มจากศูนย์ ตัดผมเป็นใน 30 ชั่วโมง พร้อมเปิดร้านเอง",
    "หลักสูตรช่างตัดผมมาตรฐานกรมพัฒนาฝีมือแรงงาน ระดับ 1",
    "ทักษะตัดผมชาย 5 ทรง + การให้บริการลูกค้า",
  ],
  electrician: [
    "เดินสายไฟ ติดตั้งสวิตช์ ปลั๊ก ระบบแสงสว่างภายในอาคาร",
    "ช่างไฟฟ้าระดับ 1 มีวุฒิบัตร ใช้สมัครงานช่างได้ทันที",
    "พื้นฐานทางไฟฟ้า + ความปลอดภัย + ปฏิบัติติดตั้งจริง",
  ],
  barista: [
    "เรียนทำกาแฟดริป Espresso Latte ได้ในหลักสูตรเดียว",
    "บาริสต้าเริ่มต้น พร้อมเปิดร้านกาแฟของตัวเอง",
    "หลักการสกัดกาแฟ การใช้เครื่อง การให้บริการ",
  ],
  farming: [
    "ปลูกผักสวนครัว ขยายเป็นเกษตรอินทรีย์เชิงพาณิชย์",
    "ปลูกเอง กินเอง ขายได้ พร้อมคำนวณต้นทุน",
    "เกษตรอินทรีย์มาตรฐาน รับรองโดยกรมส่งเสริมการเกษตร",
  ],
  english: [
    "ภาษาอังกฤษเพื่อสมัครงาน ครอบคลุม resume + interview",
    "พื้นฐานภาษาอังกฤษ ฟัง พูด อ่าน เขียน",
    "ภาษาอังกฤษในชีวิตประจำวัน + การทำงาน",
  ],
  computer: [
    "พื้นฐานคอมพิวเตอร์และอินเทอร์เน็ต พร้อมใช้สมัครงาน",
    "Microsoft Office (Word Excel) สำหรับงานสำนักงาน",
    "การใช้คอมพิวเตอร์ในชีวิตจริง + ป้องกันการหลอกออนไลน์",
  ],
  emotion: [
    "ทักษะรับมือกับความโกรธและเครียด ผ่านเทคนิคหายใจและคิดเชิงบวก",
    "การจัดการอารมณ์เพื่อลดความขัดแย้งและการกระทำผิดซ้ำ",
    "เข้าใจตัวเอง ปรับสมดุลอารมณ์ในสถานการณ์กดดัน",
  ],
  generic: [
    "หลักสูตรเริ่มต้น เหมาะสำหรับมือใหม่ ใช้งานได้จริง",
    "เรียนรู้แบบเป็นขั้นตอน พร้อมแบบฝึกหัด",
    "พื้นฐานครบ พร้อมวุฒิบัตรเมื่อเรียนจบ",
  ],
};

const OUTCOMES_BANK: Record<string, string[]> = {
  bakery: [
    "ทำขนมปังพื้นฐานได้ 5 ชนิด",
    "เข้าใจสัดส่วนวัตถุดิบและอุณหภูมิเตาอบ",
    "คำนวณต้นทุนและตั้งราคาขายได้",
    "วางแผนเปิดร้านเบเกอรี่ขนาดเล็ก",
    "ใช้เครื่องมือเบเกอรี่ได้ปลอดภัย",
  ],
  barber: [
    "ตัดผมทรงพื้นฐาน 5 ทรงได้",
    "โกนหนวด-เคราอย่างมืออาชีพ",
    "ใช้และดูแลเครื่องมือตัดผม",
    "ให้บริการลูกค้าและสร้างความประทับใจ",
    "วางแผนเปิดร้านตัดผมขนาดเล็ก",
  ],
  electrician: [
    "เดินสายไฟภายในอาคารได้",
    "ติดตั้งสวิตช์ ปลั๊ก ระบบแสงสว่าง",
    "เข้าใจมาตรฐานความปลอดภัยทางไฟฟ้า",
    "อ่านแบบไฟฟ้าเบื้องต้น",
    "แก้ไขปัญหาไฟฟ้าทั่วไปได้",
  ],
  barista: [
    "ชงกาแฟ Espresso ได้มาตรฐาน",
    "ทำกาแฟดริปและ Pour-over",
    "ใช้เครื่องชงกาแฟและบดเมล็ดได้",
    "เข้าใจการสกัดและรสชาติของกาแฟ",
    "วางแผนเปิดร้านกาแฟ",
  ],
  farming: [
    "ปลูกผักสวนครัว 10 ชนิด",
    "ทำปุ๋ยอินทรีย์ได้เอง",
    "ป้องกันแมลงโดยไม่ใช้สารเคมี",
    "วางแผนการตลาดผลผลิต",
    "คำนวณต้นทุนและกำไร",
  ],
  english: [
    "อ่าน-เขียนภาษาอังกฤษพื้นฐานได้",
    "ทำเรซูเม่ภาษาอังกฤษ",
    "ฝึกสัมภาษณ์งานเป็นภาษาอังกฤษ",
    "สื่อสารในที่ทำงานเบื้องต้น",
    "ใช้ภาษาอังกฤษในการเดินทาง",
  ],
  computer: [
    "ใช้ Word, Excel ในงานสำนักงาน",
    "ใช้อินเทอร์เน็ตค้นหาข้อมูล",
    "ส่งอีเมลและแนบไฟล์",
    "ระวังการหลอกลวงออนไลน์",
    "ใช้ Google ค้นหาข้อมูล",
  ],
  emotion: [
    "รู้สัญญาณเตือนความโกรธ",
    "ใช้เทคนิคปรับอารมณ์ 5 วิธี",
    "แก้ปัญหาโดยไม่ใช้ความรุนแรง",
    "สื่อสารในสถานการณ์ตึงเครียด",
    "สร้างเครือข่ายสนับสนุน",
  ],
  generic: [
    "เข้าใจหลักการพื้นฐาน",
    "ปฏิบัติตามขั้นตอนได้ถูกต้อง",
    "นำไปใช้ในชีวิตจริงได้",
    "วิเคราะห์และแก้ปัญหาเบื้องต้น",
    "ต่อยอดศึกษาเพิ่มเติมได้",
  ],
};

const LESSONS_BANK: Record<string, LessonDraft[]> = {
  bakery: [
    { title: "รู้จักวัตถุดิบและอุปกรณ์", kind: "video", duration: "20 นาที" },
    { title: "ขนมปังโฮลวีท", kind: "video", duration: "35 นาที" },
    { title: "คุกกี้ช็อกโกแลตชิป", kind: "video", duration: "25 นาที" },
    { title: "เค้กวันเกิด", kind: "video", duration: "45 นาที" },
    { title: "โดนัท", kind: "video", duration: "30 นาที" },
    { title: "การคำนวณต้นทุน", kind: "interactive", duration: "20 นาที" },
    { title: "การตลาดสำหรับร้านเล็ก", kind: "reading", duration: "30 นาที" },
    { title: "แบบทดสอบ + ส่งภาพผลงาน", kind: "quiz", duration: "35 นาที" },
  ],
  barber: [
    { title: "เครื่องมือบาร์เบอร์", kind: "video", duration: "20 นาที" },
    { title: "ทรงผมพื้นฐาน 5 แบบ", kind: "video", duration: "60 นาที" },
    { title: "เทคนิคการใช้ปัตตาเลี่ยน", kind: "video", duration: "40 นาที" },
    { title: "การโกนหนวด", kind: "video", duration: "30 นาที" },
    { title: "การให้บริการลูกค้า", kind: "interactive", duration: "30 นาที" },
    { title: "การเปิดร้านเล็ก", kind: "reading", duration: "60 นาที" },
    { title: "ฝึกปฏิบัติ + ส่งภาพผลงาน", kind: "quiz", duration: "60 นาที" },
  ],
  electrician: [
    { title: "ความรู้พื้นฐานทางไฟฟ้า", kind: "video", duration: "30 นาที" },
    { title: "เครื่องมือช่างไฟ", kind: "video", duration: "20 นาที" },
    { title: "การเดินสายไฟ", kind: "video", duration: "60 นาที" },
    { title: "ติดตั้งสวิตช์และปลั๊ก", kind: "video", duration: "45 นาที" },
    { title: "ระบบแสงสว่าง", kind: "video", duration: "40 นาที" },
    { title: "ความปลอดภัยทางไฟฟ้า", kind: "interactive", duration: "30 นาที" },
    { title: "ปฏิบัติ: ติดตั้งวงจร", kind: "interactive", duration: "90 นาที" },
    { title: "สอบทฤษฎี + ปฏิบัติ", kind: "quiz", duration: "45 นาที" },
  ],
  barista: [
    { title: "พื้นฐานเมล็ดกาแฟและการคั่ว", kind: "video", duration: "20 นาที" },
    { title: "การบดและสกัด", kind: "video", duration: "30 นาที" },
    { title: "Espresso พื้นฐาน", kind: "video", duration: "40 นาที" },
    { title: "Latte Art", kind: "video", duration: "30 นาที" },
    { title: "Pour-over และ Drip", kind: "video", duration: "30 นาที" },
    { title: "การให้บริการในร้าน", kind: "interactive", duration: "30 นาที" },
    { title: "วางแผนเปิดร้าน", kind: "reading", duration: "30 นาที" },
    { title: "แบบทดสอบ", kind: "quiz", duration: "20 นาที" },
  ],
  farming: [
    { title: "เลือกพื้นที่และเตรียมดิน", kind: "video", duration: "25 นาที" },
    { title: "เพาะกล้าและปลูก", kind: "video", duration: "30 นาที" },
    { title: "ทำปุ๋ยอินทรีย์", kind: "video", duration: "20 นาที" },
    { title: "ป้องกันแมลงโดยไม่ใช้สารเคมี", kind: "video", duration: "25 นาที" },
    { title: "เก็บเกี่ยวและจัดเก็บ", kind: "video", duration: "20 นาที" },
    { title: "การตลาดเกษตรอินทรีย์", kind: "reading", duration: "30 นาที" },
    { title: "วางแผนธุรกิจเกษตร", kind: "interactive", duration: "20 นาที" },
    { title: "ทดสอบและส่งแผน", kind: "quiz", duration: "10 นาที" },
  ],
  english: [
    { title: "พยัญชนะและการออกเสียง", kind: "video", duration: "30 นาที" },
    { title: "คำศัพท์พื้นฐาน 200 คำ", kind: "interactive", duration: "60 นาที" },
    { title: "ประโยคในชีวิตประจำวัน", kind: "video", duration: "45 นาที" },
    { title: "การเขียนเรซูเม่", kind: "interactive", duration: "60 นาที" },
    { title: "ฝึกสัมภาษณ์งาน", kind: "interactive", duration: "60 นาที" },
    { title: "การฟัง + ตอบคำถาม", kind: "audio", duration: "45 นาที" },
    { title: "แบบทดสอบ", kind: "quiz", duration: "30 นาที" },
  ],
  computer: [
    { title: "เริ่มต้นใช้งานคอมพิวเตอร์", kind: "video", duration: "30 นาที" },
    { title: "Microsoft Word พื้นฐาน", kind: "video", duration: "45 นาที" },
    { title: "Excel: ตาราง + สูตร", kind: "video", duration: "60 นาที" },
    { title: "อินเทอร์เน็ตและการค้นหา", kind: "interactive", duration: "30 นาที" },
    { title: "อีเมลและการสื่อสาร", kind: "video", duration: "30 นาที" },
    { title: "ระวังการหลอกลวงออนไลน์", kind: "video", duration: "20 นาที" },
    { title: "แบบทดสอบปฏิบัติ", kind: "quiz", duration: "45 นาที" },
  ],
  emotion: [
    { title: "เข้าใจความโกรธ", kind: "video", duration: "15 นาที" },
    { title: "เทคนิคหายใจ 4-7-8", kind: "interactive", duration: "10 นาที" },
    { title: "หยุดและคิด", kind: "video", duration: "15 นาที" },
    { title: "การสื่อสารโดยไม่ใช้ความรุนแรง", kind: "video", duration: "20 นาที" },
    { title: "การจัดการความเครียดเรื้อรัง", kind: "audio", duration: "15 นาที" },
    { title: "แบบทดสอบและสะท้อนตัวเอง", kind: "quiz", duration: "15 นาที" },
  ],
  generic: [
    { title: "บทนำหลักสูตร", kind: "video", duration: "10 นาที" },
    { title: "ทฤษฎีเบื้องต้น", kind: "video", duration: "20 นาที" },
    { title: "แบบฝึกหัด", kind: "interactive", duration: "30 นาที" },
    { title: "ตัวอย่างใช้งานจริง", kind: "video", duration: "20 นาที" },
    { title: "เนื้อหาขั้นกลาง", kind: "reading", duration: "30 นาที" },
    { title: "ฝึกปฏิบัติ", kind: "interactive", duration: "30 นาที" },
    { title: "แบบทดสอบ", kind: "quiz", duration: "15 นาที" },
  ],
};

const COVER_BANK: Record<string, string[]> = {
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
    "https://images.unsplash.com/photo-1568254183919-78a4f43a2877",
  ],
  barber: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
  ],
  electrician: [
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    "https://images.unsplash.com/photo-1545486332-9e0999c535b2",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  ],
  barista: [
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247",
  ],
  farming: [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8",
  ],
  english: [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
  ],
  computer: [
    "https://images.unsplash.com/photo-1547658719-da2b51169166",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  ],
  emotion: [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    "https://images.unsplash.com/photo-1545389336-cf090694435e",
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
    "https://images.unsplash.com/photo-1529693662653-9d480530a697",
  ],
  generic: [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
  ],
};

const RELATED_BANK: Record<string, string[]> = {
  bakery: ["k10"],
  barber: ["k10"],
  electrician: ["k10"],
  barista: ["k10"],
  farming: ["k10"],
  english: ["k10", "k1"],
  computer: ["k10"],
  emotion: ["k6", "k5"],
  generic: ["k10"],
};

const SEED_PROMPTS = [
  "ตัดผมชายเบื้องต้น",
  "ทำเบเกอรี่จากศูนย์",
  "ช่างไฟฟ้าภายในอาคาร",
  "ภาษาอังกฤษเพื่อสมัครงาน",
  "ทำกาแฟดริป",
  "ปลูกผักสวนครัว",
  "Excel สำหรับงานสำนักงาน",
  "การจัดการความโกรธ",
];

const KIND_ICON = {
  video: PlayCircle,
  reading: FileText,
  audio: Headphones,
  interactive: MousePointer2,
  quiz: HelpCircle,
} as const;

const KIND_LABEL = {
  video: "วิดีโอ",
  reading: "อ่าน",
  audio: "เสียง",
  interactive: "ฝึกปฏิบัติ",
  quiz: "แบบทดสอบ",
} as const;

const CATEGORIES = [
  "ทักษะอาชีพ",
  "ความรู้พื้นฐาน",
  "ทักษะชีวิต",
  "กฎหมาย/สิทธิ",
  "บำบัด/ปรับพฤติกรรม",
];

// =============== Page ===============

export default function NewCoursePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 text-sm text-navy-500">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          กำลังโหลด...
        </div>
      }
    >
      <NewCourseForm />
    </Suspense>
  );
}

function NewCourseForm() {
  const router = useRouter();
  const params = useSearchParams();
  const draftId = params.get("id");
  const draft = draftId ? findSuggestion(draftId) : undefined;
  const seededTopic = params.get("topic") ?? "";

  const [title, setTitle] = useState(draft?.title ?? seededTopic);
  const [subtitle, setSubtitle] = useState(draft?.subtitle ?? "");
  const [category, setCategory] = useState(draft?.category ?? "ทักษะอาชีพ");
  const [level, setLevel] = useState<"พื้นฐาน" | "กลาง" | "สูง">(
    draft?.level ?? "พื้นฐาน"
  );
  const [outcomes, setOutcomes] = useState<string[]>(draft?.outcomes ?? []);
  const [lessons, setLessons] = useState<LessonDraft[]>(
    draft?.lessons.map((l) => ({ ...l })) ?? []
  );
  const [coverUrl, setCoverUrl] = useState<string>(draft?.coverUrl ?? "");
  const [relatedIds, setRelatedIds] = useState<string[]>(
    draft?.relatedKnowledgeIds ?? []
  );

  const [saving, setSaving] = useState(false);
  const [activeAssist, setActiveAssist] = useState<string | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const topic = pickTopicProfile(title);
  const totalMin = lessons.reduce(
    (s, l) => s + (parseInt(l.duration) || 0),
    0
  );

  function save() {
    if (!title.trim()) {
      setActiveAssist("title");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      router.push("/learn/courses?created=1");
    }, 1200);
  }

  // ===== Suggestion getters (rotating) =====
  function pick<T>(arr: T[], n: number, seed = shuffleKey): T[] {
    if (arr.length <= n) return arr;
    const start = (seed * 3) % arr.length;
    const out: T[] = [];
    for (let i = 0; i < n; i++) {
      out.push(arr[(start + i) % arr.length]);
    }
    return out;
  }

  const suggSubtitles = pick(SUBTITLE_BANK[topic] ?? SUBTITLE_BANK.generic, 3);
  const suggOutcomes = OUTCOMES_BANK[topic] ?? OUTCOMES_BANK.generic;
  const suggLessons = LESSONS_BANK[topic] ?? LESSONS_BANK.generic;
  const suggCovers = COVER_BANK[topic] ?? COVER_BANK.generic;
  const suggRelated = RELATED_BANK[topic] ?? RELATED_BANK.generic;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Link
          href="/learn/courses"
          className="inline-flex items-center gap-1 text-xs font-medium text-navy-500 hover:text-navy-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          กลับไปหน้าหลักสูตร
        </Link>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              {draft ? "ตรวจสอบร่างคอร์สจาก Corry" : "สร้างคอร์สใหม่"}
            </h1>
            <div className="text-sm text-navy-500">
              {draft ? (
                <>
                  Corry ร่างไว้ให้ครบแล้ว · ตรวจสอบ <strong>ปรับแก้ ลบ เพิ่ม</strong> ได้ทุกส่วน
                  ก่อนบันทึก
                </>
              ) : (
                <>
                  เจ้าหน้าที่กรอกเนื้อหา · Corry เสนอตัวเลือกให้เลือก —{" "}
                  <strong className="text-gold-700">เจ้าหน้าที่ตัดสินใจขั้นสุดท้าย</strong>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/learn/courses"
              className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              ยกเลิก
            </Link>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-navy-800 disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "กำลังบันทึก..." : "บันทึกคอร์ส"}
            </button>
          </div>
        </div>
      </div>

      {/* Corry intro banner */}
      {draft ? (
        <div className="overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-emerald-400">
              <Image src="/corry.png" alt="Corry" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex-1 text-sm">
              <div className="flex items-center gap-1.5 font-bold text-navy-900">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Corry ร่างคอร์สนี้ให้แล้ว — กรุณาตรวจสอบก่อนเผยแพร่
              </div>
              <div className="mt-1 text-xs leading-relaxed text-navy-700">
                ผมร่าง <strong>{draft.outcomes.length} outcomes · {draft.lessons.length} บทเรียน · cover image · เอกสารอ้างอิง</strong> ให้ตามเทรนด์ตลาดล่าสุด ·
                ทุกอย่างปรับ/ลบ/เพิ่มได้ — และคลิก{" "}
                <span className="inline-flex items-center gap-0.5 rounded-full border border-gold-300 bg-gold-50 px-1.5 text-[10px] font-bold text-gold-800">
                  <Sparkles className="h-2.5 w-2.5" /> ✨ ช่วย
                </span>{" "}
                เพื่อขอตัวเลือกอื่นเพิ่ม
              </div>
            </div>
            <Link
              href="/learn/courses/new"
              className="rounded-full border border-navy-200 bg-white px-3 py-1.5 text-[11px] font-medium text-navy-700 hover:bg-navy-50"
            >
              ล้างร่าง
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-r from-gold-50 via-white to-gold-50 p-4">
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-gold-300">
              <Image src="/corry.png" alt="Corry" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex-1 text-sm">
              <div className="font-bold text-navy-900">
                สวัสดีครับ ผม Corry — ผู้ช่วยสร้างคอร์สของคุณ
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-navy-700">
                ลองเริ่มจากการพิมพ์ <strong>ชื่อคอร์ส</strong> ก่อน แล้วผมจะแนะนำ
                <strong> คำโปรย / outcomes / บทเรียน / cover image / เอกสารอ้างอิง</strong> ให้ —
                คุณเลือกอันที่ชอบ และแก้ไขได้ตลอด
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT: Form */}
        <div className="space-y-5">
          {/* Title */}
          <Card title="ชื่อคอร์ส" required>
            <div className="space-y-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น ตัดผมชายเบื้องต้น, ทำเบเกอรี่จากศูนย์..."
                className="w-full rounded-xl border-2 border-navy-200 bg-white px-4 py-3 text-base font-semibold text-navy-900 outline-none placeholder:font-normal placeholder:text-navy-300 focus:border-navy-500"
              />
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <Lightbulb className="h-3 w-3 text-gold-600" />
                <span className="text-navy-500">ตัวอย่าง:</span>
                {SEED_PROMPTS.slice(0, 5).map((s) => (
                  <button
                    key={s}
                    onClick={() => setTitle(s)}
                    className="rounded-full border border-navy-100 bg-white px-2 py-0.5 text-[11px] text-navy-600 hover:border-navy-300 hover:bg-navy-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Subtitle with assist */}
          <Card
            title="คำโปรย"
            assist={
              title ? (
                <AssistButton
                  onClick={() => setActiveAssist("subtitle")}
                  active={activeAssist === "subtitle"}
                  label="ช่วยเขียนคำโปรย"
                />
              ) : null
            }
          >
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={title ? "พิมพ์เอง หรือกด ✨ ให้ Corry ช่วย" : "ใส่ชื่อคอร์สก่อน"}
              disabled={!title}
              className="w-full rounded-xl border-2 border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-300 focus:border-navy-500 disabled:bg-navy-50 disabled:text-navy-400"
            />
            {activeAssist === "subtitle" && (
              <SuggestionPopover
                title="Corry แนะนำคำโปรย"
                onClose={() => setActiveAssist(null)}
                onShuffle={() => setShuffleKey((k) => k + 1)}
                items={suggSubtitles.map((v, i) => ({
                  id: `sub-${i}`,
                  display: v,
                  onPick: () => {
                    setSubtitle(v);
                    setActiveAssist(null);
                  },
                }))}
              />
            )}
          </Card>

          {/* Meta row */}
          <Card title="หมวดหมู่ + ระดับ + เวลารวม">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-navy-500">
                  หมวด
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border-2 border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none hover:border-navy-300"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-navy-500">
                  ระดับ
                </div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as typeof level)}
                  className="w-full rounded-xl border-2 border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none hover:border-navy-300"
                >
                  <option value="พื้นฐาน">พื้นฐาน</option>
                  <option value="กลาง">กลาง</option>
                  <option value="สูง">สูง</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-navy-500">
                  เวลารวม
                </div>
                <div className="flex h-10 items-center rounded-xl border-2 border-navy-100 bg-navy-50 px-3 text-sm font-bold text-navy-700">
                  {totalMin > 0 ? `${Math.round(totalMin / 60)} ชม. ${totalMin % 60} นาที` : "—"}
                </div>
              </div>
            </div>
          </Card>

          {/* Outcomes */}
          <Card
            title="Learning Outcomes"
            assist={
              title ? (
                <AssistButton
                  onClick={() => setActiveAssist("outcomes")}
                  active={activeAssist === "outcomes"}
                  label="ขอ 5 ข้อจาก Corry"
                />
              ) : null
            }
          >
            <div className="space-y-2">
              {outcomes.map((o, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <input
                    value={o}
                    onChange={(e) =>
                      setOutcomes((arr) => arr.map((x, idx) => (idx === i ? e.target.value : x)))
                    }
                    className="flex-1 rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-navy-500"
                  />
                  <button
                    onClick={() => setOutcomes((arr) => arr.filter((_, idx) => idx !== i))}
                    className="rounded-lg p-1.5 text-navy-400 hover:bg-rose-50 hover:text-rose-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setOutcomes((arr) => [...arr, ""])}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-navy-300 px-3 py-1 text-xs text-navy-600 hover:border-navy-500 hover:bg-navy-50"
              >
                <Plus className="h-3 w-3" />
                เพิ่มข้อ
              </button>
              {activeAssist === "outcomes" && (
                <SuggestionPopover
                  title="Corry แนะนำ Outcomes"
                  description="คลิกเพื่อเพิ่มเข้า list — เลือกได้หลายข้อ"
                  onClose={() => setActiveAssist(null)}
                  onShuffle={() => setShuffleKey((k) => k + 1)}
                  multi
                  items={suggOutcomes.map((v, i) => ({
                    id: `out-${i}`,
                    display: v,
                    selected: outcomes.includes(v),
                    onPick: () => {
                      setOutcomes((arr) =>
                        arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
                      );
                    },
                  }))}
                  footerAction={{
                    label: "+ เพิ่มทั้งหมด",
                    onClick: () => {
                      setOutcomes(suggOutcomes);
                      setActiveAssist(null);
                    },
                  }}
                />
              )}
            </div>
          </Card>

          {/* Lessons */}
          <Card
            title="บทเรียน"
            assist={
              title ? (
                <AssistButton
                  onClick={() => setActiveAssist("lessons")}
                  active={activeAssist === "lessons"}
                  label={`ขอโครง ${suggLessons.length} บทจาก Corry`}
                />
              ) : null
            }
          >
            <div className="space-y-1.5">
              {lessons.map((l, i) => (
                <LessonRow
                  key={i}
                  lesson={l}
                  index={i}
                  onChange={(updated) =>
                    setLessons((arr) => arr.map((x, idx) => (idx === i ? updated : x)))
                  }
                  onDelete={() =>
                    setLessons((arr) => arr.filter((_, idx) => idx !== i))
                  }
                />
              ))}
              <button
                onClick={() =>
                  setLessons((arr) => [
                    ...arr,
                    { title: "", kind: "video", duration: "10 นาที" },
                  ])
                }
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-navy-300 px-3 py-1.5 text-xs text-navy-600 hover:border-navy-500 hover:bg-navy-50"
              >
                <Plus className="h-3 w-3" />
                เพิ่มบทเรียน
              </button>
              {activeAssist === "lessons" && (
                <SuggestionPopover
                  title={`Corry แนะนำโครงบทเรียน (${suggLessons.length} บท)`}
                  description="ดูภาพรวมแล้วคลิก ใช้ทั้งหมด หรือเลือกทีละบท"
                  onClose={() => setActiveAssist(null)}
                  onShuffle={() => setShuffleKey((k) => k + 1)}
                  multi
                  items={suggLessons.map((l, i) => ({
                    id: `les-${i}`,
                    display: (
                      <div className="flex items-center gap-2 text-left">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-navy-100 text-[10px] font-bold text-navy-700">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-navy-900">
                            {l.title}
                          </div>
                          <div className="text-[10px] text-navy-500">
                            {KIND_LABEL[l.kind]} · {l.duration}
                          </div>
                        </div>
                      </div>
                    ),
                    selected: lessons.some((ll) => ll.title === l.title),
                    onPick: () => {
                      setLessons((arr) =>
                        arr.some((ll) => ll.title === l.title)
                          ? arr.filter((ll) => ll.title !== l.title)
                          : [...arr, l]
                      );
                    },
                  }))}
                  footerAction={{
                    label: "+ เพิ่มทั้งหมด",
                    onClick: () => {
                      setLessons([...suggLessons]);
                      setActiveAssist(null);
                    },
                  }}
                />
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT: Cover + Related */}
        <div className="space-y-5">
          <Card
            title="Cover image"
            assist={
              title ? (
                <AssistButton
                  onClick={() => setActiveAssist("cover")}
                  active={activeAssist === "cover"}
                  label="หาภาพให้"
                />
              ) : null
            }
          >
            <div className="space-y-3">
              {coverUrl ? (
                <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-navy-200">
                  <img src={coverUrl} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => setCoverUrl("")}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-navy-700 hover:bg-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-200 bg-navy-50/40 text-xs text-navy-500">
                  <ImageIcon className="h-8 w-8 text-navy-300" />
                  <span>ยังไม่ได้เลือกภาพ</span>
                </div>
              )}
              <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-navy-200 bg-white py-2 text-xs font-medium text-navy-700 hover:bg-navy-50">
                ⬆ Upload จากเครื่อง
              </button>
              {activeAssist === "cover" && (
                <SuggestionPopover
                  title="Corry หาภาพจาก Unsplash"
                  description={`คำค้น: "${title}" — เลือก 1 ภาพ`}
                  onClose={() => setActiveAssist(null)}
                  onShuffle={() => setShuffleKey((k) => k + 1)}
                  items={suggCovers.map((url, i) => ({
                    id: `cov-${i}`,
                    display: (
                      <div className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src={`${url}?auto=format&fit=crop&w=400&q=70`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ),
                    onPick: () => {
                      setCoverUrl(`${url}?auto=format&fit=crop&w=1200&q=80`);
                      setActiveAssist(null);
                    },
                  }))}
                  layout="grid"
                />
              )}
            </div>
          </Card>

          <Card
            title="เอกสารอ้างอิงจากคลังความรู้"
            assist={
              title ? (
                <AssistButton
                  onClick={() => setActiveAssist("related")}
                  active={activeAssist === "related"}
                  label="แนะนำ"
                />
              ) : null
            }
          >
            <div className="space-y-2">
              {relatedIds.length === 0 ? (
                <div className="rounded-lg border border-dashed border-navy-200 p-3 text-center text-[11px] text-navy-500">
                  ยังไม่ได้เลือกเอกสาร
                </div>
              ) : (
                relatedIds.map((id) => {
                  const item = MOCK_ITEMS.find((m) => m.id === id);
                  if (!item) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-start gap-2 rounded-lg border border-navy-100 bg-navy-50/40 p-2.5"
                    >
                      <FileText className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-navy-500" />
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-1 text-xs font-medium text-navy-900">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-navy-500">{item.category}</div>
                      </div>
                      <button
                        onClick={() => setRelatedIds((arr) => arr.filter((x) => x !== id))}
                        className="rounded-lg p-1 text-navy-400 hover:bg-rose-50 hover:text-rose-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })
              )}
              {activeAssist === "related" && (
                <SuggestionPopover
                  title="Corry แนะนำเอกสาร"
                  description="vector search จากคลังความรู้ตามชื่อคอร์ส"
                  onClose={() => setActiveAssist(null)}
                  onShuffle={() => setShuffleKey((k) => k + 1)}
                  multi
                  items={MOCK_ITEMS.slice(0, 6).map((item, i) => ({
                    id: `rel-${item.id}`,
                    display: (
                      <div className="text-left">
                        <div className="line-clamp-1 text-xs font-semibold text-navy-900">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-navy-500">{item.category} · {item.source}</div>
                      </div>
                    ),
                    selected: relatedIds.includes(item.id),
                    badge: suggRelated.includes(item.id) ? "⭐ ตรงสุด" : undefined,
                    onPick: () => {
                      setRelatedIds((arr) =>
                        arr.includes(item.id)
                          ? arr.filter((x) => x !== item.id)
                          : [...arr, item.id]
                      );
                    },
                  }))}
                />
              )}
            </div>
          </Card>

          {/* Live preview */}
          <Card title="Preview">
            <div className="overflow-hidden rounded-xl border border-navy-100">
              {coverUrl ? (
                <div className="aspect-video w-full overflow-hidden">
                  <img src={coverUrl} alt="" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200 text-navy-400">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                  {category} · {level}
                </div>
                <div className="mt-1 text-sm font-bold text-navy-900">
                  {title || "ชื่อคอร์ส..."}
                </div>
                <div className="text-[11px] text-navy-500 line-clamp-2">
                  {subtitle || "คำโปรย..."}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-navy-500">
                  <span>{lessons.length} บท</span>
                  <span>
                    {totalMin > 0
                      ? `${Math.round(totalMin / 60)} ชม. ${totalMin % 60} นาที`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// =============== Sub-components ===============

function Card({
  title,
  required,
  assist,
  children,
}: {
  title: string;
  required?: boolean;
  assist?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-bold text-navy-900">
          {title}
          {required && <span className="ml-1 text-rose-600">*</span>}
        </div>
        {assist}
      </div>
      {children}
    </div>
  );
}

function AssistButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold transition",
        active
          ? "bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md"
          : "border border-gold-300 bg-gold-50 text-gold-800 hover:bg-gold-100"
      )}
    >
      <Sparkles className="h-3 w-3" />
      ✨ {label}
    </button>
  );
}

interface SuggestionItem {
  id: string;
  display: React.ReactNode;
  onPick: () => void;
  selected?: boolean;
  badge?: string;
}

function SuggestionPopover({
  title,
  description,
  items,
  onClose,
  onShuffle,
  multi,
  layout = "list",
  footerAction,
}: {
  title: string;
  description?: string;
  items: SuggestionItem[];
  onClose: () => void;
  onShuffle: () => void;
  multi?: boolean;
  layout?: "list" | "grid";
  footerAction?: { label: string; onClick: () => void };
}) {
  const [thinking, setThinking] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setThinking(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute left-0 right-0 top-full z-30 mt-2 animate-fade-in">
      <div className="overflow-hidden rounded-2xl border-2 border-gold-300 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-200 bg-gradient-to-r from-gold-50 to-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-gold-300">
              <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1 text-xs font-bold text-navy-900">
                {title}
                <Sparkles className="h-3 w-3 text-gold-600" />
              </div>
              {description && (
                <div className="text-[10px] text-navy-600">{description}</div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[360px] overflow-y-auto p-3">
          {thinking ? (
            <div className="flex items-center justify-center gap-2 py-8 text-xs text-navy-500">
              <Loader2 className="h-4 w-4 animate-spin text-gold-600" />
              Corry กำลังคิด...
            </div>
          ) : (
            <div className={clsx(layout === "grid" ? "grid grid-cols-2 gap-2" : "space-y-1.5")}>
              {items.map((it) => (
                <button
                  key={it.id}
                  onClick={it.onPick}
                  className={clsx(
                    "group relative flex w-full items-start gap-2 rounded-xl border-2 p-3 text-left transition",
                    it.selected
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-navy-100 bg-white hover:border-gold-400 hover:bg-gold-50/40"
                  )}
                >
                  {multi && (
                    <div
                      className={clsx(
                        "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2",
                        it.selected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-navy-200 bg-white"
                      )}
                    >
                      {it.selected && <Check className="h-2.5 w-2.5" />}
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-sm text-navy-800">{it.display}</div>
                  {it.badge && (
                    <span className="rounded-full bg-gold-100 px-1.5 py-0.5 text-[9px] font-bold text-gold-800">
                      {it.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/40 px-3 py-2">
          <button
            onClick={() => {
              setThinking(true);
              onShuffle();
              setTimeout(() => setThinking(false), 600);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-navy-200 bg-white px-3 py-1 text-[11px] font-medium text-navy-700 hover:bg-navy-50"
          >
            <RefreshCw className="h-3 w-3" />
            ลองอีกชุด
          </button>
          {footerAction && !thinking && (
            <button
              onClick={footerAction.onClick}
              className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1 text-[11px] font-bold text-white hover:bg-navy-800"
            >
              {footerAction.label}
            </button>
          )}
          {!footerAction && (
            <span className="text-[10px] text-navy-500">
              {multi ? "เลือกได้หลายข้อ" : "เลือก 1 ข้อ"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  index,
  onChange,
  onDelete,
}: {
  lesson: LessonDraft;
  index: number;
  onChange: (l: LessonDraft) => void;
  onDelete: () => void;
}) {
  const Icon = KIND_ICON[lesson.kind];
  return (
    <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white p-2 hover:border-navy-300">
      <GripVertical className="h-4 w-4 flex-shrink-0 cursor-move text-navy-300" />
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-navy-100 text-xs font-bold text-navy-700">
        {index + 1}
      </div>
      <input
        value={lesson.title}
        onChange={(e) => onChange({ ...lesson, title: e.target.value })}
        placeholder="ชื่อบทเรียน..."
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-navy-900 outline-none placeholder:text-navy-300"
      />
      <select
        value={lesson.kind}
        onChange={(e) => onChange({ ...lesson, kind: e.target.value as LessonDraft["kind"] })}
        className="rounded-lg border border-navy-200 bg-white px-2 py-1 text-[11px] font-medium text-navy-700 outline-none"
      >
        {(Object.keys(KIND_LABEL) as Array<keyof typeof KIND_LABEL>).map((k) => (
          <option key={k} value={k}>
            {KIND_LABEL[k]}
          </option>
        ))}
      </select>
      <input
        value={lesson.duration}
        onChange={(e) => onChange({ ...lesson, duration: e.target.value })}
        className="w-20 rounded-lg border border-navy-200 bg-white px-2 py-1 text-center text-[11px] text-navy-700 outline-none"
      />
      <button
        onClick={onDelete}
        className="rounded-lg p-1 text-navy-400 hover:bg-rose-50 hover:text-rose-700"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
