import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Aurelia',
    quote:
      'Ness transformed our brand from the ground up. Their creative vision and attention to detail exceeded every expectation we had.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Founder, NovaTech',
    quote:
      'Working with Ness was a game-changer. They delivered a website that not only looks incredible but converts visitors into customers.',
  },
  {
    name: 'Elena Volkov',
    role: 'CMO, Bloom Cosmetics',
    quote:
      'The team at Ness understands branding at a deep level. They created an identity that truly resonates with our audience.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="px-6 md:px-12 py-20 md:py-32 bg-ink">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="Testimonials" title="What They Say" light />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 border border-cream/10 flex flex-col"
            >
              <Quote size={28} className="text-accent mb-6 shrink-0" />
              <p className="font-body text-cream/70 text-base leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="mt-8 pt-6 border-t border-cream/10">
                {/* Avatar placeholder */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="font-display text-sm text-accent">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-cream">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-cream/40">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
