import React, { useState } from 'react';
import { AppData } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { StatBox } from '../common/StatBox';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Users,
  Send,
  Award,
  Compass,
  Edit2,
  Check,
  X,
  ArrowRight,
  Clock,
  Calendar,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Target,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface PortfolioDashboardViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigate: (tab: any) => void;
  onOpenQuickCapture: () => void;
}

export const PortfolioDashboardView: React.FC<PortfolioDashboardViewProps> = ({
  data,
  onUpdateData,
  onNavigate,
  onOpenQuickCapture,
}) => {
  const [isEditingFocus, setIsEditingFocus] = useState(false);
  const [focusInput, setFocusInput] = useState(data.settings.todayFocus || '');

  const todayStr = new Date().toISOString().slice(0, 10);

  // 1. KPI Aggregations (Real dynamic data)
  const totalResearch = data.researchProjects?.length || 0;
  const activeResearch = (data.researchProjects || []).filter(
    p => p.progressStatus === 'Dalam Proses' || p.progressStatus === 'Belum Mulai'
  ).length;

  // Research outputs: completed / published or has outcomesEvidence
  const researchOutputs = (data.researchProjects || []).filter(
    p =>
      p.stage === 'Luaran' ||
      p.stage === 'Dipublikasikan / Dipresentasikan' ||
      (p.outcomesEvidence && p.outcomesEvidence.trim().length > 0)
  ).length;

  const totalKti = data.ktiProjects?.length || 0;
  const completedOrFinalKti = (data.ktiProjects || []).filter(
    k => k.stage === 'Selesai' || k.stage === 'Finalisasi' || k.stage === 'Uji Coba / Review'
  ).length;

  const totalCommunity = data.communityActivities?.length || 0;
  const activeCommunity = (data.communityActivities || []).filter(
    c => c.progressStatus === 'Aktif' || c.progressStatus === 'Didaftar'
  ).length;

  const totalOutreach = data.outreachLogs?.length || 0;
  const successfulOutreach = (data.outreachLogs || []).filter(
    o => o.status === 'Diterima' || o.status === 'Follow-up'
  ).length;

  const totalEvidences = data.portfolioEvidences?.length || 0;

  // 2. Pillar Progress Calculations
  // Research: weighted by stage progress
  const researchProgressPercent =
    totalResearch > 0
      ? Math.round(
          ((data.researchProjects || []).reduce((acc, p) => {
            if (p.stage === 'Dipublikasikan / Dipresentasikan') return acc + 100;
            if (p.stage === 'Luaran' || p.stage === 'Penulisan') return acc + 75;
            if (p.stage === 'Pengumpulan Data' || p.stage === 'Analisis') return acc + 50;
            if (p.stage === 'Proposal' || p.stage === 'Etik / Izin') return acc + 30;
            return acc + 15;
          }, 0) /
            (totalResearch * 100)) *
            100
        )
      : 0;

  // KTI progress percent
  const ktiProgressPercent =
    totalKti > 0
      ? Math.round(
          ((data.ktiProjects || []).reduce((acc, k) => {
            if (k.stage === 'Selesai') return acc + 100;
            if (k.stage === 'Finalisasi') return acc + 80;
            if (k.stage === 'Uji Coba / Review') return acc + 60;
            if (k.stage === 'Pengembangan') return acc + 40;
            return acc + 20;
          }, 0) /
            (totalKti * 100)) *
            100
        )
      : 0;

  // Community progress percent
  const communityProgressPercent =
    totalCommunity > 0
      ? Math.round(
          ((data.communityActivities || []).reduce((acc, c) => {
            if (c.progressStatus === 'Selesai') return acc + 100;
            if (c.progressStatus === 'Aktif') return acc + 75;
            if (c.progressStatus === 'Didaftar') return acc + 40;
            return acc + 20;
          }, 0) /
            (totalCommunity * 100)) *
            100
        )
      : 0;

  // 3. Aggregated Next Actions across trackers
  const nextActions: {
    id: string;
    action: string;
    actionDate?: string;
    source: string;
    title: string;
    targetTab: string;
  }[] = [];

  (data.researchProjects || []).forEach(p => {
    if (p.nextAction) {
      nextActions.push({
        id: `res-${p.id}`,
        action: p.nextAction,
        actionDate: p.actionDate,
        source: 'Research',
        title: p.topicOrQuestion,
        targetTab: 'research-tracker',
      });
    }
  });

  (data.communityActivities || []).forEach(c => {
    if (c.nextAction) {
      nextActions.push({
        id: `comm-${c.id}`,
        action: c.nextAction,
        actionDate: c.actionDate,
        source: 'Community',
        title: c.activity,
        targetTab: 'community-tracker',
      });
    }
  });

  (data.outreachLogs || []).forEach(o => {
    if (o.followUpAction) {
      nextActions.push({
        id: `out-${o.id}`,
        action: o.followUpAction,
        actionDate: o.followUpDate,
        source: 'Outreach',
        title: `${o.contactPerson} (${o.institution})`,
        targetTab: 'outreach-log',
      });
    }
  });

  // Sort next actions by actionDate if available
  nextActions.sort((a, b) => {
    if (!a.actionDate) return 1;
    if (!b.actionDate) return -1;
    return a.actionDate.localeCompare(b.actionDate);
  });

  // 4. Follow-up Reminders (from Outreach Log)
  const followUpReminders = (data.outreachLogs || []).filter(
    o => o.followUpDate && o.status !== 'Diterima' && o.status !== 'Ditolak'
  );

  // 5. Recent Activity Stream
  const recentActivities: {
    id: string;
    date: string;
    category: string;
    title: string;
    subtitle: string;
    targetTab: string;
  }[] = [];

  (data.portfolioEvidences || []).forEach(ev => {
    recentActivities.push({
      id: `ev-${ev.id}`,
      date: ev.date,
      category: 'Portfolio Evidence',
      title: ev.title,
      subtitle: `${ev.category} · ${ev.institution || 'Arsip Portofolio'}`,
      targetTab: 'portfolio-evidence',
    });
  });

  (data.researchProjects || []).forEach(p => {
    recentActivities.push({
      id: `res-${p.id}`,
      date: p.dateAdded,
      category: 'Research Project',
      title: p.topicOrQuestion,
      subtitle: `Tahap: ${p.stage} · Prioritas ${p.priority}`,
      targetTab: 'research-tracker',
    });
  });

  (data.ktiProjects || []).forEach(k => {
    recentActivities.push({
      id: `kti-${k.id}`,
      date: k.startDate,
      category: 'KTI Project',
      title: k.title,
      subtitle: `${k.type} · Tahap: ${k.stage}`,
      targetTab: 'kti-tracker',
    });
  });

  (data.communityActivities || []).forEach(c => {
    recentActivities.push({
      id: `comm-${c.id}`,
      date: c.dateAdded,
      category: 'Community Engagement',
      title: c.activity,
      subtitle: `${c.organization} · ${c.progressStatus}`,
      targetTab: 'community-tracker',
    });
  });

  recentActivities.sort((a, b) => b.date.localeCompare(a.date));

  // Save current focus
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Current Focus */}
      <div className="rounded-xl border border-cyan/40 bg-cyan-50/70 p-5 transition-all shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="p-2 rounded-lg bg-cyan text-navy mt-0.5">
              <Compass className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy-700">
                  Current Focus 2027
                </span>
                <Badge variant="cyan" size="sm">Fokus Kunci Hari Ini</Badge>
              </div>

              {isEditingFocus ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={focusInput}
                    onChange={e => setFocusInput(e.target.value)}
                    placeholder="Tentukan fokus utama hari ini (misal: Selesaikan draft KTI atau review paper riset)..."
                    className="flex-1 rounded-lg border border-navy/20 px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-cyan-500 bg-white"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveFocus}
                    className="p-1.5 rounded-lg bg-cyan text-navy hover:bg-cyan-400"
                    title="Simpan"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setFocusInput(data.settings.todayFocus || '');
                      setIsEditingFocus(false);
                    }}
                    className="p-1.5 rounded-lg bg-navy/10 text-navy-600 hover:bg-navy/20"
                    title="Batal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-navy leading-relaxed">
                    {data.settings.todayFocus || 'Belum ada fokus spesifik hari ini. Klik ubah untuk mengatur prioritas.'}
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

      {/* Row 1: 6 KPI Cards (Data Reaktif Tanpa Dummy) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatBox
          label="Research Projects"
          value={totalResearch.toString()}
          subtext={`${activeResearch} aktif berlangsung`}
          icon={<GraduationCap className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Research Outputs"
          value={researchOutputs.toString()}
          subtext="Luaran & naskah siap"
          icon={<Award className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="KTI Projects"
          value={totalKti.toString()}
          subtext={`${completedOrFinalKti} final / uji coba`}
          icon={<FileText className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Community"
          value={totalCommunity.toString()}
          subtext={`${activeCommunity} peran aktif`}
          icon={<Users className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Outreach Log"
          value={totalOutreach.toString()}
          subtext={`${successfulOutreach} diterima/follow-up`}
          icon={<Send className="h-4 w-4 text-cyan-600" />}
        />
        <StatBox
          label="Portfolio Evidence"
          value={totalEvidences.toString()}
          subtext="Artefak tersimpan"
          icon={<Award className="h-4 w-4 text-cyan-600" />}
        />
      </div>

      {/* Row 2: 3 Pilar Progress (Research, KTI, Community) */}
      <div className="rounded-xl border border-navy/10 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-navy">
              Portfolio Progress — 3 Pilar Utama 2027
            </h3>
            <p className="text-xs text-navy-500">
              Perkembangan agregat proyek, luaran, dan kematangan portofolio.
            </p>
          </div>
          <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan/20">
            Real-time Aggregation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pilar 1: KTI */}
          <div className="p-4 rounded-xl bg-navy-50/50 border border-navy/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-700" />
                <span className="text-xs font-bold text-navy">Pilar 1: KTI & Scientific Writing</span>
              </div>
              <span className="text-xs font-bold text-cyan-800">{ktiProgressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-navy/10 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, ktiProgressPercent))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-navy-500">
              <span>{totalKti} Total Proyek</span>
              <button
                onClick={() => onNavigate('kti-tracker')}
                className="text-cyan-700 hover:text-cyan-900 font-medium flex items-center gap-0.5"
              >
                <span>Buka Tracker</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Pilar 2: Research */}
          <div className="p-4 rounded-xl bg-navy-50/50 border border-navy/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-cyan-700" />
                <span className="text-xs font-bold text-navy">Pilar 2: Research Experience</span>
              </div>
              <span className="text-xs font-bold text-cyan-800">{researchProgressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-navy/10 overflow-hidden">
              <div
                className="h-full bg-navy-700 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, researchProgressPercent))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-navy-500">
              <span>{totalResearch} Peluang / Riset</span>
              <button
                onClick={() => onNavigate('research-tracker')}
                className="text-cyan-700 hover:text-cyan-900 font-medium flex items-center gap-0.5"
              >
                <span>Buka Tracker</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Pilar 3: Community */}
          <div className="p-4 rounded-xl bg-navy-50/50 border border-navy/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-700" />
                <span className="text-xs font-bold text-navy">Pilar 3: Community Engagement</span>
              </div>
              <span className="text-xs font-bold text-cyan-800">{communityProgressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-navy/10 overflow-hidden">
              <div
                className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, communityProgressPercent))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-navy-500">
              <span>{totalCommunity} Aktivitas / Peluang</span>
              <button
                onClick={() => onNavigate('community-tracker')}
                className="text-cyan-700 hover:text-cyan-900 font-medium flex items-center gap-0.5"
              >
                <span>Buka Tracker</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Next Actions & Follow-up Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Actions (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy flex items-center gap-2">
              <span>Next Actions — Prioritas Tindak Lanjut</span>
              <Badge variant="cyan" size="sm">{nextActions.length} Tindakan</Badge>
            </h3>
            <span className="text-[11px] text-navy-400">Dari Research, KTI, & Outreach</span>
          </div>

          {nextActions.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-navy/20 bg-white text-center text-xs text-navy-500">
              Belum ada tindakan selanjutnya yang dicatat. Buka modul tracker untuk menambahkan langkah aksi.
            </div>
          ) : (
            <div className="space-y-2">
              {nextActions.slice(0, 5).map(act => (
                <div
                  key={act.id}
                  onClick={() => onNavigate(act.targetTab)}
                  className="p-3 rounded-xl bg-white border border-navy/10 hover:border-cyan/50 hover:shadow-xs transition-all flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="navy" size="sm">
                        {act.source}
                      </Badge>
                      <span className="text-[11px] text-navy-500 truncate max-w-xs">
                        {act.title}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-navy group-hover:text-cyan-900 transition-colors">
                      {act.action}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-[11px] text-navy-400">
                    {act.actionDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {act.actionDate}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-navy-300 group-hover:text-cyan-700" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Follow-up Reminders (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy flex items-center gap-2">
              <span>Follow-up Reminder</span>
              {followUpReminders.length > 0 && (
                <Badge variant="warning" size="sm">{followUpReminders.length}</Badge>
              )}
            </h3>
            <button
              onClick={() => onNavigate('outreach-log')}
              className="text-xs text-cyan-700 hover:text-cyan-900 font-medium"
            >
              Lihat Log
            </button>
          </div>

          {followUpReminders.length === 0 ? (
            <div className="p-5 rounded-xl border border-navy/10 bg-white text-center text-xs text-navy-500">
              Semua follow-up komunikasi up-to-date.
            </div>
          ) : (
            <div className="space-y-2">
              {followUpReminders.slice(0, 4).map(rem => {
                const isOverdue = rem.followUpDate && rem.followUpDate <= todayStr;
                return (
                  <div
                    key={rem.id}
                    onClick={() => onNavigate('outreach-log')}
                    className="p-3 rounded-xl bg-white border border-navy/10 hover:border-cyan/40 cursor-pointer space-y-1.5 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-navy truncate">
                        {rem.contactPerson}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isOverdue ? 'bg-red-50 text-red-600' : 'bg-navy-50 text-navy-600'
                        }`}
                      >
                        {rem.followUpDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-navy-500 truncate">
                      {rem.institution}
                    </p>
                    {rem.followUpAction && (
                      <p className="text-[11px] text-navy-700 bg-navy-50/70 p-1.5 rounded leading-tight">
                        {rem.followUpAction}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Row 4: Recent Activity & Milestone 2027 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy">
              Recent Activity — Aktivitas & Pencatatan Terakhir
            </h3>
            <span className="text-[11px] text-navy-400">Lintas Seluruh Modul</span>
          </div>

          <div className="rounded-xl border border-navy/10 bg-white p-2 divide-y divide-navy/5">
            {recentActivities.slice(0, 6).map(act => (
              <div
                key={act.id}
                onClick={() => onNavigate(act.targetTab)}
                className="p-3 flex items-center justify-between hover:bg-navy-50/50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
                      {act.category}
                    </span>
                    <span className="text-[10px] text-navy-400">· {act.date}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-navy">
                    {act.title}
                  </h5>
                  <p className="text-[11px] text-navy-500">
                    {act.subtitle}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-navy-300 shrink-0 ml-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Milestone 2027 (1 col) */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-navy">
            Milestones 2027 — Target Strategis
          </h3>

          <div className="rounded-xl border border-navy/10 bg-white p-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">1. Publikasi KTI & Modul Teruji</span>
                <span className="text-cyan-800 font-bold">{completedOrFinalKti}/{Math.max(3, totalKti)}</span>
              </div>
              <div className="h-1.5 w-full bg-navy/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-600 rounded-full"
                  style={{ width: `${Math.min(100, Math.round((completedOrFinalKti / Math.max(3, totalKti)) * 100))}%` }}
                />
              </div>
              <p className="text-[10px] text-navy-500">Menyusun dan menguji 3 modul ilmiah ramah otak.</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">2. Remote Research Assistant Ready</span>
                <span className="text-cyan-800 font-bold">{researchOutputs}/2 Paper</span>
              </div>
              <div className="h-1.5 w-full bg-navy/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-navy-700 rounded-full"
                  style={{ width: `${Math.min(100, Math.round((researchOutputs / 2) * 100))}%` }}
                />
              </div>
              <p className="text-[10px] text-navy-500">Kesiapan portofolio riset & manuskrip empiris S2.</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">3. Jejaring Outreach & Komunitas</span>
                <span className="text-cyan-800 font-bold">{successfulOutreach + activeCommunity}/5 Mitra</span>
              </div>
              <div className="h-1.5 w-full bg-navy/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((successfulOutreach + activeCommunity) / 5) * 100))}%` }}
                />
              </div>
              <p className="text-[10px] text-navy-500">Membangun kolaborasi aktif dengan lab & komunitas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
