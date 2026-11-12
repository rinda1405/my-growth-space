import { 
  AppData, 
  DailyScheduleItem, 
  WeeklyFocus, 
  ScheduleConflict, 
  MikroEpisode, 
  GoCounselContent, 
  NeuroModule, 
  ResearchSkill, 
  LiteratureReference, 
  PortfolioItem,
  ProfessionalActivity,
  ProfessionalConnection
} from '../types';

export const initialDailySchedule: DailyScheduleItem[] = [
  {
    id: 'ds-1',
    timeStart: '05.30',
    timeEnd: '06.00',
    activity: 'Bangun, ibadah, persiapan diri',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'spiritual',
    notes: 'Mulai perlahan; tidak perlu langsung membuka pekerjaan.'
  },
  {
    id: 'ds-2',
    timeStart: '06.00',
    timeEnd: '07.00',
    activity: 'Membaca ringan / journaling / waktu pribadi',
    isFixed: true,
    isOptional: true,
    isRest: false,
    category: 'reflection',
    notes: 'Waktu tenang untuk membaca, journaling, refleksi, atau kegiatan pribadi. Boleh dilewati jika tubuh lelah.'
  },
  {
    id: 'ds-3',
    timeStart: '07.00',
    timeEnd: '08.00',
    activity: 'Pengembangan diri',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'learning',
    notes: 'Pilih satu kegiatan: olahraga ringan, latihan bahasa Inggris, membaca buku pengembangan diri, atau latihan public speaking. Sarapan dapat dilakukan sebelum/sesudah sesuai kebutuhan.'
  },
  {
    id: 'ds-4',
    timeStart: '08.00',
    timeEnd: '09.00',
    activity: 'Sarapan dan persiapan / perjalanan kerja',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'transition',
    notes: 'Senin dan Rabu–Jumat: persiapan dan perjalanan kerja. Selasa: sarapan dan persiapan aktivitas pribadi di rumah.'
  },
  {
    id: 'ds-5',
    timeStart: '09.00',
    timeEnd: '12.00',
    activity: 'Pekerjaan utama Guru BK',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'work',
    notes: 'Fokus pada prioritas pekerjaan sekolah.'
  },
  {
    id: 'ds-6',
    timeStart: '12.00',
    timeEnd: '13.00',
    activity: 'Istirahat, makan, ibadah',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Jauhkan diri dari tugas jika memungkinkan.'
  },
  {
    id: 'ds-7',
    timeStart: '13.00',
    timeEnd: '14.00',
    activity: 'Personal learning',
    isFixed: true,
    isOptional: true,
    isRest: false,
    category: 'learning',
    notes: 'Belajar Neuroeducation, membaca jurnal, research methods, atau Research Assistant skills. Tidak wajib setiap hari; pilih sesuai fokus mingguan.'
  },
  {
    id: 'ds-8',
    timeStart: '14.00',
    timeEnd: '15.00',
    activity: 'Waktu konten — fokus utama',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'content',
    notes: 'Riset topik, menyusun outline, menulis naskah/artikel, atau menyiapkan materi sesuai fokus mingguan.'
  },
  {
    id: 'ds-9',
    timeStart: '15.00',
    timeEnd: '15.30',
    activity: 'Waktu konten — sesi singkat',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'content',
    notes: 'Lanjutkan satu pekerjaan konten ringan: revisi, caption, penjadwalan, atau merapikan bahan. Hentikan aktivitas konten pukul 15.30.'
  },
  {
    id: 'ds-10',
    timeStart: '15.30',
    timeEnd: '16.30',
    activity: 'Waktu ibadah',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'spiritual',
    notes: 'Waktu khusus untuk ibadah. Jangan jadwalkan pekerjaan, produksi konten, atau aktivitas produktivitas pada jam ini.'
  },
  {
    id: 'ds-11',
    timeStart: '16.30',
    timeEnd: '17.30',
    activity: 'Konseling siswa (jika terjadwal)',
    isFixed: true,
    isOptional: true,
    isRest: false,
    category: 'counseling',
    notes: 'Jika tidak ada jadwal konseling, gunakan untuk waktu pribadi/administrasi seperlunya.'
  },
  {
    id: 'ds-12',
    timeStart: '17.30',
    timeEnd: '19.30',
    activity: 'Istirahat, makan, ibadah',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Lindungi waktu pemulihan.'
  },
  {
    id: 'ds-13',
    timeStart: '19.30',
    timeEnd: '20.00',
    activity: 'Persiapan pendampingan',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'family',
    notes: 'Persiapan seperlunya.'
  },
  {
    id: 'ds-14',
    timeStart: '20.00',
    timeEnd: '21.00',
    activity: 'Pendampingan anak',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'family',
    notes: 'Tanggung jawab malam yang sudah terjadwal.'
  },
  {
    id: 'ds-15',
    timeStart: '21.00',
    timeEnd: '22.00',
    activity: 'Skincare, relaksasi, winding down',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'relaxation',
    notes: 'Hindari pekerjaan konten dan riset.'
  },
  {
    id: 'ds-16',
    timeStart: '22.00',
    timeEnd: '05.30',
    activity: 'Tidur',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Target tidur konsisten.'
  }
];

export const initialTuesdaySchedule: DailyScheduleItem[] = [
  {
    id: 'tue-1',
    timeStart: '05.30',
    timeEnd: '06.00',
    activity: 'Bangun dan ibadah',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'spiritual',
    notes: 'Rutinitas pagi seperti biasa.',
    outputNote: 'Memulai hari dengan tenang'
  },
  {
    id: 'tue-2',
    timeStart: '06.00',
    timeEnd: '07.00',
    activity: 'Membaca ringan / journaling / waktu pribadi',
    isFixed: true,
    isOptional: true,
    isRest: false,
    category: 'reflection',
    notes: 'Refleksi, membaca, atau waktu tenang.',
    outputNote: 'Catatan pribadi jika diperlukan'
  },
  {
    id: 'tue-3',
    timeStart: '07.00',
    timeEnd: '08.00',
    activity: 'Pengembangan diri',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'learning',
    notes: 'Olahraga ringan, latihan bahasa Inggris, public speaking, atau membaca buku pengembangan diri. Pilih satu.',
    outputNote: 'Satu sesi pengembangan diri'
  },
  {
    id: 'tue-4',
    timeStart: '08.00',
    timeEnd: '09.00',
    activity: 'Sarapan dan persiapan',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'transition',
    notes: 'Tidak perlu perjalanan ke kantor. Siapkan ruang belajar dan agenda.',
    outputNote: 'Ruang dan agenda siap'
  },
  {
    id: 'tue-5',
    timeStart: '09.00',
    timeEnd: '10.30',
    activity: 'Neuroeducation — deep learning',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'learning',
    notes: 'Pelajari tema bulan berjalan; baca satu sumber utama dan buat catatan kritis.',
    outputNote: 'Ringkasan 3–5 poin atau concept notes'
  },
  {
    id: 'tue-6',
    timeStart: '10.30',
    timeEnd: '10.45',
    activity: 'Istirahat',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Jauhkan diri dari layar dan bergerak sebentar.',
    outputNote: 'Pemulihan'
  },
  {
    id: 'tue-7',
    timeStart: '10.45',
    timeEnd: '12.00',
    activity: 'Research Assistant skills practice',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'learning',
    notes: 'Latihan yang mendukung topik pagi: literature search, literature matrix, critical appraisal, Zotero, atau metode penelitian.',
    outputNote: 'Satu latihan atau bukti kerja kecil'
  },
  {
    id: 'tue-8',
    timeStart: '12.00',
    timeEnd: '13.00',
    activity: 'Istirahat, makan, ibadah',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Waktu istirahat.',
    outputNote: 'Pemulihan'
  },
  {
    id: 'tue-9',
    timeStart: '13.00',
    timeEnd: '14.00',
    activity: 'Personal learning / reading',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'learning',
    notes: 'Menyelesaikan bacaan, meninjau catatan, atau belajar ringan. Tidak perlu menambah target baru.',
    outputNote: 'Catatan pembelajaran'
  },
  {
    id: 'tue-10',
    timeStart: '14.00',
    timeEnd: '15.00',
    activity: 'Mikro Thinking ID — research & outline',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'content',
    notes: 'Riset topik, menentukan sudut pandang, menyusun outline video atau artikel.',
    outputNote: 'Outline atau kerangka artikel'
  },
  {
    id: 'tue-11',
    timeStart: '15.00',
    timeEnd: '15.30',
    activity: 'Mikro Thinking ID — penyelesaian singkat',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'content',
    notes: 'Lanjutkan revisi ringan, caption, atau penjadwalan. Akhiri pekerjaan pukul 15.30.',
    outputNote: 'Satu bagian konten dirapikan'
  },
  {
    id: 'tue-12',
    timeStart: '15.30',
    timeEnd: '16.30',
    activity: 'Waktu ibadah',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'spiritual',
    notes: 'Waktu khusus untuk ibadah. Tidak boleh diisi pekerjaan atau target produktivitas.',
    outputNote: 'Ibadah'
  },
  {
    id: 'tue-13',
    timeStart: '16.30',
    timeEnd: '17.30',
    activity: 'Waktu pribadi / aktivitas luar ruang',
    isFixed: true,
    isOptional: true,
    isRest: false,
    category: 'relaxation',
    notes: 'Berjalan santai, olahraga ringan, urusan pribadi, atau istirahat.',
    outputNote: 'Tidak wajib menghasilkan output'
  },
  {
    id: 'tue-14',
    timeStart: '17.30',
    timeEnd: '19.30',
    activity: 'Istirahat, makan, ibadah',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Lindungi waktu pemulihan.',
    outputNote: 'Pemulihan'
  },
  {
    id: 'tue-15',
    timeStart: '19.30',
    timeEnd: '20.00',
    activity: 'Persiapan pendampingan',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'family',
    notes: 'Persiapan seperlunya.',
    outputNote: 'Siap mendampingi'
  },
  {
    id: 'tue-16',
    timeStart: '20.00',
    timeEnd: '21.00',
    activity: 'Pendampingan anak',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'family',
    notes: 'Tanggung jawab malam yang sudah terjadwal.',
    outputNote: 'Sesuai agenda pendampingan'
  },
  {
    id: 'tue-17',
    timeStart: '21.00',
    timeEnd: '22.00',
    activity: 'Skincare dan relaksasi',
    isFixed: true,
    isOptional: false,
    isRest: false,
    category: 'relaxation',
    notes: 'Hindari pekerjaan konten dan riset.',
    outputNote: 'Winding down'
  },
  {
    id: 'tue-18',
    timeStart: '22.00',
    timeEnd: '05.30',
    activity: 'Tidur',
    isFixed: true,
    isOptional: false,
    isRest: true,
    category: 'rest',
    notes: 'Target tidur konsisten.',
    outputNote: 'Istirahat'
  }
];

