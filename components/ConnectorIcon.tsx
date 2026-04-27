import {
  Cloud,
  HardDrive,
  Folder,
  Server,
  Mail,
  Globe,
  Box,
  type LucideIcon,
} from "lucide-react";
import type { ConnectorType } from "@/lib/mockData";

const META: Record<ConnectorType, { icon: LucideIcon; bg: string; fg: string; mark?: string }> = {
  gdrive: { icon: Cloud, bg: "bg-blue-50", fg: "text-blue-600", mark: "G" },
  sharepoint: { icon: Cloud, bg: "bg-sky-50", fg: "text-sky-700", mark: "S" },
  onedrive: { icon: Cloud, bg: "bg-indigo-50", fg: "text-indigo-600", mark: "1" },
  smb: { icon: Server, bg: "bg-slate-100", fg: "text-slate-700" },
  folder: { icon: Folder, bg: "bg-amber-50", fg: "text-amber-700" },
  ftp: { icon: HardDrive, bg: "bg-emerald-50", fg: "text-emerald-700" },
  dropbox: { icon: Box, bg: "bg-blue-50", fg: "text-blue-600", mark: "D" },
  s3: { icon: HardDrive, bg: "bg-orange-50", fg: "text-orange-700" },
  email: { icon: Mail, bg: "bg-rose-50", fg: "text-rose-600" },
  web: { icon: Globe, bg: "bg-purple-50", fg: "text-purple-700" },
};

export function ConnectorIcon({
  type,
  size = "md",
}: {
  type: ConnectorType;
  size?: "sm" | "md" | "lg";
}) {
  const m = META[type];
  const Icon = m.icon;
  const sz =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconSz =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div
      className={`relative flex flex-shrink-0 items-center justify-center rounded-xl ${m.bg} ${m.fg} ${sz}`}
    >
      <Icon className={iconSz} />
      {m.mark && (
        <span
          className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold ${m.fg} ring-1 ring-current`}
        >
          {m.mark}
        </span>
      )}
    </div>
  );
}
