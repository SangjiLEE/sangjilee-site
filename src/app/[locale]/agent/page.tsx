import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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
      `https://api.github.com/repos/${REPO}/pulls?state=all&per_page=20`,
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

export default async function AgentLog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const prs = await fetchAgentPRs();

  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-20">
        <h1 className="display-lg">{dict.agent.title}</h1>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-80">
          <p>{dict.agent.p1}</p>
          <p>{dict.agent.p2}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        {prs === null ? (
          <div className="rounded-[18px] bg-parchment p-8 text-center text-[15px] text-ink-80">
            {dict.agent.initializing}
          </div>
        ) : prs.length === 0 ? (
          <div className="rounded-[18px] bg-parchment p-8 text-center text-[15px] text-ink-80">
            {dict.agent.empty}
          </div>
        ) : (
          <ul className="space-y-4">
            {prs.map((pr) => (
              <li
                key={pr.number}
                className="rounded-[18px] bg-pearl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
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
                  {new Date(pr.created_at).toLocaleDateString(locale)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
