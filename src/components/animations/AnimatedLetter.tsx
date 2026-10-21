import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

interface ScrollRevealedTextProps {
  text: string;
  className?: string;
}

export const ScrollRevealedText: React.FC<ScrollRevealedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {chars.map((char, index) => {
        const charProgress = index / totalChars;
        const start = Math.max(0, charProgress - 0.08);
        const end = Math.min(1, charProgress + 0.05);

        return (
          <Character
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
