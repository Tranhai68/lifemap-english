import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  RotateCw, 
  Activity, 
  Settings, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Network, 
  Flame, 
  Tag, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Play
} from 'lucide-react';

export const MacDashboardOverview: React.FC = () => {
  const { 
    topics, 
    vocabularies, 
    setSelectedTopicId, 
    setActiveScreen, 
    startQuiz 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  // 14 review due words for Spaced Repetition
  const reviewDueCount = 14;
  const totalWordsCount = vocabularies.length || 540;
  const topicsCount = topics.length || 9;

  const handleOpenMindmap = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveScreen('mindmap');
  };

  const handleStartReviewQuiz = () => {
    const targetTopicId = topics[0]?.id || 'topic-business-strategy';
    startQuiz(targetTopicId, 'daily_review');
  };

  const filteredTopics = topics.filter(t => 
    t.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.nameVi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#0e0f14] text-gray-200 select-none flex flex-col scrollbar-thin scrollbar-thumb-white/10">
      {/* Top macOS App Bar */}
      <header className="h-14 border-b border-white/10 bg-[#12131a]/95 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
        {/* Left: macOS Back/Forward & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveScreen('dashboard')}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Quay lại"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveScreen('mindmap')}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-xs font-semibold text-white tracking-wide">Overview</h1>
        </div>

        {/* Right: Search, Refresh, Pulse, Settings */}
        <div className="flex items-center gap-3">
          <div className="relative w-56 hidden sm:block">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề, từ vựng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1b1c24] border border-white/10 rounded-full pl-9 pr-3 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Làm mới dữ liệu"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActiveScreen('progress')}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Sức khỏe trí nhớ"
          >
            <Activity className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActiveScreen('admin')}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Cài đặt CMS"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Welcome Section */}
        <div>
          <div className="text-xs font-medium text-emerald-400/90 mb-1">
            MacBook Pro • Spaced Repetition Cycle
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Hi, Admin. Your English could use a little boost.
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Hôm nay bạn có {reviewDueCount} từ vựng đã đến chu kỳ kích hoạt lại trí nhớ dài hạn.
          </p>
        </div>

        {/* BENTO STATS SECTION (Matching CleanMyMac Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Bento Card 1: Vocabulary Health (Large Left Card) */}
          <div className="lg:col-span-5 bg-[#151720] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xl group hover:border-emerald-500/30 transition-all">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-300">Vocabulary Health</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                Tối ưu
              </span>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative my-4 flex items-center justify-center">
              <svg className="w-44 h-44 -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="14"
                  fill="transparent"
                />
                {/* Active Green Ring (93%) */}
                <circle
                  cx="88"
                  cy="88"
                  r="72"
                  stroke="#10B981"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray="452"
                  strokeDashoffset="32"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">93</span>
                <span className="text-xs text-gray-400 font-medium">/ 100 points</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
              Ôn lại {reviewDueCount} từ vựng để giữ vùng trí nhớ dài hạn đạt mức 100%.
            </p>

            {/* Big Green Pill Action Button */}
            <button
              onClick={handleStartReviewQuiz}
              className="w-40 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Luyện tập ngay
            </button>
          </div>

          {/* Bento 2x2 Grid (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card A: 14 từ cần ôn (Teal) */}
            <div 
              onClick={handleStartReviewQuiz}
              className="cursor-pointer bg-[#151720] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mb-6">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {reviewDueCount} từ
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Cần ôn tập hôm nay (Due)
                </div>
              </div>
            </div>

            {/* Card B: 540 từ vựng (Blue) */}
            <div 
              onClick={() => setActiveScreen('vocabulary')}
              className="cursor-pointer bg-[#151720] border border-white/10 hover:border-blue-500/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {totalWordsCount} từ
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Kho từ vựng 9 chủ đề chuyên sâu
                </div>
              </div>
            </div>

            {/* Card C: 9 Sơ đồ Mindmap (Purple) */}
            <div 
              onClick={() => setActiveScreen('mindmap')}
              className="cursor-pointer bg-[#151720] border border-white/10 hover:border-purple-500/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-6">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {topicsCount} sơ đồ
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Mind-map 4 chiều (100 từ/sơ đồ)
                </div>
              </div>
            </div>

            {/* Card D: 7 ngày Streak (Orange) */}
            <div 
              onClick={() => setActiveScreen('progress')}
              className="cursor-pointer bg-[#151720] border border-white/10 hover:border-orange-500/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mb-6">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  7 ngày
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  Chuỗi học liên tục (Streak)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WIDE BOTTOM BANNER CARD (Matching CleanMyMac Reference) */}
        <div className="bg-gradient-to-r from-[#171a25] to-[#12141c] border border-white/10 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Thử thách Spaced Repetition 5 phút mỗi ngày
              </div>
              <div className="text-xs text-gray-400">
                Hệ thống tự động đề xuất 10 câu hỏi trắc nghiệm dựa trên đường cong lãng quên Ebbinghaus.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveScreen('progress')}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Xem báo cáo
            </button>
            <button
              onClick={handleStartReviewQuiz}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>Ôn tập ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 9 TOPICS MIND-MAP LIBRARY (100 WORDS PER TOPIC) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                9 Sơ đồ Mind-map Chuyên sâu (100 từ / chủ đề)
              </h3>
              <p className="text-xs text-gray-400">
                Mỗi chủ đề gồm 50 từ cơ bản (A1-A2) cho người mới bắt đầu và 50 từ nâng cao (B1-C1) với phát âm chuẩn bản ngữ.
              </p>
            </div>
            <button
              onClick={() => setActiveScreen('mindmap')}
              className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 hover:underline"
            >
              <span>Xem tất cả sơ đồ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => handleOpenMindmap(topic.id)}
                className="group cursor-pointer bg-[#151720] border border-white/10 hover:border-emerald-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cover Image */}
                <div className="h-36 relative overflow-hidden bg-black/40">
                  <img
                    src={topic.coverImage}
                    alt={topic.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151720] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-emerald-400 border border-emerald-500/30 font-medium">
                      {topic.cefrRange}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white font-medium">
                      {topic.wordCount} từ vựng
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-3">
                    <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-gray-300">
                      {topic.branchCount} nhánh
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {topic.nameEn}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {topic.nameVi}
                    </p>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>Độ thành thạo</span>
                      <span className="text-emerald-400 font-semibold">{topic.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/5">
                    <span className="text-[11px] text-gray-400 font-medium">
                      Mở sơ đồ tư duy
                    </span>
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
