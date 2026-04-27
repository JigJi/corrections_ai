"use client";

import { useState, useMemo, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Share2,
  Copy,
  ExternalLink,
  Sparkles,
  Calendar,
  Building2,
  FileText,
  Eye,
  Tag,
  Clock,
  Hash,
  ShieldCheck,
  MessageSquare,
  Bookmark,
  Printer,
} from "lucide-react";
import clsx from "clsx";
import { MOCK_ITEMS } from "@/lib/mockData";
import { TypeBadge, ClassificationBadge } from "@/components/TypeBadge";
import { DocumentPreview } from "@/components/DocumentPreview";
import { ChatPanel } from "@/components/ChatPanel";

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const item = MOCK_ITEMS.find((i) => i.id === id);
  if (!item) notFound();

  const related = useMemo(
    () =>
      MOCK_ITEMS.filter(
        (i) => i.id !== id && (i.category === item.category || i.type === item.type)
      ).slice(0, 4),
    [id, item]
  );

  const dateFmt = new Date(item.updatedAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={clsx(
        "transition-all duration-300",
        chatOpen ? "lg:pr-[440px]" : ""
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Breadcrumb */}
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-900"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับสู่ผลการค้นหา
        </button>

        {/* Header */}
        <header className="mb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <TypeBadge type={item.type} size="md" />
            <ClassificationBadge level={item.classification} />
            <span className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-xs font-medium text-navy-600">
              {item.category}
            </span>
            {item.relevance && item.relevance > 0.9 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-700">
                <Sparkles className="h-3 w-3" />
                แนะนำสูง
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-navy-900 md:text-3xl">
            {item.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-500">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {item.source}
            </span>
            <span className="text-navy-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              อัปเดต {dateFmt}
            </span>
            <span className="text-navy-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {item.views.toLocaleString()} ครั้ง
            </span>
            {item.pages && (
              <>
                <span className="text-navy-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {item.pages} หน้า
                </span>
              </>
            )}
            {item.duration && (
              <>
                <span className="text-navy-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {item.duration}
                </span>
              </>
            )}
            <span className="text-navy-300">·</span>
            <span>{item.size}</span>
          </div>
        </header>

        {/* Content */}
        <div
          className={clsx(
            "grid gap-6",
            chatOpen ? "grid-cols-1" : "lg:grid-cols-3"
          )}
        >
          {/* Preview */}
          <div className={chatOpen ? "" : "lg:col-span-2"}>
            <DocumentPreview item={item} />

            {/* Excerpt / Description */}
            <section className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                <FileText className="h-3.5 w-3.5" />
                สรุปย่อ
              </div>
              <p className="text-sm leading-relaxed text-navy-700">{item.excerpt}</p>
            </section>
          </div>

          {/* Sidebar */}
          <aside
            className={clsx(
              chatOpen ? "grid grid-cols-2 gap-4" : "space-y-4"
            )}
          >
            {/* Ask Corry CTA — slim button, hidden when chat already open */}
            {!chatOpen && (
              <button
                onClick={() => setChatOpen(true)}
                className="group relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl border border-gold-200 bg-gradient-to-r from-navy-900 to-navy-800 px-3 py-2.5 text-left text-white shadow-soft transition hover:shadow-md"
              >
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold-300/40">
                  <Image src="/corry.png" alt="Corry" fill sizes="32px" className="object-cover" />
                </div>
                <span className="flex-1 text-sm font-medium">
                  ถาม Corry เกี่ยวกับเอกสารนี้
                </span>
                <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-gold-300" />
                <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-gold-400/20 blur-xl transition group-hover:bg-gold-400/30" />
              </button>
            )}

            {/* Actions */}
            <section className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
              <div className="border-b border-navy-100 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                การจัดการ
              </div>
              <div className="grid grid-cols-2 gap-px bg-navy-100">
                <ActionButton icon={Download}>ดาวน์โหลด</ActionButton>
                <ActionButton icon={ExternalLink}>เปิดต้นฉบับ</ActionButton>
                <ActionButton icon={Copy}>คัดลอกลิงก์</ActionButton>
                <ActionButton icon={Share2}>แชร์</ActionButton>
                <ActionButton
                  icon={Bookmark}
                  active={bookmarked}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  {bookmarked ? "บันทึกแล้ว" : "บันทึก"}
                </ActionButton>
                <ActionButton icon={Printer}>พิมพ์</ActionButton>
              </div>
            </section>

            {/* Metadata */}
            <section className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
              <div className="border-b border-navy-100 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                ข้อมูลเอกสาร
              </div>
              <div className="divide-y divide-navy-50 px-4">
                <MetaRow icon={Hash} label="ID" value={item.id} mono />
                <MetaRow icon={FileText} label="ประเภทไฟล์" value={item.type.toUpperCase()} />
                <MetaRow icon={Building2} label="หน่วยงานเจ้าของ" value={item.source} />
                <MetaRow icon={Calendar} label="วันที่อัปเดต" value={dateFmt} />
                <MetaRow icon={ShieldCheck} label="ชั้นความลับ" value={item.classification} />
                <MetaRow
                  icon={Tag}
                  label="แท็ก"
                  value={
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-navy-700"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  }
                />
                {item.relevance !== undefined && (
                  <div className="py-3">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-navy-500">ความเกี่ยวข้องกับคำค้น</span>
                      <span className="font-semibold text-navy-900">
                        {Math.round(item.relevance * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-navy-50">
                      <div
                        className="h-full bg-gradient-to-r from-navy-500 to-gold-400"
                        style={{ width: `${Math.round(item.relevance * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Permission info */}
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-emerald-900">
                    คุณมีสิทธิ์เข้าถึงเอกสารนี้
                  </div>
                  <div className="mt-0.5 text-emerald-700">
                    ตามตำแหน่ง "เจ้าหน้าที่ผู้คุม" และระดับชั้น "{item.classification}"
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                  Related Documents
                </div>
                <h2 className="text-lg font-bold text-navy-900">เอกสารที่เกี่ยวข้อง</h2>
              </div>
              <Link
                href="/search"
                className="text-xs font-medium text-navy-600 hover:text-navy-900 hover:underline"
              >
                ดูทั้งหมด →
              </Link>
            </div>

            <div
              className={clsx(
                "grid gap-3",
                chatOpen ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4"
              )}
            >
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/document/${r.id}`}
                  className="group rounded-xl border border-navy-100 bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <TypeBadge type={r.type} />
                    {r.relevance && r.relevance > 0.85 && (
                      <Sparkles className="h-3 w-3 text-gold-500" />
                    )}
                  </div>
                  <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
                    {r.title}
                  </h3>
                  <div className="mt-2 line-clamp-1 text-[11px] text-navy-400">
                    {r.source}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        initialQuery={item.title}
      />
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: typeof Hash;
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs text-navy-500">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div
        className={clsx(
          "min-w-0 text-right text-xs text-navy-800",
          mono && "font-mono"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  children,
  onClick,
  active,
}: {
  icon: typeof Download;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center gap-1.5 px-3 py-3 text-xs transition",
        active
          ? "bg-navy-900 text-white hover:bg-navy-800"
          : "bg-white text-navy-700 hover:bg-navy-50"
      )}
    >
      <Icon className={clsx("h-4 w-4", active && "fill-current")} />
      {children}
    </button>
  );
}
