import React from 'react';
import { useApp } from './context/AppContext';
import { MacSidebar } from './components/layout/MacSidebar';
import { MacDashboardOverview } from './components/dashboard/MacDashboardOverview';
import { TopicExplorer } from './components/explorer/TopicExplorer';
import { InteractiveMindmap } from './components/mindmap/InteractiveMindmap';
import { QuizCenter } from './components/quiz/QuizCenter';
import { QuizResults } from './components/quiz/QuizResults';
import { MyVocabulary } from './components/vocabulary/MyVocabulary';
import { LearningProgress } from './components/progress/LearningProgress';
import { AdminContentStudio } from './components/admin/AdminContentStudio';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

export const AppContent: React.FC = () => {
  const { activeScreen } = useApp();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0b0e] text-[#E1E0CC] flex relative selection:bg-emerald-500 selection:text-black">
      {/* Left macOS Sidebar (Matching CleanMyMac Reference) */}
      <MacSidebar />

      {/* Main App Workspace Area */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative">
        {activeScreen === 'dashboard' && <MacDashboardOverview />}
        {activeScreen === 'explorer' && <TopicExplorer />}
        {activeScreen === 'mindmap' && <InteractiveMindmap />}
        {activeScreen === 'quiz' && <QuizCenter />}
        {activeScreen === 'quiz_results' && <QuizResults />}
        {activeScreen === 'vocabulary' && <MyVocabulary />}
        {activeScreen === 'progress' && <LearningProgress />}
        {activeScreen === 'admin' && <AdminContentStudio />}
      </main>

      {/* Global Onboarding Modal */}
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
