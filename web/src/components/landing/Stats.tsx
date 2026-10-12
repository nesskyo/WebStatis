import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import SectionTitle from '../ui/SectionTitle';

// Handle CJS/ESM bundler interop where default may be nested
const CountUpComponent: React.ComponentType<any> =
  typeof CountUp === 'function'
    ? CountUp
    : ((CountUp as any)?.default || CountUp);

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 40, suffix: '+', label: 'Team Members' },
];

const Stats: React.FC = () => {
  return (
    <section id="stats" className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle label="Numbers" title="Results That Speak" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-5xl md:text-6xl lg:text-7xl text-accent">
                <CountUpComponent
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  scrollSpyDelay={200}
                />
                <span>{stat.suffix}</span>
              </div>
              <p className="font-body text-sm md:text-base text-ink/50 mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
