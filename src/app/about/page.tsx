import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Sangji Lee",
};

const RESULTS = [
  {
    stat: "70%",
    text: "cut emergency incidents (31 → 10/month) by fixing root causes, not symptoms",
  },
  {
    stat: "3 months",
    text: "resolved a critical cross-system failure ahead of every estimate",
  },
  {
    stat: "3×",
    text: "tripled offshore team output (20% → 60%) in 6 months",
  },
  {
    stat: "2 languages",
    text: "advise department-head (課長-level) stakeholders directly, in Japanese and English",
  },
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-5 pt-20">
        <h1 className="display-lg">About</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-80">
          <p>
            Most companies hire engineers who can build, and people who can
            manage the customer relationship. The hard part is finding someone
            clients trust to do both.
          </p>
          <p>
            That gap — where deep technical understanding meets the customer
            relationship — is where projects either earn lasting trust or
            quietly lose it. I&apos;ve spent 5+ years being the person on both
            sides of that gap.
          </p>
          <p>
            I started in code — a full-stack engineer at Fujitsu, shipping
            production systems in React, Next.js, Java, and Kubernetes. At
            Accenture I became the technical contact a major e-commerce client
            relies on — promoted twice in three years, now leading 15 people
            across 3 domains in Japanese and English.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-[14px] font-semibold tracking-wide text-ink-48">
          WHAT THAT TRUST LOOKS LIKE, IN RESULTS
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {RESULTS.map((r) => (
            <div
              key={r.stat}
              className="rounded-[18px] bg-parchment p-6"
            >
              <p className="text-[34px] font-semibold text-action">{r.stat}</p>
              <p className="mt-1 text-[15px] text-ink-80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-8">
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-80">
          <p>
            What I bring is simple: I don&apos;t need a translator between the
            engineering team and the customer. Understanding both — the system,
            and the person across the table — is what I&apos;ve been doing all
            along.
          </p>
          <p>
            I&apos;m now focused on bringing that same technical-meets-customer
            approach to cloud and AI adoption — supporting agentic-AI rollouts
            at work, and running AI-powered services of my own outside it.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-2 text-[13px]">
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
