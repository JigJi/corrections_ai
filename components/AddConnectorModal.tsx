"use client";

import { useState } from "react";
import { X, ArrowRight, CheckCircle2, Loader2, Sparkles, Lock, Calendar } from "lucide-react";
import clsx from "clsx";
import { CONNECTOR_TYPES, type ConnectorType, type Connector } from "@/lib/mockData";
import { ConnectorIcon } from "./ConnectorIcon";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (connector: Connector) => void;
}

export function AddConnectorModal({ open, onClose, onAdd }: Props) {
  const [step, setStep] = useState<"choose" | "config" | "connecting" | "done">("choose");
  const [picked, setPicked] = useState<ConnectorType | null>(null);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [schedule, setSchedule] = useState("ทุก 15 นาที");

  if (!open) return null;

  function reset() {
    setStep("choose");
    setPicked(null);
    setName("");
    setPath("");
    setSchedule("ทุก 15 นาที");
  }

  function selectType(t: ConnectorType) {
    setPicked(t);
    const meta = CONNECTOR_TYPES.find((c) => c.type === t)!;
    setName(meta.name);
    setPath(suggestedPath(t));
    setStep("config");
  }

  function connect() {
    setStep("connecting");
    setTimeout(() => {
      setStep("done");
      setTimeout(() => {
        onAdd({
          id: `c${Date.now()}`,
          type: picked!,
          name,
          path,
          fileCount: Math.floor(Math.random() * 5000) + 100,
          lastSync: new Date().toISOString(),
          status: "active",
          schedule,
          syncedSize: `${(Math.random() * 5 + 0.5).toFixed(1)} GB`,
        });
        reset();
        onClose();
      }, 1500);
    }, 1800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
          <div>
            <div className="text-base font-semibold text-navy-900">
              เชื่อมต่อแหล่งข้อมูลใหม่
            </div>
            <div className="text-xs text-navy-400">
              {step === "choose" && "เลือกประเภทแหล่งข้อมูลที่ต้องการ Sync"}
              {step === "config" && "ระบุรายละเอียดและขอบเขตการ Sync"}
              {step === "connecting" && "กำลังเชื่อมต่อและตรวจสอบการเข้าถึง..."}
              {step === "done" && "เชื่อมต่อสำเร็จ"}
            </div>
          </div>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 hover:bg-navy-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 border-b border-navy-50 bg-navy-50/30 px-6 py-2.5 text-[11px] font-medium">
          <StepDot active={step === "choose"} done={step !== "choose"} label="เลือก" />
          <span className="h-px flex-1 bg-navy-100" />
          <StepDot
            active={step === "config"}
            done={step === "connecting" || step === "done"}
            label="ตั้งค่า"
          />
          <span className="h-px flex-1 bg-navy-100" />
          <StepDot active={step === "connecting"} done={step === "done"} label="เชื่อมต่อ" />
        </div>

        <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "60vh" }}>
          {step === "choose" && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CONNECTOR_TYPES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => selectType(t.type)}
                  className="group flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-3.5 text-left transition hover:border-navy-300 hover:bg-navy-50/30 hover:shadow-soft"
                >
                  <ConnectorIcon type={t.type} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-navy-900">
                        {t.name}
                      </span>
                      {t.popular && (
                        <span className="rounded-md bg-gold-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-700">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 line-clamp-2 text-[11px] text-navy-500">
                      {t.description}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-navy-300 transition group-hover:translate-x-0.5 group-hover:text-navy-700" />
                </button>
              ))}
            </div>
          )}

          {step === "config" && picked && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-3">
                <ConnectorIcon type={picked} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-navy-900">
                    {CONNECTOR_TYPES.find((t) => t.type === picked)?.name}
                  </div>
                  <div className="text-xs text-navy-500">
                    {CONNECTOR_TYPES.find((t) => t.type === picked)?.description}
                  </div>
                </div>
                <button
                  onClick={() => setStep("choose")}
                  className="text-xs font-medium text-navy-600 hover:underline"
                >
                  เปลี่ยน
                </button>
              </div>

              {needsAuth(picked) && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <div className="text-xs text-emerald-900">
                      <span className="font-semibold">เชื่อมต่อบัญชีสำเร็จ</span>
                      <span> · admin@correct.go.th</span>
                      <button className="ml-2 text-emerald-700 underline-offset-2 hover:underline">
                        เปลี่ยนบัญชี
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Field label="ชื่อแหล่งข้อมูล *">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none"
                />
              </Field>

              <Field label={pathLabel(picked)}>
                <input
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 font-mono text-xs outline-none"
                />
              </Field>

              <Field label={<><Calendar className="inline h-3.5 w-3.5 mr-1" /> ความถี่การ Sync</>}>
                <div className="grid grid-cols-4 gap-1.5">
                  {["เรียลไทม์", "ทุก 15 นาที", "ทุกชั่วโมง", "ทุกวัน"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSchedule(s)}
                      className={clsx(
                        "rounded-lg border px-2 py-2 text-xs font-medium transition",
                        schedule === s
                          ? "border-navy-700 bg-navy-900 text-white"
                          : "border-navy-200 bg-white text-navy-700 hover:bg-navy-50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3">
                <div className="flex items-start gap-2 text-xs text-gold-900">
                  <Sparkles className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">หลังเชื่อมต่อ ระบบจะ:</span>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 text-gold-800">
                      <li>สแกนไฟล์ในแหล่งข้อมูลและทำ OCR / ถอดเสียงอัตโนมัติ</li>
                      <li>สร้าง embeddings (BGE-M3) และดัชนีใน Vector DB</li>
                      <li>ติดตามการเปลี่ยนแปลงไฟล์และ sync ใหม่ทุก {schedule}</li>
                      <li>เคารพสิทธิ์การเข้าถึงเดิมของแหล่งข้อมูล (Permission-aware)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "connecting" && (
            <div className="flex flex-col items-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50">
                <Loader2 className="h-7 w-7 animate-spin text-navy-700" />
              </div>
              <div className="mt-4 text-base font-semibold text-navy-900">
                กำลังเชื่อมต่อ...
              </div>
              <div className="mt-1 text-sm text-navy-500">
                ตรวจสอบสิทธิ์ · นับไฟล์ · เริ่ม indexing
              </div>
              <div className="mt-6 w-full max-w-xs space-y-1.5 text-[11px] text-navy-500">
                <CheckLine done>ตรวจสอบสิทธิ์การเข้าถึง</CheckLine>
                <CheckLine done>นับไฟล์ในขอบเขต ({Math.floor(Math.random() * 3000) + 100} ไฟล์)</CheckLine>
                <CheckLine>คิวงาน OCR และ embedding pipeline</CheckLine>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="mt-4 text-base font-semibold text-navy-900">
                เชื่อมต่อสำเร็จ
              </div>
              <div className="mt-1 text-sm text-navy-500">
                ระบบกำลังทยอย index ไฟล์ ใช้เวลาประมาณ 5-10 นาที
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step === "config" && (
          <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/40 px-6 py-3">
            <button
              onClick={() => setStep("choose")}
              className="rounded-xl px-4 py-2 text-sm font-medium text-navy-600 hover:bg-white"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={connect}
              disabled={!name.trim() || !path.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-5 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
            >
              <Lock className="h-3.5 w-3.5" />
              เชื่อมต่อและเริ่ม Sync
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDot({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={clsx(
          "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition",
          done
            ? "bg-emerald-500 text-white"
            : active
            ? "bg-navy-900 text-white"
            : "bg-white text-navy-400 ring-1 ring-navy-200"
        )}
      >
        {done ? <CheckCircle2 className="h-3 w-3" /> : "•"}
      </span>
      <span className={clsx(active || done ? "text-navy-900" : "text-navy-400")}>{label}</span>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-navy-700">{label}</div>
      {children}
    </label>
  );
}

function CheckLine({ done, children }: { done?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {done ? (
        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
      ) : (
        <Loader2 className="h-3 w-3 animate-spin text-navy-400" />
      )}
      <span className={done ? "text-navy-700" : "text-navy-400"}>{children}</span>
    </div>
  );
}

function suggestedPath(t: ConnectorType): string {
  switch (t) {
    case "gdrive":
      return "/My Drive/กรมราชทัณฑ์";
    case "sharepoint":
      return "/sites/correctgo/Documents";
    case "onedrive":
      return "/Documents";
    case "smb":
      return "\\\\fs.correct.go.th\\share";
    case "folder":
      return "D:\\Documents";
    case "ftp":
      return "ftp://ftp.correct.go.th/public";
    case "dropbox":
      return "/Apps/CorrectAI";
    case "s3":
      return "s3://correct-knowledge/";
    case "email":
      return "imap://mail.correct.go.th";
    case "web":
      return "https://www.correct.go.th";
  }
}

function pathLabel(t: ConnectorType): string {
  switch (t) {
    case "gdrive":
    case "onedrive":
    case "dropbox":
      return "โฟลเดอร์ / Drive";
    case "sharepoint":
      return "Site / Library URL";
    case "smb":
      return "UNC Path (\\\\server\\share)";
    case "folder":
      return "Path ในเซิร์ฟเวอร์";
    case "ftp":
      return "FTP URL";
    case "s3":
      return "Bucket URI";
    case "email":
      return "IMAP Server";
    case "web":
      return "Base URL";
  }
}

function needsAuth(t: ConnectorType): boolean {
  return ["gdrive", "onedrive", "sharepoint", "dropbox"].includes(t);
}
