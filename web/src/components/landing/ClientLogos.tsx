import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  'Aurelia', 'NovaTech', 'Bloom', 'Zenith', 'Meridian', 'Pulse', 'Vertex', 'Onyx',
];

const ClientLogos: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-16 md:py-20 border-y border-ink/10">
      <div className="max-w-[1440px] mx-auto">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-ink/40 text-center mb-10">
          Trusted by leading brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="font-display text-2xl md:text-3xl text-ink/15 uppercase hover:text-ink/40 transition-colors duration-300 cursor-default"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
