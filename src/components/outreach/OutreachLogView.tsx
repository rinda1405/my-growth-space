import React, { useState } from 'react';
import { AppData, OutreachEntry, OutreachStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import {
  Send,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Calendar,
  Building,
  Mail,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface OutreachLogViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

const OUTREACH_STATUSES: OutreachStatus[] = [
  'Draft',
  'Terkirim',
  'Menunggu Balasan',
  'Diterima',
  'Ditolak',
  'Follow-up',
];

export const OutreachLogView: React.FC<OutreachLogViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPipeline, setSelectedPipeline] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<OutreachEntry | null>(null);

  const [formData, setFormData] = useState<Omit<OutreachEntry, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    contactPerson: '',
    institution: '',
    purpose: '',
    linkedPipeline: 'Research',
    contactInfo: '',
    link: '',
    status: 'Terkirim',
    followUpDate: '',
    followUpAction: '',
    response: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      contactPerson: '',
      institution: '',
      purpose: '',
      linkedPipeline: 'Research',
      contactInfo: '',
      link: '',
      status: 'Terkirim',
      followUpDate: '',
      followUpAction: '',
      response: '',
      notes: '',
    });
    setEditingEntry(null);
  };

  const handleOpenEdit = (entry: OutreachEntry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      contactPerson: entry.contactPerson,
      institution: entry.institution,
      purpose: entry.purpose,
      linkedPipeline: entry.linkedPipeline,
      contactInfo: entry.contactInfo,
      link: entry.link,
      status: entry.status,
      followUpDate: entry.followUpDate,
      followUpAction: entry.followUpAction,
      response: entry.response,
      notes: entry.notes,
    });
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactPerson.trim() || !formData.institution.trim()) return;

    if (editingEntry) {
      const updated = data.outreachLogs.map(o =>
        o.id === editingEntry.id ? { ...formData, id: editingEntry.id } : o
      );
      onUpdateData({ ...data, outreachLogs: updated });
    } else {
      const newEntry: OutreachEntry = {
        ...formData,
        id: `out-${Date.now()}`,
      };
      onUpdateData({
        ...data,
        outreachLogs: [newEntry, ...data.outreachLogs],
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus log outreach ini?')) {
      const updated = data.outreachLogs.filter(o => o.id !== id);
      onUpdateData({ ...data, outreachLogs: updated });
    }
  };

  const filteredLogs = (data.outreachLogs || []).filter(item => {
    const matchesSearch =
      item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesPipeline = selectedPipeline === 'all' || item.linkedPipeline === selectedPipeline;
    return matchesSearch && matchesStatus && matchesPipeline;
  });

  const getStatusBadgeVariant = (status: OutreachStatus) => {
    if (status === 'Diterima') return 'success';
    if (status === 'Menunggu Balasan') return 'warning';
    if (status === 'Follow-up') return 'cyan';
    if (status === 'Ditolak') return 'danger';
    return 'navy';
  };

  // Follow-up reminder count
  const todayStr = new Date().toISOString().slice(0, 10);
  const pendingFollowups = (data.outreachLogs || []).filter(
    o => o.followUpDate && o.followUpDate <= todayStr && o.status !== 'Diterima' && o.status !== 'Ditolak'
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
              Networking & Partnerships
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight mt-1">
            Outreach Log — Pelacakan Komunikasi & Networking
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Pantau korespondensi dengan peneliti, profesor, lembaga, mentor, dan komunitas; atur jadwal tindak lanjut (follow-up).
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
            <span>Catat Outreach Baru</span>
          </button>
        </div>
      </div>

      {/* Reminder Banner if pending follow-ups */}
      {pendingFollowups.length > 0 && (
        <div className="p-3.5 rounded-xl border border-cyan/40 bg-cyan-50/80 flex items-center justify-between text-xs text-navy">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-cyan-700 shrink-0" />
            <span>
              Ada <strong>{pendingFollowups.length} outreach</strong> yang membutuhkan tindak lanjut (follow-up) hari ini atau melewati jadwal.
            </span>
          </div>
          <Badge variant="cyan" size="sm">Perlu Follow-up</Badge>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
        <div className="sm:col-span-2 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Cari kontak, institusi, atau tujuan..."
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
            {OUTREACH_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedPipeline}
            onChange={e => setSelectedPipeline(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
          >
            <option value="all">Semua Pipeline</option>
            <option value="Research">Research</option>
            <option value="Community">Community</option>
            <option value="KTI">KTI</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>

      {/* Outreach List Grid */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          title="Belum ada catatan outreach"
          description="Catat surel, pesan jejaring, permohonan audiensi, atau diskusi kolaborasi riset & komunitas."
          actionText="Catat Outreach Baru"
          onAction={() => {
            resetForm();
            setShowAddModal(true);
          }}
          icon={<Send className="h-6 w-6 text-cyan-600" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogs.map(item => (
            <Card key={item.id} className="flex flex-col justify-between hover:border-cyan/40 transition-all">
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
                      {item.status}
                    </Badge>
                    <Badge variant="cyan" size="sm">
                      {item.linkedPipeline}
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

                {/* Contact & Institution */}
                <div>
                  <h4 className="text-sm font-semibold text-navy leading-snug flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-cyan-700 shrink-0" />
                    <span>{item.contactPerson}</span>
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-navy-500 mt-0.5">
                    <Building className="h-3.5 w-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{item.institution}</span>
                  </div>
                </div>

                {/* Purpose */}
                <div className="p-2.5 rounded-lg bg-navy-50/70 border border-navy/10 text-xs">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-navy-500 block mb-0.5">
                    Tujuan Komunikasi:
                  </span>
                  <p className="text-navy-700 font-medium leading-relaxed">
                    {item.purpose}
                  </p>
                </div>

                {/* Contact Info */}
                {item.contactInfo && (
                  <div className="flex items-center gap-1.5 text-xs text-navy-600">
                    <Mail className="h-3.5 w-3.5 text-navy-400 shrink-0" />
                    <span className="truncate font-mono text-[11px]">{item.contactInfo}</span>
                  </div>
                )}

                {/* Response / Follow-up */}
                {(item.followUpDate || item.followUpAction || item.response) && (
                  <div className="p-2.5 rounded-lg bg-cyan-50/60 border border-cyan/30 text-xs space-y-1">
                    {item.followUpDate && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-cyan-800">Tanggal Follow-up:</span>
                        <span className="text-navy-700 font-medium">{item.followUpDate}</span>
                      </div>
                    )}
                    {item.followUpAction && (
                      <div className="text-[11px] text-navy-700">
                        <span className="font-semibold text-cyan-800">Rencana: </span>
                        <span>{item.followUpAction}</span>
                      </div>
                    )}
                    {item.response && (
                      <div className="text-[11px] text-navy-600 pt-1 border-t border-cyan/20">
                        <span className="font-semibold text-navy-700">Respons: </span>
                        <span>{item.response}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-navy-400">
                  Tanggal: {item.date}
                </span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-700 hover:text-cyan-800 text-xs font-medium"
                  >
                    <span>Profil/Link</span>
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
        title={editingEntry ? 'Edit Catatan Outreach' : 'Catat Outreach Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Kontak (Nama Orang / Tim) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Misal: Dr. Hendra Gunawan"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Institusi / Laboratorium <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Misal: Pusat Riset Psikologi Edukasi"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Tujuan Komunikasi <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.purpose}
                onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="Tujuan kontak: konsultasi instrumen, permohonan audiensi, kolaborasi..."
                className="w-full px-3 py-2 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Pipeline Terkait
              </label>
              <select
                value={formData.linkedPipeline}
                onChange={e => setFormData({ ...formData, linkedPipeline: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                <option value="Research">Research</option>
                <option value="Community">Community</option>
                <option value="KTI">KTI</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
              >
                {OUTREACH_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Surel / Kontak Info
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={e => setFormData({ ...formData, contactInfo: e.target.value })}
                placeholder="email@institusi.ac.id / WhatsApp"
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tautan Profil / Web
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={e => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Kontak
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Tanggal Follow-Up
              </label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={e => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Tindakan Tindak Lanjut (Follow-Up Action)
              </label>
              <input
                type="text"
                value={formData.followUpAction}
                onChange={e => setFormData({ ...formData, followUpAction: e.target.value })}
                placeholder="Kirimkan concept note, hubungi via WhatsApp, kirim surel pengingat..."
                className="w-full px-3 py-1.5 rounded-lg border border-navy/20 text-xs text-navy focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-navy mb-1">
                Respons yang Diterima
              </label>
              <input
                type="text"
                value={formData.response}
                onChange={e => setFormData({ ...formData, response: e.target.value })}
                placeholder="Catatan balasan atau kesepakatan pertemuan..."
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
                placeholder="Konteks pertemuan awal, rekomendasi rekan, dll."
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
              {editingEntry ? 'Simpan Perubahan' : 'Catat Outreach'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
