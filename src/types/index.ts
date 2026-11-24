// Master Types for My Growth Space – Personal Operating System 2027

export type ScheduleCategory =
  | 'spiritual'
  | 'reflection'
  | 'work'
  | 'rest'
  | 'learning'
  | 'counseling'
  | 'family'
  | 'relaxation'
  | 'content'
  | 'transition';

export interface DailyScheduleItem {
  id: string;
  timeStart: string;
  timeEnd: string;
  activity: string;
  isFixed: boolean;
  isOptional: boolean;
  isRest: boolean;
  category: ScheduleCategory;
  notes?: string;
  outputNote?: string;
}

export interface WeeklyFocus {
  dayOfWeek: number; // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  dayName: string;
  focusTitle: string;
  timeSlot?: string;
  primaryFocus: string;
  isOptional?: boolean;
  limits?: string;
}

export interface ScheduleConflict {
  id: string;
  slotTime: string; // "18.30–19.30"
  targetName: string; // "Personal Development / Proposed Focus"
  conflictReason: string;
  status: 'proposed' | 'confirmed' | 'disabled';
  customTimeSlot?: string;
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  completedItemIds: string[];
  skippedItemIds: string[];
  notes?: string;
}

export interface QuickCaptureItem {
  id: string;
  text: string;
  category: 'idea' | 'task' | 'note';
  targetModule?: string;
  createdAt: string;
  isProcessed: boolean;
}

export type ContentPipelineStatus = 
  | 'Belum mulai'
  | 'Idea'
  | 'Research'
  | 'Outline'
  | 'Script/Draft'
  | 'Production'
  | 'Editing'
  | 'Scheduled'
  | 'Published';

export interface MikroEpisode {
  episodeNo: string; // "01".."18"
  season: string;
  month: string;
  title: string;
  coreQuestion: string;
  direction: string;
  psychologicalLens: string;
  articleTitle: string;
  researchOutlineDate: string;
  articlePublishDate: string;
  videoPublishDate: string;
  videoStatus: ContentPipelineStatus;
  articleStatus: ContentPipelineStatus;
  notes: string;
  referenceLinks: string[];
  publicationUrl?: string;
  articleUrl?: string;
}

export type GoCounselFormat = 'Reels' | 'Carousel' | 'Story/Quiz' | 'Story/Poll' | 'Story/Question Box' | 'Story';

export interface GoCounselContent {
  day: number; // 1-30
  date: string; // formatted or serial
  dayName: string;
  pillar: string;
  format: GoCounselFormat;
  topic: string;
  hook: string;
  cta: string;
  caption: string;
  hashtags: string[];
  isPublished: boolean;
  publishedUrl?: string;
  readyChecklist: {
    contentReady: boolean;
    captionReady: boolean;
    scheduled: boolean;
  };
  notes?: string;
}

export type ModuleStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface NeuroModule {
  month: number; // 1-12
  title: string;
  topics: string[];
  targetOutputs: string[];
  status: ModuleStatus;
  studyHours: number;
  understandingLevel: number; // 1-5
  notes: string;
  references: string[];
  proofLinks: string[];
}

export type SkillProficiency = 'Not Started' | 'In Progress' | 'Mastered';

export interface ResearchSkill {
  id: string;
  number: number;
  name: string;
  linkedMonth: number;
  description: string;
  status: SkillProficiency;
  practiceOutput: string;
}

export type LiteratureCategory = 
  | 'Neuroscience'
  | 'Neuroeducation'
  | 'Cognitive Psychology'
  | 'Adolescent Development'
  | 'Learning & Memory'
  | 'Emotion & Motivation'
  | 'Educational Psychology'
  | 'Research Methodology';

export interface LiteratureReference {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  doiOrUrl: string;
  topicCategory: LiteratureCategory;
  methodology: string;
  keyFindings: string;
  criticalNotes: string;
  readingStatus: 'To Read' | 'Reading' | 'Completed';
  dateAdded: string;
}

export type ProfessionalCategory = 
  | 'Volunteering'
  | 'Public Speaking'
  | 'Webinar & Seminar'
  | 'Networking'
  | 'Research Collaboration'
  | 'RA Opportunities';

export type ProfessionalStatus = 
  | 'Interested'
  | 'To Apply'
  | 'Applied'
  | 'Accepted'
  | 'In Progress'
  | 'Completed'
  | 'Not Selected'
  | 'Follow-up Needed';

export interface ProfessionalActivity {
  id: string;
  title: string;
  category: ProfessionalCategory;
  organization: string;
  date: string;
  role: string;
  locationOrFormat: string;
  status: ProfessionalStatus;
  contactUrl: string;
  outcomes: string;
  proofUrl: string;
  followUp: string;
  personalNotes: string;
}

export interface ProfessionalConnection {
  id: string;
  name: string;
  organization: string;
  expertise: string;
  context: string;
  dateMet: string;
  contactUrl: string;
  interactionNotes: string;
  followUpPlan: string;
}

export type PortfolioStatus = 'Not Started' | 'In Progress' | 'Ready for Review' | 'Completed';

export interface PortfolioItem {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  status: PortfolioStatus;
  createdDate: string;
  fileUrl: string;
  proofDescription: string;
  devNotes: string;
  linkedModuleMonth?: number;
}

