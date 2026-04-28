"use client";

import { usePathname } from "next/navigation";
import { KnowledgeNavbar } from "./KnowledgeNavbar";
import { LearnNavbar } from "./LearnNavbar";

export function Navbar() {
  const pathname = usePathname();

  if (!pathname) return null;
  // No top navbar on:
  //  - portal landing
  //  - login pages of either system
  //  - inmate/kiosk routes (uses InmateShell)
  if (pathname === "/") return null;
  if (pathname === "/knowledge/login") return null;
  if (pathname === "/learn/login") return null;
  if (pathname.startsWith("/inmate")) return null;
  // /learn/* uses its own AdminShell layout
  if (pathname.startsWith("/learn")) return null;

  return <KnowledgeNavbar />;
}
