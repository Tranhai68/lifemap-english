import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Bookmark, 
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { Topic } from '../../types';

export const TopicExplorer: React.FC = () => {
  const { categories, topics, setSelectedTopicId, setActiveScreen } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTopics = topics.filter((t) => {
    if (selectedCat !== 'all' && t.categoryId !== selectedCat) return false;
    if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
    if (selectedLevel !== 'all' && !t.cefrRange.includes(selectedLevel)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = t.nameEn.toLowerCase().includes(q);
      const matchVi = t.nameVi.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      if (!matchEn && !matchVi && !matchDesc) return false;
    }

    return true;
  });

  const handleOpenMindmap = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveScreen('mindmap');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thư Viện Mind-map Đa Lĩnh Vực</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#E1E0CC]">
            Topic <span className="font-serif italic text-primary">Explorer & Knowledge Tree</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Tất cả chủ đề gắn với đời sống thực tế: từ kinh doanh, rèn luyện thể chất, ẩm thực, gia đình đến động vật hoang dã và tương lai AI.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#141414] border border-white/10 p-1 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 ${
              viewMode === 'grid' ? 'bg-primary text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lưới thẻ</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 ${
              viewMode === 'list' ? 'bg-primary text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Danh sách</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#121212] border border-white/5 rounded-3xl p-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] border border-white/10 rounded-2xl pl-10 pr-3 py-2 text-xs text-[#E1E0CC] placeholder-gray-500 focus:outline-none focus:border-primary/40"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full bg-[#181818] border border-white/10 rounded-2xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40 cursor-pointer"
          >
            <option value="all">Tất cả lĩnh vực đời sống</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameVi} ({c.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* CEFR Level */}
        <div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-[#181818] border border-white/10 rounded-2xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40 cursor-pointer"
          >
            <option value="all">Tất cả trình độ CEFR</option>
            <option value="A1">Căn bản A1</option>
            <option value="A2">Sơ cấp A2</option>
            <option value="B1">Trung cấp B1</option>
            <option value="B2">Trung - Cao cấp B2</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#181818] border border-white/10 rounded-2xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Not Started">Chưa học</option>
            <option value="In Progress">Đang học</option>
            <option value="Completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {/* Render Mode: Grid or List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const cat = categories.find((c) => c.id === topic.categoryId);
            return (
              <div
                key={topic.id}
                className="bg-[#121212] border border-white/5 hover:border-[#DEDBC8]/30 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div className="relative h-44 bg-[#181818] overflow-hidden">
                  <img
                    src={topic.coverImage}
                    alt={topic.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-primary font-semibold">
                      {topic.cefrRange}
                    </span>
                  </div>
                  {cat && (
                    <div className="absolute bottom-2.5 left-3 text-[11px] text-primary font-medium">
                      {cat.nameVi}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#E1E0CC] group-hover:text-primary transition-colors">
                      {topic.nameEn}
                    </h3>
                    <div className="text-xs text-gray-400 mt-0.5">{topic.nameVi}</div>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {topic.branchCount} nhánh • {topic.wordCount} từ
                    </span>
                    <button
                      onClick={() => handleOpenMindmap(topic.id)}
                      className="px-4 py-1.5 rounded-xl bg-primary text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#F5F4EC] transition-all"
                    >
                      <span>Mở sơ đồ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTopics.map((topic) => {
            const cat = categories.find((c) => c.id === topic.categoryId);
            return (
              <div
                key={topic.id}
                onClick={() => handleOpenMindmap(topic.id)}
                className="bg-[#121212] hover:bg-[#181818] border border-white/5 hover:border-primary/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#212121] overflow-hidden shrink-0 hidden sm:block">
                    <img src={topic.coverImage} alt={topic.nameEn} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#E1E0CC]">{topic.nameEn}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        {topic.cefrRange}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{topic.nameVi} • {cat?.nameVi}</div>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{topic.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden md:block">
                    <div className="text-xs font-mono text-primary">{topic.progress}%</div>
                    <div className="text-[10px] text-gray-500">{topic.status}</div>
                  </div>
                  <button className="p-2 rounded-xl bg-[#212121] text-gray-300 hover:text-white">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 bg-[#101010] rounded-3xl border border-white/5">
          <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Không tìm thấy chủ đề nào với các điều kiện lọc trên.</p>
        </div>
      )}
    </div>
  );
};
