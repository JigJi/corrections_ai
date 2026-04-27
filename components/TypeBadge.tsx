import { FileText, Film, Image as ImageIcon, AudioLines, FileSpreadsheet, Presentation } from "lucide-react";
import clsx from "clsx";
import type { DocType } from "@/lib/mockData";

const META: Record<
  DocType,
  { label: string; icon: typeof FileText; color: string }
> = {
  pdf: { label: "PDF", icon: FileText, color: "bg-rose-50 text-rose-700 border-rose-200" },
  doc: { label: "DOC", icon: FileSpreadsheet, color: "bg-blue-50 text-blue-700 border-blue-200" },
  video: { label: "วิดีโอ", icon: Film, color: "bg-purple-50 text-purple-700 border-purple-200" },
  audio: { label: "เสียง", icon: AudioLines, color: "bg-amber-50 text-amber-700 border-amber-200" },
  image: { label: "ภาพ", icon: ImageIcon, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  slide: { label: "สไลด์", icon: Presentation, color: "bg-orange-50 text-orange-700 border-orange-200" },
};

export function TypeBadge({ type, size = "sm" }: { type: DocType; size?: "sm" | "md" }) {
  const m = META[type];
  const Icon = m.icon;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md border font-medium",
        m.color,
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs"
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {m.label}
    </span>
  );
}

export function ClassificationBadge({
  level,
}: {
  level: "สาธารณะ" | "ภายใน" | "ลับ";
}) {
  const map = {
    สาธารณะ: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ภายใน: "bg-amber-50 text-amber-700 border-amber-200",
    ลับ: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium",
        map[level]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}
