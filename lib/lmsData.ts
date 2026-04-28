export type CourseAudience = "staff" | "inmate";

export type CourseCategory =
  // staff
  | "การปฏิบัติงาน"
  | "ความปลอดภัย"
  | "กฎหมายและวินัย"
  | "การพัฒนาผู้ต้องขัง"
  // inmate
  | "ทักษะอาชีพ"
  | "ความรู้พื้นฐาน"
  | "ทักษะชีวิต"
  | "กฎหมาย/สิทธิ"
  | "บำบัด/ปรับพฤติกรรม";

export type LessonKind = "video" | "reading" | "audio" | "interactive" | "quiz";

export interface Lesson {
  id: string;
  title: string;
  kind: LessonKind;
  duration: string; // e.g. "12 นาที"
  completed?: boolean;
}

export interface Course {
  id: string;
  audience: CourseAudience;
  title: string;
  subtitle: string;
  category: CourseCategory;
  cover: string; // emoji fallback
  image: string; // hero photo URL (Unsplash)
  color: string; // tailwind gradient classes
  lessons: Lesson[];
  totalMinutes: number;
  enrolled: number;
  rating: number; // 0-5
  certifyingBody?: string; // e.g., กรมพัฒนาฝีมือแรงงาน
  parolePoints?: number; // points awarded on completion (inmate)
  level: "พื้นฐาน" | "กลาง" | "สูง";
  tags: string[];
  // demo: progress for the current learner
  progress?: number; // 0-100
  description: string;
  outcomes: string[]; // what learner will gain
  certificateTemplate?: "vocational" | "lifeskill" | "staff";
  relatedKnowledge?: string[]; // IDs from MOCK_ITEMS in mockData.ts
}

