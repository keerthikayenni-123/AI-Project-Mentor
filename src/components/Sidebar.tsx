import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Milestone,
  Code2,
  FileText,
  ShieldCheck,
  Target,
  MessageSquareCode,
  Info,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Project, UserAccount } from '../types';
import { LogOut } from 'lucide-react';

export type NavPage =
  | 'landing'
  | 'dashboard'
  | 'projects'
  | 'idea-generator'
  | 'roadmap'
  | 'code-mentor'
  | 'documentation'
  | 'evaluator'
  | 'skills'
  | 'chat'
  | 'about';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  activeProject?: Project;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  activeProject,
  isOpenMobile,
  onCloseMobile,
  currentUser,
  onLogout,
}) => {
  const mainNavItems: { id: NavPage; label: string; icon: React.ComponentType<any>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'My Projects', icon: FolderKanban },
    { id: 'idea-generator', label: 'Idea Generator', icon: Lightbulb, badge: 'AI' },
    { id: 'roadmap', label: 'Roadmap & Tasks', icon: Milestone },
    { id: 'code-mentor', label: 'Code Mentor', icon: Code2, badge: 'AI' },
    { id: 'documentation', label: 'SRS & Documentation', icon: FileText, badge: '10+ Pgs' },
    { id: 'evaluator', label: 'Project Evaluator', icon: ShieldCheck, badge: 'AI' },
    { id: 'skills', label: 'Skill Gap & Tech', icon: Target },
    { id: 'chat', label: 'AI Mentor Chat', icon: MessageSquareCode, badge: 'Live' },
  ];

  const secondaryNavItems: { id: NavPage; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'landing', label: 'Project Overview', icon: ExternalLink },
    { id: 'about', label: 'Help & Viva Guide', icon: Info },
  ];

  const handleItemClick = (page: NavPage) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 md:top-[57px] left-0 z-40 h-full md:h-[calc(100vh-57px)] w-64 bg-slate-950 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Active Project Quick Card */}
          {activeProject && (
            <div className="p-3 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-300 mb-1">
                <span>ACTIVE CONTEXT</span>
                <span className="font-mono text-indigo-400">{activeProject.progress}%</span>
              </div>
              <p className="text-xs font-semibold text-white truncate">{activeProject.name}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{activeProject.domain} • {activeProject.difficulty}</p>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${activeProject.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Workspace & AI Tools
            </div>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badge === 'Live'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Secondary Links */}
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Resources & Guide
            </div>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card & Logout */}
        {currentUser && (
          <div className="pt-3 border-t border-slate-800/80 mt-auto">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {currentUser.avatarInitials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{currentUser.fullName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Log out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer info badge */}
        <div className="pt-3 border-t border-slate-900 mt-2">
          <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Service Active</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">v1.2 MVP</span>
          </div>
        </div>
      </aside>
    </>
  );
};
