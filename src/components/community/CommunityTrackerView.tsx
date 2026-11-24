import React, { useState } from 'react';
import { AppData, CommunityItem, CommunityProgressStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Building,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface CommunityTrackerViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigateToEvidence?: () => void;
}

const PROGRESS_STATUSES: CommunityProgressStatus[] = [
  'Eksplorasi',
  'Didaftar',
  'Aktif',
  'Selesai',
  'Ditunda',
];

export const CommunityTrackerView: React.FC<CommunityTrackerViewProps> = ({
  data,
  onUpdateData,
  onNavigateToEvidence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CommunityItem | null>(null);

  const [formData, setFormData] = useState<Omit<CommunityItem, 'id'>>({
    organization: '',
    focusArea: '',
    activity: '',
    locationType: 'Daring (Online)',
    sourceUrl: '',
    opportunityType: '',
    dateAdded: new Date().toISOString().slice(0, 10),
    deadline: '',
    nextAction: '',
    actionDate: new Date().toISOString().slice(0, 10),
    progressStatus: 'Eksplorasi',
    roleContribution: '',
    evidence: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      organization: '',
      focusArea: '',
      activity: '',
      locationType: 'Daring (Online)',
      sourceUrl: '',
      opportunityType: '',
      dateAdded: new Date().toISOString().slice(0, 10),
      deadline: '',
      nextAction: '',
      actionDate: new Date().toISOString().slice(0, 10),
      progressStatus: 'Eksplorasi',
      roleContribution: '',
      evidence: '',
      notes: '',
    });
    setEditingItem(null);
  };

  const handleOpenEdit = (item: CommunityItem) => {
    setEditingItem(item);
    setFormData({
      organization: item.organization,
      focusArea: item.focusArea,
      activity: item.activity,
      locationType: item.locationType,
      sourceUrl: item.sourceUrl,
      opportunityType: item.opportunityType,
      dateAdded: item.dateAdded,
      deadline: item.deadline,
      nextAction: item.nextAction,
      actionDate: item.actionDate,
      progressStatus: item.progressStatus,
      roleContribution: item.roleContribution,
      evidence: item.evidence,
      notes: item.notes,
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.activity.trim() || !formData.organization.trim()) return;

    if (editingItem) {
      const updated = data.communityActivities.map(c =>
        c.id === editingItem.id ? { ...formData, id: editingItem.id } : c
      );
      onUpdateData({ ...data, communityActivities: updated });
    } else {
      const newItem: CommunityItem = {
        ...formData,
        id: `comm-${Date.now()}`,
      };
      onUpdateData({
        ...data,
        communityActivities: [newItem, ...data.communityActivities],
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus entri komunitas / relawan ini?')) {
      const updated = data.communityActivities.filter(c => c.id !== id);
      onUpdateData({ ...data, communityActivities: updated });
    }
  };

  const filteredItems = (data.communityActivities || []).filter(item => {
    const matchesSearch =
      item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.focusArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.progressStatus === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || item.locationType === selectedLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusBadgeVariant = (status: CommunityProgressStatus) => {
    if (status === 'Selesai') return 'success';
    if (status === 'Aktif') return 'cyan';
    if (status === 'Didaftar') return 'warning';
    if (status === 'Ditunda') return 'subtle';
    return 'navy';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
              Pilar 3 — Komunitas 2027
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight mt-1">
            Community Tracker — Peluang Volunteer & Community Engagement
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Kelola kontribusi sosial, peran kepemimpinan, fasilitator workshop, dan kolaborasi di komunitas edukasi & remaja.
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
            <span>Tambah Aktivitas Komunitas</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Cari aktivitas, organisasi, bidang..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          />
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Status</option>
            {PROGRESS_STATUSES.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Format Lokasi</option>
            <option value="Daring (Online)">Daring (Online)</option>
            <option value="Luring (Offline)">Luring (Offline)</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Community Items Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="Belum ada aktivitas komunitas"
          description="Catat peluang relawan, kemitraan komunitas, kepanitiaan, atau peran fasilitator edukasi Anda."
          actionText="Tambah Aktivitas Baru"
          onAction={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<HeartHandshake className="h-6 w-6 text-cyan-600" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <Card key={item.id} className="flex flex-col justify-between hover:border-cyan/40 transition-all">
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant={getStatusBadgeVariant(item.progressStatus)} size="sm">
                      {item.progressStatus}
                    </Badge>
                    <Badge variant="navy" size="sm">
                      {item.locationType}
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

                {/* Organization & Activity */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
                    {item.organization}
                  </span>
                  <h4 className="text-sm font-semibold text-navy leading-snug mt-0.5">
                    {item.activity}
                  </h4>
                </div>

                {/* Focus Area & Opportunity */}
                <div className="space-y-1 text-xs text-navy-600">
                  {item.focusArea && (
                    <div className="flex items-center gap-1.5 text-[11px] text-navy-500">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
                      <span>Fokus: {item.focusArea}</span>
                    </div>
                  )}
                  {item.roleContribution && (
                    <div className="text-[11px] text-navy-700">
                      <span className="font-medium text-navy-500">Peran/Kontribusi: </span>
                      <span className="font-semibold">{item.roleContribution}</span>
                    </div>
                  )}
                </div>

                {/* Next Action & Deadline */}
                {(item.nextAction || item.deadline) && (
                  <div className="p-2.5 rounded-lg bg-navy-50/70 border border-navy/10 text-xs space-y-1">
                    {item.deadline && (
                      <div className="flex items-center justify-between text-[10px] text-navy-400 font-medium">
                        <span>Batas Waktu:</span>
                        <span className="text-red-600 font-semibold">{item.deadline}</span>
                      </div>
                    )}
                    {item.nextAction && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-navy-500">
                          <span>Tindakan:</span>
                          {item.actionDate && (
                            <span className="text-[10px] text-navy-400">{item.actionDate}</span>
                          )}
                        </div>
                        <p className="text-navy-700 font-medium leading-relaxed">
                          {item.nextAction}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence */}
                {item.evidence && (
                  <div className="text-[11px] text-navy-600">
                    <span className="font-semibold text-navy-700">Bukti: </span>
                    <span>{item.evidence}</span>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-navy-400">
                  Dicatat: {item.dateAdded}
                </span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
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
        title={editingItem ? 'Edit Aktivitas Komunitas' : 'Tambah Aktivitas Komunitas'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Organisasi / Komunitas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Nama lembaga / komunitas..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Bidang Fokus
              </label>
              <input
                type="text"
                value={formData.focusArea}
                onChange={e => setFormData({ ...formData, focusArea: e.target.value })}
                placeholder="Misal: Mental Health, Literasi Belajar"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Peluang / Aktivitas <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.activity}
                onChange={e => setFormData({ ...formData, activity: e.target.value })}
                placeholder="Deskripsi kegiatan atau peran yang dijalankan..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Lokasi / Format
              </label>
              <select
                value={formData.locationType}
                onChange={e => setFormData({ ...formData, locationType: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="Daring (Online)">Daring (Online)</option>
                <option value="Luring (Offline)">Luring (Offline)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Jenis Peluang
              </label>
              <input
                type="text"
                value={formData.opportunityType}
                onChange={e => setFormData({ ...formData, opportunityType: e.target.value })}
                placeholder="Misal: Volunteer Fasilitator, Mentor KTI"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
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
                {PROGRESS_STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Batas Waktu (Deadline)
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Kontribusi / Peran
              </label>
              <input
                type="text"
                value={formData.roleContribution}
                onChange={e => setFormData({ ...formData, roleContribution: e.target.value })}
                placeholder="Misal: Narasumber Utama, Penanggung Jawab Materi"
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
                Evidence / Bukti Hasil
              </label>
              <input
                type="text"
                value={formData.evidence}
                onChange={e => setFormData({ ...formData, evidence: e.target.value })}
                placeholder="Sertifikat, foto kegiatan, modul materi yang dibuat..."
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
                placeholder="Catatan tambahan seputar jejaring atau hasil..."
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
              {editingItem ? 'Simpan Perubahan' : 'Tambah Aktivitas'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
