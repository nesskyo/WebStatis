import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  label?: string;
  title: string;
  className?: string;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  title,
  className = '',
  light = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${className}`}
    >
      {label && (
        <span
          className={`
            block text-sm font-body font-medium uppercase tracking-[0.3em] mb-4
            ${light ? 'text-cream/50' : 'text-ink/40'}
          `}
        >
          {label}
        </span>
      )}
      <h2
        className={`
          font-display text-4xl md:text-6xl lg:text-7xl
          ${light ? 'text-cream' : 'text-ink'}
        `}
      >
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
