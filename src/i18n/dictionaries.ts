import type { Locale } from "./config";

export interface Dictionary {
  brand: string;
  meta: { title: string; description: string };
  nav: { about: string; projects: string; agent: string };
  footer: { maintained: string; seeLog: string };
  home: {
    heroTitle: string;
    heroLead: string;
    ctaProjects: string;
    ctaAgent: string;
    liveTitle: string;
    liveDesc: string;
    more: string;
    glanceTitle: string;
    mfShort: string;
    siteShort: string;
    agentShort: string;
  };
  widgets: {
    github: string;
    pushes30d: string;
    publicRepos: string;
    multifolios: string;
    live: string;
    mfDesc: string;
    lastSummary: string;
    mfPending: string;
    certs: string;
    pending: string;
    updated: string;
    stale: string;
  };
  about: {
    title: string;
    intro: string[];
    careerTitle: string;
    career: {
      company: string;
      period: string;
      role: string;
      bullets: string[];
    }[];
    resultsTitle: string;
    results: { stat: string; text: string }[];
    outro: string[];
  };
  projects: {
    title: string;
    lead: string;
    mfMeta: string;
    mfDesc: string;
    mfCta: string;
    siteMeta: string;
    siteDesc: string;
    siteCta: string;
  };
  agent: {
    title: string;
    p1: string;
    p2: string;
    initializing: string;
    empty: string;
  };
}

const en: Dictionary = {
  brand: "My Portfolio",
  meta: {
    title: "Sangji Lee — Technology & Trust",
    description:
      "Customer-facing engineer in Tokyo. This site is maintained by a scheduled AI agent — every change human-approved.",
  },
  nav: { about: "About", projects: "Projects", agent: "Agent Log" },
  footer: {
    maintained:
      "This site is maintained by a scheduled Claude agent. Every change ships as a pull request and is merged by a human.",
    seeLog: "See the agent log →",
  },
  home: {
    heroTitle:
      "Someone clients trust with both the technology and the relationship.",
    heroLead:
      "I'm Sangji Lee — an engineer-turned-consultant in Tokyo. I build production systems, lead a 15-person global team, and run live AI-powered services on the side. Including this site.",
    ctaProjects: "View projects",
    ctaAgent: "How this site maintains itself →",
    liveTitle: "Live, not static.",
    liveDesc:
      "These numbers refresh nightly via a Python pipeline — no manual updates.",
    more: "Learn more →",
    glanceTitle: "At a glance",
    mfShort:
      "Real-time multi-portfolio tracker for US/KR/JP stocks and crypto, with AI daily summaries. Built and monetized solo.",
    siteShort:
      "This portfolio maintains itself — a nightly Python pipeline plus a Claude agent that proposes improvements as PRs.",
    agentShort:
      "Every agent PR — merged or rejected, with reasoning — is public. The governance loop is the exhibit.",
  },
  widgets: {
    github: "GITHUB",
    pushes30d: "pushes in the last 30 days",
    publicRepos: "public repos",
    multifolios: "MULTIFOLIOS",
    live: "live",
    mfDesc: "portfolio tracking service",
    lastSummary: "last AI summary:",
    mfPending: "multifolios.com — status endpoint coming online",
    certs: "CERTIFICATIONS",
    pending: "pipeline pending",
    updated: "updated",
    stale: "stale",
  },
  about: {
    title: "About",
    intro: [
      "Most companies hire engineers who can build, and people who can manage the customer relationship. The hard part is finding someone clients trust to do both.",
      "That gap — where deep technical understanding meets the customer relationship — is where projects either earn lasting trust or quietly lose it. I've spent 5+ years being the person on both sides of that gap.",
      "I started in code — a full-stack engineer at Fujitsu, shipping production systems in React, Next.js, Java, and Kubernetes. At Accenture I became the technical contact a major e-commerce client relies on — promoted twice in three years, now leading 15 people across 3 domains in Japanese and English.",
    ],
    careerTitle: "CAREER",
    career: [
      {
        company: "Accenture",
        period: "Oct 2023 – Present",
        role: "Consultant → Associate Manager (promoted twice in 3 years)",
        bullets: [
          "Lead the backend of a major e-commerce client across 3 domains — a 15-person team (9 offshore, 6 in Japan), managed in Japanese and English",
          "Support agentic-AI adoption (incident-response and inquiry agents) as the domain expert — requirements and security advisory, operational data",
          "Present improvement proposals directly to the client at release judgment meetings; advise department-head (課長-level) stakeholders",
        ],
      },
      {
        company: "Fujitsu",
        period: "Apr 2021 – Sep 2023",
        role: "Full-stack Engineer",
        bullets: [
          "Built a large manufacturer's member site and portal in React / Next.js / Nest.js — 17 of 42 screens as sub-leader, on Azure with Kubernetes and microservices",
          "Migrated an internal API auth flow to OAuth 2.0 Client Credentials (Java / Spring)",
          "Researched Gaia-X dataspace connectors in English and presented the recommendation to division executives",
        ],
      },
    ],
    resultsTitle: "WHAT THAT TRUST LOOKS LIKE, IN RESULTS",
    results: [
      {
        stat: "70%",
        text: "cut emergency incidents (31 → 10/month) by fixing root causes, not symptoms",
      },
      {
        stat: "3 months",
        text: "resolved a critical cross-system failure ahead of every estimate",
      },
      { stat: "3×", text: "tripled offshore team output (20% → 60%) in 6 months" },
      {
        stat: "2 languages",
        text: "advise department-head (課長-level) stakeholders directly, in Japanese and English",
      },
    ],
    outro: [
      "What I bring is simple: I don't need a translator between the engineering team and the customer. Understanding both — the system, and the person across the table — is what I've been doing all along.",
      "I'm now focused on bringing that same technical-meets-customer approach to cloud and AI adoption — supporting agentic-AI rollouts at work, and running AI-powered services of my own outside it.",
    ],
  },
  projects: {
    title: "Projects",
    lead: "Built solo, running in production, operated with the same principle: capable automation, hard stop before irreversible action, human sign-off.",
    mfMeta: "multifolios.com · Next.js / Firebase · 2026–",
    mfDesc:
      "Real-time multi-portfolio tracker for US, KR, and JP stocks plus crypto, with AI-generated daily summaries. Designed, built, operated, and monetized by one person — from prompt design to production incident response.",
    mfCta: "Visit multifolios.com →",
    siteMeta: "Next.js / Python / Claude agent · 2026–",
    siteDesc:
      "A portfolio that maintains itself. A nightly Python pipeline refreshes the live data; a scheduled Claude agent proposes improvements as pull requests with written reasoning. Nothing deploys without a human merge — the governance loop is the point.",
    siteCta: "Inspect the agent log →",
  },
  agent: {
    title: "Agent Log",
    p1: "This site is maintained by a scheduled Claude agent. On a fixed cadence it inspects the site against an owner-written checklist (performance, dead links, dependencies, copy consistency), picks one improvement, and opens a pull request explaining its reasoning.",
    p2: "The agent cannot deploy. The main branch is protected — every change below was reviewed and merged (or rejected, with a written reason) by me. The PR bodies are the portfolio.",
    initializing:
      "Agent loop initializing — the first pull request lands with the M1 launch. Check back shortly.",
    empty: "No agent pull requests yet — first scheduled run pending.",
  },
};

