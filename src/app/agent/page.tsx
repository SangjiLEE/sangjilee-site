import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Log — Sangji Lee",
};

interface AgentPR {
  number: number;
  title: string;
  state: "open" | "merged" | "rejected";
  created_at: string;
  html_url: string;
  body_excerpt: string;
}

const REPO = process.env.SITE_REPO; // e.g. "SangjiLEE/sangjilee-site"

async function fetchAgentPRs(): Promise<AgentPR[] | null> {
  if (!REPO) return null;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/pulls?state=all&head=&per_page=20`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const prs = (await res.json()) as Array<{
      number: number;
      title: string;
      merged_at: string | null;
      state: string;
      created_at: string;
      html_url: string;
      body: string | null;
      head: { ref: string };
    }>;
    return prs
      .filter((p) => p.head.ref.startsWith("agent/"))
      .map((p) => ({
        number: p.number,
        title: p.title,
        state: p.merged_at
          ? ("merged" as const)
          : p.state === "closed"
            ? ("rejected" as const)
            : ("open" as const),
        created_at: p.created_at,
        html_url: p.html_url,
        body_excerpt: (p.body ?? "").slice(0, 280),
      }));
  } catch {
    return null;
  }
}

const BADGE: Record<AgentPR["state"], string> = {
  merged: "bg-action text-on-dark",
  open: "bg-parchment text-ink-80",
  rejected: "bg-tile-2 text-on-dark-muted",
};

export default async function AgentLog() {
  const prs = await fetchAgentPRs();

  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-20">
        <h1 className="display-lg">Agent Log</h1>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-80">
          <p>
            This site is maintained by a scheduled Claude agent. On a fixed
            cadence it inspects the site against an owner-written checklist
            (performance, dead links, dependencies, copy consistency), picks{" "}
            <em>one</em> improvement, and opens a pull request explaining its
            reasoning.
          </p>
          <p>
            The agent cannot deploy. The main branch is protected — every
            change below was reviewed and merged (or rejected, with a written
            reason) by me. The PR bodies are the portfolio.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        {prs === null ? (
          <div className="rounded-[18px] bg-parchment p-8 text-center text-[15px] text-ink-80">
            Agent loop initializing — the first pull request lands with the M1
            launch. Check back shortly.
          </div>
        ) : prs.length === 0 ? (
          <div className="rounded-[18px] bg-parchment p-8 text-center text-[15px] text-ink-80">
            No agent pull requests yet — first scheduled run pending.
          </div>
        ) : (
          <ul className="space-y-4">
            {prs.map((pr) => (
              <li key={pr.number} className="rounded-[18px] bg-pearl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${BADGE[pr.state]}`}
                  >
                    {pr.state}
                  </span>
                  <a
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] font-semibold hover:text-action"
                  >
                    #{pr.number} {pr.title}
                  </a>
                </div>
                {pr.body_excerpt && (
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-80">
                    {pr.body_excerpt}
                  </p>
                )}
                <p className="mt-2 text-[12px] text-ink-48">
                  {new Date(pr.created_at).toLocaleDateString("en-US")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