export const initialWeeklyFocus: WeeklyFocus[] = [
  {
    dayOfWeek: 1,
    dayName: 'Senin',
    focusTitle: 'Research & Learning',
    timeSlot: '13.00–14.00 personal learning; 14.00–15.30 konten; 15.30–16.30 ibadah/riset; malam istirahat',
    primaryFocus: 'Belajar Neuroeducation, membaca jurnal, membuat catatan literatur, dan mengembangkan ide konten berbasis sumber.',
    limits: 'Pilih satu fokus belajar; jangan menambah pekerjaan pada waktu istirahat.'
  },
  {
    dayOfWeek: 2,
    dayName: 'Selasa',
    focusTitle: 'Personal Growth Day (tanpa ke kantor)',
    timeSlot: '09.00–12.00 pengembangan diri terstruktur; 13.00–14.00 personal learning; 14.00–15.30 Mikro Thinking ID',
    primaryFocus: 'Pagi: Neuroeducation deep learning dan latihan Research Assistant. Siang: membaca/refleksi. Sore: riset topik, outline, naskah YouTube atau artikel Mikro Thinking ID.',
    limits: 'Satu tema utama Neuroeducation dan satu output kecil; sisakan jeda dan waktu pribadi.'
  },
  {
    dayOfWeek: 3,
    dayName: 'Rabu',
    focusTitle: 'GO.COUNSEL',
    timeSlot: '13.00–14.00 personal learning (opsional); 14.00–15.30 waktu konten',
    primaryFocus: 'Mengembangkan konten GO.COUNSEL sesuai kalender 30 hari: materi, caption, desain, editing, dan scheduling.',
    limits: 'Ikuti kalender sumber; jangan membuat kalender baru jika file tersedia.'
  },
  {
    dayOfWeek: 4,
    dayName: 'Kamis',
    focusTitle: 'Research Assistant Skills',
    timeSlot: '13.00–14.00 personal learning; 14.00–15.30 waktu konten/portofolio sesuai kebutuhan',
    primaryFocus: 'Latihan statistik, Excel/jamovi/SPSS, literature search, Zotero, academic writing, atau English. Jika tidak ada target konten mendesak, gunakan sebagian blok untuk output akademik.',
    limits: 'Satu skill per sesi; jangan memaksakan semua kompetensi sekaligus.'
  },
  {
    dayOfWeek: 5,
    dayName: 'Jumat',
    focusTitle: 'Professional Development',
    timeSlot: '13.00–14.00 personal learning (opsional); 14.00–15.30 konten; 15.30–16.30 ibadah atau aktivitas profesional',
    primaryFocus: 'Public speaking practice, mencari peluang volunteer, networking, webinar, atau menyelesaikan konten yang sudah direncanakan.',
    limits: 'Tidak perlu mengejar semua aktivitas setiap Jumat; prioritaskan satu hal.'
  },
  {
    dayOfWeek: 6,
    dayName: 'Sabtu',
    focusTitle: 'Production Day',
    timeSlot: '08.00–12.00',
    primaryFocus: 'Batch produksi video, editing, artikel, atau pengembangan portfolio akademik.',
    limits: 'Maksimal 3–4 jam fokus; sisakan waktu pribadi.'
  },
  {
    dayOfWeek: 0,
    dayName: 'Minggu',
    focusTitle: 'Rest & Reset',
    timeSlot: 'Fleksibel, maksimal 30 menit',
    primaryFocus: 'Istirahat; rencana minggu depan secara ringan jika diperlukan.',
    limits: 'Bukan hari mengejar pekerjaan tertunda.'
  }
];

export const initialScheduleConflicts: ScheduleConflict[] = [
  {
    id: 'conflict-1',
    slotTime: '18.30–19.30',
    targetName: 'Proposed Focus Block (Pengembangan Diri)',
    conflictReason: 'Slot ini bertabrakan dengan Jadwal Istirahat Tetap pukul 17.30–19.30. Berstatus "Perlu Konfirmasi" dan dinonaktifkan secara default agar tidak mengorbankan waktu istirahat dan ibadah keluarga.',
    status: 'proposed'
  }
];

