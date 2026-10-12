import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden"
    >
      {/* Background accent circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            className="font-display uppercase leading-[0.85]"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 13rem)' }}
          >
            <span className="block text-ink">We Create</span>
            <span className="block text-outline">Digital</span>
            <span className="block text-ink">
              Experi
              <span className="text-accent">ence</span>
            </span>
          </h1>
        </motion.div>

        {/* Subtext + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
        >
          <p className="font-body text-ink/60 text-base md:text-lg max-w-md leading-relaxed">
            Ness is a creative agency crafting bold brands, stunning websites,
            and memorable digital experiences that drive results.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const el = document.querySelector('#portfolio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Our Work
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3"
        >
          <div className="w-px h-16 bg-ink/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-ink"
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-ink/40">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
