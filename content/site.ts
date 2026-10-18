// All site content lives here. Edit this file to update the portfolio.

export const site = {
  name: "Harshit Srivastava",
  initials: "HS",
  role: "Software Development Engineer",
  headline: "Software engineer building",
  headlineMuted: "backend systems and real-time AI products.",
  intro:
    "I'm an SDE at Rimo in Tokyo, working across Go backends, Next.js frontends and in-browser ML. Before that I built voice-AI and video-analysis infrastructure at Connexlab.",
  location: "Tokyo, Japan",
  timezone: "JST (UTC+9)",
  status: "SDE at Rimo · Tokyo",
  email: "harshitsrv2004@gmail.com",
  github: "https://github.com/hrxsrv",
  linkedin: "https://www.linkedin.com/in/harshitsrv/",
  url: "https://harshit.vithos.in", // your deployed domain, used for metadata
};

// Résumés are LaTeX files in this GitHub repo. Its "Build resumes" workflow compiles them to PDFs on the
// pdf branch, and the manifest names the active one, which is served at /resume.pdf (see lib/resumes.ts).
export const resumeSource = {
  owner: "HrxSrv",
  repo: "My-Docs",
  branch: "main",
  dir: "resumes", // one <id>.tex per résumé
  manifest: "resumes.json", // { "active": "<id>" }
  pdfBranch: "pdfs", // <id>.pdf per résumé
};

export const bio = [
  "I'm a software engineer at Rimo in Tokyo. I like the parts of a product that have to be fast and dependable: APIs, queues, workers, and the pipelines that move data between them.",
  "During my internship at Rimo I built a real-time suggestion pipeline that runs a BERT model in the browser with ONNX Runtime Web, notification infrastructure on Redis-backed queues, and search that moved from the client to Elasticsearch. Before that, at Connexlab, I worked on a voice-based AI interviewer and a distributed video-analysis system on AWS.",
  "I studied Computer Science at IIITDM Jabalpur, and I still enjoy competitive programming.",
];

