import React from 'react';
import { WordsPullUpMultiStyle } from '../animations/WordsPullUpMultiStyle';
import { ScrollRevealedText } from '../animations/AnimatedLetter';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="bg-black py-20 px-4 sm:px-6 md:px-8">
      {/* Inner card: bg-[#101010], centered text, max-w-6xl */}
      <div className="max-w-6xl mx-auto bg-[#101010] border border-[#DEDBC8]/15 rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden text-center shadow-2xl">
        {/* Subtle noise inside the card */}
        <div className="noise-overlay absolute inset-0 opacity-10 pointer-events-none" />

        {/* Top small label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#DEDBC8]/20 text-[10px] sm:text-xs text-primary uppercase tracking-widest font-semibold mb-6 sm:mb-8">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>Visual Cognitive Linguistics</span>
        </div>

        {/* Main heading using WordsPullUpMultiStyle with 3 segments */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.98] sm:leading-[0.92] text-[#E1E0CC] mb-8 sm:mb-12">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'I am Marcus Chen,',
                className: 'font-normal font-sans text-[#E1E0CC]',
              },
              {
                text: 'a self-taught director.',
                className: 'font-serif italic text-primary px-1',
              },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
                className: 'font-normal font-sans text-[#E1E0CC]',
              },
            ]}
          />
        </div>

        {/* Body paragraph with scroll-linked character opacity reveal */}
        <div className="max-w-2xl mx-auto text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed text-center flex justify-center">
          <ScrollRevealedText
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
            className="justify-center text-center font-light tracking-wide text-primary/80"
          />
        </div>
      </div>
    </section>
  );
};