// ========== STAFF COURSES ==========
export const STAFF_COURSES: Course[] = [
  {
    id: "sc1",
    audience: "staff",
    relatedKnowledge: ["k3", "k1", "k4", "k9"],
    title: "การใช้กำลังในการควบคุมเหตุก่อกวน",
    subtitle: "Use-of-force continuum สำหรับเจ้าหน้าที่ผู้คุม",
    category: "ความปลอดภัย",
    cover: "🛡️",
    image: "https://images.unsplash.com/photo-1623053795318-f8bb2f5897dd?auto=format&fit=crop&w=1200&q=80",
    color: "from-rose-500 to-orange-500",
    level: "กลาง",
    tags: ["ควบคุม", "ความปลอดภัย", "เหตุก่อกวน"],
    totalMinutes: 84,
    enrolled: 1240,
    rating: 4.8,
    progress: 65,
    description:
      "หลักสูตรอบรมเจ้าหน้าที่ผู้คุมเรื่องการใช้กำลังตามขั้น (Use-of-force continuum) เทคนิคการควบคุม การสื่อสารปลดชนวน และการรายงานเหตุ",
    outcomes: [
      "เข้าใจหลักการ Use-of-force continuum 5 ระดับ",
      "ใช้เทคนิคปลดชนวนสถานการณ์ได้",
      "รายงานเหตุการณ์ตามมาตรฐาน",
    ],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "บทนำ: หลักการใช้กำลัง", kind: "video", duration: "12 นาที", completed: true },
      { id: "l2", title: "ระดับ 1-3: การสื่อสารและขู่เตือน", kind: "video", duration: "18 นาที", completed: true },
      { id: "l3", title: "ระดับ 4-5: การควบคุมร่างกาย", kind: "video", duration: "22 นาที", completed: true },
      { id: "l4", title: "เทคนิคปลดชนวน Verbal de-escalation", kind: "interactive", duration: "15 นาที", completed: false },
      { id: "l5", title: "การรายงานและบันทึกเหตุ", kind: "reading", duration: "10 นาที", completed: false },
      { id: "l6", title: "แบบทดสอบประมวลความรู้", kind: "quiz", duration: "15 นาที", completed: false },
    ],
  },
  {
    id: "sc2",
    audience: "staff",
    relatedKnowledge: ["k4", "k1", "k9", "k2"],
    title: "คู่มือผู้คุมใหม่ — ปฏิบัติงานประจำวัน",
    subtitle: "ครอบคลุมการตรวจนับ ส่งเวร จัดการสิ่งของต้องห้าม",
    category: "การปฏิบัติงาน",
    cover: "📋",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    color: "from-navy-600 to-navy-800",
    level: "พื้นฐาน",
    tags: ["ผู้คุม", "SOP", "เริ่มต้น"],
    totalMinutes: 156,
    enrolled: 2104,
    rating: 4.7,
    progress: 100,
    description:
      "หลักสูตรพื้นฐานสำหรับเจ้าหน้าที่ผู้คุมใหม่ ครอบคลุม SOP การตรวจนับ การส่งเวร การจัดการสิ่งของต้องห้าม ระบบบันทึกประจำวัน",
    outcomes: [
      "ปฏิบัติงานตาม SOP ของกรมฯ ได้",
      "ตรวจนับและส่งเวรได้ถูกต้อง",
      "บันทึกประจำวันตามมาตรฐาน",
    ],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "ภาพรวมหน้าที่ผู้คุม", kind: "video", duration: "20 นาที", completed: true },
      { id: "l2", title: "การตรวจนับและส่งเวร", kind: "interactive", duration: "30 นาที", completed: true },
      { id: "l3", title: "สิ่งของต้องห้าม", kind: "reading", duration: "25 นาที", completed: true },
      { id: "l4", title: "การบันทึกประจำวัน", kind: "video", duration: "30 นาที", completed: true },
      { id: "l5", title: "การจัดการเหตุประจำวัน", kind: "video", duration: "36 นาที", completed: true },
      { id: "l6", title: "แบบทดสอบประเมินผล", kind: "quiz", duration: "15 นาที", completed: true },
    ],
  },
  {
    id: "sc3",
    audience: "staff",
    relatedKnowledge: ["k6", "k5"],
    title: "การคัดกรองสุขภาพจิตผู้ต้องขังแรกรับ",
    subtitle: "หลักเกณฑ์ประเมิน + เส้นทางการส่งต่อ",
    category: "การพัฒนาผู้ต้องขัง",
    cover: "🧠",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80",
    color: "from-purple-500 to-pink-500",
    level: "กลาง",
    tags: ["สุขภาพจิต", "คัดกรอง", "แรกรับ"],
    totalMinutes: 48,
    enrolled: 542,
    rating: 4.6,
    progress: 0,
    description:
      "หลักสูตรอบรมการประเมินสุขภาพจิตผู้ต้องขังแรกรับ ตามแบบประเมินมาตรฐาน เพื่อคัดกรองความเสี่ยงและส่งต่อ",
    outcomes: [
      "ใช้แบบประเมิน PHQ-9 / GAD-7 ได้",
      "คัดกรองความเสี่ยงฆ่าตัวตาย",
      "ประสานส่งต่อกองอนามัย",
    ],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "หลักการคัดกรองสุขภาพจิต", kind: "video", duration: "12 นาที" },
      { id: "l2", title: "แบบประเมินมาตรฐาน", kind: "reading", duration: "15 นาที" },
      { id: "l3", title: "การสัมภาษณ์ผู้ต้องขัง", kind: "video", duration: "10 นาที" },
      { id: "l4", title: "เส้นทางส่งต่อ", kind: "interactive", duration: "8 นาที" },
      { id: "l5", title: "แบบทดสอบ", kind: "quiz", duration: "3 นาที" },
    ],
  },
  {
    id: "sc4",
    audience: "staff",
    relatedKnowledge: ["k7", "k1", "k10"],
    title: "ระบบ EM ติดตามตัวผู้พ้นโทษ",
    subtitle: "การสวม-ถอด การตรวจสอบ การประสานงาน",
    category: "การปฏิบัติงาน",
    cover: "📡",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    color: "from-emerald-500 to-teal-500",
    level: "กลาง",
    tags: ["EM", "ติดตามตัว", "พ้นโทษ"],
    totalMinutes: 36,
    enrolled: 318,
    rating: 4.5,
    progress: 30,
    description:
      "หลักสูตรการใช้อุปกรณ์ติดตามอิเล็กทรอนิกส์ (EM) สำหรับติดตามผู้พ้นโทษ ขั้นตอนการสวม-ถอด การตรวจสอบสถานะ การจัดการการแจ้งเตือน",
    outcomes: ["สวม-ถอด EM ได้ถูกต้อง", "อ่านสถานะอุปกรณ์", "ประสานงานเมื่อมีการแจ้งเตือน"],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "ภาพรวมระบบ EM", kind: "video", duration: "8 นาที", completed: true },
      { id: "l2", title: "การสวม-ถอดอุปกรณ์", kind: "video", duration: "12 นาที", completed: false },
      { id: "l3", title: "การตรวจสอบสถานะ", kind: "interactive", duration: "10 นาที" },
      { id: "l4", title: "การจัดการแจ้งเตือน", kind: "reading", duration: "6 นาที" },
    ],
  },
  {
    id: "sc5",
    audience: "staff",
    relatedKnowledge: ["k8", "k1", "k11"],
    title: "การสอบสวนทางวินัยข้าราชการ",
    subtitle: "หลักฟังความสองฝ่าย + การรวบรวมพยานหลักฐาน",
    category: "กฎหมายและวินัย",
    cover: "⚖️",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    color: "from-amber-500 to-yellow-600",
    level: "สูง",
    tags: ["วินัย", "สอบสวน", "ข้าราชการ"],
    totalMinutes: 47,
    enrolled: 187,
    rating: 4.9,
    progress: 0,
    description:
      "หลักสูตรอบรมเจ้าหน้าที่ที่ได้รับมอบหมายให้สอบสวนทางวินัย ครอบคลุมหลักฟังความสองฝ่าย การรวบรวมพยานหลักฐาน การจัดทำสำนวน",
    outcomes: [
      "ดำเนินการสอบสวนตามหลักนิติธรรม",
      "รวบรวมพยานหลักฐานได้",
      "จัดทำสำนวนการสอบสวน",
    ],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "หลักการสอบสวน", kind: "audio", duration: "15 นาที" },
      { id: "l2", title: "การฟังความสองฝ่าย", kind: "video", duration: "12 นาที" },
      { id: "l3", title: "พยานหลักฐาน", kind: "reading", duration: "10 นาที" },
      { id: "l4", title: "การจัดทำสำนวน", kind: "interactive", duration: "8 นาที" },
      { id: "l5", title: "แบบทดสอบ", kind: "quiz", duration: "2 นาที" },
    ],
  },
  {
    id: "sc6",
    audience: "staff",
    relatedKnowledge: ["k12"],
    title: "การปฐมพยาบาลฉุกเฉินในเรือนจำ",
    subtitle: "CPR · ห้ามเลือด · จัดการบาดแผล",
    category: "ความปลอดภัย",
    cover: "🚑",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    color: "from-red-500 to-rose-600",
    level: "พื้นฐาน",
    tags: ["ปฐมพยาบาล", "CPR", "ฉุกเฉิน"],
    totalMinutes: 32,
    enrolled: 1820,
    rating: 4.8,
    progress: 0,
    description:
      "ทักษะปฐมพยาบาลฉุกเฉินสำหรับเจ้าหน้าที่ ครอบคลุม CPR การห้ามเลือด การจัดการบาดแผล การประเมินสถานการณ์ฉุกเฉิน",
    outcomes: ["ทำ CPR ได้ถูกต้อง", "ห้ามเลือดเบื้องต้น", "จัดการบาดแผล"],
    certificateTemplate: "staff",
    lessons: [
      { id: "l1", title: "ประเมินสถานการณ์", kind: "video", duration: "5 นาที" },
      { id: "l2", title: "เทคนิค CPR", kind: "video", duration: "12 นาที" },
      { id: "l3", title: "การห้ามเลือด", kind: "interactive", duration: "8 นาที" },
      { id: "l4", title: "การจัดการบาดแผล", kind: "video", duration: "5 นาที" },
      { id: "l5", title: "แบบทดสอบ", kind: "quiz", duration: "2 นาที" },
    ],
  },
];

