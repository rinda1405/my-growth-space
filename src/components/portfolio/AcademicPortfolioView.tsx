import React, { useState } from 'react';
import { AppData, PortfolioItem, PortfolioStatus } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import {
  FolderCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  FileCheck,
  ShieldCheck,
  Award,
  Link,
  Sparkles
} from 'lucide-react';

interface AcademicPortfolioViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const AcademicPortfolioView: React.FC<AcademicPortfolioViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal edit form
  const [editStatus, setEditStatus] = useState<PortfolioStatus>('Not Started');
  const [editFileUrl, setEditFileUrl] = useState('');
  const [editProofDesc, setEditProofDesc] = useState('');
  const [editDevNotes, setEditDevNotes] = useState('');

  const openEditModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setEditStatus(item.status);
    setEditFileUrl(item.fileUrl || '');
    setEditProofDesc(item.proofDescription || '');
    setEditDevNotes(item.devNotes || '');
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    // Strict validation: cannot mark as 'Completed' if no proof / file link is provided
    if (editStatus === 'Completed' && !editFileUrl.trim() && !editProofDesc.trim()) {
      alert('Perhatian: Status "Completed" hanya dapat diberikan jika Anda telah mengisi Link Dokumen atau Deskripsi Bukti Pekerjaan.');
      return;
    }

    const updatedPortfolio = data.portfolio.map(p =>
      p.id === selectedItem.id
        ? {
            ...p,
            status: editStatus,
            fileUrl: editFileUrl.trim(),
            proofDescription: editProofDesc.trim(),
            devNotes: editDevNotes.trim(),
          }
        : p
    );

    onUpdateData({
      ...data,
      portfolio: updatedPortfolio,
    });

    setSelectedItem(null);
  };

  // Calculations
  const completedCount = data.portfolio.filter(p => p.status === 'Completed').length;
  const inProgressCount = data.portfolio.filter(p => p.status === 'In Progress').length;
  const readyReviewCount = data.portfolio.filter(p => p.status === 'Ready for Review').length;
  const completionPercent = Math.round((completedCount / data.portfolio.length) * 100);

  // Filtered items
  const filteredItems = data.portfolio.filter(p => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            My Portfolio — Academic Portfolio Checklist
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            14 artefak portofolio akademik berbasis bukti untuk persiapan Remote Research Assistant dan pendaftaran studi S2.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-navy-500">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-lg border border-navy/20 p-1.5 text-xs bg-white text-navy focus:outline-none"
          >
            <option value="all">Semua Status (14)</option>
            <option value="Completed">Completed</option>
            <option value="Ready for Review">Ready for Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Progress & Rigor Warning Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl bg-white border border-navy/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
              Kesiapan Portofolio Akademik
            </span>
            <span className="font-mono text-sm font-bold text-navy">
              {completedCount} dari 14 Selesai ({completionPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-navy-100 overflow-hidden">
            <div
              className="h-full bg-cyan transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-xs text-navy-600">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-navy" />
              <span>{completedCount} Selesai</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-600" />
              <span>{readyReviewCount} Siap Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-navy-300" />
              <span>{inProgressCount} Dalam Pengerjaan</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-cyan-50/60 border border-cyan/40 p-5 flex flex-col justify-between">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
                Prinsip Validitas Karya
              </h4>
              <p className="text-[11px] text-navy-600 mt-1 leading-relaxed">
                Status <strong>Completed</strong> hanya diberikan setelah file/tautan bukti hasil kerja nyata telah tersedia dan diverifikasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 14 Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => {
          const isDone = item.status === 'Completed';
          const isReady = item.status === 'Ready for Review';
          const isInProgress = item.status === 'In Progress';

          return (
            <Card
              key={item.id}
              className={`flex flex-col justify-between hover:border-navy/30 transition-all ${
                isDone ? 'bg-cyan-50/20' : 'bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan text-navy">
                      #{item.number}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-navy-400">
                      {item.category}
                    </span>
                  </div>

                  <Badge
                    variant={isDone ? 'navy' : isReady ? 'cyan' : 'outline'}
                    size="sm"
                  >
                    {item.status}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-navy font-serif leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-navy-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.proofDescription && (
                  <div className="p-2.5 rounded-lg bg-navy-50/60 border border-navy/10 text-[11px] text-navy-700">
                    <strong className="block text-[10px] uppercase tracking-wider text-navy-400 mb-0.5">
                      Bukti Dokumen:
                    </strong>
                    {item.proofDescription}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                <div>
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Link className="h-3 w-3" />
                      <span>Buka File Dokumen</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-navy-400 italic">
                      Belum ada tautan file
                    </span>
                  )}
                </div>

                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1 rounded bg-navy-50 hover:bg-navy-100 text-navy font-semibold text-xs border border-navy/15 flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Update Status & Bukti</span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Modal */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={`Perbarui Portofolio #${selectedItem.number}: ${selectedItem.title}`}
          subtitle={`Kategori: ${selectedItem.category}`}
          maxWidth="md"
        >
          <form onSubmit={handleSaveItem} className="space-y-4 text-xs text-navy">
            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Status Pengerjaan:
              </label>
              <select
                value={editStatus}
                onChange={e => setEditStatus(e.target.value as PortfolioStatus)}
                className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Ready for Review">Ready for Review</option>
                <option value="Completed">Completed (Hanya jika bukti sudah ada)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Link File / Tautan Dokumen (Google Drive, GitHub, dsb.)
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/..."
                value={editFileUrl}
                onChange={e => setEditFileUrl(e.target.value)}
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Deskripsi Bukti Pekerjaan (Proof of Work)
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan ringkas apa karya yang sudah dibuat, variabel yang dianalisis, atau draft proposal yang selesai..."
                value={editProofDesc}
                onChange={e => setEditProofDesc(e.target.value)}
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Catatan Pengembangan
              </label>
              <input
                type="text"
                placeholder="Rencana revisi berikutnya..."
                value={editDevNotes}
                onChange={e => setEditDevNotes(e.target.value)}
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-medium text-navy-600 hover:text-navy hover:bg-navy/5 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
