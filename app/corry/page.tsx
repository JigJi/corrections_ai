"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Search,
  FileSearch,
  Languages,
  Scale,
  GitCompare,
  ScrollText,
  Mic,
  ShieldCheck,
  Brain,
  Cpu,
  Database,
  Lock,
  Zap,
  CheckCircle2,
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";

export default function CorryProfilePage() {
  return (
    <div className="bg-hero">
      <Hero />
      <Stats />
      <About />
      <Skills />
      <TechStack />
      <Testimonials />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-navy-500/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:py-16">
        {/* Left: text */}
        <div className="text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-300">
              ออนไลน์ · พร้อมตอบคำถามคุณ
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            <span className="block">สวัสดีครับ</span>
            <span className="mt-[8px] block">
              ผมชื่อ{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold-200 to-white bg-clip-text text-transparent">
                Corry
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            ผู้ช่วย AI อัจฉริยะประจำกรมราชทัณฑ์ —
            ผมรู้ทุกระเบียบ คู่มือ คำสั่ง วิดีโออบรม และเอกสารในกรมฯ
            ถามผมเป็นภาษาคนได้เลย ผมสรุป เปรียบเทียบ ร่างหนังสือ
            และอ้างอิงต้นทางให้คุณเสมอ
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-xl transition hover:bg-gold-100"
            >
              <MessageSquare className="h-4 w-4" />
              เริ่มคุยกับ Corry
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              <Database className="h-4 w-4" />
              ดูคลังความรู้
            </Link>
          </div>

          {/* Quick chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["#RAG", "#Thai-first", "#Permission-aware", "#On-Premise"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60 backdrop-blur"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right: Corry image */}
        <div className="relative flex items-center justify-center">
          {/* Glowing aura */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br from-gold-400/30 to-navy-500/20 blur-3xl" />
          <div className="absolute h-[280px] w-[280px] animate-pulse rounded-full bg-gold-400/20 blur-2xl" />

          {/* Corry image */}
          <div className="relative h-[480px] w-[400px] md:h-[560px] md:w-[460px]">
            <Image
              src="/corry-full.png"
              alt="Corry - AI ประจำกรมราชทัณฑ์"
              fill
              priority
              sizes="(max-width: 768px) 400px, 460px"
              className="object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating badges */}
          <div className="absolute left-2 top-12 hidden animate-fade-in rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-white backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/20">
                <Brain className="h-3.5 w-3.5 text-emerald-300" />
              </div>
              <div>
                <div className="font-semibold">RAG Engine</div>
                <div className="text-[10px] text-white/60">Vector + BM25 + Rerank</div>
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-32 hidden animate-fade-in rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-white backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400/20">
                <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              </div>
              <div>
                <div className="font-semibold">10 Skills</div>
                <div className="text-[10px] text-white/60">Slash commands</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 right-6 hidden animate-fade-in rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-white backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-400/20">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
              </div>
              <div>
                <div className="font-semibold">On-Premise</div>
                <div className="text-[10px] text-white/60">ข้อมูลไม่ออกนอกกรมฯ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-navy-100 md:grid-cols-4">
        <LiveStat
          label="ตอบคำถามไปแล้ว"
          start={42100}
          increment={1}
          unit="ครั้ง"
          tone="navy"
        />
        <LiveStat
          label="เอกสารในคลังของผม"
          start={12480}
          increment={0}
          unit="รายการ"
          tone="gold"
        />
        <LiveStat
          label="เวลาเฉลี่ยที่ตอบ"
          start={0.3}
          increment={0}
          unit="วินาที"
          decimal
          tone="emerald"
        />
        <LiveStat
          label="ประหยัดเวลาของ จนท."
          start={1240}
          increment={0}
          unit="ชั่วโมง / เดือน"
          tone="navy"
        />
      </div>
    </section>
  );
}

function LiveStat({
  label,
  start,
  increment,
  unit,
  decimal,
  tone,
}: {
  label: string;
  start: number;
  increment: number;
  unit: string;
  decimal?: boolean;
  tone: "navy" | "gold" | "emerald";
}) {
  const [val, setVal] = useState(start);
  useEffect(() => {
    if (increment === 0) return;
    const t = setInterval(() => setVal((v) => v + increment), 1500);
    return () => clearInterval(t);
  }, [increment]);

  const toneClass = {
    navy: "text-navy-900",
    gold: "text-gold-700",
    emerald: "text-emerald-700",
  }[tone];

  return (
    <div className="bg-white px-6 py-6 text-center">
      <div className={clsx("text-3xl font-bold tracking-tight md:text-4xl", toneClass)}>
        {decimal ? val.toFixed(1) : val.toLocaleString()}
      </div>
      <div className="mt-1 text-xs font-medium text-navy-500 md:text-sm">{label}</div>
      <div className="text-[10px] uppercase tracking-wider text-navy-400">{unit}</div>
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
          About Corry
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
          ทำความรู้จักผม
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProfileCard
          icon={Brain}
          title="ผมเป็นใคร"
          body="ผมคือ AI assistant ที่กรมราชทัณฑ์ฝึกขึ้นมาด้วยข้อมูลภายในของกรมฯ — ทั้งระเบียบ คู่มือ ประกาศ คำสั่ง และสื่อการสอนทั้งหมด"
        />
        <ProfileCard
          icon={Sparkles}
          title="ผมเก่งอะไร"
          body="ผมค้นเอกสาร สรุป เปรียบเทียบ ร่างหนังสือราชการ ตอบคำถามเชิงระเบียบ และอ้างอิงเอกสารต้นทางให้คุณตรวจสอบเสมอ"
        />
        <ProfileCard
          icon={ShieldCheck}
          title="ผมปลอดภัยแค่ไหน"
          body="ผมรันบนเซิร์ฟเวอร์ของกรมฯ เอง ข้อมูลไม่ออกนอก เคารพชั้นความลับ และเข้าได้ตามสิทธิ์ของแต่ละคนอย่างเคร่งครัด"
        />
      </div>
    </section>
  );
}

function ProfileCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Brain;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-gold-300 shadow-md">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-bold text-navy-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{body}</p>
    </div>
  );
}