// ========== INMATE COURSES ==========
export const INMATE_COURSES: Course[] = [
  {
    id: "ic1",
    audience: "inmate",
    relatedKnowledge: ["k10"],
    title: "เบเกอรี่เบื้องต้น",
    subtitle: "ทำขนมปัง คุกกี้ เค้ก ตั้งแต่ศูนย์",
    category: "ทักษะอาชีพ",
    cover: "🥖",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    color: "from-amber-400 to-orange-500",
    level: "พื้นฐาน",
    tags: ["เบเกอรี่", "อาหาร", "อาชีพ"],
    totalMinutes: 240,
    enrolled: 1842,
    rating: 4.9,
    certifyingBody: "กรมพัฒนาฝีมือแรงงาน",
    parolePoints: 30,
    progress: 75,
    description:
      "เรียนทำเบเกอรี่ตั้งแต่พื้นฐาน ขนมปัง คุกกี้ เค้ก โดนัท เพื่อใช้ประกอบอาชีพได้จริง มีวุฒิบัตรรับรองจากกรมพัฒนาฝีมือแรงงาน",
    outcomes: [
      "ทำขนมปังพื้นฐานได้ 5 ชนิด",
      "เข้าใจสัดส่วนวัตถุดิบและอุณหภูมิ",
      "เปิดร้านเบเกอรี่ของตัวเองได้",
    ],
    certificateTemplate: "vocational",
    lessons: [
      { id: "l1", title: "รู้จักวัตถุดิบและอุปกรณ์", kind: "video", duration: "20 นาที", completed: true },
      { id: "l2", title: "ขนมปังโฮลวีท", kind: "video", duration: "35 นาที", completed: true },
      { id: "l3", title: "คุกกี้ช็อกโกแลตชิป", kind: "video", duration: "25 นาที", completed: true },
      { id: "l4", title: "เค้กวันเกิด", kind: "video", duration: "45 นาที", completed: true },
      { id: "l5", title: "โดนัท", kind: "video", duration: "30 นาที", completed: false },
      { id: "l6", title: "การคำนวณต้นทุน", kind: "interactive", duration: "20 นาที", completed: false },
      { id: "l7", title: "การตลาดสำหรับร้านเล็ก", kind: "reading", duration: "30 นาที", completed: false },
      { id: "l8", title: "แบบทดสอบ + ส่งภาพผลงาน", kind: "quiz", duration: "35 นาที", completed: false },
    ],
  },
  {
    id: "ic2",
    audience: "inmate",
    title: "ช่างไฟฟ้าภายในอาคาร",
    subtitle: "เดินสายไฟ ติดตั้งสวิตช์ ปลั๊ก ระบบแสงสว่าง",
    category: "ทักษะอาชีพ",
    cover: "⚡",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
    color: "from-yellow-400 to-amber-500",
    level: "กลาง",
    tags: ["ช่างไฟ", "อาคาร", "อาชีพ"],
    totalMinutes: 360,
    enrolled: 924,
    rating: 4.8,
    certifyingBody: "กรมพัฒนาฝีมือแรงงาน",
    parolePoints: 45,
    progress: 20,
    description:
      "หลักสูตรช่างไฟฟ้าภายในอาคารระดับ 1 มีวุฒิบัตรกรมพัฒนาฝีมือแรงงาน ใช้สมัครงานช่างไฟได้ทันที",
    outcomes: [
      "เดินสายไฟภายในอาคารได้",
      "ติดตั้งระบบแสงสว่าง สวิตช์ ปลั๊ก",
      "เข้าใจมาตรฐานความปลอดภัยทางไฟฟ้า",
    ],
    certificateTemplate: "vocational",
    lessons: [
      { id: "l1", title: "ความรู้พื้นฐานทางไฟฟ้า", kind: "video", duration: "30 นาที", completed: true },
      { id: "l2", title: "เครื่องมือช่างไฟ", kind: "video", duration: "20 นาที", completed: true },
      { id: "l3", title: "การเดินสายไฟ", kind: "video", duration: "60 นาที" },
      { id: "l4", title: "ติดตั้งสวิตช์และปลั๊ก", kind: "video", duration: "45 นาที" },
      { id: "l5", title: "ระบบแสงสว่าง", kind: "video", duration: "40 นาที" },
      { id: "l6", title: "ความปลอดภัยทางไฟฟ้า", kind: "interactive", duration: "30 นาที" },
      { id: "l7", title: "ปฏิบัติ: ติดตั้งวงจร", kind: "interactive", duration: "90 นาที" },
      { id: "l8", title: "สอบทฤษฎี + ปฏิบัติ", kind: "quiz", duration: "45 นาที" },
    ],
  },
  {
    id: "ic3",
    audience: "inmate",
    title: "การอ่าน-เขียนภาษาไทยเบื้องต้น",
    subtitle: "สำหรับผู้ที่อ่านเขียนได้ไม่คล่อง",
    category: "ความรู้พื้นฐาน",
    cover: "📚",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-400 to-cyan-500",
    level: "พื้นฐาน",
    tags: ["อ่านเขียน", "ภาษาไทย", "พื้นฐาน"],
    totalMinutes: 480,
    enrolled: 312,
    rating: 4.7,
    parolePoints: 40,
    progress: 0,
    description:
      "หลักสูตรอ่าน-เขียนภาษาไทยสำหรับผู้ที่อ่านเขียนไม่คล่อง สอนตั้งแต่พยัญชนะ สระ คำ ประโยค จนถึงการเขียนจดหมายและเอกสารราชการ",
    outcomes: [
      "อ่านหนังสือพิมพ์และเอกสารราชการได้",
      "เขียนจดหมาย เขียนใบสมัครงาน",
      "พร้อมศึกษาต่อระดับ ม.ต้น",
    ],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "พยัญชนะไทย ก-ฮ", kind: "video", duration: "30 นาที" },
      { id: "l2", title: "สระและวรรณยุกต์", kind: "video", duration: "30 นาที" },
      { id: "l3", title: "ประสมคำ", kind: "interactive", duration: "60 นาที" },
      { id: "l4", title: "อ่านประโยคสั้น", kind: "interactive", duration: "60 นาที" },
      { id: "l5", title: "เขียนคำง่ายๆ", kind: "interactive", duration: "60 นาที" },
      { id: "l6", title: "อ่านข่าวสั้น", kind: "video", duration: "60 นาที" },
      { id: "l7", title: "เขียนจดหมาย", kind: "interactive", duration: "60 นาที" },
      { id: "l8", title: "เขียนใบสมัครงาน", kind: "interactive", duration: "60 นาที" },
      { id: "l9", title: "สอบประเมินผล", kind: "quiz", duration: "60 นาที" },
    ],
  },
  {
    id: "ic4",
    audience: "inmate",
    relatedKnowledge: ["k10"],
    title: "การเงินส่วนบุคคล",
    subtitle: "วางแผนการเงิน บริหารหนี้ เก็บออม",
    category: "ทักษะชีวิต",
    cover: "💰",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    color: "from-emerald-400 to-green-600",
    level: "พื้นฐาน",
    tags: ["การเงิน", "ออม", "หนี้"],
    totalMinutes: 120,
    enrolled: 1208,
    rating: 4.6,
    parolePoints: 20,
    progress: 50,
    description:
      "เตรียมพร้อมจัดการการเงินหลังออกจากเรือนจำ การเปิดบัญชี การฝากเงิน บริหารหนี้ ออมเพื่ออนาคต ป้องกันการถูกหลอก",
    outcomes: [
      "เปิดบัญชีธนาคารได้",
      "วางแผนรายรับ-รายจ่ายรายเดือน",
      "รู้จักหนี้ดี-หนี้เสีย ป้องกันถูกหลอก",
    ],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "พื้นฐานการบริหารเงิน", kind: "video", duration: "10 นาที", completed: true },
      { id: "l2", title: "เปิดบัญชีธนาคาร", kind: "video", duration: "15 นาที", completed: true },
      { id: "l3", title: "วางแผนรายรับ-รายจ่าย", kind: "interactive", duration: "25 นาที", completed: true },
      { id: "l4", title: "รู้จักหนี้และดอกเบี้ย", kind: "video", duration: "20 นาที", completed: false },
      { id: "l5", title: "ระวังการถูกหลอก", kind: "video", duration: "15 นาที", completed: false },
      { id: "l6", title: "ออมเงินเพื่ออนาคต", kind: "video", duration: "20 นาที", completed: false },
      { id: "l7", title: "แบบทดสอบ", kind: "quiz", duration: "15 นาที", completed: false },
    ],
  },
  {
    id: "ic5",
    audience: "inmate",
    relatedKnowledge: ["k6", "k5"],
    title: "การจัดการความโกรธและความเครียด",
    subtitle: "ทักษะปรับอารมณ์ ลดความขัดแย้ง",
    category: "ทักษะชีวิต",
    cover: "🧘",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    color: "from-indigo-400 to-purple-500",
    level: "พื้นฐาน",
    tags: ["อารมณ์", "ความโกรธ", "เครียด"],
    totalMinutes: 90,
    enrolled: 2410,
    rating: 4.8,
    parolePoints: 25,
    progress: 100,
    description:
      "ฝึกทักษะรับมือกับความโกรธและความเครียด ผ่านเทคนิคหายใจ การคิดเชิงบวก และการแก้ปัญหา ลดความเสี่ยงในการกระทำผิดซ้ำ",
    outcomes: ["รู้สัญญาณเตือนความโกรธ", "ใช้เทคนิคปรับอารมณ์ 5 วิธี", "แก้ปัญหาโดยไม่ใช้ความรุนแรง"],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "เข้าใจความโกรธ", kind: "video", duration: "15 นาที", completed: true },
      { id: "l2", title: "เทคนิคหายใจ 4-7-8", kind: "interactive", duration: "10 นาที", completed: true },
      { id: "l3", title: "หยุดและคิด", kind: "video", duration: "15 นาที", completed: true },
      { id: "l4", title: "การสื่อสารโดยไม่ใช้ความรุนแรง", kind: "video", duration: "20 นาที", completed: true },
      { id: "l5", title: "การจัดการความเครียดเรื้อรัง", kind: "audio", duration: "15 นาที", completed: true },
      { id: "l6", title: "แบบทดสอบและสะท้อนตัวเอง", kind: "quiz", duration: "15 นาที", completed: true },
    ],
  },
  {
    id: "ic6",
    audience: "inmate",
    relatedKnowledge: ["k1", "k10"],
    title: "สิทธิแรงงานและการสมัครงาน",
    subtitle: "รู้สิทธิ ทำเรซูเม่ สัมภาษณ์งาน",
    category: "กฎหมาย/สิทธิ",
    cover: "💼",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    color: "from-sky-500 to-blue-600",
    level: "กลาง",
    tags: ["แรงงาน", "สมัครงาน", "สิทธิ"],
    totalMinutes: 100,
    enrolled: 1620,
    rating: 4.5,
    parolePoints: 25,
    progress: 0,
    description:
      "เรียนรู้สิทธิตามกฎหมายแรงงาน ค่าจ้างขั้นต่ำ ประกันสังคม การทำเรซูเม่และฝึกสัมภาษณ์งาน รวมถึงการเปิดเผยประวัติอย่างเหมาะสม",
    outcomes: [
      "รู้สิทธิแรงงานพื้นฐาน",
      "ทำเรซูเม่ได้",
      "สัมภาษณ์งานได้อย่างมั่นใจ",
    ],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "สิทธิแรงงานตามกฎหมาย", kind: "video", duration: "20 นาที" },
      { id: "l2", title: "ทำบัตรประชาชนใหม่", kind: "video", duration: "10 นาที" },
      { id: "l3", title: "ทำเรซูเม่", kind: "interactive", duration: "30 นาที" },
      { id: "l4", title: "ฝึกสัมภาษณ์งาน", kind: "interactive", duration: "20 นาที" },
      { id: "l5", title: "การเปิดเผยประวัติ", kind: "video", duration: "10 นาที" },
      { id: "l6", title: "แบบทดสอบ", kind: "quiz", duration: "10 นาที" },
    ],
  },
  {
    id: "ic7",
    audience: "inmate",
    title: "เกษตรอินทรีย์และการปลูกผักสวนครัว",
    subtitle: "ปลูกเอง กินเอง ขายได้",
    category: "ทักษะอาชีพ",
    cover: "🌱",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    color: "from-lime-400 to-green-500",
    level: "พื้นฐาน",
    tags: ["เกษตร", "ผัก", "อินทรีย์"],
    totalMinutes: 180,
    enrolled: 856,
    rating: 4.7,
    certifyingBody: "กรมส่งเสริมการเกษตร",
    parolePoints: 30,
    progress: 0,
    description:
      "ปลูกผักสวนครัวเลี้ยงครอบครัว ขยายเป็นเกษตรอินทรีย์เชิงพาณิชย์ ครอบคลุมการเตรียมดิน เพาะกล้า ดูแล จนถึงการตลาด",
    outcomes: [
      "ปลูกผักสวนครัว 10 ชนิด",
      "ทำปุ๋ยอินทรีย์เอง",
      "วางแผนเกษตรเชิงพาณิชย์",
    ],
    certificateTemplate: "vocational",
    lessons: [
      { id: "l1", title: "เลือกพื้นที่และเตรียมดิน", kind: "video", duration: "25 นาที" },
      { id: "l2", title: "เพาะกล้าและปลูก", kind: "video", duration: "30 นาที" },
      { id: "l3", title: "ทำปุ๋ยอินทรีย์", kind: "video", duration: "20 นาที" },
      { id: "l4", title: "ป้องกันแมลงโดยไม่ใช้สารเคมี", kind: "video", duration: "25 นาที" },
      { id: "l5", title: "เก็บเกี่ยวและจัดเก็บ", kind: "video", duration: "20 นาที" },
      { id: "l6", title: "การตลาดเกษตรอินทรีย์", kind: "reading", duration: "30 นาที" },
      { id: "l7", title: "วางแผนธุรกิจเกษตร", kind: "interactive", duration: "20 นาที" },
      { id: "l8", title: "ทดสอบและส่งแผน", kind: "quiz", duration: "10 นาที" },
    ],
  },
  {
    id: "ic8",
    audience: "inmate",
    relatedKnowledge: ["k5", "k6", "k10"],
    title: "โปรแกรมบำบัดยาเสพติด",
    subtitle: "เข้าใจตัวเอง ป้องกันการกลับไปเสพ",
    category: "บำบัด/ปรับพฤติกรรม",
    cover: "💚",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    color: "from-teal-400 to-cyan-500",
    level: "กลาง",
    tags: ["บำบัด", "ยาเสพติด", "สุขภาพจิต"],
    totalMinutes: 240,
    enrolled: 3120,
    rating: 4.9,
    parolePoints: 60,
    progress: 40,
    description:
      "หลักสูตรบำบัดและป้องกันการกลับไปใช้ยาเสพติด ครอบคลุมจิตวิทยาการเสพติด การจัดการสิ่งเร้า การสร้างเครือข่ายสนับสนุน",
    outcomes: [
      "เข้าใจกลไกการเสพติด",
      "รู้สัญญาณเตือนและจัดการสิ่งเร้า",
      "สร้างเครือข่ายสนับสนุนต่อเนื่อง",
    ],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "ปฐมนิเทศและประเมิน", kind: "video", duration: "30 นาที", completed: true },
      { id: "l2", title: "เข้าใจการเสพติด", kind: "video", duration: "30 นาที", completed: true },
      { id: "l3", title: "การจัดการสิ่งเร้า (Cravings)", kind: "video", duration: "30 นาที", completed: true },
      { id: "l4", title: "ทักษะปฏิเสธ", kind: "interactive", duration: "30 นาที", completed: false },
      { id: "l5", title: "การจัดการอารมณ์", kind: "video", duration: "30 นาที" },
      { id: "l6", title: "เครือข่ายสนับสนุน NA", kind: "audio", duration: "30 นาที" },
      { id: "l7", title: "วางแผนชีวิตต่อเนื่อง", kind: "interactive", duration: "30 นาที" },
      { id: "l8", title: "ประเมินผลและสะท้อน", kind: "quiz", duration: "30 นาที" },
    ],
  },
  {
    id: "ic9",
    audience: "inmate",
    title: "ตัดผมชายและบาร์เบอร์เบื้องต้น",
    subtitle: "ทักษะอาชีพ ทำเงินได้ทันที",
    category: "ทักษะอาชีพ",
    cover: "💈",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    color: "from-stone-500 to-zinc-600",
    level: "พื้นฐาน",
    tags: ["ตัดผม", "บาร์เบอร์", "อาชีพ"],
    totalMinutes: 300,
    enrolled: 642,
    rating: 4.7,
    certifyingBody: "กรมพัฒนาฝีมือแรงงาน",
    parolePoints: 35,
    progress: 0,
    description:
      "หลักสูตรตัดผมชายและบาร์เบอร์ระดับเริ่มต้น มีวุฒิบัตรกรมพัฒนาฝีมือแรงงาน เปิดร้านเองได้หรือทำงานในร้านบาร์เบอร์",
    outcomes: ["ตัดผมทรงพื้นฐาน 5 ทรง", "โกนหนวด-เคราอย่างมืออาชีพ", "ดูแลรักษาเครื่องมือ"],
    certificateTemplate: "vocational",
    lessons: [
      { id: "l1", title: "เครื่องมือบาร์เบอร์", kind: "video", duration: "20 นาที" },
      { id: "l2", title: "ทรงผมพื้นฐาน 5 แบบ", kind: "video", duration: "60 นาที" },
      { id: "l3", title: "เทคนิคการใช้ปัตตาเลี่ยน", kind: "video", duration: "40 นาที" },
      { id: "l4", title: "การโกนหนวด", kind: "video", duration: "30 นาที" },
      { id: "l5", title: "การให้บริการลูกค้า", kind: "interactive", duration: "30 นาที" },
      { id: "l6", title: "การเปิดร้านเล็ก", kind: "reading", duration: "60 นาที" },
      { id: "l7", title: "ฝึกปฏิบัติ + ส่งภาพผลงาน", kind: "quiz", duration: "60 นาที" },
    ],
  },
  {
    id: "ic10",
    audience: "inmate",
    title: "คณิตศาสตร์ในชีวิตประจำวัน",
    subtitle: "บวก-ลบ-คูณ-หาร เปอร์เซ็นต์ คิดเงิน",
    category: "ความรู้พื้นฐาน",
    cover: "🔢",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    color: "from-violet-400 to-fuchsia-500",
    level: "พื้นฐาน",
    tags: ["คณิตศาสตร์", "พื้นฐาน", "การเงิน"],
    totalMinutes: 180,
    enrolled: 422,
    rating: 4.5,
    parolePoints: 20,
    progress: 0,
    description:
      "คณิตศาสตร์ที่ใช้ในชีวิตจริง การคิดเงิน คิดเปอร์เซ็นต์ คำนวณดอกเบี้ย ราคาขาย กำไร-ขาดทุน",
    outcomes: ["บวก-ลบ-คูณ-หารคล่อง", "คิดเปอร์เซ็นต์", "คำนวณกำไรขายของ"],
    certificateTemplate: "lifeskill",
    lessons: [
      { id: "l1", title: "บวก-ลบ", kind: "interactive", duration: "30 นาที" },
      { id: "l2", title: "คูณ-หาร", kind: "interactive", duration: "30 นาที" },
      { id: "l3", title: "เศษส่วนและทศนิยม", kind: "interactive", duration: "30 นาที" },
      { id: "l4", title: "เปอร์เซ็นต์", kind: "video", duration: "30 นาที" },
      { id: "l5", title: "การคิดเงินและทอน", kind: "interactive", duration: "30 นาที" },
      { id: "l6", title: "แบบทดสอบ", kind: "quiz", duration: "30 นาที" },
    ],
  },
];

