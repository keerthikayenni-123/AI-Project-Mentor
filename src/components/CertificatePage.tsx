import React from 'react';
import { DocumentMetadata } from '../types/srs';
import { CheckCircle2, FileSignature, ShieldAlert, Award } from 'lucide-react';

interface CertificatePageProps {
  metadata: DocumentMetadata;
}

export const CertificatePage: React.FC<CertificatePageProps> = ({ metadata }) => {
  return (
    <div className="flex flex-col justify-between h-full p-8 md:p-10 text-slate-800 font-academic-serif bg-white">
      {/* Page Title */}
      <div className="text-center pb-4 border-b border-slate-300">
        <h2 className="font-academic-title text-xl md:text-2xl font-bold text-slate-900 tracking-wider">
          BONAFIDE CERTIFICATE
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
          Department of Computer Science & Engineering · Academic Record
        </p>
      </div>

      {/* Certificate Statement */}
      <div className="my-4 text-justify leading-relaxed text-sm md:text-[14.5px] space-y-3">
        <p>
          This is to certify that this Software Requirements Specification entitled{' '}
          <strong className="text-slate-950 font-bold">
            "{metadata.projectTitle}: {metadata.projectSubtitle}"
          </strong>{' '}
          is a bonafide record of technical requirements engineering work carried out by{' '}
          <strong className="text-slate-950">
            {metadata.students.map((s, idx) => (
              <span key={idx}>
                {s.name} <span className="font-mono text-xs">({s.rollNo})</span>
                {idx < metadata.students.length - 1 ? ', ' : ''}
              </span>
            ))}
          </strong>{' '}
          under my direct supervision and academic mentorship, in partial fulfillment of the requirements for the
          award of the degree of{' '}
          <strong className="text-slate-950">{metadata.degree}</strong> in Computer Science and Engineering from{' '}
          <strong className="text-slate-950">{metadata.institutionName}</strong> during the academic year{' '}
          <strong className="text-slate-950">{metadata.academicYear}</strong>.
        </p>
        <p className="text-xs text-slate-600 italic">
          The specifications and designs documented herein have been inspected for compliance with IEEE Std 830-1998
          standards and verified against university capstone evaluation criteria.
        </p>
      </div>

      {/* Declaration of Originality */}
      <div className="border border-slate-200 bg-slate-50 p-4 rounded text-xs space-y-1.5 my-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Declaration of Originality by Project Authors</span>
        </div>
        <p className="text-slate-700 leading-normal">
          We hereby declare that this Software Requirements Specification is our original work, conceived and
          authored in conjunction with our technical prototype available on GitHub ({metadata.repoUrl}). It has
          not been submitted previously for any other degree or diploma examination at any other institution.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-slate-800 font-semibold">
          {metadata.students.map((student, idx) => (
            <div key={idx} className="border-b border-dashed border-slate-400 pb-1">
              <span>{student.name}</span>
              <span className="text-[10px] text-slate-500 ml-1 font-mono">[{student.rollNo}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sign-off Boxes (Guide, Coordinator, HOD) */}
      <div className="my-3">
        <h4 className="font-academic-title text-xs font-bold text-slate-900 tracking-wider mb-2 uppercase">
          Department Review & Approval Committee
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Guide */}
          <div className="border border-slate-300 p-3 rounded bg-white flex flex-col justify-between h-32">
            <div>
              <p className="font-bold text-xs text-slate-900 uppercase tracking-wide">Internal Guide</p>
              <p className="text-[11px] font-semibold text-slate-800 mt-1">{metadata.guideName}</p>
              <p className="text-[10px] text-slate-500">{metadata.guideDesignation}</p>
            </div>
            <div className="border-t border-slate-200 pt-1 text-[10px] text-slate-400">
              Signature: ________________
            </div>
          </div>

          {/* Coordinator */}
          <div className="border border-slate-300 p-3 rounded bg-white flex flex-col justify-between h-32">
            <div>
              <p className="font-bold text-xs text-slate-900 uppercase tracking-wide">Project Coordinator</p>
              <p className="text-[11px] font-semibold text-slate-800 mt-1">{metadata.coordinatorName}</p>
              <p className="text-[10px] text-slate-500">Associate Professor</p>
            </div>
            <div className="border-t border-slate-200 pt-1 text-[10px] text-slate-400">
              Signature: ________________
            </div>
          </div>

          {/* HOD */}
          <div className="border border-slate-300 p-3 rounded bg-white flex flex-col justify-between h-32">
            <div>
              <p className="font-bold text-xs text-slate-900 uppercase tracking-wide">Head of Department</p>
              <p className="text-[11px] font-semibold text-slate-800 mt-1">{metadata.hodName}</p>
              <p className="text-[10px] text-slate-500">Senior Professor & HOD</p>
            </div>
            <div className="border-t border-slate-200 pt-1 text-[10px] text-slate-400">
              Signature: ________________
            </div>
          </div>
        </div>
      </div>

      {/* External Viva Voce Examiner Block */}
      <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-3.5 rounded text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-indigo-950 uppercase tracking-wide text-[11px]">
            <Award className="w-4 h-4 text-indigo-800" />
            <span>External Viva Voce Examiner Endorsement</span>
          </div>
          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
            Official University Evaluation
          </span>
        </div>
        <p className="text-[11px] text-slate-700 leading-normal">
          External Examiner Name & University: ___________________________________________________________
        </p>
        <div className="flex items-center gap-6 text-[11px] text-slate-700">
          <span>Verdict:</span>
          <span className="inline-flex items-center gap-1">☐ Approved as Submitted</span>
          <span className="inline-flex items-center gap-1">☐ Approved with Minor Revisions</span>
          <span className="inline-flex items-center gap-1">☐ Rejected</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
          <span>Examiner Signature with Institutional Stamp: ________________________</span>
          <span>Date: ______________</span>
        </div>
      </div>
    </div>
  );
};
