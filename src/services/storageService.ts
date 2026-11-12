import { AppData } from '../types';
import { initialAppData, initialDailySchedule, initialTuesdaySchedule, initialWeeklyFocus } from '../data/initialData';

const STORAGE_KEY = 'my_growth_space_data_2027_v1';

export class StorageService {
  private static subscribers: Array<(data: AppData) => void> = [];

  static subscribe(callback: (data: AppData) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private static notify(data: AppData) {
    this.subscribers.forEach(cb => {
      try {
        cb(data);
      } catch (e) {
        console.error('Error notifying storage subscriber:', e);
      }
    });
  }

  static load(): AppData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(initialAppData);
        return initialAppData;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.version) {
        console.warn('Data format legacy or corrupted. Using initial data.');
        this.save(initialAppData);
        return initialAppData;
      }
      // Check if schedule needs to be updated to Personal_Operating_System_2027.xlsx
      const needsScheduleUpdate = 
        !parsed.tuesdaySchedule ||
        parsed.dailySchedule?.length !== initialDailySchedule.length ||
        !parsed.dailySchedule?.some((i: any) => i.activity?.includes('Waktu ibadah')) ||
        parsed.weeklyFocus?.[1]?.focusTitle === 'Mikro Thinking ID';

      if (needsScheduleUpdate) {
        console.info('Memperbarui jadwal sesuai Personal_Operating_System_2027.xlsx...');
        const updatedWithNewSchedule: AppData = {
          ...parsed,
          dailySchedule: initialDailySchedule,
          tuesdaySchedule: initialTuesdaySchedule,
          weeklyFocus: initialWeeklyFocus,
          version: '1.1.0',
          lastModified: new Date().toISOString(),
        };
        this.save(updatedWithNewSchedule);
        return updatedWithNewSchedule;
      }

      return parsed as AppData;
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
      return initialAppData;
    }
  }

  static save(data: AppData): void {
    try {
      const updated: AppData = {
        ...data,
        lastModified: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      this.notify(updated);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  static exportToJson(data: AppData): void {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const filename = `my-growth-space-backup-${today}.json`;
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      throw new Error('Gagal mengekspor data backup.');
    }
  }

  static validateImport(jsonString: string): { valid: boolean; data?: AppData; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { valid: false, error: 'File bukan format JSON yang valid.' };
      }
      const requiredKeys: (keyof AppData)[] = [
        'version',
        'dailySchedule',
        'weeklyFocus',
        'mikroEpisodes',
        'goCounselCalendar',
        'neuroModules',
        'researchSkills',
        'portfolio'
      ];
      for (const key of requiredKeys) {
        if (!(key in parsed)) {
          return { valid: false, error: `Struktur data tidak lengkap: kolom "${key}" tidak ditemukan.` };
        }
      }
      return { valid: true, data: parsed as AppData };
    } catch (err) {
      return { valid: false, error: 'File JSON rusak atau tidak terbaca.' };
    }
  }

  static resetToDefault(): AppData {
    this.save(initialAppData);
    return initialAppData;
  }
}
