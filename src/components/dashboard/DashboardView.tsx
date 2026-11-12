import React, { useState } from 'react';
import { AppData, DailyScheduleItem, QuickCaptureItem } from '../../types';
import { initialTuesdaySchedule } from '../../data/initialData';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { StatBox } from '../common/StatBox';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Film,
  GraduationCap,
  Sparkles,
  Coffee,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Edit2,
  Check,
  X,
  Compass,
  Smile,
  Heart
} from 'lucide-react';

interface DashboardViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigate: (tab: any) => void;
  onOpenQuickCapture: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  onUpdateData,
  onNavigate,
  onOpenQuickCapture,
}) => {
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [focusInput, setFocusInput] = useState(data.settings.todayFocus || '');

  // Day of week detection (0 is Sunday, 2 is Tuesday)
  const dayOfWeek = new Date().getDay();
  const isActuallyTuesday = dayOfWeek === 2;
  const [scheduleMode, setScheduleMode] = useState<'auto' | 'work' | 'tuesday'>('auto');
  const isTuesdayActive = scheduleMode === 'auto' ? isActuallyTuesday : scheduleMode === 'tuesday';

  // Active schedule based on selected mode or today
  const tuesdayItems = (data.tuesdaySchedule && data.tuesdaySchedule.length > 0)
    ? data.tuesdaySchedule
    : initialTuesdaySchedule;
  const activeSchedule = isTuesdayActive ? tuesdayItems : data.dailySchedule;

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayLog = data.activityLogs[todayStr] || {
    date: todayStr,
    completedItemIds: [],
    skippedItemIds: [],
  };

  // Toggle item completion for today
  const handleToggleItem = (itemId: string) => {
    const isCompleted = todayLog.completedItemIds.includes(itemId);
    let newCompleted: string[];
    let newSkipped = todayLog.skippedItemIds.filter(id => id !== itemId);

    if (isCompleted) {
      newCompleted = todayLog.completedItemIds.filter(id => id !== itemId);
    } else {
      newCompleted = [...todayLog.completedItemIds, itemId];
    }

    const updatedLogs = {
      ...data.activityLogs,
      [todayStr]: {
        ...todayLog,
        completedItemIds: newCompleted,
        skippedItemIds: newSkipped,
      },
    };

    onUpdateData({
      ...data,
      activityLogs: updatedLogs,
    });
  };

  const handleSaveFocus = () => {
    onUpdateData({
      ...data,
      settings: {
        ...data.settings,
        todayFocus: focusInput.trim(),
      },
    });
    setIsEditingFocus(false);
  };

  // Default focus suggestion based on current day
  const defaultFocusText = isTuesdayActive
    ? 'Selasa — Personal Growth Day: Neuroeducation, latihan Remote RA, dan Mikro Thinking ID.'
    : 'Hari Kerja: Fokus 07.00–08.00 (Pengembangan diri), 14.00–15.30 (Produksi konten), lindungi 15.30–16.30 (Ibadah).';

  // Calculations based on active schedule
  const nonRestItems = activeSchedule.filter(i => !i.isRest);
  const completedTodayCount = activeSchedule.filter(i => todayLog.completedItemIds.includes(i.id)).length;
  const completionPercent = nonRestItems.length > 0
    ? Math.round((completedTodayCount / nonRestItems.length) * 100)
    : 0;

  // Study hours total across neuro modules
  const totalStudyHours = data.neuroModules.reduce((acc, m) => acc + (m.studyHours || 0), 0);
  
  // Mikro thinking progress
  const publishedMikroVideos = data.mikroEpisodes.filter(e => e.videoStatus === 'Published').length;
  const publishedMikroArticles = data.mikroEpisodes.filter(e => e.articleStatus === 'Published').length;
  const activeMikroEpisode = data.mikroEpisodes.find(e => e.videoStatus !== 'Published') || data.mikroEpisodes[0];

  // GO.COUNSEL progress
  const publishedGcCount = data.goCounselCalendar.filter(c => c.isPublished).length;
  const nextGcContent = data.goCounselCalendar.find(c => !c.isPublished) || data.goCounselCalendar[0];

  // Neuroeducation roadmap
  const completedModules = data.neuroModules.filter(m => m.status === 'Completed').length;
  const inProgressModule = data.neuroModules.find(m => m.status === 'In Progress') || data.neuroModules[0];

  // Research Assistant skills
  const masteredSkills = data.researchSkills.filter(s => s.status === 'Mastered').length;

  // Portfolio items completed
  const completedPortfolio = data.portfolio.filter(p => p.status === 'Completed').length;

  // Recent energy level today
  const todayEnergy = data.energyLogs[todayStr];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Today's Focus */}
      <div className="rounded-xl border border-cyan/40 bg-cyan-50/70 p-5 transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="p-2 rounded-lg bg-cyan text-navy mt-0.5">
              <Compass className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy-600">
                  Today's Focus
                </span>
                <span className="text-[10px] text-navy-400 font-medium">Prioritas Kunci Hari Ini</span>
              </div>
              {isEditingFocus ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={focusInput}
                    onChange={e => setFocusInput(e.target.value)}
                    placeholder="Tentukan 1-2 prioritas penting hari ini..."
                    className="flex-1 rounded-lg border border-navy/20 px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveFocus}
                    className="p-1.5 rounded-lg bg-cyan text-navy hover:bg-cyan-400"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setFocusInput(data.settings.todayFocus || '');
                      setIsEditingFocus(false);
                    }}
                    className="p-1.5 rounded-lg bg-navy/10 text-navy-600 hover:bg-navy/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-navy leading-relaxed">
                    {data.settings.todayFocus || defaultFocusText}
                  </p>
                  <button
                    onClick={() => setIsEditingFocus(true)}
                    className="ml-3 text-xs text-navy-500 hover:text-navy flex items-center gap-1 font-medium"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Ubah</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox
          label="Aktivitas Hari Ini"
          value={`${completedTodayCount}/${nonRestItems.length}`}
          subtext={completionPercent > 0 ? `${completionPercent}% terlaksana hari ini` : 'Mulai dari langkah pertama'}
          badge={completionPercent === 100 ? 'Selesai' : undefined}
          icon={<CheckCircle2 className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Jam Belajar Aktual"
          value={`${totalStudyHours} Jam`}
          subtext="Akumulasi studi Neuroeducation"
          icon={<Clock className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Mikro Thinking ID"
          value={`Ep ${activeMikroEpisode?.episodeNo || '01'}`}
          subtext={`${publishedMikroVideos} video & ${publishedMikroArticles} artikel terbit`}
          icon={<Film className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Portofolio S2 & RA"
          value={`${completedPortfolio}/14`}
          subtext={`${masteredSkills}/18 skill RA dikuasai`}
          icon={<GraduationCap className="h-4 w-4 text-cyan-600" />}
        />
      </div>

      {/* Row 2: Today's Schedule & Quick Capture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Today's Schedule & Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-navy tracking-tight">
                  Jadwal & Checklist Hari Ini
                </h3>
                {isActuallyTuesday && (
                  <Badge variant="cyan" size="sm">
                    Hari Ini: Selasa
                  </Badge>
                )}
              </div>
              <p className="text-xs text-navy-500">
                Tandai yang terlaksana. Jangan merasa bersalah saat beristirahat.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Schedule Mode Switcher */}
              <div className="flex rounded-lg border border-navy/15 p-0.5 bg-navy/5 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => setScheduleMode('work')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    !isTuesdayActive
                      ? 'bg-white text-navy font-semibold shadow-xs'
                      : 'text-navy-500 hover:text-navy'
                  }`}
                >
                  Jadwal Kerja
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleMode('tuesday')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                    isTuesdayActive
                      ? 'bg-cyan text-navy font-semibold shadow-xs'
                      : 'text-navy-500 hover:text-navy'
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Selasa (Growth Day)</span>
                </button>
              </div>

              <button
                onClick={() => onNavigate('schedule')}
                className="text-xs font-medium text-navy-600 hover:text-navy flex items-center gap-1 ml-1"
              >
                <span>Kalender</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Special Banner if Tuesday schedule is active */}
          {isTuesdayActive && (
            <div className="bg-cyan-50/80 border border-cyan/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-navy">
              <Sparkles className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-navy">Selasa — Personal Growth Day (Tanpa ke Kantor):</span> Fokus pada riset Neuroeducation, latihan Remote RA, dan Mikro Thinking ID. Waktu ibadah (15.30–16.30) dan istirahat dilindungi.
              </div>
            </div>
          )}

          <div className="space-y-2">
            {activeSchedule.map(item => {
              const isCompleted = todayLog.completedItemIds.includes(item.id);
              const isWorship = item.timeStart === '15.30' && item.timeEnd === '16.30';
              return (
                <div
                  key={item.id}
                  onClick={() => !item.isRest && !isWorship && handleToggleItem(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    isWorship
                      ? 'bg-white border-cyan/60 text-navy cursor-default shadow-xs'
                      : item.isRest
                      ? 'bg-cyan-50/50 border-cyan/25 text-navy cursor-default'
                      : isCompleted
                      ? 'bg-white border-cyan text-navy/70 shadow-sm cursor-pointer'
                      : 'bg-white border-navy/10 text-navy hover:border-navy/20 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {isWorship ? (
                      <div className="p-1 rounded bg-cyan-50 border border-cyan/30 text-navy">
                        <Heart className="h-4 w-4 text-navy fill-cyan/20" />
                      </div>
                    ) : item.isRest ? (
                      <div className="p-1 rounded bg-cyan-100 text-navy">
                        <Coffee className="h-4 w-4 text-navy" />
                      </div>
                    ) : (
                      <div
                        className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-cyan border-cyan text-navy'
                            : 'border-navy/30 bg-white'
                        }`}
                      >
                        {isCompleted && <Check className="h-3 w-3 text-navy stroke-[3]" />}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-navy">
                          {item.timeStart}–{item.timeEnd}
                        </span>
                        <span
                          className={`text-xs truncate ${
                            isCompleted ? 'line-through text-navy-400 font-normal' : 'font-medium text-navy'
                          }`}
                        >
                          {item.activity}
                        </span>
                        {item.outputNote && (
                          <span className="text-[10px] bg-cyan/20 border border-cyan/30 text-navy px-1.5 py-0.2 rounded font-medium">
                            Output: {item.outputNote}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-navy-400 truncate mt-0.5">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isWorship && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-cyan/25 border border-cyan-400/50 text-navy">
                        <Heart className="h-3 w-3 text-navy fill-cyan/30" />
                        Waktu Ibadah Khusus
                      </span>
                    )}
                    {item.isRest && !isWorship && (
                      <Badge variant="cyan" size="sm">
                        Waktu Istirahat
                      </Badge>
                    )}
                    {item.isOptional && (
                      <Badge variant="subtle" size="sm">
                        Opsional
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Captures & Action Highlights */}
        <div className="space-y-6">
          {/* Quick Captures Box */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-600" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-navy">
                  Quick Capture Terbaru
                </h4>
              </div>
              <button
                onClick={onOpenQuickCapture}
                className="text-xs font-medium text-navy hover:text-navy-700 underline"
              >
                + Tambah
              </button>
            </div>

            {data.quickCaptures.length === 0 ? (
              <p className="text-xs text-navy-400 italic">Belum ada catatan atau ide cepat.</p>
            ) : (
              <div className="space-y-2">
                {data.quickCaptures.slice(0, 4).map(qc => (
                  <div
                    key={qc.id}
                    className="p-2.5 rounded-lg bg-navy-50 border border-navy/10 text-xs text-navy flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-navy-400">
                      <span className="uppercase font-semibold tracking-wider">{qc.category}</span>
                      {qc.targetModule && (
                        <span className="text-navy-600 font-medium">{qc.targetModule}</span>
                      )}
                    </div>
                    <p className="leading-snug text-navy-800">{qc.text}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Neuroeducation Active Module */}
          <Card variant="cyan">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-600">
                Spesialisasi Neuroeducation
              </span>
              <Badge variant="navy" size="sm">
                Bulan {inProgressModule.month}/12
              </Badge>
            </div>
            <h4 className="text-sm font-semibold text-navy mb-1 font-serif">
              {inProgressModule.title}
            </h4>
            <p className="text-xs text-navy-600 mb-3 leading-relaxed">
              Target Output: {inProgressModule.targetOutputs[0]}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-cyan-300/40 text-xs text-navy">
              <span className="text-[11px] text-navy-500">
                {inProgressModule.studyHours} Jam Belajar
              </span>
              <button
                onClick={() => onNavigate('research')}
                className="font-medium hover:underline flex items-center gap-1"
              >
                <span>Buka Modul</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </Card>

          {/* GO.COUNSEL Next Content */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500">
                GO.COUNSEL 30-Day Plan
              </span>
              <Badge variant="cyan" size="sm">
                Hari ke-{nextGcContent.day}
              </Badge>
            </div>
            <h4 className="text-xs font-semibold text-navy mb-1">
              [{nextGcContent.format}] {nextGcContent.topic}
            </h4>
            <p className="text-[11px] text-navy-500 line-clamp-2 mb-3">
              {nextGcContent.hook}
            </p>
            <button
              onClick={() => onNavigate('content')}
              className="w-full py-1.5 text-center text-xs font-semibold text-navy bg-cyan/60 hover:bg-cyan rounded-lg border border-cyan transition-colors"
            >
              Lihat Kalender Konten
            </button>
          </Card>

          {/* Energy tracker reminder */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Smile className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-semibold text-navy">Energi Hari Ini</span>
              </div>
              <button
                onClick={() => onNavigate('reflection')}
                className="text-[11px] text-navy hover:underline"
              >
                Catat
              </button>
            </div>
            {todayEnergy ? (
              <div className="flex items-center gap-2 text-xs text-navy">
                <Badge variant="cyan" size="sm">
                  Skala {todayEnergy.level}/5 • {todayEnergy.condition}
                </Badge>
                {todayEnergy.causes && (
                  <span className="text-navy-500 truncate text-[11px]">
                    "{todayEnergy.causes}"
                  </span>
                )}
              </div>
            ) : (
              <p className="text-xs text-navy-400">
                Belum mencatat tingkat energi hari ini. Luangkan waktu untuk refleksi diri.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
