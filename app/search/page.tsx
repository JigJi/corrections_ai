"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Search, Sparkles, ArrowRight, Wand2, X, Mic, MicOff } from "lucide-react";
import clsx from "clsx";
import { useSpeechRecognition } from "@/lib/useVoice";
import { MOCK_ITEMS, QUICK_QUERIES, type Category, type DocType } from "@/lib/mockData";
import { ResultCard } from "@/components/ResultCard";
import { FilterBar } from "@/components/FilterBar";
import { ChatPanel } from "@/components/ChatPanel";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [activeType, setActiveType] = useState<DocType | "all">("all");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [corrySetLabel, setCorrySetLabel] = useState<string | null>(null);

  const handleVoice = useCallback((r: { transcript: string; isFinal: boolean }) => {
    setQuery(r.transcript);
    if (r.isFinal && r.transcript.trim()) {
      setTimeout(() => {
        setSubmitted(r.transcript.trim());
      }, 200);
    }
  }, []);
  const voice = useSpeechRecognition(handleVoice);

  const filtered = useMemo(() => {
    let items = MOCK_ITEMS;
    if (submitted) {
      const q = submitted.toLowerCase();
      items = items
        .map((it) => ({
          ...it,
          relevance:
            (it.title.toLowerCase().includes(q) ? 0.4 : 0) +
            (it.excerpt.toLowerCase().includes(q) ? 0.3 : 0) +
            (it.tags.some((t) => t.toLowerCase().includes(q)) ? 0.3 : 0) +
            (it.relevance ?? 0) * 0.3,
        }))
        .filter((it) => it.relevance > 0.2);
    }
    if (activeType !== "all") items = items.filter((it) => it.type === activeType);
    if (activeCategory !== "all")
      items = items.filter((it) => it.category === activeCategory);
    return items.sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0));
  }, [submitted, activeType, activeCategory]);

  const hasSearched = submitted.length > 0;

  function submit(q: string) {
    setQuery(q);
    setSubmitted(q);
  }

  return (
    <>
      {!hasSearched ? (
        <HeroSearch
          query={query}
          setQuery={setQuery}
          onSubmit={submit}
          onOpenChat={() => setChatOpen(true)}
          voice={voice}
        />
      ) : (
        <div
          className={clsx(
            "transition-all duration-300",
            chatOpen ? "lg:pr-[440px]" : ""
          )}
        >
          <div className="border-b border-navy-100/60 bg-white">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
              <div
                className={clsx(
                  "flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5 transition",
                  voice.listening
                    ? "border-rose-300 bg-rose-50/40 shadow-[0_0_0_4px_rgba(244,63,94,0.12)]"
                    : "ring-focus border-navy-100 bg-navy-50/40 focus-within:border-navy-400 focus-within:bg-white"
                )}
              >
                <Search className="h-4 w-4 flex-shrink-0 text-navy-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit(query)}
                  placeholder={voice.listening ? "🎤 กำลังฟัง..." : "ค้นหาในคลังความรู้กรมราชทัณฑ์..."}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-300"
                />
                {query && !voice.listening && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setSubmitted("");
                    }}
                    className="text-xs text-navy-400 hover:text-navy-700"
                  >
                    ล้าง
                  </button>
                )}
                {voice.supported && (
                  <button
                    onClick={() => (voice.listening ? voice.stop() : voice.start())}
                    className={clsx(
                      "flex h-7 w-7 items-center justify-center rounded-full transition",
                      voice.listening
                        ? "bg-rose-500 text-white animate-pulse"
                        : "text-navy-500 hover:bg-navy-100 hover:text-navy-800"
                    )}
                    title={voice.listening ? "หยุดฟัง" : "พูดเพื่อค้นหา"}
                  >
                    {voice.listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium transition shadow-soft",
                  chatOpen
                    ? "bg-navy-900 text-white"
                    : "border border-navy-100 bg-white text-navy-700 hover:border-navy-300"
                )}
              >
                <span
                  className={clsx(
                    "relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-white",
                    chatOpen ? "ring-1 ring-gold-300/50" : "ring-1 ring-gold-200"
                  )}
                >
                  <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
                </span>
                คุยกับ Corry
              </button>
            </div>
          </div>

          {voice.error && (
            <div className="mx-auto max-w-7xl px-6 pt-3">
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                🎤 {voice.error}
              </div>
            </div>
          )}

          <FilterBar
            activeType={activeType}
            onTypeChange={(t) => {
              setActiveType(t);
              setCorrySetLabel(null);
            }}
            activeCategory={activeCategory}
            onCategoryChange={(c) => {
              setActiveCategory(c);
              setCorrySetLabel(null);
            }}
            resultCount={filtered.length}
          />

          {corrySetLabel && (
            <div className="border-b border-gold-200 bg-gradient-to-r from-gold-50 via-white to-gold-50 animate-fade-in">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gold-300">
                    <Image src="/corry.png" alt="Corry" fill sizes="28px" className="object-cover" />
                  </div>
                  <div className="text-sm">
                    <span className="text-navy-500">Corry ปรับ filter ให้คุณ:</span>{" "}
                    <span className="font-semibold text-navy-900">{corrySetLabel}</span>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                </div>
                <button
                  onClick={() => {
                    setActiveType("all");
                    setActiveCategory("all");
                    setCorrySetLabel(null);
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-navy-600 hover:bg-white hover:text-navy-900"
                >
                  <X className="h-3.5 w-3.5" />
                  ล้าง
                </button>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-navy-500">
              <Wand2 className="h-4 w-4 text-gold-500" />
              <span>
                ผลการค้นหาสำหรับ{" "}
                <span className="font-semibold text-navy-900">"{submitted}"</span>{" "}
                — เรียงตามความเกี่ยวข้องด้วย Vector Search + Re-ranking
              </span>
            </div>

            <div
              className={clsx(
                "grid gap-4 animate-fade-in",
                chatOpen ? "grid-cols-2" : "grid-cols-3"
              )}
            >
              {filtered.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
                  <div className="text-base font-medium text-navy-700">
                    ไม่พบผลลัพธ์ที่ตรงกับคำค้น
                  </div>
                  <div className="mt-1 text-sm text-navy-400">
                    ลองเปลี่ยนคำค้น หรือคลายตัวกรองดู
                  </div>
                </div>
              )}
              {filtered.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        initialQuery={submitted}
        onFilterChange={(u) => {
          if (u.reset) {
            setActiveType("all");
            setActiveCategory("all");
          }
          if (u.type !== undefined) setActiveType(u.type);
          if (u.category !== undefined) setActiveCategory(u.category);
          if (u.query !== undefined) {
            setQuery(u.query);
            setSubmitted(u.query);
          }
          if (u.label) setCorrySetLabel(u.label);
        }}
      />
    </>
  );
}

function HeroSearch({
  query,
  setQuery,
  onSubmit,
  onOpenChat,
  voice,
}: {
  query: string;
  setQuery: (s: string) => void;
  onSubmit: (s: string) => void;
  onOpenChat: () => void;
  voice: ReturnType<typeof useSpeechRecognition>;
}) {
  return (
    <div className="bg-hero">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center px-6 py-16">
        <h1 className="text-center text-[2.5rem] font-bold leading-tight tracking-tight text-navy-900 md:text-5xl">
          <span className="block">คลังความรู้อัจฉริยะ</span>
          <span className="mt-[5px] block bg-gradient-to-r from-navy-700 via-navy-500 to-gold-500 bg-clip-text text-transparent">
            กรมราชทัณฑ์
          </span>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) onSubmit(query);
          }}
          className="mt-10 w-full"
        >
          <div
            className={clsx(
              "group flex items-center gap-2 rounded-2xl border bg-white p-2.5 shadow-soft transition",
              voice.listening
                ? "border-rose-300 shadow-[0_0_0_4px_rgba(244,63,94,0.15)]"
                : "ring-focus border-navy-100 focus-within:border-navy-400 focus-within:shadow-glow"
            )}
          >
            <div
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                voice.listening ? "bg-rose-100 text-rose-600" : "bg-navy-50 text-navy-500"
              )}
            >
              <Search className="h-5 w-5" />
            </div>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                voice.listening
                  ? "🎤 กำลังฟัง... พูดได้เลยครับ"
                  : "ค้นหาอะไรก็ได้... เช่น ระเบียบการเยี่ยมญาติ, คู่มือผู้คุม"
              }
              className="h-10 flex-1 bg-transparent text-base outline-none placeholder:text-navy-300"
            />
            {voice.supported && (
              <button
                type="button"
                onClick={() => (voice.listening ? voice.stop() : voice.start())}
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition",
                  voice.listening
                    ? "bg-rose-500 text-white animate-pulse hover:bg-rose-600"
                    : "border border-navy-200 bg-white text-navy-600 hover:border-navy-400 hover:bg-navy-50"
                )}
                title={voice.listening ? "หยุดฟัง" : "พูดเพื่อค้นหา"}
              >
                {voice.listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}
            {voice.error && (
              <div className="ml-2 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-700">
                {voice.error}
              </div>
            )}
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-navy-900 px-5 text-sm font-medium text-white transition hover:bg-navy-800 disabled:opacity-50"
              disabled={!query.trim() || voice.listening}
            >
              ค้นหา
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-navy-400">ลองค้นหา:</span>
          {QUICK_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => onSubmit(q)}
              className="rounded-full border border-navy-100 bg-white/80 px-3 py-1 text-xs text-navy-600 shadow-soft transition hover:border-navy-300 hover:bg-white hover:text-navy-900"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
