"use client";

import { usePathname } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";

export default function LearnLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Login renders standalone without the admin shell
  if (pathname === "/learn/login") return <>{children}</>;
  return <AdminShell>{children}</AdminShell>;
}
