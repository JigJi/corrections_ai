"use client";

import clsx from "clsx";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Category, DocType } from "@/lib/mockData";
import { CATEGORIES } from "@/lib/mockData";

const TYPES: { value: DocType | "all"; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "เอกสาร" },
  { value: "video", label: "วิดีโอ" },
  { value: "audio", label: "เสียง" },
  { value: "image", label: "ภาพ" },
  { value: "slide", label: "สไลด์" },
];

interface Props {
  activeType: DocType | "all";
  onTypeChange: (t: DocType | "all") => void;
  activeCategory: Category | "all";
  onCategoryChange: (c: Category | "all") => void;
  resultCount: number;
}

export function FilterBar({
  activeType,
  onTypeChange,
  activeCategory,
  onCategoryChange,
  resultCount,
}: Props) {
  return (
    <div className="sticky top-16 z-20 border-b border-navy-100/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-navy-100 bg-navy-50/40 p-1">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => onTypeChange(t.value)}
              className={clsx(
                "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                activeType === t.value
                  ? "bg-white text-navy-900 shadow-soft"
                  : "text-navy-500 hover:text-navy-800"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | "all")}
            className="ring-focus appearance-none rounded-full border border-navy-100 bg-white py-1.5 pl-3.5 pr-8 text-xs font-medium text-navy-700 shadow-soft"
          >
            <option value="all">ทุกหมวดหมู่</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy-400" />
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700 shadow-soft hover:bg-navy-50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          ตัวกรองเพิ่มเติม
        </button>

        <div className="ml-auto text-xs text-navy-500">
          พบ <span className="font-semibold text-navy-900">{resultCount}</span>{" "}
          รายการที่เกี่ยวข้อง
        </div>
      </div>
    </div>
  );
}
