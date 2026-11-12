import React, { useState, useEffect } from 'react';
import { AppData } from './types';
import { StorageService } from './services/storageService';
import { Sidebar, NavItem } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { QuickCaptureModal } from './components/common/QuickCaptureModal';
import { SettingsModal } from './components/settings/SettingsModal';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { ScheduleView } from './components/schedule/ScheduleView';
import { ContentStudioView } from './components/content/ContentStudioView';
import { ResearchAcademyView } from './components/research/ResearchAcademyView';
import { ProfessionalGrowthView } from './components/professional/ProfessionalGrowthView';
import { AcademicPortfolioView } from './components/portfolio/AcademicPortfolioView';
import { ProgressReflectionView } from './components/reflection/ProgressReflectionView';

export const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => StorageService.load());
  const [currentTab, setCurrentTab] = useState<NavItem>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickCapture, setShowQuickCapture] = useState(false);

  // Auto-subscribe to storage changes across potential multiple tabs
  useEffect(() => {
    const unsubscribe = StorageService.subscribe(newData => {
      setData(newData);
    });
    return unsubscribe;
  }, []);

  // Update data wrapper with automatic storage persistence
  const handleUpdateData = (newData: AppData) => {
    setData(newData);
    StorageService.save(newData);
  };

  // Quick capture submission
  const handleSaveQuickCapture = (item: {
    text: string;
    category: 'idea' | 'task' | 'note';
    targetModule?: string;
  }) => {
    const newItem = {
      ...item,
      id: `qc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isProcessed: false,
    };
    const updated = {
      ...data,
      quickCaptures: [newItem, ...data.quickCaptures],
    };
    handleUpdateData(updated);
  };

  return (
    <div className="flex min-h-screen bg-white text-navy font-sans antialiased selection:bg-cyan selection:text-navy">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSettings={() => setShowSettings(true)}
        isOpenMobile={isOpenMobile}
        onToggleMobile={() => setIsOpenMobile(!isOpenMobile)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobile={() => setIsOpenMobile(!isOpenMobile)}
          onOpenQuickCapture={() => setShowQuickCapture(true)}
          todayFocus={data.settings.todayFocus}
        />

        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              data={data}
              onUpdateData={handleUpdateData}
              onNavigate={tab => setCurrentTab(tab)}
              onOpenQuickCapture={() => setShowQuickCapture(true)}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleView
              data={data}
              onUpdateData={handleUpdateData}
            />
          )}

          {currentTab === 'content' && (
            <ContentStudioView
              data={data}
              onUpdateData={handleUpdateData}
            />
          )}

          {currentTab === 'research' && (
            <ResearchAcademyView
              data={data}
              onUpdateData={handleUpdateData}
              onNavigateToPortfolio={() => setCurrentTab('portfolio')}
            />
          )}

          {currentTab === 'professional' && (
            <ProfessionalGrowthView
              data={data}
              onUpdateData={handleUpdateData}
            />
          )}

          {currentTab === 'portfolio' && (
            <AcademicPortfolioView
              data={data}
              onUpdateData={handleUpdateData}
            />
          )}

          {currentTab === 'reflection' && (
            <ProgressReflectionView
              data={data}
              onUpdateData={handleUpdateData}
            />
          )}
        </main>
      </div>

      {/* Global Quick Capture Modal */}
      <QuickCaptureModal
        isOpen={showQuickCapture}
        onClose={() => setShowQuickCapture(false)}
        onSave={handleSaveQuickCapture}
      />

      {/* Settings & Backup Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        data={data}
        onUpdateData={handleUpdateData}
      />
    </div>
  );
};

export default App;
