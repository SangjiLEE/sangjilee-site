import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Sangji Lee",
};

export default function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20">
      <h1 className="display-lg">Projects</h1>
      <p className="mt-3 max-w-2xl text-[17px] text-ink-80">
        Built solo, running in production, operated with the same principle:
        capable automation, hard stop before irreversible action, human
        sign-off.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[18px] bg-tile-1 p-8 text-on-dark">
          <h2 className="text-[22px] font-semibold">Multifolios</h2>
          <p className="mt-1 text-[14px] text-on-dark-muted">
            multifolios.com · Next.js / Firebase · 2026–
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-on-dark-muted">
            Real-time multi-portfolio tracker for US, KR, and JP stocks plus
            crypto, with AI-generated daily summaries. Designed, built,
            operated, and monetized by one person — from prompt design to
            production incident response.
          </p>
          <a
            href="https://multifolios.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-[15px] text-action-on-dark"
          >
            Visit multifolios.com →
          </a>
        </div>

        <div className="rounded-[18px] bg-tile-1 p-8 text-on-dark">
          <h2 className="text-[22px] font-semibold">This Site</h2>
          <p className="mt-1 text-[14px] text-on-dark-muted">
            Next.js / Python / Claude agent · 2026–
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-on-dark-muted">
            A portfolio that maintains itself. A nightly Python pipeline
            refreshes the live data; a scheduled Claude agent proposes
            improvements as pull requests with written reasoning. Nothing
            deploys without a human merge — the governance loop is the point.
          </p>
          <Link
            href="/agent"
            className="mt-5 inline-block text-[15px] text-action-on-dark"
          >
            Inspect the agent log →
          </Link>
        </div>
      </div>
    </section>
  );
}
