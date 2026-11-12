import React, { useState } from 'react';
import {
  AppData,
  MonthlyReview,
  EnergyLog,
  EnergyCondition
} from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import {
  LineChart as ChartIcon,
  Smile,
  FileCheck2,
  Calendar,
  Sparkles,
  Heart,
  Plus,
  Edit2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BatteryCharging,
  Info
} from 'lucide-react';

interface ProgressReflectionViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const ProgressReflectionView: React.FC<ProgressReflectionViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'energy' | 'monthly' | 'summary'>('analytics');

  // Selected month for review e.g. "2027-01"
  const currentMonthYear = '2027-01';
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>(currentMonthYear);

  // Energy Log Form State
  const todayStr = new Date().toISOString().slice(0, 10);
  const existingEnergyToday = data.energyLogs[todayStr];
  const [energyInputLevel, setEnergyInputLevel] = useState<1 | 2 | 3 | 4 | 5>(
    existingEnergyToday ? existingEnergyToday.level : 3
  );
  const [energyCauses, setEnergyCauses] = useState(
    existingEnergyToday ? existingEnergyToday.causes : ''
  );
  const [energySavedNotice, setEnergySavedNotice] = useState(false);

  // Monthly Review Form State
  const existingReview = data.monthlyReviews.find(r => r.monthYear === selectedMonthYear) || {
    id: `rev-${selectedMonthYear}`,
    monthYear: selectedMonthYear,
    achieved: '',
    skillsGrown: '',
    outputsCreated: '',
    biggestObstacle: '',
    drainingActivities: '',
    energizingActivities: '',
    toReduce: '',
    toKeep: '',
    toImprove: '',
    nextFocus: '',
  };

  const [reviewForm, setReviewForm] = useState<MonthlyReview>(existingReview);
  const [reviewSavedNotice, setReviewSavedNotice] = useState(false);

  // Save Energy Log
  const handleSaveEnergy = (e: React.FormEvent) => {
    e.preventDefault();
    const conditionMap: Record<number, EnergyCondition> = {
      1: 'Very Low',
      2: 'Low',
      3: 'Moderate',
      4: 'High',
      5: 'Very High',
    };

    const newLog: EnergyLog = {
      date: todayStr,
      level: energyInputLevel,
      condition: conditionMap[energyInputLevel],
      causes: energyCauses.trim(),
    };

    const updatedEnergy = {
      ...data.energyLogs,
      [todayStr]: newLog,
    };

    onUpdateData({
      ...data,
      energyLogs: updatedEnergy,
    });

    setEnergySavedNotice(true);
    setTimeout(() => setEnergySavedNotice(false), 3000);
  };

  // Save Monthly Review
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    const otherReviews = data.monthlyReviews.filter(r => r.monthYear !== selectedMonthYear);
    const updatedReviews = [
      ...otherReviews,
      {
        ...reviewForm,
        completedAt: new Date().toISOString(),
      },
    ];

    onUpdateData({
      ...data,
      monthlyReviews: updatedReviews,
    });

    setReviewSavedNotice(true);
    setTimeout(() => setReviewSavedNotice(false), 3000);
  };

  // ================= DATA CALCULATIONS (REAL DATA ONLY) =================
  const totalStudyHours = data.neuroModules.reduce((acc, m) => acc + (m.studyHours || 0), 0);
  const completedNeuroModules = data.neuroModules.filter(m => m.status === 'Completed').length;
  const inProgressNeuroModules = data.neuroModules.filter(m => m.status === 'In Progress').length;
  
  const masteredSkills = data.researchSkills.filter(s => s.status === 'Mastered').length;
  const inProgressSkills = data.researchSkills.filter(s => s.status === 'In Progress').length;

  const publishedMikroVideos = data.mikroEpisodes.filter(e => e.videoStatus === 'Published').length;
  const publishedMikroArticles = data.mikroEpisodes.filter(e => e.articleStatus === 'Published').length;

  const publishedGcContent = data.goCounselCalendar.filter(c => c.isPublished).length;
  const completedPortfolio = data.portfolio.filter(p => p.status === 'Completed').length;
  const totalActivities = data.professionalActivities.filter(a => a.status === 'Completed').length;

  // Chart 1: Study hours per Neuroeducation Quarter
  const studyHoursQuarterly = [
    {
      quarter: 'Q1 (Bln 1-3)',
      hours: data.neuroModules.slice(0, 3).reduce((acc, m) => acc + m.studyHours, 0),
    },
    {
      quarter: 'Q2 (Bln 4-6)',
      hours: data.neuroModules.slice(3, 6).reduce((acc, m) => acc + m.studyHours, 0),
    },
    {
      quarter: 'Q3 (Bln 7-9)',
      hours: data.neuroModules.slice(6, 9).reduce((acc, m) => acc + m.studyHours, 0),
    },
    {
      quarter: 'Q4 (Bln 10-12)',
      hours: data.neuroModules.slice(9, 12).reduce((acc, m) => acc + m.studyHours, 0),
    },
  ];

  // Chart 2: Energy Trend across recent logged days
  const energyEntries = Object.values(data.energyLogs).sort((a, b) => a.date.localeCompare(b.date));
  const energyChartData = energyEntries.length > 0
    ? energyEntries.slice(-14).map(e => ({
        date: e.date.slice(5), // MM-DD
        level: e.level,
        condition: e.condition,
      }))
    : [{ date: todayStr.slice(5), level: energyInputLevel, condition: 'Moderate' }];

  const avgEnergy = energyEntries.length > 0
    ? (energyEntries.reduce((acc, e) => acc + e.level, 0) / energyEntries.length).toFixed(1)
    : '-';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            Progress & Reflection — Evaluasi & Energi
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Mengevaluasi perkembangan akademik, konsistensi berkarya, dan menjaga keseimbangan energi tanpa memaksakan diri.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'analytics', label: 'Progress Dashboard', icon: <ChartIcon className="h-4 w-4" /> },
            { id: 'energy', label: 'Energy Tracker (1-5)', icon: <BatteryCharging className="h-4 w-4" /> },
            { id: 'monthly', label: 'Monthly Review (10 Soal)', icon: <FileCheck2 className="h-4 w-4" /> },
            { id: 'summary', label: 'Ringkasan Bulanan', icon: <Sparkles className="h-4 w-4" /> },
          ]}
          activeTab={activeTab}
          onChange={tabId => setActiveTab(tabId as any)}
        />
      </div>

      {/* ================= TAB 1: PROGRESS DASHBOARD ================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-navy/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Neuroeducation Modules
              </span>
              <span className="text-2xl font-bold text-navy font-serif">
                {completedNeuroModules} / 12
              </span>
              <p className="text-[11px] text-navy-400 mt-1">{inProgressNeuroModules} sedang dipelajari</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-navy/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Keahlian Research Assistant
              </span>
              <span className="text-2xl font-bold text-navy">
                {masteredSkills} / 18
              </span>
              <p className="text-[11px] text-navy-400 mt-1">{inProgressSkills} dalam latihan</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-navy/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Karya Konten Terbit
              </span>
              <span className="text-2xl font-bold text-navy">
                {publishedMikroVideos + publishedGcContent}
              </span>
              <p className="text-[11px] text-navy-400 mt-1">
                {publishedMikroVideos} Video YouTube, {publishedGcContent} IG Post
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-navy/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Portofolio Akademik Siap
              </span>
              <span className="text-2xl font-bold text-navy">
                {completedPortfolio} / 14
              </span>
              <p className="text-[11px] text-navy-400 mt-1">Dokumen terverifikasi S2 & RA</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart: Study Hours Distribution */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-navy">
                    Jam Belajar Aktual per Kuartal (Neuroeducation)
                  </h3>
                  <p className="text-[11px] text-navy-400 mt-0.5">
                    Total: {totalStudyHours} jam dari pencatatan aktual
                  </p>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyHoursQuarterly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 52, 68, 0.08)" />
                    <XAxis dataKey="quarter" stroke="#2E3444" fontSize={11} tickLine={false} />
                    <YAxis stroke="#2E3444" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#2E3444',
                        borderRadius: '8px',
                        fontSize: '11px',
                        color: '#2E3444',
                      }}
                    />
                    <Bar dataKey="hours" name="Jam Belajar" fill="#B0DAE7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Chart: Energy Fluctuation */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-navy">
                    Tren Energi Harian (Skala 1–5)
                  </h3>
                  <p className="text-[11px] text-navy-400 mt-0.5">
                    Rata-rata energi: {avgEnergy} / 5
                  </p>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 52, 68, 0.08)" />
                    <XAxis dataKey="date" stroke="#2E3444" fontSize={11} tickLine={false} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#2E3444" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#2E3444',
                        borderRadius: '8px',
                        fontSize: '11px',
                        color: '#2E3444',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="level"
                      name="Tingkat Energi"
                      stroke="#2E3444"
                      strokeWidth={2}
                      dot={{ fill: '#B0DAE7', r: 4, stroke: '#2E3444', strokeWidth: 1.5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ENERGY TRACKER ================= */}
      {activeTab === 'energy' && (
        <div className="space-y-6">
          {/* Philosophy Banner */}
          <div className="rounded-xl bg-cyan-50/60 border border-cyan/40 p-5 flex items-start gap-3">
            <Heart className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
                Prinsip Pemulihan & Keseimbangan Energi
              </h4>
              <p className="text-xs text-navy-600 mt-1 leading-relaxed">
                Energi rendah adalah sinyal biologis alami untuk beristirahat, bukan tanda kegagalan produktivitas. Aplikasi ini dirancang untuk menghormati ritme tubuh tanpa memicu rasa bersalah.
              </p>
            </div>
          </div>

          {/* Daily Energy Logger Card */}
          <Card className="max-w-2xl mx-auto space-y-5">
            <div>
              <h3 className="text-sm font-bold text-navy font-serif">
                Catat Tingkat Energi Hari Ini ({todayStr})
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                Bagaimana kondisi fisik dan mental Anda hari ini?
              </p>
            </div>

            <form onSubmit={handleSaveEnergy} className="space-y-4">
              {/* 1-5 Scale Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { level: 1, label: 'Very Low', desc: 'Sangat Lelah' },
                  { level: 2, label: 'Low', desc: 'Rendah' },
                  { level: 3, label: 'Moderate', desc: 'Cukup' },
                  { level: 4, label: 'High', desc: 'Baik / Segar' },
                  { level: 5, label: 'Very High', desc: 'Sangat Prima' },
                ].map(opt => (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setEnergyInputLevel(opt.level as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      energyInputLevel === opt.level
                        ? 'bg-navy text-white border-navy font-bold shadow-sm'
                        : 'bg-white text-navy border-navy/15 hover:bg-navy/5'
                    }`}
                  >
                    <span className="text-base font-bold font-mono">{opt.level}</span>
                    <span className="text-[11px] mt-0.5 leading-tight">{opt.label}</span>
                    <span className="text-[9px] opacity-70 hidden sm:block mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>

              {/* Causes / Factors Notes */}
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Penyebab atau Catatan Kondisi (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={energyCauses}
                  onChange={e => setEnergyCauses(e.target.value)}
                  placeholder="Contoh: Tidur cukup 7 jam; pekerjaan konseling siswa cukup intens; butuh jalan santai sore..."
                  className="w-full rounded-lg border border-navy/20 p-2.5 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-navy/10">
                {energySavedNotice ? (
                  <span className="text-xs text-navy flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                    <span>Catatan energi tersimpan!</span>
                  </span>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan text-navy font-semibold text-xs border border-cyan-400 hover:bg-cyan-400 shadow-sm"
                >
                  Simpan Catatan Energi
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ================= TAB 3: MONTHLY REVIEW (10 SOAL) ================= */}
      {activeTab === 'monthly' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-navy/10">
            <div>
              <h3 className="text-sm font-bold text-navy font-serif">
                Formulir Evaluasi & Refleksi Bulanan (10 Pertanyaan Introspektif)
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                Mengevaluasi hasil kerja, hambatan, serta pengelolaan energi bulanan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-navy-500">Pilih Bulan:</span>
              <input
                type="month"
                value={selectedMonthYear}
                onChange={e => {
                  setSelectedMonthYear(e.target.value);
                  const rev = data.monthlyReviews.find(r => r.monthYear === e.target.value) || {
                    id: `rev-${e.target.value}`,
                    monthYear: e.target.value,
                    achieved: '',
                    skillsGrown: '',
                    outputsCreated: '',
                    biggestObstacle: '',
                    drainingActivities: '',
                    energizingActivities: '',
                    toReduce: '',
                    toKeep: '',
                    toImprove: '',
                    nextFocus: '',
                  };
                  setReviewForm(rev);
                }}
                className="rounded-lg border border-navy/20 p-1.5 text-xs bg-white text-navy focus:outline-none"
              />
            </div>
          </div>

          <form onSubmit={handleSaveReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { field: 'achieved', num: '1', q: 'Apa yang berhasil dicapai bulan ini?' },
                { field: 'skillsGrown', num: '2', q: 'Skill apa yang meningkat?' },
                { field: 'outputsCreated', num: '3', q: 'Output apa yang berhasil dibuat?' },
                { field: 'biggestObstacle', num: '4', q: 'Apa hambatan terbesar?' },
                { field: 'drainingActivities', num: '5', q: 'Aktivitas apa yang paling menguras energi?' },
                { field: 'energizingActivities', num: '6', q: 'Aktivitas apa yang memberikan energi?' },
                { field: 'toReduce', num: '7', q: 'Apa yang perlu dikurangi?' },
                { field: 'toKeep', num: '8', q: 'Apa yang perlu dipertahankan?' },
                { field: 'toImprove', num: '9', q: 'Apa yang ingin diperbaiki?' },
                { field: 'nextFocus', num: '10', q: 'Apa fokus bulan berikutnya?' },
              ].map(item => (
                <div key={item.field} className="rounded-xl border border-navy/15 bg-white p-4 space-y-1.5">
                  <label className="block text-xs font-bold text-navy">
                    <span className="font-mono text-cyan-800 mr-1.5">#{item.num}</span>
                    {item.q}
                  </label>
                  <textarea
                    rows={2}
                    value={(reviewForm as any)[item.field] || ''}
                    onChange={e =>
                      setReviewForm({
                        ...reviewForm,
                        [item.field]: e.target.value,
                      })
                    }
                    placeholder="Tuliskan refleksi objektif dan jujur..."
                    className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-navy/10">
              {reviewSavedNotice ? (
                <span className="text-xs text-navy font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                  <span>Evaluasi bulan {selectedMonthYear} berhasil disimpan!</span>
                </span>
              ) : (
                <span className="text-xs text-navy-400">
                  Data otomatis tersimpan di LocalStorage perangkat Anda.
                </span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-900 shadow-sm"
              >
                Simpan Evaluasi Bulanan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 4: MONTHLY SUMMARY REPORT ================= */}
      {activeTab === 'summary' && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between border-b border-navy/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
                Executive Overview
              </span>
              <h3 className="text-lg font-bold text-navy font-serif">
                Monthly Summary — Perkembangan Personal & Akademik
              </h3>
            </div>
            <Badge variant="cyan" size="md">
              Bulan Evaluasi: {selectedMonthYear}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-navy">
            <div className="p-3.5 rounded-lg bg-navy-50 border border-navy/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-navy-400 block">Total Jam Belajar</span>
              <p className="text-base font-bold text-navy">{totalStudyHours} Jam</p>
              <span className="text-[10px] text-navy-500">Studi Neuroeducation</span>
            </div>

            <div className="p-3.5 rounded-lg bg-navy-50 border border-navy/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-navy-400 block">Skill Berkembang</span>
              <p className="text-base font-bold text-navy">{masteredSkills} RA Skills</p>
              <span className="text-[10px] text-navy-500">Keahlian teruji</span>
            </div>

            <div className="p-3.5 rounded-lg bg-navy-50 border border-navy/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-navy-400 block">Konten Dipublikasi</span>
              <p className="text-base font-bold text-navy">{publishedMikroVideos} Video / {publishedGcContent} IG</p>
              <span className="text-[10px] text-navy-500">Mikro Thinking & GC</span>
            </div>

            <div className="p-3.5 rounded-lg bg-navy-50 border border-navy/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-navy-400 block">Rata-Rata Energi</span>
              <p className="text-base font-bold text-navy">{avgEnergy} / 5</p>
              <span className="text-[10px] text-navy-500">Skala pemulihan fisik/mental</span>
            </div>
          </div>

          {/* Qualitative Highlights from Review */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500">
              Sorotan Evaluasi ({selectedMonthYear}):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-navy">
              <div className="p-3 rounded-lg border border-navy/10 bg-white">
                <strong className="block text-navy font-semibold mb-1">Pencapaian Utama:</strong>
                <p className="text-navy-600 leading-relaxed">
                  {reviewForm.achieved || 'Belum diisi pada formulir evaluasi bulanan.'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-navy/10 bg-white">
                <strong className="block text-navy font-semibold mb-1">Fokus Bulan Berikutnya:</strong>
                <p className="text-navy-600 leading-relaxed">
                  {reviewForm.nextFocus || 'Belum ditentukan pada formulir evaluasi.'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
