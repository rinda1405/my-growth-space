import React, { useState } from 'react';
import { AppData, KtiProject, KtiType, KtiStage } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Target,
  Layers,
  HelpCircle
} from 'lucide-react';

interface KtiTrackerViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigateToEvidence?: () => void;
}

const KTI_TYPES: KtiType[] = [
  'Panduan',
  'Lembar Kerja',
  'Lokakarya',
  'Pendampingan',
  'Modul',
  'Kursus',
  'Proyek Literasi Riset',
  'Lainnya',
];

const KTI_STAGES: KtiStage[] = [
  'Ide / Konsep',
  'Pengembangan',
  'Uji Coba / Review',
  'Finalisasi',
  'Selesai',
];

export const KtiTrackerView: React.FC<KtiTrackerViewProps> = ({
  data,
  onUpdateData,
  onNavigateToEvidence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<KtiProject | null>(null);

  const [formData, setFormData] = useState<Omit<KtiProject, 'id'>>({
    title: '',
    type: 'Panduan',
    targetAudience: '',
    problemNeed: '',
    learningObjective: '',
    references: '',
    stage: 'Ide / Konsep',
    startDate: new Date().toISOString().slice(0, 10),
    targetDate: '',
    reviewTrial: '',
    feedbackEvaluation: '',
    outputLink: '',
    portfolioEvidence: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Panduan',
      targetAudience: '',
      problemNeed: '',
      learningObjective: '',
      references: '',
      stage: 'Ide / Konsep',
      startDate: new Date().toISOString().slice(0, 10),
      targetDate: '',
      reviewTrial: '',
      feedbackEvaluation: '',
      outputLink: '',
      portfolioEvidence: '',
      notes: '',
    });
    setEditingProject(null);
  };

  const handleOpenEdit = (project: KtiProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      type: project.type,
      targetAudience: project.targetAudience,
      problemNeed: project.problemNeed,
      learningObjective: project.learningObjective,
      references: project.references,
      stage: project.stage,
      startDate: project.startDate,
      targetDate: project.targetDate,
      reviewTrial: project.reviewTrial,
      feedbackEvaluation: project.feedbackEvaluation,
      outputLink: project.outputLink,
      portfolioEvidence: project.portfolioEvidence,
      notes: project.notes,
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingProject) {
      const updated = data.ktiProjects.map(k =>
        k.id === editingProject.id ? { ...formData, id: editingProject.id } : k
      );
      onUpdateData({ ...data, ktiProjects: updated });
    } else {
      const newProject: KtiProject = {
        ...formData,
        id: `kti-${Date.now()}`,
      };
      onUpdateData({
        ...data,
        ktiProjects: [newProject, ...data.ktiProjects],
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus proyek KTI ini?')) {
      const updated = data.ktiProjects.filter(k => k.id !== id);
      onUpdateData({ ...data, ktiProjects: updated });
    }
  };

  const filteredProjects = (data.ktiProjects || []).filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problemNeed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStage = selectedStage === 'all' || item.stage === selectedStage;
    return matchesSearch && matchesType && matchesStage;
  });

  const getStageBadgeVariant = (stage: KtiStage) => {
    if (stage === 'Selesai') return 'success';
    if (stage === 'Finalisasi') return 'cyan';
    if (stage === 'Uji Coba / Review') return 'warning';
    return 'navy';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
              Pilar 1 — KTI & Scientific Writing 2027
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight mt-1">
            KTI Project Tracker — Karya Tulis Ilmiah & Modul Edukasi
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Pengembangan produk tulisan ilmiah: modul, lembar kerja riset, lokakarya, kurikulum, panduan, dan evaluasi hasil.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy text-white text-xs font-medium hover:bg-navy-900 shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4 text-cyan" />
            <span>Tambah Proyek KTI</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Cari judul proyek, sasaran, atau masalah..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Jenis KTI</option>
            {KTI_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Tahap</option>
            {KTI_STAGES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KTI Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="Belum ada proyek KTI"
          description="Mulai susun modul riset, panduan esai, lembar kerja siswa, atau kurikulum literasi ilmiah baru."
          actionText="Tambah Proyek KTI"
          onAction={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<FileText className="h-6 w-6 text-cyan-600" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <Card key={project.id} className="flex flex-col justify-between hover:border-cyan/40 transition-all">
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant={getStageBadgeVariant(project.stage)} size="sm">
                      {project.stage}
                    </Badge>
                    <Badge variant="cyan" size="sm">
                      {project.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1 rounded text-navy-400 hover:text-navy hover:bg-navy-50"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1 rounded text-navy-400 hover:text-red-600 hover:bg-navy-50"
                      title="Hapus"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <h4 className="text-sm font-semibold text-navy leading-snug">
                    {project.title}
                  </h4>
                  {project.targetAudience && (
                    <p className="text-[11px] text-navy-500 mt-1">
                      Sasaran: <strong className="text-navy-700">{project.targetAudience}</strong>
                    </p>
                  )}
                </div>

                {/* Problem & Objective */}
                <div className="space-y-1.5 text-xs">
                  {project.problemNeed && (
                    <div className="p-2 rounded-lg bg-navy-50/70 border border-navy/10 text-navy-700">
                      <span className="font-semibold text-navy-800 text-[11px]">Kebutuhan/Masalah: </span>
                      <p className="text-[11px] text-navy-600 line-clamp-2 mt-0.5">{project.problemNeed}</p>
                    </div>
                  )}
                  {project.learningObjective && (
                    <div className="text-[11px] text-navy-600">
                      <span className="font-semibold text-navy-700">Tujuan Pembelajaran: </span>
                      <span>{project.learningObjective}</span>
                    </div>
                  )}
                </div>

                {/* Review & Feedback */}
                {(project.reviewTrial || project.feedbackEvaluation) && (
                  <div className="p-2.5 rounded-lg bg-cyan-50/60 border border-cyan/30 text-xs space-y-1">
                    {project.reviewTrial && (
                      <div className="text-[11px] text-navy-700">
                        <span className="font-semibold text-cyan-800">Uji Coba: </span>
                        <span>{project.reviewTrial}</span>
                      </div>
                    )}
                    {project.feedbackEvaluation && (
                      <div className="text-[11px] text-navy-600">
                        <span className="font-semibold text-cyan-800">Evaluasi: </span>
                        <span>{project.feedbackEvaluation}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence Portfolio */}
                {project.portfolioEvidence && (
                  <div className="text-[11px] text-navy-600">
                    <span className="font-semibold text-navy-700">Portfolio Evidence: </span>
                    <span>{project.portfolioEvidence}</span>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-navy-400">
                  Target: {project.targetDate || 'Fleksibel'}
                </span>
                {project.outputLink && (
                  <a
                    href={project.outputLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 text-xs font-medium"
                  >
                    <span>Tautan Hasil</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title={editingProject ? 'Edit Proyek KTI' : 'Tambah Proyek KTI Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Judul Proyek KTI <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Misal: Panduan Praktis Menulis Esai Ilmiah Populer..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Jenis KTI
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as KtiType })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {KTI_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tahap Proyek
              </label>
              <select
                value={formData.stage}
                onChange={e => setFormData({ ...formData, stage: e.target.value as KtiStage })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {KTI_STAGES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Sasaran Pembaca / Pengguna
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="Misal: Guru BK, Konselor, Pelajar SMA..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Masalah / Kebutuhan yang Diselesaikan
              </label>
              <textarea
                rows={2}
                value={formData.problemNeed}
                onChange={e => setFormData({ ...formData, problemNeed: e.target.value })}
                placeholder="Jelaskan kesenjangan atau kendala empiris yang dihadapi..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Tujuan Pembelajaran / Kompetensi
              </label>
              <input
                type="text"
                value={formData.learningObjective}
                onChange={e => setFormData({ ...formData, learningObjective: e.target.value })}
                placeholder="Tujuan spesifik yang diharapkan dapat dicapai pengguna..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Target Selesai
              </label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Referensi Teori / Pustaka
              </label>
              <input
                type="text"
                value={formData.references}
                onChange={e => setFormData({ ...formData, references: e.target.value })}
                placeholder="Landasan literatur atau teori utama yang dirujuk..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Uji Coba / Peninjauan
              </label>
              <input
                type="text"
                value={formData.reviewTrial}
                onChange={e => setFormData({ ...formData, reviewTrial: e.target.value })}
                placeholder="Catatan uji coba keterbacaan atau piloting..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Umpan Balik / Evaluasi
              </label>
              <input
                type="text"
                value={formData.feedbackEvaluation}
                onChange={e => setFormData({ ...formData, feedbackEvaluation: e.target.value })}
                placeholder="Feedback dari responden atau rekan sejawat..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tautan Hasil (Google Drive / PDF / Web)
              </label>
              <input
                type="url"
                value={formData.outputLink}
                onChange={e => setFormData({ ...formData, outputLink: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Evidence Portfolio
              </label>
              <input
                type="text"
                value={formData.portfolioEvidence}
                onChange={e => setFormData({ ...formData, portfolioEvidence: e.target.value })}
                placeholder="Deskripsi artefak portofolio..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Catatan
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Catatan revisi, kolaborator, atau rencana pengembangan lanjutan..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="px-4 py-2 rounded-lg border border-navy/20 text-xs text-navy-600 hover:bg-navy-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-medium hover:bg-navy-900"
            >
              {editingProject ? 'Simpan Perubahan' : 'Tambah Proyek'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
