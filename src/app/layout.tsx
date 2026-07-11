import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sangji Lee — Technology & Trust",
  description:
    "Customer-facing engineer in Tokyo. This site is maintained by a scheduled AI agent — every change human-approved.",
};

const NAV = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/agent", label: "Agent Log" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-10 border-b border-hairline bg-canvas/90 backdrop-blur">
          <nav className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-5 text-[14px]">
            <Link href="/" className="font-semibold tracking-tight">
              Sangji Lee
            </Link>
            <div className="flex gap-6 text-ink-80">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-action">
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24 bg-tile-1 px-5 py-12 text-[14px] text-on-dark-muted">
          <div className="mx-auto max-w-5xl space-y-2">
            <p>
              This site is maintained by a scheduled Claude agent. Every change
              ships as a pull request and is merged by a human.{" "}
              <Link href="/agent" className="text-action-on-dark">
                See the agent log →
              </Link>
            </p>
            <p>© {new Date().getFullYear()} Sangji Lee</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
