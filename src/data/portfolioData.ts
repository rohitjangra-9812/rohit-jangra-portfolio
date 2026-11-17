export type ProjectCategory = 'All' | 'Fintech' | 'AI & ML' | 'Cybersecurity';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  role: string;
  summary: string;
  architecture: string[];
  pipelineStages: string[];
  stack: string[];
  impactMetric: string;
  imageUrl: string;
  imageAlt: string;
  liveUrl?: string;
  liveLabel?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  organization: string;
  detail: string;
}

export const MARQUEE_ITEMS = [
  'SwiftPay Gateway',
  'Career Goal GPS',
  'CNN + LSTM Vision',
  'ISRO Certified',
  'BITSoM Vertex 2026 Finalist',
  'CyberSecurity Council of India',
  'Full-Stack AI Engineering',
  'Fintech Infrastructure',
];

export const JOURNEY_TIMELINE: TimelineMilestone[] = [
  {
    year: '2026',
    title: 'Vertex Builders’ Pitch Fest Finalist',
    organization: 'BITSoM (BITS School of Management)',
    detail: 'Pitched scalable fintech payment rail architecture among top student founders nationwide.',
  },
  {
    year: '2026',
    title: 'Founder & Lead Architect — SwiftPay Gateway',
    organization: 'Live Production Fintech Build',
    detail: 'Architected deterministic checkout orchestration, velocity checks, and merchant settlement flows.',
  },
  {
    year: 'Active',
    title: 'Cyber Crime Volunteer & Intervention Officer',
    organization: 'CyberSecurity Council of India',
    detail: 'Conducting digital fraud triage, phishing takedowns, and cyber resilience interventions.',
  },
  {
    year: 'Verified',
    title: 'ISRO Technical Certification',
    organization: 'Indian Space Research Organisation (IIRS / ISRO)',
    detail: 'Completed specialized coursework in geospatial analytics, remote sensing, and applied ML.',
  },
  {
    year: 'Current',
    title: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
    organization: 'Om Sterling Global University',
    detail: 'Building deep-learning computer vision models, sequence decoders, and full-stack AI web platforms.',
  },
];

export interface CredentialItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  category: string;
  description: string;
  highlight: string;
}

export interface StatMetric {
  value: string;
  label: string;
  context: string;
}

export const PROFILE = {
  name: 'Rohit Jangra',
  brandTitle: 'Rohit Jangra',
  email: 'rohitjangra2782@gmail.com',
  phone: '+91 9812603346',
  location: 'Bhiwani, Haryana, India',
  portfolioUrl: 'https://rohit-jangra-5wzh.myseera.com/',
  university: 'Om Sterling Global University',
  degree: 'B.Tech CSE (AI & ML)',
  heroLead:
    'Building fault-tolerant fintech payment rails, applied deep-learning systems, and proactive cyber threat defenses from Bhiwani, Haryana.',
  typewriterRoles: [
    'Full-Stack AI Developer',
    'Founder of SwiftPay Gateway',
    'Cyber Crime Intervention Officer',
    'B.Tech CSE (AI & ML) Student',
  ],
};

export const HERO_STATS: StatMetric[] = [
  {
    value: 'SwiftPay',
    label: 'Founder & Architect',
    context: 'Live Fintech Payment Gateway',
  },
  {
    value: 'ISRO',
    label: 'Certified Technologist',
    context: 'AI, Remote Sensing & Spatial Tech',
  },
  {
    value: 'BITSoM',
    label: 'Pitch Fest 2026 Finalist',
    context: 'Vertex Builders’ Cohort',
  },
  {
    value: 'CSCI',
    label: 'Intervention Officer',
    context: 'CyberSecurity Council of India',
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'osgu-btech',
    title: 'B.Tech in Computer Science & Engineering (AI & ML)',
    organization: 'Om Sterling Global University',
    period: 'Undergraduate Program',
    category: 'Academic Foundation',
    description:
      'Specializing in machine learning architectures, neural sequence models, distributed backend systems, and applied cryptography.',
    highlight: 'Core Focus: Deep Learning · Full-Stack Systems · Secure Infrastructure',
  },
  {
    id: 'isro-cert',
    title: 'ISRO Technical Certification',
    organization: 'Indian Space Research Organisation (IIRS / ISRO)',
    period: 'Verified Credential',
    category: 'Space & AI Telemetry',
    description:
      'Completed specialized certification covering geospatial intelligence, satellite data analysis, and machine learning applications in remote sensing.',
    highlight: 'Applied Focus: Geospatial ML · Telemetry Analytics',
  },
  {
    id: 'bitsom-vertex',
    title: 'Vertex Builders’ Pitch Fest 2026 Finalist',
    organization: 'BITS School of Management (BITSoM)',
    period: '2026 Cohort',
    category: 'Venture & Product',
    description:
      'Selected among top student founders and product builders nationwide for pitching scalable fintech payment architecture and execution.',
    highlight: 'Recognition: Top Finalist · Fintech Infrastructure Pitch',
  },
  {
    id: 'csci-officer',
    title: 'Cyber Crime Volunteer & Intervention Officer',
    organization: 'CyberSecurity Council of India',
    period: 'Active Appointment',
    category: 'Cyber Defense',
    description:
      'Supporting digital fraud triage, phishing takedown workflows, incident response awareness, and technical cybercrime intervention.',
    highlight: 'Mandate: Fraud Intervention · Incident Triage · Public Cyber Resilience',
  },
];

