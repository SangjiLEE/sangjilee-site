import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-20">
      <h1 className="display-lg">{dict.projects.title}</h1>
      <p className="mt-3 max-w-2xl text-[17px] text-ink-80">
        {dict.projects.lead}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[18px] bg-tile-1 p-8 text-on-dark">
          <h2 className="text-[22px] font-semibold">Multifolios</h2>
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
          <h2 className="text-[22px] font-semibold">This Site</h2>
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
  );
}
