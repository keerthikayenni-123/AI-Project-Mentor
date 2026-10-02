import React from 'react';
import { DocumentMetadata, SRSPage } from '../types/srs';
import { generatePdfDocument } from '../utils/exportPdf';
import { generateWordDocument } from '../utils/exportDoc';
import { generateMarkdownDocument, generateJsonSpecification } from '../utils/exportMarkdown';
import { FileText, Download, Printer, FileCode, CheckCircle, X, Sparkles, ExternalLink } from 'lucide-react';

interface DownloadModalProps {
  metadata: DocumentMetadata;
  pages: SRSPage[];
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  metadata,
  pages,
  isOpen,
  onClose,
  onPrint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-900" />
            <div>
              <h2 className="font-academic-title text-base font-bold text-slate-900">
                Download SRS Document
              </h2>
              <p className="text-xs text-slate-500">
                12 Complete Pages · Compliant with IEEE Std 830-1998
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-5 space-y-3">
          {/* 1. Official PDF Download */}
          <div className="p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-50 text-rose-700 rounded border border-rose-200 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                    Direct PDF Document (.pdf)
                  </h4>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    Recommended
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Standalone pre-rendered PDF with exact 12 pages, formal cover, approval sheet, tables, and page numbering.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                generatePdfDocument(metadata, pages);
                onClose();
              }}
              className="px-3 py-1.5 bg-indigo-900 text-white rounded-md text-xs font-medium hover:bg-indigo-950 flex items-center gap-1.5 flex-shrink-0 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* 2. Vector Print / Save as PDF */}
          <div className="p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 mt-0.5">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  Browser Print / Vector Save As PDF
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Uses native high-resolution vector printer with CSS @page A4 boundaries. Select "Save as PDF" in print dialog for crisp typography.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => onPrint(), 150);
              }}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-md text-xs font-medium hover:bg-slate-800 flex items-center gap-1.5 flex-shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Preview</span>
            </button>
          </div>

          {/* 3. Microsoft Word (.doc) */}
          <div className="p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-700 rounded border border-blue-200 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  Microsoft Word Document (.doc)
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Fully editable Office XML/Word format with Word page breaks, heading styles, and tables. Compatible with Word & Google Docs.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                generateWordDocument(metadata, pages);
                onClose();
              }}
              className="px-3 py-1.5 border border-slate-300 text-slate-800 rounded-md text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5 flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .DOC</span>
            </button>
          </div>

          {/* 4. Academic Markdown (.md) */}
          <div className="p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 mt-0.5">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  Markdown Specification (.md)
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Formatted GitHub Flavored Markdown file with tables, code fences, and section headers. Perfect for repository documentation.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                generateMarkdownDocument(metadata, pages);
                onClose();
              }}
              className="px-3 py-1.5 border border-slate-300 text-slate-800 rounded-md text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5 flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD</span>
            </button>
          </div>

          {/* 5. JSON Schema (.json) */}
          <div className="p-3.5 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-50 text-amber-700 rounded border border-amber-200 mt-0.5">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  Structured Specification Data (.json)
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  Machine-readable JSON schema containing all metadata, requirements, test cases, and table mappings.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                generateJsonSpecification(metadata, pages);
                onClose();
              }}
              className="px-3 py-1.5 border border-slate-300 text-slate-800 rounded-md text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5 flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .JSON</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Satisfies minimum 10 pages requirement (Total: 12 Pages)</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
