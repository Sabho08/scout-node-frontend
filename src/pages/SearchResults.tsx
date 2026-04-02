import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { amazonApi } from '../services/amazonApi';
import { convertToINR } from '../services/currency';

const FilterSection: React.FC<{ title: string; options: string[] }> = ({ title, options }) => (
  <div className="space-y-4">
    <h4 className="text-secondary-fixed text-[10px] font-bold uppercase tracking-[0.2em] mb-4 inter">{title}</h4>
    <div className="space-y-3">
      {options.map((opt, i) => (
        <label key={i} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-4 h-4 rounded border border-outline-variant/30 bg-surface-container group-hover:border-primary/50 transition-all flex items-center justify-center">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-2 h-2 rounded-sm bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors inter">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      (async () => {
        setResults([]);
        setLoading(true);
        try {
          const data = await amazonApi.search(query);
          setResults(data);
        } catch (error) {
          console.error('Search failed:', error);
        }
        setLoading(false);
      })();
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12 min-h-screen pt-32">
      {/* Sidebar - Node Controls */}
      <aside className="w-full lg:w-64 space-y-10 shrink-0">
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tighter">Refine Hub</h2>
          <p className="inter text-on-surface-variant text-xs opacity-50">Results for: <span className="italic">{query}</span></p>
        </div>

        <FilterSection title="Categories" options={['Electronics', 'Computing', 'Accessories', 'Smart Home']} />
        <FilterSection title="Marketplace Nodes" options={['Amazon India', 'Direct Import', 'Priority Sellers']} />

        <button className="w-full py-3 bg-surface-container border border-outline-variant/20 hover:border-primary transition-all text-on-surface font-bold text-[10px] uppercase tracking-widest inter">
          Reset Parameters
        </button>
      </aside>

      {/* Main Content - Matrix Grid */}
      <main className="flex-grow">
        <header className="mb-12">
          <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tighter leading-tight mb-2 uppercase select-none">
             Marketplace Matches
          </h1>
          <p className="inter text-on-surface-variant text-sm tracking-wide opacity-60">Intel matches: <span className="text-secondary-fixed font-bold">{results.length} system units</span></p>
        </header>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="aspect-[4/5] bg-surface-container animate-pulse rounded-xl"></div>
             ))}
           </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {results.map((item, i) => {
                  const asin = item.asin || item.id || '';
                  const productUrl = item.url || item.product_url || item.link || (asin ? `https://www.amazon.com/dp/${asin}` : '#');
                  const displayImage = item.image || item.product_photo || item.thumbnail || 'https://via.placeholder.com/400?text=No+Image';
                  const displayRating = item.rating || item.product_star_rating || item.stars;

                  return (
                    <motion.div 
                      key={asin || `item-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => navigate(`/compare/${asin}`)}
                      className="group cursor-pointer bg-surface-container-low/50 p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-6 bg-surface-container-highest flex items-center justify-center p-4">
                        <img 
                          alt={item.title || item.product_title} 
                          className="max-h-full max-w-full object-contain transition-transform duration-700 bg-white group-hover:scale-105" 
                          src={displayImage} 
                        />
                        {item.is_best_seller && (
                          <div className="absolute top-2 left-2 bg-tertiary text-on-tertiary px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase">
                             Best Seller
                          </div>
                        )}
                        <div className="absolute top-2 right-2 glass-recommendation px-2 py-1 rounded text-[8px] font-bold tracking-widest text-primary border border-white/5 uppercase">
                           {displayRating ? `${displayRating} Rating` : 'New Node'}
                        </div>
                      </div>
                      <div className="space-y-4 flex flex-col flex-grow">
                        <h3 className="font-bold plus-jakarta-sans text-xs leading-tight text-on-surface group-hover:text-on-surface-variant line-clamp-2 h-8">
                          {item.title || item.product_title || 'Identifier Unknown'}
                        </h3>
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <div className="flex flex-col">
                            <span className="jetbrains-mono text-lg font-bold text-on-surface">{convertToINR(item.price || item.product_price || 'Price TBA')}</span>
                            {(item.original_price || item.product_original_price) && (
                               <span className="text-[10px] text-on-surface-variant line-through opacity-50">{convertToINR(item.original_price || item.product_original_price)}</span>
                            )}
                          </div>
                          <div className="bg-primary-container/20 group-hover:bg-primary text-primary group-hover:text-on-primary transition-all p-2 rounded">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(productUrl, '_blank');
                              }}
                              className="material-symbols-outlined text-xl flex items-center justify-center"
                            >
                               open_in_new
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full py-20 text-center opacity-30">
                 <span className="material-symbols-outlined text-6xl block mb-4">search_off</span>
                 <p className="plus-jakarta-sans text-xl uppercase tracking-widest">No matching nodes detected in current sector.</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