export type Category = "backend" | "fullstack" | "oss";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: Category;
  categoryLabel: string;
  stack: string[];
  links: { label: string; href: string }[];
  // Optional image cover (file in /public). "art" fills the frame as-is; "logo" sits beside the project name.
  // Without one, the cover is drawn from the case study's architecture steps.
  cover?: { kind: "art" | "logo"; src: string; alt: string; background: string; ink?: string };
  highlights: string[];
  caseStudy?: {
    problem: string;
    approach: string[];
    architecture: { step: string; detail: string }[];
    learned?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "gocomp",
    name: "goComp",
    tagline: "Distributed code judge engine",
    summary:
      "A distributed online judge in Go that runs untrusted submissions in isolated Docker containers across concurrent worker pools.",
    category: "oss",
    categoryLabel: "Open source",
    stack: ["Go", "Docker", "Redis", "REST APIs", "Worker pools"],
    links: [{ label: "Source on GitHub", href: "https://github.com/HrxSrv/goComp" }],
    cover: {
      kind: "art",
      src: "/projects/gocomp.jpg",
      alt: "goComp logo: the Go gopher at a laptop above AC, WA, TLE and RE verdicts",
      background: "#020307",
    },
    highlights: [
      "Isolated, containerized execution environments for secure multi-language evaluation.",
      "Concurrent worker pipelines and execution queues with timeout and resource-limit enforcement.",
      "Sandboxed runtime orchestration with Docker process isolation, stdout/stderr capture and deterministic test execution.",
    ],
    caseStudy: {
      problem:
        "An online judge has to run code it can't trust, in several languages, quickly and fairly. Every submission needs the same limits, the same inputs and a deterministic verdict, and one bad program must never affect another or the host.",
      approach: [
        "Submissions enter a Redis-backed queue through a REST API, so accepting work is decoupled from running it.",
        "A pool of Go workers pulls jobs concurrently. Each job runs in its own Docker container with CPU, memory and wall-clock limits.",
        "The runner captures stdout and stderr, compares output against test cases one by one, and reports a verdict such as accepted, wrong answer, time limit or runtime error.",
      ],
      architecture: [
        { step: "API", detail: "REST endpoint validates and enqueues submissions" },
        { step: "Queue", detail: "Redis holds pending jobs and results" },
        { step: "Workers", detail: "Concurrent Go worker pool pulls jobs" },
        { step: "Sandbox", detail: "Per-run Docker container with resource limits" },
        { step: "Verdict", detail: "Output diffed per test case, result stored" },
      ],
    },
  },
  {
    slug: "vithos",
    name: "Vithos",
    tagline: "AI health data platform",
    summary:
      "A multi-tenant platform that turns PDF lab reports into a queryable health dataset, with RAG chat over a person's medical history.",
    category: "fullstack",
    categoryLabel: "Full stack",
    stack: ["Next.js", "Express.js", "Supabase", "pgvector", "Redis", "BullMQ"],
    links: [
      { label: "Visit vithos.in", href: "https://www.vithos.in/" },
      { label: "How it's hosted", href: "/projects/nas-deploy" },
      { label: "GitHub", href: "https://github.com/hrxsrv" },
    ],
    cover: {
      kind: "logo",
      src: "/projects/vithos-logo.png",
      alt: "Vithos logo",
      background: "#f7f0e6",
      ink: "#005c2f",
    },
    highlights: [
      "RAG-based chat using pgvector for semantic retrieval over medical history.",
      "Async ingestion pipeline (BullMQ + Redis) with scalable workers for parsing and embeddings.",
      "Biomarker tracking and trend analytics with dashboards and health nudges.",
      "Secure storage and sharing via Supabase row-level security for tenant isolation.",
      "Backend self-hosted on a spare Android phone with push-to-deploy (see nas-deploy).",
    ],
    caseStudy: {
      problem:
        "Lab results usually live in scattered PDFs, which makes it hard to see how a biomarker changes over time or to ask questions about your own history.",
      approach: [
        "Uploaded PDFs go onto a BullMQ queue; workers parse the reports, extract biomarkers and generate embeddings.",
        "Structured results are stored in Supabase Postgres, with row-level security isolating each tenant's data at the database level.",
        "A chat interface retrieves relevant history with pgvector and answers grounded in the user's own records, alongside trend dashboards and nudges.",
      ],
      architecture: [
        { step: "Upload", detail: "PDF lab reports from the Next.js app" },
        { step: "Queue", detail: "BullMQ on Redis schedules ingestion jobs" },
        { step: "Workers", detail: "Parse reports, extract biomarkers, embed text" },
        { step: "Store", detail: "Supabase Postgres + pgvector, RLS per tenant" },
        { step: "Use", detail: "RAG chat, trends and health nudges" },
      ],
    },
  },
  {
    slug: "nas-deploy",
    name: "nas-deploy",
    tagline: "A spare phone as a backend host",
    summary:
      "Runs the Vithos API on a spare 2018 Android phone, with public HTTPS through Cloudflare Tunnel and a deploy on every push to main.",
    category: "backend",
    categoryLabel: "Backend",
    stack: ["Node.js", "Cloudflare Tunnel", "GitHub Actions", "Termux", "Tailscale", "tmux", "Shell"],
    links: [{ label: "Source on GitHub", href: "https://github.com/vithosapp/nas-deploy" }],
    cover: {
      kind: "art",
      src: "/projects/nas-deploy.jpg",
      alt: "The phone running Termux, with tmux sessions for the tunnel, the Vithos API and the deploy webhook",
      background: "#010101",
    },
    highlights: [
      "Public HTTPS through an outbound Cloudflare Tunnel, so it works behind CGNAT with no ports opened on the router.",
      "Push-to-deploy: GitHub Actions calls an authenticated webhook that pulls, installs, builds and restarts the API, and gets the real exit status and output back.",
      "Builds before restarting, so a failed install or build leaves the running version untouched.",
      "Survives reboots: Termux:Boot takes a wake lock and recreates the tmux sessions for the API, tunnel and webhook.",
      "Authenticated /stats endpoint reports battery, storage, memory and load from the phone; SSH is reachable only over Tailscale.",
    ],
    caseStudy: {
      problem:
        "Vithos needed an always-on backend, but a VPS is a monthly bill for a side project. A spare Android phone draws little power and has a built-in battery as backup, but it sits behind a home router, often on CGNAT, and Android keeps trying to stop background apps.",
      approach: [
        "The API runs in Termux on the phone. Cloudflare Tunnel keeps an outbound connection to Cloudflare's edge and forwards a public hostname to localhost, so no inbound ports are needed.",
        "Every push to main triggers GitHub Actions, which POSTs to a small Node.js webhook guarded by a shared secret compared in constant time. The webhook runs the deploy script and returns its exit status and output, so a failed deploy fails the CI job.",
        "The deploy script stops on the first error and builds before restarting, so a broken build never replaces the running API. tmux keeps the API, tunnel and webhook alive, and Termux:Boot recreates them after a reboot.",
        "The first listener was the adnanh/webhook Go binary, which crashed with SIGSYS on Android: the Go runtime's process-spawning path hit Android's syscall restrictions. It was replaced with a dependency-free Node.js server that lives in the repo.",
      ],
      architecture: [
        { step: "Push", detail: "A push to main starts a GitHub Actions job" },
        { step: "Webhook", detail: "Authenticated POST /deploy through the tunnel" },
        { step: "Deploy", detail: "git pull, pnpm install, pnpm build, then restart" },
        { step: "Serve", detail: "API on the phone, public via Cloudflare Tunnel" },
        { step: "Operate", detail: "SSH over Tailscale, /stats telemetry, UptimeRobot" },
      ],
    },
  },
];