export const ALL_COURSES: Course[] = [...STAFF_COURSES, ...INMATE_COURSES];

// Courses managed in the admin panel (learner courses only)
export const COURSES = INMATE_COURSES;

// ========== INMATE PROFILE ==========
export interface InmateProfile {
  id: string;
  prisonNumber: string;
  name: string;
  prison: string;
  block: string;
  releaseDate: string; // ISO
  daysRemaining: number;
  parolePoints: number;
  paroleTarget: number; // points needed for early release consideration
  daysReducedSoFar: number; // days reduced via learning
  certificates: Certificate[];
  enrolledCourseIds: string[];
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string; // ISO
  serialNo: string;
  certifyingBody: string;
  template: "vocational" | "lifeskill" | "staff";
  hours: number;
}

export const INMATE_PROFILE: InmateProfile = {
  id: "in-001",
  prisonNumber: "61-0247",
  name: "นายอรรณพ ศรีสุข",
  prison: "เรือนจำกลางคลองเปรม",
  block: "แดน 3 ห้อง 14",
  releaseDate: "2027-08-15",
  daysRemaining: 475,
  parolePoints: 175,
  paroleTarget: 300,
  daysReducedSoFar: 42,
  enrolledCourseIds: ["ic1", "ic2", "ic4", "ic5", "ic8"],
  certificates: [
    {
      id: "cert1",
      courseId: "ic5",
      courseTitle: "การจัดการความโกรธและความเครียด",
      issuedAt: "2026-02-10",
      serialNo: "DOC-LMS-2026-001947",
      certifyingBody: "กรมราชทัณฑ์",
      template: "lifeskill",
      hours: 1.5,
    },
  ],
};

