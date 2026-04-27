import Link from "next/link";
import {
  Eye,
  Calendar,
  FileText,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";
import type { KnowledgeItem } from "@/lib/mockData";
import { TypeBadge } from "./TypeBadge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ResultCard({ item }: { item: KnowledgeItem }) {
  return (
    <Link
      href={`/document/${item.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-md"
    >
      {/* Header: badges (left) + category (right) */}
      <div className="mb-3 flex flex-nowrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-nowrap items-center gap-1.5">
          <TypeBadge type={item.type} />
          {item.relevance && item.relevance > 0.9 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-gold-50 px-1.5 py-0.5 text-[10px] font-medium text-gold-700 whitespace-nowrap">
              <Sparkles className="h-3 w-3" />
              แนะนำ
            </span>
          )}
        </div>
        <span className="flex-shrink-0 truncate rounded-md border border-navy-100 bg-navy-50/60 px-1.5 py-0.5 text-[10px] font-medium text-navy-600">
          {item.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
        {item.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-navy-500">
        {item.excerpt}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="mt-3 space-y-2 border-t border-navy-50 pt-3">
        <div className="flex items-center justify-between text-[11px] text-navy-500">
          <span className="inline-flex min-w-0 items-center gap-1">
            <Building2 className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{item.source}</span>
          </span>
          <span className="inline-flex flex-shrink-0 items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(item.updatedAt)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-navy-400">
          <span className="inline-flex items-center gap-1">
            {item.pages && (
              <>
                <FileText className="h-3 w-3" />
                {item.pages} หน้า
              </>
            )}
            {item.duration && (
              <>
                <Clock className="h-3 w-3" />
                {item.duration}
              </>
            )}
            {!item.pages && !item.duration && <span>{item.size}</span>}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {item.views.toLocaleString()}
          </span>
        </div>

        {item.relevance !== undefined && (
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-navy-50">
              <div
                className="h-full bg-gradient-to-r from-navy-500 to-gold-400"
                style={{ width: `${Math.round(item.relevance * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-navy-500">
              {Math.round(item.relevance * 100)}%
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
