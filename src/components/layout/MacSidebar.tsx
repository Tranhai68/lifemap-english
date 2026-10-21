import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Network, 
  HelpCircle, 
  BookMarked, 
  HeartPulse, 
  History, 
  BarChart3, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  Dumbbell, 
  Utensils, 
  Home, 
  TreePine, 
  Compass, 
  Cpu, 
  Settings,
  Sparkles,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { ActiveScreen } from '../../context/AppContext';

export const MacSidebar: React.FC = () => {
  const { 
    activeScreen, 
    setActiveScreen, 
    topics, 
    selectedTopicId, 
    setSelectedTopicId,
    vocabularies
  } = useApp();

  const getTopicIcon = (catId: string) => {
    switch (catId) {
      case 'business': return Briefcase;
      case 'marketing': return TrendingUp;
      case 'fitness': return Dumbbell;
      case 'wellness': return HeartPulse;
      case 'culinary': return Utensils;
      case 'household': return Home;
      case 'nature': return TreePine;
      case 'travel': return Compass;
      case 'technology': return Cpu;
      default: return Sparkles;
    }
  };

  const navTo = (screen: ActiveScreen) => {
    setActiveScreen(screen);
  };

  const openTopicMindmap = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveScreen('mindmap');
  };

  return (
    <aside className="w-64 h-screen bg-[#111218] border-r border-white/10 flex flex-col justify-between shrink-0 select-none text-gray-300">
      {/* Top macOS Traffic Light Window Controls */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 cursor-pointer shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 cursor-pointer shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 cursor-pointer shadow-sm" />
          <span className="ml-2 text-[11px] font-semibold text-gray-400 tracking-wider">LifeMap Mac Pro</span>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white leading-none">LifeMap English</div>
            <div className="text-[10px] text-emerald-400/90 leading-none mt-1">{vocabularies.length || 900} Từ • {topics.length} Mindmap</div>
          </div>
        </div>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        {/* GROUP 1: CARE / HỌC TẬP */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Học tập & Sơ đồ
          </div>

          {/* Overview */}
          <button
            onClick={() => navTo('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'dashboard'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className={`w-4 h-4 ${activeScreen === 'dashboard' ? 'text-black' : 'text-emerald-400'}`} />
              <span>Overview</span>
            </div>
          </button>

          {/* Sơ đồ Mindmap */}
          <button
            onClick={() => navTo('mindmap')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'mindmap'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Network className={`w-4 h-4 ${activeScreen === 'mindmap' ? 'text-black' : 'text-blue-400'}`} />
              <span>Sơ đồ Mind-map</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeScreen === 'mindmap' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'}`}>
              9 sơ đồ
            </span>
          </button>

          {/* Luyện Quiz */}
          <button
            onClick={() => navTo('quiz')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'quiz' || activeScreen === 'quiz_results'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className={`w-4 h-4 ${activeScreen === 'quiz' ? 'text-black' : 'text-amber-400'}`} />
              <span>Luyện tập Quiz</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeScreen === 'quiz' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'}`}>
              6 dạng
            </span>
          </button>

          {/* Kho từ vựng */}
          <button
            onClick={() => navTo('vocabulary')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'vocabulary'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookMarked className={`w-4 h-4 ${activeScreen === 'vocabulary' ? 'text-black' : 'text-purple-400'}`} />
              <span>Kho từ vựng</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeScreen === 'vocabulary' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'}`}>
              {vocabularies.length || 900} từ
            </span>
          </button>
        </div>

        {/* GROUP 2: HEALTH & STATS */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Trí nhớ & Thống kê
          </div>

          <button
            onClick={() => navTo('progress')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'progress'
                ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HeartPulse className={`w-4 h-4 ${activeScreen === 'progress' ? 'text-black' : 'text-rose-400'}`} />
              <span>Sức khỏe Trí nhớ</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">93/100</span>
          </button>

          <button
            onClick={() => navTo('progress')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-cyan-400" />
              <span>Spaced Repetition</span>
            </div>
            <span className="text-[10px] text-gray-400">14 từ</span>
          </button>

          <button
            onClick={() => navTo('progress')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span>Thống kê tuần</span>
            </div>
            <span className="text-[10px] text-gray-400">7 ngày streak</span>
          </button>
        </div>

        {/* GROUP 3: 9 TOPICS (100 WORDS EACH) */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between">
            <span>9 Chủ đề (100 từ/chủ đề)</span>
            <span className="text-[10px] text-emerald-400 font-mono">900 từ</span>
          </div>

          <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
            {topics.map((t) => {
              const IconComp = getTopicIcon(t.categoryId);
              const isSelected = selectedTopicId === t.id && activeScreen === 'mindmap';
              const count = vocabularies.filter((v) => v.topicId === t.id).length || 100;

              return (
                <button
                  key={t.id}
                  onClick={() => openTopicMindmap(t.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={`${t.nameVi} (${count} từ: 50 cơ bản A1-A2, 50 nâng cao B1-C1)`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <IconComp className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">{t.nameVi.split('&')[0].trim()}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 font-mono shrink-0">
                    {count} từ
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GROUP 4: STUDIO & SETTINGS */}
        <div className="space-y-1">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Hệ thống & Studio
          </div>

          <button
            onClick={() => navTo('admin')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeScreen === 'admin'
                ? 'bg-emerald-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderOpen className={`w-4 h-4 ${activeScreen === 'admin' ? 'text-black' : 'text-gray-400'}`} />
              <span>CMS Studio</span>
            </div>
            <span className="text-[10px] text-gray-400">Thêm từ</span>
          </button>
        </div>
      </div>

      {/* Bottom Mac App Info Squircle Badge */}
      <div className="p-3 border-t border-white/5">
        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 truncate">
            <div className="text-xs font-semibold text-white leading-tight">LifeMap Pro</div>
            <div className="text-[10px] text-gray-400 leading-tight">macOS v2.4.0 • Sạch & Tối ưu</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
