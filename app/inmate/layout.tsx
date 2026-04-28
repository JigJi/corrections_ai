"use client";

import { usePathname } from "next/navigation";
import { InmateShell } from "@/components/InmateShell";

export default function InmateLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Login page renders standalone without the kiosk shell
  if (pathname === "/inmate/login") return <>{children}</>;
  return <InmateShell>{children}</InmateShell>;
}
