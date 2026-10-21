import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { CEFRLevel } from '../../types';
import { Check, Sparkles, X, ArrowRight } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, setShowOnboarding, userProfile, updateUserProfile, categories, setActiveScreen } = useApp();

  const [step, setStep] = useState<number>(1);
  const [level, setLevel] = useState<CEFRLevel>(userProfile.currentLevel);
  const [goal, setGoal] = useState<string>(userProfile.targetGoal);
  const [dailyMinutes, setDailyMinutes] = useState<number>(userProfile.dailyMinutes);
  const [selectedCats, setSelectedCats] = useState<string[]>(userProfile.favoriteCategoryIds || []);

  if (!showOnboarding) return null;

  const levels: { level: CEFRLevel; title: string; desc: string }[] = [
    { level: 'A1', title: 'Beginner (A1)', desc: 'Bắt đầu từ số không, nhận biết từ vựng đơn giản' },
    { level: 'A2', title: 'Elementary (A2)', desc: 'Giao tiếp tình huống cơ bản, miêu tả thói quen' },
    { level: 'B1', title: 'Intermediate (B1)', desc: 'Tự tin đối thoại công sở, trao đổi ý kiến cá nhân' },
    { level: 'B2', title: 'Upper Intermediate (B2)', desc: 'Thuyết trình, đàm phán thương mại và tư duy trừu tượng' },
  ];

  const goals = [
    'Giao tiếp công sở & kinh doanh thực chiến',
    'Thuyết trình & Marketing đa kênh',
    'Du lịch & Khám phá văn hóa toàn cầu',
    'Thể hình, rèn luyện & phong cách sống năng động',
    'Nâng cao vốn từ vựng học thuật & mở rộng tư duy',
  ];

  const durations = [5, 10, 15, 20, 30];

  const toggleCategory = (id: string) => {
    if (selectedCats.includes(id)) {
      setSelectedCats(selectedCats.filter((c) => c !== id));
    } else {
      if (selectedCats.length < 5) {
        setSelectedCats([...selectedCats, id]);
      }
    }
  };

  const handleFinish = () => {
    updateUserProfile({
      currentLevel: level,
      targetGoal: goal,
      dailyMinutes,
      favoriteCategoryIds: selectedCats,
      isOnboarded: true,
    });
    setShowOnboarding(false);
    setActiveScreen('dashboard');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#101010] border border-[#DEDBC8]/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="noise-overlay absolute inset-0 opacity-15 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setShowOnboarding(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-primary hover:bg-[#212121] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thiết lập Lộ trình Học Cá nhân hóa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#E1E0CC]">
              {step === 1 && (
                <>
                  Trình độ hiện tại của <span className="font-serif italic text-primary">bạn?</span>
                </>
              )}
              {step === 2 && (
                <>
                  Mục tiêu & <span className="font-serif italic text-primary">Thời lượng</span> mỗi ngày
                </>
              )}
              {step === 3 && (
                <>
                  Chọn tối đa <span className="font-serif italic text-primary">5 chủ đề</span> ưu tiên
                </>
              )}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Bước {step} / 3 — LifeMap English sẽ điều chỉnh độ khó và sơ đồ Mind-map tương ứng.
            </p>
          </div>

          {/* Step 1: CEFR Level */}
          {step === 1 && (
            <div className="space-y-3">
              {levels.map((item) => {
                const isSelected = level === item.level;
                return (
                  <button
                    key={item.level}
                    onClick={() => setLevel(item.level)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#212121] border-primary text-[#E1E0CC] shadow-md'
                        : 'bg-[#141414] border-white/5 text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm sm:text-base flex items-center gap-2">
                        <span>{item.title}</span>
                        {isSelected && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Đang chọn</span>}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-primary border-primary text-black' : 'border-gray-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Goal & Duration */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2.5">
                  Mục tiêu chính của bạn
                </label>
                <div className="space-y-2">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                        goal === g
                          ? 'bg-[#212121] border-primary text-primary font-medium'
                          : 'bg-[#141414] border-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2.5">
                  Thời lượng mong muốn mỗi ngày
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDailyMinutes(d)}
                      className={`py-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all ${
                        dailyMinutes === d
                          ? 'bg-primary text-black border-primary shadow-lg scale-105'
                          : 'bg-[#141414] border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {d} phút
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Favorite Topics */}
          {step === 3 && (
            <div>
              <div className="text-xs text-gray-400 mb-3 flex items-center justify-between">
                <span>Chọn các lĩnh vực bạn hứng thú nhất:</span>
                <span className="text-primary font-semibold">{selectedCats.length} / 5</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const isChecked = selectedCats.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        isChecked
                          ? 'bg-[#212121] border-primary text-[#E1E0CC]'
                          : 'bg-[#141414] border-white/5 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#E1E0CC]">{cat.nameVi}</div>
                      <div className="text-[11px] text-gray-400 truncate">{cat.nameEn}</div>
                      {isChecked && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-black flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-full text-xs text-gray-400 hover:text-white"
              >
                Quay lại
              </button>
            ) : (
              <button
                onClick={() => setShowOnboarding(false)}
                className="px-4 py-2 rounded-full text-xs text-gray-500 hover:text-gray-300"
              >
                Để sau
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#F5F4EC] transition-all"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#F5F4EC] shadow-xl hover:scale-105 transition-all"
              >
                <span>Khám phá sơ đồ tư duy</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