export interface MonthlyReview {
  id: string;
  monthYear: string; // e.g. "2027-01"
  achieved: string;
  skillsGrown: string;
  outputsCreated: string;
  biggestObstacle: string;
  drainingActivities: string;
  energizingActivities: string;
  toReduce: string;
  toKeep: string;
  toImprove: string;
  nextFocus: string;
  completedAt?: string;
}

export type EnergyCondition = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';

export interface EnergyLog {
  date: string; // YYYY-MM-DD
  level: 1 | 2 | 3 | 4 | 5;
  condition: EnergyCondition;
  causes: string;
}

export interface AppSettings {
  conflictHandling: 'proposed' | 'custom_time' | 'disabled';
  customConflictTime: string;
  lastBackupDate?: string;
  todayFocus: string;
}

// ==========================================
// 2027 OPPORTUNITY & PORTFOLIO TRACKING SYSTEM
// ==========================================

export type ResearchStage =
  | 'Minat Penelitian'
  | 'Eksplorasi Literatur'
  | 'Pertanyaan Penelitian'
  | 'Proposal'
  | 'Etik / Izin'
  | 'Pengumpulan Data'
  | 'Analisis'
  | 'Penulisan'
  | 'Luaran'
  | 'Dipublikasikan / Dipresentasikan'
  | 'Ditunda';

export interface ResearchProject {
  id: string;
  field: string;
  topicOrQuestion: string;
  institutionOrLab: string;
  opportunityType: string;
  sourceUrl: string;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  dateAdded: string;
  stage: ResearchStage;
  nextAction: string;
  actionDate: string;
  progressStatus: 'Belum Mulai' | 'Dalam Proses' | 'Selesai' | 'Ditunda';
  outcomesEvidence: string;
  notes: string;
}

export type CommunityProgressStatus = 'Eksplorasi' | 'Didaftar' | 'Aktif' | 'Selesai' | 'Ditunda';

export interface CommunityItem {
  id: string;
  organization: string;
  focusArea: string;
  activity: string;
  locationType: 'Daring (Online)' | 'Luring (Offline)' | 'Hybrid';
  sourceUrl: string;
  opportunityType: string;
  dateAdded: string;
  deadline: string;
  nextAction: string;
  actionDate: string;
  progressStatus: CommunityProgressStatus;
  roleContribution: string;
  evidence: string;
  notes: string;
}

export type KtiType =
  | 'Panduan'
  | 'Lembar Kerja'
  | 'Lokakarya'
  | 'Pendampingan'
  | 'Modul'
  | 'Kursus'
  | 'Proyek Literasi Riset'
  | 'Lainnya';

export type KtiStage = 'Ide / Konsep' | 'Pengembangan' | 'Uji Coba / Review' | 'Finalisasi' | 'Selesai';

export interface KtiProject {
  id: string;
  title: string;
  type: KtiType;
  targetAudience: string;
  problemNeed: string;
  learningObjective: string;
  references: string;
  stage: KtiStage;
  startDate: string;
  targetDate: string;
  reviewTrial: string;
  feedbackEvaluation: string;
  outputLink: string;
  portfolioEvidence: string;
  notes: string;
}

export type OutreachStatus =
  | 'Draft'
  | 'Terkirim'
  | 'Menunggu Balasan'
  | 'Diterima'
  | 'Ditolak'
  | 'Follow-up';

export interface OutreachEntry {
  id: string;
  date: string;
  contactPerson: string;
  institution: string;
  purpose: string;
  linkedPipeline: 'Research' | 'Community' | 'KTI' | 'General';
  contactInfo: string;
  link: string;
  status: OutreachStatus;
  followUpDate: string;
  followUpAction: string;
  response: string;
  notes: string;
}

export type EvidenceCategory =
  | 'Research'
  | 'KTI'
  | 'Community'
  | 'Leadership'
  | 'Collaboration'
  | 'Academic Development';

export interface PortfolioEvidenceItem {
  id: string;
  title: string;
  category: EvidenceCategory;
  description: string;
  date: string;
  linkedProject: string;
  linkedModule?: 'Research' | 'Community' | 'KTI' | 'Outreach' | 'General';
  evidenceType: 'Dokumen / Laporan' | 'Sertifikat' | 'Link Publikasi / Produk' | 'Foto / Media' | 'Rekomendasi' | 'Lainnya';
  fileOrUrl: string;
  institution: string;
  notes: string;
}

export interface AppData {
  version: string;
  lastModified: string;
  dailySchedule: DailyScheduleItem[];
  tuesdaySchedule?: DailyScheduleItem[];
  weeklyFocus: WeeklyFocus[];
  scheduleConflicts: ScheduleConflict[];
  activityLogs: Record<string, DailyActivityLog>; // keyed by YYYY-MM-DD
  quickCaptures: QuickCaptureItem[];
  mikroEpisodes: MikroEpisode[];
  goCounselCalendar: GoCounselContent[];
  neuroModules: NeuroModule[];
  researchSkills: ResearchSkill[];
  literature: LiteratureReference[];
  professionalActivities: ProfessionalActivity[];
  connections: ProfessionalConnection[];
  portfolio: PortfolioItem[];
  monthlyReviews: MonthlyReview[];
  energyLogs: Record<string, EnergyLog>; // keyed by YYYY-MM-DD
  settings: AppSettings;
  // 2027 New Pillars & Tracking System
  researchProjects: ResearchProject[];
  communityActivities: CommunityItem[];
  ktiProjects: KtiProject[];
  outreachLogs: OutreachEntry[];
  portfolioEvidences: PortfolioEvidenceItem[];
}
