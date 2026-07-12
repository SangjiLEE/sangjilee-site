import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveWidgets } from "@/components/LiveWidgets";
import { loadSiteData } from "@/lib/data";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const data = await loadSiteData();

  return (
    <>
      {/* Hero — who I am, one breath */}
      <section className="mx-auto max-w-5xl px-5 pb-14 pt-20 text-center">
        <h1 className="hero-display mx-auto max-w-3xl">
          {dict.home.heroTitle}
        </h1>
        <p className="lead mx-auto mt-6 max-w-2xl">{dict.home.heroLead}</p>
      </section>

      {/* At-a-glance hub — every tile links to its detail page */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <h2 className="text-[14px] font-semibold tracking-wide text-ink-48">
          {dict.home.glanceTitle.toUpperCase()}
        </h2>

        {/* About tile: the whole story lives here — no separate page */}
        <div className="mt-4 rounded-[18px] bg-parchment p-8">
          <h3 className="text-[22px] font-semibold">{dict.about.title}</h3>
          <div className="mt-3 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-80">
            {dict.about.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {dict.about.results.map((r) => (
              <div key={r.stat}>
                <p className="text-[26px] font-semibold text-action">
                  {r.stat}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-ink-48">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-[13px]">
            {[
              "AWS",
              "Azure",
              "React / Next.js",
              "Java",
              "Python",
              "Kubernetes",
              "GenAI (AI-102)",
              "Japanese (JLPT N1)",
              "English (TOEIC 920)",
              "Korean (native)",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full bg-canvas px-3 py-1 text-ink-80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Projects + agent tiles */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Link
            href={`/${locale}/projects`}
            className="group rounded-[18px] bg-tile-1 p-7 text-on-dark transition-opacity hover:opacity-90"
          >
            <h3 className="text-[18px] font-semibold">Multifolios</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-on-dark-muted">
              {dict.home.mfShort}
            </p>
            <span className="mt-4 inline-block text-[14px] text-action-on-dark">
              {dict.home.more}
            </span>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="group rounded-[18px] bg-tile-1 p-7 text-on-dark transition-opacity hover:opacity-90"
          >
            <h3 className="text-[18px] font-semibold">This Site</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-on-dark-muted">
              {dict.home.siteShort}
            </p>
            <span className="mt-4 inline-block text-[14px] text-action-on-dark">
              {dict.home.more}
            </span>
          </Link>

          <Link
            href={`/${locale}/agent`}
            className="group rounded-[18px] bg-tile-2 p-7 text-on-dark transition-opacity hover:opacity-90"
          >
            <h3 className="text-[18px] font-semibold">{dict.agent.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-on-dark-muted">
              {dict.home.agentShort}
            </p>
            <span className="mt-4 inline-block text-[14px] text-action-on-dark">
              {dict.footer.seeLog}
            </span>
          </Link>
        </div>
      </section>

      {/* Live data strip */}
      <section className="bg-parchment px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="display-lg">{dict.home.liveTitle}</h2>
          <p className="mt-2 max-w-2xl text-[16px] text-ink-80">
            {dict.home.liveDesc}
          </p>
          <LiveWidgets data={data} labels={dict.widgets} />
        </div>
      </section>
    </>
  );
}
