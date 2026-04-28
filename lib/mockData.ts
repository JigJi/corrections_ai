export type DocType = "pdf" | "video" | "image" | "audio" | "doc" | "slide";

export type Category =
  | "กฎหมายและระเบียบ"
  | "คู่มือปฏิบัติงาน"
  | "สื่อการสอน/อบรม"
  | "งานวิจัย"
  | "ประกาศ/หนังสือเวียน"
  | "ข้อมูลบุคคล";

export interface KnowledgeItem {
  id: string;
  title: string;
  excerpt: string;
  type: DocType;
  category: Category;
  tags: string[];
  updatedAt: string; // ISO
  size: string;
  source: string;
  pages?: number;
  duration?: string;
  classification: "สาธารณะ" | "ภายใน" | "ลับ";
  views: number;
  relevance?: number; // 0–1
}

export const MOCK_ITEMS: KnowledgeItem[] = [
  {
    id: "k1",
    title: "พระราชบัญญัติราชทัณฑ์ พ.ศ. 2560 (ฉบับปรับปรุง 2566)",
    excerpt:
      "บทบัญญัติเกี่ยวกับการควบคุมและพัฒนาพฤตินิสัยของผู้ต้องขัง รวมถึงสิทธิประโยชน์ การลดวันต้องโทษ และการปล่อยตัวก่อนกำหนด...",
    type: "pdf",
    category: "กฎหมายและระเบียบ",
    tags: ["พ.ร.บ.", "ผู้ต้องขัง", "สิทธิ"],
    updatedAt: "2024-08-12",
    size: "3.4 MB",
    source: "กองนิติการ",
    pages: 84,
    classification: "สาธารณะ",
    views: 12480,
    relevance: 0.98,
  },
  {
    id: "k2",
    title: "ระเบียบการเยี่ยมญาติผู้ต้องขังในสถานการณ์ฉุกเฉิน",
    excerpt:
      "หลักเกณฑ์การจัดการเยี่ยมญาติแบบออนไลน์และในสถานที่ ในกรณีโรคระบาดหรือเหตุการณ์ฉุกเฉินอื่น ๆ...",
    type: "pdf",
    category: "กฎหมายและระเบียบ",
    tags: ["เยี่ยมญาติ", "ออนไลน์", "โควิด"],
    updatedAt: "2024-11-03",
    size: "1.2 MB",
    source: "กองทัณฑวิทยา",
    pages: 18,
    classification: "ภายใน",
    views: 5821,
    relevance: 0.95,
  },
  {
    id: "k3",
    title: "วิดีโออบรม: การใช้กำลังในการควบคุมเหตุก่อกวน",
    excerpt:
      "วิดีโอการสอนของกรมราชทัณฑ์ ครอบคลุมหลักการใช้กำลังตามขั้น (Use-of-force continuum) เทคนิคการควบคุม การสื่อสารปลดชนวน...",
    type: "video",
    category: "สื่อการสอน/อบรม",
    tags: ["อบรม", "ควบคุม", "ความปลอดภัย"],
    updatedAt: "2024-09-22",
    size: "412 MB",
    source: "ศูนย์ฝึกอบรมราชทัณฑ์",
    duration: "1 ชม. 24 นาที",
    classification: "ภายใน",
    views: 3204,
    relevance: 0.91,
  },
  {
    id: "k4",
    title: "คู่มือเจ้าหน้าที่ผู้คุม ฉบับปฏิบัติงานประจำวัน",
    excerpt:
      "ขั้นตอนการตรวจนับ การส่งเวร การจัดการสิ่งของต้องห้าม การรายงานเหตุ และระบบบันทึกประจำวัน...",
    type: "pdf",
    category: "คู่มือปฏิบัติงาน",
    tags: ["ผู้คุม", "ปฏิบัติงาน", "SOP"],
    updatedAt: "2024-12-01",
    size: "8.7 MB",
    source: "กองยุทธศาสตร์",
    pages: 156,
    classification: "ภายใน",
    views: 9872,
    relevance: 0.89,
  },
  {
    id: "k5",
    title: "งานวิจัย: ประสิทธิผลโปรแกรมพัฒนาพฤตินิสัยในเรือนจำ",
    excerpt:
      "การศึกษาเปรียบเทียบโปรแกรมบำบัดต่อการกระทำผิดซ้ำในระยะ 3 ปี ของผู้พ้นโทษ จำนวน 1,240 ราย...",
    type: "doc",
    category: "งานวิจัย",
    tags: ["พฤตินิสัย", "วิจัย", "กระทำผิดซ้ำ"],
    updatedAt: "2024-06-15",
    size: "2.1 MB",
    source: "สถาบันวิจัยราชทัณฑ์",
    pages: 62,
    classification: "สาธารณะ",
    views: 2107,
    relevance: 0.84,
  },
  {
    id: "k6",
    title: "สไลด์อบรม: การคัดกรองสุขภาพจิตผู้ต้องขังแรกรับ",
    excerpt:
      "หลักเกณฑ์การประเมินสุขภาพจิต แบบประเมินมาตรฐาน และเส้นทางการส่งต่อสำหรับเจ้าหน้าที่...",
    type: "slide",
    category: "สื่อการสอน/อบรม",
    tags: ["สุขภาพจิต", "คัดกรอง", "แรกรับ"],
    updatedAt: "2024-10-18",
    size: "14.3 MB",
    source: "กองอนามัย",
    pages: 48,
    classification: "ภายใน",
    views: 1542,
    relevance: 0.82,
  },
  {
    id: "k7",
    title: "หนังสือเวียน: แนวปฏิบัติการใช้ระบบ EM ติดตามผู้พ้นโทษ",
    excerpt:
      "ขั้นตอนการสวมและถอดอุปกรณ์ติดตามอิเล็กทรอนิกส์ การตรวจสอบสถานะ การแจ้งเตือน และการประสานงานกับหน่วยอื่น...",
    type: "pdf",
    category: "ประกาศ/หนังสือเวียน",
    tags: ["EM", "ติดตามตัว", "พ้นโทษ"],
    updatedAt: "2025-01-08",
    size: "0.9 MB",
    source: "กองทัณฑปฏิบัติ",
    pages: 12,
    classification: "ภายใน",
    views: 4218,
    relevance: 0.78,
  },
  {
    id: "k8",
    title: "เสียงบรรยาย: หลักการกล่าวโทษและสอบสวนทางวินัย",
    excerpt:
      "เสียงบรรยายโดยผู้เชี่ยวชาญด้านวินัย ครอบคลุมหลักฟังความสองฝ่าย การรวบรวมพยานหลักฐาน...",
    type: "audio",
    category: "สื่อการสอน/อบรม",
    tags: ["วินัย", "สอบสวน", "เสียง"],
    updatedAt: "2024-07-29",
    size: "78 MB",
    source: "ศูนย์ฝึกอบรมราชทัณฑ์",
    duration: "47 นาที",
    classification: "ภายใน",
    views: 612,
    relevance: 0.74,
  },
  {
    id: "k9",
    title: "ภาพแผนผังเรือนจำกลางและจุดเสี่ยง",
    excerpt:
      "แผนผังโครงสร้างเรือนจำมาตรฐาน พร้อมระบุจุดเสี่ยงในการเกิดเหตุ จุดติดตั้งกล้อง CCTV และเส้นทางหนีภัย...",
    type: "image",
    category: "คู่มือปฏิบัติงาน",
    tags: ["แผนผัง", "ความปลอดภัย", "CCTV"],
    updatedAt: "2024-04-02",
    size: "5.6 MB",
    source: "กองยุทธศาสตร์",
    classification: "ลับ",
    views: 982,
    relevance: 0.71,
  },
  {
    id: "k10",
    title: "คู่มือเตรียมความพร้อมก่อนปล่อยตัว 6 เดือน",
    excerpt:
      "โปรแกรมเตรียมความพร้อม ครอบคลุมการฝึกอาชีพ ทักษะสังคม ครอบครัวสัมพันธ์ และการประสานงานหลังพ้นโทษ...",
    type: "pdf",
    category: "คู่มือปฏิบัติงาน",
    tags: ["ปล่อยตัว", "เตรียมความพร้อม"],
    updatedAt: "2024-11-25",
    size: "4.8 MB",
    source: "กองพัฒนาพฤตินิสัย",
    pages: 96,
    classification: "ภายใน",
    views: 2451,
    relevance: 0.68,
  },
  {
    id: "k11",
    title: "ประกาศ: หลักเกณฑ์การแต่งตั้งโยกย้ายข้าราชการ ปี 2568",
    excerpt:
      "หลักเกณฑ์ ระยะเวลา และคุณสมบัติในการพิจารณาแต่งตั้งโยกย้ายข้าราชการในสังกัด...",
    type: "pdf",
    category: "ประกาศ/หนังสือเวียน",
    tags: ["บุคคล", "แต่งตั้ง", "โยกย้าย"],
    updatedAt: "2025-02-14",
    size: "0.6 MB",
    source: "กองการเจ้าหน้าที่",
    pages: 8,
    classification: "ภายใน",
    views: 7621,
    relevance: 0.62,
  },
  {
    id: "k12",
    title: "วิดีโอ: การปฐมพยาบาลฉุกเฉินในเรือนจำ",
    excerpt:
      "วิดีโอสาธิตการปฐมพยาบาลผู้ป่วยฉุกเฉิน CPR การห้ามเลือด และการจัดการบาดแผลเบื้องต้นสำหรับเจ้าหน้าที่...",
    type: "video",
    category: "สื่อการสอน/อบรม",
    tags: ["ปฐมพยาบาล", "CPR", "ฉุกเฉิน"],
    updatedAt: "2024-08-30",
    size: "284 MB",
    source: "กองอนามัย",
    duration: "32 นาที",
    classification: "สาธารณะ",
    views: 4108,
    relevance: 0.55,
  },
];

