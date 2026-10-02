import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  FolderGit2,
  ChevronDown,
  RotateCcw,
  Menu,
  X,
  User,
  PlusCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { Project, UserAccount } from '../types';

interface NavbarProps {
  projects: Project[];
  activeProject?: Project;
  onSelectProject: (id: string) => void;
  onOpenNewProject: () => void;
  onResetData: () => void;
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  onNavigateLanding?: () => void;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
}

function getDepartmentBadge(degreeOrBranch?: string): string {
  if (!degreeOrBranch) return 'ALL DEPTS';
  const upper = degreeOrBranch.toUpperCase();
  if (upper.includes('CSE') || upper.includes('COMPUTER SCIENCE')) return 'CSE';
  if (upper.includes('ECE') || upper.includes('ELECTRONICS & COMM') || upper.includes('COMMUNICATION')) return 'ECE';
  if (upper.includes('EEE') || upper.includes('ELECTRICAL')) return 'EEE';
  if (upper.includes('MECH') || upper.includes('MECHANICAL')) return 'MECH';
  if (upper.includes('CIVIL')) return 'CIVIL';
  if (upper.includes('IT') || upper.includes('INFORMATION TECH')) return 'IT';
  if (upper.includes('AI') || upper.includes('DATA SCIENCE') || upper.includes('DS')) return 'AI & DS';
  if (upper.includes('BIOMED') || upper.includes('BME') || upper.includes('BIOTECH')) return 'BME';
  if (upper.includes('ROBOT') || upper.includes('MECHATRON')) return 'ROBOTICS';
  if (upper.includes('AERO')) return 'AERO';
  if (upper.includes('CHEM')) return 'CHEM';
  return 'ALL DEPTS';
}

export const Navbar: React.FC<NavbarProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenNewProject,
  onResetData,
  currentTheme,
  onToggleTheme,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  onNavigateLanding,
  currentUser,
  onLogout,
}) => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={onNavigateLanding}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    AI Project Mentor
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase">
                    <Sparkles className="w-2.5 h-2.5" />
                    {getDepartmentBadge(currentUser?.degreeOrBranch)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  All-Department Engineering Project & Research Suite
                </span>
              </div>
            </div>
          </div>

          {/* Center: Active Project Selector Dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-200 transition-all cursor-pointer shadow-sm"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Active:</span>
              <span className="font-semibold text-white max-w-[180px] truncate">
                {activeProject ? activeProject.name : 'Select Project'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {isProjectDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setIsProjectDropdownOpen(false)}
              >
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  Switch Active Project
                </div>
                <div className="max-h-56 overflow-y-auto space-y-1">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        p.id === activeProject?.id
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.domain} • {p.progress}%</p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {p.difficulty}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="pt-2 mt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsProjectDropdownOpen(false);
                      onOpenNewProject();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-indigo-300 hover:bg-indigo-950/40 border border-dashed border-indigo-500/30 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create New Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions, Reset, Theme, Student Profile */}
          <div className="flex items-center gap-2">
            {/* Quick Create Project */}
            <button
              onClick={onOpenNewProject}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm shadow-indigo-600/30 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={() => setShowResetConfirm(true)}
              title="Reset to initial student demo data"
              className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} mode`}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            >
              {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Student Profile & Logout Dropdown */}
            <div className="relative pl-2 border-l border-slate-800">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
                aria-label="User Account Menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {currentUser?.avatarInitials || 'ST'}
                  </div>
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-medium text-slate-200 leading-tight">
                    {currentUser?.fullName || 'Student'}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono truncate max-w-[130px]">
                    {currentUser?.degreeOrBranch || 'Engineering'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {currentUser?.avatarInitials || 'ST'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{currentUser?.fullName || 'Student'}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser?.email || 'student@university.edu'}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400 space-y-0.5">
                      <p className="truncate"><strong className="text-slate-300">College:</strong> {currentUser?.collegeOrUniversity || 'Engineering College'}</p>
                      <p className="truncate"><strong className="text-slate-300">Degree:</strong> {currentUser?.degreeOrBranch || 'Engineering'}</p>
                      <p className="truncate"><strong className="text-slate-300">ID:</strong> {currentUser?.studentId || 'STU-2026'}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out of Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Quick Logout Button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              title="Log out of student account"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <LogOut className="w-5 h-5 text-rose-400" />
              Sign Out of AI Project Mentor?
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              You will return to the student authentication screen. Your saved projects and code revisions remain safely stored in your local session.
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  if (onLogout) onLogout();
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-400" />
              Reset All Demo Data?
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              This will restore the 4 realistic student projects (AI Medical Chatbot, Smart Attendance, Finance Tracker, Resume Analyzer), tasks, and sample activity.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-600/30 cursor-pointer"
              >
                Yes, Restore Sample Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
