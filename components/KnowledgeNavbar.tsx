"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, Database, LogOut, Info, GraduationCap, ArrowRight } from "lucide-react";
import clsx from "clsx";

const NAV = [
  { href: "/search", label: "ค้นหา", icon: Search },
  { href: "/knowledge", label: "คลังข้อมูล", icon: Database },
];

export function KnowledgeNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b border-navy-100/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/search" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-1 ring-navy-100 shadow-soft">
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
              <div className="text-[15px] font-semibold tracking-tight text-navy-900">
                คลังความรู้อัจฉริยะ
              </div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-navy-400">
                Knowledge Platform · กรมราชทัณฑ์
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-navy-100 bg-white p-1 shadow-soft md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/search" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-navy-900 text-white shadow"
                    : "text-navy-600 hover:bg-navy-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Cross-link to E-Learning */}
          <Link
            href="/learn/login"
            className="hidden items-center gap-1.5 rounded-full border border-gold-200 bg-gold-50 px-3 py-1.5 text-[11px] font-medium text-gold-800 shadow-soft hover:bg-gold-100 lg:inline-flex"
            title="ไประบบฝึกอบรม E-Learning"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            E-Learning
            <ArrowRight className="h-3 w-3" />
          </Link>

          <div className="group relative">
            <div className="flex items-center gap-2 rounded-full border border-navy-100 bg-white py-1 pl-1 pr-3 shadow-soft cursor-pointer">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-navy-600 to-navy-800 text-xs font-bold text-white">
                สม
              </div>
              <div className="hidden text-left leading-tight md:block">
                <div className="text-xs font-semibold text-navy-900">สมชาย ใจดี</div>
                <div className="text-[10px] text-navy-400">เจ้าหน้าที่ผู้คุม</div>
              </div>
            </div>
            <div className="invisible absolute right-0 top-full mt-2 w-52 rounded-xl border border-navy-100 bg-white py-1 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              <Link
                href="/learn/login"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gold-800 hover:bg-gold-50"
              >
                <GraduationCap className="h-4 w-4" />
                ไประบบฝึกอบรม
              </Link>
              <Link
                href="/corry"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-navy-50"
              >
                <Info className="h-4 w-4" />
                เกี่ยวกับ Corry
              </Link>
              <div className="my-1 h-px bg-navy-100" />
              <button
                onClick={() => router.push("/")}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-navy-50"
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