export const CATEGORIES: Category[] = [
  "กฎหมายและระเบียบ",
  "คู่มือปฏิบัติงาน",
  "สื่อการสอน/อบรม",
  "งานวิจัย",
  "ประกาศ/หนังสือเวียน",
  "ข้อมูลบุคคล",
];

export type ConnectorType =
  | "gdrive"
  | "onedrive"
  | "sharepoint"
  | "smb"
  | "folder"
  | "ftp"
  | "dropbox"
  | "email"
  | "s3"
  | "web";

export interface Connector {
  id: string;
  type: ConnectorType;
  name: string;
  path: string;
  fileCount: number;
  lastSync: string; // ISO
  status: "active" | "syncing" | "error" | "paused";
  schedule: string;
  syncedSize: string;
}

export const MOCK_CONNECTORS: Connector[] = [
  {
    id: "c1",
    type: "gdrive",
    name: "Google Drive · กรมราชทัณฑ์",
    path: "/กรมราชทัณฑ์/เอกสารกลาง",
    fileCount: 8420,
    lastSync: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    status: "active",
    schedule: "ทุก 15 นาที",
    syncedSize: "12.4 GB",
  },
  {
    id: "c2",
    type: "sharepoint",
    name: "SharePoint · กองทัณฑวิทยา",
    path: "/sites/correctgo/Documents/Penology",
    fileCount: 2108,
    lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "active",
    schedule: "ทุก 30 นาที",
    syncedSize: "4.1 GB",
  },
  {
    id: "c3",
    type: "smb",
    name: "File Server กลาง (SMB)",
    path: "\\\\fs01.correct.go.th\\public",
    fileCount: 1240,
    lastSync: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "syncing",
    schedule: "ทุกชั่วโมง",
    syncedSize: "2.8 GB",
  },
  {
    id: "c4",
    type: "folder",
    name: "Local Folder · ศูนย์ฝึกอบรม",
    path: "D:\\Training\\Materials",
    fileCount: 712,
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "active",
    schedule: "เรียลไทม์",
    syncedSize: "8.6 GB",
  },
];

