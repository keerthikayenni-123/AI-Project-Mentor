import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { DocumentMetadata, SRSPage } from '../types/srs';
import { generateSRSForProject } from '../utils/dynamicSRSGenerator';
import { PageRenderer } from './PageRenderer';
import { TableOfContentsSidebar } from './TableOfContentsSidebar';
import { DocumentCustomizerModal } from './DocumentCustomizerModal';
import { DownloadModal } from './DownloadModal';
import { generatePdfDocument } from '../utils/exportPdf';
import { generateWordDocument } from '../utils/exportDoc';
import { generateMarkdownDocument } from '../utils/exportMarkdown';
import { 
  X, 
  Download, 
  Printer, 
  Settings, 
  Menu, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  ArrowLeft,
  Edit3
} from 'lucide-react';

interface SRSViewerModalProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const SRSViewerModal: React.FC<SRSViewerModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [metadata, setMetadata] = useState<DocumentMetadata>(() => {
    return generateSRSForProject(project).metadata;
  });
  const [pages, setPages] = useState<SRSPage[]>(() => {
    return generateSRSForProject(project).pages;
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'continuous' | 'paginated'>('continuous');
  const [scale, setScale] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  // Update whenever project changes
  useEffect(() => {
    if (project) {
      const generated = generateSRSForProject(project);
      setMetadata(generated.metadata);
      setPages(generated.pages);
      setCurrentPage(1);
    }
  }, [project]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-150">
      {/* Top Modal Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-md no-print z-20">
        <div className="flex items-center gap-2.5">
          {/* Prominent Back Button */}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 shadow-xs"
            title="Return back to Projects list"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-700" />
            <span>Back to Projects</span>
          </button>

          <div className="w-px h-6 bg-slate-200 hidden sm:block" />

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 text-xs font-medium"
            title="Open Table of Contents (All 12 Pages)"
          >
            <Menu className="w-4 h-4 text-indigo-900" />
            <span className="hidden sm:inline">Index & TOC</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-academic-title text-sm md:text-base font-bold text-slate-900 truncate max-w-xs md:max-w-md">
                SRS Document: {project?.name || metadata.projectTitle}
              </h2>
              <span className="hidden md:inline text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                12 Full Pages (IEEE 830)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2">
              <span>Domain: {project?.domain || 'Engineering'}</span>
              <span>·</span>
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="text-indigo-800 hover:text-indigo-950 font-semibold flex items-center gap-1 cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors"
                title="Click to edit student author name, roll number, or guide"
              >
                <span>👤 Student: {metadata.students[0]?.name || 'Student Author'}</span>
                <span className="text-[10px] text-slate-500 font-mono">({metadata.students[0]?.rollNo || '21A91A0501'})</span>
                <Edit3 className="w-3 h-3 text-indigo-600 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center pagination if paginated mode */}
        {viewMode === 'paginated' && (
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Page <span className="font-bold text-indigo-950">{currentPage}</span> of {pages.length}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(pages.length, p + 1))}
              disabled={currentPage >= pages.length}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'continuous' ? 'paginated' : 'continuous')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-800" />
            <span>{viewMode === 'continuous' ? 'Continuous (All 12)' : 'Page Flip Mode'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden xl:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => setScale(Math.max(0.7, scale - 0.1))}
              className="p-1.5 text-slate-600 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-700">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(Math.min(1.3, scale + 0.1))}
              className="p-1.5 text-slate-600 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customize Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-2.5 py-1.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5"
            title="Edit student names, roll number, college, and guide"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-800" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
            title="Print or Save as Vector PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Download Dropdown */}
          <div className="relative">
            <div className="inline-flex rounded-lg shadow-xs">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="px-3 py-1.5 bg-indigo-900 text-white rounded-l-lg hover:bg-indigo-950 flex items-center gap-1.5 text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download SRS</span>
              </button>
              <button
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                className="px-2 py-1.5 bg-indigo-950 text-white rounded-r-lg hover:bg-indigo-900 border-l border-indigo-800"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {downloadDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl p-1.5 text-xs space-y-0.5 z-50"
                onClick={() => setDownloadDropdownOpen(false)}
              >
                <button
                  onClick={() => generatePdfDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="font-semibold">Download PDF Document</div>
                    <div className="text-[10px] text-slate-500">12 Full Pages (.pdf)</div>
                  </div>
                </button>
                <button
                  onClick={() => generateWordDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">Microsoft Word (.doc)</div>
                    <div className="text-[10px] text-slate-500">Editable Office format</div>
                  </div>
                </button>
                <button
                  onClick={() => generateMarkdownDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Markdown Document (.md)</div>
                    <div className="text-[10px] text-slate-500">GitHub README format</div>
                  </div>
                </button>
                <div className="border-t border-slate-200 my-1" />
                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="w-full text-left p-2 rounded hover:bg-indigo-50 flex items-center gap-2 text-indigo-900 font-medium"
                >
                  <Download className="w-4 h-4 text-indigo-700" />
                  <span>All Download Options...</span>
                </button>
              </div>
            )}
          </div>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg ml-1"
            title="Close SRS Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Document Viewer Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-100">
        <div className="max-w-4xl w-full">
          {viewMode === 'continuous' ? (
            <div className="space-y-12">
              {pages.map((page) => (
                <div key={page.pageNumber} className="relative group">
                  <div className="no-print mb-2 flex items-center justify-between text-xs text-slate-500 max-w-[820px] mx-auto px-1">
                    <span className="font-mono font-semibold text-slate-600">
                      Page {page.pageNumber} of {pages.length}
                    </span>
                    <span className="text-[11px] truncate">{page.title}</span>
                  </div>

                  <PageRenderer
                    page={page}
                    metadata={metadata}
                    totalPages={pages.length}
                    scale={scale}
                  />
                </div>
              ))}

              {/* End of Document Return / Back Action Banner */}
              <div className="no-print mt-10 p-6 bg-white rounded-2xl border border-slate-300 shadow-md text-center max-w-[820px] mx-auto space-y-4">
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>You have reached the end of this 12-Page IEEE 830 SRS Document</span>
                </div>
                <p className="text-xs text-slate-600">
                  You can now return back to your projects list or download a copy for college submission.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Projects</span>
                  </button>
                  <button
                    onClick={() => generatePdfDocument(metadata, pages)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF (12 Pgs)</span>
                  </button>
                  <button
                    onClick={() => generateWordDocument(metadata, pages)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-slate-300"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Download Word (.doc)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="no-print w-full max-w-[820px] mb-4 p-3 bg-white rounded-lg border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded border border-slate-300 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <span className="font-academic-title font-bold text-slate-900 text-sm">
                    {pages[currentPage - 1]?.title}
                  </span>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Page {currentPage} of {pages.length}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(pages.length, p + 1))}
                  disabled={currentPage >= pages.length}
                  className="px-3 py-1.5 rounded border border-slate-300 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {pages[currentPage - 1] && (
                <PageRenderer
                  page={pages[currentPage - 1]}
                  metadata={metadata}
                  totalPages={pages.length}
                  scale={scale}
                />
              )}

              {/* Bottom bar in Paginated View */}
              <div className="no-print mt-6 flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Projects</span>
                </button>
                <button
                  onClick={() => generatePdfDocument(metadata, pages)}
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

      {/* Floating Action Controls on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2 no-print">
        <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-2 flex items-center gap-2 border border-slate-800">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-slate-200 hover:text-white"
            title="Return back to projects"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="w-px h-5 bg-slate-700" />
          <button
            onClick={() => generatePdfDocument(metadata, pages)}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PDF (12 Pgs)</span>
          </button>
          <button
            onClick={() => generateWordDocument(metadata, pages)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Word (.doc)</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-medium transition-colors"
            title="Print or Save as Vector PDF"
          >
            <Printer className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Table of Contents Drawer */}
      <TableOfContentsSidebar
        pages={pages}
        currentPage={currentPage}
        onSelectPage={handleScrollToPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Document Customizer Modal */}
      <DocumentCustomizerModal
        metadata={metadata}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSave={(newMeta) => setMetadata(newMeta)}
      />

      {/* Download Options Modal */}
      <DownloadModal
        metadata={metadata}
        pages={pages}
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onPrint={handlePrint}
      />
    </div>
  );
};
