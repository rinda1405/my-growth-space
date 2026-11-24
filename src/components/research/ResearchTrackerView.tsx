import React, { useState } from 'react';
import { AppData, ResearchProject, ResearchStage } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  GraduationCap,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Building,
  Flag,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';

interface ResearchTrackerViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigateToEvidence?: () => void;
}

const RESEARCH_STAGES: ResearchStage[] = [
  'Minat Penelitian',
  'Eksplorasi Literatur',
  'Pertanyaan Penelitian',
  'Proposal',
  'Etik / Izin',
  'Pengumpulan Data',
  'Analisis',
  'Penulisan',
  'Luaran',
  'Dipublikasikan / Dipresentasikan',
  'Ditunda',
];

export const ResearchTrackerView: React.FC<ResearchTrackerViewProps> = ({
  data,
  onUpdateData,
  onNavigateToEvidence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);

  const [formData, setFormData] = useState<Omit<ResearchProject, 'id'>>({
    field: '',
    topicOrQuestion: '',
    institutionOrLab: '',
    opportunityType: '',
    sourceUrl: '',
    priority: 'Tinggi',
    dateAdded: new Date().toISOString().slice(0, 10),
    stage: 'Minat Penelitian',
    nextAction: '',
    actionDate: new Date().toISOString().slice(0, 10),
    progressStatus: 'Belum Mulai',
    outcomesEvidence: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      field: '',
      topicOrQuestion: '',
      institutionOrLab: '',
      opportunityType: '',
      sourceUrl: '',
      priority: 'Tinggi',
      dateAdded: new Date().toISOString().slice(0, 10),
      stage: 'Minat Penelitian',
      nextAction: '',
      actionDate: new Date().toISOString().slice(0, 10),
      progressStatus: 'Belum Mulai',
      outcomesEvidence: '',
      notes: '',
    });
    setEditingProject(null);
  };

  const handleOpenEdit = (project: ResearchProject) => {
    setEditingProject(project);
    setFormData({
      field: project.field,
      topicOrQuestion: project.topicOrQuestion,
      institutionOrLab: project.institutionOrLab,
      opportunityType: project.opportunityType,
      sourceUrl: project.sourceUrl,
      priority: project.priority,
      dateAdded: project.dateAdded,
      stage: project.stage,
      nextAction: project.nextAction,
      actionDate: project.actionDate,
      progressStatus: project.progressStatus,
      outcomesEvidence: project.outcomesEvidence,
      notes: project.notes,
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topicOrQuestion.trim()) return;

    if (editingProject) {
      const updated = data.researchProjects.map(p =>
        p.id === editingProject.id ? { ...formData, id: editingProject.id } : p
      );
      onUpdateData({ ...data, researchProjects: updated });
    } else {
      const newProject: ResearchProject = {
        ...formData,
        id: `res-${Date.now()}`,
      };
      onUpdateData({
        ...data,
        researchProjects: [newProject, ...data.researchProjects],
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus penelitian ini?')) {
      const updated = data.researchProjects.filter(p => p.id !== id);
      onUpdateData({ ...data, researchProjects: updated });
    }
  };

  const filteredProjects = (data.researchProjects || []).filter(item => {
    const matchesSearch =
      item.topicOrQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institutionOrLab.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || item.stage === selectedStage;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    return matchesSearch && matchesStage && matchesPriority;
  });

  const getPriorityBadgeVariant = (priority: string) => {
    if (priority === 'Tinggi') return 'danger';
    if (priority === 'Sedang') return 'warning';
    return 'subtle';
  };

  const getStageBadgeVariant = (stage: ResearchStage) => {
    if (stage === 'Dipublikasikan / Dipresentasikan') return 'success';
    if (stage === 'Ditunda') return 'subtle';
    if (stage === 'Penulisan' || stage === 'Luaran') return 'cyan';
    return 'navy';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
              Pilar 2 — Riset 2027
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight mt-1">
            Research Tracker — Peluang & Pengalaman Penelitian
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Identifikasi peluang lab, kelola tahapan penelitian dari eksplorasi literatur hingga publikasi, dan catat evidence riset.
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
            <span>Tambah Peluang Riset</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Cari topik, bidang, atau institusi..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          />
        </div>

        <div>
          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Tahap Riset</option>
            {RESEARCH_STAGES.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Prioritas</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Rendah">Rendah</option>
          </select>
        </div>
      </div>

      {/* Research Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="Belum ada data penelitian"
          description="Mulai identifikasi peluang riset, lab, atau call for papers baru untuk portfolio 2027 Anda."
          actionText="Tambah Riset Baru"
          onAction={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<GraduationCap className="h-6 w-6 text-cyan-600" />}
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
                    <Badge variant={getPriorityBadgeVariant(project.priority)} size="sm">
                      Prioritas {project.priority}
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

                {/* Topic / Question */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
                    {project.field || 'Bidang Riset'}
                  </span>
                  <h4 className="text-sm font-semibold text-navy leading-snug mt-0.5">
                    {project.topicOrQuestion}
                  </h4>
                </div>

                {/* Institution / Opportunity */}
                <div className="space-y-1 text-xs text-navy-600">
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{project.institutionOrLab || 'Institusi belum diisi'}</span>
                  </div>
                  {project.opportunityType && (
                    <div className="flex items-center gap-1.5 text-[11px] text-navy-500">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
                      <span>{project.opportunityType}</span>
                    </div>
                  )}
                </div>

                {/* Next Action Box */}
                {project.nextAction && (
                  <div className="p-2.5 rounded-lg bg-navy-50/70 border border-navy/10 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-navy-500">
                      <span>Tindakan Selanjutnya:</span>
                      {project.actionDate && (
                        <span className="flex items-center gap-1 text-[10px] text-navy-400">
                          <Calendar className="h-3 w-3" />
                          {project.actionDate}
                        </span>
                      )}
                    </div>
                    <p className="text-navy-700 font-medium leading-relaxed">
                      {project.nextAction}
                    </p>
                  </div>
                )}

                {/* Outcomes / Evidence */}
                {project.outcomesEvidence && (
                  <div className="text-[11px] text-navy-600">
                    <span className="font-semibold text-navy-700">Bukti/Luaran: </span>
                    <span>{project.outcomesEvidence}</span>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-navy-400">
                  Status: <strong className="text-navy-700">{project.progressStatus}</strong>
                </span>
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 text-xs font-medium"
                  >
                    <span>Link Sumber</span>
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
        title={editingProject ? 'Edit Peluang / Proyek Riset' : 'Tambah Peluang / Proyek Riset'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Topik / Pertanyaan Penelitian <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.topicOrQuestion}
                onChange={e => setFormData({ ...formData, topicOrQuestion: e.target.value })}
                placeholder="Contoh: Pengaruh Teknik Retrieval Practice Terhadap Retensi Memori..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Bidang Penelitian
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={e => setFormData({ ...formData, field: e.target.value })}
                placeholder="Misal: Neuroeducation, Konseling Remaja"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Peneliti / Lab / Institusi
              </label>
              <input
                type="text"
                value={formData.institutionOrLab}
                onChange={e => setFormData({ ...formData, institutionOrLab: e.target.value })}
                placeholder="Misal: Lab Kognitif Universitas Mitra"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Jenis Peluang
              </label>
              <input
                type="text"
                value={formData.opportunityType}
                onChange={e => setFormData({ ...formData, opportunityType: e.target.value })}
                placeholder="Misal: Call for Paper, Remote RA, Kolaborasi"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Link / Sumber
              </label>
              <input
                type="url"
                value={formData.sourceUrl}
                onChange={e => setFormData({ ...formData, sourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tahap Penelitian
              </label>
              <select
                value={formData.stage}
                onChange={e => setFormData({ ...formData, stage: e.target.value as ResearchStage })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {RESEARCH_STAGES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Prioritas
              </label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Status Progres
              </label>
              <select
                value={formData.progressStatus}
                onChange={e => setFormData({ ...formData, progressStatus: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="Belum Mulai">Belum Mulai</option>
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditunda">Ditunda</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Dicatat
              </label>
              <input
                type="date"
                value={formData.dateAdded}
                onChange={e => setFormData({ ...formData, dateAdded: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tindakan Selanjutnya
              </label>
              <input
                type="text"
                value={formData.nextAction}
                onChange={e => setFormData({ ...formData, nextAction: e.target.value })}
                placeholder="Langkah spesifik berikutnya..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Tindakan
              </label>
              <input
                type="date"
                value={formData.actionDate}
                onChange={e => setFormData({ ...formData, actionDate: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Hasil / Evidence
              </label>
              <input
                type="text"
                value={formData.outcomesEvidence}
                onChange={e => setFormData({ ...formData, outcomesEvidence: e.target.value })}
                placeholder="Draft naskah, dataset, abstrak yang dipresentasikan, dll."
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
                placeholder="Catatan tambahan, timeline, atau kolaborator..."
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
              {editingProject ? 'Simpan Perubahan' : 'Tambah Penelitian'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
