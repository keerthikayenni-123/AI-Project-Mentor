import React, { useState } from 'react';
import { DocumentMetadata } from '../types/srs';
import { 
  Download, 
  Printer, 
  Settings, 
  Menu, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { generatePdfDocument } from '../utils/exportPdf';
import { generateWordDocument } from '../utils/exportDoc';
import { generateMarkdownDocument } from '../utils/exportMarkdown';
import { SRSPage } from '../types/srs';

interface HeaderProps {
  metadata: DocumentMetadata;
  pages: SRSPage[];
  currentPage: number;
  totalPages: number;
  viewMode: 'continuous' | 'paginated';
  onToggleViewMode: () => void;
  onPageChange: (newPage: number) => void;
  scale: number;
  onChangeScale: (newScale: number) => void;
  onOpenCustomizer: () => void;
  onOpenDownloadModal: () => void;
  onOpenSidebar: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  metadata,
  pages,
  currentPage,
  totalPages,
  viewMode,
  onToggleViewMode,
  onPageChange,
  scale,
  onChangeScale,
  onOpenCustomizer,
  onOpenDownloadModal,
  onOpenSidebar,
  onPrint,
}) => {
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left Section: TOC Button + App Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Open Table of Contents (All 12 Pages)"
          >
            <Menu className="w-4 h-4 text-indigo-900" />
            <span className="hidden sm:inline">Index & TOC</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-academic-title text-sm md:text-base font-bold text-slate-950 truncate max-w-xs md:max-w-md">
                {metadata.projectTitle}
              </h1>
              <span className="hidden lg:inline text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                12 Pages (IEEE 830)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="truncate max-w-[200px] sm:max-w-none">
                By {metadata.students[0]?.name} et al.
              </span>
              <span aria-hidden="true">·</span>
              <a
                href={metadata.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 hover:underline inline-flex items-center gap-1 font-mono"
              >
                <span>GitHub Repo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Center Section: Pagination Controls (if paginated mode) */}
        {viewMode === 'paginated' && (
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Page <span className="font-bold text-indigo-950">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right Section: Action Controls */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <button
            onClick={onToggleViewMode}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
            title={viewMode === 'continuous' ? 'Switch to single-page flip mode' : 'Switch to continuous scroll mode'}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-800" />
            <span>{viewMode === 'continuous' ? 'Continuous (All 12)' : 'Page Flip Mode'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden xl:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => onChangeScale(Math.max(0.7, scale - 0.1))}
              className="p-1.5 text-slate-600 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-700">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => onChangeScale(Math.min(1.3, scale + 0.1))}
              className="p-1.5 text-slate-600 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customize Button */}
          <button
            onClick={onOpenCustomizer}
            className="px-2.5 py-1.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Edit student names, roll number, college, and guide"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-800" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Quick Print Button */}
          <button
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 hover:bg-slate-50"
            title="Print or Save as Vector PDF via browser dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Download Dropdown / Modal Trigger */}
          <div className="relative">
            <div className="inline-flex rounded-lg shadow-xs">
              <button
                onClick={onOpenDownloadModal}
                className="px-3 py-1.5 bg-indigo-900 text-white rounded-l-lg hover:bg-indigo-950 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download SRS</span>
              </button>
              <button
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                className="px-2 py-1.5 bg-indigo-950 text-white rounded-r-lg hover:bg-indigo-900 border-l border-indigo-800"
                aria-label="Download options"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick dropdown menu */}
            {downloadDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl p-1.5 text-xs space-y-0.5 z-50 animate-in fade-in"
                onClick={() => setDownloadDropdownOpen(false)}
              >
                <button
                  onClick={() => generatePdfDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="font-semibold">Official PDF Document</div>
                    <div className="text-[10px] text-slate-500">12 Pages (.pdf)</div>
                  </div>
                </button>

                <button
                  onClick={() => generateWordDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">Microsoft Word Document</div>
                    <div className="text-[10px] text-slate-500">Editable Office (.doc)</div>
                  </div>
                </button>

                <button
                  onClick={() => generateMarkdownDocument(metadata, pages)}
                  className="w-full text-left p-2 rounded hover:bg-slate-100 flex items-center gap-2 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Markdown Document</div>
                    <div className="text-[10px] text-slate-500">GitHub format (.md)</div>
                  </div>
                </button>

                <div className="border-t border-slate-200 my-1" />

                <button
                  onClick={onOpenDownloadModal}
                  className="w-full text-left p-2 rounded hover:bg-indigo-50 flex items-center gap-2 text-indigo-900 font-medium"
                >
                  <Download className="w-4 h-4 text-indigo-700" />
                  <span>View All Download Options...</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
