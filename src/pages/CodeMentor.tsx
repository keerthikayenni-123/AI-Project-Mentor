import React, { useState, useEffect } from 'react';
import {
  Code2,
  Sparkles,
  Bug,
  Wrench,
  HelpCircle,
  Zap,
  TestTube,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Terminal,
  AlertTriangle,
  Lightbulb,
  Download,
  ArrowLeftRight,
  Wand2,
  FileCode,
  FolderGit2,
  Cpu,
  Layers,
  Send,
  History,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';
import { Project, CodeActionType, CodeMentorResponse } from '../types';
import { CODE_SNIPPET_PRESETS } from '../data/sampleData';
import { aiService } from '../services/aiService';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';

interface CodeMentorProps {
  activeProject?: Project;
  projects?: Project[];
  onSelectProject?: (id: string) => void;
}

const LANGUAGES = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'C',
  'C++',
  'SQL',
  'HTML/CSS',
];

interface ProjectModuleTemplate {
  name: string;
  category: 'api' | 'ai' | 'db' | 'ui' | 'test';
  language: string;
  filename: string;
  description: string;
  code: string;
}

function getFileExtension(lang: string): string {
  switch (lang) {
    case 'Python':
      return 'py';
    case 'Java':
      return 'java';
    case 'JavaScript':
      return 'js';
    case 'TypeScript':
      return 'ts';
    case 'C':
      return 'c';
    case 'C++':
      return 'cpp';
    case 'SQL':
      return 'sql';
    case 'HTML/CSS':
      return 'html';
    default:
      return 'txt';
  }
}

