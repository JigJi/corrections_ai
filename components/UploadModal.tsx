"use client";

import { useState } from "react";
import { X, UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { CATEGORIES, type Category } from "@/lib/mockData";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; category: Category; tags: string[] }) => void;
}

export function UploadModal({ open, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<"upload" | "meta" | "done">("upload");
  const [filename, setFilename] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [classification, setClassification] = useState<"สาธารณะ" | "ภายใน" | "ลับ">(
    "ภายใน"
  );

  if (!open) return null;

  function reset() {
    setStep("upload");
    setFilename(null);
    setTitle("");
    setTags([]);
    setTagInput("");
  }

  function handleFile(name: string) {
    setFilename(name);
    setTitle(name.replace(/\.[^.]+$/, ""));
    setTimeout(() => setStep("meta"), 600);
  }

  function submit() {
    onSubmit({ title, category, tags });
    setStep("done");
    setTimeout(() => {
      reset();
      onClose();
    }, 1400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
          <div>
            <div className="text-base font-semibold text-navy-900">
              อัปโหลดเอกสารใหม่
            </div>
            <div className="text-xs text-navy-400">
              {step === "upload" && "เลือกไฟล์เพื่อเพิ่มเข้าคลังความรู้"}
              {step === "meta" && "ตรวจสอบและกรอกข้อมูลเอกสาร"}
              {step === "done" && "เสร็จสิ้น"}
            </div>
          </div>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-navy-400 hover:bg-navy-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          {step === "upload" && (
            <div
              onClick={() => handleFile("ระเบียบการเยี่ยมญาติฉบับใหม่_2568.pdf")}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50/40 px-6 py-12 text-center transition hover:border-navy-400 hover:bg-navy-50"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-600 shadow-soft transition group-hover:bg-navy-900 group-hover:text-gold-300">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-navy-800">
                ลากไฟล์มาวาง หรือคลิกเพื่อเลือก
              </div>
              <div className="mt-1 text-xs text-navy-400">
                รองรับ PDF, DOC, PPT, MP4, MP3, JPG, PNG · สูงสุด 500 MB
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {["PDF", "DOCX", "PPTX", "MP4", "MP3", "PNG"].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-navy-100 bg-white px-2 py-0.5 text-[10px] font-medium text-navy-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === "meta" && filename && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-navy-900">
                    {filename}
                  </div>
                  <div className="text-xs text-navy-400">2.4 MB · อัปโหลดสำเร็จ</div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>

              <Field label="ชื่อเอกสาร *">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="หมวดหมู่">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="ระดับชั้นความลับ">
                  <select
                    value={classification}
                    onChange={(e) =>
                      setClassification(e.target.value as typeof classification)
                    }
                    className="ring-focus w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none"
                  >
                    <option>สาธารณะ</option>
                    <option>ภายใน</option>
                    <option>ลับ</option>
                  </select>
                </Field>
              </div>

              <Field label="แท็ก (กด Enter เพื่อเพิ่ม)">
                <div className="ring-focus flex flex-wrap items-center gap-1.5 rounded-xl border border-navy-200 bg-white p-2 focus-within:border-navy-400">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-md bg-navy-100 px-2 py-0.5 text-xs text-navy-700"
                    >
                      {t}
                      <button
                        onClick={() => setTags(tags.filter((x) => x !== t))}
                        className="text-navy-400 hover:text-navy-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagInput.trim()) {
                        e.preventDefault();
                        setTags([...tags, tagInput.trim()]);
                        setTagInput("");
                      }
                    }}
                    className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-navy-300"
                    placeholder={tags.length === 0 ? "เช่น เยี่ยมญาติ, ระเบียบ" : ""}
                  />
                </div>
              </Field>

              <div className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3">
                <div className="flex items-start gap-2 text-xs text-gold-800">
                  <span className="font-semibold">ระบบจะดำเนินการ:</span>
                  <span>
                    OCR (ถ้ามี) → แบ่งเป็น chunks → สร้าง embeddings (BGE-M3) → ดัชนีใน
                    Vector DB · ใช้เวลาประมาณ 30 วินาที
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="mt-4 text-base font-semibold text-navy-900">
                เพิ่มเข้าคลังความรู้สำเร็จ
              </div>
              <div className="mt-1 text-sm text-navy-500">
                เอกสารพร้อมให้ค้นหาได้แล้ว
              </div>
            </div>
          )}
        </div>

        {step === "meta" && (
          <div className="flex justify-end gap-2 border-t border-navy-100 bg-navy-50/40 px-6 py-3">
            <button
              onClick={() => setStep("upload")}
              className="rounded-xl px-4 py-2 text-sm font-medium text-navy-600 hover:bg-white"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={submit}
              disabled={!title.trim()}
              className="rounded-xl bg-navy-900 px-5 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
            >
              บันทึกและ index
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-navy-700">{label}</div>
      {children}
    </label>
  );
}
