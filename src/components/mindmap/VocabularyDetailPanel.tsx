import React from 'react';
import { useApp } from '../../context/AppContext';
import { playPronunciation } from '../../utils/audio';
import { 
  Volume2, 
  Bookmark, 
  CheckCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  HelpCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface VocabularyDetailPanelProps {
  onClose: () => void;
  onStartWordQuiz?: (vocabId: string) => void;
}

export const VocabularyDetailPanel: React.FC<VocabularyDetailPanelProps> = ({
  onClose,
  onStartWordQuiz,
}) => {
  const { 
    selectedVocabularyId, 
    setSelectedVocabularyId, 
    vocabularies, 
    markVocabularyStatus, 
    toggleFavorite,
    selectedTopicId,
    startQuiz
  } = useApp();

  const currentVocab = vocabularies.find((v) => v.id === selectedVocabularyId);
  const topicVocabs = vocabularies.filter((v) => v.topicId === selectedTopicId);
  const currentIndex = topicVocabs.findIndex((v) => v.id === selectedVocabularyId);

  if (!currentVocab) return null;

  const handleNext = () => {
    if (currentIndex < topicVocabs.length - 1) {
      setSelectedVocabularyId(topicVocabs[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedVocabularyId(topicVocabs[currentIndex - 1].id);
    }
  };

  const handlePlayAudio = () => {
    playPronunciation(currentVocab.word);
  };

  const isUnderstood = currentVocab.status === 'understood' || currentVocab.status === 'mastered';
  const isDifficult = currentVocab.status === 'learning' || currentVocab.status === 'review_due';

  return (
    <div className="w-full h-full bg-[#101010] border-l border-[#DEDBC8]/15 flex flex-col shadow-2xl relative z-40 overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141414]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-black uppercase tracking-wider">
            {currentVocab.cefr}
          </span>
          <span className="text-xs text-gray-400 capitalize italic">
            ({currentVocab.partOfSpeech})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(currentVocab.id)}
            className={`p-2 rounded-full transition-colors ${
              currentVocab.isFavorite
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Lưu vào danh sách yêu thích"
          >
            <Bookmark className={`w-4 h-4 ${currentVocab.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        {/* Word + IPA + Audio Play */}
        <div className="bg-[#181818] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC] tracking-tight">
                {currentVocab.word}
              </h2>
              <div className="text-xs font-mono text-primary/70 mt-1 flex items-center gap-2">
                <span>{currentVocab.ipa}</span>
              </div>
            </div>

            {/* Audio Button */}
            <button
              onClick={handlePlayAudio}
              className="w-11 h-11 rounded-full bg-primary text-black flex items-center justify-center hover:bg-[#F5F4EC] hover:scale-105 transition-all shadow-lg shrink-0"
              title="Phát âm chuẩn bản ngữ"
            >
              <Volume2 className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Vietnamese Meaning & English definition */}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
                Nghĩa tiếng Việt
              </span>
              <div className="text-sm font-semibold text-primary mt-0.5">
                {currentVocab.meaningVi}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
                Định nghĩa tiếng Anh
              </span>
              <div className="text-xs text-gray-300 font-light mt-0.5 leading-relaxed">
                {currentVocab.definitionEn}
              </div>
            </div>
          </div>
        </div>

        {/* Real Context Examples */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E1E0CC] uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Ngữ cảnh & Ví dụ Thực tế</span>
          </div>

          <div className="space-y-3">
            {currentVocab.context.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-[#141414] border border-white/5 rounded-xl p-3.5 hover:border-primary/20 transition-colors"
              >
                <div className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                  "{ex.en}"
                </div>
                <div className="text-xs text-primary/70 italic mt-1.5 leading-normal">
                  → {ex.vi}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collocations */}
        {currentVocab.context.collocations && currentVocab.context.collocations.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Cụm từ liên kết (Collocations)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentVocab.context.collocations.map((col, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#212121] border border-white/5 text-xs text-[#E1E0CC] hover:border-primary/40 transition-colors"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Synonyms & Antonyms */}
        {(currentVocab.context.synonyms || currentVocab.context.antonyms) && (
          <div className="grid grid-cols-2 gap-3">
            {currentVocab.context.synonyms && (
              <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase text-emerald-400 font-semibold block mb-1">
                  Đồng nghĩa
                </span>
                <div className="text-xs text-gray-300 space-y-0.5">
                  {currentVocab.context.synonyms.join(', ')}
                </div>
              </div>
            )}

            {currentVocab.context.antonyms && (
              <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase text-rose-400 font-semibold block mb-1">
                  Trái nghĩa
                </span>
                <div className="text-xs text-gray-300 space-y-0.5">
                  {currentVocab.context.antonyms.join(', ')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Common Mistake Alert */}
        {currentVocab.context.commonMistake && (
          <div className="bg-amber-950/20 border border-amber-600/30 rounded-xl p-3.5 text-xs text-amber-200/90 leading-relaxed">
            <span className="font-semibold text-amber-300 block mb-1">⚠️ Lưu ý sử dụng:</span>
            {currentVocab.context.commonMistake}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="p-4 border-t border-white/10 bg-[#141414]/90 backdrop-blur-md space-y-3">
        {/* Understood / Difficult Status Toggle Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => markVocabularyStatus(currentVocab.id, isUnderstood ? 'learning' : 'understood')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isUnderstood
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-[#212121] text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{isUnderstood ? 'Đã hiểu từ này' : 'Đánh dấu đã hiểu'}</span>
          </button>

          <button
            onClick={() => markVocabularyStatus(currentVocab.id, isDifficult ? 'understood' : 'learning')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isDifficult
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#212121] text-gray-300 hover:text-white border border-white/5'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{isDifficult ? 'Cần ôn thêm' : 'Đánh dấu khó'}</span>
          </button>
        </div>

        {/* Quick Quiz & Navigation */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-2 rounded-xl bg-[#212121] text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Từ trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-gray-500 px-1 font-mono">
              {currentIndex + 1} / {topicVocabs.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= topicVocabs.length - 1}
              className="p-2 rounded-xl bg-[#212121] text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Từ kế tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => startQuiz(selectedTopicId, 'quick')}
            className="py-2 px-4 rounded-xl bg-primary text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#F5F4EC] transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quick Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
