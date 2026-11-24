import React, { useState } from 'react';
import { AppData, PortfolioEvidenceItem, EvidenceCategory } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Building,
  FileCheck2,
  Sparkles,
  Link,
  FolderCheck,
  GraduationCap,
  Users,
  FileText
} from 'lucide-react';

interface PortfolioEvidenceViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigateToTab?: (tab: any) => void;
}

const EVIDENCE_CATEGORIES: EvidenceCategory[] = [
  'Research',
  'KTI',
  'Community',
  'Leadership',
  'Collaboration',
  'Academic Development',
];

const EVIDENCE_TYPES = [
  'Dokumen / Laporan',
  'Sertifikat',
  'Link Publikasi / Produk',
  'Foto / Media',
  'Rekomendasi',
  'Lainnya',
] as const;

export const PortfolioEvidenceView: React.FC<PortfolioEvidenceViewProps> = ({
  data,
  onUpdateData,
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioEvidenceItem | null>(null);

  const [formData, setFormData] = useState<Omit<PortfolioEvidenceItem, 'id'>>({
    title: '',
    category: 'Research',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    linkedProject: '',
    linkedModule: 'Research',
    evidenceType: 'Dokumen / Laporan',
    fileOrUrl: '',
    institution: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Research',
      description: '',
      date: new Date().toISOString().slice(0, 10),
      linkedProject: '',
      linkedModule: 'Research',
      evidenceType: 'Dokumen / Laporan',
      fileOrUrl: '',
      institution: '',
      notes: '',
    });
    setEditingItem(null);
  };

  const handleOpenEdit = (item: PortfolioEvidenceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      date: item.date,
      linkedProject: item.linkedProject,
      linkedModule: item.linkedModule || 'General',
      evidenceType: item.evidenceType,
      fileOrUrl: item.fileOrUrl,
      institution: item.institution,
      notes: item.notes,
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      const updated = data.portfolioEvidences.map(ev =>
        ev.id === editingItem.id ? { ...formData, id: editingItem.id } : ev
      );
      onUpdateData({ ...data, portfolioEvidences: updated });
    } else {
      const newItem: PortfolioEvidenceItem = {
        ...formData,
        id: `ev-${Date.now()}`,
      };
      onUpdateData({
        ...data,
        portfolioEvidences: [newItem, ...data.portfolioEvidences],
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus artefak bukti portofolio ini?')) {
      const updated = data.portfolioEvidences.filter(ev => ev.id !== id);
      onUpdateData({ ...data, portfolioEvidences: updated });
    }
  };

  const filteredEvidences = (data.portfolioEvidences || []).filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.linkedProject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.evidenceType === selectedType;
    return matchesSearch && matchesCat && matchesType;
  });

  const getCategoryBadgeVariant = (category: EvidenceCategory) => {
    switch (category) {
      case 'Research': return 'navy';
      case 'KTI': return 'cyan';
      case 'Community': return 'success';
      case 'Leadership': return 'warning';
      case 'Collaboration': return 'cyan';
      default: return 'subtle';
    }
  };

  // Helper to find linked project label
  const findLinkedProjectName = (linkedId: string) => {
    if (!linkedId) return '';
    const res = data.researchProjects?.find(p => p.id === linkedId);
    if (res) return `Research: ${res.topicOrQuestion}`;
    const kti = data.ktiProjects?.find(k => k.id === linkedId);
    if (kti) return `KTI: ${kti.title}`;
    const comm = data.communityActivities?.find(c => c.id === linkedId);
    if (comm) return `Community: ${comm.activity}`;
    const out = data.outreachLogs?.find(o => o.id === linkedId);
    if (out) return `Outreach: ${out.contactPerson} (${out.institution})`;
    return linkedId;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
              Portfolio Assets 2027
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight mt-1">
            Portfolio Evidence — Bank Bukti & Artefak Kredibilitas
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Pusat penyimpanan tautan berkas, sertifikat, naskah draft, surat keputusan, dokumentasi, dan bukti empiris portfolio 2027.
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
            <span>Tambah Evidence</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Cari judul bukti, institusi, deskripsi..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Kategori</option>
            {EVIDENCE_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Jenis Bukti</option>
            {EVIDENCE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Evidences Grid */}
      {filteredEvidences.length === 0 ? (
        <EmptyState
          title="Belum ada artefak evidence"
          description="Kumpulkan tautan naskah, sertifikat, surat keputusan, atau dokumentasi hasil karya untuk portofolio Anda."
          actionText="Tambah Evidence Baru"
          onAction={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<Award className="h-6 w-6 text-cyan-600" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidences.map(item => (
            <Card key={item.id} className="flex flex-col justify-between hover:border-cyan/40 transition-all">
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant={getCategoryBadgeVariant(item.category)} size="sm">
                      {item.category}
                    </Badge>
                    <Badge variant="navy" size="sm">
                      {item.evidenceType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 rounded text-navy-400 hover:text-navy hover:bg-navy-50"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 rounded text-navy-400 hover:text-red-600 hover:bg-navy-50"
                      title="Hapus"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Evidence Title & Description */}
                <div>
                  <h4 className="text-sm font-semibold text-navy leading-snug">
                    {item.title}
                  </h4>
                  {item.institution && (
                    <div className="flex items-center gap-1.5 text-xs text-navy-500 mt-1">
                      <Building className="h-3.5 w-3.5 text-navy-400 shrink-0" />
                      <span className="truncate">{item.institution}</span>
                    </div>
                  )}
                  {item.description && (
                    <p className="text-xs text-navy-600 leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Linked Project Box */}
                {item.linkedProject && (
                  <div className="p-2 rounded-lg bg-navy-50/70 border border-navy/10 text-[11px] text-navy-700">
                    <span className="font-semibold text-navy-800">Terkoneksi ke: </span>
                    <span className="truncate block mt-0.5 text-navy-600">
                      {findLinkedProjectName(item.linkedProject)}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-navy-400">
                  {item.date}
                </span>
                {item.fileOrUrl ? (
                  <a
                    href={item.fileOrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 text-xs font-semibold"
                  >
                    <span>Buka Berkas</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-navy-400 italic">Tanpa tautan</span>
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
        title={editingItem ? 'Edit Evidence Portofolio' : 'Tambah Evidence Portofolio Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Judul Artefak Evidence <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Naskah Draft Artikel Ilmiah: Retrieval Practice..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Kategori Portfolio
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as EvidenceCategory })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {EVIDENCE_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Jenis Evidence
              </label>
              <select
                value={formData.evidenceType}
                onChange={e => setFormData({ ...formData, evidenceType: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {EVIDENCE_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Deskripsi Bukti & Relevansi Akademik
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan isi berkas, metodologi, atau peran Anda dalam pencapaian tersebut..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Institusi / Organisasi
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Misal: Universitas, ABKIN, Lab..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Terbit / Selesai
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Tautan Berkas / Dokumen / Publikasi (Google Drive, DOI, Link File)
              </label>
              <input
                type="url"
                value={formData.fileOrUrl}
                onChange={e => setFormData({ ...formData, fileOrUrl: e.target.value })}
                placeholder="https://drive.google.com/... atau https://..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Hubungkan dengan Proyek (Research, KTI, Community, atau Outreach)
              </label>
              <select
                value={formData.linkedProject}
                onChange={e => setFormData({ ...formData, linkedProject: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="">-- Tidak Terhubung / Independen --</option>
                <optgroup label="Research Projects">
                  {data.researchProjects?.map(p => (
                    <option key={p.id} value={p.id}>Research: {p.topicOrQuestion}</option>
                  ))}
                </optgroup>
                <optgroup label="KTI Projects">
                  {data.ktiProjects?.map(k => (
                    <option key={k.id} value={k.id}>KTI: {k.title}</option>
                  ))}
                </optgroup>
                <optgroup label="Community Activities">
                  {data.communityActivities?.map(c => (
                    <option key={c.id} value={c.id}>Community: {c.activity}</option>
                  ))}
                </optgroup>
                <optgroup label="Outreach Contacts">
                  {data.outreachLogs?.map(o => (
                    <option key={o.id} value={o.id}>Outreach: {o.contactPerson} - {o.institution}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Catatan Tambahan
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Catatan relevansi untuk Remote RA atau studi lanjutan 2027..."
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
              {editingItem ? 'Simpan Perubahan' : 'Tambah Evidence'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
