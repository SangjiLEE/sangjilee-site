"use client";

import type { SiteData } from "@/lib/data";

const STALE_MS = 48 * 60 * 60 * 1000;

/** Staleness is judged at client render time — the page itself may be stale
    (built daily), so build-time comparison would hide the badge. */
function Freshness({ generatedAt }: { generatedAt?: string }) {
  if (!generatedAt) return null;
  const age = Date.now() - new Date(generatedAt).getTime();
  const stale = age > STALE_MS;
  return (
    <p className="mt-3 text-[12px] text-ink-48">
      updated {new Date(generatedAt).toLocaleDateString("en-US")}
      {stale && (
        <span className="ml-2 rounded-full bg-parchment px-2 py-0.5 text-ink-80">
          stale
        </span>
      )}
    </p>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] bg-canvas p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}

export function LiveWidgets({ data }: { data: SiteData }) {
  const { github, multifolios, certs } = data;
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">GITHUB</h3>
        {github ? (
          <>
            <p className="mt-2 text-[34px] font-semibold leading-none">
              {github.recent_push_count_30d}
            </p>
            <p className="mt-1 text-[14px] text-ink-80">
              pushes in the last 30 days · {github.public_repos} public repos
            </p>
            <p className="mt-2 text-[13px] text-ink-48">
              {github.top_languages.join(" · ")}
            </p>
            <Freshness generatedAt={github.generated_at} />
          </>
        ) : (
          <p className="mt-2 text-[14px] text-ink-48">pipeline pending</p>
        )}
      </Card>

      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">MULTIFOLIOS</h3>
        {multifolios?.available ? (
          <>
            <p className="mt-2 text-[34px] font-semibold leading-none text-action">
              live
            </p>
            <p className="mt-1 text-[14px] text-ink-80">
              {multifolios.uptime_note ?? "portfolio tracking service"}
            </p>
            {multifolios.last_ai_summary_at && (
              <p className="mt-2 text-[13px] text-ink-48">
                last AI summary:{" "}
                {new Date(multifolios.last_ai_summary_at).toLocaleDateString(
                  "en-US",
                )}
              </p>
            )}
            <Freshness generatedAt={multifolios.generated_at} />
          </>
        ) : (
          <>
            <p className="mt-2 text-[14px] text-ink-80">
              multifolios.com — status endpoint coming online
            </p>
            <Freshness generatedAt={multifolios?.generated_at} />
          </>
        )}
      </Card>

      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">
          CERTIFICATIONS
        </h3>
        {certs ? (
          <>
            <p className="mt-2 text-[34px] font-semibold leading-none">
              {certs.certifications.length}
            </p>
            <p className="mt-1 text-[14px] text-ink-80">
              {certs.certifications
                .slice(0, 3)
                .map((c) => c.name)
                .join(" · ")}
            </p>
            <Freshness generatedAt={certs.generated_at} />
          </>
        ) : (
          <p className="mt-2 text-[14px] text-ink-48">pipeline pending</p>
        )}
      </Card>
    </div>
  );
}
