"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  TrendingUp,
  Globe,
  Briefcase,
  ChevronDown,
  Plus,
  Loader2,
  ChevronRight,
  Database,
  Zap,
} from "lucide-react";
import clsx from "clsx";
import { COURSE_SUGGESTIONS, type CourseSuggestion } from "@/lib/courseSuggestions";

function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const start = (seed * 3) % arr.length;
  const out: T[] = [];
  for (let i = 0; i < n; i++) {
    out.push(arr[(start + i) % arr.length]);
  }
  return out;
}

export function CorrySuggestPanel() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState(0);
  const [thinking, setThinking] = useState(false);

  const visible = pickN(COURSE_SUGGESTIONS, 4, seed);

  function refresh() {
    setThinking(true);
    setTimeout(() => {
      setSeed((s) => s + 1);
      setThinking(false);
    }, 800);
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-gold-300 bg-gradient-to-br from-gold-50/60 via-white to-gold-50/60 shadow-soft">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-gold-50/40"
      >
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-gold-300 shadow-md">
          <Image src="/corry.png" alt="Corry" fill sizes="48px" className="object-cover" />
          <div className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
            <Zap className="h-2 w-2 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-base font-bold text-navy-900">
            <Sparkles className="h-4 w-4 text-gold-600" />
            Corry แนะนำหลักสูตรใหม่ที่น่าสร้าง
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              ✨ Proactive AI
            </span>
          </div>
          <div className="mt-0.5 text-xs text-navy-700">
            จาก research: <strong>ตลาดงานไทย, เทรนด์โลก, ข้อมูลค่าจ้าง, การเปลี่ยนแปลงเทคโนโลยี</strong>{" "}
            — Corry ร่างคอร์สให้พร้อม คุณแค่ตรวจสอบและปรับ
          </div>
        </div>
        <ChevronDown
          className={clsx(
            "h-5 w-5 flex-shrink-0 text-navy-500 transition",
            open ? "rotate-180" : ""
          )}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-gold-200 bg-white/60 p-5 backdrop-blur">
          {/* Sources strip */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 font-bold text-navy-600">
              <Database className="h-3 w-3" />
              Corry วิเคราะห์จาก:
            </span>
            {[
              "JobsDB Thailand",
              "กรมการจัดหางาน",
              "WEF Future of Jobs",
              "SCB EIC",
              "กรมพัฒนาฝีมือแรงงาน",
              "ข่าวเศรษฐกิจ Q1/2026",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full border border-navy-100 bg-white px-2 py-0.5 text-navy-600"
              >
                {s}
              </span>
            ))}
            <button
              onClick={refresh}
              disabled={thinking}
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-[11px] font-bold text-gold-800 hover:bg-gold-100 disabled:opacity-50"
            >
              {thinking ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
              {thinking ? "Corry กำลัง research..." : "ขอชุดใหม่"}
            </button>
          </div>

          {/* Suggestions grid */}
          {thinking ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold-300 bg-white py-12 text-sm text-navy-600">
              <Loader2 className="h-5 w-5 animate-spin text-gold-600" />
              Corry กำลังค้นข้อมูลตลาดและเทรนด์ล่าสุด...
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {visible.map((s) => (
                <SuggestionCard key={s.id} suggestion={s} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: CourseSuggestion }) {
  const totalMin = suggestion.lessons.reduce(
    (s, l) => s + (parseInt(l.duration) || 0),
    0
  );
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border-2 border-navy-100 bg-white shadow-soft transition hover:border-gold-400 hover:shadow-lg">
      {/* Top: emoji banner */}
      <div
        className={clsx(
          "flex items-center gap-2 bg-gradient-to-r p-3 text-white",
          suggestion.color
        )}
      >
        <span className="text-2xl drop-shadow">{suggestion.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-wider text-white/80">
            {suggestion.category} · {suggestion.level}
          </div>
          <div className="line-clamp-1 text-sm font-bold">{suggestion.title}</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 space-y-3 p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-2">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
              <TrendingUp className="h-2.5 w-2.5" />
              Market Trend
            </div>
            <div className="mt-0.5 text-base font-bold text-emerald-800">
              {suggestion.trendStat.value}
            </div>
            <div className="text-[10px] text-navy-600">{suggestion.trendStat.label}</div>
          </div>
          <div className="rounded-lg border border-gold-100 bg-gold-50/50 p-2">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gold-700">
              <Briefcase className="h-2.5 w-2.5" />
              รายได้
            </div>
            <div className="mt-0.5 text-base font-bold text-gold-800">
              {suggestion.marketStat.value}
            </div>
            <div className="text-[10px] text-navy-600">{suggestion.marketStat.label}</div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="rounded-lg border border-navy-100 bg-navy-50/30 p-2.5">
          <div className="flex items-start gap-1.5">
            <Sparkles className="mt-0.5 h-3 w-3 flex-shrink-0 text-gold-600" />
            <div className="text-[11px] leading-relaxed text-navy-700">
              <strong className="text-navy-900">Corry ว่า:</strong> {suggestion.reasoning}
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="flex flex-wrap items-center gap-1 text-[10px] text-navy-500">
          <Globe className="h-2.5 w-2.5" />
          <span className="font-medium">ที่มา:</span>
          {suggestion.sources.map((s, i) => (
            <span key={s}>
              {s}
              {i < suggestion.sources.length - 1 && " · "}
            </span>
          ))}
        </div>

        {/* Footer meta + action */}
        <div className="flex items-center justify-between gap-2 border-t border-navy-100 pt-3">
          <div className="text-[11px] text-navy-600">
            <strong>{suggestion.lessons.length}</strong> บท ·{" "}
            <strong>{Math.round(totalMin / 60)}</strong> ชม.{" "}
            <span className="text-emerald-700">· พร้อมร่าง</span>
          </div>
          <Link
            href={`/learn/courses/new?id=${suggestion.id}`}
            className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-navy-800 group-hover:bg-gradient-to-r group-hover:from-gold-600 group-hover:to-gold-700"
          >
            <Plus className="h-3 w-3" />
            ใช้ร่างจาก Corry
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
