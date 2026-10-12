import React from 'react';
import { motion } from 'framer-motion';
import Tag from '../ui/Tag';
import SectionTitle from '../ui/SectionTitle';

interface PortfolioItem {
  title: string;
  category: string;
  color: string;
}

const portfolioItems: PortfolioItem[] = [
  { title: 'Aurelia Brand Identity', category: 'Branding', color: '#FF4F00' },
  { title: 'NovaTech Website', category: 'Web Design', color: '#0A0A0A' },
  { title: 'Bloom Cosmetics', category: 'Packaging', color: '#CCFF00' },
  { title: 'Zenith App UI', category: 'UI/UX', color: '#FF4F00' },
  { title: 'Meridian Studios', category: 'Branding', color: '#0A0A0A' },
  { title: 'Pulse Fitness', category: 'Web Design', color: '#CCFF00' },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="Selected Work" title="Portfolio" />

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                group relative overflow-hidden cursor-pointer
                ${i === 0 || i === 3 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'}
              `}
            >
              {/* Colored placeholder background */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: item.color }}
              >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 z-10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <Tag className="mb-3 bg-cream/90 border-transparent text-ink">
                  {item.category}
                </Tag>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream uppercase mt-2">
                  {item.title}
                </h3>
              </div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ rotate: 45 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F0E6DD" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
