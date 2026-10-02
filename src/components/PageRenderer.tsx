import React from 'react';
import { DocumentMetadata, SRSPage } from '../types/srs';
import { CoverPage } from './CoverPage';
import { CertificatePage } from './CertificatePage';
import { Info, AlertCircle, Quote } from 'lucide-react';

interface PageRendererProps {
  page: SRSPage;
  metadata: DocumentMetadata;
  totalPages: number;
  scale?: number;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  metadata,
  totalPages,
  scale = 1,
}) => {
  // If Cover Page (Page 1)
  if (page.pageNumber === 1) {
    return (
      <div 
        id={`srs-page-${page.pageNumber}`}
        className="a4-page transition-transform duration-200"
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top center' }}
      >
        <CoverPage metadata={metadata} />
      </div>
    );
  }

  // If Certificate Page (Page 2)
  if (page.pageNumber === 2 && page.sections[0]?.customComponent === 'certificatePage') {
    return (
      <div 
        id={`srs-page-${page.pageNumber}`}
        className="a4-page transition-transform duration-200"
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top center' }}
      >
        {/* Running Header */}
        <div className="flex justify-between items-center px-10 pt-6 text-[10px] font-academic-serif italic text-slate-500 border-b border-slate-200 pb-2">
          <span>{metadata.projectTitle} · IEEE Std 830-1998</span>
          <span className="font-mono">Doc Ref: {metadata.documentRef}</span>
        </div>

        <div className="flex-1">
          <CertificatePage metadata={metadata} />
        </div>

        {/* Running Footer */}
        <div className="flex justify-between items-center px-10 pb-6 pt-2 text-[10px] font-academic-serif text-slate-500 border-t border-slate-200 mt-2">
          <span>Academic Endorsement & Bonafide Certificate</span>
          <span className="font-semibold text-slate-700">Page {page.pageNumber} of {totalPages}</span>
        </div>
      </div>
    );
  }

  // Standard Pages (Pages 3 to 12)
  return (
    <div 
      id={`srs-page-${page.pageNumber}`}
      className="a4-page transition-transform duration-200 p-8 md:p-10 font-academic-serif text-slate-800"
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top center' }}
    >
      {/* Running Header */}
      <div className="flex justify-between items-center pb-2 mb-4 border-b border-slate-200 text-[10px] text-slate-500">
        <span className="truncate max-w-sm font-academic-title uppercase tracking-wider text-slate-700">
          {metadata.projectTitle} · SRS Document
        </span>
        <span className="font-mono text-slate-500 flex-shrink-0">
          {metadata.documentRef}
        </span>
      </div>

      {/* Main Page Content */}
      <div className="flex-1 flex flex-col justify-start space-y-4">
        {/* Page Title */}
        <div className="border-b border-slate-200 pb-2">
          <h2 className="font-academic-title text-lg md:text-xl font-bold text-slate-900 tracking-wide">
            {page.title}
          </h2>
          <p className="text-[11px] text-slate-500 italic">
            {page.headerTitle}
          </p>
        </div>

        {/* Sections */}
        {page.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-2">
            {section.heading && (
              <h3 className="font-academic-title text-xs md:text-sm font-bold text-slate-900 tracking-wider pt-1 uppercase text-indigo-950">
                {section.heading}
              </h3>
            )}

            {section.subheading && (
              <h4 className="font-semibold text-xs text-indigo-900">
                {section.subheading}
              </h4>
            )}

            {section.paragraphs && section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-xs md:text-[13px] leading-relaxed text-justify text-slate-700">
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="space-y-1 my-1 pl-1">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="text-xs md:text-[12.5px] leading-relaxed text-slate-700 flex items-start gap-1.5">
                    <span className="text-indigo-700 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.callout && (
              <div className={`p-3 rounded text-xs leading-relaxed my-2 border flex items-start gap-2.5 ${
                section.callout.type === 'important' 
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                  : section.callout.type === 'quote'
                  ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950 italic'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                {section.callout.type === 'important' ? (
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                ) : section.callout.type === 'quote' ? (
                  <Quote className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  {section.callout.title && (
                    <div className="font-bold text-xs uppercase tracking-wider mb-0.5">
                      {section.callout.title}
                    </div>
                  )}
                  <p>{section.callout.text}</p>
                </div>
              </div>
            )}

            {section.table && (
              <div className="my-2 overflow-x-auto rounded border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-2 font-bold font-academic-title text-[11px] tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {section.table.rows.map((row, rIdx) => (
                      <tr 
                        key={rIdx} 
                        className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60 hover:bg-slate-100/50'}
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 text-[11px] text-slate-700 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.diagram && section.diagram.asciiArt && (
              <div className="my-2 space-y-1">
                <div className="font-bold text-xs text-slate-900">
                  {section.diagram.title}
                </div>
                <div className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-[9.5px] leading-tight overflow-x-auto shadow-inner border border-slate-700">
                  <pre className="font-academic-mono">{section.diagram.asciiArt.trim()}</pre>
                </div>
                <div className="text-[10px] text-slate-500 italic text-center">
                  {section.diagram.caption}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Running Footer */}
      <div className="flex justify-between items-center pt-2 mt-4 border-t border-slate-200 text-[10px] text-slate-500">
        <span>Confidential & Academic Bonafide Record · Dept. of CSE</span>
        <span className="font-semibold text-slate-800">
          Page {page.pageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
};
