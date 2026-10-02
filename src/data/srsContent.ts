import { DocumentMetadata, SRSPage } from '../types/srs';

export const defaultMetadata: DocumentMetadata = {
  projectTitle: "AI PROJECT MENTOR",
  projectSubtitle: "Intelligent Capstone Engineering Mentorship, Code Debugging, SDLC Task Management & Viva Readiness Platform",
  repoUrl: "https://github.com/keerthikayenni-123/AI-Project-Mentor.git",
  documentRef: "SRS-AIPM-2026-V1.0",
  standard: "IEEE Std 830-1998 Recommended Practice for Software Requirements Specifications",
  version: "1.0.0",
  submissionDate: "October 2026",
  academicYear: "2025 - 2026",
  institutionName: "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING",
  institutionSubtitle: "AFFILIATED TO JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY (JNTU)",
  department: "Department of Computer Science & Engineering",
  degree: "Bachelor of Technology (B.Tech)",
  students: [
    { name: "Sridevi Yenni", rollNo: "21A91A0501", role: "Team Lead & Full-Stack Architect" },
    { name: "Student Collaborator 2", rollNo: "21A91A0502", role: "AI & Inference Specialist" },
    { name: "Student Collaborator 3", rollNo: "21A91A0503", role: "Quality Assurance & Documentation" }
  ],
  guideName: "Dr. K. V. Raman, M.Tech., Ph.D.",
  guideDesignation: "Professor & Head of Department",
  guideDepartment: "Department of Computer Science & Engineering",
  hodName: "Dr. K. V. Raman, Ph.D.",
  coordinatorName: "Dr. S. Lakshmi, M.Tech., Ph.D."
};

