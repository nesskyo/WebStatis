import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-32 bg-neon">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="font-body text-sm uppercase tracking-[0.3em] text-ink/40 mb-4 block">
            Get In Touch
          </span>
          <h2
            className="font-display text-ink uppercase mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
          >
            Let's Work
            <br />
            <span className="text-outline">Together</span>
          </h2>
          <p className="font-body text-ink/60 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Have a project in mind? We'd love to hear about it. Drop us a line
            and let's create something extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                window.location.href = 'mailto:hello@ness.agency';
              }}
            >
              <span className="flex items-center gap-2">
                Start a Project
                <ArrowUpRight size={18} />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = 'mailto:hello@ness.agency';
              }}
            >
              Say Hello
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
