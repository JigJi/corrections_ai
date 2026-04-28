"use client";

import Link from "next/link";
import { Search, GraduationCap, Monitor } from "lucide-react";
import clsx from "clsx";

export function SystemTabs({ active }: { active: "knowledge" | "learn" | "kiosk" }) {
  return (
    <div className="mb-5">
      <div className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-navy-400">
        เลือกระบบที่ต้องการเข้าใช้งาน
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-2xl border-2 border-navy-100 bg-white/70 p-1.5 shadow-soft backdrop-blur">
        <Link
          href="/"
          className={clsx(
            "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition",
            active === "knowledge"
              ? "bg-navy-900 text-white shadow-md"
              : "text-navy-600 hover:bg-navy-50"
          )}
        >
          <Search className="h-4 w-4" />
          <div className="leading-tight text-center">
            <div>คลังความรู้</div>
            <div
              className={clsx(
                "text-[9px] font-medium",
                active === "knowledge" ? "text-gold-300" : "text-navy-400"
              )}
            >
              Knowledge
            </div>
          </div>
        </Link>

        <Link
          href="/learn/login"
          className={clsx(
            "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition",
            active === "learn"
              ? "bg-navy-900 text-white shadow-md"
              : "text-navy-600 hover:bg-navy-50"
          )}
        >
          <GraduationCap className="h-4 w-4" />
          <div className="leading-tight text-center">
            <div>E-Learning</div>
            <div
              className={clsx(
                "text-[9px] font-medium",
                active === "learn" ? "text-gold-300" : "text-navy-400"
              )}
            >
              Admin · จัดการ
            </div>
          </div>
        </Link>

        <Link
          href="/inmate/login"
          className={clsx(
            "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition",
            active === "kiosk"
              ? "bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md"
              : "text-navy-600 hover:bg-gold-50"
          )}
        >
          <Monitor className="h-4 w-4" />
          <div className="leading-tight text-center">
            <div>Kiosk</div>
            <div
              className={clsx(
                "text-[9px] font-medium",
                active === "kiosk" ? "text-white/80" : "text-gold-700"
              )}
            >
              ห้องเรียน · ผู้เรียน
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
