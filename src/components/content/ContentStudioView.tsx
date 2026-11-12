import React, { useState } from 'react';
import {
  AppData,
  MikroEpisode,
  GoCounselContent,
  ContentPipelineStatus,
  GoCounselFormat
} from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import { ExcelService } from '../../services/excelService';
import {
  Film,
  Share2,
  Upload,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  HelpCircle,
  Search,
  CheckSquare,
  FileText,
  Video,
  Layers,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface ContentStudioViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
}

export const ContentStudioView: React.FC<ContentStudioViewProps> = ({
  data,
  onUpdateData,
}) => {
  const [platform, setPlatform] = useState<'mikro' | 'gocounsel'>('mikro');

  // Mikro Thinking ID states
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedEpisode, setSelectedEpisode] = useState<MikroEpisode | null>(null);
  const [showQualityCheck, setShowQualityCheck] = useState(false);

  // GO.COUNSEL states
  const [selectedPilar, setSelectedPilar] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGcItem, setSelectedGcItem] = useState<GoCounselContent | null>(null);

  // Excel Importer states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importTarget, setImportTarget] = useState<'mikro' | 'gocounsel'>('gocounsel');
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Pipeline statuses array
  const pipelineStatuses: ContentPipelineStatus[] = [
    'Belum mulai',
    'Idea',
    'Research',
    'Outline',
    'Script/Draft',
    'Production',
    'Editing',
    'Scheduled',
    'Published',
  ];

  // Update Mikro episode status
  const handleUpdateMikroStatus = (
    episodeNo: string,
    field: 'videoStatus' | 'articleStatus',
    status: ContentPipelineStatus
  ) => {
    const updated = data.mikroEpisodes.map(ep =>
      ep.episodeNo === episodeNo ? { ...ep, [field]: status } : ep
    );
    onUpdateData({ ...data, mikroEpisodes: updated });
    if (selectedEpisode && selectedEpisode.episodeNo === episodeNo) {
      setSelectedEpisode({ ...selectedEpisode, [field]: status });
    }
  };

  // Update Mikro publication links
  const handleUpdateMikroLinks = (
    episodeNo: string,
    videoUrl?: string,
    articleUrl?: string
  ) => {
    const updated = data.mikroEpisodes.map(ep =>
      ep.episodeNo === episodeNo
        ? {
            ...ep,
            publicationUrl: videoUrl !== undefined ? videoUrl : ep.publicationUrl,
            articleUrl: articleUrl !== undefined ? articleUrl : ep.articleUrl,
          }
        : ep
    );
    onUpdateData({ ...data, mikroEpisodes: updated });
    if (selectedEpisode && selectedEpisode.episodeNo === episodeNo) {
      setSelectedEpisode({
        ...selectedEpisode,
        publicationUrl: videoUrl !== undefined ? videoUrl : selectedEpisode.publicationUrl,
        articleUrl: articleUrl !== undefined ? articleUrl : selectedEpisode.articleUrl,
      });
    }
  };

  // Toggle GO.COUNSEL publication status
  const handleToggleGcPublish = (day: number) => {
    const updated = data.goCounselCalendar.map(item =>
      item.day === day ? { ...item, isPublished: !item.isPublished } : item
    );
    onUpdateData({ ...data, goCounselCalendar: updated });
    if (selectedGcItem && selectedGcItem.day === day) {
      setSelectedGcItem({ ...selectedGcItem, isPublished: !selectedGcItem.isPublished });
    }
  };

  // Toggle GO.COUNSEL checklist item
  const handleToggleGcChecklist = (
    day: number,
    checkKey: 'contentReady' | 'captionReady' | 'scheduled'
  ) => {
    const updated = data.goCounselCalendar.map(item => {
      if (item.day === day) {
        return {
          ...item,
          readyChecklist: {
            ...item.readyChecklist,
            [checkKey]: !item.readyChecklist[checkKey],
          },
        };
      }
      return item;
    });
    onUpdateData({ ...data, goCounselCalendar: updated });
    if (selectedGcItem && selectedGcItem.day === day) {
      setSelectedGcItem({
        ...selectedGcItem,
        readyChecklist: {
          ...selectedGcItem.readyChecklist,
          [checkKey]: !selectedGcItem.readyChecklist[checkKey],
        },
      });
    }
  };

  // Import file handler
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      if (importTarget === 'gocounsel') {
        const parsed = await ExcelService.parseGoCounselFile(file);
        onUpdateData({ ...data, goCounselCalendar: parsed });
        setImportSuccess(`Berhasil mengimpor ${parsed.length} hari konten GO.COUNSEL.`);
      } else {
        const parsed = await ExcelService.parseMikroThinkingFile(file);
        onUpdateData({ ...data, mikroEpisodes: parsed });
        setImportSuccess(`Berhasil mengimpor ${parsed.length} episode Mikro Thinking ID.`);
      }
    } catch (err: any) {
      setImportError(err.message || 'Gagal membaca file Excel/CSV.');
    } finally {
      setImportLoading(false);
    }
  };

  // Filtered Mikro episodes
  const filteredMikro = data.mikroEpisodes.filter(ep => {
    if (selectedSeason === 'all') return true;
    return ep.season.toLowerCase().includes(selectedSeason.toLowerCase());
  });

  // Filtered GO.COUNSEL
  const filteredGc = data.goCounselCalendar.filter(item => {
    const matchPilar = selectedPilar === 'all' || item.pillar.toLowerCase().includes(selectedPilar.toLowerCase());
    const matchFormat = selectedFormat === 'all' || item.format.toLowerCase().includes(selectedFormat.toLowerCase());
    const matchQuery = !searchQuery || item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || item.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPilar && matchFormat && matchQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Platform Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            Content Studio — Dua Platform Editorial
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Pengelolaan mandiri untuk Mikro Thinking ID (YouTube & Artikel) dan GO.COUNSEL (30 Hari Bimbingan Remaja).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs
            tabs={[
              {
                id: 'mikro',
                label: 'Mikro Thinking ID',
                icon: <Film className="h-4 w-4" />,
                count: 18,
              },
              {
                id: 'gocounsel',
                label: 'GO.COUNSEL',
                icon: <Share2 className="h-4 w-4" />,
                count: 30,
              },
            ]}
            activeTab={platform}
            onChange={p => setPlatform(p as any)}
          />

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-navy/20 bg-white text-xs font-semibold text-navy hover:bg-navy/5 shadow-sm"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Impor Excel</span>
          </button>
        </div>
      </div>

      {/* ================= PLATFORM 1: MIKRO THINKING ID ================= */}
      {platform === 'mikro' && (
        <div className="space-y-6">
          {/* Channel Positioning & Stats Banner */}
          <div className="rounded-xl border border-navy/10 bg-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                  Tagline & Positioning
                </span>
                <Badge variant="cyan" size="sm">YouTube Panjang & Artikel</Badge>
              </div>
              <h3 className="text-base font-semibold text-navy font-serif">
                "Understanding ourselves, life, and meaning."
              </h3>
              <p className="text-xs text-navy-500 max-w-2xl leading-relaxed">
                Psikologi positif, perilaku manusia, storytelling hangat, dan refleksi nilai-nilai Al-Qur'an. Target awal: 2 video panjang & 2 artikel pendamping per bulan (Januari–September 2027).
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowQualityCheck(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-50 border border-cyan/40 text-xs font-semibold text-navy hover:bg-cyan-100"
              >
                <ShieldCheck className="h-4 w-4 text-navy" />
                <span>Editorial Quality Check</span>
              </button>
            </div>
          </div>

          {/* Season Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-navy-500 font-medium mr-1">Filter Season:</span>
            {[
              { id: 'all', label: 'Semua 18 Episode' },
              { id: 'season 1', label: 'Season 1: Memahami Diri & Kehidupan (Ep 01–06)' },
              { id: 'season 2', label: 'Season 2: Hidup Bersama Orang Lain (Ep 07–12)' },
              { id: 'season 3', label: 'Season 3: Menata Arah & Makna Hidup (Ep 13–18)' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap border transition-colors ${
                  selectedSeason === s.id
                    ? 'bg-navy text-white border-navy font-semibold'
                    : 'bg-white text-navy-600 border-navy/15 hover:bg-navy/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Episodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMikro.map(ep => {
              const isVideoDone = ep.videoStatus === 'Published';
              const isArticleDone = ep.articleStatus === 'Published';

              return (
                <Card
                  key={ep.episodeNo}
                  className="flex flex-col justify-between hover:border-navy/30 cursor-pointer"
                  onClick={() => setSelectedEpisode(ep)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan text-navy">
                          EP {ep.episodeNo}
                        </span>
                        <span className="text-[11px] text-navy-400 font-medium">
                          {ep.month}
                        </span>
                      </div>
                      <span className="text-[10px] text-navy-500 font-mono truncate max-w-[130px]">
                        {ep.season.split('—')[0]?.trim()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-navy leading-snug font-serif">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-navy-600 mt-1 italic leading-relaxed line-clamp-2">
                        "{ep.coreQuestion}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-navy/10 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-navy-500 text-[11px]">
                          <Video className="h-3 w-3 text-cyan-600" />
                          <span>Video YouTube:</span>
                        </span>
                        <Badge
                          variant={isVideoDone ? 'navy' : 'outline'}
                          size="sm"
                        >
                          {ep.videoStatus}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-navy-500 text-[11px]">
                          <FileText className="h-3 w-3 text-cyan-600" />
                          <span>Artikel Pendamping:</span>
                        </span>
                        <Badge
                          variant={isArticleDone ? 'navy' : 'outline'}
                          size="sm"
                        >
                          {ep.articleStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-[11px] text-navy-500">
                    <span className="truncate max-w-[180px]">
                      {ep.psychologicalLens || 'Psikologi Positif & Refleksi'}
                    </span>
                    <span className="text-navy font-semibold hover:underline">
                      Detail →
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= PLATFORM 2: GO.COUNSEL ================= */}
      {platform === 'gocounsel' && (
        <div className="space-y-6">
          {/* Header & Positioning */}
          <div className="rounded-xl border border-navy/10 bg-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-500">
                  GO.COUNSEL | 30-Day Content Plan
                </span>
                <Badge variant="cyan" size="sm">Instagram Edukasi BK</Badge>
              </div>
              <h3 className="text-base font-semibold text-navy font-serif">
                Bimbingan & Konseling untuk Siswa dan Remaja
              </h3>
              <p className="text-xs text-navy-500 max-w-2xl leading-relaxed">
                Ritme: Reels (Senin, Rabu, Jumat), Carousel (Selasa, Kamis), Story/Poll/Quiz (Sabtu & Minggu). Fokus pada Neuroeducation, motivasi, bakat minat, dan eksplorasi jurusan kuliah.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-navy bg-navy-50 px-3.5 py-2 rounded-lg border border-navy/10">
              <span className="font-semibold">Progres Publikasi:</span>
              <span className="font-mono text-cyan-700 font-bold">
                {data.goCounselCalendar.filter(c => c.isPublished).length} / {data.goCounselCalendar.length} Konten
              </span>
            </div>
          </div>

          {/* Filter & Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-navy/10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={selectedPilar}
                onChange={e => setSelectedPilar(e.target.value)}
                className="rounded-lg border border-navy/20 p-2 text-xs text-navy bg-white focus:outline-none"
              >
                <option value="all">Semua Pilar</option>
                <option value="Neuroeducation">Neuroeducation & Learning</option>
                <option value="Motivation">Motivation & Self-Development</option>
                <option value="Interest">Interest, Talent & Self-Discovery</option>
                <option value="Career">Career & Program Exploration</option>
              </select>

              <select
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value)}
                className="rounded-lg border border-navy/20 p-2 text-xs text-navy bg-white focus:outline-none"
              >
                <option value="all">Semua Format</option>
                <option value="Reels">Reels</option>
                <option value="Carousel">Carousel</option>
                <option value="Story">Story / Poll / Quiz</option>
              </select>
            </div>

            <div className="relative">
              <Search className="h-3.5 w-3.5 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik atau hook..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 rounded-lg border border-navy/20 pl-8 pr-3 py-1.5 text-xs text-navy placeholder:text-navy-400 focus:outline-none focus:border-cyan"
              />
            </div>
          </div>

          {/* 30-Day Content Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGc.map(item => {
              return (
                <Card
                  key={item.day}
                  className={`flex flex-col justify-between hover:border-navy/30 cursor-pointer ${
                    item.isPublished ? 'bg-cyan-50/20' : 'bg-white'
                  }`}
                  onClick={() => setSelectedGcItem(item)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan text-navy">
                          Hari {item.day}
                        </span>
                        <span className="text-[11px] text-navy-400 font-medium">
                          {item.dayName}
                        </span>
                      </div>
                      <Badge
                        variant={item.format === 'Reels' ? 'navy' : 'outline'}
                        size="sm"
                      >
                        {item.format}
                      </Badge>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">
                        {item.pillar}
                      </span>
                      <h4 className="text-sm font-bold text-navy leading-snug">
                        {item.topic}
                      </h4>
                      <p className="text-xs text-navy-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.hook}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          item.isPublished ? 'bg-navy' : 'bg-navy-200'
                        }`}
                      />
                      <span className="text-[11px] text-navy-500">
                        {item.isPublished ? 'Sudah Terbit' : 'Belum Terbit'}
                      </span>
                    </div>

                    <span className="text-xs text-navy font-semibold hover:underline">
                      Lihat Caption →
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MODAL: MIKRO EPISODE DETAIL ================= */}
      {selectedEpisode && (
        <Modal
          isOpen={Boolean(selectedEpisode)}
          onClose={() => setSelectedEpisode(null)}
          title={`Episode ${selectedEpisode.episodeNo}: ${selectedEpisode.title}`}
          subtitle={`${selectedEpisode.month} • ${selectedEpisode.season}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-navy">
            {/* Core Question & Bahasan */}
            <div className="rounded-lg bg-cyan-50/60 p-4 border border-cyan/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Pertanyaan Inti
              </span>
              <p className="text-sm font-serif font-bold text-navy mb-2">
                "{selectedEpisode.coreQuestion}"
              </p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                Arah Bahasan
              </span>
              <p className="text-xs text-navy-700 leading-relaxed">
                {selectedEpisode.direction}
              </p>
              {selectedEpisode.psychologicalLens && (
                <div className="mt-2 pt-2 border-t border-cyan-200/50 flex items-center gap-2">
                  <Tag className="h-3 w-3 text-cyan-700" />
                  <span className="text-[11px] text-navy-600">
                    <strong>Lensa Psikologi:</strong> {selectedEpisode.psychologicalLens}
                  </span>
                </div>
              )}
            </div>

            {/* Companion Article */}
            <div className="rounded-lg border border-navy/15 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500">
                  Artikel Pendamping (Karya Mandiri)
                </span>
                <span className="text-[10px] text-navy-400">Terbit Selasa minggu ke-2/4</span>
              </div>
              <h5 className="font-semibold text-navy text-xs">
                {selectedEpisode.articleTitle}
              </h5>
              <p className="text-[11px] text-navy-500 italic">
                Artikel bukan sekadar salinan transkrip video, melainkan eksplorasi gagasan yang lebih dalam.
              </p>
            </div>

            {/* Status Pipeline Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-navy-600">
                  Status Produksi Video YouTube:
                </label>
                <select
                  value={selectedEpisode.videoStatus}
                  onChange={e =>
                    handleUpdateMikroStatus(
                      selectedEpisode.episodeNo,
                      'videoStatus',
                      e.target.value as any
                    )
                  }
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
                >
                  {pipelineStatuses.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-navy-600">
                  Status Artikel Pendamping:
                </label>
                <select
                  value={selectedEpisode.articleStatus}
                  onChange={e =>
                    handleUpdateMikroStatus(
                      selectedEpisode.episodeNo,
                      'articleStatus',
                      e.target.value as any
                    )
                  }
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
                >
                  {pipelineStatuses.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Publication Links Inputs */}
            <div className="space-y-2 pt-2 border-t border-navy/10">
              <label className="block text-[11px] font-semibold text-navy-600">
                Tautan Hasil Publikasi:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="URL Video YouTube (bila sudah terbit)..."
                  value={selectedEpisode.publicationUrl || ''}
                  onChange={e =>
                    handleUpdateMikroLinks(selectedEpisode.episodeNo, e.target.value)
                  }
                  className="w-full rounded border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
                <input
                  type="text"
                  placeholder="URL Artikel Publikasi (bila sudah terbit)..."
                  value={selectedEpisode.articleUrl || ''}
                  onChange={e =>
                    handleUpdateMikroLinks(selectedEpisode.episodeNo, undefined, e.target.value)
                  }
                  className="w-full rounded border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= MODAL: GO.COUNSEL DETAIL ================= */}
      {selectedGcItem && (
        <Modal
          isOpen={Boolean(selectedGcItem)}
          onClose={() => setSelectedGcItem(null)}
          title={`Hari ke-${selectedGcItem.day}: ${selectedGcItem.topic}`}
          subtitle={`${selectedGcItem.dayName} • Format: ${selectedGcItem.format} • ${selectedGcItem.pillar}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs text-navy">
            {/* Hook & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-navy-50 p-3 border border-navy/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                  Hook / Ide Materi
                </span>
                <p className="text-xs text-navy-800 leading-relaxed">
                  {selectedGcItem.hook}
                </p>
              </div>
              <div className="rounded-lg bg-cyan-50/50 p-3 border border-cyan/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                  Call to Action (CTA)
                </span>
                <p className="text-xs text-navy-800 leading-relaxed">
                  {selectedGcItem.cta}
                </p>
              </div>
            </div>

            {/* Instagram Caption Bank */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-navy-700 block">
                Caption Instagram Siap Pakai:
              </span>
              <div className="rounded-lg border border-navy/15 bg-white p-3.5 text-xs text-navy leading-relaxed font-sans whitespace-pre-wrap select-all">
                {selectedGcItem.caption}
              </div>
            </div>

            {/* 5 Hashtags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedGcItem.hashtags.map((ht, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 text-[11px] font-mono border border-cyan/30"
                >
                  {ht}
                </span>
              ))}
            </div>

            {/* Checklist Kesiapan */}
            <div className="pt-3 border-t border-navy/10 space-y-2">
              <span className="text-[11px] font-bold text-navy-700 block">
                Checklist Kesiapan Konten:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2 rounded border border-navy/15 hover:bg-navy/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGcItem.readyChecklist.contentReady}
                    onChange={() => handleToggleGcChecklist(selectedGcItem.day, 'contentReady')}
                    className="accent-navy"
                  />
                  <span className="text-xs">Visual / Video Siap</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-navy/15 hover:bg-navy/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGcItem.readyChecklist.captionReady}
                    onChange={() => handleToggleGcChecklist(selectedGcItem.day, 'captionReady')}
                    className="accent-navy"
                  />
                  <span className="text-xs">Caption Siap</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded border border-navy/15 hover:bg-navy/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGcItem.readyChecklist.scheduled}
                    onChange={() => handleToggleGcChecklist(selectedGcItem.day, 'scheduled')}
                    className="accent-navy"
                  />
                  <span className="text-xs">Terjadwal di Platform</span>
                </label>
              </div>
            </div>

            {/* Publish Toggle Button */}
            <div className="pt-3 border-t border-navy/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy-600">Status Publikasi:</span>
                <Badge variant={selectedGcItem.isPublished ? 'navy' : 'outline'}>
                  {selectedGcItem.isPublished ? 'Sudah Dipublikasikan' : 'Belum Dipublikasikan'}
                </Badge>
              </div>

              <button
                type="button"
                onClick={() => handleToggleGcPublish(selectedGcItem.day)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  selectedGcItem.isPublished
                    ? 'bg-navy/10 text-navy hover:bg-navy/20'
                    : 'bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400'
                }`}
              >
                {selectedGcItem.isPublished ? 'Batalkan Tanda Terbit' : 'Tandai Sudah Dipublikasikan'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= MODAL: EDITORIAL QUALITY CHECK ================= */}
      {showQualityCheck && (
        <Modal
          isOpen={showQualityCheck}
          onClose={() => setShowQualityCheck(false)}
          title="Editorial Quality Check"
          subtitle="Pemeriksaan ketepatan sumber, psikologi, dan etika sebelum publikasi."
          maxWidth="lg"
        >
          <div className="space-y-3 text-xs text-navy">
            {[
              {
                area: 'Verifikasi Sumber',
                q: 'Apakah sumber dapat dibuka, penulis/lembaga jelas, tanggal dan rujukan diperiksa langsung?',
              },
              {
                area: 'Akurasi Ringkasan',
                q: 'Apakah ringkasan tidak mengubah maksud naskah/kisah sumber ilmiah yang dirujuk?',
              },
              {
                area: 'Bukti vs Opini',
                q: 'Apakah fakta penelitian, opini penulis, dan refleksi pribadi dibedakan secara eksplisit?',
              },
              {
                area: 'Pencegahan Neuromyths',
                q: 'Apakah tidak ada klaim otak kiri/kanan berlebihan atau generalisasi korelasi menjadi sebab-akibat?',
              },
              {
                area: 'Nada & Gaya Bahasa',
                q: 'Apakah gaya bahasa hangat, reflektif, tidak menggurui, dan memberikan ruang bagi pendengar?',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-navy/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500">
                  {item.area}
                </span>
                <p className="text-xs text-navy leading-relaxed font-medium">
                  {item.q}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ================= MODAL: IMPORT EXCEL / CSV ================= */}
      {showImportModal && (
        <Modal
          isOpen={showImportModal}
          onClose={() => {
            setShowImportModal(false);
            setImportError(null);
            setImportSuccess(null);
          }}
          title="Impor Kalender Excel / CSV"
          subtitle="Muat ulang atau perbarui data dari file spreadsheet eksternal."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs text-navy">
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Pilih Target Modul:
              </label>
              <select
                value={importTarget}
                onChange={e => setImportTarget(e.target.value as any)}
                className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
              >
                <option value="gocounsel">Kalender 30 Hari GO.COUNSEL</option>
                <option value="mikro">Kalender 18 Episode Mikro Thinking ID</option>
              </select>
            </div>

            <div className="rounded-xl border-2 border-dashed border-navy/20 p-6 text-center hover:border-cyan transition-colors bg-navy-50/30">
              <Upload className="h-8 w-8 text-navy-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-navy">
                Pilih file <strong>.xlsx</strong> atau <strong>.csv</strong>
              </p>
              <p className="text-[11px] text-navy-400 mt-1">
                Sistem akan memvalidasi header kolom secara otomatis.
              </p>
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileImport}
                className="mt-4 block w-full text-xs text-navy file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan file:text-navy hover:file:bg-cyan-400 cursor-pointer"
              />
            </div>

            {importLoading && (
              <p className="text-xs text-navy-500 text-center animate-pulse">
                Memproses dan memvalidasi file...
              </p>
            )}

            {importError && (
              <div className="rounded-lg bg-navy-50 border border-navy/20 p-3 text-xs text-navy">
                <span className="font-bold">Error:</span> {importError}
              </div>
            )}

            {importSuccess && (
              <div className="rounded-lg bg-cyan-50 border border-cyan/40 p-3 text-xs text-navy flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-700" />
                <span>{importSuccess}</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
