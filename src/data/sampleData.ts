import { Project, Task, RecentActivity } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'AI Medical Symptom Triage Chatbot',
    description: 'A conversational agent for pre-clinical triage that collects patient symptoms, calculates preliminary risk scores, and routes to appropriate emergency or clinic departments.',
    domain: 'Healthcare',
    difficulty: 'Intermediate',
    technologies: ['Python', 'FastAPI', 'React', 'TailwindCSS', 'Gemini API', 'PostgreSQL'],
    status: 'Development',
    progress: 58,
    startDate: '2026-09-01',
    targetDate: '2026-11-15',
    teamSize: '3 Members',
    githubUrl: 'https://github.com/keerthika/ai-medical-triage',
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-28T14:30:00.000Z',
  },
  {
    id: 'proj-2',
    name: 'Smart Campus Attendance Prediction System',
    description: 'Predictive analytics platform analyzing student attendance patterns, alerting faculty early regarding attendance shortages, and predicting exam eligibility risk.',
    domain: 'Education',
    difficulty: 'Beginner',
    technologies: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'SQLite'],
    status: 'Completed',
    progress: 100,
    startDate: '2026-07-10',
    targetDate: '2026-08-25',
    teamSize: 'Individual',
    githubUrl: 'https://github.com/keerthika/campus-attendance-pred',
    createdAt: '2026-07-10T09:00:00.000Z',
    updatedAt: '2026-08-25T16:00:00.000Z',
  },
  {
    id: 'proj-3',
    name: 'Personal Finance & Expense Tracker with AI Insights',
    description: 'Web dashboard that parses digital bank statements, categorizes spending, forecasts monthly end balances, and suggests actionable personalized budgeting recommendations.',
    domain: 'FinTech',
    difficulty: 'Intermediate',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'Chart.js'],
    status: 'Planning',
    progress: 15,
    startDate: '2026-10-01',
    targetDate: '2026-12-05',
    teamSize: '2 Members',
    githubUrl: '',
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-10-02T11:20:00.000Z',
  },
  {
    id: 'proj-4',
    name: 'AI Resume & Technical Portfolio Analyzer for Engineering Students',
    description: 'Evaluates engineering student resumes and capstone projects across all engineering disciplines against technical job roles, highlighting skill gaps, formatting bugs, and recommended showcase projects to build.',
    domain: 'Career & Assistive Tech',
    difficulty: 'Advanced',
    technologies: ['Next.js', 'TypeScript', 'Python', 'LangChain', 'Gemini API', 'TailwindCSS'],
    status: 'Development',
    progress: 72,
    startDate: '2026-08-15',
    targetDate: '2026-10-30',
    teamSize: '4 Members',
    githubUrl: 'https://github.com/student/engineering-portfolio-ai',
    createdAt: '2026-08-15T12:00:00.000Z',
    updatedAt: '2026-10-01T17:45:00.000Z',
  },
  {
    id: 'proj-5',
    name: 'Autonomous EV Battery Thermal Management & Fault Prognosis',
    description: 'Real-time multi-sensor embedded monitoring system predicting thermal runaway, state of charge (SoC), and cell degradation in electric vehicle battery packs.',
    domain: 'Electric Vehicles & Mechanical/EEE',
    difficulty: 'Advanced',
    technologies: ['Python', 'Embedded C', 'IoT Sensors', 'CAN Bus', 'PyTorch', 'FastAPI'],
    status: 'Development',
    progress: 55,
    startDate: '2026-09-01',
    targetDate: '2026-12-15',
    teamSize: '3 Members',
    githubUrl: 'https://github.com/student/ev-battery-thermal-ai',
    createdAt: '2026-09-01T09:00:00.000Z',
    updatedAt: '2026-10-01T15:30:00.000Z',
  },
  {
    id: 'proj-6',
    name: 'Smart Structural Health Monitoring & Crack Detection using IoT & Edge Vision',
    description: 'Automated civil infrastructure health monitoring platform using vibration accelerometers, ultrasonic sensors, and drone imagery for bridge and high-rise safety audit.',
    domain: 'Civil & Smart Infrastructure',
    difficulty: 'Intermediate',
    technologies: ['Raspberry Pi', 'OpenCV', 'Python', 'PostgreSQL', 'MQTT', 'React'],
    status: 'Planning',
    progress: 25,
    startDate: '2026-09-20',
    targetDate: '2026-12-20',
    teamSize: '3 Members',
    githubUrl: 'https://github.com/student/civil-structural-health',
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-10-02T08:15:00.000Z',
  },
];

