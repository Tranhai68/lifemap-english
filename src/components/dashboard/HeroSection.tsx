import React from 'react';
import { motion } from 'framer-motion';
import { WordsPullUp } from '../animations/WordsPullUp';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { setActiveScreen, setSelectedTopicId } = useApp();

  const handleStartLearning = () => {
    setSelectedTopicId('topic-business-strategy');
    setActiveScreen('mindmap');
  };

  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black flex flex-col justify-center">
      {/* Inset Container with rounded borders */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black border border-[#DEDBC8]/15 shadow-2xl">
        {/* Background Cinematic Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay on top */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/85" />

        {/* Subtle decorative badges */}
        <div className="absolute top-16 md:top-20 left-6 md:left-12 flex items-center gap-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#DEDBC8]/20 text-xs text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Organic Mind-Mapping & Real Context</span>
          </div>
        </div>

        {/* Hero Content (bottom-aligned 12-column grid) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Left 8 columns: Giant Heading */}
            <div className="lg:col-span-8 overflow-visible">
              <div className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] select-none">
                <WordsPullUp
                  text="LifeMap"
                  showAsterisk={true}
                  className="font-medium"
                />
              </div>
              <div className="mt-2 text-xs sm:text-sm tracking-widest text-[#DEDBC8]/60 uppercase font-light">
                Visual Mind Mapping & Contextual Vocabulary Lab
              </div>
            </div>

            {/* Right 4 columns: Description + CTA Button */}
            <div className="lg:col-span-4 flex flex-col justify-end gap-5">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-primary/80 text-xs sm:text-sm md:text-base leading-relaxed font-normal"
              >
                LifeMap is an organic visual intelligence ecosystem for learners to acquire fluent English vocabulary through living mind-maps, real-world context, and spaced repetition.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-wrap items-center gap-3"
              >
                {/* CTA Button "Join the lab" / "Start Mind-map" */}
                <button
                  onClick={handleStartLearning}
                  className="group inline-flex items-center gap-2 hover:gap-3 bg-primary text-black font-semibold text-sm sm:text-base pl-6 pr-2 py-2 rounded-full transition-all duration-300 shadow-xl hover:bg-[#F5F4EC]"
                >
                  <span>Khám phá Sơ đồ Tư duy</span>
                  <div className="bg-black text-primary rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={() => setActiveScreen('explorer')}
                  className="px-5 py-3 rounded-full text-xs sm:text-sm text-[#E1E0CC]/80 hover:text-white bg-black/40 hover:bg-black/60 border border-[#DEDBC8]/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Thư viện 9+ Chủ đề</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
