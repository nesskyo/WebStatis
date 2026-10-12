import React from 'react';

const marqueeItems = [
  'Branding',
  'Web Design',
  'Solutions',
  'Identity',
  'Strategy',
  'Development',
  'UI/UX',
  'Creative',
];

const Marquee: React.FC = () => {
  // Duplicate items for seamless loop
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-6 md:py-8 border-y border-ink/10 overflow-hidden">
      <div
        className="flex whitespace-nowrap gap-8 animate-marquee hover:[animation-play-state:paused]"
        style={{
          width: 'max-content',
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-ink/10 flex items-center gap-8"
          >
            {item}
            <span className="text-accent text-2xl">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Marquee;
