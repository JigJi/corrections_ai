"use client";

import { useState } from "react";
import {
  Plug,
  Plus,
  RefreshCw,
  MoreVertical,
  Settings,
  Trash2,
  Pause,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Folder,
  FileText,
  X,
  Zap,
} from "lucide-react";
import clsx from "clsx";
import type { Connector } from "@/lib/mockData";
import { ConnectorIcon } from "./ConnectorIcon";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "เมื่อกี้นี้";
  if (min < 60) return `${min} นาทีที่แล้ว`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ชั่วโมงที่แล้ว`;
  return `${Math.floor(hr / 24)} วันที่แล้ว`;
}

interface Props {
  connectors: Connector[];
  onAddClick: () => void;
  onSyncNow: (id: string) => void;
  onRemove: (id: string) => void;
  onClose?: () => void;
  onConfigClick?: () => void;
}

export function ConnectorPanel({
  connectors,
  onAddClick,
  onSyncNow,
  onRemove,
  onClose,
  onConfigClick,
}: Props) {
  const total = connectors.reduce((sum, c) => sum + c.fileCount, 0);

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft animate-fade-in">
      <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-300">
            <Plug className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              แหล่งข้อมูลที่เชื่อมต่อ
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                {connectors.length} แหล่ง · {total.toLocaleString()} ไฟล์
              </span>
            </div>
            <div className="text-[11px] text-navy-400">
              Sync อัตโนมัติจาก Drive, SharePoint, File Server หรือโฟลเดอร์ — ไม่ต้องอัปโหลดเอง
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onConfigClick && (
            <button
              onClick={onConfigClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 shadow-soft transition hover:bg-navy-50"
              title="ตั้งค่า Auto-sync"
            >
              <Zap className="h-4 w-4 text-gold-500" />
              ตั้งค่า Auto-sync
            </button>
          )}
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-1.5 rounded-xl border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 shadow-soft transition hover:bg-navy-50"
          >
            <Plus className="h-4 w-4" />
            เพิ่มแหล่งข้อมูล
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-400 hover:bg-navy-50 hover:text-navy-700"
              title="ซ่อน"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
        {connectors.map((c) => (
          <ConnectorCard
            key={c.id}
            connector={c}
            onSync={() => onSyncNow(c.id)}
            onRemove={() => onRemove(c.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ConnectorCard({
  connector,
  onSync,
  onRemove,
}: {
  connector: Connector;
  onSync: () => void;
  onRemove: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative rounded-xl border border-navy-100 bg-white p-3.5 transition hover:border-navy-200 hover:shadow-soft">
      <div className="flex items-start gap-3">
        <ConnectorIcon type={connector.type} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="line-clamp-1 text-[13px] font-semibold text-navy-900">
                {connector.name}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-navy-400">
                <Folder className="h-3 w-3 flex-shrink-0" />
                <span className="truncate font-mono">{connector.path}</span>
              </div>
            </div>
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-navy-400 hover:bg-navy-50 hover:text-navy-700"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-navy-100 bg-white py-1 shadow-lg">
                  <MenuItem icon={Settings}>ตั้งค่า</MenuItem>
                  <MenuItem icon={Pause}>หยุดชั่วคราว</MenuItem>
                  <MenuItem icon={Trash2} danger onClick={onRemove}>
                    ลบ
                  </MenuItem>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-navy-500">
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {connector.fileCount.toLocaleString()} ไฟล์
            </span>
            <span className="text-navy-300">·</span>
            <span>{connector.syncedSize}</span>
            <span className="text-navy-300">·</span>
            <span
              className={clsx(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                connector.status === "paused"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-gold-50 text-gold-700"
              )}
            >
              <Zap className="h-3 w-3" />
              {connector.status === "paused" ? "หยุด auto" : `auto: ${connector.schedule}`}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-navy-50 pt-2.5">
        <StatusPill status={connector.status} lastSync={connector.lastSync} schedule={connector.schedule} />
        <button
          onClick={onSync}
          disabled={connector.status === "syncing"}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-navy-600 transition hover:bg-navy-50 hover:text-navy-900 disabled:opacity-50"
          title="ซิงก์เลย"
        >
          <RefreshCw
            className={clsx(
              "h-3 w-3",
              connector.status === "syncing" && "animate-spin"
            )}
          />
          ซิงก์
        </button>
      </div>
    </div>
  );
}

function StatusPill({
  status,
  lastSync,
  schedule,
}: {
  status: Connector["status"];
  lastSync: string;
  schedule: string;
}) {
  if (status === "syncing") {
    return (
      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600">
        <Loader2 className="h-3 w-3 animate-spin" />
        กำลังซิงก์...
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600">
        <AlertCircle className="h-3 w-3" />
        ผิดพลาด
      </div>
    );
  }
  if (status === "paused") {
    return (
      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
        <Pause className="h-3 w-3" />
        หยุดชั่วคราว
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1 text-[11px] text-navy-500">
      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
      <span className="font-medium text-emerald-700">เชื่อมต่ออยู่</span>
      <span className="text-navy-300">·</span>
      <Clock className="h-3 w-3" />
      {timeAgo(lastSync)}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  children,
  onClick,
  danger,
}: {
  icon: typeof Settings;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onMouseDown={onClick}
      className={clsx(
        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition",
        danger
          ? "text-rose-600 hover:bg-rose-50"
          : "text-navy-700 hover:bg-navy-50"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}
