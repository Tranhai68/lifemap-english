import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Flame, 
  Award, 
  TrendingUp, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

export const LearningProgress: React.FC = () => {
  const { 
    topics, 
    vocabularies, 
    userProfile, 
    quizHistory, 
    setSelectedTopicId, 
    setActiveScreen 
  } = useApp();

  const totalWords = vocabularies.length;
  const masteredWords = vocabularies.filter((v) => v.status === 'mastered').length;
  const learningWords = vocabularies.filter((v) => v.status === 'learning').length;
  const dueWords = vocabularies.filter((v) => v.status === 'review_due').length;

  const totalQuizzes = quizHistory.length;
  const averageAccuracy = totalQuizzes > 0
    ? Math.round(
        (quizHistory.reduce((acc, q) => acc + (q.score / (q.total || 1)), 0) / totalQuizzes) * 100
      )
    : 85;

  return (
    <div className="min-h-[calc(100vh-64px)] mt-16 w-full py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-10">
      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Báo Cáo Năng Lực & Dữ Liệu Học Tập</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#E1E0CC]">
          Learning <span className="font-serif italic text-primary">Intelligence & Analytics</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1 max-w-xl">
          Theo dõi mức độ mở rộng của bộ nhớ dài hạn, chuỗi ngày học liên tục và các chủ đề tiềm năng cần đẩy mạnh.
        </p>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Chuỗi Học Liên Tục</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-amber-400 font-mono">
            {userProfile.streakDays} ngày
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            Mục tiêu: {userProfile.dailyMinutes} phút mỗi ngày
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Đã Thành Thạo</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono">
            {masteredWords} <span className="text-sm font-normal text-gray-400">/ {totalWords}</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            Tỷ lệ thành thạo: {Math.round((masteredWords / (totalWords || 1)) * 100)}%
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Độ Chính Xác Quiz</span>
            <TrendingUp className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-sky-400 font-mono">
            {averageAccuracy}%
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            Dựa trên {totalQuizzes > 0 ? totalQuizzes : '5+'} lượt kiểm tra gần nhất
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Trình Độ Hiện Tại</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold">
              CEFR
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-primary font-mono">
            {userProfile.currentLevel}
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            Mục tiêu vươn tới: B2 / C1
          </div>
        </div>
      </div>

      {/* Topic Mastery Performance Bars */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-lg font-semibold text-[#E1E0CC] mb-1">
          Tiến độ & Mức Độ Thành Thạo Theo Từng Chủ Đề
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Đánh giá dựa trên độ sâu sơ đồ nhánh và điểm số quiz thực tế.
        </p>

        <div className="space-y-4">
          {topics.map((t) => {
            return (
              <div key={t.id} className="bg-[#181818] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-[#E1E0CC]">
                      {t.nameEn}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">({t.nameVi})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-primary">{t.progress}%</span>
                    <button
                      onClick={() => {
                        setSelectedTopicId(t.id);
                        setActiveScreen('mindmap');
                      }}
                      className="p-1 rounded-lg text-gray-400 hover:text-white"
                      title="Mở Mind-map"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#222] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-amber-300 rounded-full transition-all duration-700"
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Activity Tracker */}
      <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#E1E0CC]">
              Hoạt Động Học Tuần Này
            </h3>
            <p className="text-xs text-gray-400">
              Mỗi cột biểu thị số phút rèn luyện cùng sơ đồ tư duy LifeMap.
            </p>
          </div>
          <span className="text-xs font-mono text-primary font-semibold">
            Tổng cộng: 110 phút
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-6 border-t border-white/5 text-center">
          {[
            { day: 'T2', mins: 15, active: true },
            { day: 'T3', mins: 20, active: true },
            { day: 'T4', mins: 10, active: true },
            { day: 'T5', mins: 25, active: true },
            { day: 'T6', mins: 15, active: true },
            { day: 'T7', mins: 25, active: true },
            { day: 'CN', mins: 15, active: true }, // Today
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="h-28 w-full max-w-[36px] bg-[#1c1c1c] rounded-xl flex items-end p-1">
                <div
                  className="w-full bg-primary rounded-lg transition-all duration-500"
                  style={{ height: `${(item.mins / 30) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">{item.day}</span>
              <span className="text-[10px] text-primary/70 font-mono">{item.mins}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
