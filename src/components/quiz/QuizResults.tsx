import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  BrainCircuit, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen,
  Volume2
} from 'lucide-react';
import { playPronunciation } from '../../utils/audio';

export const QuizResults: React.FC = () => {
  const { 
    quizState, 
    retryQuiz, 
    setActiveScreen, 
    vocabularies,
    setSelectedVocabularyId,
    topics 
  } = useApp();

  const result = quizState?.lastResult;
  const currentTopic = topics.find((t) => t.id === result?.topicId);

  const accuracy = result && result.total > 0 ? Math.round((result.score / result.total) * 100) : 0;
  const isExcellent = accuracy >= 80;

  useEffect(() => {
    if (isExcellent) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#DEDBC8', '#10B981', '#38BDF8', '#F59E0B'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }
  }, [isExcellent]);

  if (!result) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 mt-16">
        <Trophy className="w-12 h-12 text-primary/40 mb-4" />
        <h2 className="text-xl font-bold text-[#E1E0CC]">Chưa có kết quả kiểm tra nào</h2>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="mt-4 px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs"
        >
          Về Dashboard
        </button>
      </div>
    );
  }

  // Find weak vocabularies
  const weakVocabs = vocabularies.filter((v) =>
    result.incorrectVocabularyIds.includes(v.id)
  );

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-12 px-4 sm:px-6 flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-2xl bg-[#121212] border border-[#DEDBC8]/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 opacity-10 pointer-events-none" />

        {/* Header with Trophy/Medal */}
        <div className="text-center relative z-10 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 text-primary mx-auto flex items-center justify-center mb-3 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-normal text-[#E1E0CC]">
            {isExcellent ? (
              <>
                Xuất sắc! Bạn đã <span className="font-serif italic text-primary">chinh phục</span> bài học
              </>
            ) : (
              <>
                Kết quả bài kiểm tra <span className="font-serif italic text-primary">Mind-map</span>
              </>
            )}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Chủ đề: <span className="text-primary font-medium">{currentTopic?.nameEn}</span> ({currentTopic?.nameVi})
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 relative z-10">
          <div className="bg-[#181818] p-4 rounded-2xl border border-white/5 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
              Độ chính xác
            </span>
            <div className={`text-2xl font-bold ${isExcellent ? 'text-emerald-400' : 'text-amber-400'}`}>
              {accuracy}%
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-2xl border border-white/5 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
              Điểm số
            </span>
            <div className="text-2xl font-bold text-primary">
              {result.score} / {result.total}
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-2xl border border-white/5 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
              Thời gian
            </span>
            <div className="text-2xl font-bold text-gray-200">
              {result.timeSpentSeconds}s
            </div>
          </div>

          <div className="bg-[#181818] p-4 rounded-2xl border border-white/5 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
              Từ cần ôn
            </span>
            <div className="text-2xl font-bold text-rose-400">
              {result.incorrectVocabularyIds.length}
            </div>
          </div>
        </div>

        {/* Weak Words Alert & List */}
        {weakVocabs.length > 0 && (
          <div className="bg-[#181818] border border-rose-500/20 rounded-2xl p-5 mb-8 relative z-10">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Các từ bạn cần ôn tập thêm (Đã thêm vào lịch Spaced Repetition):</span>
            </div>

            <div className="space-y-2">
              {weakVocabs.map((vocab) => (
                <div
                  key={vocab.id}
                  className="bg-[#121212] p-3 rounded-xl border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-xs text-[#E1E0CC] flex items-center gap-1.5">
                      <span>{vocab.word}</span>
                      <span className="text-[10px] font-mono text-gray-400">{vocab.ipa}</span>
                    </div>
                    <div className="text-[11px] text-primary/80 mt-0.5">{vocab.meaningVi}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => playPronunciation(vocab.word)}
                      className="p-1.5 rounded-lg bg-[#212121] text-gray-400 hover:text-primary"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedVocabularyId(vocab.id);
                        setActiveScreen('mindmap');
                      }}
                      className="text-[11px] text-primary underline"
                    >
                      Xem thẻ từ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pt-4 border-t border-white/10">
          <button
            onClick={retryQuiz}
            className="px-5 py-2.5 rounded-full bg-[#212121] text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại Quiz này</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="px-5 py-2.5 rounded-full bg-[#181818] text-gray-300 hover:text-white text-xs font-medium"
            >
              Về Dashboard
            </button>

            <button
              onClick={() => setActiveScreen('mindmap')}
              className="px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#F5F4EC] transition-all shadow-xl hover:scale-105"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Khám phá tiếp Mind-map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