const SKILLS = [
  {
    icon: Search,
    title: "ค้นเอกสารเป็นภาษาคน",
    body: "ถามแบบไหนก็ได้ เช่น 'ระเบียบเยี่ยมญาติช่วงโควิด' ผมหาให้",
  },
  {
    icon: ScrollText,
    title: "สรุประเบียบให้",
    body: "เอกสาร 80 หน้า ผมสรุปเป็น bullet 5 ข้อให้ใน 30 วินาที",
  },
  {
    icon: GitCompare,
    title: "เปรียบเทียบเอกสาร",
    body: "ระเบียบเก่ากับใหม่ต่างกันยังไง — ผมเทียบให้เป็นตาราง",
  },
  {
    icon: FileSearch,
    title: "หาในเอกสาร",
    body: "เปิด PDF 200 หน้าให้ผม ถามว่า 'ค่าธรรมเนียมเท่าไร' ผมตอบพร้อมหน้า",
  },
  {
    icon: Scale,
    title: "ค้นกฎหมายอ้างอิง",
    body: "บรรยายเหตุการณ์ ผมหาข้อกฎหมาย/ระเบียบที่เกี่ยวข้องให้",
  },
  {
    icon: Languages,
    title: "แปลภาษา",
    body: "ไทย ↔ อังกฤษ ทั้งเอกสารหรือบางย่อหน้า สำหรับติดต่อต่างประเทศ",
  },
  {
    icon: ScrollText,
    title: "ร่างหนังสือราชการ",
    body: "บอกผมว่าจะร่างเรื่องอะไร ผมร่างให้ตามรูปแบบราชการ",
  },
  {
    icon: Mic,
    title: "ฟังและพูดได้",
    body: "ถามด้วยเสียงตอนทำงานในเรือนจำ ผมฟังและตอบเสียงกลับ",
  },
  {
    icon: Quote,
    title: "อ้างอิงเอกสารเสมอ",
    body: "ทุกคำตอบของผมจะระบุเอกสารต้นทางให้คุณตรวจสอบเองได้",
  },
  {
    icon: Brain,
    title: "เรียนรู้จากการใช้งาน",
    body: "ยิ่งมีคนถามมาก ผมยิ่งฉลาด — ปรับ ranking และเพิ่ม knowledge อัตโนมัติ",
  },
];

