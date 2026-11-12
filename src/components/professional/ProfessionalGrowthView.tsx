import React, { useState } from 'react';
import {
  AppData,
  ProfessionalActivity,
  ProfessionalConnection,
  ProfessionalCategory,
  ProfessionalStatus
} from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import {
  Briefcase,
  Users,
  Plus,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  Mail,
  FileText
} from 'lucide-react';

interface ProfessionalGrowthViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const ProfessionalGrowthView: React.FC<ProfessionalGrowthViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [subTab, setSubTab] = useState<'activities' | 'connections'>('activities');

  // Filters
  const [catFilter, setCatFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddConnectionModal, setShowAddConnectionModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ProfessionalActivity | null>(null);

  // New Activity Form State
  const [newAct, setNewAct] = useState<Omit<ProfessionalActivity, 'id'>>({
    title: '',
    category: 'Volunteering',
    organization: '',
    date: new Date().toISOString().slice(0, 10),
    role: '',
    locationOrFormat: 'Daring (Online)',
    status: 'Interested',
    contactUrl: '',
    outcomes: '',
    proofUrl: '',
    followUp: '',
    personalNotes: '',
  });

  // New Connection Form State
  const [newConn, setNewConn] = useState<Omit<ProfessionalConnection, 'id'>>({
    name: '',
    organization: '',
    expertise: '',
    context: '',
    dateMet: new Date().toISOString().slice(0, 10),
    contactUrl: '',
    interactionNotes: '',
    followUpPlan: '',
  });

  const allCategories: ProfessionalCategory[] = [
    'Volunteering',
    'Public Speaking',
    'Webinar & Seminar',
    'Networking',
    'Research Collaboration',
    'RA Opportunities',
  ];

  const allStatuses: ProfessionalStatus[] = [
    'Interested',
    'To Apply',
    'Applied',
    'Accepted',
    'In Progress',
    'Completed',
    'Not Selected',
    'Follow-up Needed',
  ];

  // Save new activity
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAct.title.trim()) return;

    const activity: ProfessionalActivity = {
      ...newAct,
      id: `pa-${Date.now()}`,
    };

    onUpdateData({
      ...data,
      professionalActivities: [activity, ...data.professionalActivities],
    });

    setShowAddActivityModal(false);
    setNewAct({
      title: '',
      category: 'Volunteering',
      organization: '',
      date: new Date().toISOString().slice(0, 10),
      role: '',
      locationOrFormat: 'Daring (Online)',
      status: 'Interested',
      contactUrl: '',
      outcomes: '',
      proofUrl: '',
      followUp: '',
      personalNotes: '',
    });
  };

  // Save new connection
  const handleSaveConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConn.name.trim()) return;

    const connection: ProfessionalConnection = {
      ...newConn,
      id: `conn-${Date.now()}`,
    };

    onUpdateData({
      ...data,
      connections: [connection, ...data.connections],
    });

    setShowAddConnectionModal(false);
    setNewConn({
      name: '',
      organization: '',
      expertise: '',
      context: '',
      dateMet: new Date().toISOString().slice(0, 10),
      contactUrl: '',
      interactionNotes: '',
      followUpPlan: '',
    });
  };

  // Filtered activities
  const filteredActivities = data.professionalActivities.filter(a => {
    const matchCat = catFilter === 'all' || a.category === catFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchQuery =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchStatus && matchQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            Professional Growth — Aktivitas & Koneksi
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Pengelolaan personal untuk volunteering, public speaking, peluang RA, dan jejaring relasi akademik.
          </p>
        </div>

        <Tabs
          tabs={[
            {
              id: 'activities',
              label: 'Tracker Aktivitas',
              icon: <Briefcase className="h-4 w-4" />,
              count: data.professionalActivities.length,
            },
            {
              id: 'connections',
              label: 'Connections Log',
              icon: <Users className="h-4 w-4" />,
              count: data.connections.length,
            },
          ]}
          activeTab={subTab}
          onChange={t => setSubTab(t as any)}
        />
      </div>

      {/* ================= SUBTAB 1: ACTIVITIES TRACKER ================= */}
      {subTab === 'activities' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-navy/10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="rounded-lg border border-navy/20 p-2 text-xs text-navy bg-white focus:outline-none"
              >
                <option value="all">Semua Kategori (6)</option>
                {allCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="rounded-lg border border-navy/20 p-2 text-xs text-navy bg-white focus:outline-none"
              >
                <option value="all">Semua Status (8)</option>
                {allStatuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <div className="relative">
                <Search className="h-3.5 w-3.5 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari aktivitas, instansi..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 rounded-lg border border-navy/20 pl-8 pr-3 py-1.5 text-xs text-navy focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddActivityModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan text-navy border border-cyan-400 text-xs font-semibold hover:bg-cyan-400 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Catat Aktivitas Baru</span>
            </button>
          </div>

          {/* Activities List */}
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-navy/15 bg-white text-xs text-navy-500">
              Belum ada aktivitas profesional yang sesuai dengan filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredActivities.map(act => (
                <Card
                  key={act.id}
                  className="flex flex-col justify-between hover:border-navy/30 cursor-pointer"
                  onClick={() => setSelectedActivity(act)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="cyan" size="sm">{act.category}</Badge>
                      <Badge variant="navy" size="sm">{act.status}</Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-navy font-serif leading-snug">
                        {act.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-navy-500 mt-1">
                        <Building className="h-3 w-3" />
                        <span>{act.organization}</span>
                        <span>•</span>
                        <span>{act.role}</span>
                      </div>
                    </div>

                    {act.outcomes && (
                      <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed bg-navy-50/50 p-2.5 rounded-lg border border-navy/10">
                        {act.outcomes}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-[11px] text-navy-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-cyan-600" />
                      <span>{act.date}</span>
                      <span>({act.locationOrFormat})</span>
                    </div>
                    <span className="font-semibold text-navy hover:underline">
                      Detail & Evaluasi →
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= SUBTAB 2: CONNECTIONS LOG ================= */}
      {subTab === 'connections' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-navy/10">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-navy">
                Direktori Relasi Akademik & Profesional
              </h4>
              <p className="text-xs text-navy-500 mt-0.5">
                Daftar kontak penting untuk kolaborasi riset, pembimbingan, dan peluang profesional.
              </p>
            </div>

            <button
              onClick={() => setShowAddConnectionModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan text-navy border border-cyan-400 text-xs font-semibold hover:bg-cyan-400 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Kontak Relasi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.connections.map(conn => (
              <Card key={conn.id} className="space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-navy font-serif">
                    {conn.name}
                  </h4>
                  <p className="text-xs text-navy-600 font-medium">
                    {conn.organization}
                  </p>
                  <p className="text-[11px] text-cyan-700 font-mono mt-0.5">
                    {conn.expertise}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-navy-700 bg-navy-50/50 p-2.5 rounded-lg border border-navy/10">
                  <p>
                    <strong className="text-[10px] uppercase text-navy-400 block">Konteks Pertemuan:</strong>
                    {conn.context}
                  </p>
                  {conn.interactionNotes && (
                    <p className="pt-1 border-t border-navy/10">
                      <strong className="text-[10px] uppercase text-navy-400 block">Catatan Interaksi:</strong>
                      {conn.interactionNotes}
                    </p>
                  )}
                </div>

                {conn.followUpPlan && (
                  <div className="pt-2 text-xs text-navy flex items-start gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Rencana Follow-up:</strong> {conn.followUpPlan}
                    </span>
                  </div>
                )}

                {conn.contactUrl && (
                  <div className="pt-2 border-t border-navy/10 flex items-center justify-end">
                    <a
                      href={conn.contactUrl.startsWith('http') || conn.contactUrl.includes('@') ? (conn.contactUrl.includes('@') && !conn.contactUrl.startsWith('mailto:') ? `mailto:${conn.contactUrl}` : conn.contactUrl) : `https://${conn.contactUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-navy hover:underline flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      <span>Hubungi / Profil</span>
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD ACTIVITY ================= */}
      {showAddActivityModal && (
        <Modal
          isOpen={showAddActivityModal}
          onClose={() => setShowAddActivityModal(false)}
          title="Catat Aktivitas Profesional Baru"
          subtitle="Volunteering, public speaking, webinar, atau peluang RA."
          maxWidth="lg"
        >
          <form onSubmit={handleSaveActivity} className="space-y-4 text-xs text-navy">
            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Nama Kegiatan *
              </label>
              <input
                type="text"
                required
                value={newAct.title}
                onChange={e => setNewAct({ ...newAct, title: e.target.value })}
                placeholder="Contoh: Pembicara Webinar Self-Regulated Learning Siswa"
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Kategori
                </label>
                <select
                  value={newAct.category}
                  onChange={e => setNewAct({ ...newAct, category: e.target.value as any })}
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
                >
                  {allCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Status
                </label>
                <select
                  value={newAct.status}
                  onChange={e => setNewAct({ ...newAct, status: e.target.value as any })}
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
                >
                  {allStatuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Penyelenggara / Organisasi
                </label>
                <input
                  type="text"
                  value={newAct.organization}
                  onChange={e => setNewAct({ ...newAct, organization: e.target.value })}
                  placeholder="Nama instansi atau komunitas..."
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Peran Anda
                </label>
                <input
                  type="text"
                  value={newAct.role}
                  onChange={e => setNewAct({ ...newAct, role: e.target.value })}
                  placeholder="Contoh: Narasumber, Relawan, Peserta"
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Tanggal Kegiatan
                </label>
                <input
                  type="date"
                  value={newAct.date}
                  onChange={e => setNewAct({ ...newAct, date: e.target.value })}
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Lokasi / Format
                </label>
                <input
                  type="text"
                  value={newAct.locationOrFormat}
                  onChange={e => setNewAct({ ...newAct, locationOrFormat: e.target.value })}
                  placeholder="Daring (Zoom) / Tatap Muka"
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Hasil & Pembelajaran yang Didapat
              </label>
              <textarea
                value={newAct.outcomes}
                onChange={e => setNewAct({ ...newAct, outcomes: e.target.value })}
                rows={2}
                placeholder="Catat pencapaian, dampak, atau insight yang diperoleh..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Link Bukti / Dokumentasi (Opsional)
                </label>
                <input
                  type="text"
                  value={newAct.proofUrl}
                  onChange={e => setNewAct({ ...newAct, proofUrl: e.target.value })}
                  placeholder="Link sertifikat / foto / materi..."
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Rencana Tindak Lanjut (Follow-up)
                </label>
                <input
                  type="text"
                  value={newAct.followUp}
                  onChange={e => setNewAct({ ...newAct, followUp: e.target.value })}
                  placeholder="Kirim materi / follow up kontak..."
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
              <button
                type="button"
                onClick={() => setShowAddActivityModal(false)}
                className="px-4 py-2 text-xs font-medium text-navy-600 hover:text-navy hover:bg-navy/5 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400"
              >
                Simpan Aktivitas
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ================= MODAL: ADD CONNECTION ================= */}
      {showAddConnectionModal && (
        <Modal
          isOpen={showAddConnectionModal}
          onClose={() => setShowAddConnectionModal(false)}
          title="Tambah Relasi Profesional Baru"
          subtitle="Catat relasi akademik atau calon kolaborator riset."
          maxWidth="md"
        >
          <form onSubmit={handleSaveConnection} className="space-y-4 text-xs text-navy">
            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Nama Lengkap & Gelar *
              </label>
              <input
                type="text"
                required
                value={newConn.name}
                onChange={e => setNewConn({ ...newConn, name: e.target.value })}
                placeholder="Contoh: Dr. Budi Santoso, M.Ed."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Organisasi / Kampus
                </label>
                <input
                  type="text"
                  value={newConn.organization}
                  onChange={e => setNewConn({ ...newConn, organization: e.target.value })}
                  placeholder="Contoh: Fakultas Psikologi..."
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Bidang Keahlian
                </label>
                <input
                  type="text"
                  value={newConn.expertise}
                  onChange={e => setNewConn({ ...newConn, expertise: e.target.value })}
                  placeholder="Contoh: Adolescent Neuroscience"
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Konteks Pertemuan
              </label>
              <input
                type="text"
                value={newConn.context}
                onChange={e => setNewConn({ ...newConn, context: e.target.value })}
                placeholder="Contoh: Bertemu di konferensi bimbingan konseling..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Kontak (Email / Profil LinkedIn)
              </label>
              <input
                type="text"
                value={newConn.contactUrl}
                onChange={e => setNewConn({ ...newConn, contactUrl: e.target.value })}
                placeholder="email@univ.ac.id atau link profil"
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Rencana Follow-up
              </label>
              <input
                type="text"
                value={newConn.followUpPlan}
                onChange={e => setNewConn({ ...newConn, followUpPlan: e.target.value })}
                placeholder="Contoh: Kirim draf proposal di bulan Juni..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
              <button
                type="button"
                onClick={() => setShowAddConnectionModal(false)}
                className="px-4 py-2 text-xs font-medium text-navy-600 hover:text-navy hover:bg-navy/5 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400"
              >
                Simpan Relasi
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ================= MODAL: ACTIVITY DETAIL ================= */}
      {selectedActivity && (
        <Modal
          isOpen={Boolean(selectedActivity)}
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.title}
          subtitle={`${selectedActivity.organization} • ${selectedActivity.role}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs text-navy">
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50 border border-navy/10">
              <Badge variant="cyan">{selectedActivity.category}</Badge>
              <Badge variant="navy">{selectedActivity.status}</Badge>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-navy block">Hasil & Pembelajaran:</span>
              <p className="text-navy-700 leading-relaxed bg-white p-3 rounded border border-navy/15">
                {selectedActivity.outcomes || 'Belum ada catatan hasil.'}
              </p>
            </div>

            {selectedActivity.followUp && (
              <div className="space-y-1">
                <span className="font-semibold text-navy block">Rencana Tindak Lanjut:</span>
                <p className="text-navy-600">{selectedActivity.followUp}</p>
              </div>
            )}

            {selectedActivity.proofUrl && (
              <div className="pt-2 border-t border-navy/10">
                <a
                  href={selectedActivity.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Buka Dokumentasi / Bukti Kegiatan</span>
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
