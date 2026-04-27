"use client";

import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export function useSpeechRecognition(onResult: (r: SpeechRecognitionResult) => void) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const recognition = new SR();
    recognition.lang = "th-TH";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcript = "";
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      onResult({ transcript, isFinal });
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [onResult]);

  function start() {
    if (!recognitionRef.current || listening) return;
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
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

  return { listening, supported, start, stop };
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
