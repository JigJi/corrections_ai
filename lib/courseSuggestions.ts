export interface SuggestionLessonDraft {
  title: string;
  kind: "video" | "reading" | "audio" | "interactive" | "quiz";
  duration: string;
}

export interface CourseSuggestion {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  category: string;
  level: "พื้นฐาน" | "กลาง" | "สูง";
  color: string;
  trendStat: { value: string; label: string };
  marketStat: { value: string; label: string };
  reasoning: string;
  sources: string[];
  // Full draft (Corry's first draft for human review)
  outcomes: string[];
  lessons: SuggestionLessonDraft[];
  coverUrl: string;
  relatedKnowledgeIds: string[];
}

export const COURSE_SUGGESTIONS: CourseSuggestion[] = [
  // ============ AI / ChatGPT ============
  {
    id: "ai-basics",
    title: "ทักษะการใช้ AI / ChatGPT สำหรับการทำงาน",
    subtitle: "ใช้ AI ช่วยทำงานเร็วขึ้น 2 เท่า — เริ่มจากศูนย์ ไม่ต้องเก่งคอม",
    emoji: "🤖",
    category: "ความรู้พื้นฐาน",
    level: "พื้นฐาน",
    color: "from-violet-500 to-fuchsia-600",
    trendStat: { value: "+340%", label: "ตำแหน่งงานต้องการ AI literacy" },
    marketStat: { value: "25,000+", label: "บาท/เดือน เริ่มต้น" },
    reasoning:
      "WEF จัดให้เป็นทักษะอันดับ 1 ที่ต้องมีในปี 2027 · กระทรวงแรงงานไทยประกาศ Reskill agenda · ผู้เรียนนำไปใช้สมัครงานออฟฟิศและ freelance ได้ทันที",
    sources: ["JobsDB Thailand 2026", "World Economic Forum Future of Jobs"],
    outcomes: [
      "เข้าใจหลักการทำงานของ AI / Chatbot ในชีวิตประจำวัน",
      "เขียน prompt เพื่อให้ AI ตอบตรงประเด็น",
      "ใช้ AI ช่วยร่างอีเมล สรุปเอกสาร เขียนรายงาน",
      "ใช้ AI สร้างไอเดีย วางแผน และแก้ปัญหา",
      "รู้ขีดจำกัดของ AI และตรวจสอบความถูกต้องเองได้",
    ],
    lessons: [
      { title: "AI คืออะไร · ทำงานยังไง", kind: "video", duration: "15 นาที" },
      { title: "ChatGPT / Gemini / Claude — ใช้ตัวไหนเมื่อไหร่", kind: "video", duration: "20 นาที" },
      { title: "หลักการเขียน prompt ที่ดี", kind: "video", duration: "25 นาที" },
      { title: "ฝึก: ให้ AI ร่างอีเมล + เอกสารราชการ", kind: "interactive", duration: "30 นาที" },
      { title: "ฝึก: ให้ AI สรุปเอกสารยาวและตอบคำถาม", kind: "interactive", duration: "30 นาที" },
      { title: "AI hallucination + จริยธรรมการใช้", kind: "video", duration: "20 นาที" },
      { title: "แบบทดสอบ + ส่งงานจริง", kind: "quiz", duration: "30 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Mobile Repair ============
  {
    id: "mobile-repair",
    title: "ซ่อมมือถือเบื้องต้น (เปลี่ยนจอ / แบตเตอรี่)",
    subtitle: "ลงทุน 8,000 บาท เปิดร้านได้ใน 1 เดือน — รายได้ 400-800 บาท/วัน",
    emoji: "📱",
    category: "ทักษะอาชีพ",
    level: "กลาง",
    color: "from-blue-500 to-cyan-600",
    trendStat: { value: "+18%/ปี", label: "ตลาดบริการซ่อมโต" },
    marketStat: { value: "400-800", label: "บาท/วัน อาชีพอิสระ" },
    reasoning:
      "ความต้องการสูงในต่างจังหวัดและชุมชน · ลงทุนเครื่องมือเริ่มต้นไม่เกิน 8,000 บาท · เปิดร้านในตลาด/หน้าบ้านได้ · ตลาดยังไม่อิ่มตัว",
    sources: ["Kasikorn Research", "กรมพัฒนาธุรกิจการค้า"],
    outcomes: [
      "เปลี่ยนหน้าจอ iPhone / Android ได้ทุกรุ่น",
      "เปลี่ยนแบตเตอรี่และทำความสะอาดเครื่อง",
      "วิเคราะห์อาการเสียและประเมินค่าซ่อม",
      "จัดการเครื่องมือและอะไหล่อย่างปลอดภัย",
      "เปิดร้านซ่อมขนาดเล็กและตั้งราคาบริการ",
    ],
    lessons: [
      { title: "ความรู้พื้นฐาน + เครื่องมือช่าง", kind: "video", duration: "20 นาที" },
      { title: "ถอดประกอบ iPhone (ทุกรุ่น)", kind: "video", duration: "60 นาที" },
      { title: "ถอดประกอบ Android ยี่ห้อต่างๆ", kind: "video", duration: "60 นาที" },
      { title: "เปลี่ยนหน้าจอ — ฝึกปฏิบัติ", kind: "interactive", duration: "90 นาที" },
      { title: "เปลี่ยนแบตเตอรี่ + ทำความสะอาด", kind: "video", duration: "45 นาที" },
      { title: "วิเคราะห์อาการเสียทั่วไป", kind: "interactive", duration: "60 นาที" },
      { title: "การให้บริการลูกค้าและตั้งราคา", kind: "reading", duration: "30 นาที" },
      { title: "สอบปฏิบัติ + ส่งภาพผลงาน", kind: "quiz", duration: "60 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1601972602288-3be527b4f18d?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: ["k10"],
  },

  // ============ EV Mechanic ============
  {
    id: "ev-mechanic",
    title: "ช่างซ่อมรถยนต์ไฟฟ้า (EV) เบื้องต้น",
    subtitle: "อาชีพที่ขาดแคลนระดับวิกฤต — ค่าจ้างสูงกว่าช่างทั่วไป 40%",
    emoji: "🔋",
    category: "ทักษะอาชีพ",
    level: "สูง",
    color: "from-emerald-500 to-green-600",
    trendStat: { value: "+200%", label: "ยอดจดทะเบียน EV ปี 2026" },
    marketStat: { value: "ขาดแคลน", label: "ระดับวิกฤต" },
    reasoning:
      "รถ EV จดทะเบียนทะลุ 100,000 คัน · กระทรวงพลังงานเร่งผลิตช่าง · เป็นทักษะที่ AI แทนที่ไม่ได้ในอนาคต 10 ปี",
    sources: ["กรมการขนส่งทางบก", "EV Association of Thailand"],
    outcomes: [
      "เข้าใจระบบรถยนต์ไฟฟ้าและความแตกต่างจากเครื่องยนต์สันดาป",
      "ตรวจสอบและบำรุงรักษาแบตเตอรี่ Li-ion",
      "ใช้เครื่องมือวินิจฉัย OBD-II สำหรับ EV",
      "ความปลอดภัยในการทำงานกับไฟฟ้าแรงสูง",
      "ซ่อมระบบ powertrain เบื้องต้น",
    ],
    lessons: [
      { title: "ภาพรวมรถยนต์ไฟฟ้า + ส่วนประกอบ", kind: "video", duration: "30 นาที" },
      { title: "แบตเตอรี่ Li-ion: หลักการ + ความปลอดภัย", kind: "video", duration: "60 นาที" },
      { title: "ระบบ Powertrain ของ EV", kind: "video", duration: "60 นาที" },
      { title: "เครื่องมือวินิจฉัย OBD-II สำหรับ EV", kind: "interactive", duration: "90 นาที" },
      { title: "การชาร์จและระบบ BMS", kind: "video", duration: "45 นาที" },
      { title: "ความปลอดภัยไฟฟ้าแรงสูง (HVDC)", kind: "video", duration: "60 นาที" },
      { title: "การบำรุงรักษาเชิงป้องกัน", kind: "reading", duration: "60 นาที" },
      { title: "ปฏิบัติ: ตรวจสอบ EV จริง", kind: "interactive", duration: "180 นาที" },
      { title: "การประสานงานกับศูนย์บริการแบรนด์", kind: "reading", duration: "30 นาที" },
      { title: "สอบทฤษฎี + ปฏิบัติ", kind: "quiz", duration: "120 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Content Creator ============
  {
    id: "content-tiktok",
    title: "ทำคอนเทนต์ TikTok / Reels เพื่อสร้างรายได้",
    subtitle: "เริ่มจากมือถือเครื่องเดียว — สร้างรายได้จาก Affiliate + Brand",
    emoji: "🎬",
    category: "ทักษะอาชีพ",
    level: "พื้นฐาน",
    color: "from-rose-500 to-pink-600",
    trendStat: { value: "14,000 ลบ.", label: "Creator economy ไทย" },
    marketStat: { value: "Affiliate", label: "+ Brand sponsor" },
    reasoning:
      "ตลาด creator ไทยใหญ่อันดับ 4 ของอาเซียน · ใช้สมัครงาน marketing ได้ · เป็นรายได้เสริมระยะยาว · ไม่ต้องลงทุนสูง",
    sources: ["DAAT Thailand", "We Are Social Digital Report"],
    outcomes: [
      "วางแผน content niche ที่ตรงตัวเอง",
      "ถ่าย/ตัดต่อด้วยมือถือเป็น (CapCut)",
      "เขียน hook 3 วินาทีให้คนดูจบ",
      "ใช้ระบบ Affiliate ของ TikTok / Shopee",
      "วิเคราะห์ analytics และปรับปรุง content",
    ],
    lessons: [
      { title: "ภาพรวม creator economy ในไทย", kind: "video", duration: "20 นาที" },
      { title: "เลือก niche ที่ใช่สำหรับคุณ", kind: "interactive", duration: "30 นาที" },
      { title: "ถ่ายให้สวยด้วยมือถือ + แสง", kind: "video", duration: "45 นาที" },
      { title: "ตัดต่อ CapCut เบื้องต้น", kind: "video", duration: "60 นาที" },
      { title: "Hook 3 วินาที + storytelling", kind: "video", duration: "30 นาที" },
      { title: "Affiliate / Brand sponsor", kind: "reading", duration: "30 นาที" },
      { title: "วิเคราะห์ analytics + ปรับ content", kind: "interactive", duration: "30 นาที" },
      { title: "ส่งคลิปจริง + รับ feedback", kind: "quiz", duration: "60 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Mushroom Farming ============
  {
    id: "mushroom",
    title: "เพาะเห็ดเศรษฐกิจ (นางฟ้า / หูหนู / ฟาง)",
    subtitle: "ลงทุนต่ำ คืนทุนเร็ว — ใช้พื้นที่หลังบ้านได้",
    emoji: "🍄",
    category: "ทักษะอาชีพ",
    level: "พื้นฐาน",
    color: "from-amber-500 to-orange-600",
    trendStat: { value: "+22%/ปี", label: "ตลาดเห็ดพรีเมียมโต" },
    marketStat: { value: "40%", label: "ROI ภายใน 6 เดือน" },
    reasoning:
      "ลงทุนต่ำ คืนทุนเร็ว · ตลาดในประเทศและส่งออก · ใช้พื้นที่จำกัดได้ · ทดแทนรายได้เกษตรหลักได้",
    sources: ["กรมส่งเสริมการเกษตร", "ตลาดสี่มุมเมือง"],
    outcomes: [
      "เลือกชนิดเห็ดที่เหมาะกับพื้นที่",
      "ทำก้อนเชื้อเห็ดเองได้",
      "ออกแบบโรงเพาะและควบคุมความชื้น",
      "เก็บเกี่ยวและเก็บรักษาเห็ดสด",
      "วางแผนต้นทุนและหาตลาด",
    ],
    lessons: [
      { title: "ภาพรวมเห็ดเศรษฐกิจในไทย", kind: "video", duration: "20 นาที" },
      { title: "เห็ดนางฟ้า · นางรม · หูหนู", kind: "video", duration: "30 นาที" },
      { title: "ทำก้อนเชื้อเห็ดเอง", kind: "video", duration: "60 นาที" },
      { title: "ออกแบบโรงเพาะขนาดเล็ก", kind: "video", duration: "45 นาที" },
      { title: "ควบคุมความชื้นและอุณหภูมิ", kind: "interactive", duration: "30 นาที" },
      { title: "เก็บเกี่ยวและเก็บรักษา", kind: "video", duration: "30 นาที" },
      { title: "ตลาดสด · ตลาดออนไลน์ · ส่งร้าน", kind: "reading", duration: "30 นาที" },
      { title: "คำนวณต้นทุน + วางแผนธุรกิจ", kind: "interactive", duration: "30 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1607893407673-fdc3081ce4d3?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Delivery / Rider ============
  {
    id: "delivery",
    title: "ขับรถส่งของและ Rider แอปขนส่ง",
    subtitle: "ใบขับขี่ + สมาร์ทโฟน เริ่มได้เลย — รายได้รายวัน",
    emoji: "🛵",
    category: "ทักษะอาชีพ",
    level: "พื้นฐาน",
    color: "from-indigo-500 to-blue-600",
    trendStat: { value: "+25%/ปี", label: "Gig economy ไทย" },
    marketStat: { value: "450-650", label: "บาท/วัน เฉลี่ย" },
    reasoning:
      "ความต้องการสูงในเมืองใหญ่ · ใบขับขี่ + สมาร์ทโฟน เริ่มได้เลย · ทำเป็นอาชีพหลัก/เสริมได้",
    sources: ["LINE MAN Wongnai", "Grab Thailand"],
    outcomes: [
      "สมัครเข้าระบบ Rider ของแอปหลักได้",
      "วางแผนเส้นทางและจัดการเวลาให้ได้รายได้สูงสุด",
      "ขับขี่ปลอดภัย + ดูแลรถ",
      "บริหารรายได้รายวัน + เก็บภาษี",
      "จัดการลูกค้าและการคืนสินค้า",
    ],
    lessons: [
      { title: "ภาพรวมงาน Rider ในไทย", kind: "video", duration: "15 นาที" },
      { title: "การสมัครเข้าระบบแอปหลัก", kind: "interactive", duration: "30 นาที" },
      { title: "ความปลอดภัยในการขับขี่", kind: "video", duration: "45 นาที" },
      { title: "วางแผนเส้นทาง + จัดการเวลา", kind: "video", duration: "30 นาที" },
      { title: "บริหารรายได้ + ภาษี", kind: "reading", duration: "30 นาที" },
      { title: "แบบทดสอบ", kind: "quiz", duration: "20 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1599672049094-7704ca3ad923?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Barista Pro ============
  {
    id: "barista-pro",
    title: "บาริสต้ามืออาชีพ + เปิดร้านกาแฟเล็ก",
    subtitle: "Espresso · Latte · Drip — ทำงานในร้านได้ทันที",
    emoji: "☕",
    category: "ทักษะอาชีพ",
    level: "กลาง",
    color: "from-stone-500 to-amber-700",
    trendStat: { value: "+12%/ปี", label: "ตลาดกาแฟไทยโต" },
    marketStat: { value: "1.5-3 ลบ.", label: "บาท ลงทุนเปิดร้าน" },
    reasoning:
      "ตลาดกาแฟพิเศษ (specialty) ขยายตัว · เปิดร้านขนาดเล็กในชุมชนได้ · ทักษะใช้ทำงานในร้านอื่นก่อน",
    sources: ["SCB EIC", "สมาคมกาแฟพิเศษไทย"],
    outcomes: [
      "ชง Espresso ตามมาตรฐาน",
      "ทำ Latte Art พื้นฐาน",
      "ใช้เครื่องชง / บดเมล็ดได้",
      "เข้าใจการสกัดและรสชาติ",
      "วางแผนเปิดร้านกาแฟขนาดเล็ก",
    ],
    lessons: [
      { title: "พื้นฐานเมล็ดกาแฟและการคั่ว", kind: "video", duration: "20 นาที" },
      { title: "การบดและสกัด", kind: "video", duration: "30 นาที" },
      { title: "Espresso พื้นฐาน", kind: "video", duration: "40 นาที" },
      { title: "Latte Art", kind: "video", duration: "30 นาที" },
      { title: "Pour-over และ Drip", kind: "video", duration: "30 นาที" },
      { title: "การให้บริการในร้าน", kind: "interactive", duration: "30 นาที" },
      { title: "วางแผนเปิดร้าน", kind: "reading", duration: "30 นาที" },
      { title: "ฝึกปฏิบัติ + แบบทดสอบ", kind: "quiz", duration: "60 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },

  // ============ Elderly Care ============
  {
    id: "elderly-care",
    title: "ผู้ดูแลผู้สูงอายุเบื้องต้น (Caregiver)",
    subtitle: "ทักษะที่ตลาดต้องการเร่งด่วน — มีโอกาสไปทำงานต่างประเทศ",
    emoji: "🧓",
    category: "ทักษะอาชีพ",
    level: "กลาง",
    color: "from-rose-400 to-red-500",
    trendStat: { value: "20% ปี 2030", label: "สัดส่วนผู้สูงอายุไทย" },
    marketStat: { value: "18,000+", label: "บาท/เดือน" },
    reasoning:
      "ไทยเข้าสู่สังคมผู้สูงอายุสมบูรณ์แบบ · ความต้องการ caregiver เพิ่มต่อเนื่อง · มีโอกาสไปทำงานต่างประเทศ (ญี่ปุ่น/ไต้หวัน)",
    sources: ["สำนักงานสถิติแห่งชาติ", "กรมกิจการผู้สูงอายุ"],
    outcomes: [
      "ดูแลกิจวัตรประจำวันผู้สูงอายุ",
      "ปฐมพยาบาลและจัดการเหตุฉุกเฉิน",
      "เข้าใจโรคที่พบบ่อยในผู้สูงอายุ",
      "การให้ยาและจัดการอาหาร",
      "การสื่อสารกับครอบครัว",
    ],
    lessons: [
      { title: "บทบาท Caregiver และจริยธรรม", kind: "video", duration: "30 นาที" },
      { title: "ดูแลกิจวัตรประจำวัน", kind: "video", duration: "60 นาที" },
      { title: "โรคที่พบบ่อยในผู้สูงอายุ", kind: "video", duration: "60 นาที" },
      { title: "การให้ยาและจัดการอาหาร", kind: "interactive", duration: "60 นาที" },
      { title: "ปฐมพยาบาลฉุกเฉิน", kind: "video", duration: "60 นาที" },
      { title: "การสื่อสารกับครอบครัว", kind: "video", duration: "30 นาที" },
      { title: "สุขภาพจิตของผู้ดูแล", kind: "reading", duration: "30 นาที" },
      { title: "เตรียมไปทำงานต่างประเทศ (ญี่ปุ่น/ไต้หวัน)", kind: "reading", duration: "60 นาที" },
      { title: "ฝึกปฏิบัติ + Case study", kind: "interactive", duration: "120 นาที" },
      { title: "สอบประเมินผล", kind: "quiz", duration: "60 นาที" },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    relatedKnowledgeIds: [],
  },
];

export function findSuggestion(id: string): CourseSuggestion | undefined {
  return COURSE_SUGGESTIONS.find((s) => s.id === id);
}
