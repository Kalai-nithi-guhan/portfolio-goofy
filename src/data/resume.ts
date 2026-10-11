export interface Project {
  id: string;
  title: string;
  category: string;
  filterTags: ("AI Agents" | "Computer Vision" | "NLP/RAG" | "ML")[];
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  demoType:
    | "agent-terminal"
    | "rag-qa"
    | "pose-counter"
    | "email-summarizer"
    | "crop-disease"
    | "traffic-violation"
    | "crime-heatmap"
    | "fertilizer-recommender";
  badge: string;
  color: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  category: "Language" | "ML & AI" | "Web & Cloud" | "Dev Tools";
}

export interface SkillTier {
  tier: "Main Equipment" | "Comfortable Loadout" | "Skill Tree / Exploring";
  tag: string;
  description: string;
  skills: SkillItem[];
}

export interface PassiveBuff {
  name: string;
  stat: string;
  description: string;
  icon: string;
}

export interface GitCommit {
  hash: string;
  message: string;
  date: string;
  tag?: string;
  details: string;
}

export interface QuestItem {
  id: string;
  questType: "Main Quest" | "Certification" | "Foundational Quest" | "Origin Quest";
  title: string;
  institution: string;
  scoreOrGpa: string;
  period: string;
  status: "Completed" | "In Progress" | "Unlocked";
  skillsAwarded: string[];
  notes?: string;
}

// TODO: replace profile link with direct repo/live URLs when available
const GITHUB_PROFILE = "https://github.com/Kalai-nithi-guhan";

