"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Sparkles,
  Lock,
  User,
  Fingerprint,
  ChevronRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/search"), 900);
  }

  function ssoLogin() {
    router.push("/search");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT: Brand panel */}
      <div className="relative hidden overflow-hidden bg-navy-950 lg:block">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-navy-700/40 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-gold-600/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Decorative giant logo watermark */}
        <div className="absolute -right-20 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.07]">
          <Image
            src="/doc-logo.png"
            alt=""
            fill
            sizes="520px"
            className="object-contain"
          />
        </div>

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          {/* Top: brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white ring-2 ring-gold-400/30 shadow-2xl">
              <Image
                src="/doc-logo.png"
                alt="กรมราชทัณฑ์"
                fill
                sizes="56px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">
                กรมราชทัณฑ์
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-300/80">
                Department of Corrections
              </div>
            </div>
          </div>

          {/* Middle: hero */}
          <div className="max-w-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-gold-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              ขับเคลื่อนด้วย AI · RAG Search Engine
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              คลังความรู้อัจฉริยะ
              <br />
              <span className="bg-gradient-to-r from-gold-300 via-gold-200 to-white bg-clip-text text-transparent">
                ของกรมราชทัณฑ์
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              ระบบสืบค้นเอกสาร ระเบียบ คู่มือ และสื่อการสอนทั้งหมดในกรมฯ
              <br />ถาม AI เป็นภาษาคน พร้อมอ้างอิงต้นทางทุกคำตอบ
            </p>

            <div className="mt-8 grid grid-cols-3 gap-2">
              <Feature icon={ShieldCheck} title="On-Premise" sub="ข้อมูลไม่ออกนอกกรมฯ" />
              <Feature icon={Sparkles} title="Multi-modal" sub="PDF · วิดีโอ · เสียง" />
              <Feature icon={Lock} title="Permission" sub="แยกชั้นความลับ" />
            </div>
          </div>

          {/* Bottom: footer */}
          <div className="flex items-center justify-between text-[11px] text-white/50">
            <div>© {new Date().getFullYear()} Department of Corrections, Thailand</div>
            <div className="flex items-center gap-3">
              <span>นโยบายความเป็นส่วนตัว</span>
              <span>เงื่อนไขการใช้งาน</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div className="bg-hero relative flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-2 ring-navy-100 shadow-soft">
              <Image
                src="/doc-logo.png"
                alt="กรมราชทัณฑ์"
                fill
                sizes="64px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="mt-3 text-center">
              <div className="text-base font-semibold text-navy-900">
                คลังความรู้อัจฉริยะ
              </div>
              <div className="text-[11px] uppercase tracking-wider text-navy-400">
                กรมราชทัณฑ์
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-6">
              <div className="text-xs font-medium uppercase tracking-wider text-gold-600">
                Sign in
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-navy-900">
                เข้าสู่ระบบ
              </h2>
              <p className="mt-1 text-sm text-navy-500">
                สำหรับเจ้าหน้าที่ผู้ได้รับสิทธิ์เข้าถึง
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Field label="เลขประจำตัวข้าราชการ / อีเมล" icon={User}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="3xxxxxxxxxxxx หรือ user@correct.go.th"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-navy-300"
                />
              </Field>

              <Field label="รหัสผ่าน" icon={Lock}>
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-navy-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-navy-400 hover:text-navy-700"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Field>

              <div className="flex items-center justify-between text-xs">
                <label className="flex cursor-pointer items-center gap-2 text-navy-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-navy-300 text-navy-700"
                  />
                  จดจำการเข้าสู่ระบบ
                </label>
                <Link
                  href="#"
                  className="font-medium text-navy-700 hover:text-navy-900 hover:underline"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-navy-900 text-sm font-medium text-white shadow-soft transition hover:bg-navy-800 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
                <span className="absolute right-0 top-0 h-full w-1 bg-gold-400 transition-all group-hover:w-2" />
              </button>

              <div className="relative my-2 flex items-center">
                <div className="flex-1 border-t border-navy-100" />
                <span className="px-3 text-[11px] text-navy-400">หรือ</span>
                <div className="flex-1 border-t border-navy-100" />
              </div>

              <button
                type="button"
                onClick={ssoLogin}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
              >
                <Fingerprint className="h-4 w-4 text-gold-600" />
                เข้าด้วย ThaID / SSO ราชการ
              </button>
            </form>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5">
              <div className="flex items-start gap-2 text-[11px] text-amber-900">
                <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  การเข้าถึงระบบนี้ถูกบันทึกและตรวจสอบ ตาม พ.ร.บ.การรักษาความมั่นคงปลอดภัยไซเบอร์
                  พ.ศ. 2562
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-[11px] text-navy-400">
            พบปัญหาการเข้าใช้งาน? ติดต่อ{" "}
            <Link href="#" className="font-medium text-navy-700 hover:underline">
              ศูนย์เทคโนโลยีสารสนเทศ
            </Link>{" "}
            · โทร 02-XXX-XXXX
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-navy-700">{label}</div>
      <div className="ring-focus flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-3.5 transition focus-within:border-navy-500">
        <Icon className="h-4 w-4 flex-shrink-0 text-navy-400" />
        {children}
      </div>
    </label>
  );
}

function Feature({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof ShieldCheck;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <Icon className="h-4 w-4 text-gold-300" />
      <div className="mt-1.5 text-xs font-semibold text-white">{title}</div>
      <div className="text-[10px] text-white/50">{sub}</div>
    </div>
  );
}