export const initialMikroEpisodes: MikroEpisode[] = [
  {
    "episodeNo": "01",
    "month": "January",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Ketika Hidup Tidak Berjalan Sesuai Rencana",
    "coreQuestion": "Bagaimana kita merespons hal-hal yang berada di luar kendali?",
    "direction": "Harapan vs kenyataan; menerima emosi tanpa menyerah; ikhtiar dan tawakal berjalan bersama.",
    "psychologicalLens": "Goal-setting theory; positive emotions; acceptance; tawakal sebagai refleksi nilai, bukan klaim psikologi.",
    "articleTitle": "Ketika Hidup Tidak Berjalan Sesuai Rencana: refleksi dan gagasan utama",
    "researchOutlineDate": "46392",
    "articlePublishDate": "46399",
    "videoPublishDate": "46396",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "02",
    "month": "January",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Belajar Melihat Hal Kecil sebagai Nikmat",
    "coreQuestion": "Mengapa sesuatu yang sederhana sering baru terasa berharga setelah hilang?",
    "direction": "Latihan memperhatikan nikmat sehari-hari tanpa menyangkal kesulitan; syukur dalam cara memandang dan menggunakan nikmat.",
    "psychologicalLens": "Positive psychology; gratitude; attention to everyday positive experiences.",
    "articleTitle": "Belajar Melihat Hal Kecil sebagai Nikmat: refleksi dan gagasan utama",
    "researchOutlineDate": "46406",
    "articlePublishDate": "46413",
    "videoPublishDate": "46410",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "03",
    "month": "February",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Tidak Semua Proses Harus Terlihat oleh Orang Lain",
    "coreQuestion": "Mengapa kita merasa perlu membuktikan setiap usaha?",
    "direction": "Niat, konsistensi, pekerjaan baik yang tidak selalu mendapat pengakuan; bedakan berbagi kabar dan ketergantungan validasi.",
    "psychologicalLens": "Intrinsic motivation; social validation; self-determination sebagai lensa tambahan jika didukung sumber.",
    "articleTitle": "Tidak Semua Proses Harus Terlihat oleh Orang Lain: refleksi dan gagasan utama",
    "researchOutlineDate": "46420",
    "articlePublishDate": "46427",
    "videoPublishDate": "46431",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "04",
    "month": "February",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Memaafkan Bukan Berarti Membenarkan",
    "coreQuestion": "Apa arti memaafkan ketika luka atau ketidakadilan masih terasa?",
    "direction": "Bedakan memaafkan, berdamai, memulihkan kepercayaan, dan menetapkan batas aman.",
    "psychologicalLens": "Forgiveness research; boundaries; emotional safety.",
    "articleTitle": "Memaafkan Bukan Berarti Membenarkan: refleksi dan gagasan utama",
    "researchOutlineDate": "46434",
    "articlePublishDate": "46441",
    "videoPublishDate": "46445",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "05",
    "month": "March",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Kesabaran yang Aktif, Bukan Pasrah",
    "coreQuestion": "Apa bedanya bersabar dengan berhenti berusaha?",
    "direction": "Kesabaran sebagai keteguhan, pengelolaan respons, dan keberanian mengambil langkah yang masih mungkin dilakukan.",
    "psychologicalLens": "Resilience; coping; goal pursuit.",
    "articleTitle": "Kesabaran yang Aktif, Bukan Pasrah: refleksi dan gagasan utama",
    "researchOutlineDate": "46448",
    "articlePublishDate": "46455",
    "videoPublishDate": "46459",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "06",
    "month": "March",
    "season": "Season 1 — Memahami Diri & Kehidupan",
    "title": "Kebaikan Kecil yang Tidak Masuk Berita",
    "coreQuestion": "Apakah kebaikan harus besar agar berarti?",
    "direction": "Kisah tindakan sederhana: mendengarkan, membantu, memberi ruang, dan peduli.",
    "psychologicalLens": "Prosocial behavior; compassion; everyday kindness.",
    "articleTitle": "Kebaikan Kecil yang Tidak Masuk Berita: refleksi dan gagasan utama",
    "researchOutlineDate": "46462",
    "articlePublishDate": "46469",
    "videoPublishDate": "46473",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "07",
    "month": "April",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Saat Membandingkan Hidup dengan Orang Lain",
    "coreQuestion": "Mengapa perjalanan orang lain bisa membuat kita meragukan hidup sendiri?",
    "direction": "Perbandingan sosial dan kehidupan yang dikurasi di media sosial; kembali mengenali ukuran cukup dan arah pribadi.",
    "psychologicalLens": "Social comparison; self-worth; media literacy.",
    "articleTitle": "Saat Membandingkan Hidup dengan Orang Lain: refleksi dan gagasan utama",
    "researchOutlineDate": "46483",
    "articlePublishDate": "46490",
    "videoPublishDate": "46487",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "08",
    "month": "April",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Menjaga Lisan di Tengah Perbedaan",
    "coreQuestion": "Bagaimana tetap tegas tanpa merendahkan orang lain?",
    "direction": "Adab berbeda pendapat, kehati-hatian menyebarkan cerita, dan memilih kata yang tidak memperkeruh keadaan.",
    "psychologicalLens": "Communication; empathy; perspective-taking.",
    "articleTitle": "Menjaga Lisan di Tengah Perbedaan: refleksi dan gagasan utama",
    "researchOutlineDate": "46497",
    "articlePublishDate": "46504",
    "videoPublishDate": "46501",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "09",
    "month": "May",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Menerima Bahwa Kita Tidak Selalu Punya Jawaban",
    "coreQuestion": "Mengapa ketidakpastian begitu melelahkan?",
    "direction": "Keterbatasan manusia; mencari informasi cukup, berdoa, bermusyawarah, lalu mengambil keputusan tanpa kepastian mutlak.",
    "psychologicalLens": "Intolerance of uncertainty; decision-making; coping.",
    "articleTitle": "Menerima Bahwa Kita Tidak Selalu Punya Jawaban: refleksi dan gagasan utama",
    "researchOutlineDate": "46511",
    "articlePublishDate": "46518",
    "videoPublishDate": "46515",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "10",
    "month": "May",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Waktu, Kesibukan, dan Hal yang Sungguh Penting",
    "coreQuestion": "Apakah jadwal yang penuh selalu berarti hidup yang bermakna?",
    "direction": "Membedakan sibuk, produktif, dan hadir; memeriksa prioritas, hubungan, ibadah, istirahat, dan tanggung jawab.",
    "psychologicalLens": "Meaningful activity; values; time use; well-being.",
    "articleTitle": "Waktu, Kesibukan, dan Hal yang Sungguh Penting: refleksi dan gagasan utama",
    "researchOutlineDate": "46525",
    "articlePublishDate": "46532",
    "videoPublishDate": "46529",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "11",
    "month": "June",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Ketika Kita Melakukan Kesalahan",
    "coreQuestion": "Bagaimana bertanggung jawab tanpa terus-menerus menghukum diri?",
    "direction": "Mengakui kesalahan, taubat, memperbaiki dampak, dan belajar; bedakan rasa bersalah dari identitas diri.",
    "psychologicalLens": "Self-compassion; guilt vs shame; restorative action.",
    "articleTitle": "Ketika Kita Melakukan Kesalahan: refleksi dan gagasan utama",
    "researchOutlineDate": "46539",
    "articlePublishDate": "46546",
    "videoPublishDate": "46550",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "12",
    "month": "June",
    "season": "Season 2 — Hidup Bersama Orang Lain",
    "title": "Menjadi Bermanfaat Tanpa Kehilangan Diri",
    "coreQuestion": "Bagaimana menolong orang lain sambil tetap menjaga batas kemampuan?",
    "direction": "Kepedulian, niat, batas personal, dan keberlanjutan dalam membantu.",
    "psychologicalLens": "Compassion; boundaries; helper well-being.",
    "articleTitle": "Menjadi Bermanfaat Tanpa Kehilangan Diri: refleksi dan gagasan utama",
    "researchOutlineDate": "46553",
    "articlePublishDate": "46560",
    "videoPublishDate": "46564",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "13",
    "month": "July",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Apa yang Kita Kejar ketika Menginginkan Lebih?",
    "coreQuestion": "Kapan ambisi membantu bertumbuh dan kapan membuat kita tidak pernah merasa cukup?",
    "direction": "Keinginan, rasa cukup, tujuan duniawi, orientasi akhirat; memeriksa alasan di balik target.",
    "psychologicalLens": "Goal-setting; values; intrinsic/extrinsic motivation.",
    "articleTitle": "Apa yang Kita Kejar ketika Menginginkan Lebih?: refleksi dan gagasan utama",
    "researchOutlineDate": "46574",
    "articlePublishDate": "46581",
    "videoPublishDate": "46578",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "14",
    "month": "July",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Belajar dari Orang yang Berbeda dengan Kita",
    "coreQuestion": "Apa yang bisa kita pelajari dari pengalaman hidup orang lain?",
    "direction": "Kisah manusia dengan latar berbeda; melatih empati; memahami pengalaman tanpa harus menyetujui semua pilihan.",
    "psychologicalLens": "Empathy; perspective-taking; narrative learning.",
    "articleTitle": "Belajar dari Orang yang Berbeda dengan Kita: refleksi dan gagasan utama",
    "researchOutlineDate": "46588",
    "articlePublishDate": "46595",
    "videoPublishDate": "46592",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "15",
    "month": "August",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Harapan ketika Masa Depan Terasa Gelap",
    "coreQuestion": "Bagaimana menjaga harapan tanpa berpura-pura semuanya baik-baik saja?",
    "direction": "Harapan realistis: mengakui kesulitan, mencari pertolongan, melakukan langkah kecil, dan mengingat keluasan rahmat Allah.",
    "psychologicalLens": "Hope; realistic optimism; coping and support.",
    "articleTitle": "Harapan ketika Masa Depan Terasa Gelap: refleksi dan gagasan utama",
    "researchOutlineDate": "46602",
    "articlePublishDate": "46609",
    "videoPublishDate": "46613",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "16",
    "month": "August",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Membaca Kisah, Menemukan Cermin Diri",
    "coreQuestion": "Mengapa kisah orang lain kadang membuat kita memahami diri sendiri?",
    "direction": "Belajar dari biografi, sejarah, pengalaman komunitas, atau kisah teladan; pisahkan fakta, interpretasi, refleksi.",
    "psychologicalLens": "Narrative psychology; learning from stories.",
    "articleTitle": "Membaca Kisah, Menemukan Cermin Diri: refleksi dan gagasan utama",
    "researchOutlineDate": "46616",
    "articlePublishDate": "46623",
    "videoPublishDate": "46627",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "17",
    "month": "September",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Syukur yang Terlihat dalam Tindakan",
    "coreQuestion": "Apakah bersyukur cukup dengan mengucapkan terima kasih?",
    "direction": "Kesadaran nikmat menjadi tindakan: menjaga, berbagi, menggunakan kemampuan bertanggung jawab.",
    "psychologicalLens": "Gratitude; prosocial behavior; values in action.",
    "articleTitle": "Syukur yang Terlihat dalam Tindakan: refleksi dan gagasan utama",
    "researchOutlineDate": "46637",
    "articlePublishDate": "46644",
    "videoPublishDate": "46641",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  },
  {
    "episodeNo": "18",
    "month": "September",
    "season": "Season 3 — Menata Arah & Makna Hidup",
    "title": "Menjadikan Bacaan sebagai Perubahan Kecil",
    "coreQuestion": "Setelah membaca sesuatu yang menginspirasi, bagaimana agar pelajarannya tidak berhenti sebagai kutipan?",
    "direction": "Alur khas: temukan bacaan, catat gagasan, periksa sumber, hubungkan dengan nilai Al-Qur'an, refleksi, pilih tindakan kecil.",
    "psychologicalLens": "Reflective learning; behavior change; micro-actions.",
    "articleTitle": "Menjadikan Bacaan sebagai Perubahan Kecil: refleksi dan gagasan utama",
    "researchOutlineDate": "46651",
    "articlePublishDate": "46658",
    "videoPublishDate": "46655",
    "videoStatus": "Belum mulai",
    "articleStatus": "Belum mulai",
    "notes": "Dua siklus per bulan. Artikel terbit Selasa minggu ke-2/4; video terbit Sabtu minggu ke-2/4.",
    "referenceLinks": []
  }
];