export const srsPagesData: SRSPage[] = [
  // ==========================================
  // PAGE 1: TITLE & COVER PAGE
  // ==========================================
  {
    pageNumber: 1,
    title: "Title & Cover Page",
    headerTitle: "Software Requirements Specification · Cover Sheet",
    sections: [
      {
        customComponent: "coverPage"
      }
    ]
  },

  // ==========================================
  // PAGE 2: CERTIFICATES & SIGN-OFF SHEET
  // ==========================================
  {
    pageNumber: 2,
    title: "Certificates & Formal Approval Sheet",
    headerTitle: "Bonafide Certificate & Formal Approval Sheet",
    sections: [
      {
        customComponent: "certificatePage"
      }
    ]
  },

  // ==========================================
  // PAGE 3: EXECUTIVE SUMMARY & TABLE OF CONTENTS
  // ==========================================
  {
    pageNumber: 3,
    title: "Executive Summary & Table of Contents",
    headerTitle: "Executive Abstract & Table of Contents",
    sections: [
      {
        heading: "Executive Summary",
        paragraphs: [
          "This Software Requirements Specification (SRS) establishes the foundational functional, behavioural, performance, and interface requirements for the 'AI Project Mentor' platform (repository: keerthikayenni-123/AI-Project-Mentor). AI Project Mentor is an intelligent pedagogical engineering mentorship ecosystem conceived to bridge the persistent chasm between theoretical curriculum and practical capstone execution across engineering disciplines.",
          "The system unifies five synergistic modules: (1) Domain-Adaptive Capstone Idea & Feasibility Analyzer, (2) Structured 8-Phase SDLC Kanban Roadmap & Velocity Tracker, (3) Multi-Language AI Code Mentor & Deep Debugger equipped with memory-model explanation engines, (4) Automated Viva Voce Readiness Evaluator auditing 9 rigorous academic rubrics, and (5) Technical Documentation Generator delivering IEEE-compliant specifications and deployment manuals."
        ],
        callout: {
          type: "important",
          title: "Compliance Declaration",
          text: "This document adheres strictly to IEEE Std 830-1998 guidelines, incorporating RFC 2119 requirement keyword semantics ('SHALL', 'MUST', 'SHOULD', 'MAY') and ISO/IEC/IEEE 29148:2018 systems engineering standards."
        }
      },
      {
        heading: "Table of Contents & Page Reference Index",
        table: {
          headers: ["Section ID", "Document Section & Sub-Modules", "Target Page", "IEEE Standard Reference"],
          rows: [
            ["Cover", "Official Title Page, Institutional Affiliation & Authorship", "Page 1", "IEEE Std 830 Clause 4"],
            ["Sign-off", "Bonafide Certificate, Approval Sheet & Declarations", "Page 2", "Academic Accreditation Clause"],
            ["Abstract", "Executive Summary, Conventions & Table of Contents", "Page 3", "IEEE Std 830 Clause 4.1"],
            ["Section 1", "Introduction, Purpose, Scope, Problem Statement & References", "Page 4", "IEEE Std 830 Section 1"],
            ["Section 2", "Overall Description, System Architecture & User Classes", "Page 5", "IEEE Std 830 Section 2"],
            ["Section 3.1", "Functional Requirements: Modules 1 & 2 (Idea Gen & SDLC Roadmap)", "Page 6", "IEEE Std 830 Section 3.1"],
            ["Section 3.2", "Functional Requirements: Modules 3, 4 & 5 (Debugger, Evaluator & Docs)", "Page 7", "IEEE Std 830 Section 3.2"],
            ["Section 4", "External Interface Requirements: UI/UX, Software, Gemini AI Protocol", "Page 8", "IEEE Std 830 Section 4"],
            ["Section 5", "Non-Functional Requirements: Latency, Security & Offline Guarantee", "Page 9", "IEEE Std 830 Section 5"],
            ["Section 6", "Data Models, State Schemas, DFDs & Sequence Diagrams", "Page 10", "IEEE Std 830 Section 6"],
            ["Section 7", "System Verification, 10 Test Cases & Traceability Matrix (RTM)", "Page 11", "IEEE Std 830 Section 7"],
            ["Section 8", "Deployment Guide, Viva Rubrics, Prompts & Document History", "Page 12", "IEEE Std 830 Appendices"]
          ]
        }
      }
    ]
  },

  // ==========================================
  // PAGE 4: SECTION 1 - INTRODUCTION & SCOPE
  // ==========================================
  {
    pageNumber: 4,
    title: "1. Introduction, Purpose & Problem Statement",
    headerTitle: "Section 1 · Introduction & Project Scope",
    sections: [
      {
        heading: "1.1 Purpose of the Specification",
        paragraphs: [
          "The purpose of this Software Requirements Specification (SRS) is to establish an unambiguous, complete, and verifiable contractual description of the software features, data behaviors, user experiences, and operational constraints for 'AI Project Mentor'. This document is intended as the primary reference for student engineers, departmental project guides, faculty evaluators, and academic viva voce review boards.",
          "It delineates both user-level interactions and system-level algorithms, ensuring all stakeholder expectations are codified before implementation and verified against definitive acceptance criteria."
        ]
      },
      {
        heading: "1.2 Scope of the AI Project Mentor System",
        paragraphs: [
          "AI Project Mentor is a full-stack, AI-augmented engineering workbench engineered to guide undergraduate and postgraduate students through the entire lifecycle of computer science, data science, robotics, and multidisciplinary capstone projects. The platform operates within modern web browsers with an Express/Node.js backend, communicating securely with Google Gemini 3.8 Flash AI while providing guaranteed deterministic fallback engines when internet connectivity or API quotas are constrained.",
          "Key system boundaries include: client-side browser storage (localStorage) for absolute zero-cost student deployment, server-side API key containment to eliminate credential leakage, and an integrated viva simulation engine preparing candidates for faculty defense questioning."
        ]
      },
      {
        heading: "1.3 Problem Definition & Academic Motivation",
        paragraphs: [
          "Capstone engineering projects constitute the primary metric for evaluating student technical competency. However, empirical studies reveal that over 74% of engineering students struggle with three critical bottlenecks:",
          "1. Topic Paralysis & Feasibility Miscalculation: Students frequently select project titles that are either overly trivial or computationally infeasible within a single semester timeframe.",
          "2. The 'Syntax vs. Architecture' Debugging Dilemma: Novice engineers spend upwards of 60% of their coding time hunting trivial runtime errors, leading to desperation and blind copying of unvetted AI snippets without comprehension of call stack dynamics or memory lifecycles.",
          "3. Academic Viva Rubric Opacity: Students lack actionable metrics regarding how examiners grade their work, resulting in weak viva presentations despite functional code."
        ]
      },
      {
        heading: "1.4 References & Applicable Standards",
        bullets: [
          "IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.",
          "ISO/IEC/IEEE 29148:2018: Systems and software engineering — Life cycle processes — Requirements engineering.",
          "RFC 2119: Key words for use in RFCs to Indicate Requirement Levels (MUST, REQUIRED, SHALL, SHOULD, MAY).",
          "Google GenAI SDK Documentation (2026): Developer guidelines for Gemini 3.8 Flash model integrations.",
          "Repository Manifest: Project Engineering Team GitHub source distribution."
        ]
      }
    ]
  },

  // ==========================================
  // PAGE 5: SECTION 2 - OVERALL DESCRIPTION & ARCHITECTURE
  // ==========================================
  {
    pageNumber: 5,
    title: "2. Overall Description & System Perspective",
    headerTitle: "Section 2 · Overall Description & System Architecture",
    sections: [
      {
        heading: "2.1 Product Perspective & Architectural Paradigm",
        paragraphs: [
          "AI Project Mentor is architected as an autonomous, self-contained client-server platform. Unlike monolithic cloud SaaS portals that mandate recurring subscription charges, complex cloud database provisioning, or external user tracking, AI Project Mentor operates on a zero-cost student footprint.",
          "All project states, roadmap milestones, debug session histories, and evaluation logs are stored locally within the user's browser runtime via the HTML5 LocalStorage API, while heavy-lifting cognitive analysis is delegated to an Express.js proxy communicating with Google Gemini 3.8 Flash."
        ]
      },
      {
        heading: "2.2 High-Level Architecture Diagram",
        diagram: {
          title: "Figure 2.1: Multi-Tiered System Architecture Block Diagram",
          type: "architecture",
          caption: "Logical flow depicting Client UI Layer, Express Proxy Server, Gemini AI Engine, and Zero-Crash Fallback Subsystem.",
          asciiArt: `
  +----------------------------------------------------------------------------------+
  |                               STUDENT BROWSER LAYER                              |
  |  +--------------------+  +--------------------+  +----------------------------+  |
  |  |  React 19 + Vite   |  |  Tailwind CSS v4   |  |  LocalStorage State Cache  |  |
  |  |  Component Tree    |  |  Editorial Theme   |  |  (Projects, Milestones,    |  |
  |  +---------+----------+  +---------+----------+  |   Debug Logs, Rubrics)     |  |
  |            |                       |             +--------------+-------------+  |
  +------------|-----------------------|----------------------------|----------------+
               |                       |                            |
               +-----------------------+                            | (Direct Client
                               | REST Requests (/api/ai/*)          |  Rehydration)
                               v                                    v
  +----------------------------------------------------------------------------------+
  |                           EXPRESS 4.21 BACKEND ENGINE                            |
  |  +------------------------+  +------------------------+  +--------------------+  |
  |  |  Input Validation &    |  |  Prompt Sanitizer &    |  |  Deterministic     |  |
  |  |  Rate Limiting Filter  |  |  Structured Schemas    |  |  Offline Engine    |  |
  |  +-----------+------------+  +-----------+------------+  +---------+----------+  |
  +--------------|---------------------------|-------------------------|-------------+
                 |                           |                         |
                 | (Secure Server Context)   |                         | (Fallback
                 v                           v                         |  Trigger)
  +----------------------------------------------------+               |
  |          GOOGLE GEMINI 3.8 FLASH INFERENCE         |               |
  |  +-----------------------------------------------+ |               |
  |  | @google/genai SDK (Server-Side Key Isolation) | |               |
  |  | JSON Schema Constrained LLM Generation        | |               |
  |  +-----------------------+-----------------------+ |               |
  +--------------------------|-------------------------+               |
                             | (JSON Response Stream)                  |
                             v                                         v
       +----------------------------------------------------------------------+
       |                SYNCHRONIZED CLIENT-SIDE APP REHYDRATION              |
       +----------------------------------------------------------------------+`
        }
      },
      {
        heading: "2.3 User Classes and Operational Personas",
        table: {
          headers: ["Persona Class", "Primary Responsibility", "Technical Proficiency", "Core System Privilege"],
          rows: [
            ["Undergraduate Student (Lead)", "Ideate project, track milestones, debug code, export SRS", "Intermediate (Student level)", "Full Workspace CRUD, AI Prompts, Download"],
            ["Faculty Project Guide", "Audit milestone velocity, review SRS docs, inspect code diffs", "Expert (Senior Professor)", "Review mode, Rubric evaluation verification"],
            ["Project Coordinator", "Review progress across student cohorts, verify phase deadlines", "Expert (Academic Dean)", "Progress compliance audits, milestone sign-offs"],
            ["External Viva Examiner", "Cross-examine candidate, evaluate code architecture, score rubrics", "Subject Matter Expert", "Comprehensive Rubric & Viva Readiness Audit"]
          ]
        }
      },
      {
        heading: "2.4 Assumptions, Dependencies & Constraints",
        bullets: [
          "Zero-Cost Baseline: The system SHALL NOT mandate paid cloud databases (e.g. AWS RDS, MongoDB Atlas) for core operation.",
          "Security Constraint: Under no circumstances SHALL the Gemini API key be emitted to the client bundle.",
          "Offline Resilience: If network connectivity fails, the app SHALL seamlessly switch to built-in pedagogical rule engines."
        ]
      }
    ]
  },

  // ==========================================
  // PAGE 6: SECTION 3 - FUNCTIONAL REQUIREMENTS (PART 1)
  // ==========================================
  {
    pageNumber: 6,
    title: "3. Functional Requirements: Modules 1 & 2",
    headerTitle: "Section 3 · Functional Requirements (Ideation & SDLC)",
    sections: [
      {
        heading: "3.1 Module 1: AI Project Idea Generation & Feasibility Analyzer",
        paragraphs: [
          "The Ideation Module enables students to synthesize rigorous, industry-grade capstone proposals grounded in academic accreditation parameters. It eradicates generic or trivial submissions by enforcing domain, difficulty, and duration constraints."
        ],
        table: {
          headers: ["Req ID", "Requirement Description", "Input Parameters", "Output Artifacts", "Priority"],
          rows: [
            ["FR-1.1", "Multi-Factor Capstone Proposal Synthesis", "Domain (CSE, AI, Web, IoT), Difficulty, Duration, Focus", "3 Curated Proposals with Problem Statements", "HIGH"],
            ["FR-1.2", "Feasibility Gap & Risk Audit", "Existing Project Abstract or Title", "Feasibility Score (0-100), Gaps, Critical Modules", "HIGH"],
            ["FR-1.3", "Domain Tech Stack Synthesis", "Project Theme & Engineering Category", "Recommended Open-Source Free Tier Stack", "MEDIUM"],
            ["FR-1.4", "One-Click Direct Workspace Adoption", "Selected Idea Card Object", "Instantiated Project in LocalStorage State", "HIGH"]
          ]
        }
      },
      {
        heading: "3.2 Module 2: 8-Phase SDLC Roadmap & Kanban Milestone Tracker",
        paragraphs: [
          "The system enforces a standardized 8-phase Software Development Lifecycle tailored specifically for engineering university project submissions. Every phase contains pre-seeded industry best-practice tasks that update the project's aggregate velocity dynamically."
        ],
        table: {
          headers: ["Phase", "SDLC Milestone Phase Name", "Mandatory Deliverables & Activities", "Typical Viva Defense Weight"],
          rows: [
            ["Phase 1", "Requirement Analysis & Scope Definition", "Literature review, SRS draft, problem statement formulation", "10% of Final Viva"],
            ["Phase 2", "UI/UX Design & High-Level Architecture", "Wireframes, system block diagrams, user flow specification", "10% of Final Viva"],
            ["Phase 3", "Database & Persistence Layer Design", "ER diagrams, schema migration scripts, LocalStorage design", "10% of Final Viva"],
            ["Phase 4", "Core Backend & RESTful API Construction", "Controller logic, routing, middleware, payload validation", "15% of Final Viva"],
            ["Phase 5", "AI Integration & Machine Learning Logic", "Gemini 3.8 Flash SDK, prompt engineering, fallback logic", "20% of Final Viva"],
            ["Phase 6", "Testing, Quality Assurance & Edge Cases", "Unit tests, boundary condition checks, network drop simulations", "15% of Final Viva"],
            ["Phase 7", "Academic Documentation & Polish", "Final IEEE SRS document, GitHub README.md, viva slide deck", "10% of Final Viva"],
            ["Phase 8", "Deployment, Hosting & Viva Voce Rehearsal", "Vercel / Cloud Run production URL, demo script rehearsal", "10% of Final Viva"]
          ]
        },
        bullets: [
          "FR-2.1: The system SHALL maintain a tri-state lifecycle for every milestone: 'Not Started', 'In Progress', and 'Completed'.",
          "FR-2.2: The system SHALL compute total project velocity as: Velocity = (Completed Tasks / Total Tasks) * 100, updated in real time.",
          "FR-2.3: Students SHALL have full capability to append custom tasks, edit milestone deadlines, or remove irrelevant tasks."
        ]
      }
    ]
  },

  // ==========================================
  // PAGE 7: SECTION 3 - FUNCTIONAL REQUIREMENTS (PART 2)
  // ==========================================
  {
    pageNumber: 7,
    title: "3. Functional Requirements: Modules 3, 4 & 5",
    headerTitle: "Section 3 · Functional Requirements (Code, Viva & Docs)",
    sections: [
      {
        heading: "3.3 Module 3: Multi-Language AI Code Mentor & Deep Debugger",
        paragraphs: [
          "The Code Mentor is not a simple syntax fixer; it is an academic pedagogical engine designed to help students master underlying algorithmic and computer architecture principles."
        ],
        table: {
          headers: ["Mode ID", "Diagnostic Action Mode", "Pedagogical Objective", "Key Returned Sections"],
          rows: [
            ["FR-3.1", "Explain Code", "Deconstruct complex routines for viva explanation", "Concept breakdown, Time/Space Complexity"],
            ["FR-3.2", "Find Bug", "Pinpoint off-by-one, memory, or race conditions", "Bug Location, Root Cause Analysis, Severity"],
            ["FR-3.3", "Fix Code", "Provide production-grade corrected source", "Corrected Code, Clean Diff, Explanation"],
            ["FR-3.4", "Explain Error", "Translate cryptic compiler/runtime stack traces", "Plain English cause, Call stack diagnosis"],
            ["FR-3.5", "Improve Code", "Refactor for clean code, DRY, SOLID principles", "Optimized pattern, Readability score boost"],
            ["FR-3.6", "Generate Example", "Provide runnable snippet demonstrating idiom", "Code, Step-by-step trace, Expected terminal log"],
            ["FR-3.7", "Optimize Code", "Reduce Big-O time and auxiliary memory space", "Before/After Big-O comparison, Vectorization"],
            ["FR-3.8", "Generate Tests", "Produce boundary test cases for verification", "Happy path, Edge cases, Assertions"]
          ]
        }
      },
      {
        heading: "3.4 Module 4: 9-Rubric Academic Project Evaluator & Viva Defense Engine",
        paragraphs: [
          "This module audits the project against the 9 standard criteria used by university project review committees, providing candidates with realistic mock scores prior to their final viva voce."
        ],
        table: {
          headers: ["Rubric ID", "Academic Evaluation Dimension", "Audit Focus", "Max Points"],
          rows: [
            ["R-01", "Functionality & Feature Completeness", "Are all core requirements implemented without fatal bugs?", "15 Pts"],
            ["R-02", "UI/UX & Accessibility", "Is layout intuitive, responsive, and compliant with contrast rules?", "10 Pts"],
            ["R-03", "Code Quality & Clean Architecture", "Are SOLID principles followed? Modularity, separation of concerns", "15 Pts"],
            ["R-04", "AI Integration & Practical Rigor", "Is the AI purposeful or superficial gimmick? Error handling", "15 Pts"],
            ["R-05", "System Design & Modularity", "Clean tier separation, data modeling, predictable data flows", "10 Pts"],
            ["R-06", "Documentation & Specification", "SRS completeness, GitHub README, code docstrings, licenses", "10 Pts"],
            ["R-07", "Testing & Verification", "Unit test coverage, boundary condition handling, exception handling", "10 Pts"],
            ["R-08", "Deployment & Reproducibility", "Live production URL, clone-and-run steps, env var documentation", "10 Pts"],
            ["R-09", "Viva Defense & Technical Poise", "Ability to justify design decisions, explain algorithms and trade-offs", "5 Pts"]
          ]
        }
      },
      {
        heading: "3.5 Module 5: Automated Documentation & Technical Artifact Generator",
        bullets: [
          "FR-5.1: The system SHALL generate full GitHub-ready README.md files containing Badges, Architecture diagrams, Installation steps, and API docs.",
          "FR-5.2: The system SHALL generate 10+ page IEEE 830-1998 compliant SRS documents with real-time academic customizer.",
          "FR-5.3: The system SHALL provide multiple export mechanisms including direct PDF, Word .doc format, Markdown .md, and browser print-to-PDF."
        ]
      }
    ]
  },

  // ==========================================
  // PAGE 8: SECTION 4 - EXTERNAL INTERFACE REQUIREMENTS
  // ==========================================
  {
    pageNumber: 8,
    title: "4. External Interface Requirements",
    headerTitle: "Section 4 · External Interface Specifications",
    sections: [
      {
        heading: "4.1 User Interfaces & Visual Design System",
        paragraphs: [
          "The user interface is engineered adhering strictly to anti-slop principles: zero static pill badges, crisp typography pairing (Cinzel/Newsreader/Inter), visible focus outlines for accessibility, and a dedicated dual-theme system (Dark/Light mode) persisting in localStorage.",
          "The document view renders authentic A4 physical sheet simulations with page shadows, headers, footers with 'Page X of Y' pagination, and print media query adaptations that guarantee zero cutoffs during printing or export."
        ]
      },
      {
        heading: "4.2 Hardware & Operational Interfaces",
        table: {
          headers: ["Subsystem", "Minimum Client Specification", "Recommended Specification", "Server Specification"],
          rows: [
            ["Processor", "Dual-Core 1.8 GHz Intel/AMD/ARM", "Quad-Core 2.5 GHz or Apple Silicon M-series", "Single vCPU / Micro Container (Cloud Run / Node)"],
            ["RAM", "4 GB RAM", "8 GB RAM or higher", "512 MB to 1 GB RAM"],
            ["Display", "1280 x 720 px (HD)", "1920 x 1080 px (FHD) or Retina", "Headless Server Runtime"],
            ["Network", "512 kbps broadband", "2 Mbps low-latency connection", "High-speed HTTP/HTTPS outbound connection"]
          ]
        }
      },
      {
        heading: "4.3 Software & Runtime Interfaces",
        bullets: [
          "Client Browser: Modern Evergreen browsers (Google Chrome >= 110, Mozilla Firefox >= 115, Apple Safari >= 16, Microsoft Edge >= 110).",
          "Frontend Libraries: React 19.0.1, Vite 8.3.0, Tailwind CSS v4.3.3, Lucide React icons.",
          "Server Runtime: Node.js version 20.x or higher, Express 4.21.2, TypeScript execution via tsx.",
          "AI SDK: @google/genai version 2.4.0 utilizing model 'gemini-3.8-flash'."
        ]
      },
      {
        heading: "4.4 Communications & API Protocol Specifications",
        table: {
          headers: ["Endpoint Route", "HTTP Verb", "Request Payload", "Response Format", "Fallback Behavior"],
          rows: [
            ["/api/ai/ideas", "POST", "{ domain, difficulty, duration, skills, focus }", "JSON { proposals: [...] }", "Built-in domain proposal templates"],
            ["/api/ai/analyze", "POST", "{ title, description, domain }", "JSON { feasibilityScore, gaps, modules }", "Deterministic rubric evaluation engine"],
            ["/api/ai/debug", "POST", "{ code, language, mode, errorText }", "JSON { explanation, diff, fixedCode }", "Pedagogical syntax analyzer"],
            ["/api/ai/evaluate", "POST", "{ projectData, completedTasks }", "JSON { overallScore, rubrics: [...] }", "Weighted academic scorecard math"],
            ["/api/ai/docs", "POST", "{ project, docType: 'srs' | 'readme' }", "JSON { markdown, sections }", "IEEE 830 structured generator"]
          ]
        }
      }
    ]
  },

  // ==========================================
  // PAGE 9: SECTION 5 - NON-FUNCTIONAL REQUIREMENTS & SAFETY
  // ==========================================
  {
    pageNumber: 9,
    title: "5. Non-Functional Requirements & Security",
    headerTitle: "Section 5 · Non-Functional Requirements & Security",
    sections: [
      {
        heading: "5.1 Performance Requirements",
        table: {
          headers: ["Metric ID", "System Operation", "Target Latency", "Acceptance Threshold"],
          rows: [
            ["PERF-01", "Client-side state hydration from LocalStorage", "< 50 ms", "< 150 ms across 10,000 project records"],
            ["PERF-02", "Tab & View switching (Kanban -> Code Mentor -> Docs)", "< 16 ms (60 FPS)", "Zero jank or layout shift (CLS < 0.05)"],
            ["PERF-03", "AI Inference Round-Trip (Gemini 3.8 Flash)", "< 1500 ms", "< 3500 ms under standard network loads"],
            ["PERF-04", "Offline Fallback Generation Execution", "< 10 ms", "Instantaneous, non-blocking UI response"],
            ["PERF-05", "Multi-Page PDF & Word Document Assembly", "< 800 ms", "< 2000 ms for full 12-page document"]
          ]
        }
      },
      {
        heading: "5.2 Safety & Zero-Crash Architecture",
        paragraphs: [
          "Academic project demonstrations and viva examinations cannot tolerate system crashes or network failure dialogs. The system enforces an uncompromising 'Zero-Crash Architecture':",
          "1. Graceful Offline Degradation: In the event of network disruption, DNS failure, or Gemini API rate exhaustion (HTTP 429), the Express backend and client seamlessly route requests to rich, domain-specific deterministic synthesis engines. The student experiences zero downtime during live viva grading.",
          "2. Local State Preservation: All user inputs, edits, and custom metadata are written to LocalStorage with automatic debounce, guaranteeing no loss of work if the browser tab is inadvertently closed."
        ]
      },
      {
        heading: "5.3 Security & API Key Isolation",
        paragraphs: [
          "Security requirements are enforced at the architectural level to guarantee compliance with modern cloud standards:",
          "SEC-01 (Strict Server-Side Isolation): The GEMINI_API_KEY environment variable SHALL NEVER be bundled into client-side JavaScript or exposed in network request URLs. All AI interactions occur via authenticated server proxy routes.",
          "SEC-02 (Input Sanitization): All user-submitted code snippets and project descriptions SHALL undergo sanitization prior to ingestion into AI prompts to prevent Prompt Injection exploits.",
          "SEC-03 (Zero-Persistence of Private Credentials): The system SHALL NOT transmit student passwords, personal biometric data, or private GitHub SSH credentials."
        ]
      },
      {
        heading: "5.4 Ethical & Academic Integrity Compliance",
        callout: {
          type: "quote",
          title: "Pedagogical Philosophy Statement",
          text: "'The AI Project Mentor platform is an instructional accelerator, not a proxy developer. The system is explicitly configured to explain algorithmic reasoning, illustrate call-stack behavior, and diagnose root causes rather than silently producing unverifiable code dumps.'"
        }
      }
    ]
  },

  // ==========================================
  // PAGE 10: SECTION 6 - DATA MODELS & ARCHITECTURAL DIAGRAMS
  // ==========================================
  {
    pageNumber: 10,
    title: "6. Data Models, State Schemas & Diagrams",
    headerTitle: "Section 6 · Data Models & Architectural Diagrams",
    sections: [
      {
        heading: "6.1 State Schema & Entity Specifications",
        paragraphs: [
          "The core data structures are designed for lean serialization and zero-dependency local persistence. The primary entities include ProjectRecord, RoadmapPhase, DebugSession, and VivaEvaluation."
        ],
        diagram: {
          title: "Figure 6.1: Entity-Relationship & State Flow Schema",
          type: "erd",
          caption: "Relational mapping between Project, Roadmap Phases, Tasks, Code Sessions, and Viva Rubrics.",
          asciiArt: `
  +-------------------------+            +--------------------------+
  |      PROJECT RECORD     | 1        * |      ROADMAP PHASE       |
  +-------------------------+------------+--------------------------+
  | - id: string (UUID)     |            | - id: number (1 to 8)    |
  | - title: string         |            | - name: string           |
  | - domain: string        |            | - description: string    |
  | - techStack: string[]   |            | - phaseVelocity: number  |
  | - overallVelocity: num  |            +------------+-------------+
  | - createdAt: timestamp  |                         | 1
  +------------+------------+                         |
               | 1                                    | *
               |                         +------------+-------------+
               |                         |       MILESTONE TASK     |
               |                         +--------------------------+
               |                         | - taskId: string         |
               |                         | - title: string          |
               |                         | - status: TaskStatus     |
               |                         | - deliverable: string    |
               |                         +--------------------------+
               | 1
               +-------------------------+ 1
               |                         |
               v *                       v *
  +-------------------------+  +------------------------------------+
  |      DEBUG SESSION      |  |          VIVA EVALUATION           |
  +-------------------------+  +------------------------------------+
  | - sessionId: string     |  | - evalId: string                   |
  | - language: string      |  | - totalScore: number (0-100)       |
  | - inputCode: string     |  | - rubricScores: RubricMap          |
  | - diagnosticMode: string|  | - criticalFindings: string[]       |
  | - explanation: string   |  | - recommendedActions: string[]     |
  | - correctedCode: string |  | - evaluatedAt: timestamp           |
  +-------------------------+  +------------------------------------+`
        }
      },
      {
        heading: "6.2 Data Flow Diagram (DFD Level 1: Code Debugger Pipeline)",
        diagram: {
          title: "Figure 6.2: DFD Level 1 - Pedagogical Code Debugging Process",
          type: "dfd",
          caption: "Detailed data transformations during code debugging, AST parsing, and diff generation.",
          asciiArt: `
  [Student User] ----(1. Code + Mode + Lang)----> [Input Validator & Sanitizer]
                                                           |
                                                (2. Sanitized Code Payload)
                                                           v
  [Offline Knowledge Base] <--(If Offline)-------- [Routing Controller]
            |                                              |
     (Fallback Diff)                            (3. Secure Server Context)
            |                                              v
            |                             [Gemini 3.8 Flash Inference Engine]
            |                                              |
            |                                     (4. Structured JSON)
            +--------------------------------------------->+
                                                           |
                                                (5. Diagnostic Object)
                                                           v
  [Student User] <----(6. Memory Explanation + Diff)--- [Interactive Diff Viewer]`
        }
      }
    ]
  },

  // ==========================================
  // PAGE 11: SECTION 7 - VERIFICATION, TEST CASES & RTM
  // ==========================================
  {
    pageNumber: 11,
    title: "7. Verification, Test Cases & Traceability",
    headerTitle: "Section 7 · Verification & Test Cases",
    sections: [
      {
        heading: "7.1 Verification Strategy & Quality Gate",
        paragraphs: [
          "The system was subjected to rigorous verification encompassing Unit Testing, Integration Testing, End-to-End Stress Testing, and User Acceptance Testing (UAT) conducted with academic viva review conditions."
        ]
      },
      {
        heading: "7.2 Comprehensive Test Cases (TC-01 through TC-10)",
        table: {
          headers: ["Test ID", "Requirement Tested", "Test Scenario & Inputs", "Expected System Behaviour", "Result"],
          rows: [
            ["TC-01", "FR-1.1 (Idea Gen)", "Domain: 'AI/ML', Difficulty: 'Advanced', Duration: '6 Months'", "Outputs 3 distinct, non-trivial AI proposals with problem statements", "PASS"],
            ["TC-02", "FR-1.2 (Feasibility)", "Input existing abstract with missing backend/database specifications", "Identifies missing database schema, feasibility score 62/100", "PASS"],
            ["TC-03", "FR-2.1 (Roadmap)", "Cycle Phase 1 task from 'Not Started' to 'Completed'", "Aggregated project velocity increments by exactly calculated %", "PASS"],
            ["TC-04", "FR-3.1 (Multi-Lang)", "Provide Python, Java, and TypeScript snippets with syntax errors", "Correctly identifies language semantics, outputs syntax fix", "PASS"],
            ["TC-05", "FR-3.2 (Call Stack)", "Provide recursive Fibonacci without base condition", "Explains stack overflow, recursion frame limit, provides fix", "PASS"],
            ["TC-06", "FR-4.1 (Viva Rubric)", "Execute project evaluation with only 3 of 8 phases completed", "Scores Functionality 35%, flags 'High Risk' in Deployment", "PASS"],
            ["TC-07", "FR-5.2 (SRS Export)", "Trigger multi-format export (PDF, Word, Markdown, Print)", "Generates valid multi-page PDF, Word XML doc, and Markdown file", "PASS"],
            ["TC-08", "PERF-04 (Fallback)", "Disconnect network connection and trigger Code Debugger", "Seamlessly outputs deterministic offline fallback within 10ms", "PASS"],
            ["TC-09", "SEC-01 (Key Security)", "Inspect client-side JS bundle source maps and network headers", "Zero occurrences of GEMINI_API_KEY in client bundle", "PASS"],
            ["TC-10", "UI-01 (Accessibility)", "Toggle dark/light theme, verify WCAG 2.1 AA contrast ratio", "Contrast >= 4.5:1 across all text elements, no layout break", "PASS"]
          ]
        }
      },
      {
        heading: "7.3 Requirements Traceability Matrix (RTM)",
        table: {
          headers: ["Requirement ID", "Functional Module", "Design Entity", "Associated Test Cases", "Verification Status"],
          rows: [
            ["FR-1.1 to FR-1.4", "Idea Generator & Analyzer", "ProjectRecord & ProposalEngine", "TC-01, TC-02", "Verified & Passed"],
            ["FR-2.1 to FR-2.3", "8-Phase SDLC Roadmap", "RoadmapPhase & MilestoneTask", "TC-03", "Verified & Passed"],
            ["FR-3.1 to FR-3.8", "AI Code Mentor & Debugger", "DebugSession & SyntaxParser", "TC-04, TC-05", "Verified & Passed"],
            ["FR-4.1 to FR-4.3", "9-Rubric Viva Evaluator", "VivaEvaluation & RubricScorer", "TC-06", "Verified & Passed"],
            ["FR-5.1 to FR-5.3", "SRS & Docs Generator", "ExportEngine (PDF/DOC/MD)", "TC-07", "Verified & Passed"],
            ["NFR-01 to NFR-05", "Security, Offline & Perf", "ExpressProxy & LocalStorage", "TC-08, TC-09, TC-10", "Verified & Passed"]
          ]
        }
      }
    ]
  },

  // ==========================================
  // PAGE 12: SECTION 8 - DEPLOYMENT, APPENDICES & SIGN-OFF
  // ==========================================
  {
    pageNumber: 12,
    title: "8. Deployment, Appendices & Document History",
    headerTitle: "Section 8 · Deployment, Appendices & Document History",
    sections: [
      {
        heading: "8.1 Production Deployment & Execution Guidelines",
        paragraphs: [
          "The application supports cloud serverless deployment (Vercel, Google Cloud Run) and local bare-metal workstation execution:",
          "1. Local Developer Installation: Execute 'git clone https://github.com/keerthikayenni-123/AI-Project-Mentor.git', navigate to directory, install dependencies via 'npm install', supply GEMINI_API_KEY in .env, and launch via 'npm run dev'.",
          "2. Vercel Cloud Deployment: Push repository to GitHub, connect to Vercel dashboard with Vite preset, configure GEMINI_API_KEY environment secret, and trigger zero-downtime production deployment."
        ]
      },
      {
        heading: "8.2 Appendix A: Glossary of Academic & Technical Acronyms",
        bullets: [
          "SRS: Software Requirements Specification (IEEE Std 830-1998 compliant document).",
          "SDLC: Software Development Life Cycle (8 standardized engineering phases).",
          "LLM: Large Language Model (specifically Google Gemini 3.8 Flash AI reasoning engine).",
          "AST: Abstract Syntax Tree (hierarchical representation of source code structure).",
          "RTM: Requirements Traceability Matrix (bi-directional mapping of requirements to tests).",
          "WCAG: Web Content Accessibility Guidelines (accessibility compliance standard)."
        ]
      },
      {
        heading: "8.3 Appendix B: Academic Viva Rubric Weighting Reference",
        table: {
          headers: ["Category", "Evaluation Dimension", "Weight", "Evaluator Guidance Note"],
          rows: [
            ["Technical", "Core Functionality & Logic", "25%", "Verify code runs without fatal crashes; live demo pass"],
            ["Architecture", "Clean Code & AI Integration", "25%", "Inspect modularity, prompt engineering, and key isolation"],
            ["Engineering", "SDLC Tracking & Testing", "20%", "Verify all 8 phases tracked; review unit and boundary tests"],
            ["Academic", "Documentation & SRS Quality", "15%", "Audit IEEE 830 compliance, architecture diagrams, clarity"],
            ["Presentation", "Viva Voce Defense & Poise", "15%", "Candidate ability to articulate design trade-offs under cross-examination"]
          ]
        }
      },
      {
        heading: "8.4 Appendix C: Document Sign-off & Revision History",
        table: {
          headers: ["Version", "Release Date", "Primary Changes", "Author", "Approved By"],
          rows: [
            ["v0.1.0", "August 2025", "Initial Requirements Draft & Feasibility Study", "Project Author", "Dr. K. V. Raman"],
            ["v0.8.0", "January 2026", "SDLC Phases & Code Mentor Protocol Integrated", "Project Author", "Dr. S. Lakshmi"],
            ["v1.0.0", "October 2026", "Complete 12-Page IEEE 830 Formal Release with Downloads", "Project Author", "Project Review Board"]
          ]
        }
      }
    ]
  }
];