export const RESUME_DATA = {
  name: "Kalai Nithi Guhan M",
  tagline: "Aspiring AI/ML Engineer | RAG · Computer Vision · Full-Stack",
  email: "kalaiguhan98@gmail.com",
  phone: "+91 9659119924",
  location: "Pollachi / Coimbatore, Tamil Nadu, India",
  profilePhoto: "/profile.jpg",
  resumePdf: "/resume.pdf",
  nowPlaying: {
    building: "RAG apps",
    learning: "AI agents",
    fuel: "filter coffee",
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/kalai-nithi-guhan-m",
    github: GITHUB_PROFILE,
    leetcode: "https://leetcode.com/u/kalainithiguhan/",
    instagram: "https://www.instagram.com/kalainithiguhan/",
  },

  rotatingRoles: [
    "AI Engineer",
    "CV Tinkerer",
    "RAG Builder",
    "Problem Solver",
  ],

  objective:
    "Motivated CS student seeking an entry-level opportunity to apply technical skills in a dynamic, growth-oriented organization; passionate about problem-solving, technology and continuous learning.",

  interests: [
    {
      title: "ML & AI",
      detail: "Model development, AI agents, data processing",
      tag: "CORE_FOCUS",
    },
    {
      title: "Computer Vision",
      detail: "OpenCV, MediaPipe, YOLO, real-time image processing",
      tag: "CV_VISION",
    },
    {
      title: "NLP",
      detail: "Large Language Models, Contextual RAG, Semantic Search",
      tag: "LLM_RAG",
    },
  ],

  stats: {
    leetcodeSolved: 800,
    cgpa: "8.63",
    uptime: "99.9%",
  },

  bootSequence: [
    { text: "> npm run kalai --mode=interactive", delay: 100 },
    { text: "[KalaiOS-Kernel] Initializing retro-futuristic core...", delay: 280 },
    { text: "[sys] installing coffee... [OK]", delay: 480 },
    { text: "[sys] compiling bugs... 0 found (suspicious)", delay: 780 },
    { text: "[data] loading 800+ LeetCode solutions... [DONE]", delay: 1080 },
    { text: "[ai] mounting language model weights and vision pipeline... [READY]", delay: 1380 },
    { text: "[mascot] waking up Bugsy the debug bot...", delay: 1680 },
    { text: "[ready] KalaiOS v2.5 loaded. Booting viewport...", delay: 1980 },
  ],

  skillTiers: [
    {
      tier: "Main Equipment",
      tag: "Tier S · Primary Loadout",
      description: "Core battle-tested languages and deep learning foundations used daily.",
      skills: [
        { name: "Python", category: "Language" },
        { name: "Java", category: "Language" },
        { name: "C", category: "Language" },
        { name: "TensorFlow", category: "ML & AI" },
        { name: "PyTorch", category: "ML & AI" },
        { name: "MediaPipe", category: "ML & AI" },
        { name: "HF Transformers", category: "ML & AI" },
      ],
    },
    {
      tier: "Comfortable Loadout",
      tag: "Tier A · Production Stack",
      description: "Modern full-stack web and cloud systems for deploying intelligent workflows.",
      skills: [
        { name: "Next.js", category: "Web & Cloud" },
        { name: "Node.js", category: "Web & Cloud" },
        { name: "Tailwind CSS", category: "Web & Cloud" },
        { name: "Firebase", category: "Web & Cloud" },
        { name: "MySQL", category: "Web & Cloud" },
        { name: "Vercel", category: "Web & Cloud" },
        { name: "Render", category: "Web & Cloud" },
      ],
    },
    {
      tier: "Skill Tree / Exploring",
      tag: "Tier B · Local AI & Tooling",
      description: "Local inference runtimes and version control craft.",
      skills: [
        { name: "Ollama", category: "ML & AI" },
        { name: "Git", category: "Dev Tools" },
        { name: "GitHub", category: "Dev Tools" },
        { name: "VS Code", category: "Dev Tools" },
      ],
    },
  ] as SkillTier[],

  passiveBuffs: [
    {
      name: "Algorithmic Intuition",
      stat: "+800 LC",
      description: "Passive instinct honed across hundreds of Data Structure & Algorithm trials.",
      icon: "Brain",
    },
    {
      name: "Rapid Model Synthesis",
      stat: "+25% Agility",
      description: "Quick turnaround in prototyping embeddings, vector search, and vision pipelines.",
      icon: "Zap",
    },
    {
      name: "Debug Tenacity",
      stat: "+99 Resolve",
      description: "Never stops until stack traces are untangled and edge-cases sealed.",
      icon: "ShieldAlert",
    },
    {
      name: "Full-Stack Synergy",
      stat: "+100% Cohesion",
      description: "Seamless bridge from deep ML backends to responsive client interfaces.",
      icon: "Cpu",
    },
  ] as PassiveBuff[],

  projects: [
    {
      id: "autonomous-ai-agent",
      title: "Autonomous AI Agent",
      category: "Local LLMs · Autonomous Scraping",
      filterTags: ["AI Agents"],
      tagline: "Local LLM web agent with live thought stream & multi-step scraping",
      description:
        "Engineered an autonomous agent powered by a local LLM via Ollama. It dynamically determines target resources, extracts dynamic web content using BeautifulSoup, and synthesizes structured action plans inside a modern Next.js interface.",
      highlights: [
        "Runs 100% locally with zero API latency or token costs via Ollama",
        "Resilient HTML parsing with custom heuristics and DOM sanitization",
        "Streamed reasoning step-by-step UI with interactive playback",
      ],
      tech: ["Ollama", "BeautifulSoup", "Next.js", "Python", "TypeScript"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "agent-terminal",
      badge: "LLM AGENT",
      color: "#7CFF6B",
    },
    {
      id: "contextual-doc-qa-rag",
      title: "Contextual Document QA RAG",
      category: "Vector Search · RAG Engine",
      filterTags: ["NLP/RAG"],
      tagline: "Hybrid semantic document retriever with highlighted citation chunks",
      description:
        "High-performance contextual question-answering architecture built on FastAPI and Next.js. Chunks multi-page PDFs using Sentence Transformers, indexes vectors in Pinecone, and delivers grounded answers with exact source chunk attributions.",
      highlights: [
        "Sub-200ms semantic similarity vector querying powered by Pinecone",
        "Context window optimization preventing hallucination via OpenRouter models",
        "Visual citation chunk highlighting matching retrieved passages in real-time",
      ],
      tech: ["FastAPI", "Next.js", "Pinecone", "Sentence Transformers", "OpenRouter", "Python"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "rag-qa",
      badge: "RAG PIPELINE",
      color: "#FF5CAA",
    },
    {
      id: "exercise-counter-cv",
      title: "Exercise Counter & Form Guard",
      category: "Computer Vision · Real-time Kinematics",
      filterTags: ["Computer Vision"],
      tagline: "Vision-based rep counter using biomechanical angle tracking for reliable form analysis",
      description:
        "Real-time edge computer vision application leveraging OpenCV and MediaPipe Pose landmarks. Calculates 3-point joint angles (hip-knee-ankle, shoulder-elbow-wrist) to validate exercise form and count repetitions reliably without physical sensors.",
      highlights: [
        "Multi-joint angle computation for robust form validation across gym lighting conditions",
        "State-machine logic detecting full extension and lockout for cheat-proof reps",
        "Low compute footprint running smoothly on edge webcam streams",
      ],
      tech: ["OpenCV", "MediaPipe", "Python", "NumPy"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "pose-counter",
      badge: "COMPUTER VISION",
      color: "#60A5FA",
    },
    {
      id: "email-summarizer",
      title: "Email Summarizer",
      category: "NLP · Text Condensation",
      filterTags: ["NLP/RAG"],
      tagline: "Condenses long, tangled emails into 3 clean bullet-point takeaways",
      description:
        "NLP pipeline that ingests verbose email threads and extracts the core action items, decisions, and context into structured bullet points. Handles forwarded chains, HTML stripping, and multi-sender threads.",
      highlights: [
        "Chunked extractive + abstractive summarization for long email chains",
        "HTML stripping and noisy-footer removal before inference",
        "Fast local inference — no external API required",
      ],
      tech: ["Python", "NLP", "HuggingFace", "BeautifulSoup"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "email-summarizer",
      badge: "NLP",
      color: "#A78BFA",
    },
    {
      id: "crop-disease-pest",
      title: "Crop Disease & Pest Prediction",
      category: "Computer Vision · Agricultural AI",
      filterTags: ["Computer Vision", "ML"],
      tagline: "Detects crop diseases and pests from leaf images using OpenCV",
      description:
        "Computer vision system that analyzes leaf images to identify disease patterns and pest infestations using image segmentation and classification. Designed for low-resource field devices.",
      highlights: [
        "Contour-based lesion detection to isolate affected leaf regions",
        "Multi-class disease and pest classification from a single leaf snapshot",
        "Lightweight pipeline suitable for edge deployment on low-power devices",
      ],
      tech: ["OpenCV", "Python", "Image Classification", "NumPy"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "crop-disease",
      badge: "AGRI-CV",
      color: "#34D399",
    },
    {
      id: "traffic-violation-detection",
      title: "Traffic Violation Detection",
      category: "Computer Vision · Smart City",
      filterTags: ["Computer Vision"],
      tagline: "Flags wrong-lane driving and phone use while driving from CCTV footage",
      description:
        "CCTV-based traffic monitoring system that detects lane violations and distracted driving (phone use) using object detection and pose estimation. Outputs annotated frames with violation overlays and timestamps.",
      highlights: [
        "Lane-boundary detection with wrong-direction flagging",
        "Phone-use detection via wrist/hand pose proximity heuristics",
        "Frame-by-frame annotation pipeline suitable for post-incident review",
      ],
      tech: ["OpenCV", "Python", "Object Detection", "NumPy"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "traffic-violation",
      badge: "SMART CITY",
      color: "#FB923C",
    },
    {
      id: "crime-rate-prediction",
      title: "Crime Rate Prediction",
      category: "ML · Ensemble Models",
      filterTags: ["ML"],
      tagline: "Predicts crime hotspots using ensemble gradient boosting models",
      description:
        "Ensemble ML system that fuses XGBoost, CatBoost, and LightGBM predictions to forecast crime hotspot probabilities by area and time window. Outputs a heatmap grid to help authorities allocate patrol resources proactively.",
      highlights: [
        "Stacked ensemble of XGBoost, CatBoost, and LightGBM for robust predictions",
        "Feature engineering on temporal, geographic, and demographic signals",
        "Grid-based heatmap output for visual crime-density forecasting",
      ],
      tech: ["Python", "XGBoost", "CatBoost", "LightGBM", "Pandas", "Scikit-learn"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "crime-heatmap",
      badge: "ENSEMBLE ML",
      color: "#F87171",
    },
    {
      id: "ai-fertilizer-recommender",
      title: "AI Fertilizer Recommender",
      category: "ML · Agricultural Intelligence",
      filterTags: ["ML"],
      tagline: "ML-based soil analysis recommender built during internship at Boredom LLP Technology",
      description:
        "Developed during my AI & Web Development internship at Boredom LLP Technology, Bangalore. An ML recommender that analyzes soil NPK parameters, crop type, and regional moisture data to predict optimal fertilizer composition.",
      highlights: [
        "NPK + crop-type feature matrix powering a multi-output regression model",
        "React + Firebase Realtime Database dashboard for live soil telemetry",
        "Modular Next.js API proxy routes for clean model inference calls",
      ],
      tech: ["Python", "Next.js", "React", "Firebase", "ML"],
      githubUrl: GITHUB_PROFILE,
      liveUrl: GITHUB_PROFILE,
      demoType: "fertilizer-recommender",
      badge: "INTERNSHIP",
      color: "#FBBF24",
    },
  ] as Project[],

  experience: {
    company: "Boredom LLP Technology",
    location: "Bangalore, India",
    role: "AI & Web Development Intern",
    period: "May 2025 – Jun 2025",
    summary:
      "Engineered machine learning recommender models and shipped production-grade responsive interactive frontends with real-time Firebase backends.",
    gitGraph: [
      {
        hash: "b0f81e2",
        message: "feat: AI fertilizer recommender model & inference pipeline",
        date: "2025-06-12",
        tag: "v1.2.0-ai",
        details:
          "Developed an ML-based fertilizer recommendation system analyzing soil NPK parameters, crop types, and regional moisture data to predict optimal soil enrichments.",
      },
      {
        hash: "7d3a9c4",
        message: "feat: React + Firebase realtime telemetry & user data sync",
        date: "2025-06-02",
        tag: "v1.1.0-firebase",
        details:
          "Built modular React state architectures linked to Firebase Firestore and Realtime Database for live telemetry display and instant user feedback loops.",
      },
      {
        hash: "4e91b5a",
        message: "feat: Next.js routing structure & basic API integration",
        date: "2025-05-22",
        tag: "v1.0.4-next",
        details:
          "Architected clean App Router directory hierarchies, server-side data fetching contracts, and client-safe API proxy routes.",
      },
      {
        hash: "2a15f08",
        message: "style: responsive cross-device layout pages (HTML/CSS/JS)",
        date: "2025-05-14",
        tag: "v1.0.0-ui",
        details:
          "Crafted 3+ fully responsive web pages using modern HTML5 semantic markup, fluid CSS layout systems, and vanilla JavaScript for rock-solid mobile compatibility.",
      },
    ] as GitCommit[],
  },

  education: [
    {
      id: "quest-be",
      questType: "Main Quest",
      title: "B.E. Computer Science & Engineering (AI & ML)",
      institution: "Dr. Mahalingam College of Engineering and Technology, Pollachi, Coimbatore",
      scoreOrGpa: "CGPA: 8.63 / 10",
      period: "2023 – 2027",
      status: "In Progress",
      skillsAwarded: [
        "Deep Learning Foundations",
        "Data Structures & Algorithms",
        "Computer Vision",
        "Software Engineering",
      ],
      notes: "Active contributor to AI/ML technical clubs and hackathon squads.",
    },
    {
      id: "quest-cert-nlp",
      questType: "Certification",
      title: "Natural Language Processing (NLP) Specialization",
      institution: "Industry-Standard Coursework & Certification",
      scoreOrGpa: "Verified Credential",
      period: "2024",
      status: "Completed",
      skillsAwarded: ["Tokenization", "Transformers", "Attention Mechanisms", "RAG Arch"],
      notes: "Hands-on projects with modern transformer embeddings and attention layers.",
    },
    {
      id: "quest-cert-prepinsta",
      questType: "Certification",
      title: "PrepInsta Prime Technical Certification",
      institution: "PrepInsta Prime",
      scoreOrGpa: "Certified Expert",
      period: "2024",
      status: "Completed",
      skillsAwarded: ["Advanced Java", "Competitive Programming", "System Aptitude"],
      notes: "Mastered algorithmic problem solving, time-space optimization, and core CS fundamentals.",
    },
    {
      id: "quest-hsc",
      questType: "Foundational Quest",
      title: "Higher Secondary Certificate (HSC)",
      institution: "Srinivasa Vidhyalaya Matric Hr Sec School, Udumalpet",
      scoreOrGpa: "89.3%",
      period: "2022 – 2023",
      status: "Completed",
      skillsAwarded: ["Mathematics", "Physics", "Computer Science"],
    },
    {
      id: "quest-sslc",
      questType: "Origin Quest",
      title: "Secondary School Leaving Certificate (SSLC)",
      institution: "Srinivasa Vidhyalaya Matric Hr Sec School, Udumalpet",
      scoreOrGpa: "First Class with Distinction",
      period: "2020 – 2021",
      status: "Completed",
      skillsAwarded: ["Core Sciences", "Problem Solving"],
    },
  ] as QuestItem[],
};
