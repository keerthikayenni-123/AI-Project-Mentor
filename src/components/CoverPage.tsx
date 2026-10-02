import React from 'react';
import { DocumentMetadata } from '../types/srs';
import { Award, BookOpen, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';

interface CoverPageProps {
  metadata: DocumentMetadata;
}

export const CoverPage: React.FC<CoverPageProps> = ({ metadata }) => {
  return (
    <div className="flex flex-col justify-between h-full p-8 md:p-12 relative border-8 border-double border-slate-700/80 bg-white">
      {/* Decorative Corner Ornaments */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-900 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-900 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-900 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-900 pointer-events-none" />

      {/* Top Header: Institution & Affiliation */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-2 mb-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
          <BookOpen className="w-8 h-8 text-indigo-900" />
        </div>
        <h2 className="font-academic-title tracking-wider text-xl md:text-2xl font-bold text-slate-900 uppercase">
          {metadata.institutionName}
        </h2>
        <p className="text-xs md:text-sm font-academic-serif italic text-slate-600 tracking-wide uppercase">
          {metadata.institutionSubtitle}
        </p>
        <p className="text-xs md:text-sm font-semibold text-slate-800 tracking-wider">
          {metadata.department}
        </p>
        <div className="w-32 h-0.5 bg-slate-400 mx-auto mt-3" />
      </div>

      {/* Middle Section: Document Classification & Title */}
      <div className="text-center my-6 space-y-4">
        <div className="inline-block px-4 py-1.5 border border-indigo-900/30 bg-indigo-50/60 rounded text-indigo-950 font-bold text-xs md:text-sm tracking-widest uppercase">
          SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
        </div>
        
        <div className="text-xs font-academic-serif text-slate-500 space-y-0.5">
          <p>Conforming to <span className="font-semibold text-slate-700">{metadata.standard}</span></p>
          <p>Document ID: <span className="font-mono text-slate-700">{metadata.documentRef}</span> · Version <span className="font-mono text-slate-700">{metadata.version}</span></p>
        </div>

        <div className="pt-3 pb-2">
          <h1 className="font-academic-title text-3xl md:text-4xl font-extrabold text-slate-950 tracking-wide leading-tight">
            {metadata.projectTitle}
          </h1>
          <p className="font-academic-serif italic text-sm md:text-base text-slate-700 max-w-xl mx-auto mt-2 leading-relaxed">
            {metadata.projectSubtitle}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-indigo-800 bg-indigo-50/80 py-1.5 px-3 rounded border border-indigo-100 max-w-md mx-auto">
          <span>GitHub:</span>
          <a 
            href={metadata.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-semibold truncate"
          >
            {metadata.repoUrl}
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>

        <div className="pt-4 text-xs font-academic-serif text-slate-600 max-w-lg mx-auto">
          <p>A Capstone Engineering Requirements Specification submitted in partial fulfillment of the requirements for the award of the degree of</p>
          <p className="font-bold text-slate-900 text-sm mt-1 tracking-wide uppercase">
            {metadata.degree} in Computer Science & Engineering
          </p>
        </div>
      </div>

      {/* Authors & Supervision Block */}
      <div className="border border-slate-300 bg-slate-50/70 p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-academic-serif text-slate-800">
        <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-300 pb-3 md:pb-0 md:pr-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            <UserCheck className="w-3.5 h-3.5 text-indigo-900" />
            <span>Submitted By:</span>
          </div>
          {metadata.students.map((student, idx) => (
            <div key={idx} className="pl-1">
              <span className="font-bold text-slate-950">{student.name}</span>
              <span className="text-slate-600 font-mono ml-1.5">({student.rollNo})</span>
              {student.role && (
                <div className="text-[10px] text-slate-500 italic pl-0.5">{student.role}</div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-1.5 pl-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            <Award className="w-3.5 h-3.5 text-indigo-900" />
            <span>Under the Guidance of:</span>
          </div>
          <div>
            <p className="font-bold text-slate-950">{metadata.guideName}</p>
            <p className="text-slate-700">{metadata.guideDesignation}</p>
            <p className="text-slate-600 text-[10px]">{metadata.guideDepartment}</p>
          </div>
        </div>
      </div>

      {/* Bottom Academic Year & Date Footer */}
      <div className="text-center pt-4 border-t border-slate-300 mt-4 space-y-0.5">
        <p className="font-bold font-academic-title text-xs md:text-sm text-slate-900 tracking-wider">
          ACADEMIC YEAR: {metadata.academicYear}
        </p>
        <p className="text-[11px] font-academic-serif text-slate-600">
          Official Submission: {metadata.submissionDate} · All Rights Reserved
        </p>
      </div>
    </div>
  );
};
