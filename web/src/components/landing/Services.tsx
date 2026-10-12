import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Monitor, Megaphone, PenTool } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

interface Service {
  icon: React.ReactNode;
  title: string;
  points: string[];
}

const services: Service[] = [
  {
    icon: <Palette size={32} />,
    title: 'Brand Identity',
    points: [
      'Logo & visual identity systems',
      'Brand guidelines & strategy',
      'Color palette & typography',
      'Brand voice & messaging',
    ],
  },
  {
    icon: <Monitor size={32} />,
    title: 'Web Design',
    points: [
      'Responsive website design',
      'UI/UX design & prototyping',
      'Landing page optimization',
      'Design system creation',
    ],
  },
  {
    icon: <Megaphone size={32} />,
    title: 'Digital Marketing',
    points: [
      'Social media strategy',
      'Content creation & curation',
      'Campaign management',
      'Analytics & reporting',
    ],
  },
  {
    icon: <PenTool size={32} />,
    title: 'Creative Direction',
    points: [
      'Art direction & concepting',
      'Photography & videography',
      'Motion graphics & animation',
      'Print & packaging design',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const Services: React.FC = () => {
  return (
    <section id="services" className="px-6 md:px-12 py-20 md:py-32 bg-ink">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="What We Do" title="Services" light />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              className="group p-8 border border-cream/10 hover:border-accent/50 transition-colors duration-300"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                {service.icon}
              </div>
              <h3 className="font-display text-xl text-cream uppercase mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="font-body text-sm text-cream/50 flex items-start gap-2"
                  >
                    <span className="text-accent mt-1.5 text-xs">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
