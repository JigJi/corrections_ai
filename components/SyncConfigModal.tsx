"use client";

import { useState } from "react";
import {
  X,
  Zap,
  Clock,
  Calendar,
  Activity,
  Pause,
  Play,
  ChevronDown,
  Info,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import type { Connector } from "@/lib/mockData";
import { ConnectorIcon } from "./ConnectorIcon";

const FREQUENCIES = [
  "เรียลไทม์",
  "ทุก 5 นาที",
  "ทุก 15 นาที",
  "ทุก 30 นาที",
  "ทุกชั่วโมง",
  "ทุก 6 ชั่วโมง",
  "ทุกวัน",
  "ทุกสัปดาห์",
];

interface Props {
  open: boolean;
  onClose: () => void;
  connectors: Connector[];
  onUpdate: (id: string, patch: Partial<Connector>) => void;
}

export function SyncConfigModal({ open, onClose, connectors, onUpdate }: Props) {
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [defaultFreq, setDefaultFreq] = useState("ทุก 15 นาที");
  const [timeWindow, setTimeWindow] = useState<"anytime" | "business" | "offhours">(
    "anytime"
  );
  const [concurrent, setConcurrent] = useState(3);
  const [bandwidthLimit, setBandwidthLimit] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 bg-gradient-to-br from-navy-50 to-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-300">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-navy-900">
                ตั้งค่าการซิงก์อัตโนมัติ
              </div>
              <div className="text-xs text-navy-500">
                กำหนดให้ระบบดึงข้อมูลจากแหล่งต่าง ๆ โดยอัตโนมัติ — ตั้งค่าครั้งเดียว ใช้ได้ตลอด
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 hover:bg-navy-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
          {/* Global section */}
          <div className="space-y-4 border-b border-navy-50 px-6 py-5">
            <SectionLabel icon={Activity}>การตั้งค่าทั่วไป</SectionLabel>

            <ToggleRow
              title="เปิดใช้งาน Auto-sync ทั้งระบบ"
              description="หากปิด ระบบจะหยุดซิงก์ทุกแหล่งข้อมูล (ผู้ใช้ต้องกด ‘ซิงก์เลย’ เอง)"
              checked={globalEnabled}
              onChange={setGlobalEnabled}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label={
                  <>
                    <Clock className="inline h-3.5 w-3.5 mr-1" />
                    ความถี่เริ่มต้น
                  </>
                }
                hint="ใช้กับ connector ใหม่ที่ยังไม่ได้ตั้งค่า"
              >
                <SelectFreq value={defaultFreq} onChange={setDefaultFreq} />
              </Field>

              <Field
                label={
                  <>
                    <Calendar className="inline h-3.5 w-3.5 mr-1" />
                    ช่วงเวลาที่อนุญาต
                  </>
                }
                hint="กำหนดเวลาที่ระบบสามารถซิงก์ได้"
              >
                <select
                  value={timeWindow}
                  onChange={(e) =>
                    setTimeWindow(e.target.value as typeof timeWindow)
                  }
                  className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none"
                >
                  <option value="anytime">ทุกเวลา (24/7)</option>
                  <option value="business">เวลาราชการ (08:30 – 16:30)</option>
                  <option value="offhours">นอกเวลาราชการ (18:00 – 06:00)</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="งาน sync พร้อมกันสูงสุด"
                hint="ป้องกัน server โดน load หนักเกินไป"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={concurrent}
                    onChange={(e) => setConcurrent(parseInt(e.target.value))}
                    className="flex-1 accent-navy-700"
                  />
                  <span className="w-14 rounded-lg border border-navy-200 bg-white px-2 py-1 text-center text-sm font-semibold text-navy-900">
                    {concurrent}
                  </span>
                </div>
              </Field>

              <Field
                label="จำกัด Bandwidth"
                hint="ใช้ network เกินที่กำหนดจะถูก throttle"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBandwidthLimit(!bandwidthLimit)}
                    className={clsx(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition",
                      bandwidthLimit ? "bg-navy-700" : "bg-navy-200"
                    )}
                  >
                    <span
                      className={clsx(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition",
                        bandwidthLimit ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                  {bandwidthLimit && (
                    <input
                      defaultValue="100"
                      className="w-20 rounded-lg border border-navy-200 bg-white px-2 py-1 text-sm outline-none"
                    />
                  )}
                  {bandwidthLimit && (
                    <span className="text-xs text-navy-500">Mbps</span>
                  )}
                </div>
              </Field>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="flex items-start gap-2 text-xs text-blue-900">
                <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <div>
                  ระบบจะตรวจการเปลี่ยนแปลงไฟล์ (ไฟล์ใหม่/แก้ไข/ลบ) ใช้ checksum/mtime ไม่ดึงไฟล์ทั้งหมดซ้ำ
                  ใช้ bandwidth น้อย และเริ่ม indexing เฉพาะส่วนที่เปลี่ยน
                </div>
              </div>
            </div>
          </div>

          {/* Per-connector overrides */}
          <div className="space-y-3 px-6 py-5">
            <SectionLabel icon={Sparkles}>ตั้งค่าเฉพาะแหล่งข้อมูล</SectionLabel>

            <div className="overflow-hidden rounded-xl border border-navy-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/40 text-left text-[11px] font-semibold uppercase tracking-wider text-navy-500">
                    <th className="px-4 py-2.5">แหล่งข้อมูล</th>
                    <th className="px-4 py-2.5">ความถี่</th>
                    <th className="px-4 py-2.5 text-center">Auto-sync</th>
                  </tr>
                </thead>
                <tbody>
                  {connectors.map((c) => (
                    <ConnectorRow
                      key={c.id}
                      connector={c}
                      onUpdate={(patch) => onUpdate(c.id, patch)}
                      globalDisabled={!globalEnabled}
                    />
                  ))}
                  {connectors.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-xs text-navy-400"
                      >
                        ยังไม่มีแหล่งข้อมูลที่เชื่อมต่อ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/40 px-6 py-3">
          <div className="text-[11px] text-navy-500">
            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-emerald-500" />
            การเปลี่ยนแปลงจะมีผลทันที
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-navy-900 px-5 py-2 text-sm font-medium text-white hover:bg-navy-800"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
}

function ConnectorRow({
  connector,
  onUpdate,
  globalDisabled,
}: {
  connector: Connector;
  onUpdate: (patch: Partial<Connector>) => void;
  globalDisabled: boolean;
}) {
  const paused = connector.status === "paused";

  return (
    <tr className="border-b border-navy-50 last:border-b-0 hover:bg-navy-50/30">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <ConnectorIcon type={connector.type} size="sm" />
          <div className="min-w-0">
            <div className="line-clamp-1 text-[13px] font-medium text-navy-900">
              {connector.name}
            </div>
            <div className="line-clamp-1 font-mono text-[10px] text-navy-400">
              {connector.path}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <SelectFreq
          value={connector.schedule}
          onChange={(v) => onUpdate({ schedule: v })}
          compact
          disabled={globalDisabled || paused}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-center">
          <button
            onClick={() =>
              onUpdate({ status: paused ? "active" : "paused" })
            }
            disabled={globalDisabled}
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium transition disabled:opacity-50",
              paused
                ? "border border-amber-200 bg-amber-50 text-amber-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            )}
          >
            {paused ? (
              <>
                <Pause className="h-3 w-3" />
                หยุด
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                ทำงาน
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

function SelectFreq({
  value,
  onChange,
  compact,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  compact?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={clsx(
          "ring-focus w-full appearance-none rounded-xl border border-navy-200 bg-white pr-8 text-sm font-medium text-navy-700 outline-none disabled:bg-navy-50 disabled:opacity-60",
          compact ? "px-3 py-1.5 text-xs" : "px-3.5 py-2.5"
        )}
      >
        {FREQUENCIES.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
      <ChevronDown
        className={clsx(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-navy-400",
          compact ? "right-2 h-3.5 w-3.5" : "right-2.5 h-4 w-4"
        )}
      />
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-navy-700">{label}</div>
      {hint && <div className="mb-1.5 text-[10px] text-navy-400">{hint}</div>}
      {children}
    </label>
  );
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Activity;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-navy-500">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-3.5">
      <div className="min-w-0 pr-4">
        <div className="text-sm font-semibold text-navy-900">{title}</div>
        {description && (
          <div className="mt-0.5 text-[11px] text-navy-500">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition",
          checked ? "bg-navy-700" : "bg-navy-200"
        )}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