export const initialGoCounselCalendar: GoCounselContent[] = [
  {
    "day": 1,
    "date": "46342",
    "dayName": "Senin",
    "pillar": "Neuroeducation & Learning",
    "format": "Reels",
    "topic": "Otak tidak belajar dengan cara yang kita kira",
    "hook": "Hook: “Belajar lama belum tentu belajar efektif.” Jelaskan peran perhatian, memori, dan retrieval practice secara ringkas. Hindari menyatakan satu teknik cocok untuk semua orang.",
    "cta": "Simpan video ini sebagai pengingat saat belajar.",
    "caption": "Belajar lama belum tentu belajar efektif. Kenali bagaimana perhatian, memori, dan latihan mengingat membantu proses belajar. Follow @go.counsel untuk belajar dan berkembang bersama.",
    "hashtags": [
      "#GoCounsel",
      "#Neuroeducation",
      "#TipsBelajar",
      "#PsikologiPendidikan",
      "#StudentDevelopment"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 2,
    "date": "46343",
    "dayName": "Selasa",
    "pillar": "Neuroeducation & Learning",
    "format": "Carousel",
    "topic": "Apa yang terjadi di otak saat kita belajar?",
    "hook": "Kenalkan encoding, storage, dan retrieval dengan analogi sederhana. Jelaskan bahwa ketiganya merupakan kerangka dasar memahami memori, bukan urutan yang selalu kaku.",
    "cta": "Bagian mana yang paling ingin kamu pahami?",
    "caption": "Saat belajar, otak mengolah, mempertahankan, dan mengambil kembali informasi. Kenali tiga proses dasar memori. Follow @go.counsel untuk insight psikologi dan pendidikan lainnya.",
    "hashtags": [
      "#GoCounsel",
      "#PsikologiKognitif",
      "#Memori",
      "#Neuroeducation",
      "#BelajarEfektif"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 3,
    "date": "46344",
    "dayName": "Rabu",
    "pillar": "Neuroeducation & Learning",
    "format": "Reels",
    "topic": "Kenapa sulit fokus saat belajar?",
    "hook": "Bahas distraksi, beban kognitif, lingkungan, dan tujuan belajar yang tidak jelas. Gunakan analogi meja belajar yang terlalu penuh untuk menjelaskan beban kognitif.",
    "cta": "Apa distraksi terbesarmu saat belajar?",
    "caption": "Sulit fokus bukan selalu berarti malas. Distraksi, beban pikiran, lingkungan, dan tujuan yang kurang jelas dapat ikut memengaruhi konsentrasi. Follow @go.counsel untuk belajar memahami diri.",
    "hashtags": [
      "#GoCounsel",
      "#FokusBelajar",
      "#CognitiveLoad",
      "#PsikologiPendidikan",
      "#StudyTips"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 4,
    "date": "46345",
    "dayName": "Kamis",
    "pillar": "Neuroeducation & Learning",
    "format": "Carousel",
    "topic": "Tidur dan memori: mengapa istirahat penting?",
    "hook": "Jelaskan hubungan tidur dengan konsolidasi memori dan kesiapan perhatian. Hindari klaim bahwa tidur otomatis membuat seseorang lebih pintar.",
    "cta": "Bagikan kepada teman yang sering begadang.",
    "caption": "Istirahat bukan lawan dari produktivitas. Tidur berperan dalam proses memori dan kesiapan kita untuk belajar. Follow @go.counsel untuk memahami proses belajar dari sisi psikologi.",
    "hashtags": [
      "#GoCounsel",
      "#TidurCukup",
      "#Memori",
      "#Neuroeducation",
      "#KesehatanBelajar"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 5,
    "date": "46346",
    "dayName": "Jumat",
    "pillar": "Neuroeducation & Learning",
    "format": "Reels",
    "topic": "Multitasking saat belajar: efektif atau hanya terasa sibuk?",
    "hook": "Jelaskan task-switching dan biaya berpindah perhatian. Beri contoh belajar sambil terus membuka notifikasi.",
    "cta": "Coba satu sesi belajar tanpa notifikasi.",
    "caption": "Mengerjakan banyak hal sekaligus belum tentu membuat belajar lebih efektif. Coba amati bagaimana notifikasi memecah perhatianmu. Follow @go.counsel untuk strategi belajar yang lebih sadar.",
    "hashtags": [
      "#GoCounsel",
      "#Multitasking",
      "#FokusBelajar",
      "#Neuroeducation",
      "#StudyHabits"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 6,
    "date": "46347",
    "dayName": "Sabtu",
    "pillar": "Neuroeducation & Learning",
    "format": "Story/Quiz",
    "topic": "Kuis: Mitos atau fakta seputar cara belajar?",
    "hook": "Polling: “Membaca catatan berulang selalu menjadi cara paling efektif untuk mengingat.” Pilihan: Mitos/Fakta. Slide berikutnya beri penjelasan singkat tentang strategi belajar dan latihan mengingat.",
    "cta": "Ikuti kuis dan bagikan kebiasaan belajarmu.",
    "caption": "Belajar efektif bukan hanya soal mengulang bacaan. Ikuti kuis singkat di Story dan follow @go.counsel untuk insight belajar lainnya.",
    "hashtags": [
      "#GoCounsel",
      "#KuisPsikologi",
      "#Neuroeducation",
      "#TipsBelajar",
      "#PsikologiPendidikan"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 7,
    "date": "46348",
    "dayName": "Minggu",
    "pillar": "Neuroeducation & Learning",
    "format": "Story/Poll",
    "topic": "Polling: Apa distraksi terbesarmu saat belajar?",
    "hook": "Polling: Notifikasi ponsel/Suasana ramai. Lanjutkan dengan question box: “Apa yang biasanya kamu lakukan untuk mengatasinya?”",
    "cta": "Pilih jawabanmu di polling Story.",
    "caption": "Setiap orang bisa menghadapi distraksi yang berbeda. Ikuti polling hari ini dan follow @go.counsel untuk memahami proses belajar.",
    "hashtags": [
      "#GoCounsel",
      "#FokusBelajar",
      "#PollingInstagram",
      "#StudyHabits",
      "#StudentDevelopment"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 8,
    "date": "46349",
    "dayName": "Senin",
    "pillar": "Motivation & Self-Development",
    "format": "Carousel",
    "topic": "5 insight belajar dari minggu ini",
    "hook": "Rangkum perhatian, memori, tidur, distraksi, dan multitasking. Tambahkan satu tantangan praktik sederhana.",
    "cta": "Follow @go.counsel untuk seri berikutnya.",
    "caption": "Lima hal kecil yang perlu diingat tentang proses belajar: perhatian, memori, tidur, distraksi, dan kebiasaan multitasking. Follow @go.counsel untuk insight berikutnya.",
    "hashtags": [
      "#GoCounsel",
      "#RefleksiBelajar",
      "#Neuroeducation",
      "#StudentDevelopment",
      "#Belajar"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 9,
    "date": "46350",
    "dayName": "Selasa",
    "pillar": "Motivation & Self-Development",
    "format": "Reels",
    "topic": "Kenapa kita menunda meski tahu tugas itu penting?",
    "hook": "Bahas prokrastinasi sebagai perilaku kompleks yang dapat terkait emosi, nilai tugas, kesulitan memulai, dan lingkungan.",
    "cta": "Apa tugas yang sedang kamu tunda?",
    "caption": "Menunda tidak selalu sesederhana malas. Ada banyak faktor yang bisa membuat kita sulit memulai. Follow @go.counsel untuk memahami kebiasaan dan perilaku sehari-hari.",
    "hashtags": [
      "#GoCounsel",
      "#Prokrastinasi",
      "#SelfDevelopment",
      "#Psikologi",
      "#Produktivitas"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 10,
    "date": "46351",
    "dayName": "Rabu",
    "pillar": "Motivation & Self-Development",
    "format": "Carousel",
    "topic": "Motivasi atau sistem: mana yang lebih bisa diandalkan?",
    "hook": "Tunjukkan bagaimana pemicu, rutinitas kecil, dan lingkungan membantu konsistensi. Motivasi tetap berguna, tetapi dapat berubah-ubah.",
    "cta": "Pilih satu kebiasaan kecil hari ini.",
    "caption": "Motivasi bisa berubah, tetapi sistem kecil dapat membantu kita tetap bergerak. Mulai dari kebiasaan yang realistis. Follow @go.counsel untuk bertumbuh selangkah demi selangkah.",
    "hashtags": [
      "#GoCounsel",
      "#Motivasi",
      "#HabitBuilding",
      "#SelfDevelopment",
      "#KebiasaanBaik"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 11,
    "date": "46352",
    "dayName": "Kamis",
    "pillar": "Motivation & Self-Development",
    "format": "Reels",
    "topic": "Growth mindset bukan berarti harus selalu positif",
    "hook": "Jelaskan bahwa kemampuan dapat berkembang melalui strategi, latihan, umpan balik, dan dukungan; bukan sekadar afirmasi.",
    "cta": "Kirim ke teman yang sedang belajar hal baru.",
    "caption": "Growth mindset bukan berarti harus selalu optimis. Yang penting adalah kesediaan belajar, mencoba strategi, menerima umpan balik, dan berkembang. Follow @go.counsel untuk insight pengembangan diri.",
    "hashtags": [
      "#GoCounsel",
      "#GrowthMindset",
      "#SelfDevelopment",
      "#BelajarBertumbuh",
      "#Psikologi"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 12,
    "date": "46353",
    "dayName": "Jumat",
    "pillar": "Motivation & Self-Development",
    "format": "Carousel",
    "topic": "Apa yang membuat tujuan terasa sulit dicapai?",
    "hook": "Uraikan tujuan terlalu besar, langkah tidak jelas, hambatan lingkungan, dan kurangnya umpan balik. Tawarkan cara memecah tujuan menjadi langkah kecil.",
    "cta": "Pecah satu tujuanmu menjadi langkah 10 menit.",
    "caption": "Tujuan besar terasa lebih mungkin dijalani ketika dipecah menjadi langkah yang jelas dan realistis. Apa satu langkah 10 menit yang bisa kamu mulai hari ini? Follow @go.counsel.",
    "hashtags": [
      "#GoCounsel",
      "#GoalSetting",
      "#SelfDevelopment",
      "#MicroHabits",
      "#Produktivitas"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 13,
    "date": "46354",
    "dayName": "Sabtu",
    "pillar": "Motivation & Self-Development",
    "format": "Story/Poll",
    "topic": "Apa yang paling membantumu mulai mengerjakan tugas?",
    "hook": "Polling: Membagi tugas jadi langkah kecil/Menentukan waktu mulai. Ajak audiens memilih satu strategi yang ingin dicoba.",
    "cta": "Vote dan coba satu strategi pilihanmu.",
    "caption": "Memulai sering kali menjadi bagian yang paling menantang. Pilih strategi yang ingin kamu coba dan follow @go.counsel untuk ide pengembangan diri.",
    "hashtags": [
      "#GoCounsel",
      "#MotivasiBelajar",
      "#MicroHabits",
      "#SelfDevelopment",
      "#KebiasaanBaik"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 14,
    "date": "46355",
    "dayName": "Minggu",
    "pillar": "Motivation & Self-Development",
    "format": "Story/Question Box",
    "topic": "Apa yang sedang membuatmu kehilangan semangat?",
    "hook": "Buka kotak pertanyaan. Ingatkan audiens agar tidak membagikan informasi pribadi sensitif. Kelompokkan respons secara umum untuk ide konten lanjutan; jangan mendiagnosis.",
    "cta": "Tulis jawaban singkat di kotak pertanyaan.",
    "caption": "Ada banyak hal yang bisa memengaruhi semangat kita. Ceritakan tantanganmu melalui Question Box dan follow @go.counsel untuk ruang belajar dan refleksi.",
    "hashtags": [
      "#GoCounsel",
      "#RefleksiDiri",
      "#SelfDevelopment",
      "#StudentWellbeing",
      "#Psikologi"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 15,
    "date": "46356",
    "dayName": "Senin",
    "pillar": "Motivation & Self-Development",
    "format": "Reels",
    "topic": "Cara sederhana memulai saat sedang tidak termotivasi",
    "hook": "Tawarkan strategi memulai 2–5 menit, menyiapkan alat, dan mengurangi hambatan awal sebagai eksperimen pribadi.",
    "cta": "Coba mulai selama 5 menit.",
    "caption": "Tidak harus menunggu motivasi datang. Coba mulai dari langkah kecil selama lima menit dan lihat apa yang berubah. Follow @go.counsel untuk ide sederhana yang bisa dipraktikkan.",
    "hashtags": [
      "#GoCounsel",
      "#MulaiDulu",
      "#MotivasiBelajar",
      "#SelfDevelopment",
      "#MicroStep"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 16,
    "date": "46357",
    "dayName": "Selasa",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Carousel",
    "topic": "Bukan malas? Kenali hambatan di balik kebiasaan menunda",
    "hook": "Bedakan label “malas” dari faktor yang dapat dieksplorasi: lelah, takut gagal, bingung, beban tugas, atau distraksi. Jangan mendiagnosis audiens.",
    "cta": "Simpan sebagai bahan refleksi.",
    "caption": "Sebelum memberi label pada diri sendiri, coba kenali apa yang membuatmu sulit memulai. Bisa jadi kamu lelah, bingung, atau merasa tugas terlalu berat. Follow @go.counsel untuk refleksi yang lebih bermakna.",
    "hashtags": [
      "#GoCounsel",
      "#SelfAwareness",
      "#Prokrastinasi",
      "#RefleksiDiri",
      "#Psikologi"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 17,
    "date": "46358",
    "dayName": "Rabu",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Reels",
    "topic": "Minat, bakat, dan keterampilan: apa bedanya?",
    "hook": "Definisikan minat sebagai ketertarikan, bakat sebagai potensi/kecenderungan, dan keterampilan sebagai kemampuan yang berkembang lewat latihan.",
    "cta": "Menurutmu, apa minat yang ingin kamu eksplorasi?",
    "caption": "Minat, bakat, dan keterampilan saling berkaitan, tetapi bukan hal yang sama. Mengenal perbedaannya bisa menjadi awal eksplorasi diri. Follow @go.counsel untuk mengenali potensi diri.",
    "hashtags": [
      "#GoCounsel",
      "#MinatBakat",
      "#SelfDiscovery",
      "#PotensiDiri",
      "#CareerExploration"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 18,
    "date": "46359",
    "dayName": "Kamis",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Carousel",
    "topic": "Apakah hobi bisa menjadi petunjuk pilihan jurusan?",
    "hook": "Jelaskan bahwa hobi dapat menjadi petunjuk awal, tetapi perlu dipadukan dengan kemampuan, nilai, pengalaman, dan informasi jurusan.",
    "cta": "Tuliskan satu hobi dan bidang yang terkait.",
    "caption": "Hobi bisa menjadi salah satu petunjuk untuk mengenal diri, tetapi bukan satu-satunya dasar memilih jurusan. Padukan dengan kemampuan, nilai, dan eksplorasi informasi. Follow @go.counsel.",
    "hashtags": [
      "#GoCounsel",
      "#PilihJurusan",
      "#MinatBakat",
      "#CareerGuidance",
      "#MasaDepan"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 19,
    "date": "46360",
    "dayName": "Jumat",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Reels",
    "topic": "Kamu belum tahu kelebihanmu? Coba lihat pola pengalamanmu",
    "hook": "Ajak audiens mengamati aktivitas yang membuat penasaran, tantangan yang dinikmati, dan umpan balik yang sering diterima.",
    "cta": "Tanyakan kepada orang tepercaya tentang kekuatanmu.",
    "caption": "Kekuatan diri tidak selalu langsung terlihat. Coba amati aktivitas yang kamu nikmati, tantangan yang ingin kamu coba, dan hal baik yang sering dilihat orang lain darimu. Follow @go.counsel.",
    "hashtags": [
      "#GoCounsel",
      "#KekuatanDiri",
      "#SelfAwareness",
      "#SelfDiscovery",
      "#PengembanganDiri"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 20,
    "date": "46361",
    "dayName": "Sabtu",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Story/Quiz",
    "topic": "Aktivitas mana yang paling ingin kamu eksplorasi?",
    "hook": "Pilihan: Menganalisis informasi/Membuat karya/Membantu orang/Merancang sesuatu. Tegaskan bahwa ini pemantik refleksi, bukan tes minat-bakat tervalidasi.",
    "cta": "Pilih aktivitas yang paling membuatmu penasaran.",
    "caption": "Rasa penasaran bisa menjadi awal untuk mengenali diri. Ikuti kuis ringan di Story dan follow @go.counsel untuk eksplorasi minat dan potensi.",
    "hashtags": [
      "#GoCounsel",
      "#MinatBakat",
      "#SelfDiscovery",
      "#PotensiDiri",
      "#CareerExploration"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 21,
    "date": "46362",
    "dayName": "Minggu",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Story/Poll",
    "topic": "Saat mencoba hal baru, kamu lebih suka...?",
    "hook": "Polling: Langsung praktik/Mencari tahu dulu. Lanjutkan dengan question box: “Hal baru apa yang ingin kamu coba?” Jangan menyimpulkan bakat dari polling.",
    "cta": "Vote dan ceritakan hal baru yang ingin dicoba.",
    "caption": "Setiap perjalanan eksplorasi bisa dimulai dengan cara berbeda. Bagikan pilihanmu di Story dan follow @go.counsel untuk terus mengenali diri.",
    "hashtags": [
      "#GoCounsel",
      "#EksplorasiDiri",
      "#MinatBakat",
      "#StudentDevelopment",
      "#BeraniMencoba"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 22,
    "date": "46363",
    "dayName": "Senin",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Carousel",
    "topic": "Jangan buru-buru memberi label: aku tidak berbakat",
    "hook": "Bahas pentingnya kesempatan mencoba, latihan, dukungan, dan pengalaman. Hindari menganggap bakat sebagai sesuatu yang sepenuhnya tetap.",
    "cta": "Apa hal baru yang ingin kamu coba?",
    "caption": "Belum mahir bukan berarti tidak berbakat. Kesempatan mencoba, latihan, dan dukungan dapat membuka kemampuan yang belum kita kenali. Follow @go.counsel untuk terus mengeksplorasi diri.",
    "hashtags": [
      "#GoCounsel",
      "#GrowthMindset",
      "#PotensiDiri",
      "#MinatBakat",
      "#BeraniMencoba"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 23,
    "date": "46364",
    "dayName": "Selasa",
    "pillar": "Interest, Talent & Self-Discovery",
    "format": "Reels",
    "topic": "3 pertanyaan untuk mulai mengenali potensi diri",
    "hook": "Ajak audiens bertanya: apa yang membuatmu penasaran, aktivitas apa yang ingin dilatih, dan masalah apa yang ingin kamu bantu selesaikan?",
    "cta": "Jawab satu pertanyaan di kolom komentar.",
    "caption": "Mengenali potensi bisa dimulai dari rasa penasaran, hal yang ingin kamu latih, dan masalah yang ingin kamu bantu selesaikan. Follow @go.counsel untuk perjalanan mengenal diri.",
    "hashtags": [
      "#GoCounsel",
      "#PotensiDiri",
      "#SelfDiscovery",
      "#RefleksiDiri",
      "#StudentDevelopment"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 24,
    "date": "46365",
    "dayName": "Rabu",
    "pillar": "Career & Study Program Exploration",
    "format": "Carousel",
    "topic": "Minat saja cukup untuk memilih jurusan?",
    "hook": "Perkenalkan empat pertimbangan: minat, kemampuan yang ingin dikembangkan, nilai/tujuan, dan realitas pendidikan/karier.",
    "cta": "Simpan sebagai checklist awal.",
    "caption": "Memilih jurusan tidak cukup hanya berdasarkan minat. Pertimbangkan juga kemampuan, nilai pribadi, tujuan, serta informasi pendidikan dan karier. Follow @go.counsel untuk eksplorasi masa depan.",
    "hashtags": [
      "#GoCounsel",
      "#PilihJurusan",
      "#CareerPlanning",
      "#MinatBakat",
      "#MasaDepan"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 25,
    "date": "46366",
    "dayName": "Kamis",
    "pillar": "Career & Study Program Exploration",
    "format": "Reels",
    "topic": "Kenapa banyak siswa bingung memilih jurusan?",
    "hook": "Bahas terlalu banyak pilihan, informasi yang bertentangan, tekanan keluarga/teman, takut salah, dan belum cukup eksplorasi.",
    "cta": "Apa yang paling membuatmu bingung?",
    "caption": "Bingung memilih jurusan bisa muncul karena banyak pilihan, tekanan sekitar, atau informasi yang belum lengkap. Kamu tidak harus memutuskan tanpa eksplorasi. Follow @go.counsel.",
    "hashtags": [
      "#GoCounsel",
      "#BingungPilihJurusan",
      "#CareerGuidance",
      "#SiswaSMA",
      "#MasaDepan"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 26,
    "date": "46367",
    "dayName": "Jumat",
    "pillar": "Career & Study Program Exploration",
    "format": "Carousel",
    "topic": "Memilih jurusan karena ikut teman: apa risikonya?",
    "hook": "Jelaskan bahwa kebutuhan, minat, kemampuan, dan tujuan tiap orang berbeda. Teman bisa menjadi sumber informasi, bukan penentu keputusan.",
    "cta": "Diskusikan pilihanmu dengan orang yang tepat.",
    "caption": "Teman bisa menjadi sumber cerita dan informasi, tetapi pilihan jurusan perlu disesuaikan dengan dirimu. Kenali kebutuhan dan tujuanmu sebelum memutuskan. Follow @go.counsel.",
    "hashtags": [
      "#GoCounsel",
      "#PilihJurusan",
      "#CareerExploration",
      "#KenaliDiri",
      "#BimbinganKarier"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 27,
    "date": "46368",
    "dayName": "Sabtu",
    "pillar": "Career & Study Program Exploration",
    "format": "Story/Quiz",
    "topic": "Kuis: Apa yang perlu dicek sebelum memilih jurusan?",
    "hook": "Pilihan: Kurikulum/Biaya kuliah/Jalur masuk/Semuanya perlu diperiksa. Slide berikutnya tekankan pentingnya informasi resmi kampus.",
    "cta": "Ikuti kuis dan simpan checklist riset jurusan.",
    "caption": "Memilih jurusan perlu eksplorasi informasi, bukan hanya mengikuti tren. Ikuti kuis di Story dan follow @go.counsel untuk panduan pendidikan dan karier.",
    "hashtags": [
      "#GoCounsel",
      "#PilihJurusan",
      "#CareerGuidance",
      "#InfoKuliah",
      "#MasaDepan"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 28,
    "date": "46369",
    "dayName": "Minggu",
    "pillar": "Career & Study Program Exploration",
    "format": "Story/Poll",
    "topic": "Apa yang paling membuatmu bingung memilih jurusan?",
    "hook": "Polling: Terlalu banyak pilihan/Takut salah memilih. Lanjutkan dengan question box untuk jawaban lain. Gunakan respons sebagai bahan konten, bukan diagnosis.",
    "cta": "Pilih yang paling menggambarkan tantanganmu.",
    "caption": "Kebingungan memilih jurusan bisa punya banyak penyebab. Ikuti polling dan follow @go.counsel untuk mengeksplorasi pilihan dengan lebih terarah.",
    "hashtags": [
      "#GoCounsel",
      "#BingungPilihJurusan",
      "#CareerExploration",
      "#SiswaSMA",
      "#BimbinganKarier"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 29,
    "date": "46370",
    "dayName": "Senin",
    "pillar": "Career & Study Program Exploration",
    "format": "Reels",
    "topic": "Kuliah Psikologi belajar apa saja?",
    "hook": "Soroti psikologi perkembangan, sosial, kepribadian, klinis, metode penelitian, dan statistika. Ingatkan kurikulum berbeda antar kampus.",
    "cta": "Follow untuk mengenal jurusan lainnya.",
    "caption": "Kuliah Psikologi tidak hanya membahas kepribadian. Ada psikologi perkembangan, sosial, klinis, penelitian, statistika, dan banyak bidang lain. Follow @go.counsel untuk mengenal berbagai jurusan.",
    "hashtags": [
      "#GoCounsel",
      "#KuliahPsikologi",
      "#InfoJurusan",
      "#CareerExploration",
      "#DuniaKuliah"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  },
  {
    "day": 30,
    "date": "46371",
    "dayName": "Selasa",
    "pillar": "Career & Study Program Exploration",
    "format": "Carousel",
    "topic": "Checklist riset jurusan sebelum mendaftar kuliah",
    "hook": "Ajak siswa memeriksa mata kuliah, metode belajar, akreditasi, biaya, lokasi, jalur masuk, peluang praktik, dan sumber informasi resmi.",
    "cta": "Gunakan checklist ini sebelum menentukan pilihan.",
    "caption": "Sebelum mendaftar, cari tahu lebih dari sekadar nama jurusan. Periksa kurikulum, biaya, jalur masuk, dan informasi resmi kampus. Follow @go.counsel untuk persiapan masa depan.",
    "hashtags": [
      "#GoCounsel",
      "#ChecklistKuliah",
      "#PilihJurusan",
      "#InfoKampus",
      "#CareerPlanning"
    ],
    "isPublished": false,
    "readyChecklist": {
      "contentReady": false,
      "captionReady": true,
      "scheduled": false
    }
  }
];

export const initialNeuroModules: NeuroModule[] = [
  {
    month: 1,
    title: 'Introduction to Neuroeducation',
    topics: [
      'Pengertian dan ruang lingkup Neuroeducation',
      'Hubungan neuroscience, psychology, dan education',
      'Perkembangan bidang educational neuroscience',
      'Perbedaan neuroscience, cognitive neuroscience, dan neuroeducation',
      'Cara membaca klaim neuroscience dalam dunia pendidikan'
    ],
    targetOutputs: [
      'Peta konsep Neuroeducation',
      'Daftar istilah dasar (glossary)',
      'Catatan bacaan awal'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Fondasi pemahaman epistemologis dan batasan ruang lingkup.',
    references: ['Ansari & Coch (2006) - Bridges over troubled waters', 'Tokuhama-Espinosa (2019) - Neuromyths in Education'],
    proofLinks: []
  },
  {
    month: 2,
    title: 'Basic Neuroscience for Learning',
    topics: [
      'Struktur dasar otak manusia',
      'Neuron, sinaps, dan transmisi sinyal',
      'Neuroplasticity dan adaptasi belajar',
      'Peran Prefrontal Cortex (PFC)',
      'Fungsi Hippocampus dan konsolidasi',
      'Amygdala dan regulasi rasa aman',
      'Sistem saraf otonom dan pengaruhnya pada pembelajaran'
    ],
    targetOutputs: [
      'Diagram struktur dan fungsi otak yang relevan dengan pembelajaran',
      'Ringkasan konsep dasar neuroscience'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Pahami fungsi tanpa menyederhanakan secara berlebihan.',
    references: ['Kandel et al. - Principles of Neural Science', 'Purves et al. - Neuroscience'],
    proofLinks: []
  },
  {
    month: 3,
    title: 'Cognitive Processes in Education',
    topics: [
      'Attention dan mekanisme seleksi stimulus',
      'Perception dan interpretasi sensori',
      'Working Memory dan batas kapasitasnya',
      'Long-term Memory (deklaratif & prosedural)',
      'Information Processing Theory',
      'Cognitive Load Theory (instrinsik, germane, extraneous)',
      'Executive Functions dalam aktivitas belajar'
    ],
    targetOutputs: [
      'Peta proses kognitif dalam pembelajaran',
      'Ringkasan hubungan perhatian, memori, dan pembelajaran'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Kaitan langsung dengan desain instruksional bimbingan.',
    references: ['Sweller (1988) - Cognitive Load Theory', 'Baddeley (2000) - The episodic buffer'],
    proofLinks: []
  },
  {
    month: 4,
    title: 'Learning & Memory Science',
    topics: [
      'Encoding, storage, dan retrieval mechanisms',
      'Memory consolidation selama tidur dan istirahat',
      'Forgetting curve dan retention dynamics',
      'Spaced Practice (efek distribusi waktu)',
      'Retrieval Practice (testing effect)',
      'Strategi belajar berbasis bukti ilmiah'
    ],
    targetOutputs: [
      'Review literatur tentang learning and memory',
      'Panduan rekomendasi strategi belajar berbasis bukti'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Sangat esensial untuk konten GO.COUNSEL dan artikel Mikro Thinking.',
    references: ['Roediger & Karpicke (2006) - Test-Enhanced Learning', 'Dunlosky et al. (2013) - Improving Students Learning'],
    proofLinks: []
  },
  {
    month: 5,
    title: 'Adolescent Brain Development',
    topics: [
      'Maturasi otak remaja dan ketidakseimbangan sistem limbik vs PFC',
      'Executive function development pada usia pubertas',
      'Impulse control dan self-regulation',
      'Reward sensitivity dan dopaminergic response',
      'Decision-making dalam konteks sosial',
      'Social cognition dan pengaruh peer group',
      'Perkembangan emosi dan dinamika lingkungan sekolah'
    ],
    targetOutputs: [
      'Ringkasan literatur tentang perkembangan otak remaja',
      'Catatan implikasi untuk layanan Bimbingan dan Konseling remaja'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Koneksi sentral antara profesi Guru BK dan riset Neuroeducation.',
    references: ['Blakemore (2018) - Inventing Ourselves: The Secret Life of the Teenage Brain', 'Steinberg (2008) - A Social Neuroscience Perspective on Adolescent Risk-Taking'],
    proofLinks: []
  },
  {
    month: 6,
    title: 'Emotion, Motivation & Learning',
    topics: [
      'Interaksi dua arah antara emosi dan kognisi',
      'Pengaruh stres kronis vs akut terhadap fungsi hippocampus & PFC',
      'Sistem motivasi, dopamin, dan reward system',
      'Emotional regulation dan intervensi kognitif',
      'Social and Emotional Learning (SEL)',
      'Pengaruh iklim psikologis terhadap kapasitas berpikir'
    ],
    targetOutputs: [
      'Literature review tentang emotion, motivation, and learning',
      'Ringkasan implikasi untuk layanan pendidikan dan konseling'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Dasar teoretis kuat untuk konsultasi siswa berkinerja menurun.',
    references: ['Immordino-Yang & Damasio (2007) - We Feel, Therefore We Learn', 'Ryan & Deci (2000) - Self-Determination Theory'],
    proofLinks: []
  },
  {
    month: 7,
    title: 'Sleep, Stress & Learning Environment',
    topics: [
      'Fungsi tidur terhadap pembersihan metabolik dan memori',
      'Dampak physiological stress terhadap neurogenesis',
      'Psychological safety di ruang kelas dan konseling',
      'Desain lingkungan fisik dan sosial yang kondusif',
      'Aktivitas fisik (aerobik) dan neurotropin (BDNF)',
      'Keseimbangan istirahat dan beban kerja kognitif'
    ],
    targetOutputs: [
      'Research summary tentang sleep, stress, and learning',
      'Rekomendasi lingkungan belajar yang mendukung perkembangan siswa'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Menegaskan filosofi bahwa istirahat adalah bagian dari proses belajar.',
    references: ['Walker (2017) - Why We Sleep', 'Ratey (2008) - Spark: The Revolutionary New Science of Exercise and the Brain'],
    proofLinks: []
  },
  {
    month: 8,
    title: 'Evidence-Based Teaching & Learning',
    topics: [
      'Penerapan Cognitive Science dalam perancangan materi',
      'Umpan balik (feedback) yang efektif dan formatif',
      'Retrieval practice dan spaced learning terintegrasi',
      'Cognitive load management dalam modul ajar',
      'Prinsip instructional design yang berorientasi otak',
      'Diferensiasi pendekatan belajar berbasis bukti'
    ],
    targetOutputs: [
      'Rancangan intervensi atau aktivitas pembelajaran berbasis bukti',
      'Justifikasi ilmiah dari strategi yang dipilih'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Aplikasi praktis di kelas bimbingan klasikal BK.',
    references: ['Hattie (2009) - Visible Learning', 'Mayer (2014) - The Cambridge Handbook of Multimedia Learning'],
    proofLinks: []
  },
  {
    month: 9,
    title: 'Individual Differences & Learning Difficulties',
    topics: [
      'Variasi individual dalam profil kognitif',
      'Neurodevelopmental disorders (ADHD, Disleksia, ASD)',
      'Konsep Neurodiversity dan de-stigmatisasi',
      'Inclusive education berlandaskan pemahaman neurobiologis',
      'Neuromyths dalam pendidikan (Left/Right brain, Learning styles VAK)',
      'Identifikasi mitos dan literatur sanggahannya'
    ],
    targetOutputs: [
      'Critical review tentang individual differences dalam pembelajaran',
      'Katalog Neuromyths dan bukti ilmiah yang membantahnya'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Sangat krusial untuk menjaga rigor akademik dan tidak termakan tren pseudosains.',
    references: ['Howard-Jones (2014) - Neuroscience and education: myths and messages', 'Armstrong (2012) - Neurodiversity in the Classroom'],
    proofLinks: []
  },
  {
    month: 10,
    title: 'Research Methodology in Neuroeducation',
    topics: [
      'Merumuskan research question yang terukur dan bermakna',
      'Desain eksperimental dan kuasi-eksperimental di ranah sekolah',
      'Correlational research dan batas interpretasi klaim kausalitas',
      'Systematic literature review dan Scoping review protocols',
      'Etika penelitian yang melibatkan siswa dan anak di bawah umur',
      'Metodologi penulisan proposal riset'
    ],
    targetOutputs: [
      'Research question terdefinisi dengan jelas',
      'Draft proposal penelitian Neuroeducation',
      'Rancangan metodologi awal'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Langkah kunci transisi menuju calon Remote Research Assistant.',
    references: ['Creswell (2018) - Research Design', 'Moher et al. (2009) - PRISMA Statement'],
    proofLinks: []
  },
  {
    month: 11,
    title: 'Data Analysis & Academic Writing',
    topics: [
      'Statistika deskriptif dan inferensial untuk ilmu perilaku',
      'Analisis data kuantitatif menggunakan Excel / jamovi / SPSS',
      'Analisis data kualitatif dan Thematic Analysis dasar',
      'Critical appraisal terhadap instrumen dan validitas temuan',
      'Academic writing style: kejelasan, konsistensi, dan ketelitian argumen',
      'Pedoman sitasi dan referensi APA 7th Edition'
    ],
    targetOutputs: [
      'Contoh analisis data (data analysis sample)',
      'Sampel penulisan akademik (academic writing sample)',
      'Mini research report draft'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Karya nyata yang langsung masuk ke Academic Portfolio.',
    references: ['Field (2018) - Discovering Statistics using IBM SPSS / jamovi', 'APA Style Manual 7th Edition (2020)'],
    proofLinks: []
  },
  {
    month: 12,
    title: 'Research Portfolio & S2 Preparation',
    topics: [
      'Penyusunan kurasi academic portfolio',
      'Pengembangan research interest yang tajam untuk studi S2',
      'Identifikasi calon topik tesis / riset master dan calon supervisor',
      'Penyusunan Academic CV berstandar internasional',
      'Finalisasi Research Proposal',
      'Strategi aplikasi Remote Research Assistant dan beasiswa S2'
    ],
    targetOutputs: [
      'Neuroeducation research portfolio lengkap',
      'Proposal penelitian siap kirim',
      'Academic CV',
      'Pernyataan research interest (Statement of Purpose draft)',
      'Roadmap pengembangan akademik tahun berikutnya'
    ],
    status: 'Not Started',
    studyHours: 0,
    understandingLevel: 1,
    notes: 'Puncak kulminasi roadmap: siap mendaftar posisi RA dan program master.',
    references: ['Alon (2009) - How to choose a good scientific problem', 'Nature Career Guide (2023) - Research assistant applications'],
    proofLinks: []
  }
];

export const initialResearchSkills: ResearchSkill[] = [
  { id: 'rs-1', number: 1, name: 'Research methodology', linkedMonth: 10, description: 'Memahami perbedaan desain eksperimental, korelasional, kuasi-eksperimen, dan telaah pustaka sistematis.', status: 'Not Started', practiceOutput: 'Penyusunan proposal metodologi penelitian Neuroeducation.' },
  { id: 'rs-2', number: 2, name: 'Academic database searching', linkedMonth: 1, description: 'Keahlian mencari jurnal di Scopus, ERIC, PsycINFO, PubMed, Google Scholar menggunakan Boolean operators.', status: 'Not Started', practiceOutput: 'Daftar query pencarian dan hasil kurasi artikel primer.' },
  { id: 'rs-3', number: 3, name: 'Literature search', linkedMonth: 3, description: 'Menyusun strategi pencarian literatur yang komprehensif dan terdokumentasi rapi.', status: 'Not Started', practiceOutput: 'Diagram alur pencarian literatur (PRISMA flow dasar).' },
  { id: 'rs-4', number: 4, name: 'Literature review', linkedMonth: 4, description: 'Sintesis temuan dari berbagai jurnal ilmiah ke dalam tinjauan pustaka tematik yang kritis.', status: 'Not Started', practiceOutput: 'Dokumen literature matrix dan narasi sintesis.' },
  { id: 'rs-5', number: 5, name: 'Critical appraisal', linkedMonth: 5, description: 'Mengevaluasi metodologi, ukuran sampel, potensi bias, dan kekuatan bukti dari sebuah paper.', status: 'Not Started', practiceOutput: 'Catatan telaah kritis terhadap 3 paper eksperimen.' },
  { id: 'rs-6', number: 6, name: 'Quantitative research', linkedMonth: 10, description: 'Perancangan instrumen survei/tes kognitif, reliabilitas, dan validitas konstruk.', status: 'Not Started', practiceOutput: 'Kuesioner dan blueprint instrumen teruji.' },
  { id: 'rs-7', number: 7, name: 'Qualitative research', linkedMonth: 10, description: 'Wawancara semi-terstruktur, observasi, dan coding kualitatif.', status: 'Not Started', practiceOutput: 'Protokol wawancara dan transkrip ringkas.' },
  { id: 'rs-8', number: 8, name: 'Basic statistics', linkedMonth: 11, description: 'Penguasaan mean, SD, t-test, ANOVA, korelasi Pearson/Spearman, serta uji signifikansi.', status: 'Not Started', practiceOutput: 'Laporan interpretasi p-value dan effect size.' },
  { id: 'rs-9', number: 9, name: 'Data analysis menggunakan Excel atau jamovi/SPSS', linkedMonth: 11, description: 'Analisis statistik praktis dengan software open-source jamovi atau Excel.', status: 'Not Started', practiceOutput: 'File analisis dataset (.omv atau .xlsx) dengan visualisasi grafik.' },
  { id: 'rs-10', number: 10, name: 'Data cleaning', linkedMonth: 11, description: 'Pemeriksaan missing values, deteksi outliers, dan standardisasi format variabel.', status: 'Not Started', practiceOutput: 'Log proses data cleaning sebelum pengolahan statistik.' },
  { id: 'rs-11', number: 11, name: 'Zotero reference management', linkedMonth: 1, description: 'Pengelolaan sitasi, metadata, PDF tagging, dan integrasi word processor otomatis.', status: 'Not Started', practiceOutput: 'Perpustakaan Zotero berstruktur folder rapi.' },
  { id: 'rs-12', number: 12, name: 'Academic writing', linkedMonth: 11, description: 'Penulisan esai ilmiah dengan struktur IMRaD yang kohesif, objektif, dan bernalar logis.', status: 'Not Started', practiceOutput: 'Naskah artikel ilmiah berstandar peer-review.' },
  { id: 'rs-13', number: 13, name: 'APA 7 referencing', linkedMonth: 11, description: 'Kepatuhan format sitasi dalam teks dan daftar pustaka APA edisi ke-7.', status: 'Not Started', practiceOutput: 'Daftar pustaka bebas error format sitasi.' },
  { id: 'rs-14', number: 14, name: 'Research ethics', linkedMonth: 10, description: 'Informed consent, anonimitas, perlindungan subjek rentan, dan prinsip etika deklarasi Helsinki.', status: 'Not Started', practiceOutput: 'Form informed consent dan etika riset bimbingan.' },
  { id: 'rs-15', number: 15, name: 'Academic English', linkedMonth: 2, description: 'Kemampuan membaca teks sains bahasa Inggris dan menulis abstract dengan vocabulary formal.', status: 'Not Started', practiceOutput: 'Glosarium akademik dan draf abstrak bahasa Inggris.' },
  { id: 'rs-16', number: 16, name: 'Research collaboration', linkedMonth: 12, description: 'Komunikasi profesional dengan supervisor, peer reviewer, dan tim riset jarak jauh.', status: 'Not Started', practiceOutput: 'Draf email korespondensi riset akademik.' },
  { id: 'rs-17', number: 17, name: 'Academic CV dan portfolio', linkedMonth: 12, description: 'Penyusunan portofolio akademik berbasis bukti karya dan rekam jejak kegiatan ilmiah.', status: 'Not Started', practiceOutput: 'Curriculum Vitae akademik format 2 halaman.' },
  { id: 'rs-18', number: 18, name: 'Remote Research Assistant application skills', linkedMonth: 12, description: 'Penyusunan cover letter yang ditargetkan, personal statement, dan portofolio ke lab riset.', status: 'Not Started', practiceOutput: 'Paket aplikasi lengkap untuk posisi Remote RA.' }
];

export const initialPortfolioItems: PortfolioItem[] = [
  { id: 'port-1', number: 1, title: 'Academic CV', category: 'Identity & Track Record', description: 'Curriculum Vitae akademik komprehensif yang menonjolkan fokus Neuroeducation, latar belakang Guru BK, publikasi, dan keahlian riset.', status: 'Not Started', createdDate: '2027-01-01', fileUrl: '', proofDescription: '', devNotes: 'Update berkala tiap kuartal.' },
  { id: 'port-2', number: 2, title: 'Critical reading notes', category: 'Academic Rigor', description: 'Kumpulan catatan telaah kritis terhadap jurnal primer neurosains dan pendidikan.', status: 'Not Started', createdDate: '2027-01-01', fileUrl: '', proofDescription: '', devNotes: 'Mengikuti Bulan 1-5 Neuroeducation.' },
  { id: 'port-3', number: 3, title: 'Literature review', category: 'Academic Writing', description: 'Tinjauan pustaka tematis yang mendalam (misal: Learning & Memory atau Adolescent Brain).', status: 'Not Started', createdDate: '2027-04-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 4.' },
  { id: 'port-4', number: 4, title: 'Research proposal', category: 'Methodology', description: 'Proposal penelitian lengkap mencakup latar belakang, research question, metodologi, dan telaah pustaka.', status: 'Not Started', createdDate: '2027-10-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 10.' },
  { id: 'port-5', number: 5, title: 'Data analysis sample', category: 'Quantitative Competency', description: 'Bukti pengerjaan analisis data kuantitatif menggunakan jamovi/Excel beserta interpretasi temuan.', status: 'Not Started', createdDate: '2027-11-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 11.' },
  { id: 'port-6', number: 6, title: 'Qualitative analysis sample', category: 'Qualitative Competency', description: 'Sampel analisis tematik dari transkrip wawancara bimbingan atau observasi kelas.', status: 'Not Started', createdDate: '2027-11-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 11.' },
  { id: 'port-7', number: 7, title: 'Academic writing sample', category: 'Academic Writing', description: 'Naskah artikel ilmiah atau esai akademik berstandar publikasi jurnal.', status: 'Not Started', createdDate: '2027-11-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 11.' },
  { id: 'port-8', number: 8, title: 'Research collaboration', category: 'Professional Network', description: 'Dokumentasi proyek penelitian kolaboratif bersama dosen, konselor lain, atau komunitas ilmiah.', status: 'Not Started', createdDate: '2027-12-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 12.' },
  { id: 'port-9', number: 9, title: 'Public speaking documentation', category: 'Outreach & Impact', description: 'Sertifikat, materi presentasi, dan dokumentasi saat menjadi pembicara/narasumber workshop/webinar.', status: 'Not Started', createdDate: '2027-01-01', fileUrl: '', proofDescription: '', devNotes: 'Terhubung dengan Professional Growth.' },
  { id: 'port-10', number: 10, title: 'Volunteer documentation', category: 'Outreach & Impact', description: 'Rekam jejak dan surat keterangan aktivitas kerelawanan di bidang edukasi dan kesehatan mental.', status: 'Not Started', createdDate: '2027-01-01', fileUrl: '', proofDescription: '', devNotes: 'Terhubung dengan Professional Growth.' },
  { id: 'port-11', number: 11, title: 'Recommendation references', category: 'Endorsement', description: 'Daftar calon pemberi surat rekomendasi akademik (dosen pembimbing, kepala sekolah, rekan riset) dengan kontak valid.', status: 'Not Started', createdDate: '2027-12-01', fileUrl: '', proofDescription: '', devNotes: 'Persiapan pendaftaran S2.' },
  { id: 'port-12', number: 12, title: 'Neuroeducation research interest', category: 'S2 Preparation', description: 'Dokumen Statement of Research Interest yang mendefinisikan fokus penelitian spesifik untuk studi Master.', status: 'Not Started', createdDate: '2027-12-01', fileUrl: '', proofDescription: '', devNotes: 'Target output Bulan 12.' },
  { id: 'port-13', number: 13, title: 'Certificates and training', category: 'Competency', description: 'Kumpulan sertifikat pelatihan resmi di bidang bimbingan konseling, statistik, metodologi riset, atau neurosains.', status: 'Not Started', createdDate: '2027-01-01', fileUrl: '', proofDescription: '', devNotes: 'Diperbarui berkesinambungan.' },
  { id: 'port-14', number: 14, title: 'Academic presentation', category: 'Dissemination', description: 'Slide presentasi konferensi atau diseminasi gagasan riset berstandar akademik formal.', status: 'Not Started', createdDate: '2027-12-01', fileUrl: '', proofDescription: '', devNotes: 'Target akhir Bulan 12.' }
];

export const initialLiterature: LiteratureReference[] = [
  {
    id: 'lit-1',
    title: 'Bridges over troubled waters: education and cognitive neuroscience',
    authors: 'Ansari, D., & Coch, D.',
    year: 2006,
    journal: 'Trends in Cognitive Sciences, 10(4), 146-151',
    doiOrUrl: 'https://doi.org/10.1016/j.tics.2006.02.007',
    topicCategory: 'Neuroeducation',
    methodology: 'Theoretical & Conceptual Review',
    keyFindings: 'Menjelaskan jembatan interdisipliner antara sains kognitif dan praktik pendidikan, serta batasan klaim laboratorium.',
    criticalNotes: 'Menekankan pentingnya tidak langsung menerapkan temuan fMRI mentah ke instruksi kelas tanpa uji pedagogis.',
    readingStatus: 'Reading',
    dateAdded: '2027-01-05'
  },
  {
    id: 'lit-2',
    title: 'Neuromyths in education: Prevalence and predictors of misconceptions among teachers',
    authors: 'Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J.',
    year: 2012,
    journal: 'Frontiers in Psychology, 3, 429',
    doiOrUrl: 'https://doi.org/10.3389/fpsyg.2012.00429',
    topicCategory: 'Neuroeducation',
    methodology: 'Empirical Survey (Quantitative)',
    keyFindings: 'Guru yang antusias terhadap neurosains sering kali justru lebih rentan mempercayai neuromyths seperti learning styles.',
    criticalNotes: 'Kebutuhan mendesak akan literasi neuroedukasi yang kritis bagi praktisi bimbingan dan pendidik.',
    readingStatus: 'Completed',
    dateAdded: '2027-01-10'
  },
  {
    id: 'lit-3',
    title: 'Test-enhanced learning in a middle school science classroom: The effects of retrieval practice',
    authors: 'McDaniel, M. A., Agarwal, P. K., Halamish, V., et al.',
    year: 2011,
    journal: 'Journal of Educational Psychology, 103(2), 399',
    doiOrUrl: 'https://doi.org/10.1037/a0021782',
    topicCategory: 'Learning & Memory',
    methodology: 'Classroom Quasi-Experiment',
    keyFindings: 'Retrieval practice (kuis tanpa nilai) secara signifikan meningkatkan retensi materi sains hingga beberapa bulan kemudian.',
    criticalNotes: 'Sangat cocok untuk diadaptasi pada materi konten GO.COUNSEL dan tips belajar siswa SMA.',
    readingStatus: 'To Read',
    dateAdded: '2027-01-15'
  }
];

export const initialProfessionalActivities: ProfessionalActivity[] = [
  {
    id: 'pa-1',
    title: 'Relawan Fasilitator Edukasi Kesehatan Mental Remaja',
    category: 'Volunteering',
    organization: 'Komunitas Remaja Bertumbuh',
    date: '2027-02-14',
    role: 'Fasilitator Workshop',
    locationOrFormat: 'Daring (Zoom)',
    status: 'Interested',
    contactUrl: 'https://instagram.com/remajabertumbuh',
    outcomes: 'Membimbing 30 siswa SMA mengenali regulasi emosi.',
    proofUrl: '',
    followUp: 'Kirim portofolio materi konseling ke koordinator relawan.',
    personalNotes: 'Peluang baik untuk menguji materi edukasi Neuroeducation sederhana.'
  }
];

export const initialConnections: ProfessionalConnection[] = [
  {
    id: 'conn-1',
    name: 'Dr. Hendra Wibowo, M.Psi., Psikolog',
    organization: 'Laboratorium Psikologi Perkembangan & Kognisi Universitas',
    expertise: 'Cognitive Development & Neuroeducation',
    context: 'Pertemuan di webinar Asosiasi Bimbingan Konseling Indonesia.',
    dateMet: '2026-11-20',
    contactUrl: 'hendra.wibowo@univ.ac.id',
    interactionNotes: 'Tertarik dengan aplikasi neuroedukasi pada siswa SMA.',
    followUpPlan: 'Kirim draft proposal mini riset pada pertengahan tahun untuk kemungkinan kolaborasi.'
  }
];

export const initialAppData: AppData = {
  version: '1.0.0',
  lastModified: new Date().toISOString(),
  dailySchedule: initialDailySchedule,
  tuesdaySchedule: initialTuesdaySchedule,
  weeklyFocus: initialWeeklyFocus,
  scheduleConflicts: initialScheduleConflicts,
  activityLogs: {},
  quickCaptures: [
    {
      id: 'qc-1',
      text: 'Ide episode Mikro Thinking: Mengapa otak kita butuh jeda istirahat untuk memproses makna baru.',
      category: 'idea',
      targetModule: 'Mikro Thinking ID',
      createdAt: new Date().toISOString(),
      isProcessed: false
    }
  ],
  mikroEpisodes: initialMikroEpisodes,
  goCounselCalendar: initialGoCounselCalendar,
  neuroModules: initialNeuroModules,
  researchSkills: initialResearchSkills,
  literature: initialLiterature,
  professionalActivities: initialProfessionalActivities,
  connections: initialConnections,
  portfolio: initialPortfolioItems,
  monthlyReviews: [],
  energyLogs: {},
  settings: {
    conflictHandling: 'proposed',
    customConflictTime: '18.30–19.30',
    todayFocus: 'Membaca 1 bab literatur Neuroeducation & menyusun outline video Mikro Thinking.'
  }
};
