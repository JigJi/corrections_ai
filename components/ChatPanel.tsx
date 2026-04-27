"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Send,
  FileText,
  User2,
  Loader2,
  Filter,
  Sparkles,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import clsx from "clsx";
import type { Category, DocType } from "@/lib/mockData";
import {
  useSpeechRecognition,
  speak,
  stopSpeaking,
  speechSynthSupported,
} from "@/lib/useVoice";

export interface FilterUpdate {
  type?: DocType | "all";
  category?: Category | "all";
  query?: string;
  reset?: boolean;
  label?: string;
}

export interface Suggestion {
  emoji?: string;
  text: string;
  kind: "filter" | "question";
}

export interface SuggestedFilter {
  filter: FilterUpdate;
  label: string;
  ctaText: string;
  applied?: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: { id: string; title: string }[];
  filterApplied?: FilterUpdate;
  filterLabel?: string;
  suggestions?: Suggestion[];
  suggestedFilter?: SuggestedFilter;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialQuery: string;
  onFilterChange?: (update: FilterUpdate) => void;
}

export function ChatPanel({ open, onClose, initialQuery, onFilterChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSpokenIdx = useRef<number>(-1);

  const handleVoiceResult = useCallback(
    (r: { transcript: string; isFinal: boolean }) => {
      setInput(r.transcript);
      if (r.isFinal && r.transcript.trim()) {
        // Auto-send after a short delay
        setTimeout(() => {
          send(r.transcript.trim());
        }, 200);
      }
    },
    []
  );

  const { listening, supported: micSupported, start, stop } = useSpeechRecognition(
    handleVoiceResult
  );

  const ttsSupported = speechSynthSupported();

  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting: Message = {
        role: "assistant",
        content: initialQuery
          ? `สวัสดีครับ ผมชื่อ Corry ผู้ช่วย AI ประจำกรมราชทัณฑ์ 👋\nเห็นว่าคุณกำลังค้นเรื่อง "${initialQuery}" — มีอะไรให้ผมช่วยขยายผลหรือถามเพิ่มเติมไหมครับ?`
          : "สวัสดีครับ ผมชื่อ Corry ผู้ช่วย AI ประจำกรมราชทัณฑ์ 👋\nถามผมได้เลยครับ ทั้งเรื่องเอกสาร ระเบียบ คู่มือ หรือสื่อการสอน",
        suggestions: [
          { emoji: "📋", text: "สรุปสาระสำคัญของผลลัพธ์", kind: "question" },
          { emoji: "🎬", text: "เน้นเฉพาะวิดีโอ", kind: "filter" },
          { emoji: "⚖️", text: "เฉพาะกฎหมายและระเบียบ", kind: "filter" },
          { emoji: "🆚", text: "เปรียบเทียบระเบียบเก่ากับใหม่", kind: "question" },
        ],
      };
      setMessages([greeting]);
    }
  }, [open, initialQuery, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  // Auto-speak Corry's latest message when voice mode is on
  useEffect(() => {
    if (!voiceMode || messages.length === 0) return;
    const idx = messages.length - 1;
    const m = messages[idx];
    if (m.role === "assistant" && idx > lastSpokenIdx.current) {
      lastSpokenIdx.current = idx;
      speak(m.content);
    }
  }, [messages, voiceMode]);

  // Stop speaking when chat closes or voice mode turns off
  useEffect(() => {
    if (!open || !voiceMode) stopSpeaking();
  }, [open, voiceMode]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const intent = detectIntent(text);
      const reply: Message = {
        role: "assistant",
        content: intent.reply,
        citations: intent.filter
          ? undefined
          : [
              { id: "k1", title: "พ.ร.บ.ราชทัณฑ์ พ.ศ. 2560 (มาตรา 12)" },
              { id: "k2", title: "ระเบียบการเยี่ยมญาติฯ ข้อ 4" },
            ],
        filterApplied: intent.filter,
        filterLabel: intent.filterLabel,
        suggestions: intent.suggestions,
        suggestedFilter: intent.suggestedFilter,
      };
      setMessages((m) => [...m, reply]);
      setThinking(false);
      if (intent.filter) {
        onFilterChange?.({ ...intent.filter, label: intent.filterLabel });
      }
    }, 900);
  }

  function applySuggestedFilter(messageIndex: number) {
    const msg = messages[messageIndex];
    if (!msg.suggestedFilter || msg.suggestedFilter.applied) return;
    onFilterChange?.({
      ...msg.suggestedFilter.filter,
      label: msg.suggestedFilter.label,
    });
    setMessages((ms) =>
      ms.map((m, i) =>
        i === messageIndex && m.suggestedFilter
          ? { ...m, suggestedFilter: { ...m.suggestedFilter, applied: true } }
          : m
      )
    );
  }

  if (!open) return null;

  return (
    <aside className="fixed bottom-4 right-4 top-20 z-20 flex w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl animate-slide-in-right">
      <div className="flex items-center justify-between border-b border-navy-100 bg-gradient-to-br from-navy-900 to-navy-700 px-5 py-4 text-white">
        <Link
          href="/corry"
          className="group flex items-center gap-3 rounded-xl -mx-1 px-1 py-0.5 transition hover:bg-white/5"
          title="ดูข้อมูลของ Corry"
        >
          <div className="relative h-11 w-11 overflow-hidden rounded-full bg-white ring-2 ring-gold-300/40 shadow-lg transition group-hover:ring-gold-300/70">
            <Image
              src="/corry.png"
              alt="Corry"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-800 bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:underline">
              Corry
              <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] font-medium text-emerald-300">
                ออนไลน์
              </span>
            </div>
            <div className="text-[11px] text-navy-200">
              AI ประจำกรมราชทัณฑ์ · ดูข้อมูลของผม →
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {ttsSupported && (
            <button
              onClick={() => {
                setVoiceMode((v) => !v);
                if (voiceMode) stopSpeaking();
              }}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full transition",
                voiceMode
                  ? "bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-300/40"
                  : "text-white/80 hover:bg-white/10"
              )}
              title={voiceMode ? "ปิดเสียง Corry" : "เปิดเสียง Corry"}
            >
              {voiceMode ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-navy-50/30 p-5">
          {messages.map((m, i) => (
            <MessageBubble key={i} m={m} onApplyFilter={() => applySuggestedFilter(i)} />
          ))}
          {thinking && (
            <div className="flex items-start gap-2.5">
              <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold-200">
                <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-navy-100 bg-white px-3.5 py-2.5 shadow-soft">
                <div className="flex items-center gap-2 text-xs text-navy-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Corry กำลังค้นในคลังความรู้...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Initial suggestion chips — only when greeting */}
        {messages.length <= 1 && !thinking && messages[0]?.suggestions && (
          <div className="border-t border-navy-100 bg-white px-5 py-2.5">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy-400">
              ลองเริ่มจาก
            </div>
            <div className="flex flex-wrap gap-1.5">
              {messages[0].suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s.text)}
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
                    s.kind === "filter"
                      ? "border-gold-200 bg-gold-50/60 text-gold-800 hover:border-gold-400 hover:bg-gold-100"
                      : "border-navy-200 bg-white text-navy-700 hover:border-navy-400 hover:bg-navy-50"
                  )}
                >
                  {s.emoji && <span>{s.emoji}</span>}
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-navy-100 bg-white p-3">
          {/* Listening indicator */}
          {listening && (
            <div className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-[12px] font-medium text-rose-700 animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
              </span>
              กำลังฟังเสียงคุณอยู่... พูดได้เลยครับ
            </div>
          )}

          {/* Real-time intent preview */}
          {input.trim() && !listening && <IntentPreview text={input} />}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className={clsx(
              "flex items-end gap-2 rounded-2xl border bg-white p-2 shadow-soft transition",
              listening
                ? "border-rose-300 shadow-[0_0_0_4px_rgba(244,63,94,0.15)]"
                : "border-navy-100 focus-within:border-navy-400 focus-within:shadow-glow"
            )}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder={
                listening
                  ? "🎤 กำลังฟัง..."
                  : "ถาม Corry เรื่องเอกสาร ระเบียบ หรือสื่อการสอน..."
              }
              disabled={listening}
              className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed outline-none placeholder:text-navy-300 disabled:opacity-70"
            />
            {micSupported && (
              <button
                type="button"
                onClick={() => (listening ? stop() : start())}
                disabled={thinking}
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition disabled:opacity-40",
                  listening
                    ? "bg-rose-500 text-white animate-pulse hover:bg-rose-600"
                    : "border border-navy-200 bg-white text-navy-600 hover:border-navy-400 hover:bg-navy-50"
                )}
                title={listening ? "หยุดฟัง" : "พูดกับ Corry"}
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            <button
              type="submit"
              disabled={!input.trim() || thinking || listening}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white transition hover:bg-navy-800 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 px-1 text-center text-[10px] text-navy-400">
            {micSupported
              ? "🎤 พูดได้ · 🔊 เปิดเสียงตอบที่ปุ่มลำโพงด้านบน · Corry อาจคลาดเคลื่อน"
              : "ผลลัพธ์การค้นหาจะปรับตามบทสนทนา · Corry อาจคลาดเคลื่อน โปรดตรวจสอบเอกสารต้นทาง"}
          </div>
        </div>
    </aside>
  );
}

