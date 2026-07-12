import { notFound } from "next/navigation";
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

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-20">
        <h1 className="display-lg">{dict.about.title}</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-80">
          {dict.about.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-[14px] font-semibold tracking-wide text-ink-48">
          {dict.about.resultsTitle}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {dict.about.results.map((r) => (
            <div key={r.stat} className="rounded-[18px] bg-parchment p-6">
              <p className="text-[34px] font-semibold text-action">{r.stat}</p>
              <p className="mt-1 text-[15px] text-ink-80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-8">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-80">
          {dict.about.outro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2 text-[13px]">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-full bg-parchment px-3 py-1 text-ink-80"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
