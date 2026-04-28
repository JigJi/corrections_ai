"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Video,
  Image as ImageIcon,
  Music,
  Presentation,
  File,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Eye,
  Database,
} from "lucide-react";
import clsx from "clsx";
import { MOCK_ITEMS, type KnowledgeItem, type DocType } from "@/lib/mockData";

const TYPE_META: Record<DocType, { icon: typeof FileText; label: string; color: string }> = {
  pdf: { icon: FileText, label: "PDF", color: "bg-rose-100 text-rose-700" },
  video: { icon: Video, label: "วิดีโอ", color: "bg-blue-100 text-blue-700" },
  image: { icon: ImageIcon, label: "ภาพ", color: "bg-purple-100 text-purple-700" },
  audio: { icon: Music, label: "เสียง", color: "bg-emerald-100 text-emerald-700" },
  doc: { icon: File, label: "เอกสาร", color: "bg-amber-100 text-amber-700" },
  slide: { icon: Presentation, label: "สไลด์", color: "bg-orange-100 text-orange-700" },
};

export function RelatedKnowledge({
  ids,
  variant = "regular",
}: {
  ids: string[];
  variant?: "regular" | "kiosk";
}) {
  const items = ids
    .map((id) => MOCK_ITEMS.find((it) => it.id === id))
    .filter(Boolean) as KnowledgeItem[];

  if (items.length === 0) return null;

  const isKiosk = variant === "kiosk";

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-3xl border-2 bg-white shadow-soft",
        isKiosk ? "border-gold-200" : "border-navy-100"
      )}
    >
      {/* AI banner header */}
      <div className="relative overflow-hidden border-b border-gold-200 bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 px-5 py-3">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold-200/40 blur-2xl" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-gold-300">
              <Image src="/corry.png" alt="Corry" fill sizes="36px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 text-sm font-bold text-navy-900">
                Corry แนะนำเอกสารที่เกี่ยวข้อง
                <Sparkles className="h-3.5 w-3.5 text-gold-600" />
              </div>
              <div className="text-[11px] text-navy-600">
                จาก{" "}
                <span className="inline-flex items-center gap-1 font-semibold text-navy-800">
                  <Database className="h-3 w-3" />
                  คลังความรู้อัจฉริยะ
                </span>{" "}
                · จัดอันดับโดย Vector Search
              </div>
            </div>
          </div>
          <Link
            href="/search"
            className="hidden flex-shrink-0 items-center gap-1 rounded-full border border-gold-300 bg-white px-3 py-1 text-[11px] font-medium text-gold-800 hover:bg-gold-100 lg:inline-flex"
          >
            ดูทั้งคลัง
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-navy-50">
        {items.map((item, i) => (
          <KnowledgeRow key={item.id} item={item} relevance={1 - i * 0.08} isKiosk={isKiosk} />
        ))}
      </div>
    </div>
  );
}

function KnowledgeRow({
  item,
  relevance,
  isKiosk,
}: {
  item: KnowledgeItem;
  relevance: number;
  isKiosk: boolean;
}) {
  const typeMeta = TYPE_META[item.type];
  const Icon = typeMeta.icon;

  return (
    <Link
      href={`/document/${item.id}`}
      className="group flex items-start gap-3 px-5 py-4 transition hover:bg-navy-50/40"
    >
      {/* Type icon */}
      <div
        className={clsx(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
          typeMeta.color
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-medium text-navy-700">
                {item.category}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-navy-400">
                {typeMeta.label}
              </span>
              <span
                className={clsx(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                  item.classification === "ลับ"
                    ? "bg-rose-100 text-rose-700"
                    : item.classification === "ภายใน"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                )}
              >
                {item.classification}
              </span>
            </div>
            <div
              className={clsx(
                "mt-1 font-semibold text-navy-900 group-hover:text-navy-700",
                isKiosk ? "text-base" : "text-sm"
              )}
            >
              {item.title}
            </div>
            <div className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-navy-600">
              {item.excerpt}
            </div>
          </div>

          {/* Relevance score */}
          <div className="flex flex-shrink-0 flex-col items-end">
            <div className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-800">
              ⭐ {(relevance * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-navy-500">
          <div className="flex items-center gap-2">
            <span>{item.source}</span>
            <span>·</span>
            <span>
              {item.pages
                ? `${item.pages} หน้า`
                : item.duration
                ? item.duration
                : item.size}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-0.5">
              <Eye className="h-2.5 w-2.5" />
              {item.views.toLocaleString()}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
            เปิดเอกสาร
            <ChevronRight className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
