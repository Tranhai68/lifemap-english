import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
  delay = 0,
  stagger = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Flatten segments into word tokens with individual classes
  const wordsWithClasses = segments.flatMap((segment) => {
    const words = segment.text.trim().split(/\s+/);
    return words.map((w) => ({
      word: w,
      className: segment.className || '',
    }));
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={`inline-flex flex-wrap justify-center items-baseline gap-x-[0.28em] gap-y-[0.1em] ${className}`}
    >
      {wordsWithClasses.map((itemObj, i) => (
        <motion.span
          key={i}
          variants={item}
          className={`inline-block ${itemObj.className}`}
        >
          {itemObj.word}
        </motion.span>
      ))}
    </motion.div>
  );
};
