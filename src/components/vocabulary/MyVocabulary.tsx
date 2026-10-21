import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playPronunciation } from '../../utils/audio';
import { 
  Search, 
  Filter, 
  Volume2, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { VocabularyStatus, CEFRLevel } from '../../types';

export const MyVocabulary: React.FC = () => {
  const { 
    vocabularies, 
    topics, 
    setSelectedVocabularyId, 
    setSelectedTopicId, 
    setActiveScreen, 
    toggleFavorite,
    markVocabularyStatus,
    startQuiz
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'mastered' | 'learning' | 'difficult' | 'favorites' | 'due'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Filter logic
  const filteredVocabs = vocabularies.filter((v) => {
    // Tab filter
    if (activeTab === 'mastered' && v.status !== 'mastered') return false;
    if (activeTab === 'learning' && v.status !== 'learning') return false;
    if (activeTab === 'difficult' && (v.masteryScore || 100) > 60) return false;
    if (activeTab === 'favorites' && !v.isFavorite) return false;
    if (activeTab === 'due' && v.status !== 'review_due') return false;

    // Topic filter
    if (selectedTopic !== 'all' && v.topicId !== selectedTopic) return false;

    // Level filter
    if (selectedLevel !== 'all' && v.cefr !== selectedLevel) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchWord = v.word.toLowerCase().includes(q);
      const matchMeaning = v.meaningVi.toLowerCase().includes(q);
      const matchDef = v.definitionEn.toLowerCase().includes(q);
      if (!matchWord && !matchMeaning && !matchDef) return false;
    }

    return true;
  });

  const handleOpenDetail = (vocabId: string, topicId: string) => {
    setSelectedTopicId(topicId);
    setSelectedVocabularyId(vocabId);
    setActiveScreen('mindmap');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho Từ Vựng Đời Sống Cá Nhân</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#E1E0CC]">
            My <span className="font-serif italic text-primary">Vocabulary Matrix</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Quản lý toàn bộ vốn từ vựng được liên kết theo mạng lưới tư duy và lộ trình ghi nhớ Spaced Repetition.
          </p>
        </div>

        {/* Quick Quiz on Difficult Words */}
        <button
          onClick={() => startQuiz(topics[0]?.id || 'topic-business-strategy', 'difficult')}
          className="px-5 py-2.5 rounded-full bg-[#212121] border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center gap-2 hover:bg-[#282828] transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Luyện tập từ khó & đến hạn</span>
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-white/5">
        {[
          { key: 'all', label: 'Tất cả từ', count: vocabularies.length },
          { key: 'mastered', label: 'Đã thành thạo', count: vocabularies.filter((v) => v.status === 'mastered').length },
          { key: 'learning', label: 'Đang tích lũy', count: vocabularies.filter((v) => v.status === 'learning').length },
          { key: 'difficult', label: 'Từ khó / Cần ôn', count: vocabularies.filter((v) => (v.masteryScore || 100) <= 60).length },
          { key: 'favorites', label: 'Yêu thích', count: vocabularies.filter((v) => v.isFavorite).length },
          { key: 'due', label: 'Đến hạn ôn', count: vocabularies.filter((v) => v.status === 'review_due').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === tab.key
                ? 'bg-primary text-black shadow-md'
                : 'bg-[#141414] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.key ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo từ, phiên âm, nghĩa tiếng Việt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#E1E0CC] placeholder-gray-500 focus:outline-none focus:border-primary/40"
          />
        </div>

        <div>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-primary/40 cursor-pointer"
          >
            <option value="all">Tất cả chủ đề</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nameEn} ({t.nameVi})
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-[#141414] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-primary/40 cursor-pointer"
          >
            <option value="all">Tất cả trình độ (CEFR)</option>
            <option value="A1">A1 - Beginner</option>
            <option value="A2">A2 - Elementary</option>
            <option value="B1">B1 - Intermediate</option>
            <option value="B2">B2 - Upper Intermediate</option>
          </select>
        </div>
      </div>

      {/* Vocabularies Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocabs.map((vocab) => {
          const parentTopic = topics.find((t) => t.id === vocab.topicId);
          const isMastered = vocab.status === 'mastered';

          return (
            <div
              key={vocab.id}
              className="bg-[#121212] border border-white/5 hover:border-[#DEDBC8]/30 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-black uppercase">
                      {vocab.cefr}
                    </span>
                    <span className="text-[11px] text-gray-400 capitalize italic">
                      ({vocab.partOfSpeech})
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFavorite(vocab.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        vocab.isFavorite ? 'text-amber-400' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${vocab.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => playPronunciation(vocab.word)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-primary transition-colors"
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#E1E0CC] tracking-tight group-hover:text-primary transition-colors">
                  {vocab.word}
                </h3>
                <div className="text-xs font-mono text-primary/70 mb-3">{vocab.ipa}</div>

                <div className="text-xs font-semibold text-primary mb-1">
                  {vocab.meaningVi}
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 font-light leading-relaxed">
                  {vocab.definitionEn}
                </p>

                {vocab.context.examples[0] && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#181818] border border-white/5 text-[11px] text-gray-300 italic">
                    "{vocab.context.examples[0].en}"
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 truncate max-w-[150px]">
                  {parentTopic?.nameEn}
                </span>

                <button
                  onClick={() => handleOpenDetail(vocab.id, vocab.topicId)}
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                >
                  <span>Mở trên Mind-map</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVocabs.length === 0 && (
        <div className="text-center py-16 bg-[#101010] rounded-3xl border border-white/5">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Không có từ vựng nào khớp với bộ lọc này.</p>
        </div>
      )}
    </div>
  );
};