export const INITIAL_TASKS: Task[] = [
  // For proj-1 (Medical Chatbot)
  {
    id: 'task-101',
    projectId: 'proj-1',
    phaseId: 'phase-1',
    phaseName: 'Phase 1 — Requirement Analysis',
    title: 'Gather Clinical Triage Protocols & Ethical Constraints',
    description: 'Document disclaimer policies, emergency escalation protocols, and HIPAA/data privacy compliance requirements.',
    priority: 'High',
    status: 'Completed',
    estimatedTime: '4 days',
    dueDate: '2026-09-05',
  },
  {
    id: 'task-102',
    projectId: 'proj-1',
    phaseId: 'phase-1',
    phaseName: 'Phase 1 — Requirement Analysis',
    title: 'Formulate User Personas and Chatbot Interaction Flow',
    description: 'Map out the decision tree for pediatric, adult, and elderly symptom intake scenarios.',
    priority: 'Medium',
    status: 'Completed',
    estimatedTime: '2 days',
    dueDate: '2026-09-08',
  },
  {
    id: 'task-103',
    projectId: 'proj-1',
    phaseId: 'phase-2',
    phaseName: 'Phase 2 — UI/UX Design & Architecture',
    title: 'Design Responsive Patient Chat Interface in Figma',
    description: 'Create mobile-first layout with high-contrast accessibility and clean chat bubbles.',
    priority: 'Medium',
    status: 'Completed',
    estimatedTime: '3 days',
    dueDate: '2026-09-12',
  },
  {
    id: 'task-104',
    projectId: 'proj-1',
    phaseId: 'phase-3',
    phaseName: 'Phase 3 — Database & Data Layer',
    title: 'Design PostgreSQL Schema for Sessions & Symptom Logs',
    description: 'Create normalized tables for patients, conversation history, and risk assessment tags.',
    priority: 'High',
    status: 'Completed',
    estimatedTime: '3 days',
    dueDate: '2026-09-16',
  },
  {
    id: 'task-105',
    projectId: 'proj-1',
    phaseId: 'phase-4',
    phaseName: 'Phase 4 — Core Backend / APIs',
    title: 'Build FastAPI Endpoints for Chat Session & History',
    description: 'Implement REST endpoints with Pydantic validation, CORS, and rate limiting.',
    priority: 'High',
    status: 'Completed',
    estimatedTime: '5 days',
    dueDate: '2026-09-22',
  },
  {
    id: 'task-106',
    projectId: 'proj-1',
    phaseId: 'phase-5',
    phaseName: 'Phase 5 — AI Integration & Logic',
    title: 'Integrate Gemini API with Clinical System Prompt',
    description: 'Implement structured JSON schema output for risk level (Green, Yellow, Red) and department routing.',
    priority: 'High',
    status: 'In Progress',
    estimatedTime: '4 days',
    dueDate: '2026-10-06',
  },
  {
    id: 'task-107',
    projectId: 'proj-1',
    phaseId: 'phase-5',
    phaseName: 'Phase 5 — AI Integration & Logic',
    title: 'Add Red-Flag Symptom Keyword Safety Interceptor',
    description: 'Hardcoded rule-based safety net to immediately trigger emergency warning (chest pain, acute stroke signs).',
    priority: 'High',
    status: 'In Progress',
    estimatedTime: '2 days',
    dueDate: '2026-10-09',
  },
  {
    id: 'task-108',
    projectId: 'proj-1',
    phaseId: 'phase-6',
    phaseName: 'Phase 6 — Testing & Quality Assurance',
    title: 'Unit Test Triage Logic with 50 Synthetic Case Scenarios',
    description: 'Write Pytest suite checking edge cases, boundary conditions, and mock API failures.',
    priority: 'Medium',
    status: 'Not Started',
    estimatedTime: '4 days',
    dueDate: '2026-10-18',
  },
  {
    id: 'task-109',
    projectId: 'proj-1',
    phaseId: 'phase-7',
    phaseName: 'Phase 7 — Documentation & Polish',
    title: 'Generate Complete Architecture Diagram & README.md',
    description: 'Use the AI documentation tool to build comprehensive project report and API specs.',
    priority: 'Medium',
    status: 'Not Started',
    estimatedTime: '3 days',
    dueDate: '2026-10-25',
  },
  {
    id: 'task-110',
    projectId: 'proj-1',
    phaseId: 'phase-8',
    phaseName: 'Phase 8 — Deployment & Presentation',
    title: 'Deploy to Cloud Run / Vercel & Prepare PPT Presentation',
    description: 'Configure automated CI/CD pipeline and prepare 10-slide viva defense presentation.',
    priority: 'High',
    status: 'Not Started',
    estimatedTime: '3 days',
    dueDate: '2026-11-05',
  },

  // For proj-3 (Personal Finance)
  {
    id: 'task-301',
    projectId: 'proj-3',
    phaseId: 'phase-1',
    phaseName: 'Phase 1 — Requirement Analysis',
    title: 'Define Supported CSV Bank Statement Formats',
    description: 'Compile sample statement schemas from top 3 national banks.',
    priority: 'Medium',
    status: 'Completed',
    estimatedTime: '2 days',
  },
  {
    id: 'task-302',
    projectId: 'proj-3',
    phaseId: 'phase-2',
    phaseName: 'Phase 2 — UI/UX Design & Architecture',
    title: 'Build Dashboard Wireframes for Cashflow & Charts',
    description: 'Design charts for monthly burn rate, category breakdowns, and goal trackers.',
    priority: 'High',
    status: 'In Progress',
    estimatedTime: '3 days',
  },
  {
    id: 'task-303',
    projectId: 'proj-3',
    phaseId: 'phase-3',
    phaseName: 'Phase 3 — Database & Data Layer',
    title: 'Implement Local IndexedDB / SQLite Store for Privacy',
    description: 'Keep user financial numbers client-side or zero-knowledge encrypted.',
    priority: 'High',
    status: 'Not Started',
    estimatedTime: '4 days',
  },
];

