import React, { useState } from 'react';
import { DocumentMetadata, StudentMember } from '../types/srs';
import { X, Plus, Trash2, RotateCcw, Check, Sparkles, Building, User, Calendar, BookmarkCheck } from 'lucide-react';
import { defaultMetadata } from '../data/srsContent';
import { storageService } from '../services/storageService';

interface DocumentCustomizerModalProps {
  metadata: DocumentMetadata;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newMetadata: DocumentMetadata) => void;
}

export const DocumentCustomizerModal: React.FC<DocumentCustomizerModalProps> = ({
  metadata,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<DocumentMetadata>({ ...metadata });
  const [activeTab, setActiveTab] = useState<'project' | 'institution' | 'students' | 'faculty'>('project');

  if (!isOpen) return null;

  const handleStudentChange = (index: number, field: keyof StudentMember, value: string) => {
    const updated = [...formData.students];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, students: updated });
  };

  const handleAddStudent = () => {
    setFormData({
      ...formData,
      students: [
        ...formData.students,
        { name: '', rollNo: '', role: 'Team Member' }
      ]
    });
  };

  const handleRemoveStudent = (index: number) => {
    if (formData.students.length <= 1) return;
    setFormData({
      ...formData,
      students: formData.students.filter((_, i) => i !== index)
    });
  };

  const handleReset = () => {
    setFormData({ ...defaultMetadata });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.students[0]?.name) {
      const current = storageService.getCurrentUser();
      if (current) {
        storageService.setCurrentUser({
          ...current,
          fullName: formData.students[0].name,
          studentId: formData.students[0].rollNo || current.studentId,
          collegeOrUniversity: formData.institutionName || current.collegeOrUniversity,
          degreeOrBranch: formData.department || current.degreeOrBranch,
        });
      }
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="font-academic-title text-base font-bold text-slate-900">
              Customize SRS Document Details
            </h2>
            <p className="text-xs text-slate-500">
              Personalize student details, university affiliation, and guide credentials
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('project')}
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'project'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Project</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('institution')}
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'institution'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Institution</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'students'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Students ({formData.students.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faculty')}
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'faculty'
                ? 'bg-white text-indigo-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Guide & Faculty</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {activeTab === 'project' && (
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Project Subtitle / Scope
                </label>
                <textarea
                  rows={2}
                  value={formData.projectSubtitle}
                  onChange={(e) => setFormData({ ...formData, projectSubtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none font-mono text-[11px]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Document Ref & Version
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.documentRef}
                      onChange={(e) => setFormData({ ...formData, documentRef: e.target.value })}
                      className="w-2/3 px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none font-mono text-[11px]"
                    />
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-1/3 px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'institution' && (
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  College / Institution Name
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Affiliation / Accreditation Subtitle
                </label>
                <input
                  type="text"
                  value={formData.institutionSubtitle}
                  onChange={(e) => setFormData({ ...formData, institutionSubtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Submission Month / Date
                  </label>
                  <input
                    type="text"
                    value={formData.submissionDate}
                    onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Candidate Authors List</span>
                <button
                  type="button"
                  onClick={handleAddStudent}
                  className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Team Member</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {formData.students.map((student, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
                    <span className="font-mono text-xs text-slate-400 mt-2">{idx + 1}.</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Candidate Full Name"
                          value={student.name}
                          onChange={(e) => handleStudentChange(idx, 'name', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Roll / Reg No"
                          value={student.rollNo}
                          onChange={(e) => handleStudentChange(idx, 'rollNo', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono bg-white"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Role (e.g. Lead, Frontend)"
                          value={student.role || ''}
                          onChange={(e) => handleStudentChange(idx, 'role', e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs bg-white"
                        />
                      </div>
                    </div>
                    {formData.students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Project Guide / Supervisor Name
                </label>
                <input
                  type="text"
                  value={formData.guideName}
                  onChange={(e) => setFormData({ ...formData, guideName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Guide Designation
                  </label>
                  <input
                    type="text"
                    value={formData.guideDesignation}
                    onChange={(e) => setFormData({ ...formData, guideDesignation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Guide Department
                  </label>
                  <input
                    type="text"
                    value={formData.guideDepartment}
                    onChange={(e) => setFormData({ ...formData, guideDepartment: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Head of Department (HOD)
                  </label>
                  <input
                    type="text"
                    value={formData.hodName}
                    onChange={(e) => setFormData({ ...formData, hodName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Project Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={formData.coordinatorName}
                    onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 hover:bg-slate-100 rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-indigo-900 text-white rounded-md font-medium hover:bg-indigo-950 flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply & Update All 12 Pages</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
