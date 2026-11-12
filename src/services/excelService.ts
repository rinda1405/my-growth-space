import * as XLSX from 'xlsx';
import { GoCounselContent, GoCounselFormat, MikroEpisode } from '../types';

export class ExcelService {
  /**
   * Parse user uploaded GO.COUNSEL Excel or CSV file
   */
  static async parseGoCounselFile(file: File): Promise<GoCounselContent[]> {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Look for sheet named 'Kalender 30 Hari' or first sheet
    const sheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('kalender') || n.toLowerCase().includes('30')) || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const results: GoCounselContent[] = [];
    
    // Find header row
    let headerIdx = -1;
    for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
      const row = rawRows[i] || [];
      if (row.some((c: any) => String(c).toLowerCase().includes('hari ke') || String(c).toLowerCase().includes('pilar'))) {
        headerIdx = i;
        break;
      }
    }

    const startIndex = headerIdx !== -1 ? headerIdx + 1 : 0;

    for (let i = startIndex; i < rawRows.length; i++) {
      const row = rawRows[i] || [];
      if (!row || row.length === 0) continue;
      
      const dayVal = parseInt(String(row[0]).replace(/\D/g, ''), 10);
      if (isNaN(dayVal) || dayVal <= 0) continue;

      const formatRaw = String(row[4] || 'Reels').trim() as GoCounselFormat;
      const rawHashtags = String(row[9] || '');
      const hashtags = rawHashtags
        ? rawHashtags.split(' ').map((s: any) => String(s).trim()).filter((s: string) => s.startsWith('#'))
        : ['#GoCounsel', '#Neuroeducation'];

      results.push({
        day: dayVal,
        date: String(row[1] || ''),
        dayName: String(row[2] || ''),
        pillar: String(row[3] || 'Neuroeducation & Learning'),
        format: formatRaw,
        topic: String(row[5] || `Konten Hari ke-${dayVal}`),
        hook: String(row[6] || ''),
        cta: String(row[7] || ''),
        caption: String(row[8] || ''),
        hashtags,
        isPublished: false,
        readyChecklist: {
          contentReady: false,
          captionReady: Boolean(row[8]),
          scheduled: false,
        },
      });
    }

    if (results.length === 0) {
      throw new Error('Tidak ditemukan baris konten yang valid pada file ini.');
    }

    return results;
  }

  /**
   * Parse user uploaded Mikro Thinking Excel file
   */
  static async parseMikroThinkingFile(file: File): Promise<MikroEpisode[]> {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    
    const sheetName = workbook.SheetNames.find(n => n.toLowerCase().includes('18 episode') || n.toLowerCase().includes('kalender')) || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawRows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const results: MikroEpisode[] = [];
    
    let headerIdx = -1;
    for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
      const row = rawRows[i] || [];
      if (row.some((c: any) => String(c).toLowerCase().includes('episode') || String(c).toLowerCase().includes('judul video'))) {
        headerIdx = i;
        break;
      }
    }

    const startIndex = headerIdx !== -1 ? headerIdx + 1 : 0;

    for (let i = startIndex; i < rawRows.length; i++) {
      const row = rawRows[i] || [];
      if (!row || row.length === 0) continue;
      
      const epNum = String(row[1] || '').trim().padStart(2, '0');
      if (!epNum || epNum === '00' || isNaN(parseInt(epNum, 10))) continue;

      results.push({
        episodeNo: epNum,
        month: String(row[0] || ''),
        season: String(row[2] || 'Season 1'),
        title: String(row[3] || `Episode ${epNum}`),
        coreQuestion: String(row[4] || ''),
        direction: String(row[5] || ''),
        psychologicalLens: String(row[6] || ''),
        articleTitle: String(row[7] || ''),
        researchOutlineDate: String(row[8] || ''),
        articlePublishDate: String(row[9] || ''),
        videoPublishDate: String(row[10] || ''),
        videoStatus: 'Belum mulai',
        articleStatus: 'Belum mulai',
        notes: 'Diimpor dari file kalender eksternal.',
        referenceLinks: [],
      });
    }

    if (results.length === 0) {
      throw new Error('Tidak ditemukan data episode yang valid pada file ini.');
    }

    return results;
  }
}