export const INITIAL_ACTIVITIES: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'ai_consultation',
    title: 'Debugged FastAPI CORS Configuration',
    description: 'AI Code Mentor resolved preflight 405 error with explicit origins.',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-2',
    type: 'task_completed',
    title: 'Completed UI/UX Design Task',
    description: 'Marked "Design Responsive Patient Chat Interface" as completed.',
    timestamp: 'Yesterday',
  },
  {
    id: 'act-3',
    type: 'doc_generated',
    title: 'Generated Comprehensive README.md',
    description: 'Produced complete markdown documentation for Medical Chatbot project.',
    timestamp: '2 days ago',
  },
  {
    id: 'act-4',
    type: 'eval_run',
    title: 'Project Readiness Evaluation Performed',
    description: 'Achieved 78% score across Functionality, Architecture, and Testing.',
    timestamp: '3 days ago',
  },
];

export const CODE_SNIPPET_PRESETS: {
  title: string;
  language: string;
  code: string;
  errorMessage: string;
  goal: string;
}[] = [
  {
    title: 'Python: IndexError & Async Coroutine Await Bug',
    language: 'Python',
    code: `import asyncio

async def fetch_user_data(user_ids):
    results = []
    for i in range(len(user_ids) + 1):  # Bug: Off-by-one index error
        uid = user_ids[i]
        # Bug: Not awaiting the async helper
        data = mock_api_call(uid)
        results.append(data)
    return results

async def mock_api_call(uid):
    await asyncio.sleep(0.1)
    return {"id": uid, "status": "active"}

async def main():
    users = [101, 102, 103]
    output = await fetch_user_data(users)
    print("User data:", output)

asyncio.run(main())`,
    errorMessage: `IndexError: list index out of range\nRuntimeWarning: coroutine 'mock_api_call' was never awaited`,
    goal: 'Fetch multiple user records asynchronously in parallel without index errors',
  },
  {
    title: 'JavaScript: Unhandled Promise & React State Mutation',
    language: 'JavaScript',
    code: `import React, { useState, useEffect } from 'react';

export function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Bug: async function inside useEffect without error handling
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = fetch('/api/tasks?projectId=' + projectId); // Bug: forgot await fetch
    const data = await res.json();
    setTasks(data);
  };

  const handleToggle = (taskId) => {
    // Bug: Direct mutation of state array
    const target = tasks.find(t => t.id === taskId);
    target.completed = !target.completed;
    setTasks(tasks); // Does not trigger re-render
  };

  return (
    <ul>
      {tasks.map(t => (
        <li key={t.id} onClick={() => handleToggle(t.id)}>
          {t.title} - {t.completed ? 'Done' : 'Pending'}
        </li>
      ))}
    </ul>
  );
}`,
    errorMessage: `TypeError: res.json is not a function\nReact Warning: State update not causing re-render`,
    goal: 'Properly fetch API data in React and immutably update task completed state',
  },
  {
    title: 'Java: NullPointerException & Resource Leak',
    language: 'Java',
    code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProjectLogReader {
    private List<String> logs;

    public void loadLogs(String filePath) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filePath));
            String line;
            while ((line = reader.readLine()) != null) {
                // Bug: logs list was never instantiated!
                logs.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Bug: Unclosed reader resource if exception occurs before close
        try {
            reader.close();
        } catch (Exception e) {}
    }
}`,
    errorMessage: `java.lang.NullPointerException: Cannot invoke "java.util.List.add(Object)" because "this.logs" is null`,
    goal: 'Safely read log file line-by-line using modern try-with-resources and prevent NullPointerException',
  },
  {
    title: 'SQL: Incorrect Aggregation & Missing Group By',
    language: 'SQL',
    code: `SELECT 
    p.project_name,
    p.domain,
    COUNT(t.task_id) AS total_tasks,
    t.priority,
    AVG(t.estimated_hours) AS avg_hours
FROM projects p
JOIN tasks t ON p.id = t.project_id
WHERE t.status = 'Completed'
-- Bug: Missing non-aggregated columns in GROUP BY
GROUP BY p.project_name;`,
    errorMessage: `ERROR: column "p.domain" must appear in the GROUP BY clause or be used in an aggregate function`,
    goal: 'Aggregate project task metrics correctly without SQL grouping errors',
  },
  {
    title: 'C++: Dangling Pointer & Memory Leak',
    language: 'C++',
    code: `#include <iostream>
#include <vector>

int* createStudentScoreArray(int size) {
    // Bug: Returning pointer to local stack variable
    int scores[size]; 
    for(int i = 0; i < size; i++) {
        scores[i] = (i + 1) * 20;
    }
    return scores; // Dangling pointer!
}

int main() {
    int* ptr = createStudentScoreArray(5);
    std::cout << "First score: " << ptr[0] << std::endl;
    return 0;
}`,
    errorMessage: `warning: address of local variable 'scores' returned [-Wreturn-local-addr]\nSegmentation fault (core dumped)`,
    goal: 'Properly allocate and manage dynamic student score memory or use modern std::vector',
  },
];
