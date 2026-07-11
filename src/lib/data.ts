import { promises as fs } from "fs";
import path from "path";

export interface GitHubData {
  generated_at: string;
  username: string;
  public_repos: number;
  followers: number;
  recent_push_count_30d: number;
  top_languages: string[];
}

export interface MultifoliosData {
  generated_at: string;
  available: boolean;
  uptime_note?: string;
  last_ai_summary_at?: string;
  markets?: string[];
}

export interface CertsData {
  generated_at: string;
  certifications: { name: string; issued: string }[];
}

export interface SiteData {
  github: GitHubData | null;
  multifolios: MultifoliosData | null;
  certs: CertsData | null;
}

const DATA_BRANCH_RAW = process.env.DATA_BRANCH_RAW_URL; // e.g. https://raw.githubusercontent.com/<owner>/<repo>/data

async function readOne<T>(name: string): Promise<T | null> {
  // Prefer the data branch (bot-committed, kept out of protected main);
  // fall back to local files for dev and first deploy.
  if (DATA_BRANCH_RAW) {
    try {
      const res = await fetch(`${DATA_BRANCH_RAW}/data/${name}.json`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // fall through to local
    }
  }
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", `${name}.json`),
      "utf-8",
    );
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function loadSiteData(): Promise<SiteData> {
  const [github, multifolios, certs] = await Promise.all([
    readOne<GitHubData>("github"),
    readOne<MultifoliosData>("multifolios"),
    readOne<CertsData>("certs"),
  ]);
  return { github, multifolios, certs };
}
