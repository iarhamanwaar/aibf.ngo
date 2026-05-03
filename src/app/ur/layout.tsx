"use client";

import { LocaleProvider } from "@/lib/i18n";
import { type ReactNode } from "react";

export default function UrLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider initialLocale="ur">
      <div
        dir="rtl"
        lang="ur"
        className="min-h-full flex flex-col font-[family-name:var(--font-urdu)]"
      >
        {children}
      </div>
    </LocaleProvider>
  );
}
