import React, { useState } from 'react';
import { AppData } from '../../types';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { StorageService } from '../../services/storageService';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Sliders
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [pendingImportData, setPendingImportData] = useState<AppData | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Local storage size approximation
  const approximateStorageKB = Math.round(
    (JSON.stringify(data).length * 2) / 1024
  );

  // Export JSON
  const handleExport = () => {
    try {
      StorageService.exportToJson(data);
    } catch (err: any) {
      alert(err.message || 'Gagal mengekspor data.');
    }
  };

  // Import JSON file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(null);

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        const validation = StorageService.validateImport(text);
        if (!validation.valid || !validation.data) {
          setImportError(validation.error || 'Validasi backup gagal.');
          return;
        }
        setPendingImportData(validation.data);
      } catch (err) {
        setImportError('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Confirm Import
  const handleConfirmImport = () => {
    if (!pendingImportData) return;
    StorageService.save(pendingImportData);
    onUpdateData(pendingImportData);
    setPendingImportData(null);
    setImportSuccess('Data backup berhasil dipulihkan dengan sempurna.');
  };

  // Confirm Reset
  const handleConfirmReset = () => {
    const defaultData = StorageService.resetToDefault();
    onUpdateData(defaultData);
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Pengaturan & Backup Data"
        subtitle="Data tersimpan secara persisten di browser lokal Anda (Offline-first)."
        maxWidth="lg"
      >
        <div className="space-y-6 text-xs text-navy">
          {/* Storage & Privacy Status Banner */}
          <div className="rounded-xl bg-navy-50 p-4 border border-navy/10 flex items-start gap-3">
            <HardDrive className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy">Penyimpanan Browser Lokal</span>
                <span className="px-2 py-0.5 rounded bg-cyan text-navy text-[10px] font-semibold">
                  Tersimpan Otomatis
                </span>
              </div>
              <p className="text-[11px] text-navy-600 leading-relaxed">
                Aplikasi ini tidak mengirim data ke server publik atau pihak ketiga manapun. Seluruh jadwal, catatan, dan progres Anda tersimpan aman di browser lokal ({approximateStorageKB} KB digunakan).
              </p>
              {data.lastModified && (
                <p className="text-[10px] text-navy-400 font-mono pt-1">
                  Pembaruan Terakhir: {new Date(data.lastModified).toLocaleString('id-ID')}
                </p>
              )}
            </div>
          </div>

          {/* Backup & Restore Controls */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-navy-500 text-[10px]">
              Cadangan & Pemulihan (Backup & Restore)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Export Button */}
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-navy/20 bg-white hover:bg-navy/5 font-semibold text-xs text-navy transition-colors shadow-sm"
              >
                <Download className="h-4 w-4 text-cyan-700" />
                <span>Ekspor Semua Data (.JSON)</span>
              </button>

              {/* Import Button */}
              <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-navy/20 bg-white hover:bg-navy/5 font-semibold text-xs text-navy transition-colors cursor-pointer shadow-sm">
                <Upload className="h-4 w-4 text-cyan-700" />
                <span>Impor Backup (.JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {importError && (
              <div className="p-3 rounded-lg bg-navy-50 border border-navy/20 text-xs text-navy flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-navy flex-shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div className="p-3 rounded-lg bg-cyan-50 border border-cyan/40 text-xs text-navy flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-700 flex-shrink-0" />
                <span>{importSuccess}</span>
              </div>
            )}
          </div>

          {/* Schedule Conflict Preference */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <h4 className="font-bold uppercase tracking-wider text-navy-500 text-[10px]">
              Preferensi Benturan Jadwal 18.30–19.30
            </h4>
            <div className="p-3.5 rounded-xl border border-navy/15 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-navy">Status Slot 18.30:</span>
                <span className="font-semibold text-navy">
                  {data.settings.conflictHandling === 'disabled'
                    ? 'Dinonaktifkan (Waktu Istirahat Terjaga)'
                    : data.settings.conflictHandling === 'custom_time'
                    ? `Waktu Kustom: ${data.settings.customConflictTime}`
                    : 'Perlu Konfirmasi (Proposed)'}
                </span>
              </div>
              <p className="text-[11px] text-navy-500">
                Pengaturan penanganan dapat disesuaikan kapan pun di menu My Schedule.
              </p>
            </div>
          </div>

          {/* Danger Zone / Reset */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <h4 className="font-bold uppercase tracking-wider text-navy-400 text-[10px]">
              Zona Pemulihan Bawaan
            </h4>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-navy/10 bg-white">
              <div>
                <p className="font-semibold text-navy">Muat Ulang Data Asli (Excel Seed)</p>
                <p className="text-[11px] text-navy-400">
                  Mengembalikan 18 episode Mikro Thinking, 30 hari GO.COUNSEL, dan modul Neuroeducation ke data awal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3.5 py-1.5 rounded-lg border border-navy/20 hover:bg-navy/5 text-navy font-semibold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirmation: Import Backup JSON */}
      <ConfirmDialog
        isOpen={Boolean(pendingImportData)}
        onClose={() => setPendingImportData(null)}
        onConfirm={handleConfirmImport}
        title="Konfirmasi Pemulihan Data Backup"
        message="Mengimpor file backup ini akan memperbarui data jadwal, konten, modul, dan portofolio Anda saat ini. Pastikan Anda telah membuat ekspor data terbaru jika diperlukan. Lanjutkan pemulihan data?"
        confirmLabel="Ya, Pulihkan Data"
        cancelLabel="Batal"
      />

      {/* Confirmation: Reset Data */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleConfirmReset}
        title="Konfirmasi Muat Ulang Data Bawaan"
        message="Apakah Anda yakin ingin memuat ulang seluruh data ke template awal dari file Excel sumber? Seluruh catatan tambahan yang belum dicadangkan akan dikembalikan ke kondisi mula."
        confirmLabel="Ya, Muat Ulang"
        cancelLabel="Batal"
        isDestructive={true}
      />
    </>
  );
};
