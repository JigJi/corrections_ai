"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Info,
  Search,
  ArrowLeft,
  Monitor,
} from "lucide-react";

export function LearnNavbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-gold-200/60 bg-gradient-to-r from-white via-gold-50/30 to-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/learn" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-1 ring-gold-200 shadow-soft">
            <Image
              src="/doc-logo.png"
              alt="กรมราชทัณฑ์"
              fill
              sizes="44px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold tracking-tight text-navy-900">
                E-Learning
              </span>
              <span className="rounded-full bg-gold-100 px-1.5 py-0.5 text-[9px] font-bold text-gold-800">
                LMS
              </span>
            </div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-gold-700">
              ระบบฝึกอบรม · กรมราชทัณฑ์
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Cross-link to Knowledge */}
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-navy-200 bg-navy-50 px-3 py-1.5 text-[11px] font-medium text-navy-700 shadow-soft hover:bg-navy-100 lg:inline-flex"
            title="ไประบบคลังความรู้"
          >
            <ArrowLeft className="h-3 w-3" />
            <Search className="h-3.5 w-3.5" />
            คลังความรู้
          </Link>

          {/* Kiosk preview link */}
          <Link
            href="/inmate/login"
            className="hidden items-center gap-1.5 rounded-full border border-dashed border-gold-400/70 bg-gold-50 px-3 py-1.5 text-[11px] font-medium text-gold-800 hover:bg-gold-100 lg:inline-flex"
            title="ดูตัวอย่าง LMS เวอร์ชัน Kiosk/Tablet สำหรับห้องเรียน"
          >
            <Monitor className="h-3.5 w-3.5" />
            Kiosk preview
          </Link>

          <div className="group relative">
            <div className="flex items-center gap-2 rounded-full border border-gold-200 bg-white py-1 pl-1 pr-3 shadow-soft cursor-pointer">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-xs font-bold text-white">
                สม
              </div>
              <div className="hidden text-left leading-tight md:block">
                <div className="text-xs font-semibold text-navy-900">สมชาย ใจดี</div>
                <div className="text-[10px] text-gold-700">ผู้เรียน</div>
              </div>
            </div>
            <div className="invisible absolute right-0 top-full mt-2 w-52 rounded-xl border border-gold-200 bg-white py-1 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              <Link
                href="/"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-gold-50"
              >
                <Search className="h-4 w-4" />
                ไปคลังความรู้
              </Link>
              <Link
                href="/inmate/login"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-gold-50"
              >
                <Monitor className="h-4 w-4" />
                Kiosk preview
              </Link>
              <Link
                href="/corry"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-gold-50"
              >
                <Info className="h-4 w-4" />
                เกี่ยวกับ Corry
              </Link>
              <div className="my-1 h-px bg-gold-100" />
              <button
                onClick={() => router.push("/learn/login")}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-gold-50"
              >
                <LogOut className="h-4 w-4" />
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