const ko: Dictionary = {
  brand: "나의 포트폴리오",
  meta: {
    title: "이상지 — 기술과 신뢰",
    description:
      "도쿄에서 일하는 고객 대면 엔지니어. 이 사이트는 스케줄된 AI 에이전트가 유지보수하며, 모든 변경은 사람이 승인합니다.",
  },
  nav: { about: "소개", projects: "프로젝트", agent: "에이전트 로그" },
  footer: {
    maintained:
      "이 사이트는 스케줄된 Claude 에이전트가 유지보수합니다. 모든 변경은 풀 리퀘스트로 제안되고, 사람이 머지합니다.",
    seeLog: "에이전트 로그 보기 →",
  },
  home: {
    heroTitle: "기술과 고객 관계, 그 양쪽을 믿고 맡길 수 있는 사람.",
    heroLead:
      "도쿄에서 일하는 엔지니어 출신 컨설턴트 이상지입니다. 프로덕션 시스템을 만들고, 15명의 글로벌 팀을 이끌며, 업무 밖에서는 라이브 AI 서비스를 직접 운영합니다. 이 사이트도 그중 하나입니다.",
    ctaProjects: "프로젝트 보기",
    ctaAgent: "이 사이트가 스스로 유지되는 방식 →",
    liveTitle: "정적이 아니라, 살아있는 사이트.",
    liveDesc:
      "아래 숫자들은 Python 파이프라인이 매일 밤 자동 갱신합니다 — 수동 업데이트 없음.",
    more: "자세히 보기 →",
    glanceTitle: "한눈에",
    mfShort:
      "미·한·일 주식과 암호자산을 실시간 추적하는 멀티 포트폴리오 트래커. AI 일일 요약 포함, 혼자 만들어 수익화까지.",
    siteShort:
      "스스로를 유지보수하는 포트폴리오 — 매일 밤 Python 파이프라인이 돌고, Claude 에이전트가 개선을 PR로 제안합니다.",
    agentShort:
      "머지든 거부든, 근거와 함께 모든 에이전트 PR이 공개됩니다. 이 거버넌스 루프가 곧 전시물입니다.",
  },
  widgets: {
    github: "GITHUB",
    pushes30d: "최근 30일 푸시",
    publicRepos: "공개 레포",
    multifolios: "MULTIFOLIOS",
    live: "운영 중",
    mfDesc: "포트폴리오 트래킹 서비스",
    lastSummary: "최근 AI 요약:",
    mfPending: "multifolios.com — 상태 엔드포인트 준비 중",
    certs: "자격증",
    pending: "파이프라인 준비 중",
    updated: "갱신",
    stale: "오래됨",
  },
  about: {
    title: "소개",
    intro: [
      "대부분의 회사에는 만들 줄 아는 엔지니어와, 고객 관계를 관리하는 사람이 따로 있습니다. 어려운 건 그 양쪽을 모두 믿고 맡길 수 있는 사람을 찾는 일입니다.",
      "깊은 기술 이해와 고객 관계가 만나는 그 틈에서, 프로젝트는 오래가는 신뢰를 얻거나 조용히 잃습니다. 저는 5년 넘게 그 틈의 양쪽에 서 있는 사람이었습니다.",
      "시작은 코드였습니다 — Fujitsu에서 React, Next.js, Java, Kubernetes로 프로덕션 시스템을 만든 풀스택 엔지니어. Accenture에서는 대형 이커머스 고객이 의지하는 기술 창구가 되어 3년간 두 번 조기 승진했고, 지금은 3개 영역 15명을 일본어와 영어로 이끌고 있습니다.",
    ],
    careerTitle: "경력",
    career: [
      {
        company: "Accenture",
        period: "2023.10 – 현재",
        role: "컨설턴트 → Associate Manager (3년간 2회 조기 승진)",
        bullets: [
          "대형 이커머스 고객 백엔드 3개 영역 리드 — 15명 팀(해외 9·일본 6)을 일본어·영어로 통괄",
          "에이전트 AI 도입 지원 (장애대응·문의대응 Agent) — 도메인 전문가로서 요건·보안 자문, 운영 데이터 제공",
          "릴리스 판정회에서 고객 대상 개선 제안 발표, 課長급 의사결정자 직접 자문",
        ],
      },
      {
        company: "Fujitsu",
        period: "2021.04 – 2023.09",
        role: "풀스택 엔지니어",
        bullets: [
          "대형 제조사 회원사이트·포털을 React / Next.js / Nest.js로 개발 — 42화면 중 17화면 서브리더 담당, Azure·Kubernetes·마이크로서비스",
          "사내 API 인증을 OAuth 2.0 Client Credentials로 개조 (Java / Spring)",
          "Gaia-X 데이터스페이스 커넥터 영어 기술조사 — 본부장급 대상 방향성 발표",
        ],
      },
    ],
    resultsTitle: "신뢰의 결과, 숫자로",
    results: [
      {
        stat: "70%",
        text: "긴급 인시던트 삭감 (월 31건 → 10건) — 증상이 아닌 근본 원인 해결",
      },
      { stat: "3개월", text: "크리티컬 시스템 간 장애를 모든 견적보다 앞서 해결" },
      { stat: "3배", text: "6개월 만에 오프쇼어 팀 성과 3배 (20% → 60%)" },
      {
        stat: "2개 언어",
        text: "課長급 의사결정자에게 일본어·영어로 직접 자문",
      },
    ],
    outro: [
      "제가 가진 강점은 단순합니다: 엔지니어링 팀과 고객 사이에 통역이 필요 없다는 것. 시스템과, 테이블 건너편의 사람 — 그 둘을 함께 이해하는 일을 계속 해왔습니다.",
      "지금은 이 접근을 클라우드와 AI 도입으로 확장하고 있습니다 — 회사에서는 에이전트 AI 도입을 지원하고, 밖에서는 제 AI 서비스를 직접 운영하면서.",
    ],
  },
  projects: {
    title: "프로젝트",
    lead: "혼자 만들고, 프로덕션에서 운영 중이며, 같은 원칙으로 움직입니다: 유능한 자동화, 되돌릴 수 없는 행동 앞의 정지선, 사람의 승인.",
    mfMeta: "multifolios.com · Next.js / Firebase · 2026–",
    mfDesc:
      "미국·한국·일본 주식과 암호자산을 실시간 추적하는 멀티 포트폴리오 트래커. AI 일일 요약 기능 포함. 프롬프트 설계부터 장애 대응까지 설계·구축·운영·수익화 전부 혼자 담당.",
    mfCta: "multifolios.com 방문 →",
    siteMeta: "Next.js / Python / Claude 에이전트 · 2026–",
    siteDesc:
      "스스로를 유지보수하는 포트폴리오. Python 파이프라인이 매일 밤 데이터를 갱신하고, 스케줄된 Claude 에이전트가 근거를 적은 풀 리퀘스트로 개선을 제안합니다. 사람이 머지하기 전에는 아무것도 배포되지 않습니다 — 이 거버넌스 루프가 핵심입니다.",
    siteCta: "에이전트 로그 보기 →",
  },
  agent: {
    title: "에이전트 로그",
    p1: "이 사이트는 스케줄된 Claude 에이전트가 유지보수합니다. 정해진 주기로 소유자가 작성한 체크리스트(성능, 죽은 링크, 의존성, 카피 일관성)에 따라 사이트를 점검하고, 개선 하나를 골라 근거를 설명하는 풀 리퀘스트를 엽니다.",
    p2: "에이전트는 배포할 수 없습니다. main 브랜치는 보호되어 있고, 아래 모든 변경은 제가 검토해 머지했거나 사유를 적어 거부한 것입니다. PR 본문이 곧 포트폴리오입니다.",
    initializing:
      "에이전트 루프 초기화 중 — 첫 풀 리퀘스트는 M1 런칭과 함께 올라옵니다.",
    empty: "아직 에이전트 풀 리퀘스트가 없습니다 — 첫 스케줄 실행 대기 중.",
  },
};

