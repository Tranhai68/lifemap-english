import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Database, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  Layers, 
  BookOpen, 
  HelpCircle, 
  Eye, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Topic, MindmapNode, Vocabulary, QuizQuestion, CEFRLevel } from '../../types';

export const AdminContentStudio: React.FC = () => {
  const { 
    topics, 
    categories, 
    mindmapNodes, 
    vocabularies, 
    quizQuestions,
    addTopic, 
    addMindmapNode, 
    addVocabulary, 
    addQuizQuestion,
    deleteTopic,
    resetToDefaultData,
    setSelectedTopicId,
    setActiveScreen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'topics' | 'branches' | 'vocabularies' | 'quiz'>('topics');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Form states for creating a new topic
  const [newTopicEn, setNewTopicEn] = useState<string>('');
  const [newTopicVi, setNewTopicVi] = useState<string>('');
  const [newTopicDesc, setNewTopicDesc] = useState<string>('');
  const [newTopicCat, setNewTopicCat] = useState<string>(categories[0]?.id || 'business');
  const [newTopicCefr, setNewTopicCefr] = useState<string>('B1 - B2');
  const [newTopicImage, setNewTopicImage] = useState<string>('');

  // Form states for creating a new branch
  const [branchTopicId, setBranchTopicId] = useState<string>(topics[0]?.id || '');
  const [branchLabelEn, setBranchLabelEn] = useState<string>('');
  const [branchLabelVi, setBranchLabelVi] = useState<string>('');
  const [branchColor, setBranchColor] = useState<string>('#38BDF8');

  // Form states for creating a vocabulary word
  const [vocabTopicId, setVocabTopicId] = useState<string>(topics[0]?.id || '');
  const [vocabBranchId, setVocabBranchId] = useState<string>('');
  const [vocabWord, setVocabWord] = useState<string>('');
  const [vocabIpa, setVocabIpa] = useState<string>('');
  const [vocabPos, setVocabPos] = useState<Vocabulary['partOfSpeech']>('noun');
  const [vocabMeaningVi, setVocabMeaningVi] = useState<string>('');
  const [vocabDefEn, setVocabDefEn] = useState<string>('');
  const [vocabCefr, setVocabCefr] = useState<CEFRLevel>('B1');
  const [vocabExampleEn, setVocabExampleEn] = useState<string>('');
  const [vocabExampleVi, setVocabExampleVi] = useState<string>('');
  const [vocabCollocations, setVocabCollocations] = useState<string>('');

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicEn.trim() || !newTopicVi.trim()) return;

    const topicId = `topic-${Date.now()}`;
    const newTopic: Topic = {
      id: topicId,
      categoryId: newTopicCat,
      nameEn: newTopicEn,
      nameVi: newTopicVi,
      description: newTopicDesc || 'Chủ đề mới tạo trong Studio CMS.',
      coverImage: newTopicImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      cefrRange: newTopicCefr,
      status: 'Not Started',
      progress: 0,
      branchCount: 1,
      wordCount: 0,
    };

    // Also create Root Node for this topic
    const rootNode: MindmapNode = {
      id: `node-root-${topicId}`,
      topicId,
      level: 0,
      label: newTopicEn,
      labelVi: newTopicVi,
      color: '#DEDBC8',
      order: 0,
      isExpanded: true,
    };

    addTopic(newTopic);
    addMindmapNode(rootNode);

    setNewTopicEn('');
    setNewTopicVi('');
    setNewTopicDesc('');
    setNewTopicImage('');
    triggerSuccess(`Đã tạo thành công chủ đề mới: ${newTopic.nameEn}!`);
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchLabelEn.trim() || !branchTopicId) return;

    const branchId = `branch-${Date.now()}`;
    const rootNode = mindmapNodes.find((n) => n.topicId === branchTopicId && n.level === 0);

    const newBranch: MindmapNode = {
      id: branchId,
      topicId: branchTopicId,
      parentId: rootNode?.id,
      level: 1,
      label: branchLabelEn,
      labelVi: branchLabelVi,
      color: branchColor,
      order: mindmapNodes.filter((n) => n.topicId === branchTopicId && n.level === 1).length + 1,
      isExpanded: true,
    };

    addMindmapNode(newBranch);
    setBranchLabelEn('');
    setBranchLabelVi('');
    triggerSuccess(`Đã thêm nhánh mới: ${newBranch.label}!`);
  };

  const handleCreateVocabulary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocabWord.trim() || !vocabTopicId || !vocabMeaningVi.trim()) return;

    const vocabId = `vocab-${Date.now()}`;
    const wordNodeId = `node-word-${Date.now()}`;

    const newVocab: Vocabulary = {
      id: vocabId,
      topicId: vocabTopicId,
      branchId: vocabBranchId || undefined,
      word: vocabWord.trim(),
      ipa: vocabIpa.trim() || `/${vocabWord.toLowerCase()}/`,
      partOfSpeech: vocabPos,
      meaningVi: vocabMeaningVi.trim(),
      definitionEn: vocabDefEn.trim() || 'Custom vocabulary entry.',
      cefr: vocabCefr,
      context: {
        examples: [
          {
            en: vocabExampleEn.trim() || `Mastering the word "${vocabWord}" enriches your expression.`,
            vi: vocabExampleVi.trim() || `Thành thạo từ "${vocabWord}" giúp tăng tính biểu đạt của bạn.`,
          },
        ],
        collocations: vocabCollocations
          ? vocabCollocations.split(',').map((c) => c.trim())
          : [],
      },
      status: 'new',
      masteryScore: 0,
    };

    // Add node to mindmap
    const newWordNode: MindmapNode = {
      id: wordNodeId,
      topicId: vocabTopicId,
      parentId: vocabBranchId || undefined,
      level: 2,
      label: vocabWord.trim(),
      labelVi: vocabMeaningVi.trim(),
      vocabularyId: vocabId,
      order: 1,
    };

    // Also auto-generate 1 quick quiz question for this new word
    const newQuiz: QuizQuestion = {
      id: `q-auto-${Date.now()}`,
      vocabularyId: vocabId,
      topicId: vocabTopicId,
      branchId: vocabBranchId || undefined,
      type: 'choice_meaning',
      prompt: `Từ "${vocabWord}" mang ý nghĩa chính xác nhất là gì?`,
      options: [
        vocabMeaningVi.trim(),
        'Một trạng thái không xác định',
        'Chiến lược giá thầu quảng cáo',
        'Khái niệm toán học trừu tượng',
      ].sort(() => Math.random() - 0.5),
      correctAnswer: vocabMeaningVi.trim(),
      explanation: `"${vocabWord}" (${vocabPos}): ${vocabDefEn || vocabMeaningVi}`,
      difficulty: vocabCefr,
    };

    addVocabulary(newVocab);
    addMindmapNode(newWordNode);
    addQuizQuestion(newQuiz);

    setVocabWord('');
    setVocabIpa('');
    setVocabMeaningVi('');
    setVocabDefEn('');
    setVocabExampleEn('');
    setVocabExampleVi('');
    setVocabCollocations('');
    triggerSuccess(`Đã lưu từ vựng "${newVocab.word}" và liên kết vào sơ đồ Mind-map!`);
  };

  const topicBranches = mindmapNodes.filter(
    (n) => n.topicId === vocabTopicId && n.level === 1
  );

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>Studio Quản Trị & Xuất Bản Nội Dung</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#E1E0CC]">
            Content <span className="font-serif italic text-primary">Management Studio</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Tạo và biên tập chủ đề, phân nhánh Mind-map, nạp từ vựng với phiên âm IPA, nghĩa tiếng Việt, câu ví dụ và ngân hàng câu hỏi tự động.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Khôi phục toàn bộ chủ đề và từ vựng về dữ liệu mẫu ban đầu?')) {
              resetToDefaultData();
              triggerSuccess('Đã khôi phục dữ liệu mặc định.');
            }
          }}
          className="px-4 py-2 rounded-full bg-[#181818] border border-white/10 text-gray-400 hover:text-white text-xs flex items-center gap-1.5 self-start md:self-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Dữ Liệu Mẫu</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        {[
          { key: 'topics', label: 'Tạo & Quản lý Chủ đề' },
          { key: 'branches', label: 'Thêm Nhánh Sơ đồ' },
          { key: 'vocabularies', label: 'Thêm Từ vựng & Ví dụ' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-black shadow'
                : 'bg-[#141414] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TOPIC CREATION */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Form */}
          <form
            onSubmit={handleCreateTopic}
            className="lg:col-span-5 bg-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
          >
            <h3 className="text-base font-semibold text-[#E1E0CC] flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <span>Tạo Chủ Đề Mới (Topic)</span>
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Lĩnh vực chính (Category)
              </label>
              <select
                value={newTopicCat}
                onChange={(e) => setNewTopicCat(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameVi} ({c.nameEn})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Tên tiếng Anh (Topic English Name)
              </label>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence & Future Economy"
                value={newTopicEn}
                onChange={(e) => setNewTopicEn(e.target.value)}
                required
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Tên tiếng Việt (Topic Vietnamese Name)
              </label>
              <input
                type="text"
                placeholder="e.g. Trí tuệ Nhân tạo & Kinh tế Tương lai"
                value={newTopicVi}
                onChange={(e) => setNewTopicVi(e.target.value)}
                required
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Khung trình độ CEFR
              </label>
              <select
                value={newTopicCefr}
                onChange={(e) => setNewTopicCefr(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              >
                <option value="A1 - A2">A1 - A2 (Căn bản)</option>
                <option value="A2 - B1">A2 - B1 (Sơ - Trung cấp)</option>
                <option value="B1 - B2">B1 - B2 (Trung - Cao cấp)</option>
                <option value="B2 - C1">B2 - C1 (Chuyên gia / Học thuật)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Mô tả nội dung chủ đề
              </label>
              <textarea
                placeholder="Mô tả phạm vi từ vựng và ngữ cảnh giao tiếp..."
                value={newTopicDesc}
                onChange={(e) => setNewTopicDesc(e.target.value)}
                rows={3}
                className="w-full bg-[#181818] border border-white/10 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                URL Ảnh đại diện (Tùy chọn)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newTopicImage}
                onChange={(e) => setNewTopicImage(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-black font-semibold text-xs hover:bg-[#F5F4EC] transition-all shadow-md mt-2"
            >
              Xuất bản Chủ Đề Mới
            </button>
          </form>

          {/* Existing Topics List */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Danh sách {topics.length} Chủ đề Hiện Có
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-[#E1E0CC] flex items-center gap-2">
                      <span>{t.nameEn}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        {t.cefrRange}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.nameVi}</div>
                    <div className="text-[11px] text-gray-500 mt-1">
                      {t.branchCount} nhánh • {t.wordCount} từ vựng
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTopicId(t.id);
                        setActiveScreen('mindmap');
                      }}
                      className="p-2 rounded-xl bg-[#181818] hover:bg-primary hover:text-black text-gray-300 transition-colors"
                      title="Xem trước trên Mind-map"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {topics.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Xác nhận xóa chủ đề "${t.nameEn}"?`)) {
                            deleteTopic(t.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-[#181818] hover:bg-rose-900/50 hover:text-rose-300 text-gray-400 transition-colors"
                        title="Xóa chủ đề"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRANCH CREATION */}
      {activeTab === 'branches' && (
        <form
          onSubmit={handleCreateBranch}
          className="max-w-2xl bg-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
        >
          <h3 className="text-base font-semibold text-[#E1E0CC] flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>Thêm Nhánh Sơ Đồ Cấp 1 (Main Branch)</span>
          </h3>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Thuộc Chủ Đề
            </label>
            <select
              value={branchTopicId}
              onChange={(e) => setBranchTopicId(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameEn} ({t.nameVi})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Tên Nhánh tiếng Anh
            </label>
            <input
              type="text"
              placeholder="e.g. Brand Positioning & Identity"
              value={branchLabelEn}
              onChange={(e) => setBranchLabelEn(e.target.value)}
              required
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Tên Nhánh tiếng Việt
            </label>
            <input
              type="text"
              placeholder="e.g. Định vị Thương hiệu & Nhận diện"
              value={branchLabelVi}
              onChange={(e) => setBranchLabelVi(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Mã màu nhấn cho nhánh
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={branchColor}
                onChange={(e) => setBranchColor(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <span className="text-xs font-mono text-gray-300">{branchColor}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-black font-semibold text-xs hover:bg-[#F5F4EC] transition-all shadow-md mt-2"
          >
            Tạo Nhánh Mới Trên Sơ Đồ
          </button>
        </form>
      )}

      {/* TAB 3: VOCABULARY CREATION */}
      {activeTab === 'vocabularies' && (
        <form
          onSubmit={handleCreateVocabulary}
          className="max-w-2xl bg-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
        >
          <h3 className="text-base font-semibold text-[#E1E0CC] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Thêm Từ Vựng Mới & Tự Động Tạo Quiz</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Chủ đề
              </label>
              <select
                value={vocabTopicId}
                onChange={(e) => setVocabTopicId(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Nhánh liên kết (Tùy chọn)
              </label>
              <select
                value={vocabBranchId}
                onChange={(e) => setVocabBranchId(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              >
                <option value="">Chọn nhánh trên sơ đồ</option>
                {topicBranches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Từ vựng (English)
              </label>
              <input
                type="text"
                placeholder="e.g. leverage"
                value={vocabWord}
                onChange={(e) => setVocabWord(e.target.value)}
                required
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Phiên âm IPA
              </label>
              <input
                type="text"
                placeholder="/ˈlev.ɚ.ɪdʒ/"
                value={vocabIpa}
                onChange={(e) => setVocabIpa(e.target.value)}
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Từ loại & Trình độ
              </label>
              <div className="flex gap-1.5">
                <select
                  value={vocabPos}
                  onChange={(e) => setVocabPos(e.target.value as any)}
                  className="w-1/2 bg-[#181818] border border-white/10 rounded-xl px-2 py-2 text-xs text-gray-200 focus:outline-none"
                >
                  <option value="verb">verb</option>
                  <option value="noun">noun</option>
                  <option value="adjective">adjective</option>
                  <option value="phrase">phrase</option>
                </select>
                <select
                  value={vocabCefr}
                  onChange={(e) => setVocabCefr(e.target.value as any)}
                  className="w-1/2 bg-[#181818] border border-white/10 rounded-xl px-2 py-2 text-xs text-gray-200 focus:outline-none"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Nghĩa tiếng Việt
            </label>
            <input
              type="text"
              placeholder="e.g. Tận dụng đòn bẩy, khai thác tối đa lợi thế"
              value={vocabMeaningVi}
              onChange={(e) => setVocabMeaningVi(e.target.value)}
              required
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Định nghĩa tiếng Anh (Simple English Definition)
            </label>
            <input
              type="text"
              placeholder="e.g. To use something to maximum advantage."
              value={vocabDefEn}
              onChange={(e) => setVocabDefEn(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Câu ví dụ ngữ cảnh thực tế & Bản dịch
            </label>
            <input
              type="text"
              placeholder="Câu tiếng Anh: We can leverage AI to automate data entry."
              value={vocabExampleEn}
              onChange={(e) => setVocabExampleEn(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Bản dịch tiếng Việt: Chúng ta có thể tận dụng AI để tự động hóa nhập liệu."
              value={vocabExampleVi}
              onChange={(e) => setVocabExampleVi(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Collocations liên kết (Phân tách bằng dấu phẩy)
            </label>
            <input
              type="text"
              placeholder="e.g. leverage technology, financial leverage, gain leverage"
              value={vocabCollocations}
              onChange={(e) => setVocabCollocations(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-black font-semibold text-xs hover:bg-[#F5F4EC] transition-all shadow-md mt-2"
          >
            Lưu Từ Vựng Vào Hệ Thống Mind-map
          </button>
        </form>
      )}
    </div>
  );
};
