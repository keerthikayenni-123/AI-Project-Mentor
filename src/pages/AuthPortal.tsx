import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  User,
  Building2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Code2,
  Milestone,
  FileText,
  AlertCircle,
  Zap,
  Sun,
  Moon,
  Eye,
  EyeOff,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { UserAccount } from '../types';

interface AuthPortalProps {
  onAuthSuccess: (user: UserAccount) => void;
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({
  onAuthSuccess,
  currentTheme = 'dark',
  onToggleTheme,
}) => {
  // Mode: 'register' (default as requested: "first it should be create account and thenlogin") or 'login'
  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCollege, setRegCollege] = useState('National Institute of Technology');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering (CSE)');
  const [customDepartment, setCustomDepartment] = useState('');
  const [regYear, setRegYear] = useState('Final Year (8th Semester)');
  const [regStudentId, setRegStudentId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('keerthikayenni@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // UI state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!regFullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid academic or personal email address.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password entry.');
      return;
    }

    const selectedDept =
      regDepartment === 'Other / Multi-Disciplinary' && customDepartment.trim()
        ? customDepartment.trim()
        : regDepartment;

    setIsLoading(true);
    setTimeout(() => {
      const res = storageService.registerUser({
        fullName: regFullName,
        email: regEmail,
        password: regPassword,
        collegeOrUniversity: regCollege,
        degreeOrBranch: selectedDept,
        semesterOrYear: regYear,
        studentId: regStudentId.trim() || undefined,
      });

      setIsLoading(false);
      if (res.success && res.user) {
        // Redirect directly to login page as requested
        setLoginEmail(regEmail.trim());
        setLoginPassword(regPassword);
        setMode('login');
        setSuccessMessage('🎉 Account created successfully! Please log in with your credentials to access the workspace.');
        // Reset registration form
        setRegFullName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    }, 400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = storageService.loginUser(loginEmail, loginPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.fullName}! Entering workspace...`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
        }, 500);
      } else {
        setErrorMessage(res.error || 'Invalid credentials.');
      }
    }, 400);
  };

  const handleQuickDemoRegister = () => {
    setRegFullName('Sridevi Yenni');
    setRegEmail('yennisridevi6@gmail.com');
    setRegCollege('Department of Computer Science and Engineering');
    setRegDepartment('Computer Science & Engineering (CSE)');
    setRegYear('Final Year (8th Semester)');
    setRegStudentId('21A91A0501');
    setRegPassword('password123');
    setRegConfirmPassword('password123');
    setErrorMessage(null);
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('yennisridevi6@gmail.com');
    setLoginPassword('password123');
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = storageService.loginUser('keerthikayenni@gmail.com', 'password123');
      setIsLoading(false);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome, ${res.user.fullName}! Entering workspace...`);
        setTimeout(() => {
          onAuthSuccess(res.user!);
        }, 400);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header bar */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">AI Project Mentor</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                All Engineering Departments
              </span>
            </div>
            <p className="text-xs text-slate-400">Student & Researcher Capstone Suite for CSE, ECE, EEE, MECH, CIVIL & All Disciplines</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              type="button"
              title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/80 transition-colors cursor-pointer"
            >
              {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Gemini 2.5 Flash Engine Active
          </span>
        </div>
      </header>

      {/* Main Content: Split layout */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual highlights for students & examiners */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI-Driven Capstone Acceleration Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Build, Debug & Defend Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Engineering Project
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Create your student account to unlock the full technical workspace: auto-generated starter code,
            8-phase software roadmaps, AI code changes & error debugging, SRS documentation, and Viva defense evaluator.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-white">Automated Code Mentor</h4>
              <p className="text-[11px] text-slate-400">
                Instant full-stack & AI starter code with live prompt changes and stack-trace error fixing.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Milestone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-white">8-Phase Project Roadmap</h4>
              <p className="text-[11px] text-slate-400">
                Structured SDLC tracking from Literature Survey to Testing and Final Viva Defense.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-white">Academic Documentation</h4>
              <p className="text-[11px] text-slate-400">
                IEEE-aligned project synopses, SRS documents, DB schemas, and system architecture blueprints.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-white">Viva Examiner Readiness</h4>
              <p className="text-[11px] text-slate-400">
                Rubric-based evaluation scoring, tough examiner Q&A preparation, and code audit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Academic Tier
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Offline Resilient
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Secure Local Storage
            </span>
          </div>
        </div>

        {/* Right Column: Account Creation / Login Form */}
        <div className="lg:col-span-6">
          <div className="w-full max-w-md mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top Glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Student Login
              </button>
            </div>

            {/* Error or Success notification */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* CREATE ACCOUNT FORM */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">Full Name *</label>
                    <button
                      type="button"
                      onClick={handleQuickDemoRegister}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                    >
                      Fill Demo Student Details
                    </button>
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sridevi Yenni"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Student Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="student@university.edu"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      College / University
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. NIT / Engineering College"
                        value={regCollege}
                        onChange={(e) => setRegCollege(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Department / Engineering Branch *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                      <select
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                      >
                        <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                        <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication Engineering (ECE)</option>
                        <option value="Electrical & Electronics Engineering (EEE)">Electrical & Electronics Engineering (EEE)</option>
                        <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                        <option value="Civil & Environmental Engineering (CIVIL)">Civil & Environmental Engineering (CIVIL)</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                        <option value="Biomedical & Healthcare Engineering (BME)">Biomedical & Healthcare Engineering (BME)</option>
                        <option value="Robotics & Automation / Mechatronics">Robotics & Automation / Mechatronics</option>
                        <option value="Aerospace & Aeronautical Engineering">Aerospace & Aeronautical Engineering</option>
                        <option value="Chemical & Materials Engineering">Chemical & Materials Engineering</option>
                        <option value="Other / Multi-Disciplinary">Other / Multi-Disciplinary</option>
                      </select>
                    </div>
                    {regDepartment === 'Other / Multi-Disciplinary' && (
                      <input
                        type="text"
                        placeholder="Type custom branch name (e.g. Marine, Metallurgical...)"
                        value={customDepartment}
                        onChange={(e) => setCustomDepartment(e.target.value)}
                        className="mt-2 w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Academic Year / Semester
                    </label>
                    <select
                      value={regYear}
                      onChange={(e) => setRegYear(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="Final Year (8th Semester)">Final Year (8th Semester)</option>
                      <option value="Final Year (7th Semester)">Final Year (7th Semester)</option>
                      <option value="3rd Year (6th Semester)">3rd Year (6th Semester)</option>
                      <option value="Postgraduate (M.Tech/MS)">Postgraduate (M.Tech/MS)</option>
                      <option value="Independent Developer">Independent Developer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Roll Number / Student ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CSE-2026-0842"
                      value={regStudentId}
                      onChange={(e) => setRegStudentId(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {showRegPassword ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Show</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 focus:outline-none p-0.5 rounded cursor-pointer transition-colors"
                        title={showRegPassword ? 'Hide password' : 'Show password'}
                        aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegPassword ? (
                          <EyeOff className="w-4 h-4 text-indigo-400 hover:text-indigo-300" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400 hover:text-slate-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Confirm Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {showRegConfirmPassword ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Show</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type={showRegConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Repeat password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 focus:outline-none p-0.5 rounded cursor-pointer transition-colors"
                        title={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                        aria-label={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-indigo-400 hover:text-indigo-300" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400 hover:text-slate-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account & Proceed to Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
                    >
                      Log in here
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Student Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="student@university.edu"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {showLoginPassword ? (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Hide Password</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Show Password</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="Your account password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 focus:outline-none p-0.5 rounded cursor-pointer transition-colors"
                      title={showLoginPassword ? 'Hide password' : 'Show password'}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4 text-indigo-400 hover:text-indigo-300" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400 hover:text-slate-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                    />
                    <span>Remember my academic session</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Default: password123</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Log In to Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Instant Demo Login Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-indigo-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-indigo-500/40"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instant 1-Click Demo Login (Sridevi Yenni)</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400">
                    Need a new student account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
                    >
                      Create account here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500">
        AI Project Mentor • Computer Science & Engineering Academic Workstation • Powered by Google Gemini AI
      </footer>
    </div>
  );
};