const ja: Dictionary = {
  brand: "私のポートフォリオ",
  meta: {
    title: "李相知（Sangji Lee）— 技術と信頼",
    description:
      "東京を拠点とする顧客対応エンジニア。本サイトはスケジュールされたAIエージェントが保守し、すべての変更は人間が承認します。",
  },
  nav: { about: "自己紹介", projects: "プロジェクト", agent: "エージェントログ" },
  footer: {
    maintained:
      "本サイトはスケジュールされたClaudeエージェントが保守しています。すべての変更はプルリクエストとして提案され、人間がマージします。",
    seeLog: "エージェントログを見る →",
  },
  home: {
    heroTitle: "技術と顧客関係、その両方を任せられる人。",
    heroLead:
      "東京で働くエンジニア出身のコンサルタント、李相知（Sangji Lee）です。プロダクションシステムを構築し、15名のグローバルチームを率い、業務外ではAIサービスを個人で開発・運用しています。このサイトもその一つです。",
    ctaProjects: "プロジェクトを見る",
    ctaAgent: "このサイトが自らを保守する仕組み →",
    liveTitle: "静的ではなく、生きているサイト。",
    liveDesc:
      "以下の数値はPythonパイプラインが毎晩自動更新します — 手動更新はありません。",
    more: "詳しく見る →",
    glanceTitle: "ひと目でわかる",
    mfShort:
      "米・韓・日株式と暗号資産をリアルタイムで追跡するマルチポートフォリオトラッカー。AI日次サマリー付き、一人で構築し収益化まで。",
    siteShort:
      "自らを保守するポートフォリオ — 毎晩Pythonパイプラインが走り、Claudeエージェントが改善をPRとして提案します。",
    agentShort:
      "マージも却下も、根拠とともにすべてのエージェントPRが公開されます。このガバナンスループこそが展示物です。",
  },
  widgets: {
    github: "GITHUB",
    pushes30d: "直近30日間のプッシュ",
    publicRepos: "公開リポジトリ",
    multifolios: "MULTIFOLIOS",
    live: "稼働中",
    mfDesc: "ポートフォリオ管理サービス",
    lastSummary: "直近のAIサマリー:",
    mfPending: "multifolios.com — ステータスエンドポイント準備中",
    certs: "資格",
    pending: "パイプライン準備中",
    updated: "更新",
    stale: "更新停滞",
  },
  about: {
    title: "自己紹介",
    intro: [
      "多くの企業には、開発ができるエンジニアと、顧客関係を管理する人が別々にいます。難しいのは、その両方を安心して任せられる人を見つけることです。",
      "深い技術理解と顧客関係が交わるその境界で、プロジェクトは長く続く信頼を得るか、静かに失うかが決まります。私は5年以上、その境界の両側に立ち続けてきました。",
      "出発点はコードでした — 富士通でReact・Next.js・Java・Kubernetesを用いたプロダクションシステムを開発したフルスタックエンジニア。アクセンチュアでは大手EC顧客が頼る技術窓口となり、3年間で2回の早期昇進。現在は3領域15名（海外9名・日本6名）のチームを日本語と英語で統括しています。",
    ],
    careerTitle: "職務経歴",
    career: [
      {
        company: "アクセンチュア株式会社",
        period: "2023年10月 – 現在",
        role: "コンサルタント → Associate Manager（3年間で2回の早期昇進）",
        bullets: [
          "大手EC顧客のバックエンド3領域をリード — 15名チーム（海外9名・日本6名）を日本語と英語で統括",
          "エージェントAI導入支援（障害対応・問い合わせ対応Agent）— ドメインエキスパートとして要件・セキュリティ観点の助言、運用データの提供",
          "リリース判定会にてお客様へ改善提案をプレゼンテーション、課長クラスの意思決定者へ直接助言",
        ],
      },
      {
        company: "富士通株式会社",
        period: "2021年4月 – 2023年9月",
        role: "フルスタックエンジニア",
        bullets: [
          "大手メーカーの会員サイト・ポータルをReact / Next.js / Nest.jsで開発 — 42画面中17画面をサブリーダーとして担当、Azure・Kubernetes・マイクロサービス",
          "社内APIの認証をOAuth 2.0 Client Credentials Flowへ改修（Java / Spring）",
          "Gaia-Xデータスペースコネクターの英語技術調査 — 本部長クラス向けに方針を発表",
        ],
      },
    ],
    resultsTitle: "信頼の結果を、数字で",
    results: [
      {
        stat: "70%",
        text: "緊急インシデントを削減（月31件 → 10件）— 対症療法ではなく根本原因を解決",
      },
      {
        stat: "3ヶ月",
        text: "他システム起因のクリティカル障害を、あらゆる見積もりより早期に解決",
      },
      { stat: "3倍", text: "6ヶ月で海外チームの活用率を3倍に（20% → 60%）" },
      {
        stat: "2言語",
        text: "課長クラスの意思決定者へ日本語・英語で直接助言",
      },
    ],
    outro: [
      "私の強みはシンプルです。エンジニアリングチームと顧客の間に通訳が要らないこと。システムと、テーブルの向こう側にいる人 — その両方を理解することを、ずっと続けてきました。",
      "現在はこのアプローチをクラウドとAI導入に広げています — 業務ではエージェントAI導入を支援し、業務外では自身のAIサービスを運用しながら。",
    ],
  },
  projects: {
    title: "プロジェクト",
    lead: "一人で構築し、本番で運用中。共通の原則で動いています: 有能な自動化、不可逆な操作の前の停止線、人間の承認。",
    mfMeta: "multifolios.com · Next.js / Firebase · 2026–",
    mfDesc:
      "米・韓・日株式と暗号資産をリアルタイムで追跡するマルチポートフォリオトラッカー。AIによる日次サマリー機能付き。プロンプト設計から本番障害対応まで、設計・構築・運用・収益化を一人で担当。",
    mfCta: "multifolios.com へ →",
    siteMeta: "Next.js / Python / Claude エージェント · 2026–",
    siteDesc:
      "自らを保守するポートフォリオ。Pythonパイプラインが毎晩データを更新し、スケジュールされたClaudeエージェントが根拠を記したプルリクエストとして改善を提案します。人間がマージするまで何もデプロイされません — このガバナンスループこそが核心です。",
    siteCta: "エージェントログを見る →",
  },
  agent: {
    title: "エージェントログ",
    p1: "本サイトはスケジュールされたClaudeエージェントが保守しています。所定の周期で、オーナーが作成したチェックリスト（パフォーマンス、リンク切れ、依存関係、コピーの一貫性）に基づきサイトを点検し、改善を一つ選んで、根拠を説明するプルリクエストを開きます。",
    p2: "エージェントはデプロイできません。mainブランチは保護されており、以下のすべての変更は私がレビューしてマージしたか、理由を記して却下したものです。PR本文こそがポートフォリオです。",
    initializing:
      "エージェントループ初期化中 — 最初のプルリクエストはM1ローンチとともに届きます。",
    empty: "エージェントのプルリクエストはまだありません — 初回スケジュール実行待ち。",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, ko, ja };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