// ========== PAROLE ACTIVITY ==========
export interface ParoleActivity {
  id: string;
  date: string; // ISO
  type: "course_complete" | "lesson_complete" | "quiz_pass" | "behavior" | "work";
  title: string;
  points: number;
  daysReduced: number;
}

export const PAROLE_ACTIVITIES: ParoleActivity[] = [
  {
    id: "p1",
    date: "2026-04-21",
    type: "lesson_complete",
    title: "เรียนจบบทที่ 4: เค้กวันเกิด — เบเกอรี่เบื้องต้น",
    points: 5,
    daysReduced: 1,
  },
  {
    id: "p2",
    date: "2026-04-18",
    type: "behavior",
    title: "ความประพฤติดีเด่นประจำสัปดาห์",
    points: 10,
    daysReduced: 2,
  },
  {
    id: "p3",
    date: "2026-04-12",
    type: "course_complete",
    title: "จบหลักสูตร: การจัดการความโกรธและความเครียด",
    points: 25,
    daysReduced: 7,
  },
  {
    id: "p4",
    date: "2026-04-05",
    type: "quiz_pass",
    title: "ผ่านแบบทดสอบ: บทที่ 3 คุกกี้ช็อกโกแลตชิป",
    points: 8,
    daysReduced: 2,
  },
  {
    id: "p5",
    date: "2026-03-28",
    type: "work",
    title: "ทำงานในโรงเบเกอรี่เรือนจำ 80 ชม.",
    points: 16,
    daysReduced: 4,
  },
  {
    id: "p6",
    date: "2026-03-15",
    type: "lesson_complete",
    title: "เรียนจบบทที่ 3: คุกกี้ — เบเกอรี่เบื้องต้น",
    points: 5,
    daysReduced: 1,
  },
  {
    id: "p7",
    date: "2026-03-08",
    type: "course_complete",
    title: "จบหลักสูตร: ทักษะปฏิเสธยา (เบื้องต้น)",
    points: 30,
    daysReduced: 8,
  },
  {
    id: "p8",
    date: "2026-02-22",
    type: "quiz_pass",
    title: "ผ่านแบบทดสอบ: การจัดการสิ่งเร้า",
    points: 8,
    daysReduced: 2,
  },
];

