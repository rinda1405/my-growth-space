import React, { useState } from 'react';
import {
  AppData,
  NeuroModule,
  ResearchSkill,
  LiteratureReference,
  LiteratureCategory,
  ModuleStatus,
  SkillProficiency
} from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Tabs } from '../common/Tabs';
import { Modal } from '../common/Modal';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Star,
  Plus,
  ExternalLink,
  Search,
  Bookmark,
  ShieldCheck,
  AlertOctagon,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ResearchAcademyViewProps {
  data: AppData;
  onUpdateData: (newData: AppData) => void;
  onNavigateToPortfolio?: () => void;
}

export const ResearchAcademyView: React.FC<ResearchAcademyViewProps> = ({
  data,
  onUpdateData,
  onNavigateToPortfolio,
}) => {
  const [activeTab, setActiveTab] = useState<'neuro' | 'skills' | 'library' | 'rigor'>('neuro');

  // Neuro module detail modal
  const [selectedModule, setSelectedModule] = useState<NeuroModule | null>(null);

  // Literature search & filters
  const [litSearch, setLitSearch] = useState('');
  const [litCategory, setLitCategory] = useState<string>('all');
  const [showAddLitModal, setShowAddLitModal] = useState(false);

  // Add reference form states
  const [newLit, setNewLit] = useState<Omit<LiteratureReference, 'id' | 'dateAdded'>>({
    title: '',
    authors: '',
    year: 2027,
    journal: '',
    doiOrUrl: '',
    topicCategory: 'Neuroeducation',
    methodology: '',
    keyFindings: '',
    criticalNotes: '',
    readingStatus: 'To Read',
  });

  // Update Neuro module
  const handleUpdateModule = (updated: NeuroModule) => {
    const newModules = data.neuroModules.map(m =>
      m.month === updated.month ? updated : m
    );
    onUpdateData({ ...data, neuroModules: newModules });
    setSelectedModule(updated);
  };

  // Toggle skill proficiency
  const handleToggleSkillStatus = (skillId: string) => {
    const current = data.researchSkills.find(s => s.id === skillId);
    if (!current) return;

    const nextStatus: SkillProficiency =
      current.status === 'Not Started'
        ? 'In Progress'
        : current.status === 'In Progress'
        ? 'Mastered'
        : 'Not Started';

    const updated = data.researchSkills.map(s =>
      s.id === skillId ? { ...s, status: nextStatus } : s
    );
    onUpdateData({ ...data, researchSkills: updated });
  };

  // Add new literature
  const handleAddLiterature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLit.title.trim()) return;

    const newRef: LiteratureReference = {
      ...newLit,
      id: `lit-${Date.now()}`,
      dateAdded: new Date().toISOString().slice(0, 10),
    };

    onUpdateData({
      ...data,
      literature: [newRef, ...data.literature],
    });

    setShowAddLitModal(false);
    setNewLit({
      title: '',
      authors: '',
      year: 2027,
      journal: '',
      doiOrUrl: '',
      topicCategory: 'Neuroeducation',
      methodology: '',
      keyFindings: '',
      criticalNotes: '',
      readingStatus: 'To Read',
    });
  };

  // Toggle literature reading status
  const handleToggleReadingStatus = (refId: string) => {
    const updated = data.literature.map(lit => {
      if (lit.id === refId) {
        const next: 'To Read' | 'Reading' | 'Completed' =
          lit.readingStatus === 'To Read'
            ? 'Reading'
            : lit.readingStatus === 'Reading'
            ? 'Completed'
            : 'To Read';
        return { ...lit, readingStatus: next };
      }
      return lit;
    });
    onUpdateData({ ...data, literature: updated });
  };

  // Filtered literature
  const filteredLit = data.literature.filter(l => {
    const matchCat = litCategory === 'all' || l.topicCategory === litCategory;
    const matchQuery =
      !litSearch ||
      l.title.toLowerCase().includes(litSearch.toLowerCase()) ||
      l.authors.toLowerCase().includes(litSearch.toLowerCase()) ||
      l.keyFindings.toLowerCase().includes(litSearch.toLowerCase());
    return matchCat && matchQuery;
  });

  // Calculations
  const completedNeuroCount = data.neuroModules.filter(m => m.status === 'Completed').length;
  const inProgressNeuroCount = data.neuroModules.filter(m => m.status === 'In Progress').length;
  const totalStudyHours = data.neuroModules.reduce((acc, m) => acc + (m.studyHours || 0), 0);
  const masteredSkillsCount = data.researchSkills.filter(s => s.status === 'Mastered').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-navy font-serif tracking-tight">
            Research Academy — Spesialisasi & Jalur RA
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Neuroeducation sebagai fokus keahlian akademik utama, ditopang 18 kompetensi Research Assistant untuk persiapan S2.
          </p>
        </div>

        <Tabs
          tabs={[
            {
              id: 'neuro',
              label: 'Neuroeducation (12 Bulan)',
              icon: <GraduationCap className="h-4 w-4" />,
              count: 12,
            },
            {
              id: 'skills',
              label: 'Skill Research Assistant',
              icon: <BookOpen className="h-4 w-4" />,
              count: 18,
            },
            {
              id: 'library',
              label: 'Literature Library',
              icon: <Bookmark className="h-4 w-4" />,
              count: data.literature.length,
            },
            {
              id: 'rigor',
              label: 'Academic Rigor & Etika',
              icon: <ShieldCheck className="h-4 w-4" />,
            },
          ]}
          activeTab={activeTab}
          onChange={tabId => setActiveTab(tabId as any)}
        />
      </div>

      {/* Summary Stat Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-navy/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
            Progres 12 Bulan
          </span>
          <span className="text-xl font-bold text-navy font-serif">
            {completedNeuroCount} Selesai • {inProgressNeuroCount} Berjalan
          </span>
          <p className="text-[11px] text-navy-400 mt-1">Roadmap Neuroeducation</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-navy/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
            Total Jam Belajar Aktual
          </span>
          <span className="text-xl font-bold text-navy">
            {totalStudyHours} Jam
          </span>
          <p className="text-[11px] text-navy-400 mt-1">Akumulasi catatan studi mandiri</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-navy/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
            Kompetensi RA Dikuasai
          </span>
          <span className="text-xl font-bold text-navy">
            {masteredSkillsCount} / 18 Skill
          </span>
          <p className="text-[11px] text-navy-400 mt-1">Terhubung ke output bulanan</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-navy/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
            Perpustakaan Referensi
          </span>
          <span className="text-xl font-bold text-navy">
            {data.literature.length} Paper / Buku
          </span>
          <p className="text-[11px] text-navy-400 mt-1">
            {data.literature.filter(l => l.readingStatus === 'Completed').length} telah ditelaah
          </p>
        </div>
      </div>

      {/* ================= TAB 1: NEUROEDUCATION 12 BULAN ================= */}
      {activeTab === 'neuro' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.neuroModules.map(mod => {
              const isCompleted = mod.status === 'Completed';
              const isInProgress = mod.status === 'In Progress';

              return (
                <Card
                  key={mod.month}
                  variant={isCompleted ? 'default' : isInProgress ? 'cyan' : 'default'}
                  className="flex flex-col justify-between hover:border-navy/30 cursor-pointer"
                  onClick={() => setSelectedModule(mod)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan text-navy">
                        BULAN {mod.month}
                      </span>
                      <Badge
                        variant={isCompleted ? 'navy' : isInProgress ? 'cyan' : 'outline'}
                        size="sm"
                      >
                        {mod.status}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-navy font-serif leading-snug">
                        {mod.title}
                      </h4>
                      <p className="text-[11px] text-navy-500 mt-1 line-clamp-2">
                        {mod.topics[0]}, {mod.topics[1]}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-navy/10 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-navy-400 block">
                        Target Output Kunci:
                      </span>
                      <p className="text-xs text-navy-800 font-medium line-clamp-2">
                        • {mod.targetOutputs[0]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy/10 flex items-center justify-between text-xs text-navy-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-600" />
                      <span>{mod.studyHours} Jam</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= mod.understandingLevel
                              ? 'text-cyan-600 fill-cyan'
                              : 'text-navy-200'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-semibold text-navy hover:underline">
                      Detail →
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: RESEARCH ASSISTANT SKILLS PATH ================= */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-navy-50 border border-navy/10 text-xs text-navy leading-relaxed">
            <strong>Keterhubungan Jalur:</strong> 18 keahlian Research Assistant ini tidak diajarkan secara terpisah, melainkan terikat langsung dengan tugas nyata pada setiap bulan di Neuroeducation Learning Path.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.researchSkills.map(skill => {
              const isMastered = skill.status === 'Mastered';
              const isInProgress = skill.status === 'In Progress';

              return (
                <div
                  key={skill.id}
                  className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                    isMastered
                      ? 'bg-cyan-50/40 border-cyan/40 text-navy'
                      : 'bg-white border-navy/10 text-navy hover:border-navy/20'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-navy-100 text-navy">
                        #{skill.number}
                      </span>
                      <h4 className="text-xs font-bold text-navy">{skill.name}</h4>
                      <span className="text-[10px] text-navy-400 font-medium">
                        Bulan {skill.linkedMonth}
                      </span>
                    </div>

                    <p className="text-xs text-navy-600 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="pt-2 text-[11px] text-navy-500 flex items-center gap-1.5">
                      <FileText className="h-3 w-3 text-cyan-600 flex-shrink-0" />
                      <span className="truncate">
                        <strong>Output Latihan:</strong> {skill.practiceOutput}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSkillStatus(skill.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isMastered
                        ? 'bg-navy text-white'
                        : isInProgress
                        ? 'bg-cyan text-navy border border-cyan-400'
                        : 'bg-white border border-navy/20 text-navy-600 hover:bg-navy/5'
                    }`}
                  >
                    {skill.status}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: LITERATURE & REFERENCE LIBRARY ================= */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-navy/10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={litCategory}
                onChange={e => setLitCategory(e.target.value)}
                className="rounded-lg border border-navy/20 p-2 text-xs text-navy bg-white focus:outline-none"
              >
                <option value="all">Semua Kategori (8)</option>
                <option value="Neuroscience">Neuroscience</option>
                <option value="Neuroeducation">Neuroeducation</option>
                <option value="Cognitive Psychology">Cognitive Psychology</option>
                <option value="Adolescent Development">Adolescent Development</option>
                <option value="Learning & Memory">Learning & Memory</option>
                <option value="Emotion & Motivation">Emotion & Motivation</option>
                <option value="Educational Psychology">Educational Psychology</option>
                <option value="Research Methodology">Research Methodology</option>
              </select>

              <div className="relative">
                <Search className="h-3.5 w-3.5 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari judul, penulis, kata kunci..."
                  value={litSearch}
                  onChange={e => setLitSearch(e.target.value)}
                  className="w-full sm:w-60 rounded-lg border border-navy/20 pl-8 pr-3 py-1.5 text-xs text-navy focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddLitModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan text-navy border border-cyan-400 text-xs font-semibold hover:bg-cyan-400 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Referensi Ilmiah</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredLit.map(lit => (
              <Card key={lit.id} className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="cyan" size="sm">{lit.topicCategory}</Badge>
                      <span className="text-[11px] text-navy-400 font-mono font-medium">
                        {lit.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-navy font-serif">
                      {lit.title}
                    </h4>
                    <p className="text-xs text-navy-600 italic">
                      {lit.authors} — <span className="font-normal">{lit.journal}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleReadingStatus(lit.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        lit.readingStatus === 'Completed'
                          ? 'bg-navy text-white'
                          : lit.readingStatus === 'Reading'
                          ? 'bg-cyan text-navy'
                          : 'bg-navy/5 text-navy-600 border border-navy/15'
                      }`}
                    >
                      {lit.readingStatus === 'Completed'
                        ? 'Selesai Dibaca'
                        : lit.readingStatus === 'Reading'
                        ? 'Sedang Dibaca'
                        : 'Belum Dibaca'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-navy/10 text-xs text-navy">
                  <div className="rounded-lg bg-navy-50/50 p-3 border border-navy/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                      Temuan Utama & Metodologi ({lit.methodology})
                    </span>
                    <p className="leading-relaxed text-navy-800">{lit.keyFindings}</p>
                  </div>

                  <div className="rounded-lg bg-cyan-50/40 p-3 border border-cyan/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block mb-1">
                      Catatan Kritis & Batasan Penelitian
                    </span>
                    <p className="leading-relaxed text-navy-800">{lit.criticalNotes}</p>
                  </div>
                </div>

                {lit.doiOrUrl && (
                  <div className="pt-1 flex items-center justify-end">
                    <a
                      href={lit.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-navy hover:underline flex items-center gap-1"
                    >
                      <span>Buka DOI / Sumber Asli</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: ACADEMIC RIGOR GUIDELINES ================= */}
      {activeTab === 'rigor' && (
        <Card className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-100 text-navy">
              <ShieldCheck className="h-6 w-6 text-navy" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy font-serif">
                Prinsip Academic Rigor & Pencegahan Neuromyths
              </h3>
              <p className="text-xs text-navy-600 mt-1 max-w-3xl leading-relaxed">
                Neuroeducation menjembatani temuan laboratorium dan kenyataan sekolah. Ketelitian ilmiah menuntut pemisahan tegas antara bukti empiris dan asumsi populer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-navy">
            {[
              {
                title: '1. Bedakan Level Bukti Ilmiah',
                desc: 'Selalu bedakan antara temuan yang sudah mapan (well-established), penelitian yang masih berkembang (emerging), interpretasi teoretis, dan implikasi pedagogis di lapangan.',
              },
              {
                title: '2. Tolak Neuromyths Sebagai Fakta',
                desc: 'Jangan pernah mengajarkan mitos otak kiri/kanan, gaya belajar VAK kaku, atau klaim "otak hanya dipakai 10%" sebagai fakta sains.',
              },
              {
                title: '3. Korelasi Bukan Berarti Kausalitas',
                desc: 'Hubungan asosiasi statistik antara pola aktivitas saraf dan perilaku belajar tidak serta merta membuktikan hubungan sebab-akibat.',
              },
              {
                title: '4. Hindari Reduksionisme Saraf Berlebihan',
                desc: 'Jangan menyederhanakan fungsi kompleks emosi dan motivasi hanya sebagai "hormon dopamin" atau "amigdala yang membajak" tanpa melihat konteks psikologis dan sosial.',
              },
              {
                title: '5. Ruang untuk Batasan Penelitian',
                desc: 'Setiap catatan literatur harus secara eksplisit mendokumentasikan batasan ukuran sampel, demografi responden, dan batasan validitas ekologis.',
              },
              {
                title: '6. Integritas Sitasi & Penelusuran',
                desc: 'Setiap kesimpulan harus memiliki sitasi primer APA 7 yang dapat dilacak ke jurnal aslinya, bukan sekadar mengutip kutipan sekunder.',
              },
            ].map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-navy/15 bg-navy-50/30 space-y-1.5">
                <h4 className="font-bold text-xs text-navy">{rule.title}</h4>
                <p className="text-navy-600 leading-relaxed text-[11px]">{rule.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ================= MODAL: DETAIL MODUL NEUROEDUCATION ================= */}
      {selectedModule && (
        <Modal
          isOpen={Boolean(selectedModule)}
          onClose={() => setSelectedModule(null)}
          title={`Bulan ${selectedModule.month}: ${selectedModule.title}`}
          subtitle="Modul Pembelajaran & Target Output Spesialisasi"
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-navy">
            {/* Status & Jam Belajar Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-navy-50 border border-navy/10">
              <div>
                <label className="block text-[11px] font-semibold text-navy-600 mb-1">
                  Status Modul:
                </label>
                <select
                  value={selectedModule.status}
                  onChange={e =>
                    handleUpdateModule({
                      ...selectedModule,
                      status: e.target.value as ModuleStatus,
                    })
                  }
                  className="w-full rounded border border-navy/20 p-1.5 text-xs bg-white text-navy focus:outline-none"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-navy-600 mb-1">
                  Jam Belajar Aktual:
                </label>
                <input
                  type="number"
                  min="0"
                  value={selectedModule.studyHours}
                  onChange={e =>
                    handleUpdateModule({
                      ...selectedModule,
                      studyHours: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full rounded border border-navy/20 p-1.5 text-xs text-navy bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-navy-600 mb-1">
                  Tingkat Pemahaman (1-5):
                </label>
                <div className="flex items-center gap-1 mt-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        handleUpdateModule({
                          ...selectedModule,
                          understandingLevel: star,
                        })
                      }
                      className="p-0.5 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          star <= selectedModule.understandingLevel
                            ? 'text-cyan-600 fill-cyan'
                            : 'text-navy-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Topics Covered */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                Materi Belajar:
              </span>
              <ul className="space-y-1.5 pl-2">
                {selectedModule.topics.map((top, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-navy-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 mt-1.5 flex-shrink-0" />
                    <span>{top}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Outputs Checklist */}
            <div className="space-y-2 pt-2 border-t border-navy/10">
              <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                Target Output Karya:
              </span>
              <div className="space-y-2">
                {selectedModule.targetOutputs.map((out, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-navy/15 bg-white flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-navy">{out}</span>
                    <Badge variant="cyan" size="sm">Hasil Nyata</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                Catatan Pembelajaran Pribadi:
              </label>
              <textarea
                value={selectedModule.notes}
                onChange={e =>
                  handleUpdateModule({ ...selectedModule, notes: e.target.value })
                }
                rows={3}
                placeholder="Tuliskan wawasan baru, kebingungan, atau rencana tindak lanjut..."
                className="w-full rounded-lg border border-navy/20 p-2.5 text-xs text-navy focus:outline-none focus:border-cyan bg-white"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* ================= MODAL: TAMBAH REFERENSI LITERATUR ================= */}
      {showAddLitModal && (
        <Modal
          isOpen={showAddLitModal}
          onClose={() => setShowAddLitModal(false)}
          title="Tambah Referensi Ilmiah Baru"
          subtitle="Simpan paper, buku, atau telaah kritis ke dalam Reference Library."
          maxWidth="lg"
        >
          <form onSubmit={handleAddLiterature} className="space-y-4 text-xs text-navy">
            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Judul Artikel / Buku *
              </label>
              <input
                type="text"
                required
                value={newLit.title}
                onChange={e => setNewLit({ ...newLit, title: e.target.value })}
                placeholder="Contoh: Bridges over troubled waters..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Penulis (Authors) *
                </label>
                <input
                  type="text"
                  required
                  value={newLit.authors}
                  onChange={e => setNewLit({ ...newLit, authors: e.target.value })}
                  placeholder="Contoh: Ansari, D., & Coch, D."
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Tahun Terbit *
                </label>
                <input
                  type="number"
                  required
                  value={newLit.year}
                  onChange={e => setNewLit({ ...newLit, year: parseInt(e.target.value, 10) || 2027 })}
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Jurnal / Penerbit
                </label>
                <input
                  type="text"
                  value={newLit.journal}
                  onChange={e => setNewLit({ ...newLit, journal: e.target.value })}
                  placeholder="Contoh: Trends in Cognitive Sciences"
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label className="block font-semibold text-navy-700 mb-1">
                  Kategori
                </label>
                <select
                  value={newLit.topicCategory}
                  onChange={e => setNewLit({ ...newLit, topicCategory: e.target.value as LiteratureCategory })}
                  className="w-full rounded-lg border border-navy/20 p-2 text-xs bg-white text-navy focus:outline-none"
                >
                  <option value="Neuroscience">Neuroscience</option>
                  <option value="Neuroeducation">Neuroeducation</option>
                  <option value="Cognitive Psychology">Cognitive Psychology</option>
                  <option value="Adolescent Development">Adolescent Development</option>
                  <option value="Learning & Memory">Learning & Memory</option>
                  <option value="Emotion & Motivation">Emotion & Motivation</option>
                  <option value="Educational Psychology">Educational Psychology</option>
                  <option value="Research Methodology">Research Methodology</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                DOI atau URL Paper
              </label>
              <input
                type="text"
                value={newLit.doiOrUrl}
                onChange={e => setNewLit({ ...newLit, doiOrUrl: e.target.value })}
                placeholder="https://doi.org/10.1016/..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Metodologi & Temuan Kunci
              </label>
              <textarea
                value={newLit.keyFindings}
                onChange={e => setNewLit({ ...newLit, keyFindings: e.target.value })}
                rows={2}
                placeholder="Desain penelitian dan temuan signifikan..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div>
              <label className="block font-semibold text-navy-700 mb-1">
                Catatan Kritis & Batasan (Critical Appraisal)
              </label>
              <textarea
                value={newLit.criticalNotes}
                onChange={e => setNewLit({ ...newLit, criticalNotes: e.target.value })}
                rows={2}
                placeholder="Keterbatasan penelitian atau catatan penting..."
                className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:outline-none focus:border-cyan"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
              <button
                type="button"
                onClick={() => setShowAddLitModal(false)}
                className="px-4 py-2 text-xs font-medium text-navy-600 hover:text-navy hover:bg-navy/5 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400"
              >
                Simpan Referensi
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
