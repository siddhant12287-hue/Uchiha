import React, { useState } from 'react';
import type { ViewType } from './types';
import { SettingsProvider } from './context/SettingsContext';
import { HUD } from './components/common/HUD';
import { Modal } from './components/common/Modal';
import { SettingsPanel } from './components/common/SettingsPanel';
import { LandingPage } from './components/LandingPage';
import { EyeGallery } from './components/eyes/EyeGallery';
import { LibraryView } from './components/library/LibraryView';
import { ShisuiRealmView } from './components/characters/ShisuiRealmView';
import { ItachiRealmView } from './components/characters/ItachiRealmView';
import { MadaraRealmView } from './components/characters/MadaraRealmView';
import { NagatoRealmView } from './components/characters/NagatoRealmView';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useImmersiveMode } from './hooks/useImmersiveMode';
import { useSettings } from './hooks/useSettings';
import { cn } from './utils/cn';
import { Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { settings } = useSettings();

  const {
    isHudVisible,
    toastMessage,
    toggleImmersive,
    exitImmersive,
  } = useImmersiveMode();

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          />
        );
      case 'shisui':
        return (
          <ShisuiRealmView
            onBack={() => setCurrentView('landing')}
            onNavigate={setCurrentView}
          />
        );
      case 'itachi':
        return (
          <ItachiRealmView
            onBack={() => setCurrentView('landing')}
            onNavigate={setCurrentView}
          />
        );
      case 'madara':
        return (
          <MadaraRealmView
            onBack={() => setCurrentView('landing')}
            onNavigate={setCurrentView}
          />
        );
      case 'nagato':
        return (
          <NagatoRealmView
            onBack={() => setCurrentView('landing')}
            onNavigate={setCurrentView}
          />
        );
      case 'library':
        return <LibraryView onNavigate={setCurrentView} />;
      case 'eye-gallery':
        return <EyeGallery />;
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-black text-white tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_#ff2222]" />
              SYSTEM PREFERENCES &amp; SYNTHESIS
            </h1>
            <SettingsPanel />
          </div>
        );
      default:
        return (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#060609] text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Top Fixed Navigation HUD */}
      <HUD
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        isHudVisible={isHudVisible}
        onToggleImmersive={toggleImmersive}
        onExitImmersive={exitImmersive}
      />

      {/* Main View Area: offset by 64px (pt-16) unless in immersive mode (pt-0) */}
      <main
        className={cn(
          'flex-1 flex flex-col transition-all duration-500',
          settings.immersive ? 'pt-0' : 'pt-16'
        )}
      >
        {renderActiveView()}
      </main>

      {/* Live Region Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#130f24]/95 border border-purple-500/60 text-white text-xs font-mono shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center gap-2.5 backdrop-blur-md animate-fade-in"
        >
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Quick Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="CLAN SANCTUM SETTINGS"
        subtitle="Web Audio API procedural synthesis & visual rendering parameters"
        maxWidth="xl"
      >
        <SettingsPanel />
      </Modal>
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;
