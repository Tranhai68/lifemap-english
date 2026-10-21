import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { playPronunciation } from '../../utils/audio';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { QuizQuestion } from '../../types';

export const QuizCenter: React.FC = () => {
  const { 
    quizState, 
    completeQuiz, 
    setActiveScreen, 
    vocabularies,
    startQuiz,
    selectedTopicId 
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [incorrectVocabIds, setIncorrectVocabIds] = useState<string[]>([]);
  const [startTime] = useState<number>(Date.now());

  // Questions from quiz state or fallback
  const questions: QuizQuestion[] = quizState?.questions || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [currentIndex]);

  // Audio autoplay for listening questions
  useEffect(() => {
    if (currentQuestion?.type === 'audio_listen' && currentQuestion.audioText) {
      playPronunciation(currentQuestion.audioText);
    }
  }, [currentQuestion]);

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 mt-16">
        <HelpCircle className="w-12 h-12 text-primary/60 mb-4" />
        <h2 className="text-xl font-bold text-[#E1E0CC]">Chưa có câu hỏi nào được chọn</h2>
        <p className="text-xs text-gray-400 mt-1 mb-6">
          Hãy chọn một chủ đề hoặc nhánh Mind-map để bắt đầu bài kiểm tra tương tác.
        </p>
        <button
          onClick={() => startQuiz(selectedTopicId, 'quick')}
          className="px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs hover:bg-[#F5F4EC]"
        >
          Làm Quick Quiz ngay
        </button>
      </div>
    );
  }

  const handleSelectOption = (opt: string) => {
    if (hasSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);

    const isCorrect = selectedOption.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      if (currentQuestion.vocabularyId) {
        setIncorrectVocabIds((prev) => [...prev, currentQuestion.vocabularyId]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Quiz finished
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      completeQuiz({
        topicId: quizState?.topicId || selectedTopicId,
        branchId: quizState?.branchId,
        quizType: quizState?.type || 'quick',
        date: new Date().toISOString(),
        score,
        total: questions.length,
        timeSpentSeconds: timeSpent,
        incorrectVocabularyIds: incorrectVocabIds,
      });
    }
  };

  const isCurrentCorrect = selectedOption?.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-10 px-4 sm:px-6 flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-2xl bg-[#121212] border border-[#DEDBC8]/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle noise */}
        <div className="noise-overlay absolute inset-0 opacity-10 pointer-events-none" />

        {/* Top Progress & Header */}
        <div className="relative z-10 flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveScreen('mindmap')}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thoát</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {quizState?.type ? `${quizState.type.replace('_', ' ')} Quiz` : 'Quiz'}
            </span>
            <span className="text-xs font-mono text-gray-400">
              Câu {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="text-xs font-semibold text-emerald-400 font-mono">
            Điểm: {score}
          </div>
        </div>

        {/* Question Prompt */}
        <div className="relative z-10 mb-6">
          <div className="text-xs uppercase tracking-widest text-primary/70 font-semibold mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {currentQuestion.type === 'audio_listen'
                ? 'Nghe & Chọn Từ'
                : currentQuestion.type === 'fill_blank'
                ? 'Điền Từ Vào Câu'
                : currentQuestion.type === 'situational'
                ? 'Ứng Dụng Tình Huống'
                : 'Chọn Đáp Án Đúng'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-[#E1E0CC] leading-relaxed">
            {currentQuestion.prompt}
          </h3>

          {/* Prompt detail (sentence fill or listening) */}
          {currentQuestion.promptDetail && (
            <div className="mt-3 p-4 rounded-2xl bg-[#181818] border border-white/5 text-sm sm:text-base text-primary/90 font-medium leading-relaxed">
              "{currentQuestion.promptDetail}"
            </div>
          )}

          {/* Audio listening trigger */}
          {currentQuestion.type === 'audio_listen' && currentQuestion.audioText && (
            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={() => playPronunciation(currentQuestion.audioText!)}
                className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
                title="Bấm để nghe lại"
              >
                <Volume2 className="w-7 h-7 stroke-[2.2]" />
              </button>
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="relative z-10 space-y-3 mb-6">
          {currentQuestion.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isCorrectOption = opt.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

            let optionStyle = 'bg-[#181818] border-white/5 text-gray-200 hover:border-white/20';

            if (hasSubmitted) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
              }
            } else if (isSelected) {
              optionStyle = 'bg-[#222] border-primary text-primary font-semibold shadow-md';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={hasSubmitted}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">{opt}</span>
                </div>

                {hasSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {hasSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Alert upon Submit */}
        {hasSubmitted && (
          <div
            className={`relative z-10 p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed ${
              isCurrentCorrect
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="font-semibold flex items-center gap-1.5 mb-1">
              {isCurrentCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Chính xác!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Chưa chính xác. Đáp án đúng: {currentQuestion.correctAnswer}</span>
                </>
              )}
            </div>
            <p className="text-gray-300 font-light mt-1">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="relative z-10 flex justify-end">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="px-8 py-3 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm hover:bg-[#F5F4EC] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-lg"
            >
              Kiểm tra đáp án
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm hover:bg-[#F5F4EC] transition-all shadow-xl flex items-center gap-2 hover:scale-105"
            >
              <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả bài học'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
