import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface BlogPost {
  issue: string;
  readTime: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  gradient: string;
  lightCategory?: boolean;
}

const posts: BlogPost[] = [
  {
    issue: '01',
    readTime: '4 min read',
    title: 'The Future of Brand Identity in 2027',
    excerpt:
      'Explore how generative systems and dynamic design languages are reshaping modern visual identity and agency strategy.',
    date: 'Oct 5, 2026',
    category: 'Branding',
    gradient: 'from-[#FF4F00] via-[#B83800] to-[#0A0A0A]',
  },
  {
    issue: '02',
    readTime: '6 min read',
    title: 'Designing for Conversion: A Deep Dive',
    excerpt:
      'Master the core interplay between minimalist aesthetic appeal, fluid motion, and measurable business conversions.',
    date: 'Sep 28, 2026',
    category: 'Web Design',
    gradient: 'from-[#4D6600] via-[#2A3800] to-[#0A0A0A]',
  },
  {
    issue: '03',
    readTime: '5 min read',
    title: 'Why Motion Design Matters More Than Ever',
    excerpt:
      'From buttery smooth micro-interactions to scroll-driven storytelling, explore why motion defines the premium web experience.',
    date: 'Sep 15, 2026',
    category: 'Motion',
    gradient: 'from-[#333333] via-[#1A1A1A] to-[#0A0A0A]',
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="Insights" title="From The Blog" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group block cursor-pointer"
            >
              {/* Graphic poster visual */}
              <div
                className={`
                  relative aspect-[16/10] mb-5 overflow-hidden border border-ink/10
                  bg-gradient-to-br ${post.gradient}
                `}
              >
                {/* Architectural grid overlay */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Large issue number */}
                <div className="absolute -bottom-4 right-3 font-display text-7xl md:text-8xl text-cream/15 select-none transition-transform duration-500 group-hover:scale-110">
                  {post.issue}
                </div>

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-body uppercase tracking-wider text-cream/70">
                  <span className="px-2.5 py-1 bg-ink/50 backdrop-blur-sm border border-cream/20 text-cream">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-body text-xs text-ink/40 tracking-wider">
                  {post.date}
                </span>
                <span className="text-ink/20">•</span>
                <span className="font-body text-xs text-accent font-semibold tracking-wider uppercase">
                  Insight
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl text-ink uppercase mb-2 flex items-start justify-between gap-2 group-hover:text-accent transition-colors duration-200">
                <span>{post.title}</span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 mt-0.5 text-ink/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </h3>

              {/* Excerpt */}
              <p className="font-body text-sm text-ink/60 leading-relaxed">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
