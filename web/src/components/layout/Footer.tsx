import React from 'react';
import { Globe, Mail, Link, Send } from 'lucide-react';

const socialLinks = [
  { icon: <Globe size={20} />, href: '#', label: 'Website' },
  { icon: <Send size={20} />, href: '#', label: 'Telegram' },
  { icon: <Link size={20} />, href: '#', label: 'LinkedIn' },
  { icon: <Mail size={20} />, href: '#', label: 'Email' },
];

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookies', href: '#' },
];

const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="bg-ink px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 pb-12 border-b border-cream/10">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-4xl md:text-5xl text-cream tracking-tight"
          >
            NESS
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/50 hover:text-accent hover:border-accent transition-colors duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/30">
            © {currentYear} Ness Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
