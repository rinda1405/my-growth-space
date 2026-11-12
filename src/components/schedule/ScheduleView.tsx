import React, { useState } from 'react';
import { AppData, DailyScheduleItem, ScheduleConflict } from '../../types';
import { initialTuesdaySchedule } from '../../data/initialData';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import {
  CalendarClock,
  Coffee,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Sliders,
  Heart,
  ShieldCheck,
  CalendarDays,
  ListTodo
} from 'lucide-react';

interface ScheduleViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'tuesday' | 'weekly' | 'conflict'>('daily');
  const [selectedConflict, setSelectedConflict] = useState<ScheduleConflict | null>(null);
  const [customTimeInput, setCustomTimeInput] = useState('');

  // Conflict item
  const conflict = data.scheduleConflicts[0] || {
    id: 'conflict-1',
    slotTime: '18.30–19.30',
    targetName: 'Proposed Focus Block (Pengembangan Diri)',
    conflictReason: 'Slot ini bertabrakan dengan Jadwal Istirahat Tetap pukul 17.30–19.30.',
    status: 'proposed',
  };

  const handleUpdateConflictStatus = (
    status: 'proposed' | 'confirmed' | 'disabled',
    customTime?: string
  ) => {
    const updatedConflicts = data.scheduleConflicts.map(c =>
      c.id === conflict.id
        ? {
            ...c,
            status,
            customTimeSlot: customTime || c.customTimeSlot,
          }
        : c
    );

    onUpdateData({
      ...data,
      scheduleConflicts: updatedConflicts,
      settings: {
        ...data.settings,
        conflictHandling: status === 'confirmed' ? (customTime ? 'custom_time' : 'proposed') : 'disabled',
        customConflictTime: customTime || data.settings.customConflictTime,
      },
    });
    setSelectedConflict(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            My Schedule — Ritme Waktu & Energi
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Jadwal tetap terencana yang menjaga keseimbangan antara belajar, produksi konten, keluarga, dan istirahat mutlak.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'daily', label: 'Jadwal Kerja (Senin, Rabu–Jumat)', icon: <CalendarClock className="h-4 w-4" /> },
            { id: 'tuesday', label: 'Selasa — Personal Growth Day', icon: <Sparkles className="h-4 w-4 text-cyan-600" /> },
            { id: 'weekly', label: 'Fokus Mingguan', icon: <CalendarDays className="h-4 w-4" /> },
            {
              id: 'conflict',
              label: 'Slot 18.30 (Perlu Konfirmasi)',
              icon: <AlertTriangle className="h-4 w-4 text-cyan-600" />,
              count: conflict.status === 'proposed' ? 1 : undefined,
            },
          ]}
          activeTab={activeTab}
          onChange={tabId => setActiveTab(tabId as any)}
        />
      </div>

      {/* Schedule Conflict Warning Notice (Always prominent if proposed) */}
      {conflict.status === 'proposed' && (
        <div className="rounded-xl border border-cyan/40 bg-cyan-50/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan text-navy mt-0.5">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy">
                  Peringatan Benturan Jadwal: Slot 18.30–19.30
                </span>
                <Badge variant="cyan" size="sm">Perlu Konfirmasi</Badge>
              </div>
              <p className="text-xs text-navy-600 mt-0.5 leading-relaxed">
                Slot pengembangan diri sebelumnya direncanakan pada 18.30–19.30, namun bertabrakan dengan Jadwal Istirahat Tetap (17.30–19.30). Slot ini dinonaktifkan secara bawaan agar tidak mengorbankan waktu istirahat dan keluarga.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedConflict(conflict)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-lg bg-navy text-white text-xs font-medium hover:bg-navy-900 transition-colors"
          >
            Tinjau Pengaturan Slot
          </button>
        </div>
      )}

      {/* TAB 1: DAILY FIXED SCHEDULE */}
      {activeTab === 'daily' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between bg-navy-50/50 p-4 rounded-xl border border-navy/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-navy-600 shrink-0" />
              <p className="text-xs text-navy-700 leading-relaxed">
                <strong>Prinsip Utama:</strong> Waktu ibadah (15.30–16.30) dan istirahat tetap (12.00–13.00, 17.30–19.30, 22.00–05.30) dilindungi sepenuhnya. Jam 07.00–08.00 untuk pengembangan diri, 13.00–14.00 untuk personal learning, dan 14.00–15.30 untuk produksi konten fokus utama & sesi singkat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {data.dailySchedule.map(item => {
              const isWorship = item.timeStart === '15.30' && item.timeEnd === '16.30';
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all ${
                    isWorship
                      ? 'bg-white border-cyan/60 text-navy shadow-xs'
                      : item.isRest
                      ? 'bg-cyan-50/40 border-cyan/40 text-navy'
                      : 'bg-white border-navy/10 text-navy hover:border-navy/20'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-28 flex-shrink-0">
                      <span className={`font-mono text-xs font-bold px-2 py-1 rounded inline-block border ${
                        isWorship
                          ? 'bg-cyan-50/60 border-cyan/40 text-navy'
                          : 'bg-navy-50 border-navy/10 text-navy'
                      }`}>
                        {item.timeStart} – {item.timeEnd}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-navy">{item.activity}</h4>
                        {isWorship && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-cyan/25 border border-cyan-400/50 text-navy">
                            <Heart className="h-3 w-3 text-navy fill-cyan/30" />
                            Waktu Ibadah Khusus
                          </span>
                        )}
                        {item.isRest && !isWorship && (
                          <Badge variant="cyan" size="sm">
                            <Coffee className="h-3 w-3 mr-1" />
                            Waktu Istirahat
                          </Badge>
                        )}
                        {item.isOptional && (
                          <Badge variant="subtle" size="sm">
                            Opsional
                          </Badge>
                        )}
                        {item.outputNote && (
                          <span className="text-[10px] font-medium bg-cyan/20 border border-cyan/40 text-navy-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-2.5 w-2.5 text-cyan-700" />
                            Output: {item.outputNote}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-navy-500 mt-0.5 leading-relaxed">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs text-navy-400">
                    <span className={`capitalize text-[11px] font-medium px-2 py-0.5 rounded ${
                      isWorship
                        ? 'bg-cyan/15 border border-cyan/30 text-navy'
                        : 'bg-navy/5 text-navy-600'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TUESDAY — PERSONAL GROWTH DAY */}
      {activeTab === 'tuesday' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-cyan-50/80 p-4 rounded-xl border border-cyan/40 gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan text-navy mt-0.5">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                  Selasa — Personal Growth Day (Tanpa ke Kantor)
                </h3>
                <p className="text-xs text-navy-600 mt-1 leading-relaxed">
                  Hari tanpa ke kantor. Fokus penuh pada pengembangan diri, riset Neuroeducation, latihan kompetensi Remote Research Assistant, dan produksi Mikro Thinking ID. Jadwal malam dipertahankan secara konsisten.
                </p>
              </div>
            </div>
            <Badge variant="cyan" size="sm" className="self-start md:self-center shrink-0">
              18 Blok Waktu
            </Badge>
          </div>

          {/* Golden Rules / Rest Protection */}
          <div className="flex items-center justify-between bg-navy-50/60 p-3.5 rounded-xl border border-navy/10 text-xs text-navy">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-cyan-600 shrink-0" />
              <span>
                <strong>Aturan Perlindungan Waktu:</strong> Waktu ibadah (15.30–16.30) dan istirahat (12.00–13.00, 17.30–19.30, 22.00–05.30) <em>tidak boleh</em> diisi pekerjaan produktif.
              </span>
            </div>
          </div>

          {/* Tuesday Schedule Items */}
          <div className="grid grid-cols-1 gap-2.5">
            {(data.tuesdaySchedule && data.tuesdaySchedule.length > 0
              ? data.tuesdaySchedule
              : initialTuesdaySchedule
            ).map(item => {
              const isWorship = item.timeStart === '15.30' && item.timeEnd === '16.30';
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all ${
                    isWorship
                      ? 'bg-white border-cyan/60 text-navy shadow-xs'
                      : item.isRest
                      ? 'bg-cyan-50/40 border-cyan/40 text-navy'
                      : 'bg-white border-navy/10 text-navy hover:border-navy/20'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-28 flex-shrink-0">
                      <span className={`font-mono text-xs font-bold px-2 py-1 rounded inline-block border ${
                        isWorship
                          ? 'bg-cyan-50/60 border-cyan/40 text-navy'
                          : 'bg-navy-50 border-navy/10 text-navy'
                      }`}>
                        {item.timeStart} – {item.timeEnd}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-navy">{item.activity}</h4>
                        {isWorship && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-cyan/25 border border-cyan-400/50 text-navy">
                            <Heart className="h-3 w-3 text-navy fill-cyan/30" />
                            Waktu Ibadah Khusus
                          </span>
                        )}
                        {item.isRest && !isWorship && (
                          <Badge variant="cyan" size="sm">
                            <Coffee className="h-3 w-3 mr-1" />
                            Waktu Istirahat
                          </Badge>
                        )}
                        {item.isOptional && (
                          <Badge variant="subtle" size="sm">
                            Opsional
                          </Badge>
                        )}
                        {item.outputNote && (
                          <span className="text-[10px] font-medium bg-cyan/20 border border-cyan/40 text-navy-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-2.5 w-2.5 text-cyan-700" />
                            Output: {item.outputNote}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-navy-500 mt-1 leading-relaxed">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs text-navy-400">
                    <span className={`capitalize text-[11px] font-medium px-2 py-0.5 rounded ${
                      isWorship
                        ? 'bg-cyan/15 border border-cyan/30 text-navy'
                        : 'bg-navy/5 text-navy-600'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: WEEKLY FOCUS */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.weeklyFocus.map(wf => {
              const isSunday = wf.dayOfWeek === 0;
              const isTuesday = wf.dayOfWeek === 2;
              const isSaturday = wf.dayOfWeek === 6;

              return (
                <Card
                  key={wf.dayOfWeek}
                  variant={isTuesday ? 'cyan' : 'default'}
                  className="flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                        {wf.dayName}
                      </span>
                      {isTuesday && (
                        <Badge variant="cyan" size="sm">
                          Personal Growth Day
                        </Badge>
                      )}
                      {isSunday && (
                        <Badge variant="navy" size="sm">
                          Rest & Reset
                        </Badge>
                      )}
                      {isSaturday && (
                        <Badge variant="subtle" size="sm">
                          Weekend Focus
                        </Badge>
                      )}
                      {wf.timeSlot && (
                        <span className="text-[11px] font-mono text-navy-500 font-medium">
                          {wf.timeSlot}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-navy mb-2 font-serif">
                      {wf.focusTitle}
                    </h3>

                    <p className="text-xs text-navy-700 leading-relaxed mb-3 whitespace-pre-line">
                      {wf.primaryFocus}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-navy/10 text-[11px] text-navy-500 flex items-start gap-1.5">
                    <Info className="h-3.5 w-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{wf.limits || 'Jaga batas energi dan jangan memaksakan diri.'}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CONFLICT DETAILS */}
      {activeTab === 'conflict' && (
        <Card className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-100 text-navy">
              <AlertTriangle className="h-6 w-6 text-navy" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy font-serif">
                Pemeriksaan Benturan Jadwal: 18.30–19.30
              </h3>
              <p className="text-xs text-navy-600 mt-1 max-w-2xl leading-relaxed">
                Pada rancangan awal, terdapat aktivitas pengembangan diri pada pukul 18.30–19.30. Namun, slot ini berbenturan langsung dengan jadwal tetap istirahat, makan, dan ibadah (17.30–19.30).
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-navy-50 p-4 border border-navy/10 space-y-2 text-xs text-navy">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Status Saat Ini:</span>
              <Badge variant={conflict.status === 'confirmed' ? 'cyan' : 'navy'}>
                {conflict.status === 'proposed'
                  ? 'Perlu Konfirmasi (Dinonaktifkan Default)'
                  : conflict.status === 'confirmed'
                  ? 'Dikonfirmasi Aktif'
                  : 'Dinonaktifkan'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Slot Waktu Asli:</span>
              <span className="font-mono">18.30–19.30</span>
            </div>
            {conflict.customTimeSlot && (
              <div className="flex items-center justify-between">
                <span className="font-semibold">Waktu Alternatif yang Dipilih:</span>
                <span className="font-mono text-cyan-700 font-bold">{conflict.customTimeSlot}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => handleUpdateConflictStatus('disabled')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-navy/20 text-navy hover:bg-navy/5"
            >
              Kunci Waktu Istirahat (Nonaktifkan Slot 18.30)
            </button>
            <button
              onClick={() => setSelectedConflict(conflict)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400"
            >
              Ubah atau Pindahkan ke Jam Lain
            </button>
          </div>
        </Card>
      )}

      {/* Conflict Resolution Modal */}
      {selectedConflict && (
        <Modal
          isOpen={Boolean(selectedConflict)}
          onClose={() => setSelectedConflict(null)}
          title="Pengaturan Slot 18.30–19.30"
          subtitle="Tentukan apakah slot ini dipindahkan atau dinonaktifkan."
          maxWidth="md"
        >
          <div className="space-y-4">
            <p className="text-xs text-navy-600 leading-relaxed">
              Jadwal istirahat 17.30–19.30, pendampingan anak (20.00–21.00), dan waktu tidur (22.00) tidak boleh digeser secara otomatis. Silakan pilih opsi penanganan:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleUpdateConflictStatus('disabled')}
                className="w-full text-left p-3 rounded-lg border border-navy/20 hover:border-navy text-xs text-navy flex items-start gap-3 bg-white"
              >
                <ShieldCheck className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Nonaktifkan slot 18.30–19.30 (Direkomendasikan)</p>
                  <p className="text-navy-500 text-[11px] mt-0.5">
                    Pertahankan waktu 17.30–19.30 murni untuk istirahat, makan, dan ibadah tanpa beban produktivitas.
                  </p>
                </div>
              </button>

              <div className="p-3 rounded-lg border border-navy/20 text-xs text-navy space-y-2 bg-white">
                <p className="font-semibold">Pindahkan ke Waktu Luang Lain (Kustom)</p>
                <input
                  type="text"
                  placeholder="Contoh: 15.30–16.30 atau 06.00–07.00"
                  value={customTimeInput}
                  onChange={e => setCustomTimeInput(e.target.value)}
                  className="w-full rounded border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
                <button
                  type="button"
                  disabled={!customTimeInput.trim()}
                  onClick={() => handleUpdateConflictStatus('confirmed', customTimeInput.trim())}
                  className="px-3 py-1.5 rounded bg-cyan text-navy text-xs font-semibold disabled:opacity-50"
                >
                  Terapkan Waktu Kustom
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleUpdateConflictStatus('confirmed')}
                className="w-full text-left p-3 rounded-lg border border-navy/20 hover:border-navy text-xs text-navy flex items-start gap-3 bg-white"
              >
                <AlertTriangle className="h-4 w-4 text-navy-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Tetap aktifkan pada 18.30–19.30</p>
                  <p className="text-navy-500 text-[11px] mt-0.5">
                    Saya menyadari benturan ini dan memilih menggunakan sebagian waktu istirahat untuk fokus belajar.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