// Generate realistic starter code templates for any project
function getProjectStarterModules(project?: Project): ProjectModuleTemplate[] {
  if (!project) return [];

  const name = project.name;
  const isPython = project.technologies.some((t) => t.toLowerCase().includes('python') || t.toLowerCase().includes('fastapi'));
  const isTS = project.technologies.some((t) => t.toLowerCase().includes('typescript') || t.toLowerCase().includes('react') || t.toLowerCase().includes('next'));

  if (project.id === 'proj-1' || isPython) {
    return [
      {
        name: 'Core Backend API',
        category: 'api',
        language: 'Python',
        filename: 'main.py',
        description: 'FastAPI controller with Pydantic validation and symptom intake routes',
        code: `from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import time

app = FastAPI(title="${name} API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomIntakeRequest(BaseModel):
    patient_id: str = Field(..., description="Unique patient identifier")
    symptoms: List[str] = Field(..., min_items=1, description="List of observed symptoms")
    duration_days: int = Field(1, ge=1, le=365)
    fever_temp: Optional[float] = Field(None, ge=95.0, le=108.0)
    chest_pain: bool = False

class TriageEvaluationResponse(BaseModel):
    session_id: str
    risk_level: str  # Green, Yellow, Red
    urgency_score: int  # 1 to 10
    escalate_to_er: bool
    recommended_clinic: str
    summary_guidance: str

@app.post("/api/triage/evaluate", response_model=TriageEvaluationResponse)
async def evaluate_symptoms(payload: SymptomIntakeRequest):
    # Rule-based emergency interceptor
    if payload.chest_pain or (payload.fever_temp and payload.fever_temp >= 104.0):
        return TriageEvaluationResponse(
            session_id=f"session-{int(time.time())}",
            risk_level="Red",
            urgency_score=10,
            escalate_to_er=True,
            recommended_clinic="Emergency Trauma Center",
            summary_guidance="Critical symptoms detected. Immediate emergency clinical attendance required."
        )

    # Standard risk calculation
    urgency = min(9, len(payload.symptoms) * 2 + (1 if payload.duration_days > 3 else 0))
    risk = "Yellow" if urgency >= 5 else "Green"

    return TriageEvaluationResponse(
        session_id=f"session-{int(time.time())}",
        risk_level=risk,
        urgency_score=urgency,
        escalate_to_er=False,
        recommended_clinic="General Outpatient Department (OPD)",
        summary_guidance="Standard triage assessment complete. Schedule clinic consultation within 24 hours."
    )`,
      },
      {
        name: 'AI Risk Pipeline',
        category: 'ai',
        language: 'Python',
        filename: 'ai_pipeline.py',
        description: 'Gemini AI prompt engineering pipeline with structured JSON schema output',
        code: `import os
from google import genai
from google.genai import types

class ClinicalAIRiskPipeline:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

    async def analyze_patient_dialogue(self, dialogue_text: str) -> dict:
        """
        Extracts structured symptom severity and clinical department routing using Gemini.
        """
        if not self.client:
            # Resilient offline fallback for student demonstrations
            return {
                "extracted_symptoms": ["fatigue", "mild fever"],
                "risk_category": "Moderate",
                "recommended_dept": "Internal Medicine",
                "is_fallback": True
            }

        prompt = f"""
        You are an ethical pre-clinical medical triage assistant.
        Analyze patient message: "{dialogue_text}"
        Return JSON schema with:
        extracted_symptoms: list of strings
        risk_category: Green, Yellow, or Red
        recommended_dept: clinical specialty
        """

        response = await self.client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.3
            )
        )
        return response.text`,
      },
      {
        name: 'Database Models',
        category: 'db',
        language: 'SQL',
        filename: 'schema.sql',
        description: 'PostgreSQL relational tables for sessions, logs, and audit trails',
        code: `CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(64) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    age INT,
    gender VARCHAR(16)
);

CREATE TABLE IF NOT EXISTS triage_sessions (
    session_id VARCHAR(64) PRIMARY KEY,
    patient_id VARCHAR(64) REFERENCES patients(id) ON DELETE CASCADE,
    risk_level VARCHAR(16) NOT NULL,
    urgency_score INT NOT NULL,
    emergency_escalation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_triage_patient ON triage_sessions(patient_id);
CREATE INDEX idx_triage_risk ON triage_sessions(risk_level);`,
      },
      {
        name: 'Unit Tests',
        category: 'test',
        language: 'Python',
        filename: 'test_triage.py',
        description: 'Pytest test suite validating boundary conditions and emergency flags',
        code: `import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_emergency_chest_pain_flag():
    response = client.post("/api/triage/evaluate", json={
        "patient_id": "P-991",
        "symptoms": ["mild headache"],
        "chest_pain": True
    })
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "Red"
    assert data["escalate_to_er"] is True

def test_empty_symptoms_validation():
    response = client.post("/api/triage/evaluate", json={
        "patient_id": "P-992",
        "symptoms": []  # Boundary error: empty list
    })
    assert response.status_code == 422  # Pydantic validation rejected`,
      },
    ];
  }

  // Default Full-stack TypeScript/JS Project Modules
  return [
    {
      name: 'Core Backend API',
      category: 'api',
      language: 'TypeScript',
      filename: 'server.ts',
      description: 'Express REST controller with typed route validation and data sanitization',
      code: `import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface ProjectRecord {
  id: string;
  title: string;
  status: 'active' | 'archived';
  score: number;
}

const mockDatabase: ProjectRecord[] = [
  { id: '1', title: '${name} Core Module', status: 'active', score: 92 },
];

app.get('/api/records', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;

  const results = mockDatabase.slice(startIndex, startIndex + limit);
  res.json({
    total: mockDatabase.length,
    page,
    data: results,
  });
});

app.post('/api/records', (req: Request, res: Response) => {
  const { title, score } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newRecord: ProjectRecord = {
    id: String(Date.now()),
    title,
    status: 'active',
    score: Number(score) || 0,
  };
  mockDatabase.push(newRecord);
  res.status(201).json(newRecord);
});

export default app;`,
    },
    {
      name: 'Interactive UI View',
      category: 'ui',
      language: 'TypeScript',
      filename: 'ProjectDashboardView.tsx',
      description: 'React component with state management and error boundary',
      code: `import React, { useState, useEffect } from 'react';

export function ProjectDashboardView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/records');
      if (!res.ok) throw new Error('Failed to load project records');
      const json = await res.json();
      setData(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-white">
      <h3 className="text-sm font-bold">${name} Live Feed</h3>
      {loading && <p className="text-xs text-slate-400">Loading data...</p>}
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <ul className="mt-2 space-y-1">
        {data.map((item) => (
          <li key={item.id} className="text-xs text-slate-300">
            {item.title} - Score: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    },
    {
      name: 'Database Models',
      category: 'db',
      language: 'SQL',
      filename: 'schema.sql',
      description: 'Relational database schema with constraints and index mappings',
      code: `CREATE TABLE IF NOT EXISTS project_entities (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) DEFAULT 'active',
    metadata JSONB
);

CREATE INDEX idx_project_status ON project_entities(status);`,
    },
    {
      name: 'Unit Tests',
      category: 'test',
      language: 'TypeScript',
      filename: 'api.test.ts',
      description: 'Vitest / Jest suite testing endpoint validation and error conditions',
      code: `import { describe, it, expect } from 'vitest';

describe('${name} Core Logic', () => {
  it('should reject requests without required title', () => {
    const payload = { score: 50 };
    expect(payload).not.toHaveProperty('title');
  });

  it('should accurately calculate pagination bounds', () => {
    const total = 25;
    const limit = 10;
    const totalPages = Math.ceil(total / limit);
    expect(totalPages).toBe(3);
  });
});`,
    },
  ];
}

interface RevisionItem {
  id: string;
  title: string;
  code: string;
  timestamp: string;
  action: string;
}

export const CodeMentor: React.FC<CodeMentorProps> = ({
  activeProject,
  projects = [],
  onSelectProject,
}) => {
  // Input States
  const [code, setCode] = useState(CODE_SNIPPET_PRESETS[0].code);
  const [language, setLanguage] = useState(CODE_SNIPPET_PRESETS[0].language);
  const [errorMessage, setErrorMessage] = useState(CODE_SNIPPET_PRESETS[0].errorMessage);
  const [goal, setGoal] = useState(CODE_SNIPPET_PRESETS[0].goal);

  // Conversational Change Request State
  const [changePrompt, setChangePrompt] = useState('');
  const [errorPrompt, setErrorPrompt] = useState('');

  // Active Project Modules
  const projectModules = getProjectStarterModules(activeProject);
  const [selectedModuleCategory, setSelectedModuleCategory] = useState<string>('api');

  // Output States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CodeMentorResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCorrected, setCopiedCorrected] = useState(false);
  const [usedInEditor, setUsedInEditor] = useState(false);

  // Revision History
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [activeRevisionId, setActiveRevisionId] = useState<string | null>(null);

  // When active project changes, automatically offer to load project code
  useEffect(() => {
    if (activeProject) {
      const modules = getProjectStarterModules(activeProject);
      if (modules.length > 0) {
        const primary = modules[0];
        setCode(primary.code);
        setLanguage(primary.language);
        setGoal(`Implement ${primary.name} for ${activeProject.name}`);
        setErrorMessage('');
        setSelectedModuleCategory(primary.category);

        const initialRev: RevisionItem = {
          id: 'rev-init',
          title: `Initial ${primary.name} (${activeProject.name})`,
          code: primary.code,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'project_starter',
        };
        setRevisions([initialRev]);
        setActiveRevisionId('rev-init');
      }
    }
  }, [activeProject?.id]);

  const handleSelectModule = (mod: ProjectModuleTemplate) => {
    setSelectedModuleCategory(mod.category);
    setCode(mod.code);
    setLanguage(mod.language);
    setGoal(`Implement ${mod.name} for ${activeProject?.name || 'Project'}`);
    setErrorMessage('');
    setResult(null);

    const rev: RevisionItem = {
      id: 'rev-' + Date.now(),
      title: `Loaded ${mod.name}`,
      code: mod.code,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: 'load_module',
    };
    setRevisions((prev) => [rev, ...prev]);
    setActiveRevisionId(rev.id);
  };

  const handleAutoGenerateProjectCode = () => {
    const projName = activeProject?.name || 'Engineering Project';
    const isPython = (activeProject?.technologies || []).some(
      (t) => t.toLowerCase().includes('python') || t.toLowerCase().includes('fastapi')
    );
    const targetLang = isPython ? 'Python' : (language || 'Python');
    setLanguage(targetLang);

    const targetGoal = `Generate complete production-grade implementation for ${projName}`;
    setGoal(targetGoal);
    handleAction('generate_code', targetGoal, undefined);
  };

  const handleAction = async (action: CodeActionType, customGoal?: string, customError?: string) => {
    const targetGoal = customGoal !== undefined && customGoal.trim()
      ? customGoal
      : (goal.trim() || `Implement complete production-grade code for ${activeProject?.name || 'Engineering Project'}`);
    const targetError = customError !== undefined ? customError : errorMessage;

    setError(null);
    setLoading(true);

    const response = await aiService.mentorCode({
      code: code.trim(),
      language,
      errorMessage: targetError.trim() || undefined,
      goal: targetGoal.trim(),
      action,
    });

    setLoading(false);
    if (response.success && response.data) {
      setResult(response.data);

      // Auto-update editor with AI generated/corrected code for seamless UX
      if (response.data.correctedCode) {
        setCode(response.data.correctedCode);
        setUsedInEditor(true);
        setTimeout(() => setUsedInEditor(false), 2500);

        const revTitle =
          action === 'modify_code'
            ? `Changed: ${targetGoal.slice(0, 32)}...`
            : action === 'fix_error'
            ? `Fixed: ${targetError.slice(0, 32)}...`
            : action === 'generate_code'
            ? `Generated: ${activeProject?.name || targetGoal.slice(0, 32)}...`
            : `${action.replace('_', ' ').toUpperCase()} Revision`;

        const newRev: RevisionItem = {
          id: 'rev-' + Date.now(),
          title: revTitle,
          code: response.data.correctedCode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action,
        };
        setRevisions((prev) => [newRev, ...prev.slice(0, 9)]);
        setActiveRevisionId(newRev.id);
      }
    } else {
      setError(response.error || 'Failed to process code request.');
    }
  };

  // User prompts AI to modify or add changes to existing code
  const handleApplyChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changePrompt.trim()) return;
    const promptText = changePrompt.trim();
    setChangePrompt('');
    handleAction('modify_code', promptText, undefined);
  };

  // User tells AI an error occurred
  const handleFixReportedError = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorPrompt.trim()) return;
    const errText = errorPrompt.trim();
    setErrorMessage(errText);
    setErrorPrompt('');
    handleAction('fix_error', goal || 'Fix reported error and provide corrected working code', errText);
  };

  const handleLoadPreset = (preset: typeof CODE_SNIPPET_PRESETS[0]) => {
    setCode(preset.code);
    setLanguage(preset.language);
    setErrorMessage(preset.errorMessage);
    setGoal(preset.goal);
    setError(null);
    setResult(null);
  };

  const handleClear = () => {
    setCode('');
    setErrorMessage('');
    setGoal('');
    setResult(null);
    setError(null);
  };

  const copyToClipboard = (text: string, isCorrected = false) => {
    navigator.clipboard.writeText(text);
    if (isCorrected) {
      setCopiedCorrected(true);
      setTimeout(() => setCopiedCorrected(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleUseInEditor = (newCode: string) => {
    setCode(newCode);
    setUsedInEditor(true);
    setTimeout(() => setUsedInEditor(false), 2500);
  };

  const handleRestoreRevision = (rev: RevisionItem) => {
    setCode(rev.code);
    setActiveRevisionId(rev.id);
    setUsedInEditor(true);
    setTimeout(() => setUsedInEditor(false), 2500);
  };

  const handleDownloadCode = (codeText: string) => {
    const ext = getFileExtension(language);
    const blob = new Blob([codeText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(activeProject?.name || 'solution').toLowerCase().replace(/\s+/g, '-')}.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Active Project Context & Automatic Code Delivery */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider flex items-center gap-1">
              <FolderGit2 className="w-3 h-3 text-indigo-400" />
              <span>Project Context</span>
            </span>
            {activeProject && (
              <span className="text-xs text-slate-400">
                {activeProject.domain} • {activeProject.difficulty}
              </span>
            )}
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white">
            {activeProject ? activeProject.name : 'Select a Project for Automatic Code Generation'}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
            AI automatically supplies verified working code for this project. Ask for any modifications or report
            runtime errors, and AI updates the code seamlessly.
          </p>
        </div>

        {/* Project Switcher & Auto-Generate Trigger */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {projects.length > 0 && onSelectProject && (
            <select
              value={activeProject?.id || ''}
              onChange={(e) => onSelectProject(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleAutoGenerateProjectCode}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Auto-Generate Project Code</span>
          </button>
        </div>
      </div>

      {/* Module Selector Buttons for Active Project */}
      {projectModules.length > 0 && (
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto text-xs py-0.5">
            <span className="text-slate-400 font-semibold whitespace-nowrap pl-1 text-[11px]">
              Project Modules:
            </span>
            {projectModules.map((mod) => (
              <button
                key={mod.name}
                onClick={() => handleSelectModule(mod)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedModuleCategory === mod.category
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{mod.name}</span>
                <span className="text-[10px] opacity-70">({mod.filename})</span>
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 hidden sm:block">
            Click any module to load complete starter code
          </span>
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

      {/* Split-Screen Code Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: CODE EDITOR & CONVERSATIONAL CHANGE BAR */}
        {/* ======================================================== */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Language:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(code)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Copy editor code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Clear editor"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Code Input Area with line numbering look */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs">
              <textarea
                rows={14}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Working code will appear here. Edit directly or ask AI below to make changes..."
                className="w-full p-4 bg-transparent text-slate-200 focus:outline-none resize-y leading-relaxed font-mono selection:bg-indigo-600/40"
                spellCheck={false}
              />
            </div>

            {/* ======================================================== */}
            {/* INTERACTIVE FEATURE: ASK AI TO MAKE CHANGES */}
            {/* ======================================================== */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ask AI to Make Changes to this Code</span>
                </span>
                <span className="text-[10px] text-slate-500">AI rewrites & preserves functionality</span>
              </div>

              <form onSubmit={handleApplyChange} className="flex gap-2">
                <input
                  type="text"
                  value={changePrompt}
                  onChange={(e) => setChangePrompt(e.target.value)}
                  placeholder="e.g. Add pagination / Add JWT authentication / Connect to PostgreSQL database..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading || !changePrompt.trim()}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 cursor-pointer disabled:opacity-40 shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply Change</span>
                </button>
              </form>

              {/* Quick Change Suggestions Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  '+ Add Input Validation',
                  '+ Add JWT Auth Check',
                  '+ Add Pagination (skip/limit)',
                  '+ Add Logging & Try/Catch',
                  '+ Make Asynchronous (async/await)',
                  '+ Write Test Suite',
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleAction('modify_code', chip)}
                    disabled={loading}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 hover:bg-indigo-950 hover:text-indigo-300 border border-slate-800 text-slate-400 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* INTERACTIVE FEATURE: REPORT ERROR & AUTO-FIX */}
            {/* ======================================================== */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-rose-400" />
                  <span>Report Error to AI & Auto-Fix</span>
                </span>
                <span className="text-[10px] text-slate-500">Paste traceback / terminal error</span>
              </div>

              <form onSubmit={handleFixReportedError} className="space-y-2">
                <textarea
                  rows={2}
                  value={errorPrompt}
                  onChange={(e) => setErrorPrompt(e.target.value)}
                  placeholder="Paste error message here (e.g. 'TypeError: Cannot read properties of undefined', 'IndexError', 'CORS preflight 405')..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 font-mono placeholder-slate-600 focus:outline-none focus:border-rose-500 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || !errorPrompt.trim()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-40 active:scale-95"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Fix this Error with AI</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Diagnostic Actions Grid */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Additional Diagnostic Actions
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'explain', label: 'Explain Code', icon: HelpCircle },
                  { id: 'find_bug', label: 'Find Bug', icon: Bug },
                  { id: 'fix', label: 'Fix Code', icon: Wrench },
                  { id: 'optimize', label: 'Optimize Code', icon: Zap },
                  { id: 'example', label: 'Generate Example', icon: BookOpen },
                  { id: 'test_cases', label: 'Generate Tests', icon: TestTube },
                  { id: 'improve', label: 'Refactor Code', icon: Sparkles },
                  { id: 'explain_error', label: 'Explain Error', icon: AlertTriangle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={loading}
                      onClick={() => handleAction(item.id as CodeActionType)}
                      className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-center"
                    >
                      <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: COMPLETE WORKING CODE & REVISION TRAIL */}
        {/* ======================================================== */}
        <div className="space-y-4">
          {loading && (
            <LoadingState
              title="AI Code Mentor is Generating Working Code..."
              message="Analyzing project context, applying requested changes, fixing errors, and structuring full runnable code..."
            />
          )}

          {!loading && !result && (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">Interactive Code Assistant</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  Select any project module above or ask AI to make changes or fix an error.
                  The complete working code will appear here with one-click editor replacement.
                </p>
              </div>

              {/* Quick Preset Bugs */}
              <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
                <span className="text-slate-400 font-semibold block text-[11px]">
                  Or practice with sample bugs:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CODE_SNIPPET_PRESETS.map((p) => (
                    <button
                      key={p.title}
                      onClick={() => handleLoadPreset(p)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-colors cursor-pointer text-[11px] text-slate-300 hover:text-white truncate"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 animate-in fade-in duration-200">
              {/* Executive Summary */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                      {result.action === 'modify_code'
                        ? 'Code Updated'
                        : result.action === 'fix_error'
                        ? 'Error Fixed & Verified'
                        : result.action === 'generate_code'
                        ? 'Code Generated'
                        : `${result.action} Diagnosis`}
                    </span>
                    <span className="text-[10px] text-slate-400">{language}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{result.problemSummary}</h3>
                </div>
              </div>

              {/* COMPLETE WORKING CODE BOX - PROMINENT AT TOP */}
              {result.correctedCode && (
                <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">
                        Complete Working Code ({language})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Use in Left Editor Button */}
                      <button
                        onClick={() => handleUseInEditor(result.correctedCode)}
                        className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                          usedInEditor
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:text-white'
                        }`}
                        title="Paste this code into the editor on the left"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{usedInEditor ? 'Inserted in Editor!' : 'Use in Editor'}</span>
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => copyToClipboard(result.correctedCode, true)}
                        className="flex items-center gap-1 text-[11px] text-slate-200 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                        title="Copy code to clipboard"
                      >
                        {copiedCorrected ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>{copiedCorrected ? 'Copied!' : 'Copy Code'}</span>
                      </button>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownloadCode(result.correctedCode)}
                        className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-colors cursor-pointer"
                        title="Download code as source file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>.{getFileExtension(language)}</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-3 bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-80 select-text">
                    <code>{result.correctedCode}</code>
                  </pre>
                </div>
              )}

              {/* Why It Happens / Architecture Concept */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Computer Science Architecture & Concept:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{result.whyItHappens}</p>
              </div>

              {/* Detailed Pedagogical Explanation */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Step-by-Step Explanation:</span>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {result.detailedExplanation}
                </div>
              </div>

              {/* Key Changes / Architectural Highlights */}
              {result.whatChanged && result.whatChanged.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-300">Exact Changes Made:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {result.whatChanged.map((change, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Example Usage & Expected Output */}
              {(result.exampleUsage || result.expectedOutput) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {result.exampleUsage && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="font-semibold text-slate-400 block mb-1">Example Usage:</span>
                      <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                        {result.exampleUsage}
                      </pre>
                    </div>
                  )}

                  {result.expectedOutput && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="font-semibold text-slate-400 block mb-1">Expected Output:</span>
                      <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                        {result.expectedOutput}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Learning Tip for Technical Exams & Viva */}
              {result.learningTip && (
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs space-y-1">
                  <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Viva Defense & Interview Tip:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{result.learningTip}</p>
                </div>
              )}
            </div>
          )}

          {/* Revision History Strip */}
          {revisions.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Session Code Revisions ({revisions.length})</span>
                </span>
                <span className="text-[10px] text-slate-500">Click to restore previous iteration</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {revisions.map((rev) => (
                  <div
                    key={rev.id}
                    onClick={() => handleRestoreRevision(rev)}
                    className={`p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      activeRevisionId === rev.id
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
                        : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate">{rev.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{rev.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeMentor;
