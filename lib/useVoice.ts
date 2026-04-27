"use client";

import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export function useSpeechRecognition(onResult: (r: SpeechRecognitionResult) => void) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      console.warn("[Corry voice] SpeechRecognition not supported in this browser. Try Chrome or Edge.");
      setSupported(false);
      return;
    }
    setSupported(true);

    const recognition = new SR();
    recognition.lang = "th-TH";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("[Corry voice] listening started (lang=th-TH)");
      setError(null);
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      console.log("[Corry voice] transcript:", transcript, "(final:", isFinal, ")");
      onResult({ transcript, isFinal });
    };

    recognition.onend = () => {
      console.log("[Corry voice] listening ended");
      setListening(false);
    };

    recognition.onerror = (e: any) => {
      console.error("[Corry voice] error:", e.error, e);
      const errorMessages: Record<string, string> = {
        "not-allowed": "ไม่ได้รับสิทธิ์เข้าถึงไมโครโฟน — กดอนุญาตในแถบ URL",
        "no-speech": "ไม่ได้ยินเสียงพูด ลองพูดอีกครั้งครับ",
        "audio-capture": "ไม่พบไมโครโฟน — เช็คอุปกรณ์",
        "network": "ต้องใช้อินเทอร์เน็ต (Web Speech ต้องการ network)",
        "aborted": "ยกเลิกแล้ว",
        "service-not-allowed": "Browser ปิดการใช้งาน — เปิดในการตั้งค่า",
      };
      setError(errorMessages[e.error] || `เกิดข้อผิดพลาด: ${e.error}`);
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [onResult]);

  function start() {
    if (!recognitionRef.current || listening) return;
    setError(null);
    try {
      recognitionRef.current.start();
    } catch (e: any) {
      console.error("[Corry voice] start failed:", e);
      setError("เริ่มฟังไม่ได้: " + (e?.message ?? "unknown"));
      setListening(false);
    }
  }

  function stop() {
    if (!recognitionRef.current || !listening) return;
    try {
      recognitionRef.current.stop();
    } catch {}
    setListening(false);
  }

  return { listening, supported, start, stop, error };
}

export function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  // Strip markdown / emojis for cleaner speech
  const cleaned = text
    .replace(/\*\*/g, "")
    .replace(
      /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]/gu,
      ""
    );

  const utter = new SpeechSynthesisUtterance(cleaned);
  utter.lang = "th-TH";
  utter.rate = 1.05;
  utter.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const thaiVoice =
    voices.find((v) => v.lang === "th-TH") ||
    voices.find((v) => v.lang.startsWith("th"));
  if (thaiVoice) utter.voice = thaiVoice;

  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window === "undefined") return;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function speechSynthSupported() {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}
