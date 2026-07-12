import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveWidgets } from "@/components/LiveWidgets";
import { loadSiteData } from "@/lib/data";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SKILLS = [
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
];

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
      {/* 1 — Hero: who I am */}
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-24 text-center">
        <h1 className="hero-display mx-auto max-w-3xl">
          {dict.home.heroTitle}
        </h1>
        <p className="lead mx-auto mt-6 max-w-2xl">{dict.home.heroLead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-[17px]">
          <a
            href="#projects"
            className="rounded-full bg-action px-6 py-2.5 text-on-dark hover:bg-action-focus"
          >
            {dict.home.ctaProjects}
          </a>
          <Link href={`/${locale}/agent`} className="px-4 py-2.5 text-action">
            {dict.home.ctaAgent}
          </Link>
        </div>
      </section>

      {/* 2 — About: story, results, strengths */}
      <section id="about" className="scroll-mt-14 bg-parchment px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="display-lg">{dict.about.title}</h2>
          <div className="mt-6 max-w-3xl space-y-5 text-[17px] leading-relaxed text-ink-80">
            {dict.about.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <h3 className="mt-14 text-[14px] font-semibold tracking-wide text-ink-48">
            {dict.about.resultsTitle}
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.results.map((r) => (
              <div
                key={r.stat}
                className="rounded-[18px] bg-canvas p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <p className="text-[30px] font-semibold text-action">
                  {r.stat}
                </p>
                <p className="mt-1 text-[14px] text-ink-80">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl space-y-5 text-[17px] leading-relaxed text-ink-80">
            {dict.about.outro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-[13px]">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full bg-canvas px-3 py-1 text-ink-80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Projects */}
      <section id="projects" className="scroll-mt-14 mx-auto max-w-5xl px-5 py-20">
        <h2 className="display-lg">{dict.projects.title}</h2>
        <p className="mt-3 max-w-2xl text-[17px] text-ink-80">
          {dict.projects.lead}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[18px] bg-tile-1 p-8 text-on-dark">
            <h3 className="text-[22px] font-semibold">Multifolios</h3>
            <p className="mt-1 text-[14px] text-on-dark-muted">
              {dict.projects.mfMeta}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-on-dark-muted">
              {dict.projects.mfDesc}
            </p>
            <a
              href="https://multifolios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[15px] text-action-on-dark"
            >
              {dict.projects.mfCta}
            </a>
          </div>
          <div className="rounded-[18px] bg-tile-1 p-8 text-on-dark">
            <h3 className="text-[22px] font-semibold">This Site</h3>
            <p className="mt-1 text-[14px] text-on-dark-muted">
              {dict.projects.siteMeta}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-on-dark-muted">
              {dict.projects.siteDesc}
            </p>
            <Link
              href={`/${locale}/agent`}
              className="mt-5 inline-block text-[15px] text-action-on-dark"
            >
              {dict.projects.siteCta}
            </Link>
          </div>
        </div>
      </section>

      {/* 4 — Live data */}
      <section className="bg-parchment px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="display-lg">{dict.home.liveTitle}</h2>
          <p className="mt-2 max-w-2xl text-[17px] text-ink-80">
            {dict.home.liveDesc}
          </p>
          <LiveWidgets data={data} labels={dict.widgets} />
        </div>
      </section>

      {/* 5 — Agent loop CTA band */}
      <section className="mx-auto max-w-5xl px-5 pt-16">
        <div className="rounded-[18px] bg-tile-1 p-10 text-on-dark md:p-14">
          <h2 className="display-lg">{dict.agent.title}</h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-on-dark-muted">
            {dict.agent.p1}
          </p>
          <Link
            href={`/${locale}/agent`}
            className="mt-6 inline-block rounded-full bg-action px-6 py-2.5 text-[16px] text-on-dark hover:bg-action-focus"
          >
            {dict.footer.seeLog}
          </Link>
        </div>
      </section>
    </>
  );
}
