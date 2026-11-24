import React from 'react';
import {
  LayoutDashboard,
  CalendarClock,
  Film,
  GraduationCap,
  Briefcase,
  FolderCheck,
  LineChart,
  Settings,
  Sparkles,
  CheckCircle2,
  X,
  Users,
  FileText,
  Send,
  Award,
  BookOpen
} from 'lucide-react';

export type NavItem =
  | 'portfolio-dashboard'
  | 'research-tracker'
  | 'community-tracker'
  | 'kti-tracker'
  | 'outreach-log'
  | 'portfolio-evidence'
  | 'content'
  | 'research'
  | 'professional'
  | 'portfolio'
  | 'reflection'
  | 'schedule';

interface SidebarProps {
  currentTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  onOpenSettings: () => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  isOpenMobile,
  onToggleMobile,
}) => {
  // 3 Pilar Utama & Opportunity Tracking 2027
  const trackingNavItems: { id: NavItem; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'portfolio-dashboard', label: 'Portfolio Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'research-tracker', label: 'Research Tracker', icon: <GraduationCap className="h-4 w-4" />, badge: 'Pilar 2' },
    { id: 'community-tracker', label: 'Community Tracker', icon: <Users className="h-4 w-4" />, badge: 'Pilar 3' },
    { id: 'kti-tracker', label: 'KTI Project Tracker', icon: <FileText className="h-4 w-4" />, badge: 'Pilar 1' },
    { id: 'outreach-log', label: 'Outreach Log', icon: <Send className="h-4 w-4" /> },
    { id: 'portfolio-evidence', label: 'Portfolio Evidence', icon: <Award className="h-4 w-4" /> },
  ];

  // Workspace & Modul Pendukung yang Dipertahankan
  const workspaceNavItems: { id: NavItem; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'content', label: 'Content Studio', icon: <Film className="h-4 w-4" />, badge: 'Mikro & GC' },
    { id: 'research', label: 'Research Academy', icon: <BookOpen className="h-4 w-4" />, badge: '12 Bulan' },
    { id: 'professional', label: 'Professional Growth', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'portfolio', label: 'My Portfolio', icon: <FolderCheck className="h-4 w-4" />, badge: '14 Item' },
    { id: 'reflection', label: 'Progress & Reflection', icon: <LineChart className="h-4 w-4" /> },
    { id: 'schedule', label: 'My Schedule', icon: <CalendarClock className="h-4 w-4" />, badge: 'Ritme' },
  ];

  const renderNavButton = (item: { id: NavItem; label: string; icon: React.ReactNode; badge?: string }) => {
    const isActive = currentTab === item.id;
    return (
      <button
        key={item.id}
        onClick={() => {
          onSelectTab(item.id);
          if (isOpenMobile) onToggleMobile();
        }}
        className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
          isActive
            ? 'bg-cyan text-navy font-semibold shadow-sm'
            : 'text-navy-200 hover:bg-navy-800/80 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <span className={`shrink-0 ${isActive ? 'text-navy' : 'text-cyan-300/80 group-hover:text-cyan'}`}>
            {item.icon}
          </span>
          <span className="truncate">{item.label}</span>
        </div>
        {item.badge && (
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-medium shrink-0 ml-1.5 ${
              isActive ? 'bg-navy/15 text-navy' : 'bg-navy-800 text-cyan-200'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={onToggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-navy-800 bg-navy text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="flex flex-col border-b border-navy-700/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan text-navy font-bold text-sm shadow-sm">
                GS
              </div>
              <div>
                <h1 className="text-sm font-semibold tracking-tight text-white font-serif">
                  My Growth Space
                </h1>
                <p className="text-[10px] text-cyan-200/80 tracking-wider uppercase font-medium">
                  Portfolio System 2027
                </p>
              </div>
            </div>
            <button
              onClick={onToggleMobile}
              className="rounded-lg p-1 text-navy-300 hover:bg-navy-800 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-navy-900/60 px-3 py-1.5 text-[11px] text-navy-300 border border-navy-700/40">
            <Sparkles className="h-3 w-3 text-cyan" />
            <span>KTI · Research · Community</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-3.5 py-4 custom-scrollbar">
          {/* Section 1: 3 Pilar & Tracking System */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/90 mb-1.5">
              Portfolio & Tracking 2027
            </p>
            {trackingNavItems.map(renderNavButton)}
          </div>

          {/* Section 2: Workspace & Modul Pendukung */}
          <div className="space-y-1 pt-2 border-t border-navy-800">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-navy-400 mb-1.5">
              Studio & Workspace
            </p>
            {workspaceNavItems.map(renderNavButton)}
          </div>
        </nav>

        {/* Footer / Settings & LocalStorage status */}
        <div className="border-t border-navy-700/60 p-4 space-y-2 bg-navy-950/40">
          <button
            onClick={() => {
              onOpenSettings();
              if (isOpenMobile) onToggleMobile();
            }}
            className="flex w-full items-center justify-between rounded-lg px-3.5 py-2 text-xs font-medium text-navy-200 hover:bg-navy-800 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="h-4 w-4 text-cyan" />
              <span>Settings & Backup</span>
            </div>
            <span className="text-[10px] text-cyan-300">JSON</span>
          </button>

          <div className="flex items-center justify-between px-3.5 py-1 text-[11px] text-navy-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-cyan" />
              <span>Tersimpan Lokal</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">v2.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
