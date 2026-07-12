"use client";

import type { SiteData } from "@/lib/data";
import type { Dictionary } from "@/i18n/dictionaries";

type WidgetLabels = Dictionary["widgets"];

const STALE_MS = 48 * 60 * 60 * 1000;

/** Staleness is judged at client render time — the page itself may be stale
    (built daily), so build-time comparison would hide the badge. */
function Freshness({
  generatedAt,
  labels,
}: {
  generatedAt?: string;
  labels: WidgetLabels;
}) {
  if (!generatedAt) return null;
  const age = Date.now() - new Date(generatedAt).getTime();
  const stale = age > STALE_MS;
  return (
    <p className="mt-3 text-[12px] text-ink-48">
      {labels.updated} {new Date(generatedAt).toLocaleDateString()}
      {stale && (
        <span className="ml-2 rounded-full bg-parchment px-2 py-0.5 text-ink-80">
          {labels.stale}
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

export function LiveWidgets({
  data,
  labels,
}: {
  data: SiteData;
  labels: WidgetLabels;
}) {
  const { github, multifolios, certs } = data;
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">
          {labels.github}
        </h3>
        {github ? (
          <>
            <p className="mt-2 text-[34px] font-semibold leading-none">
              {github.recent_push_count_30d}
            </p>
            <p className="mt-1 text-[14px] text-ink-80">
              {labels.pushes30d} · {github.public_repos} {labels.publicRepos}
            </p>
            <p className="mt-2 text-[13px] text-ink-48">
              {github.top_languages.join(" · ")}
            </p>
            <Freshness generatedAt={github.generated_at} labels={labels} />
          </>
        ) : (
          <p className="mt-2 text-[14px] text-ink-48">{labels.pending}</p>
        )}
      </Card>

      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">
          {labels.multifolios}
        </h3>
        {multifolios?.available ? (
          <>
            <p className="mt-2 text-[34px] font-semibold leading-none text-action">
              {labels.live}
            </p>
            <p className="mt-1 text-[14px] text-ink-80">
              {multifolios.uptime_note ?? labels.mfDesc}
            </p>
            {multifolios.last_ai_summary_at && (
              <p className="mt-2 text-[13px] text-ink-48">
                {labels.lastSummary}{" "}
                {new Date(multifolios.last_ai_summary_at).toLocaleDateString()}
              </p>
            )}
            <Freshness generatedAt={multifolios.generated_at} labels={labels} />
          </>
        ) : (
          <>
            <p className="mt-2 text-[14px] text-ink-80">{labels.mfPending}</p>
            <Freshness
              generatedAt={multifolios?.generated_at}
              labels={labels}
            />
          </>
        )}
      </Card>

      <Card>
        <h3 className="text-[14px] font-semibold text-ink-48">
          {labels.certs}
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
            <Freshness generatedAt={certs.generated_at} labels={labels} />
          </>
        ) : (
          <p className="mt-2 text-[14px] text-ink-48">{labels.pending}</p>
        )}
      </Card>
    </div>
  );
}
