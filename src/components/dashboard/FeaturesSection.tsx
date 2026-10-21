import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { setActiveScreen } = useApp();

  const cardsVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Subtle .bg-noise overlay at opacity-[0.15] */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Studio-grade workflows for visionary creators.',
                  className: 'text-primary block sm:inline',
                },
              ]}
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-2">
            <WordsPullUpMultiStyle
              delay={0.3}
              segments={[
                {
                  text: 'Built for pure vision. Powered by art.',
                  className: 'text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        {/* 4-column card grid (lg:h-[480px], gap-3 sm:gap-2 md:gap-2) */}
        <motion.div
          ref={containerRef}
          variants={cardsVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 lg:h-[480px]"
        >
          {/* Card 1 - Video Card */}
          <motion.div
            variants={cardItem}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[360px] lg:min-h-full border border-white/10 group shadow-xl"
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-widest text-primary/70 font-semibold mb-1 block">
                Visual Matrix
              </span>
              <h3 className="text-xl sm:text-2xl font-serif italic text-[#E1E0CC]">
                Your creative canvas.
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Project Storyboard (01) */}
          <motion.div
            variants={cardItem}
            className="bg-[#212121] border border-white/5 rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-primary/30 transition-all duration-300 group"
          >
            <div>
              {/* Top Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-5 border border-white/10 shadow-md">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                  alt="Storyboard icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#E1E0CC]">Project Storyboard</h4>
                <span className="text-xs font-mono text-gray-500">01</span>
              </div>

              {/* Checklist items */}
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Sơ đồ tư duy dạng rễ cây hữu cơ</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Phân tầng Level 0 đến Level 3</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Mã hóa màu sắc riêng biệt cho từng nhánh</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Thu phóng và tập trung từ vựng mượt mà</span>
                </li>
              </ul>
            </div>

            {/* Learn more */}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button
                onClick={() => setActiveScreen('mindmap')}
                className="inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:text-white transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 3 - Smart Critiques (02) */}
          <motion.div
            variants={cardItem}
            className="bg-[#212121] border border-white/5 rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-primary/30 transition-all duration-300 group"
          >
            <div>
              {/* Top Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-5 border border-white/10 shadow-md">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                  alt="Smart Critiques icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#E1E0CC]">Smart Critiques</h4>
                <span className="text-xs font-mono text-gray-500">02</span>
              </div>

              {/* Checklist items */}
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Kiểm tra tức thời 6 dạng bài tương tác</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Giải thích ngữ cảnh sâu sắc cho mỗi đáp án</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Phát hiện từ yếu và tự động lên lịch ôn tập</span>
                </li>
              </ul>
            </div>

            {/* Learn more */}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button
                onClick={() => setActiveScreen('quiz')}
                className="inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:text-white transition-colors"
              >
                <span>Practice quiz</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 4 - Immersion Capsule (03) */}
          <motion.div
            variants={cardItem}
            className="bg-[#212121] border border-white/5 rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-primary/30 transition-all duration-300 group"
          >
            <div>
              {/* Top Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-5 border border-white/10 shadow-md">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                  alt="Immersion Capsule icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Number */}
              <div className="flex items-baseline justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#E1E0CC]">Immersion Capsule</h4>
                <span className="text-xs font-mono text-gray-500">03</span>
              </div>

              {/* Checklist items */}
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Âm thanh phát âm bản ngữ đồng bộ IPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>3 chế độ: Mindmap, Guided & Flashcard 3D</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Thuật toán ngắt quãng Spaced Repetition</span>
                </li>
              </ul>
            </div>

            {/* Learn more */}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button
                onClick={() => setActiveScreen('vocabulary')}
                className="inline-flex items-center gap-1.5 text-xs text-primary font-medium group-hover:text-white transition-colors"
              >
                <span>Explore capsule</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
