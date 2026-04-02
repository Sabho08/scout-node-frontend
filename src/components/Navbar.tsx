import React from 'react';
import { Link } from 'react-router-dom';
import { GooeySearchBar } from './GooeySearchBar';

const Navbar: React.FC = () => {
  return (
    <header className="bg-[#0e0e0e]/80 backdrop-blur-md fixed top-0 w-full z-[100] flex justify-between items-center px-8 h-16 border-b border-white/5">
      <div className="flex items-center gap-10">
        <Link to="/" className="plus-jakarta-sans font-extrabold tracking-tighter text-white text-2xl hover:text-primary transition-colors">
          SCOUT NODE
        </Link>
        <nav className="hidden md:flex gap-10 items-center">
          <Link to="/categories" className="inter font-bold uppercase tracking-widest text-[10px] text-white/40 hover:text-white transition-colors duration-200">Categories</Link>
          <Link to="/trending" className="inter font-bold uppercase tracking-widest text-[10px] text-white/40 hover:text-white transition-colors duration-200">Trending</Link>
          <Link to="/deals" className="inter font-bold uppercase tracking-widest text-[10px] text-white/40 hover:text-white transition-colors duration-200">Deals</Link>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <div className="w-[300px] flex justify-end">
          <GooeySearchBar />
        </div>
        <Link to="/profile" className="flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">person</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
