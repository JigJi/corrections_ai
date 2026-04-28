"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  LogOut,
  Search,
  Monitor,
  Sparkles,
  Bell,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

const NAV = [
  { href: "/learn", label: "ภาพรวม (Dashboard)", icon: LayoutDashboard, exact: true },
  { href: "/learn/courses", label: "หลักสูตร", icon: BookOpen },
  { href: "/learn/learners", label: "ผู้เรียน", icon: Users },
  { href: "/learn/certificates", label: "วุฒิบัตร", icon: Award },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col border-r border-navy-100 bg-white lg:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-navy-100 px-5">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-gold-200 shadow-soft">
            <Image src="/doc-logo.png" alt="" fill sizes="40px" className="object-contain p-0.5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-navy-900">E-Learning</span>
              <span className="rounded-full bg-gold-100 px-1.5 py-0.5 text-[8px] font-bold text-gold-800">
                ADMIN
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gold-700">
              ระบบจัดการ · กรมราชทัณฑ์
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          <div className="mb-2 mt-1 px-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
            จัดการระบบ
          </div>
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-navy-900 text-white shadow-soft"
                    : "text-navy-600 hover:bg-navy-50"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}

          <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
            ข้ามระบบ
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 transition hover:bg-navy-50"
          >
            <Search className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1">คลังความรู้</span>
          </Link>
          <Link
            href="/inmate/login"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 transition hover:bg-navy-50"
          >
            <Monitor className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1">Kiosk view</span>
            <span className="text-[10px] text-navy-400">↗</span>
          </Link>
        </nav>

        {/* AI helper card */}
        <div className="m-3 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-4">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white ring-2 ring-gold-300">
              <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-navy-900">
              ถาม Corry
              <Sparkles className="h-3 w-3 text-gold-600" />
            </div>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-navy-600">
            ผู้ช่วยสร้างคอร์ส, ทำแบบทดสอบ, สรุปผลผู้เรียน
          </p>
          <button className="mt-2 w-full rounded-lg bg-navy-900 px-2.5 py-1.5 text-[11px] font-medium text-white hover:bg-navy-800">
            เริ่มสนทนา →
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-navy-100 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white ring-1 ring-gold-200">
              <Image src="/doc-logo.png" alt="" fill sizes="36px" className="object-contain p-0.5" />
            </div>
            <div className="text-sm font-bold text-navy-900">E-Learning Admin</div>
          </div>

          <div className="hidden flex-1 items-center gap-2 lg:flex">
            <PageBreadcrumb pathname={pathname || ""} />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative rounded-full border border-navy-100 bg-white p-2 text-navy-600 hover:bg-navy-50">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
            </button>

            <div className="group relative">
              <button className="flex items-center gap-2 rounded-full border border-navy-100 bg-white py-1 pl-1 pr-2.5 shadow-soft hover:bg-navy-50">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-xs font-bold text-white">
                  สม
                </div>
                <div className="hidden text-left leading-tight md:block">
                  <div className="text-xs font-semibold text-navy-900">สมชาย ใจดี</div>
                  <div className="text-[9px] text-navy-400">Admin · ศูนย์ฝึกอบรม</div>
                </div>
                <ChevronDown className="h-3 w-3 text-navy-400" />
              </button>
              <div className="invisible absolute right-0 top-full mt-2 w-52 rounded-xl border border-navy-100 bg-white py-1 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
                <Link
                  href="/inmate/login"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-navy-50"
                >
                  <Monitor className="h-4 w-4" />
                  เปิด Kiosk view
                </Link>
                <div className="my-1 h-px bg-navy-100" />
                <button
                  onClick={() => router.push("/learn/login")}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-navy-700 hover:bg-navy-50"
                >
                  <LogOut className="h-4 w-4" />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

function PageBreadcrumb({ pathname }: { pathname: string }) {
  const labels: Record<string, string> = {
    "/learn": "ภาพรวม",
    "/learn/courses": "หลักสูตร",
    "/learn/learners": "ผู้เรียน",
    "/learn/certificates": "วุฒิบัตร",
  };
  const matched =
    Object.keys(labels)
      .sort((a, b) => b.length - a.length)
      .find((p) => pathname === p || pathname.startsWith(p + "/")) || "/learn";
  const label = labels[matched] || "ระบบจัดการ";
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-navy-400">E-Learning Admin</span>
      <span className="text-navy-300">/</span>
      <span className="font-semibold text-navy-900">{label}</span>
    </div>
  );
}
