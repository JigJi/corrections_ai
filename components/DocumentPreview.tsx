"use client";

import { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Maximize2,
  Play,
  Pause,
  Volume2,
  Image as ImageIcon,
  FileText,
  Presentation,
} from "lucide-react";
import clsx from "clsx";
import type { KnowledgeItem } from "@/lib/mockData";

export function DocumentPreview({ item }: { item: KnowledgeItem }) {
  if (item.type === "video") return <VideoPreview item={item} />;
  if (item.type === "audio") return <AudioPreview item={item} />;
  if (item.type === "image") return <ImagePreview item={item} />;
  if (item.type === "slide") return <SlidePreview item={item} />;
  return <DocumentPagesPreview item={item} />;
}

function DocumentPagesPreview({ item }: { item: KnowledgeItem }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = item.pages || 12;

  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-navy-100 bg-navy-50/40 px-4 py-2.5">
        <div className="flex items-center gap-1">
          <ToolBtn
            icon={ChevronLeft}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          <div className="rounded-lg border border-navy-200 bg-white px-2.5 py-1 text-xs font-medium text-navy-700">
            หน้า {page} / {totalPages}
          </div>
          <ToolBtn
            icon={ChevronRight}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
          <div className="mx-2 h-5 w-px bg-navy-200" />
          <ToolBtn icon={ZoomOut} onClick={() => setZoom((z) => Math.max(50, z - 10))} />
          <div className="w-12 text-center text-xs font-medium text-navy-600">
            {zoom}%
          </div>
          <ToolBtn icon={ZoomIn} onClick={() => setZoom((z) => Math.min(200, z + 10))} />
        </div>
        <div className="flex items-center gap-1">
          <ToolBtn icon={Search} />
          <ToolBtn icon={Maximize2} />
          <ToolBtn icon={Download} />
        </div>
      </div>

      {/* Page area */}
      <div className="flex justify-center bg-navy-50 p-8">
        <div
          className="rounded-md bg-white shadow-lg"
          style={{
            width: `${(595 * zoom) / 100}px`,
            maxWidth: "100%",
            transition: "width 0.2s",
          }}
        >
          <MockPage item={item} page={page} totalPages={totalPages} />
        </div>
      </div>

      {/* Page thumbnails */}
      <div className="border-t border-navy-100 bg-white px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: Math.min(totalPages, 12) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={clsx(
                "flex-shrink-0 rounded border-2 p-1 transition",
                page === i + 1
                  ? "border-navy-700"
                  : "border-transparent hover:border-navy-200"
              )}
            >
              <div className="flex h-12 w-9 flex-col gap-0.5 rounded-sm bg-navy-50 p-1">
                <div className="h-0.5 w-full rounded bg-navy-200" />
                <div className="h-0.5 w-3/4 rounded bg-navy-200" />
                <div className="h-0.5 w-full rounded bg-navy-200" />
                <div className="h-0.5 w-1/2 rounded bg-navy-200" />
              </div>
              <div className="mt-1 text-center text-[9px] text-navy-500">{i + 1}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockPage({
  item,
  page,
  totalPages,
}: {
  item: KnowledgeItem;
  page: number;
  totalPages: number;
}) {
  return (
    <div className="aspect-[1/1.414] p-12">
      {/* Page header */}
      <div className="mb-8 border-b-2 border-navy-200 pb-4">
        <div className="text-[10px] uppercase tracking-widest text-navy-400">
          {item.source} · {item.category}
        </div>
        <h2 className="mt-2 text-lg font-bold text-navy-900">{item.title}</h2>
      </div>

      {/* Page content - varied per page */}
      {page === 1 && (
        <div className="space-y-3 text-[11px] leading-relaxed text-navy-700">
          <div className="text-center text-base font-bold">บทนำ</div>
          <p>{item.excerpt}</p>
          <div className="space-y-1.5 pt-3">
            {[60, 90, 75, 95, 80, 70, 85].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded bg-navy-100"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="pt-4 font-semibold text-navy-800">มาตรา 1</div>
          <div className="space-y-1.5">
            {[88, 92, 70].map((w, i) => (
              <div key={i} className="h-2 rounded bg-navy-100" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="pt-2 font-semibold text-navy-800">มาตรา 2</div>
          <div className="space-y-1.5">
            {[85, 95, 80, 60].map((w, i) => (
              <div key={i} className="h-2 rounded bg-navy-100" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {page > 1 && (
        <div className="space-y-3">
          <div className="text-base font-bold text-navy-900">หมวดที่ {page}</div>
          <div className="space-y-1.5">
            {[75, 90, 65, 88, 92, 70, 85, 80, 95, 60, 88].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded bg-navy-100"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="pt-3 text-[10px] font-semibold uppercase text-navy-500">
            ข้อย่อย ({page}.1)
          </div>
          <div className="space-y-1.5">
            {[80, 95, 70].map((w, i) => (
              <div key={i} className="h-2 rounded bg-navy-100" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="pt-3 text-[10px] font-semibold uppercase text-navy-500">
            ข้อย่อย ({page}.2)
          </div>
          <div className="space-y-1.5">
            {[88, 75, 92, 80].map((w, i) => (
              <div key={i} className="h-2 rounded bg-navy-100" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* Page footer */}
      <div className="mt-12 flex items-center justify-between border-t border-navy-100 pt-2 text-[9px] text-navy-400">
        <span>{item.source}</span>
        <span>หน้า {page} / {totalPages}</span>
      </div>
    </div>
  );
}

function VideoPreview({ item }: { item: KnowledgeItem }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
      <div className="relative aspect-video bg-gradient-to-br from-navy-900 via-navy-800 to-purple-900">
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(212,162,44,0.4), transparent 50%), radial-gradient(circle at 70% 60%, rgba(46,84,160,0.5), transparent 50%)",
          }}
        />
        {/* Play button */}
        <button
          onClick={() => setPlaying(!playing)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-2 ring-white/30 transition group-hover:scale-110">
            {playing ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="ml-1 h-8 w-8 text-white" />
            )}
          </div>
        </button>
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-[10px] uppercase tracking-widest text-white/60">
            {item.source}
          </div>
          <div className="text-base font-semibold text-white">{item.title}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 border-t border-navy-100 bg-navy-50/40 px-4 py-2.5">
        <button onClick={() => setPlaying(!playing)} className="text-navy-700">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-navy-200">
            <div className="h-full w-1/4 bg-gradient-to-r from-navy-700 to-gold-400" />
          </div>
        </div>
        <span className="text-xs font-mono text-navy-600">21:00 / {item.duration}</span>
        <Volume2 className="h-4 w-4 text-navy-500" />
      </div>
    </div>
  );
}

function AudioPreview({ item }: { item: KnowledgeItem }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-10">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
            <Volume2 className="h-9 w-9 text-amber-600" />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-amber-700">
            ไฟล์เสียง · {item.source}
          </div>
          <div className="mt-1 text-base font-semibold text-amber-900">{item.title}</div>
        </div>

        {/* Waveform */}
        <div className="flex items-center justify-center gap-0.5">
          {Array.from({ length: 80 }).map((_, i) => {
            const height = Math.abs(Math.sin(i * 0.4)) * 40 + Math.abs(Math.cos(i * 0.7)) * 20 + 6;
            return (
              <div
                key={i}
                className={clsx(
                  "w-1 rounded-full transition",
                  i < 25 ? "bg-amber-700" : "bg-amber-400"
                )}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => setPlaying(!playing)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <span className="text-xs font-mono text-navy-600">12:35</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-navy-100">
          <div className="h-full w-1/3 bg-gradient-to-r from-amber-500 to-amber-300" />
        </div>
        <span className="text-xs font-mono text-navy-600">{item.duration}</span>
      </div>
    </div>
  );
}

function ImagePreview({ item }: { item: KnowledgeItem }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-10">
        <div className="text-center">
          <ImageIcon className="mx-auto h-20 w-20 text-emerald-500" />
          <div className="mt-3 text-sm font-semibold text-emerald-900">{item.title}</div>
          <div className="text-[11px] text-emerald-700">
            {item.size} · ภาพแผนผัง
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 border-t border-navy-100 bg-navy-50/40 px-4 py-2.5">
        <ToolBtn icon={ZoomIn} />
        <ToolBtn icon={Maximize2} />
        <ToolBtn icon={Download} />
      </div>
    </div>
  );
}

function SlidePreview({ item }: { item: KnowledgeItem }) {
  const [slide, setSlide] = useState(1);
  const total = item.pages || 24;
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8">
        <div className="mx-auto aspect-video max-w-2xl rounded-lg bg-white p-10 shadow-xl">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Presentation className="mb-4 h-12 w-12 text-orange-500" />
            <div className="text-[10px] uppercase tracking-widest text-orange-600">
              สไลด์ {slide} / {total}
            </div>
            <h2 className="mt-2 text-xl font-bold text-navy-900">{item.title}</h2>
            <p className="mt-2 text-sm text-navy-500">{item.excerpt}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-navy-100 bg-navy-50/40 px-4 py-2.5">
        <ToolBtn
          icon={ChevronLeft}
          disabled={slide <= 1}
          onClick={() => setSlide((s) => Math.max(1, s - 1))}
        />
        <div className="flex gap-1">
          {Array.from({ length: total }).slice(0, 8).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i + 1)}
              className={clsx(
                "h-1.5 rounded-full transition",
                slide === i + 1 ? "w-6 bg-orange-500" : "w-1.5 bg-navy-200"
              )}
            />
          ))}
        </div>
        <ToolBtn
          icon={ChevronRight}
          disabled={slide >= total}
          onClick={() => setSlide((s) => Math.min(total, s + 1))}
        />
      </div>
    </div>
  );
}

function ToolBtn({
  icon: Icon,
  onClick,
  disabled,
}: {
  icon: typeof Search;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-7 w-7 items-center justify-center rounded-md text-navy-600 transition hover:bg-white hover:text-navy-900 disabled:opacity-30"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
