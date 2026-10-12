import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`
        inline-block px-3 py-1
        text-xs font-body font-semibold uppercase tracking-widest
        border border-ink/20 text-ink/70
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Tag;
