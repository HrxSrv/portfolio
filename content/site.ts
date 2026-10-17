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
  resume: "", // e.g. "/resume.pdf" — drop the PDF into /public and set the path
  url: "https://example.com", // your deployed domain, used for metadata
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
    links: [{ label: "GitHub", href: "https://github.com/hrxsrv" }],
    highlights: [
      "RAG-based chat using pgvector for semantic retrieval over medical history.",
      "Async ingestion pipeline (BullMQ + Redis) with scalable workers for parsing and embeddings.",
      "Biomarker tracking and trend analytics with dashboards and health nudges.",
      "Secure storage and sharing via Supabase row-level security for tenant isolation.",
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
];

export type Job = {
  company: string;
  location: string;
  roles: { title: string; dates: string; points: string[] }[];
};

export const experience: Job[] = [
  {
    company: "Rimo LLC",
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

export const hackathons = [
  { title: "Convolve 4.0", result: "All India Rank 2", detail: "Out of 10,000+ participants" },
  { title: "Rimo Hack, Tokyo", result: "Winner", detail: "Internal company hackathon" },
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
