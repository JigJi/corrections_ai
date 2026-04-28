"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Award,
  Calendar,
  Volume2,
  LogOut,
  Wifi,
  Battery,
  ArrowLeftRight,
} from "lucide-react";
import clsx from "clsx";
import { INMATE_PROFILE } from "@/lib/lmsData";

const NAV = [
  { href: "/inmate", label: "หน้าหลัก", icon: Home },
  { href: "/inmate/courses", label: "หลักสูตร", icon: BookOpen },
];

export function InmateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const profile = INMATE_PROFILE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-start justify-center">
      <div className="relative w-full max-w-[1024px]">
        {/* Demo persona switcher */}
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] text-white/40">
            🖥️ Demo · มุมมองผู้เรียน · Kiosk/Tablet
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold-400/40 bg-gold-500/10 px-3 py-1 text-[11px] font-medium text-gold-200 hover:bg-gold-500/20"
          >
            <ArrowLeftRight className="h-3 w-3" />
            กลับไปหน้าเลือกระบบ
          </button>
        </div>

        {/* Bezel */}
        <div className="rounded-[36px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 shadow-2xl ring-1 ring-white/5">
          <div className="overflow-hidden rounded-[28px] bg-[#FAF8F2] ring-1 ring-white/10">
            {/* Status bar */}
            <div className="flex items-center justify-between bg-navy-900 px-6 py-1.5 text-[10px] font-medium text-white/70">
              <div className="flex items-center gap-3">
                <span>กรมราชทัณฑ์ · เครื่อง #14-A</span>
                <span className="text-emerald-300">● ออนไลน์</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</span>
                <Wifi className="h-3 w-3" />
                <Battery className="h-3 w-3" />
              </div>
            </div>

            {/* Header */}
            <header className="border-b border-navy-100 bg-white">
              <div className="flex items-center justify-between px-6 py-3">
                <Link href="/inmate" className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-2 ring-gold-300/50 shadow-soft">
                    <Image src="/doc-logo.png" alt="" fill sizes="44px" className="object-contain p-0.5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gold-700">
                      ระบบฝึกอบรม
                    </div>
                    <div className="text-base font-bold text-navy-900">E-Learning</div>
                  </div>
                </Link>

                <div className="flex items-center gap-3">
                  <button className="rounded-full border border-navy-200 bg-white p-2 text-navy-600 hover:bg-navy-50">
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <div className="rounded-2xl border border-navy-200 bg-white px-4 py-2 text-right">
                    <div className="text-[10px] text-navy-500">เลขประจำตัว</div>
                    <div className="text-sm font-bold text-navy-900">{profile.prisonNumber}</div>
                  </div>
                  <div className="hidden text-right md:block">
                    <div className="text-sm font-semibold text-navy-900">{profile.name}</div>
                    <div className="text-[11px] text-navy-500">{profile.block}</div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-sm font-bold text-white shadow-soft">
                    {profile.name.split(" ").pop()?.[0] ?? "อ"}
                  </div>
                  <button
                    onClick={() => router.push("/inmate/login")}
                    className="rounded-full border border-navy-200 bg-white p-2 text-navy-600 hover:bg-navy-50"
                    title="ออกจากระบบ"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Big nav tabs */}
              <nav className="flex border-t border-navy-100">
                {NAV.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/inmate" && pathname?.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        "flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3.5 text-base font-semibold transition",
                        active
                          ? "border-gold-500 bg-gold-50/40 text-navy-900"
                          : "border-transparent text-navy-500 hover:bg-navy-50/50"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </header>

            {/* Page content */}
            <main className="relative min-h-[640px] bg-[#FAF8F2]">{children}</main>

            {/* Bottom bar */}
            <footer className="flex items-center justify-between border-t border-navy-200 bg-white px-6 py-2 text-[11px] text-navy-500">
              <div>📞 หากมีปัญหา ยกมือเรียกเจ้าหน้าที่ประจำห้อง</div>
              <div className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-gold-600" />
                <span>
                  แต้มสะสม{" "}
                  <span className="font-bold text-navy-900">{profile.parolePoints}</span> · วุฒิบัตร{" "}
                  <span className="font-bold text-emerald-700">{profile.certificates.length} ใบ</span>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
