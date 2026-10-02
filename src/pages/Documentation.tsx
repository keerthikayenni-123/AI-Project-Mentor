import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  RotateCcw,
  Layers,
  Terminal,
  Database,
  Cpu,
  BookOpen,
  ArrowRight,
  Edit3,
  Printer,
  Settings,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Menu,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { Project, ProjectDocumentation } from '../types';
import { NavPage } from '../components/Sidebar';
import { aiService } from '../services/aiService';
import { LoadingState } from '../components/LoadingState';
import { ErrorMessage } from '../components/ErrorMessage';
import { storageService } from '../services/storageService';
import { generateSRSForProject } from '../utils/dynamicSRSGenerator';
import { DocumentMetadata, SRSPage } from '../types/srs';
import { PageRenderer } from '../components/PageRenderer';
import { TableOfContentsSidebar } from '../components/TableOfContentsSidebar';
import { DocumentCustomizerModal } from '../components/DocumentCustomizerModal';
import { DownloadModal } from '../components/DownloadModal';
import { generatePdfDocument } from '../utils/exportPdf';
import { generateWordDocument } from '../utils/exportDoc';
import { generateMarkdownDocument } from '../utils/exportMarkdown';

interface DocumentationProps {
  activeProject?: Project;
  onNavigate?: (page: NavPage) => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ activeProject, onNavigate }) => {
  // Top Primary Tab: 'srs' vs 'readme'
  const [docMode, setDocMode] = useState<'srs' | 'readme'>('srs');

  // All projects for selector
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(activeProject);

  // SRS Document State
  const [srsData, setSrsData] = useState<{ metadata: DocumentMetadata; pages: SRSPage[] }>(() => {
    return generateSRSForProject(activeProject);
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'continuous' | 'paginated'>('continuous');
  const [scale, setScale] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  // README generator input fields
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [aiTechnologies, setAiTechnologies] = useState('Gemini 3.8 Flash API, Scikit-Learn');
  const [database, setDatabase] = useState('PostgreSQL / Local Storage');
  const [teamSize, setTeamSize] = useState('Individual');
  const [installationRequirements, setInstallationRequirements] = useState('Node.js 20+, Python 3.10+');
  const [projectStatus, setProjectStatus] = useState('Development');

  // README Result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [docResult, setDocResult] = useState<ProjectDocumentation | null>(null);
  const [activeTab, setActiveTab] = useState<'structured' | 'markdown'>('structured');
  const [markdownContent, setMarkdownContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Load all projects on mount
  useEffect(() => {
    const list = storageService.getProjects();
    setAllProjects(list);
    if (!currentProject && list.length > 0) {
      setCurrentProject(activeProject || list[0]);
    }
  }, [activeProject]);

  // Sync when activeProject or currentProject changes
  useEffect(() => {
    const target = currentProject || activeProject;
    if (target) {
      setSrsData(generateSRSForProject(target));
      setProjectName(target.name);
      setDescription(target.description);
      setTechStack(target.technologies.join(', '));
      setTeamSize(target.teamSize || 'Individual');
      setProjectStatus(target.status);
      setFeatures('Responsive dashboard, AI reasoning pipeline, local persistence, exportable reports');
    }
  }, [currentProject, activeProject]);

  const handleSelectProjectChange = (projectId: string) => {
    const p = allProjects.find((x) => x.id === projectId);
    if (p) {
      setCurrentProject(p);
      setSrsData(generateSRSForProject(p));
      setCurrentPage(1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScrollToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (viewMode === 'continuous') {
      const el = document.getElementById(`srs-page-${pageNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleGenerateReadme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !description.trim()) {
      setError('Please provide project name and description.');
      return;
    }

    setError(null);
    setLoading(true);
    setDocResult(null);

    const res = await aiService.generateDocumentation({
      projectName: projectName.trim(),
      description: description.trim(),
      features: features.trim(),
      techStack: techStack.trim(),
      aiTechnologies: aiTechnologies.trim(),
      database: database.trim(),
      teamSize,
      installationRequirements,
      projectStatus,
    });

    setLoading(false);
    if (res.success && res.data) {
      setDocResult(res.data);
      setMarkdownContent(res.data.readmeMarkdown);
    } else {
      setError(res.error || 'Failed to generate documentation.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(projectName || 'PROJECT').replace(/\s+/g, '_')}_README.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Main Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>Documentation & Specifications</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author and download academic Software Requirements Specifications (SRS) and GitHub documentation.
          </p>
        </div>

        {/* Primary Segmented Tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setDocMode('srs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              docMode === 'srs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>IEEE 830 SRS Document (10+ Pgs)</span>
            <span className="text-[10px] bg-indigo-900/80 text-indigo-200 px-1.5 py-0.2 rounded border border-indigo-500/40">
              12 Pgs
            </span>
          </button>

          <button
            onClick={() => setDocMode('readme')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              docMode === 'readme'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>GitHub README.md</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: IEEE 830 SRS DOCUMENT (MINIMUM 10 PAGES / 12 PAGES)  */}
      {/* ============================================================ */}
      {docMode === 'srs' && (
        <div className="space-y-4">
          {/* Top Control Toolbar for SRS */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
              {/* Back to Projects Button */}
              {onNavigate && (
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 shrink-0 shadow-xs"
                  title="Return to Projects list"
                >
                  <ArrowLeft className="w-4 h-4 text-indigo-400" />
                  <span>Back to Projects</span>
                </button>
              )}

              {/* Project Selector */}
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-medium text-slate-400 shrink-0">Target Project:</span>
                <select
                  value={currentProject?.id || activeProject?.id || ''}
                  onChange={(e) => handleSelectProjectChange(e.target.value)}
                  className="w-full max-w-sm px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {allProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.domain})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-2.5 py-1.5 border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Menu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Index & TOC</span>
              </button>

              <button
                onClick={() => setViewMode(viewMode === 'continuous' ? 'paginated' : 'continuous')}
                className="px-2.5 py-1.5 border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>{viewMode === 'continuous' ? 'Continuous (All 12)' : 'Page Flip'}</span>
              </button>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="px-2.5 py-1.5 border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-indigo-400" />
                <span>Customize Details</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>

              <button
                onClick={() => generatePdfDocument(srsData.metadata, srsData.pages)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (12 Pgs)</span>
              </button>

              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>More Formats...</span>
              </button>
            </div>
          </div>

          {/* Academic Banner & Student Author Indicator */}
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Academic Requirement Satisfied:</strong> 12 full IEEE 830-1998 compliant pages (Exceeds 10-page minimum requirement).
              </span>
            </div>

            {/* Active Student Author Info */}
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-indigo-500/30">
              <span className="text-slate-400 text-[11px]">Student Author:</span>
              <span className="text-white font-bold">{srsData.metadata.students[0]?.name || 'Student Author'}</span>
              <span className="text-indigo-400 text-[10px] font-mono">({srsData.metadata.students[0]?.rollNo || '21A91A0501'})</span>
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="text-slate-400 hover:text-indigo-300 ml-1 cursor-pointer transition-colors"
                title="Edit student name, guide or college details"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main 12-Page A4 Sheet Canvas */}
          <div className="bg-slate-900/50 p-4 sm:p-8 rounded-2xl border border-slate-800 flex justify-center">
            <div className="max-w-4xl w-full">
              {viewMode === 'continuous' ? (
                <div className="space-y-12">
                  {srsData.pages.map((page) => (
                    <div key={page.pageNumber} className="relative group">
                      <div className="no-print mb-2 flex items-center justify-between text-xs text-slate-400 max-w-[820px] mx-auto px-1">
                        <span className="font-mono font-semibold text-slate-300">
                          Page {page.pageNumber} of {srsData.pages.length}
                        </span>
                        <span className="text-[11px] truncate text-slate-400">{page.title}</span>
                      </div>

                      <PageRenderer
                        page={page}
                        metadata={srsData.metadata}
                        totalPages={srsData.pages.length}
                        scale={scale}
                      />
                    </div>
                  ))}

                  {/* End of Document Return / Back Action Banner */}
                  <div className="no-print mt-10 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center max-w-[820px] mx-auto space-y-4">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>You have reached the end of this 12-Page IEEE 830 SRS Document</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      You can return back to your projects list or download this specification in your preferred format.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate('projects')}
                          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                        >
                          <ArrowLeft className="w-4 h-4 text-indigo-400" />
                          <span>Back to Projects</span>
                        </button>
                      )}
                      <button
                        onClick={() => generatePdfDocument(srsData.metadata, srsData.pages)}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF (12 Pgs)</span>
                      </button>
                      <button
                        onClick={() => generateWordDocument(srsData.metadata, srsData.pages)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                      >
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span>Download Word (.doc)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="no-print w-full max-w-[820px] mb-4 p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-xs flex items-center justify-between text-xs">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 font-medium text-slate-300 hover:text-white disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Page</span>
                    </button>

                    <div className="text-center">
                      <span className="font-academic-title font-bold text-white text-sm">
                        {srsData.pages[currentPage - 1]?.title}
                      </span>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Page {currentPage} of {srsData.pages.length}
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(srsData.pages.length, p + 1))}
                      disabled={currentPage >= srsData.pages.length}
                      className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 font-medium text-slate-300 hover:text-white disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {srsData.pages[currentPage - 1] && (
                    <PageRenderer
                      page={srsData.pages[currentPage - 1]}
                      metadata={srsData.metadata}
                      totalPages={srsData.pages.length}
                      scale={scale}
                    />
                  )}

                  {/* Bottom bar in Paginated View */}
                  <div className="no-print mt-6 flex items-center gap-3">
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('projects')}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer border border-slate-700"
                      >
                        <ArrowLeft className="w-4 h-4 text-indigo-400" />
                        <span>Back to Projects</span>
                      </button>
                    )}
                    <button
                      onClick={() => generatePdfDocument(srsData.metadata, srsData.pages)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table of Contents Drawer */}
          <TableOfContentsSidebar
            pages={srsData.pages}
            currentPage={currentPage}
            onSelectPage={handleScrollToPage}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Document Customizer Modal */}
          <DocumentCustomizerModal
            metadata={srsData.metadata}
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            onSave={(newMeta) => setSrsData({ ...srsData, metadata: newMeta })}
          />

          {/* Download Options Modal */}
          <DownloadModal
            metadata={srsData.metadata}
            pages={srsData.pages}
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
            onPrint={handlePrint}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: GITHUB README.MD GENERATOR                          */}
      {/* ============================================================ */}
      {docMode === 'readme' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input Form Column */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Project README Parameters</span>
            </h2>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleGenerateReadme} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Project Name *</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Project Abstract *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Core Features</label>
                <textarea
                  rows={2}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Tech Stack</label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">AI Technologies</label>
                  <input
                    type="text"
                    value={aiTechnologies}
                    onChange={(e) => setAiTechnologies(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Synthesizing Documentation...' : 'Generate GitHub README.md'}</span>
              </button>
            </form>
          </div>

          {/* Output Display Column */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col min-h-[480px]">
            {loading ? (
              <LoadingState message="Generating structured README.md and technical installation guide..." />
            ) : docResult ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('structured')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'structured' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Report Preview
                    </button>
                    <button
                      onClick={() => setActiveTab('markdown')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'markdown' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Raw Markdown
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleDownloadReadme}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download README.md</span>
                    </button>
                  </div>
                </div>

                {activeTab === 'structured' ? (
                  <div className="space-y-4 text-xs text-slate-300 overflow-y-auto max-h-[600px] pr-2">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h3 className="font-bold text-white text-sm">{docResult.projectName}</h3>
                      <p className="leading-relaxed">{docResult.overview}</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wide">Key Features</h4>
                      <ul className="space-y-1 list-disc list-inside">
                        {docResult.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wide">Installation Steps</h4>
                      <div className="space-y-1 font-mono text-[11px] bg-slate-900 p-2.5 rounded">
                        {docResult.installationSteps.map((step, i) => (
                          <div key={i} className="text-emerald-400">
                            {step.command ? `$ ${step.command}` : `Step ${step.step}: ${step.title}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <textarea
                      value={markdownContent}
                      onChange={(e) => setMarkdownContent(e.target.value)}
                      className="w-full h-full min-h-[500px] p-4 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                <FileText className="w-12 h-12 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-400">Ready to Generate GitHub README</h3>
                <p className="text-xs max-w-sm text-slate-500">
                  Fill in the project parameters on the left and click "Generate GitHub README.md" to produce complete setup instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documentation;
