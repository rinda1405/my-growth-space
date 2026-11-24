import React, { useState } from 'react';
import { Modal } from './Modal';
import { QuickCaptureItem } from '../../types';
import { Lightbulb, CheckSquare, FileText, Send } from 'lucide-react';

interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<QuickCaptureItem, 'id' | 'createdAt' | 'isProcessed'>) => void;
}

export const QuickCaptureModal: React.FC<QuickCaptureModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'idea' | 'task' | 'note'>('idea');
  const [targetModule, setTargetModule] = useState<string>('Mikro Thinking ID');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSave({
      text: text.trim(),
      category,
      targetModule,
    });
    setText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Capture"
      subtitle="Catat ide, tugas, atau catatan tanpa perlu berpindah halaman."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory('idea')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              category === 'idea'
                ? 'bg-cyan text-navy border-cyan-400 font-semibold'
                : 'bg-white text-navy-500 border-navy/15 hover:bg-navy/5'
            }`}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Ide</span>
          </button>
          <button
            type="button"
            onClick={() => setCategory('task')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              category === 'task'
                ? 'bg-cyan text-navy border-cyan-400 font-semibold'
                : 'bg-white text-navy-500 border-navy/15 hover:bg-navy/5'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>Tugas</span>
          </button>
          <button
            type="button"
            onClick={() => setCategory('note')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              category === 'note'
                ? 'bg-cyan text-navy border-cyan-400 font-semibold'
                : 'bg-white text-navy-500 border-navy/15 hover:bg-navy/5'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Catatan</span>
          </button>
        </div>

        {/* Text Area */}
        <div>
          <label className="block text-xs font-medium text-navy-700 mb-1">
            Isi Tangkapan
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
            placeholder="Tuliskan gagasan atau tugas penting di sini..."
            className="w-full rounded-lg border border-navy/20 p-3 text-xs text-navy placeholder:text-navy-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            autoFocus
          />
        </div>

        {/* Target Module Dropdown */}
        <div>
          <label className="block text-xs font-medium text-navy-700 mb-1">
            Tautkan ke Modul (Opsional)
          </label>
          <select
            value={targetModule}
            onChange={e => setTargetModule(e.target.value)}
            className="w-full rounded-lg border border-navy/20 p-2 text-xs text-navy focus:border-cyan-500 focus:outline-none bg-white"
          >
            <option value="Research Tracker">Research Tracker (Pilar 2)</option>
            <option value="KTI Project Tracker">KTI Project Tracker (Pilar 1)</option>
            <option value="Community Tracker">Community Tracker (Pilar 3)</option>
            <option value="Outreach Log">Outreach Log (Networking)</option>
            <option value="Portfolio Evidence">Portfolio Evidence</option>
            <option value="Mikro Thinking ID">Mikro Thinking ID</option>
            <option value="GO.COUNSEL">GO.COUNSEL</option>
            <option value="Neuroeducation Roadmap">Neuroeducation Roadmap</option>
            <option value="Academic Portfolio">Academic Portfolio</option>
            <option value="Jadwal / Refleksi">Jadwal / Refleksi Pribadi</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-navy-600 hover:text-navy hover:bg-navy/5 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-navy border border-cyan-400 hover:bg-cyan-400 disabled:opacity-50 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
