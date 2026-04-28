"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Delete,
  Loader2,
  Lock,
  Sparkles,
  Volume2,
  Wifi,
  Battery,
  ShieldCheck,
} from "lucide-react";
import clsx from "clsx";

export default function InmateLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"id" | "pin">("id");
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  function pressKey(k: string) {
    if (step === "id") {
      if (id.length < 7) setId((s) => s + k);
    } else {
      if (pin.length < 4) {
        const next = pin + k;
        setPin(next);
        if (next.length === 4) submit(next);
      }
    }
  }

  function backspace() {
    if (step === "id") setId((s) => s.slice(0, -1));
    else setPin((s) => s.slice(0, -1));
  }

  function clear() {
    if (step === "id") setId("");
    else setPin("");
  }

  function submit(finalPin?: string) {
    setLoading(true);
    setTimeout(() => router.push("/inmate"), 900);
  }

  function nextStep() {
    if (id.length >= 4) setStep("pin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
      {/* Tablet kiosk frame */}
      <div className="relative w-full max-w-[1024px]">
        {/* Bezel ring */}
        <div className="rounded-[36px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 shadow-2xl ring-1 ring-white/5">
          {/* Inner bezel */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 ring-1 ring-white/10">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 py-2 text-[11px] font-medium text-white/70">
              <div className="flex items-center gap-3">
                <span>กรมราชทัณฑ์ · เครื่อง #14-A</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                  ● ออนไลน์
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>{new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</span>
                <Wifi className="h-3.5 w-3.5" />
                <Battery className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Camera notch */}
            <div className="mx-auto h-1.5 w-24 rounded-b-full bg-black/40" />

            {/* Login content */}
            <div className="grid min-h-[680px] lg:grid-cols-2">
              {/* Left: brand */}
              <div className="relative hidden flex-col justify-between p-10 lg:flex">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white shadow-2xl ring-2 ring-gold-400/40">
                      <Image
                        src="/doc-logo.png"
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="leading-tight">
                      <div className="text-base font-semibold text-white">กรมราชทัณฑ์</div>
                      <div className="text-[10px] uppercase tracking-widest text-gold-300/70">
                        Department of Corrections
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gold-200 backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    ระบบฝึกอบรมและพัฒนาทักษะ
                  </div>
                  <h1 className="text-3xl font-bold leading-tight text-white">
                    เรียนรู้วันนี้
                    <br />
                    <span className="bg-gradient-to-r from-gold-300 to-white bg-clip-text text-transparent">
                      เพื่อชีวิตที่ดีกว่า
                    </span>
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    หลักสูตรอาชีพ ทักษะชีวิต และความรู้พื้นฐาน
                    <br />
                    เรียนจบได้วุฒิบัตร · สะสม XP เลื่อน Level
                  </p>
                </div>

                <div className="space-y-2 text-[11px] text-white/50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    ระบบนี้บันทึกการใช้งานทั้งหมดเพื่อความปลอดภัย
                  </div>
                  <div>เครื่องประจำห้องเรียน · ติดต่อผู้คุมหากมีปัญหา</div>
                </div>
              </div>

              {/* Right: keypad */}
              <div className="flex flex-col justify-center bg-white/5 p-8 backdrop-blur-sm">
                <div className="mx-auto w-full max-w-sm">
                  {/* Mobile-only logo */}
                  <div className="mb-6 flex justify-center lg:hidden">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white ring-2 ring-gold-400/40">
                      <Image src="/doc-logo.png" alt="" fill sizes="56px" className="object-contain p-0.5" />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-gold-300/80">
                      เข้าสู่ระบบ
                    </div>
                    <h2 className="mt-1 text-2xl font-bold text-white">
                      {step === "id" ? "เลขประจำตัวผู้เรียน" : "ใส่รหัสลับ 4 หลัก"}
                    </h2>
                    <p className="mt-1 text-xs text-white/60">
                      {step === "id"
                        ? "ดูได้ที่บัตรประจำตัวของคุณ"
                        : "ถ้าลืมรหัส ติดต่อผู้คุมประจำแดน"}
                    </p>
                  </div>

                  {/* Display */}
                  <div className="mt-6">
                    {step === "id" ? (
                      <div className="rounded-2xl border-2 border-white/20 bg-white/5 px-5 py-4 text-center">
                        <div className="font-mono text-3xl tracking-[0.3em] text-white">
                          {id || "_______"}
                        </div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                          ตัวอย่าง: 61-0247
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-3">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={clsx(
                              "flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-3xl font-bold transition",
                              i < pin.length
                                ? "border-gold-400 bg-gold-400/20 text-white"
                                : "border-white/20 bg-white/5 text-white/30"
                            )}
                          >
                            {i < pin.length ? "•" : ""}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Keypad */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => (
                      <KeyButton key={k} onClick={() => pressKey(k)}>
                        {k}
                      </KeyButton>
                    ))}
                    <KeyButton onClick={clear} variant="muted">
                      ล้าง
                    </KeyButton>
                    <KeyButton onClick={() => pressKey("0")}>0</KeyButton>
                    <KeyButton onClick={backspace} variant="muted">
                      <Delete className="h-5 w-5" />
                    </KeyButton>
                  </div>

                  {step === "id" && (
                    <button
                      onClick={nextStep}
                      disabled={id.length < 4}
                      className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 text-base font-semibold text-navy-950 transition hover:bg-gold-400 disabled:opacity-40"
                    >
                      ถัดไป
                      <Lock className="h-4 w-4" />
                    </button>
                  )}

                  {loading && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gold-300">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      กำลังเข้าสู่ระบบ...
                    </div>
                  )}

                  {/* Voice / accessibility */}
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] text-white/70 hover:bg-white/10">
                      <Volume2 className="h-3 w-3" />
                      อ่านออกเสียงให้ฟัง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo annotation */}
        <div className="mt-3 text-center text-[11px] text-white/40">
          🖥️ Demo · หน้าจอแบบ Kiosk/Tablet สำหรับห้องเรียนในเรือนจำ — ขนาดจำลอง 1024px
        </div>
      </div>
    </div>
  );
}

function KeyButton({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "muted";
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "h-14 rounded-2xl text-2xl font-semibold transition active:scale-95",
        variant === "default"
          ? "bg-white/10 text-white hover:bg-white/15"
          : "bg-white/5 text-white/70 hover:bg-white/10"
      )}
    >
      <span className="inline-flex h-full w-full items-center justify-center">{children}</span>
    </button>
  );
}
