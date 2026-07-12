import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const nav = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/agent`, label: dict.nav.agent },
  ];

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/90 backdrop-blur">
          <nav className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-5 text-[14px]">
            <Link href={`/${locale}`} className="font-semibold tracking-tight">
              Sangji Lee
            </Link>
            <div className="flex items-center gap-6 text-ink-80">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-action">
                  {n.label}
                </Link>
              ))}
              <LanguageSwitcher current={locale as Locale} />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24 bg-tile-1 px-5 py-12 text-[14px] text-on-dark-muted">
          <div className="mx-auto max-w-5xl space-y-2">
            <p>
              {dict.footer.maintained}{" "}
              <Link href={`/${locale}/agent`} className="text-action-on-dark">
                {dict.footer.seeLog}
              </Link>
            </p>
            <p>© {new Date().getFullYear()} Sangji Lee</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