export interface ConnectorTypeMeta {
  type: ConnectorType;
  name: string;
  description: string;
  popular?: boolean;
}

export const CONNECTOR_TYPES: ConnectorTypeMeta[] = [
  { type: "gdrive", name: "Google Drive", description: "Sync from Google Workspace", popular: true },
  { type: "sharepoint", name: "SharePoint", description: "Microsoft 365 / SharePoint Online", popular: true },
  { type: "onedrive", name: "OneDrive", description: "Microsoft personal/business cloud" },
  { type: "smb", name: "Network Share (SMB)", description: "Windows file server / NAS", popular: true },
  { type: "folder", name: "Local Folder", description: "โฟลเดอร์ในเครื่องเซิร์ฟเวอร์", popular: true },
  { type: "dropbox", name: "Dropbox", description: "Dropbox Business" },
  { type: "ftp", name: "FTP / SFTP", description: "เซิร์ฟเวอร์ FTP/SFTP ภายใน" },
  { type: "s3", name: "S3-compatible Storage", description: "MinIO, AWS S3, GCS" },
  { type: "email", name: "Email Inbox", description: "ดึงไฟล์แนบจากอีเมล (IMAP)" },
  { type: "web", name: "Web Crawler", description: "เก็บข้อมูลจากเว็บภายในกรมฯ" },
];

export const QUICK_QUERIES = [
  "ระเบียบการเยี่ยมญาติ",
  "ขั้นตอนใช้กำลังควบคุม",
  "การพัฒนาพฤตินิสัย",
  "คู่มือผู้คุมใหม่",
  "การคัดกรองสุขภาพจิต",
  "ระบบ EM ติดตามตัว",
];