export const TECHNICAL_ARSENAL = [
  {
    domain: 'AI & Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'CNN & LSTM', 'Computer Vision', 'NLP Pipelines', 'LLM Integration'],
  },
  {
    domain: 'Full-Stack & Fintech',
    items: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'REST & Webhooks', 'Payment Orchestration'],
  },
  {
    domain: 'Cybersecurity & Cloud',
    items: ['Threat Triage', 'Fraud Risk Scoring', 'API Hardening', 'OAuth & JWT', 'PostgreSQL', 'Vercel & Linux'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'swiftpay-gateway',
    title: 'SwiftPay Gateway',
    subtitle: 'High-throughput fintech payment orchestration & merchant checkout engine',
    category: 'Fintech',
    year: '2026',
    role: 'Founder & Lead Architect',
    summary:
      'Designed and shipped a modern payment gateway platform featuring deterministic checkout state machines, multi-rail routing, instant transaction verification, and merchant settlement dashboards.',
    architecture: [
      'Idempotent payment intent API with cryptographic webhook signature verification',
      'Real-time anomaly & velocity checks prior to settlement authorization',
      'Responsive merchant ledger with instant status reconciliation and audit trails',
    ],
    pipelineStages: [
      'Merchant Checkout Intent',
      'Velocity & Risk Check',
      'Multi-Rail Routing',
      'Signed Webhook Settlement',
    ],
    stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Webhook Security', 'Tailwind CSS'],
    impactMetric: 'Live Production Deployment on Vercel',
    imageUrl: '/src/assets/images/project_swiftpay_gateway_1794911788698.jpg',
    imageAlt: 'SwiftPay Gateway dark-mode fintech payment orchestration visualization',
    liveUrl: 'https://swift-pay-taupe.vercel.app',
    liveLabel: 'Visit SwiftPay Gateway',
  },
  {
    id: 'career-goal-gps',
    title: 'Career Goal GPS',
    subtitle: 'AI-driven skill gap mapping & personalized career trajectory engine',
    category: 'AI & ML',
    year: '2026',
    role: 'Creator & Full-Stack AI Engineer',
    summary:
      'Built an intelligent career navigation platform that maps a learner’s current technical profile against target industry roles, generating structured milestone roadmaps and readiness diagnostics.',
    architecture: [
      'Structured competency graph matching user skills to role benchmarks',
      'Dynamic milestone sequencing with adaptive learning recommendations',
      'Clean interactive dashboard engineered for high-clarity student progress tracking',
    ],
    pipelineStages: [
      'Profile & Skill Intake',
      'Competency Gap Graph',
      'Role Readiness Scoring',
      'Adaptive Milestone Plan',
    ],
    stack: ['React', 'TypeScript', 'AI Inference', 'Skill Graph Modeling', 'Tailwind CSS'],
    impactMetric: 'Live Student Guidance Web App',
    imageUrl: '/src/assets/images/project_career_gps_1794911789218.jpg',
    imageAlt: 'Career Goal GPS interconnected skill constellation graph visualization',
    liveUrl: 'https://carrergoalgps.vercel.app',
    liveLabel: 'Visit Career Goal GPS',
  },
  {
    id: 'image-caption-generator',
    title: 'Image Caption Generator (CNN + LSTM)',
    subtitle: 'Multimodal encoder-decoder neural architecture for automated scene description',
    category: 'AI & ML',
    year: '2025',
    role: 'Deep Learning Researcher & Developer',
    summary:
      'Implemented a hybrid computer vision and sequence generation model pairing a pretrained Convolutional Neural Network feature extractor with an LSTM recurrent decoder to synthesize coherent captions.',
    architecture: [
      'CNN visual encoder extracting 2048-dimensional spatial feature embeddings',
      'Tokenized vocabulary pipeline with word embeddings and teacher-forced LSTM training',
      'Beam-search sequence decoding for grammatically consistent scene descriptions',
    ],
    pipelineStages: [
      'Input Frame Tensor',
      'CNN Feature Extraction',
      'LSTM Sequence Decoder',
      'Natural Language Caption',
    ],
    stack: ['Python', 'TensorFlow / Keras', 'CNN Encoder', 'LSTM Decoder', 'NumPy', 'OpenCV'],
    impactMetric: 'End-to-End Multimodal Vision-to-Text Pipeline',
    imageUrl: '/src/assets/images/project_image_captioner_1794911788638.jpg',
    imageAlt: 'CNN and LSTM deep learning multimodal pipeline isometric illustration',
  },
  {
    id: 'cybershield-triage',
    title: 'CyberShield Intervention Toolkit',
    subtitle: 'Digital fraud indicator triage & phishing URL intelligence workflow',
    category: 'Cybersecurity',
    year: '2026',
    role: 'Cyber Crime Intervention Officer',
    summary:
      'Developed rapid triage utilities supporting cybercrime volunteer investigations—analyzing suspicious domains, payment scam footprints, and structured incident evidence reports.',
    architecture: [
      'Heuristic phishing pattern scanner checking lookalike domains and TLS metadata',
      'Structured digital evidence intake templates aligned with intervention protocols',
      'Zero-client-leakage processing keeping sensitive victim reports localized',
    ],
    pipelineStages: [
      'Suspicious URL / Signal',
      'Heuristic & TLS Analysis',
      'Fraud Pattern Scoring',
      'Intervention Evidence Brief',
    ],
    stack: ['TypeScript', 'Security Heuristics', 'OSINT Workflows', 'Threat Intelligence'],
    impactMetric: 'Supports Rapid Cyber Fraud Triage',
    imageUrl: '/src/assets/images/project_cyber_shield_1794911789815.jpg',
    imageAlt: 'CyberShield threat radar and packet anomaly inspection interface',
  },
];