function Skills() {
  return (
    <section className="bg-navy-50/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
            Skills
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            สิ่งที่ผมทำให้คุณได้
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-navy-500">
            พิมพ์ <span className="rounded bg-navy-100 px-1.5 py-0.5 font-mono text-xs">/</span> ในแชทกับผม
            เพื่อเรียกใช้ skill ใดก็ได้ — ไม่ต้องจำ command
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => (
            <SkillCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Search;
  title: string;
  body: string;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-navy-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-soft">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 text-gold-700 transition group-hover:from-gold-100 group-hover:to-gold-200">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-navy-900">{title}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-navy-500">{body}</div>
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
          Tech Stack
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
          เบื้องหลังของผม
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-navy-500">
          เทคโนโลยีระดับโลก ปรับมาให้เข้ากับภาษาไทยและบริบทราชการไทยโดยเฉพาะ
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <TechCard icon={Brain} name="Typhoon LLM" sub="Thai-tuned · 70B params" />
        <TechCard icon={Cpu} name="BGE-M3" sub="Multilingual embedding" />
        <TechCard icon={Database} name="Qdrant" sub="Vector database" />
        <TechCard icon={Lock} name="On-Prem GPU" sub="ข้อมูลไม่ออกจากกรมฯ" />
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="text-sm">
            <div className="font-semibold text-emerald-900">
              ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </div>
            <div className="mt-0.5 text-emerald-700">
              ระบบทั้งหมดติดตั้งบนเซิร์ฟเวอร์ของกรมฯ · มี audit log ทุกการเรียกใช้ ·
              เคารพสิทธิ์การเข้าถึงเดิม · ไม่ส่งข้อมูลออกนอกประเทศ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechCard({
  icon: Icon,
  name,
  sub,
}: {
  icon: typeof Brain;
  name: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 text-center shadow-soft">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 text-gold-300">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-sm font-bold text-navy-900">{name}</div>
      <div className="text-[11px] text-navy-500">{sub}</div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-navy-50/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
            Voices
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            จนท. พูดถึงผมว่ายังไง
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <TestimonialCard
            quote="ปกติหาระเบียบใช้เวลาครึ่งชั่วโมง ตอนนี้ถาม Corry 10 วินาทีรู้คำตอบ"
            name="พงษ์ศักดิ์ ส."
            role="หัวหน้าฝ่ายทัณฑปฏิบัติ · เรือนจำกลางคลองเปรม"
          />
          <TestimonialCard
            quote="ใช้ Corry ร่างหนังสือราชการให้ก่อน แล้วเราค่อยตรวจ ประหยัดเวลามาก"
            name="วราภรณ์ ม."
            role="เจ้าหน้าที่ธุรการ · กองนิติการ"
            highlight
          />
          <TestimonialCard
            quote="พนักงานใหม่อบรมเร็วขึ้นเยอะ — ถามอะไรก็ได้ Corry มีคำตอบพร้อมอ้างอิง"
            name="สมศักดิ์ ก."
            role="ผู้อำนวยการศูนย์ฝึกอบรมราชทัณฑ์"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  highlight,
}: {
  quote: string;
  name: string;
  role: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md",
        highlight
          ? "border border-gold-200 bg-gradient-to-br from-gold-50 to-white"
          : "border border-navy-100 bg-white"
      )}
    >
      <div className="mb-3 flex gap-0.5 text-gold-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <Quote className="h-5 w-5 text-navy-200" />
      <p className="mt-2 text-sm leading-relaxed text-navy-700">"{quote}"</p>
      <div className="mt-4 border-t border-navy-100 pt-3">
        <div className="text-sm font-semibold text-navy-900">{name}</div>
        <div className="text-xs text-navy-500">{role}</div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-navy-950 px-6 py-16 text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-gold-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full bg-white ring-4 ring-gold-300/30 shadow-2xl">
          <Image
            src="/corry.png"
            alt="Corry"
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          พร้อมจะลองคุยกับผมแล้วใช่ไหม?
        </h2>
        <p className="mt-3 max-w-xl text-base text-white/70">
          ถามอะไรก็ได้ ผมพร้อมเสมอ — และถ้าเจอเอกสารที่ต้องการ
          ผมจะอ้างอิงให้คุณตรวจสอบเองได้ทุกครั้ง
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/search"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 shadow-xl transition hover:bg-gold-100"
          >
            <Zap className="h-4 w-4" />
            เริ่มคุยกับ Corry เลย
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            สำรวจคลังความรู้
          </Link>
        </div>
      </div>
    </section>
  );
}