export type Job = {
  company: string;
  now?: string; // current name, if the company has since been renamed
  logo?: string; // small square image in /public; initials are shown without one
  location: string;
  roles: { title: string; dates: string; points: string[] }[];
};

export const experience: Job[] = [
  {
    company: "Rimo LLC",
    logo: "/logos/rimo.png",
    location: "Tokyo, Japan",
    roles: [
      { title: "Software Development Engineer (L3)", dates: "Oct 2026 — Present", points: [] },
      {
        title: "Software Engineer Intern",
        dates: "Aug 2025 — Sep 2026",
        points: [
          "Developed and maintained scalable backend APIs in Go and built reusable UI components in Next.js.",
          "Built a real-time retrieval-augmented pipeline for live in-meeting question suggestions, running a BERT model client-side via ONNX Runtime Web with WebGL acceleration.",
          "Implemented in-app notification infrastructure with scheduled cloud triggers and Redis-backed, queue-based event delivery.",
          "Reduced legacy API latency with pagination and by moving expensive client-side search to Elasticsearch-backed server-side queries.",
        ],
      },
    ],
  },
  {
    company: "Connexlab",
    now: "Keogram Labs",
    logo: "/logos/keogram.png",
    location: "Remote",
    roles: [
      {
        title: "Backend Intern",
        dates: "May 2025 — Aug 2025",
        points: [
          "Built a real-time AI interviewer on the LiveKit Agents SDK with OpenAI speech-to-text and text-to-speech pipelines.",
          "Developed a YOLO-based, frame-by-frame cheat-detection microservice for interview proctoring with async AWS SQS event processing.",
          "Designed fault-tolerant worker infrastructure on AWS Fargate Spot with dead-letter queues for resilient video analysis and retries.",
        ],
      },
    ],
  },
];

// `photo.position` is the CSS object-position used when the photo is cropped to the card's 16:10 frame.
export const hackathons: {
  title: string;
  result: string;
  detail: string;
  photo?: { src: string; alt: string; position?: string };
}[] = [
  {
    title: "Convolve 4.0",
    result: "All India Rank 2",
    detail: "Out of 10,000+ participants",
    photo: {
      src: "/hackathons/convolve-4.jpg",
      alt: "Receiving the first runner-up trophy on stage at Convolve 4.0, IIT Guwahati",
      position: "50% 30%",
    },
  },
  {
    title: "Rimo Hack, Tokyo",
    result: "Winner",
    detail: "Internal company hackathon",
    photo: {
      src: "/hackathons/rimo-hack.jpg",
      alt: "Group photo at Rimo's Tokyo office after winning Rimo Hack",
      position: "15% 50%",
    },
  },
];

export const achievements = [
  { title: "MCM Scholarship", detail: "2022–2023 · Top 1% academic performance at IIITDM Jabalpur" },
  { title: "Codeforces", detail: "Specialist · max rating 1523" },
  { title: "CodeChef", detail: "4-Star · max rating 1624" },
  { title: "Problem solving", detail: "300+ algorithmic problems solved" },
];

export const education = [
  {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Indian Institute of Information Technology, Design and Manufacturing, Jabalpur",
    dates: "2022 — 2026",
    note: "CGPA 8.0 / 10",
  },
];

export const skills = [
  { group: "Languages", items: ["Go", "JavaScript", "C++"] },
  { group: "Frameworks", items: ["Node.js", "Gin", "Next.js", "Express.js"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "Elasticsearch", "pgvector", "Supabase"] },
  { group: "Infra", items: ["AWS", "Docker", "CI/CD", "Microservices", "Git"] },
];

export type Post = { title: string; date: string; href: string; summary?: string };

// Add posts here (external links work, e.g. Medium, dev.to or Zenn).
export const posts: Post[] = [];