// ========== TUTOR Q&A SAMPLES ==========
// ========== LEARNER ROSTER (admin view) ==========
export interface LearnerEnrollment {
  courseId: string;
  progress: number; // 0-100
  status: "in_progress" | "completed" | "not_started";
  lastActivityAt: string; // ISO
  quizScore?: number; // 0-100
}

export interface Learner {
  id: string;
  prisonNumber: string;
  name: string;
  age: number;
  prison: string;
  block: string;
  releaseDate: string; // ISO
  parolePoints: number;
  paroleTarget: number;
  daysReducedSoFar: number;
  enrollments: LearnerEnrollment[];
  certificates: number; // count
  flags?: ("ไม่เข้าเรียนนาน" | "Top XP")[];
  lastActiveAt: string; // ISO
  status: "active" | "inactive" | "released";
}

export const LEARNERS: Learner[] = [
  {
    id: "lr-001",
    prisonNumber: "61-0247",
    name: "นายอรรณพ ศรีสุข",
    age: 34,
    prison: "เรือนจำกลางคลองเปรม",
    block: "แดน 3 ห้อง 14",
    releaseDate: "2027-08-15",
    parolePoints: 175,
    paroleTarget: 300,
    daysReducedSoFar: 42,
    certificates: 1,
    enrollments: [
      { courseId: "ic1", progress: 75, status: "in_progress", lastActivityAt: "2026-04-26", quizScore: 84 },
      { courseId: "ic2", progress: 20, status: "in_progress", lastActivityAt: "2026-04-22" },
      { courseId: "ic4", progress: 50, status: "in_progress", lastActivityAt: "2026-04-25" },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-02-10", quizScore: 92 },
      { courseId: "ic8", progress: 40, status: "in_progress", lastActivityAt: "2026-04-20" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-002",
    prisonNumber: "62-1129",
    name: "นายสมพงษ์ จันทรา",
    age: 41,
    prison: "เรือนจำกลางคลองเปรม",
    block: "แดน 5 ห้อง 22",
    releaseDate: "2026-09-12",
    parolePoints: 285,
    paroleTarget: 300,
    daysReducedSoFar: 71,
    certificates: 3,
    enrollments: [
      { courseId: "ic1", progress: 100, status: "completed", lastActivityAt: "2026-01-15", quizScore: 95 },
      { courseId: "ic7", progress: 100, status: "completed", lastActivityAt: "2026-02-20", quizScore: 88 },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-03-10", quizScore: 90 },
      { courseId: "ic4", progress: 80, status: "in_progress", lastActivityAt: "2026-04-26" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: ["Top XP"],
  },
  {
    id: "lr-003",
    prisonNumber: "60-3340",
    name: "นายธนากร วงศ์ทอง",
    age: 28,
    prison: "เรือนจำกลางบางขวาง",
    block: "แดน 2 ห้อง 8",
    releaseDate: "2028-12-20",
    parolePoints: 95,
    paroleTarget: 300,
    daysReducedSoFar: 22,
    certificates: 0,
    enrollments: [
      { courseId: "ic2", progress: 60, status: "in_progress", lastActivityAt: "2026-04-25" },
      { courseId: "ic3", progress: 35, status: "in_progress", lastActivityAt: "2026-04-23" },
      { courseId: "ic10", progress: 50, status: "in_progress", lastActivityAt: "2026-04-24" },
    ],
    lastActiveAt: "2026-04-25",
    status: "active",
    flags: [],
  },
  {
    id: "lr-004",
    prisonNumber: "63-0892",
    name: "นางสาวศิริพร แสงทอง",
    age: 31,
    prison: "ทัณฑสถานหญิงกลาง",
    block: "แดน 1 ห้อง 6",
    releaseDate: "2027-03-08",
    parolePoints: 220,
    paroleTarget: 300,
    daysReducedSoFar: 55,
    certificates: 2,
    enrollments: [
      { courseId: "ic1", progress: 100, status: "completed", lastActivityAt: "2026-01-30", quizScore: 96 },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-03-15", quizScore: 89 },
      { courseId: "ic6", progress: 65, status: "in_progress", lastActivityAt: "2026-04-26" },
      { courseId: "ic8", progress: 30, status: "in_progress", lastActivityAt: "2026-04-22" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-005",
    prisonNumber: "59-4521",
    name: "นายประยุทธ ทับทิม",
    age: 52,
    prison: "เรือนจำกลางสมุทรสาคร",
    block: "แดน 4 ห้อง 18",
    releaseDate: "2026-06-30",
    parolePoints: 305,
    paroleTarget: 300,
    daysReducedSoFar: 88,
    certificates: 4,
    enrollments: [
      { courseId: "ic1", progress: 100, status: "completed", lastActivityAt: "2025-11-20", quizScore: 92 },
      { courseId: "ic2", progress: 100, status: "completed", lastActivityAt: "2025-12-15", quizScore: 87 },
      { courseId: "ic7", progress: 100, status: "completed", lastActivityAt: "2026-02-10", quizScore: 94 },
      { courseId: "ic9", progress: 100, status: "completed", lastActivityAt: "2026-03-25", quizScore: 91 },
    ],
    lastActiveAt: "2026-04-20",
    status: "active",
    flags: ["Top XP"],
  },
  {
    id: "lr-006",
    prisonNumber: "62-2208",
    name: "นายวิชัย สุขสบาย",
    age: 38,
    prison: "เรือนจำกลางพระนครศรีอยุธยา",
    block: "แดน 2 ห้อง 11",
    releaseDate: "2029-04-15",
    parolePoints: 65,
    paroleTarget: 300,
    daysReducedSoFar: 14,
    certificates: 0,
    enrollments: [
      { courseId: "ic3", progress: 25, status: "in_progress", lastActivityAt: "2026-03-18" },
      { courseId: "ic5", progress: 40, status: "in_progress", lastActivityAt: "2026-03-22" },
    ],
    lastActiveAt: "2026-03-22",
    status: "inactive",
    flags: ["ไม่เข้าเรียนนาน"],
  },
  {
    id: "lr-007",
    prisonNumber: "61-5642",
    name: "นายอภิชาติ พิมพา",
    age: 45,
    prison: "เรือนจำกลางเชียงใหม่",
    block: "แดน 3 ห้อง 9",
    releaseDate: "2027-11-22",
    parolePoints: 198,
    paroleTarget: 300,
    daysReducedSoFar: 48,
    certificates: 2,
    enrollments: [
      { courseId: "ic7", progress: 100, status: "completed", lastActivityAt: "2026-02-28", quizScore: 86 },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-03-30", quizScore: 90 },
      { courseId: "ic1", progress: 55, status: "in_progress", lastActivityAt: "2026-04-26" },
      { courseId: "ic4", progress: 30, status: "in_progress", lastActivityAt: "2026-04-24" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-008",
    prisonNumber: "63-1473",
    name: "นายเกริกพล รัตนา",
    age: 26,
    prison: "เรือนจำพิเศษกรุงเทพ",
    block: "แดน 1 ห้อง 4",
    releaseDate: "2028-07-08",
    parolePoints: 145,
    paroleTarget: 300,
    daysReducedSoFar: 32,
    certificates: 1,
    enrollments: [
      { courseId: "ic2", progress: 100, status: "completed", lastActivityAt: "2026-03-05", quizScore: 85 },
      { courseId: "ic6", progress: 50, status: "in_progress", lastActivityAt: "2026-04-25" },
      { courseId: "ic10", progress: 70, status: "in_progress", lastActivityAt: "2026-04-26" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-009",
    prisonNumber: "60-7720",
    name: "นางสาวปวีณา นพคุณ",
    age: 36,
    prison: "ทัณฑสถานหญิงกลาง",
    block: "แดน 2 ห้อง 12",
    releaseDate: "2026-08-25",
    parolePoints: 268,
    paroleTarget: 300,
    daysReducedSoFar: 64,
    certificates: 3,
    enrollments: [
      { courseId: "ic1", progress: 100, status: "completed", lastActivityAt: "2026-01-08", quizScore: 93 },
      { courseId: "ic4", progress: 100, status: "completed", lastActivityAt: "2026-02-22", quizScore: 88 },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-03-18", quizScore: 95 },
      { courseId: "ic6", progress: 75, status: "in_progress", lastActivityAt: "2026-04-26" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: ["Top XP"],
  },
  {
    id: "lr-010",
    prisonNumber: "62-3091",
    name: "นายมานพ ภูทอง",
    age: 49,
    prison: "เรือนจำกลางขอนแก่น",
    block: "แดน 4 ห้อง 21",
    releaseDate: "2030-02-14",
    parolePoints: 38,
    paroleTarget: 300,
    daysReducedSoFar: 8,
    certificates: 0,
    enrollments: [
      { courseId: "ic3", progress: 15, status: "in_progress", lastActivityAt: "2026-04-10" },
      { courseId: "ic8", progress: 20, status: "in_progress", lastActivityAt: "2026-04-15" },
    ],
    lastActiveAt: "2026-04-15",
    status: "active",
    flags: [],
  },
  {
    id: "lr-011",
    prisonNumber: "61-8814",
    name: "นายสุริยา แก้วใส",
    age: 33,
    prison: "เรือนจำกลางคลองเปรม",
    block: "แดน 6 ห้อง 25",
    releaseDate: "2027-05-10",
    parolePoints: 156,
    paroleTarget: 300,
    daysReducedSoFar: 38,
    certificates: 1,
    enrollments: [
      { courseId: "ic9", progress: 100, status: "completed", lastActivityAt: "2026-02-15", quizScore: 87 },
      { courseId: "ic1", progress: 45, status: "in_progress", lastActivityAt: "2026-04-26" },
      { courseId: "ic4", progress: 60, status: "in_progress", lastActivityAt: "2026-04-25" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-012",
    prisonNumber: "63-0512",
    name: "นายวรพล จิตรประเสริฐ",
    age: 29,
    prison: "เรือนจำกลางบางขวาง",
    block: "แดน 1 ห้อง 17",
    releaseDate: "2026-12-30",
    parolePoints: 245,
    paroleTarget: 300,
    daysReducedSoFar: 58,
    certificates: 2,
    enrollments: [
      { courseId: "ic2", progress: 100, status: "completed", lastActivityAt: "2026-02-10", quizScore: 91 },
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-03-22", quizScore: 89 },
      { courseId: "ic8", progress: 80, status: "in_progress", lastActivityAt: "2026-04-26" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-013",
    prisonNumber: "59-9920",
    name: "นายชัยรัตน์ บุญมา",
    age: 56,
    prison: "เรือนจำกลางสมุทรสาคร",
    block: "แดน 3 ห้อง 5",
    releaseDate: "2028-09-18",
    parolePoints: 112,
    paroleTarget: 300,
    daysReducedSoFar: 26,
    certificates: 1,
    enrollments: [
      { courseId: "ic3", progress: 100, status: "completed", lastActivityAt: "2026-03-12", quizScore: 78 },
      { courseId: "ic7", progress: 50, status: "in_progress", lastActivityAt: "2026-04-23" },
    ],
    lastActiveAt: "2026-04-23",
    status: "active",
    flags: [],
  },
  {
    id: "lr-014",
    prisonNumber: "62-6471",
    name: "นางสาวเสาวลักษณ์ ใจเย็น",
    age: 27,
    prison: "ทัณฑสถานหญิงกลาง",
    block: "แดน 1 ห้อง 9",
    releaseDate: "2027-07-15",
    parolePoints: 182,
    paroleTarget: 300,
    daysReducedSoFar: 44,
    certificates: 2,
    enrollments: [
      { courseId: "ic5", progress: 100, status: "completed", lastActivityAt: "2026-02-28", quizScore: 94 },
      { courseId: "ic6", progress: 100, status: "completed", lastActivityAt: "2026-03-20", quizScore: 86 },
      { courseId: "ic1", progress: 65, status: "in_progress", lastActivityAt: "2026-04-26" },
    ],
    lastActiveAt: "2026-04-26",
    status: "active",
    flags: [],
  },
  {
    id: "lr-015",
    prisonNumber: "61-2289",
    name: "นายภาณุพงศ์ ทรัพย์ดี",
    age: 42,
    prison: "เรือนจำกลางพระนครศรีอยุธยา",
    block: "แดน 5 ห้อง 13",
    releaseDate: "2029-11-05",
    parolePoints: 78,
    paroleTarget: 300,
    daysReducedSoFar: 18,
    certificates: 0,
    enrollments: [
      { courseId: "ic2", progress: 30, status: "in_progress", lastActivityAt: "2026-04-08" },
      { courseId: "ic10", progress: 25, status: "in_progress", lastActivityAt: "2026-04-12" },
    ],
    lastActiveAt: "2026-04-12",
    status: "inactive",
    flags: ["ไม่เข้าเรียนนาน"],
  },
];

// Helpers
export function getLearnerStats() {
  const total = LEARNERS.length;
  const active = LEARNERS.filter((l) => l.status === "active").length;
  const totalEnrollments = LEARNERS.reduce((s, l) => s + l.enrollments.length, 0);
  const completedEnrollments = LEARNERS.reduce(
    (s, l) => s + l.enrollments.filter((e) => e.status === "completed").length,
    0
  );
  const totalCertificates = LEARNERS.reduce((s, l) => s + l.certificates, 0);
  const totalDaysReduced = LEARNERS.reduce((s, l) => s + l.daysReducedSoFar, 0);
  const totalParolePoints = LEARNERS.reduce((s, l) => s + l.parolePoints, 0);
  const nearTarget = LEARNERS.filter((l) => l.parolePoints >= l.paroleTarget * 0.85).length;
  const completionRate =
    totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;
  return {
    total,
    active,
    totalEnrollments,
    completedEnrollments,
    totalCertificates,
    totalDaysReduced,
    totalParolePoints,
    nearTarget,
    completionRate,
  };
}

export function getCourseStats() {
  return INMATE_COURSES.map((c) => {
    const enrollments = LEARNERS.flatMap((l) =>
      l.enrollments.filter((e) => e.courseId === c.id)
    );
    const completed = enrollments.filter((e) => e.status === "completed").length;
    const inProgress = enrollments.filter((e) => e.status === "in_progress").length;
    const avgScore =
      enrollments
        .map((e) => e.quizScore ?? 0)
        .filter((s) => s > 0)
        .reduce((a, b, _, arr) => a + b / arr.length, 0) || 0;
    return {
      course: c,
      enrolled: enrollments.length,
      completed,
      inProgress,
      avgScore: Math.round(avgScore),
      completionRate:
        enrollments.length > 0 ? Math.round((completed / enrollments.length) * 100) : 0,
    };
  });
}

export const PRISONS = [
  "เรือนจำกลางคลองเปรม",
  "เรือนจำกลางบางขวาง",
  "เรือนจำกลางสมุทรสาคร",
  "เรือนจำกลางพระนครศรีอยุธยา",
  "เรือนจำกลางเชียงใหม่",
  "เรือนจำกลางขอนแก่น",
  "เรือนจำพิเศษกรุงเทพ",
  "ทัณฑสถานหญิงกลาง",
];

export const TUTOR_SUGGESTIONS_INMATE: Record<string, string[]> = {
  default: [
    "อธิบายบทนี้ให้ฟังหน่อย",
    "ขอตัวอย่างเพิ่ม",
    "ทำไมต้องทำขั้นตอนนี้",
    "ขอสรุปสั้นๆ",
  ],
  ic1: [
    "ทำไมต้องตีไข่ก่อนผสมแป้ง",
    "ถ้าเตาอบไม่มีจะใช้อะไรแทน",
    "ขนมปังขึ้นไม่ฟู ทำยังไง",
    "ต้นทุนต่อชิ้นเท่าไหร่",
  ],
  ic2: [
    "สายเฟส กับ สายนิวทรัล ต่างกันยังไง",
    "ทำไมต้องต่อสายดิน",
    "เครื่องมือพื้นฐานที่ต้องมีคือ",
  ],
};
