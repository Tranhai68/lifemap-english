import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  showAsterisk?: boolean;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.08,
  showAsterisk = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

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
        duration: 0.6,
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
      className={`inline-flex flex-wrap items-baseline ${className}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <motion.span
            key={i}
            variants={item}
            className={`inline-block mr-[0.25em] relative ${wordClassName}`}
          >
            {word}
            {isLastWord && showAsterisk && (
              <span className="absolute top-[0.45em] -right-[0.35em] text-[0.35em] font-serif text-primary/80 select-none">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
