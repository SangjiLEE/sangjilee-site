"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/i18n/config";

const LABELS: Record<Locale, string> = { en: "EN", ko: "한국어", ja: "日本語" };

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    // Remember the explicit choice — middleware prefers this cookie
    // over the device language from then on.
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${locale}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div className="flex items-center gap-1 text-[12px]">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`rounded-full px-2.5 py-1 ${
            l === current
              ? "bg-parchment font-semibold text-ink"
              : "text-ink-48 hover:text-action"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
