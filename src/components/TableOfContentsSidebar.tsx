import React, { useState } from 'react';
import { SRSPage } from '../types/srs';
import { BookOpen, ChevronRight, Search, X, CheckSquare, Layers } from 'lucide-react';

interface TableOfContentsSidebarProps {
  pages: SRSPage[];
  currentPage: number;
  onSelectPage: (pageNumber: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TableOfContentsSidebar: React.FC<TableOfContentsSidebarProps> = ({
  pages,
  currentPage,
  onSelectPage,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = pages.filter((page) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = page.title.toLowerCase().includes(query);
    const sectionMatch = page.sections.some(
      (sec) =>
        sec.heading?.toLowerCase().includes(query) ||
        sec.paragraphs?.some((p) => p.toLowerCase().includes(query))
    );
    return titleMatch || sectionMatch;
  });

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-80 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 ease-in-out flex flex-col no-print ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-800" />
            <div>
              <h3 className="font-academic-title text-sm font-bold text-slate-900">
                Document Contents
              </h3>
              <p className="text-[11px] text-slate-500">12 Pages · IEEE Std 830-1998</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search sections or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-600 bg-slate-50"
            />
          </div>
        </div>

        {/* List of 12 pages */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredPages.map((page) => {
            const isSelected = currentPage === page.pageNumber;
            return (
              <button
                key={page.pageNumber}
                onClick={() => {
                  onSelectPage(page.pageNumber);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start justify-between group ${
                  isSelected
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-100 font-bold">
                      P.{page.pageNumber}
                    </span>
                    <span className="font-academic-title text-[11px] leading-tight">
                      {page.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1 pl-6">
                    {page.headerTitle}
                  </p>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-1 transition-transform ${
                  isSelected ? 'text-indigo-800 rotate-90' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
              </button>
            );
          })}

          {filteredPages.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching sections found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Minimum Target:</span>
            <span className="font-semibold text-emerald-700">10 Pages Required</span>
          </div>
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Compiled Document:</span>
            <span className="text-indigo-800">12 Full Pages</span>
          </div>
        </div>
      </aside>
    </>
  );
};
