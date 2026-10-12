import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Tag from '../ui/Tag';
import SectionTitle from '../ui/SectionTitle';

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  client: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Aurelia Brand Identity',
    category: 'Branding',
    image: '/images/portfolio/aurelia.jpg',
    client: 'Aurelia Paris',
  },
  {
    title: 'NovaTech Platform UI',
    category: 'Web Design',
    image: '/images/portfolio/novatech.jpg',
    client: 'NovaTech Global',
  },
  {
    title: 'Bloom Cosmetics',
    category: 'Packaging',
    image: '/images/portfolio/bloom.jpg',
    client: 'Bloom Skin',
  },
  {
    title: 'Zenith FinTech App',
    category: 'UI/UX',
    image: '/images/portfolio/zenith.jpg',
    client: 'Zenith Crypto',
  },
  {
    title: 'Meridian Studio Identity',
    category: 'Editorial',
    image: '/images/portfolio/meridian.jpg',
    client: 'Meridian Arch',
  },
  {
    title: 'Pulse Athletic Web App',
    category: 'Web Design',
    image: '/images/portfolio/pulse.jpg',
    client: 'Pulse Fitness',
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="Selected Work" title="Portfolio" />

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                group relative overflow-hidden bg-ink cursor-pointer border border-ink/10
                ${i === 0 || i === 3 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3] md:aspect-[16/10]'}
              `}
            >
              {/* Case study photo */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-300 group-hover:from-ink/95 group-hover:via-ink/40" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="bg-cream/90 text-ink border-transparent">
                      {item.category}
                    </Tag>
                    <span className="font-body text-xs text-cream/60 tracking-wider">
                      {item.client}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream uppercase">
                    {item.title}
                  </h3>
                </div>

                {/* Floating link icon */}
                <div className="w-12 h-12 rounded-none bg-accent text-cream flex items-center justify-center shrink-0 translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
