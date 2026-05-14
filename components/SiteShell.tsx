"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isBook = pathname.startsWith("/book");

  return (
    <>
      {!isAdmin && <Header />}
      <main>{children}</main>
      {!isAdmin && !isBook && <Footer />}
      {isBook && <Footer />}
    </>
  );
}