function IntentPreview({ text }: { text: string }) {
  const intent = detectIntent(text);
  const isFilter = !!intent.filter;
  return (
    <div
      className={clsx(
        "mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium animate-fade-in",
        isFilter
          ? "border border-gold-200 bg-gold-50 text-gold-800"
          : "border border-navy-100 bg-navy-50/40 text-navy-600"
      )}
    >
      {isFilter ? (
        <>
          <Filter className="h-3 w-3" />
          จะปรับ filter: <span className="font-semibold">{intent.filterLabel}</span>
          <Sparkles className="h-3 w-3" />
        </>
      ) : (
        <>
          <MessageCircle className="h-3 w-3" />
          จะถาม Corry — Enter เพื่อส่ง
        </>
      )}
    </div>
  );
}

function MessageBubble({
  m,
  onApplyFilter,
}: {
  m: Message;
  onApplyFilter?: () => void;
}) {
  const isUser = m.role === "user";
  return (
    <div className={clsx("flex items-start gap-2.5", isUser && "flex-row-reverse")}>
      {isUser ? (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
          <User2 className="h-3.5 w-3.5" />
        </div>
      ) : (
        <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold-200">
          <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
        </div>
      )}
      <div
        className={clsx(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-soft",
          isUser
            ? "rounded-tr-sm bg-navy-900 text-white"
            : "rounded-tl-sm border border-navy-100 bg-white text-navy-800"
        )}
      >
        <div className="whitespace-pre-line">{m.content}</div>

        {m.filterApplied && m.filterLabel && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-gold-200 bg-gold-50 px-2 py-1 text-[11px] font-medium text-gold-800">
            <Filter className="h-3 w-3" />
            ปรับ filter: {m.filterLabel}
            <Sparkles className="h-3 w-3 text-gold-500" />
          </div>
        )}

        {m.suggestedFilter && (
          <div className="mt-3 border-t border-navy-100 pt-2.5">
            <div className="mb-2 text-[11px] text-navy-500">
              💡 ให้ผมปรับการแสดงผลตามนี้เลยไหมครับ?
            </div>
            <button
              onClick={onApplyFilter}
              disabled={m.suggestedFilter.applied}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition",
                m.suggestedFilter.applied
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default"
                  : "border-gold-300 bg-gradient-to-r from-gold-50 to-white text-gold-900 hover:border-gold-500 hover:bg-gold-100 hover:shadow-soft"
              )}
            >
              {m.suggestedFilter.applied ? (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  ปรับให้แล้ว
                </>
              ) : (
                <>
                  <Filter className="h-3.5 w-3.5" />
                  {m.suggestedFilter.ctaText}
                </>
              )}
            </button>
          </div>
        )}

        {m.citations && m.citations.length > 0 && (
          <div className="mt-2.5 space-y-1 border-t border-navy-100 pt-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-navy-400">
              อ้างอิง
            </div>
            {m.citations.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-1.5 text-[11px] text-navy-600 hover:text-navy-900"
              >
                <FileText className="h-3 w-3" />
                <span className="underline-offset-2 hover:underline">{c.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface IntentResult {
  reply: string;
  filter?: FilterUpdate;
  filterLabel?: string;
  suggestions?: Suggestion[];
  suggestedFilter?: SuggestedFilter;
}

const SUG_NEXT_REFINE: Suggestion[] = [
  { emoji: "📋", text: "สรุปสาระสำคัญทั้งหมด", kind: "question" },
  { emoji: "🆚", text: "เปรียบเทียบเก่ากับใหม่", kind: "question" },
  { emoji: "🗑️", text: "ล้างตัวกรอง", kind: "filter" },
];

const FILTER_INTENT_WORDS = [
  "เฉพาะ",
  "เอาแค่",
  "แค่",
  "เน้น",
  "กรอง",
  "เปลี่ยนเป็น",
  "ดูแค่",
  "ดูเฉพาะ",
  "filter",
];

const QUESTION_INTENT_WORDS = [
  "เปรียบเทียบ",
  "เทียบ",
  "สรุป",
  "อะไร",
  "ยังไง",
  "ทำไม",
  "อย่างไร",
  "เป็นยังไง",
  "คืออะไร",
  "เล่า",
  "อธิบาย",
];

function detectIntent(q: string): IntentResult {
  const lower = q.toLowerCase();

  // 1. Reset filters — explicit clear intent
  if (
    lower.includes("ล้างตัวกรอง") ||
    lower.includes("ล้าง filter") ||
    lower.includes("รีเซ็ต") ||
    lower.includes("เริ่มใหม่") ||
    lower.includes("ดูทั้งหมด")
  ) {
    return {
      reply: "เคลียร์ตัวกรองทั้งหมดให้แล้วครับ — ตอนนี้เห็นเอกสารทุกประเภท ทุกหมวดหมู่",
      filter: { reset: true, type: "all", category: "all" },
      filterLabel: "ล้างตัวกรองทั้งหมด",
    };
  }

  // 2. Question intents come BEFORE filter checks (so "เปรียบเทียบระเบียบ..." is question, not filter)
  const isQuestion = QUESTION_INTENT_WORDS.some((w) => lower.includes(w));
  const isFilterIntent = FILTER_INTENT_WORDS.some((w) => lower.includes(w));

  if (lower.includes("เปรียบเทียบ") || lower.includes("เทียบ")) {
    return {
      reply:
        "เปรียบเทียบระเบียบเยี่ยมญาติเก่า (2562) กับใหม่ (2566) ให้นะครับ:\n\n📌 **ฉบับเก่า 2562**\n• เยี่ยมในสถานที่ได้เท่านั้น สัปดาห์ละ 1 ครั้ง 30 นาที\n• ต้องนัดหมายล่วงหน้า 1 วัน\n• ผู้เยี่ยมสูงสุด 4 คน/ครั้ง\n\n📌 **ฉบับใหม่ 2566**\n• เพิ่มช่อง Video Visit ออนไลน์ ทุกวัน 08:30–16:30\n• นัดผ่านระบบออนไลน์ได้ทันที\n• Video Visit ไม่จำกัดจำนวนผู้เยี่ยม (ในกรอบ)\n• ผู้ต้องขังที่ลงโทษทางวินัย อาจถูกระงับสิทธิ์ตามดุลพินิจ ผบ.เรือนจำ\n\nสรุป: ฉบับใหม่ยืดหยุ่นกว่ามาก โดยเฉพาะการเพิ่มช่องทางออนไลน์",
      suggestedFilter: {
        filter: { category: "กฎหมายและระเบียบ" },
        label: "หมวดกฎหมายและระเบียบ",
        ctaText: "ดูเฉพาะกฎหมายและระเบียบ",
      },
    };
  }

  if (lower.includes("สรุป")) {
    return {
      reply:
        "จากผลลัพธ์ที่ค้นพบ สามารถสรุปได้เป็น 3 กลุ่มใหญ่:\n1) **กฎหมาย/ระเบียบ** — พ.ร.บ.ราชทัณฑ์ ฉบับล่าสุด และระเบียบเฉพาะเรื่อง\n2) **คู่มือปฏิบัติงาน** — สำหรับผู้คุมและการเตรียมความพร้อม\n3) **สื่อการสอน** — วิดีโอ/สไลด์อบรม\n\nสนใจกลุ่มไหนเป็นพิเศษไหมครับ?",
      suggestedFilter: {
        filter: { category: "กฎหมายและระเบียบ" },
        label: "หมวดกฎหมายและระเบียบ",
        ctaText: "ดูเฉพาะกฎหมายและระเบียบก่อน",
      },
    };
  }

  // 3. File type filters — only if explicit filter intent
  const typeMap: { match: string[]; type: DocType; label: string }[] = [
    { match: ["วิดีโอ", "วีดีโอ", "video", "คลิป"], type: "video", label: "เฉพาะวิดีโอ" },
    { match: ["pdf", "พีดีเอฟ"], type: "pdf", label: "เฉพาะ PDF" },
    { match: ["สไลด์", "slide", "นำเสนอ"], type: "slide", label: "เฉพาะสไลด์" },
    { match: ["ไฟล์เสียง", "audio"], type: "audio", label: "เฉพาะไฟล์เสียง" },
    { match: ["ภาพ", "รูป", "image", "แผนผัง"], type: "image", label: "เฉพาะรูปภาพ" },
    { match: ["เอกสาร word", "ดอค"], type: "doc", label: "เฉพาะเอกสาร DOC" },
  ];
  if (isFilterIntent) {
    for (const t of typeMap) {
      if (t.match.some((m) => lower.includes(m))) {
        return {
          reply: `ปรับให้แล้วครับ — ตอนนี้แสดง${t.label}เท่านั้น ดูที่แผงด้านซ้ายได้เลย`,
          filter: { type: t.type },
          filterLabel: t.label,
        };
      }
    }
  }

  // 4. Category filters — only if explicit filter intent
  const catMap: { match: string[]; cat: Category; label: string }[] = [
    {
      match: ["กฎหมาย", "พ.ร.บ.", "พรบ", "law"],
      cat: "กฎหมายและระเบียบ",
      label: "หมวดกฎหมายและระเบียบ",
    },
    {
      match: ["คู่มือ", "ปฏิบัติงาน", "sop"],
      cat: "คู่มือปฏิบัติงาน",
      label: "หมวดคู่มือปฏิบัติงาน",
    },
    {
      match: ["อบรม", "สื่อการสอน", "training"],
      cat: "สื่อการสอน/อบรม",
      label: "หมวดสื่อการสอน/อบรม",
    },
    { match: ["วิจัย", "research"], cat: "งานวิจัย", label: "หมวดงานวิจัย" },
    {
      match: ["ประกาศ", "หนังสือเวียน", "circular"],
      cat: "ประกาศ/หนังสือเวียน",
      label: "หมวดประกาศ/หนังสือเวียน",
    },
  ];
  if (isFilterIntent) {
    for (const c of catMap) {
      if (c.match.some((m) => lower.includes(m))) {
        return {
          reply: `ปรับให้แล้วครับ — ตอนนี้แสดง${c.label}เท่านั้น`,
          filter: { category: c.cat },
          filterLabel: c.label,
        };
      }
    }
  }

  // 5. Specific knowledge replies (no filter change)
  if (lower.includes("เยี่ยม") || lower.includes("ญาติ")) {
    return {
      reply:
        "ตามระเบียบกรมราชทัณฑ์ ปี 2566 การเยี่ยมญาติแบ่งเป็น 2 รูปแบบ\n1) เยี่ยมในสถานที่ — สัปดาห์ละ 1 ครั้ง ครั้งละไม่เกิน 30 นาที\n2) เยี่ยมออนไลน์ผ่านระบบ Video Visit — เปิดให้ทุกวัน 08:30–16:30\n\nผู้ต้องขังที่ถูกลงโทษทางวินัยอาจถูกระงับสิทธิ์ตามดุลพินิจของผู้บัญชาการเรือนจำ",
      suggestedFilter: {
        filter: { category: "กฎหมายและระเบียบ" },
        label: "หมวดกฎหมายและระเบียบ",
        ctaText: "ดูเฉพาะระเบียบเรื่องนี้",
      },
    };
  }
  if (lower.includes("ใช้กำลัง") || lower.includes("ควบคุม")) {
    return {
      reply:
        "หลัก Use-of-Force Continuum ของกรมฯ มี 5 ขั้น โดยเจ้าหน้าที่ต้องเริ่มจากขั้นต่ำสุดและยกระดับเฉพาะเมื่อจำเป็น:\n• ขั้น 1: การมีตัวอยู่ (Presence)\n• ขั้น 2: คำสั่งด้วยวาจา\n• ขั้น 3: การควบคุมด้วยมือเปล่า\n• ขั้น 4: เครื่องมือไม่ทำให้บาดเจ็บถาวร (สเปรย์, กระบอง)\n• ขั้น 5: กำลังร้ายแรง (เฉพาะกรณีเสี่ยงต่อชีวิต)",
      suggestedFilter: {
        filter: { category: "คู่มือปฏิบัติงาน" },
        label: "หมวดคู่มือปฏิบัติงาน",
        ctaText: "ดูเฉพาะคู่มือปฏิบัติงาน",
      },
    };
  }

  if (isQuestion) {
    return {
      reply:
        "ผมเข้าใจคำถามครับ — ในระบบ demo นี้ผมตอบเฉพาะบางหัวข้อก่อน เช่น 'ระเบียบเยี่ยมญาติ', 'การใช้กำลัง', 'เปรียบเทียบฉบับเก่า/ใหม่', 'สรุป' หรือถ้าต้องการกรองผลลัพธ์ ลองพิมพ์ 'เน้นเฉพาะวิดีโอ', 'เอาเฉพาะกฎหมาย' ผมจะช่วยปรับ filter ให้ทันที 👀",
    };
  }

  return {
    reply:
      "ผมเข้าใจครับ — ลองบอกผมเฉพาะเจาะจง เช่น 'เน้นเฉพาะวิดีโอ' (ปรับ filter) หรือ 'สรุปสาระสำคัญ' (ถามคำถาม) ผมจะช่วยให้ทันทีครับ",
  };
}
