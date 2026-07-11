import Link from "next/link";
import { LiveWidgets } from "@/components/LiveWidgets";
import { loadSiteData } from "@/lib/data";

export default async function Home() {
  const data = await loadSiteData();

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-24 text-center">
        <h1 className="hero-display mx-auto max-w-3xl">
          Someone clients trust with both the technology and the relationship.
        </h1>
        <p className="lead mx-auto mt-6 max-w-2xl">
          I&apos;m Sangji Lee — an engineer-turned-consultant in Tokyo. I build
          production systems, lead a 15-person global team, and run live
          AI-powered services on the side. Including this site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-[17px]">
          <Link
            href="/projects"
            className="rounded-full bg-action px-6 py-2.5 text-on-dark hover:bg-action-focus"
          >
            View projects
          </Link>
          <Link href="/agent" className="px-4 py-2.5 text-action">
            How this site maintains itself →
          </Link>
        </div>
      </section>

      <section className="bg-parchment px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="display-lg">Live, not static.</h2>
          <p className="mt-2 max-w-2xl text-[17px] text-ink-80">
            These numbers refresh nightly via a Python pipeline — no manual
            updates.
          </p>
          <LiveWidgets data={data} />
        </div>
      </section>
    </>
  );
}
