import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E0E0E] w-full border-t border-[#2A2A2A]/20 pt-16 pb-8 px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="text-sm font-bold text-[#E5E2E1] plus-jakarta-sans tracking-tight hover:text-primary transition-colors">
            Scout Node.
          </Link>
          <p className="inter text-[#E5E2E1]/30 text-[10px] uppercase tracking-widest leading-relaxed text-center md:text-left">
            The Multilateral Intelligence Hub. <br />
            © 2024 SN-INTEL LABS.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[10px] uppercase tracking-[0.2em] font-medium transition-all group">
          <Link to="/about" className="text-[#E5E2E1]/40 hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-[#E5E2E1]/40 hover:text-primary transition-colors">Contact</Link>
          <Link to="/privacy" className="text-[#E5E2E1]/40 hover:text-primary transition-colors">Privacy</Link>
          <Link to="/disclaimer" className="text-[#E5E2E1]/30 hover:text-tertiary transition-colors">Disclaimer</Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#E5E2E1]/20 text-sm hover:text-primary cursor-pointer transition-colors">hub</span>
          <span className="material-symbols-outlined text-[#E5E2E1]/20 text-sm hover:text-primary cursor-pointer transition-colors">dataset</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-white/[0.02] flex justify-center">
        <p className="text-[9px] text-[#E5E2E1]/10 inter tracking-tighter">
          Affiliate disclosure: Linking performance may generate a commission profile.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
