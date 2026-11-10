import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReportIncidentModal } from './components/ReportIncidentModal';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { CctvScreen } from './screens/CctvScreen';
import { RoutesScreen } from './screens/RoutesScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AboutScreen } from './screens/AboutScreen';

export const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)' }}>
      {/* Sticky Header with Official Logos & Role Switcher */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Screen Body */}
      <main style={{ flex: 1 }}>
        {currentTab === 'home' && (
          <HomeScreen
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}
        {currentTab === 'map' && <MapScreen />}
        {currentTab === 'cctv' && <CctvScreen />}
        {currentTab === 'routes' && <RoutesScreen />}
        {currentTab === 'dashboard' && <DashboardScreen />}
        {currentTab === 'about' && <AboutScreen />}
      </main>

      {/* Citizen Report Modal */}
      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Mandatory Official Footer with Copyright */}
      <Footer />
    </div>
  );
};
