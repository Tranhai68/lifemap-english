import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Topic } from '../../types';
import { 
  Play, 
  Search, 
  Layers, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const TopicLibrarySection: React.FC = () => {
  const { 
    topics, 
    categories, 
    vocabularies, 
    userProfile, 
    setSelectedTopicId, 
    setActiveScreen, 
    startQuiz 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Statistics
  const totalVocabs = vocabularies.length;
  const masteredVocabs = vocabularies.filter((v) => v.status === 'mastered').length;
  const learningVocabs = vocabularies.filter((v) => v.status === 'learning').length;
  const reviewDueVocabs = vocabularies.filter((v) => v.status === 'review_due' || ((v.masteryScore || 0) < 60 && v.status !== 'new')).length;
  const completedTopics = topics.filter((t) => t.status === 'Completed').length;

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.categoryId === selectedCategory;
    const matchesQuery = 
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleOpenTopic = (topic: Topic) => {
    setSelectedTopicId(topic.id);
    setActiveScreen('mindmap');
  };

  const handleContinueLast = () => {
    const active = topics.find((t) => t.status === 'In Progress') || topics[0];
    if (active) {
      setSelectedTopicId(active.id);
      setActiveScreen('mindmap');
    }
  };

  return (
    <section className="bg-black py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Welcome Banner & Daily Objective */}
      <div className="bg-gradient-to-r from-[#181818] via-[#121212] to-[#181818] border border-[#DEDBC8]/15 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Personalized Command Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#E1E0CC]">
              Welcome back, <span className="font-serif italic text-primary">{userProfile.name}</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl">
              Mục tiêu hôm nay: <span className="text-primary font-medium">{userProfile.dailyMinutes} phút</span> rèn luyện qua Sơ đồ Tư duy. Chuỗi ngày học liên tục:{' '}
              <span className="text-amber-400 font-semibold">{userProfile.streakDays} ngày 🔥</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleContinueLast}
              className="px-6 py-3 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#F5F4EC] transition-all shadow-lg hover:scale-105"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Tiếp tục học dở</span>
            </button>
            {reviewDueVocabs > 0 && (
              <button
                onClick={() => startQuiz('topic-business-strategy', 'daily_review')}
                className="px-5 py-3 rounded-full bg-[#212121] text-amber-300 border border-amber-500/30 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#282828] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ôn {reviewDueVocabs} từ đến hạn</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-white/5 relative z-10">
          <div className="bg-[#101010]/80 rounded-2xl p-4 border border-white/5">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Tổng từ vựng</div>
            <div className="text-xl sm:text-2xl font-semibold text-primary">{totalVocabs}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Trong hệ thống</div>
          </div>

          <div className="bg-[#101010]/80 rounded-2xl p-4 border border-white/5">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Đã thành thạo</div>
            <div className="text-xl sm:text-2xl font-semibold text-emerald-400">{masteredVocabs}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Mastery ≥ 90%</div>
          </div>

          <div className="bg-[#101010]/80 rounded-2xl p-4 border border-white/5">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Đang tích lũy</div>
            <div className="text-xl sm:text-2xl font-semibold text-sky-400">{learningVocabs}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Cần củng cố</div>
          </div>

          <div className="bg-[#101010]/80 rounded-2xl p-4 border border-white/5">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Đến hạn ôn tập</div>
            <div className="text-xl sm:text-2xl font-semibold text-amber-400">{reviewDueVocabs}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Spaced repetition</div>
          </div>

          <div className="bg-[#101010]/80 rounded-2xl p-4 border border-white/5 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Chủ đề hoàn thành</div>
            <div className="text-xl sm:text-2xl font-semibold text-violet-400">{completedTopics} / {topics.length}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Tiến độ tổng quát</div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
            Thư viện Mind-map Đời sống
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-[#E1E0CC]">
            Khám phá theo <span className="font-serif italic text-primary">Lĩnh vực & Chủ đề</span>
          </h3>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo chủ đề, từ vựng hoặc lĩnh vực..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-[#DEDBC8]/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#E1E0CC] placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-black font-semibold shadow-md'
              : 'bg-[#181818] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Tất cả chủ đề ({topics.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary text-black font-semibold shadow-md'
                : 'bg-[#181818] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {cat.nameVi}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const category = categories.find((c) => c.id === topic.categoryId);
          const isCompleted = topic.status === 'Completed';
          const isInProgress = topic.status === 'In Progress';

          return (
            <div
              key={topic.id}
              className="bg-[#121212] border border-white/5 hover:border-[#DEDBC8]/30 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
            >
              {/* Cover Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-[#181818]">
                {topic.coverImage ? (
                  <img
                    src={topic.coverImage}
                    alt={topic.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <BookOpen className="w-12 h-12 stroke-[1]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

                {/* Level Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#DEDBC8]/20 text-[10px] text-primary font-semibold">
                    {topic.cefrRange}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-black/60 text-gray-400 border border-white/10'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                    <span>{topic.status}</span>
                  </span>
                </div>

                {/* Category tag at bottom of image */}
                {category && (
                  <div className="absolute bottom-3 left-4 text-[11px] uppercase tracking-wider text-primary font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.nameVi}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-[#E1E0CC] group-hover:text-primary transition-colors">
                    {topic.nameEn}
                  </h4>
                  <div className="text-xs text-gray-400 font-medium mb-3">
                    {topic.nameVi}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Meta details & Progress Bar */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>{topic.branchCount} nhánh sơ đồ</span>
                    </span>
                    <span>{topic.wordCount} từ vựng</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#212121] h-1.5 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTopic(topic)}
                      className="flex-1 py-2.5 rounded-xl bg-[#212121] group-hover:bg-primary text-[#E1E0CC] group-hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <span>Mở Mind-map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => startQuiz(topic.id, 'topic')}
                      className="p-2.5 rounded-xl bg-[#181818] hover:bg-[#282828] text-primary/80 hover:text-primary border border-white/5 transition-colors"
                      title="Kiểm tra kiến thức chủ đề này"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 bg-[#101010] rounded-3xl border border-white/5">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Không tìm thấy chủ đề phù hợp với từ khóa này.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-primary underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </section>
  );
};
