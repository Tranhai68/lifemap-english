import React from 'react';
import { useApp, ActiveScreen } from '../../context/AppContext';
import { 
  Compass, 
  BookOpen, 
  BrainCircuit, 
  HelpCircle, 
  Flame, 
  Database,
  BarChart3,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeScreen, setActiveScreen, userProfile, setShowOnboarding } = useApp();

  const navItems: { screen: ActiveScreen; label: string; icon: React.ReactNode }[] = [
    { screen: 'dashboard', label: 'Dashboard', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { screen: 'explorer', label: 'Explore Topics', icon: <Compass className="w-3.5 h-3.5" /> },
    { screen: 'mindmap', label: 'Mind-map Lab', icon: <BrainCircuit className="w-3.5 h-3.5" /> },
    { screen: 'vocabulary', label: 'My Vocabulary', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { screen: 'quiz', label: 'Practice & Quiz', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { screen: 'progress', label: 'My Progress', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { screen: 'admin', label: 'Content Studio', icon: <Database className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      {/* Desktop & Tablet Top Hanging Pill Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto bg-black/95 backdrop-blur-md border-b border-x border-[#DEDBC8]/15 rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 shadow-2xl flex items-center justify-between gap-4 md:gap-8 max-w-6xl w-full">
          {/* Logo */}
          <button
            onClick={() => setActiveScreen('dashboard')}
            className="flex items-center gap-2 group text-left transition-transform hover:scale-105"
          >
            <div className="w-7 h-7 rounded-lg bg-[#DEDBC8] flex items-center justify-center text-black font-bold text-xs tracking-tight shadow-md group-hover:rotate-6 transition-transform">
              LM
            </div>
            <div>
              <span className="text-xs md:text-sm font-semibold tracking-wider text-[#E1E0CC] flex items-center gap-1">
                LifeMap
                <span className="font-serif italic text-primary text-xs font-normal">English</span>
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => {
              const isActive = activeScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => setActiveScreen(item.screen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-[#212121] text-[#E1E0CC] font-semibold border border-[#DEDBC8]/30 shadow-inner'
                      : 'hover:text-[#E1E0CC] text-[#E1E0CC]/70 hover:bg-[#181818]'
                  }`}
                  style={{
                    color: isActive ? '#E1E0CC' : 'rgba(225, 224, 204, 0.75)',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile, Streak & Level Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            <div 
              title="Chuỗi ngày học liên tục"
              className="flex items-center gap-1 bg-[#181818] border border-[#DEDBC8]/10 rounded-full px-2.5 py-1 text-xs text-amber-300 font-medium"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse-subtle" />
              <span>{userProfile.streakDays}d</span>
            </div>

            {/* Level Pill */}
            <div 
              title="Trình độ mục tiêu"
              className="hidden sm:flex items-center bg-[#212121] border border-[#DEDBC8]/15 rounded-full px-2.5 py-1 text-[11px] text-[#DEDBC8] font-semibold"
            >
              {userProfile.currentLevel}
            </div>

            {/* Settings / Onboarding button */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="p-1.5 rounded-full bg-[#181818] hover:bg-[#252525] text-primary/80 hover:text-primary transition-colors border border-[#DEDBC8]/10"
              title="Thiết lập mục tiêu học cá nhân"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Avatar */}
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#DEDBC8]/30 shrink-0">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-[#DEDBC8]/15 px-3 py-2 flex justify-around items-center">
        {navItems.slice(0, 5).map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => setActiveScreen(item.screen)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400 hover:text-primary'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#212121] text-primary' : ''}`}>
                {item.icon}
              </div>
              <span className="truncate max-w-[58px]">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
