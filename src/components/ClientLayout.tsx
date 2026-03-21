"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import { type ReactNode } from "react";

function LayoutInner({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  return (
    <div
      dir={locale === "ur" ? "rtl" : "ltr"}
      lang={locale}
      className={`min-h-full flex flex-col font-[family-name:var(--font-outfit)] ${
        locale === "ur" ? "font-[family-name:var(--font-urdu)]" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <LayoutInner>{children}</LayoutInner>
    </LocaleProvider>
  );
}
