"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Award, Download, Share2, ShieldCheck, QrCode, ExternalLink } from "lucide-react";
import { INMATE_PROFILE, INMATE_COURSES } from "@/lib/lmsData";

export default function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const profile = INMATE_PROFILE;

  // id can be cert id or "cert-{courseId}"
  let cert = profile.certificates.find((c) => c.id === id);
  if (!cert && id.startsWith("cert-")) {
    const courseId = id.slice(5);
    const course = INMATE_COURSES.find((c) => c.id === courseId);
    if (course) {
      cert = {
        id,
        courseId: course.id,
        courseTitle: course.title,
        issuedAt: new Date().toISOString(),
        serialNo: `DOC-LMS-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999)
          .toString()
          .padStart(6, "0")}`,
        certifyingBody: course.certifyingBody ?? "กรมราชทัณฑ์",
        template: course.certificateTemplate ?? "vocational",
        hours: Math.round(course.totalMinutes / 60),
      };
    }
  }

  if (!cert) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="text-sm text-navy-500">ไม่พบวุฒิบัตร</p>
        <Link href="/inmate" className="text-sm text-navy-700 hover:underline">
          กลับ
        </Link>
      </div>
    );
  }

  const issued = new Date(cert.issuedAt);
  const isVocational = cert.template === "vocational";

  return (
    <div className="px-6 py-6">
      <Link
        href="/inmate"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" />
        กลับ
      </Link>

      <div className="mx-auto max-w-4xl">
        {/* Action bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gold-700">
              วุฒิบัตรของคุณ
            </div>
            <h1 className="text-2xl font-bold text-navy-900">{cert.courseTitle}</h1>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border-2 border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50">
              <Download className="h-4 w-4" />
              ดาวน์โหลด PDF
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
              <Share2 className="h-4 w-4" />
              ส่งให้ผู้คุม
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="relative aspect-[1.414/1] overflow-hidden rounded-3xl border-8 border-double border-gold-400 bg-gradient-to-br from-white via-gold-50/30 to-white p-12 shadow-2xl">
          {/* Corner ornaments */}
          <div className="absolute left-4 top-4 h-12 w-12 border-l-4 border-t-4 border-gold-400" />
          <div className="absolute right-4 top-4 h-12 w-12 border-r-4 border-t-4 border-gold-400" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-b-4 border-l-4 border-gold-400" />
          <div className="absolute bottom-4 right-4 h-12 w-12 border-b-4 border-r-4 border-gold-400" />

          {/* Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <div className="relative h-[400px] w-[400px]">
              <Image src="/doc-logo.png" alt="" fill className="object-contain" />
            </div>
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center text-center">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-2 ring-gold-400">
                <Image src="/doc-logo.png" alt="" fill sizes="64px" className="object-contain p-0.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-gold-700">
                  Department of Corrections · Thailand
                </div>
                <div className="text-base font-bold text-navy-900">กรมราชทัณฑ์</div>
                <div className="text-[11px] text-navy-600">กระทรวงยุติธรรม</div>
              </div>
            </div>

            <div className="mt-3 h-px w-32 bg-gold-400" />

            {/* Title */}
            <div className="mt-4">
              <div className="text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
                Certificate of Completion
              </div>
              <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-navy-900">
                วุฒิบัตร
              </h2>
            </div>

            {/* Body */}
            <p className="mt-3 text-sm text-navy-600">มอบให้แก่</p>
            <div className="mt-1 border-b-2 border-gold-300 px-8 pb-1 text-2xl font-bold text-navy-900">
              {profile.name}
            </div>
            <div className="mt-0.5 text-[11px] text-navy-500">
              เลขประจำตัว {profile.prisonNumber} · {profile.prison}
            </div>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-700">
              เพื่อแสดงว่าได้สำเร็จการอบรมหลักสูตร
            </p>
            <div className="mt-1 text-xl font-bold text-navy-900">
              "{cert.courseTitle}"
            </div>
            <p className="mt-1 text-xs text-navy-600">
              จำนวน {cert.hours} ชั่วโมง · ตามมาตรฐาน {cert.certifyingBody}
            </p>

            {isVocational && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                รับรองโดย {cert.certifyingBody} · ใช้ประกอบการสมัครงานได้
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto grid w-full grid-cols-3 items-end gap-4 pt-4">
              <div className="text-center">
                <div className="font-serif text-2xl italic text-navy-700">อยุธยา</div>
                <div className="mt-0.5 border-t border-navy-300 pt-1 text-[10px] text-navy-500">
                  ผู้บัญชาการเรือนจำ
                </div>
                <div className="text-[10px] font-semibold text-navy-700">
                  นายอนุชา ทิพยะรัตน์
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold-400 bg-gold-50">
                  <Award className="h-8 w-8 text-gold-600" />
                </div>
                <div className="mt-1 text-[10px] text-navy-500">ตราประจำกรมฯ</div>
              </div>

              <div className="text-center">
                <div className="font-serif text-2xl italic text-navy-700">วิภาดา</div>
                <div className="mt-0.5 border-t border-navy-300 pt-1 text-[10px] text-navy-500">
                  อธิบดีกรมราชทัณฑ์
                </div>
                <div className="text-[10px] font-semibold text-navy-700">
                  นางสาววิภาดา จันทรโรจน์
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification details */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-navy-100 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wider text-navy-500">
              เลขที่วุฒิบัตร
            </div>
            <div className="mt-1 font-mono text-sm font-bold text-navy-900">
              {cert.serialNo}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-navy-100 bg-white p-4">
            <div className="text-[10px] uppercase tracking-wider text-navy-500">
              ออกเมื่อ
            </div>
            <div className="mt-1 text-sm font-bold text-navy-900">
              {issued.toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border-2 border-navy-100 bg-white p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
              <QrCode className="h-6 w-6 text-navy-700" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-navy-500">ตรวจสอบ</div>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-bold text-navy-900 hover:underline"
              >
                verify.correct.go.th
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {isVocational && (
          <div className="mt-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <div className="text-sm font-bold text-emerald-900">
                  ใช้เป็นหลักฐานสมัครงานได้ทันที
                </div>
                <div className="mt-1 text-xs text-emerald-800">
                  วุฒิบัตรนี้ผ่านมาตรฐาน {cert.certifyingBody} และเชื่อมต่อกับฐานข้อมูล
                  e-Workforce — นายจ้างสามารถตรวจสอบได้ผ่าน QR Code
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
