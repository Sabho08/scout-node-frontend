import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { amazonApi } from '../services/amazonApi';
import { convertToINR } from '../services/currency';

const FeatureCard: React.FC<{ icon: string, title: string, text: string, delay: number }> = ({ icon, title, text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group bg-surface-container-low p-8 rounded-xl rim-light border border-white/5 hover:border-primary/20 transition-all duration-500"
  >
    <div className="h-12 w-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary-container/20 transition-all">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold font-headline text-on-surface mb-3">{title}</h3>
    <p className="inter text-on-surface-variant text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const ProductCard: React.FC<{
  item: any;
  index: number;
}> = ({ item, index }) => {
  const navigate = useNavigate();
  const asin = item.asin || item.id || '';
  const displayImage = item.image || item.product_photo || item.thumbnail || 'https://via.placeholder.com/400?text=No+Image';
  const displayPrice = convertToINR(item.price || item.product_price || 'Price TBA');
  const displayOriginalPrice = convertToINR(item.original_price || item.product_original_price || '');
  const productUrl = item.url || item.product_url || item.link || (asin ? `https://www.amazon.com/dp/${asin}` : '#');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group cursor-pointer`}
      onClick={() => navigate(`/compare/${asin}`)}
    >
      <div className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden border border-outline-variant/10 mb-6 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] p-6 flex items-center justify-center">
        <img 
          alt={item.title} 
          className="max-h-full max-w-full object-contain transition-transform duration-1000 group-hover:scale-110" 
          src={displayImage}
        />
        {(item.deal_badge || item.is_best_seller) && (
          <div className="absolute top-4 left-4 overflow-hidden rounded-full">
            <motion.span 
               initial={{ x: -100 }}
               whileInView={{ x: 0 }}
               transition={{ delay: index * 0.1 + 0.5 }}
               className={`px-3 py-1 text-[10px] font-bold uppercase inter tracking-tighter block bg-primary text-on-primary`}
            >
              {item.deal_badge || 'Best Seller'}
            </motion.span>
          </div>
        )}
      </div>
      <div className="space-y-2 px-2">
        <h3 className="text-on-surface inter text-[11px] font-bold tracking-tight line-clamp-1">
          {item.title}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="jetbrains-mono text-xl text-on-surface font-bold">{displayPrice}</span>
            {displayOriginalPrice && (
               <span className="text-[10px] text-on-surface-variant line-through opacity-50">{displayOriginalPrice}</span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(productUrl, '_blank');
            }}
            className="inter text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-1"
          >
            Portal <span className="material-symbols-outlined text-[10px]">open_in_new</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [dealsData, bestSellersData] = await Promise.all([
          amazonApi.getDeals(),
          amazonApi.getBestSellers()
        ]);
        setDeals(dealsData.slice(0, 4) || []);
        setBestSellers(bestSellersData.slice(0, 4) || []);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container via-transparent to-transparent blur-3xl pointer-events-none"
        ></motion.div>

        <div className="relative z-10 w-full max-w-5xl text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant/20 text-on-surface-variant text-[10px] font-bold tracking-[0.2em] uppercase"
          >
             <span className="material-symbols-outlined text-xs text-primary">analytics</span> System Hub: Live Marketplace Active
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold font-headline tracking-tighter text-on-surface leading-none"
          >
            Find The Absolute <br />
            <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="text-primary italic relative inline-block"
            >
               Best Online Prices.
               <span className="absolute bottom-2 left-0 w-full h-[6px] bg-primary/20 -z-10 rounded"></span>
            </motion.span>
          </motion.h1>

          <p className="inter text-on-surface-variant text-lg max-w-2xl mx-auto opacity-70">
            Scanning thousands of marketplaces in real-time to surface global discounts and absolute cheapest prices across the web.
          </p>

          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 pt-4 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-on-surface-variant text-[10px] uppercase tracking-widest label-md font-bold col-span-2 text-center md:text-left">Live Intel Nodes:</span>
            <Link to="/search?q=iPhone%2015" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">iPhone 15</Link>
            <Link to="/search?q=RTX%204090" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">RTX 4090</Link>
            <Link to="/search?q=PlayStation%205" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">PS5 Slim</Link>
            <Link to="/search?q=Sony%20WH-1000XM5" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">XM5 Audio</Link>
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Portals Scanned Today', value: '5,000+', color: 'text-primary' },
            { label: 'Active Deals Hub', value: '12,480', color: 'text-secondary' },
            { label: 'Savings Performance', value: '99.8%', color: 'text-tertiary' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-8 border-l border-white/[0.03]"
            >
               <span className="jetbrains-mono text-5xl font-bold text-on-surface">{stat.value}</span>
               <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${stat.color}`}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hero Offer Card */}
      <section className="px-8 mb-40">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto relative w-full rounded-2xl overflow-hidden bg-surface-container-high border border-outline-variant/30 p-12 flex flex-col md:flex-row items-center gap-12 group rim-light shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
          <div className="relative z-10 flex-1 space-y-6">
            <span className="inline-flex px-4 py-1 bg-secondary-container/20 text-secondary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-secondary-container/30">Deal Insight</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface tracking-tighter leading-[0.9]">Deep Discount <br/> Tracking yield</h2>
            <p className="text-on-surface-variant inter text-lg max-w-md leading-relaxed">Integrated algorithms to reveal hidden card offers and 24-hour flash sales across global markets.</p>
            <Link to="/search?q=deals" className="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-xl shadow-2xl shadow-primary/30 font-bold hover:brightness-110 active:scale-95 transition-all">Explore Intel</Link>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative z-10 w-full md:w-2/5 aspect-square bg-white rounded-2xl overflow-hidden border border-white/5 rim-light p-10 flex items-center justify-center"
          >
             <div className="absolute inset-0 bg-primary/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              className="max-h-full max-w-full object-contain" 
              src="https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg" 
              alt="Live Deal"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Trending Grid - Live Deals */}
      <section className="px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <span className="text-secondary font-bold tracking-[0.4em] text-[10px] uppercase inter mb-4 block">Market Signal</span>
              <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tighter leading-tight">Live Discount Hub</h2>
            </div>
            <Link to="/search?q=trending" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-b border-primary pb-2 hover:opacity-70 transition-opacity">View Full Intel</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {loading ? (
               [1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-[4/5] bg-surface-container animate-pulse rounded-lg"></div>
               ))
            ) : deals.length > 0 ? (
              deals.map((item, i) => (
                <ProductCard key={item.asin} item={item} index={i} />
              ))
            ) : (
                <div className="col-span-full py-10 text-center text-on-surface-variant opacity-40 inter text-xs font-bold uppercase tracking-widest">
                   No Live Deals Detected in Current Node
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Best Sellers Grid - New Node */}
      <section className="px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
             <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase inter mb-4 block">Peak Performance</span>
             <h2 className="text-5xl font-headline font-bold text-on-surface tracking-tighter leading-tight">Marketplace Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {loading ? (
               [1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-[4/5] bg-surface-container animate-pulse rounded-lg"></div>
               ))
            ) : bestSellers.length > 0 ? (
              bestSellers.map((item, i) => (
                <ProductCard key={item.asin} item={item} index={i} />
              ))
            ) : (
                <div className="col-span-full py-10 text-center text-on-surface-variant opacity-40 inter text-xs font-bold uppercase tracking-widest">
                   Scanning Top Performance Nodes...
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
             <span className="text-primary font-mono text-xs uppercase tracking-[0.5em] block">Comparison Stack</span>
             <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">Scout Node Intelligence Ops</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="shopping_cart" title="Multi-Marketplace Scan" text="Instant comparison between Amazon, Flipkart, Croma, and specialized tech hubs." delay={0} />
            <FeatureCard icon="analytics" title="Discount Signal Hub" text="Uncover bank-specific card offers and hidden coupon nodes in real-time." delay={0.2} />
            <FeatureCard icon="monitoring" title="Price History Mapping" text="12-month technical price mapping to ensure acquisition at absolute low." delay={0.4} />
          </div>
        </div>
      </section>

      {/* About Box */}
      <section className="px-8 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative bg-surface-container rounded-[2rem] p-16 overflow-hidden border border-white/[0.03] shadow-inner rim-light"
        >
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 transition-all duration-1000"></div>
             <div className="space-y-8">
               <span className="material-symbols-outlined text-4xl text-primary">verified</span>
               <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter leading-tight">Standardizing <br/>Marketplace Transparency.</h2>
               <p className="inter text-on-surface-variant text-lg max-w-2xl text-justify">
                 Scout Node isn't just a shopping hub. It's a cross-marketplace intelligence terminal designed to identify price fluctuations and surface the absolute cheapest listed items online.
               </p>
               <div className="flex gap-6 pt-4">
                 <Link to="/about" className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface border-b border-primary pb-2 underline-offset-8">Read Mission</Link>
                 <Link to="/contact" className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface underline decoration-primary underline-offset-8">Connectivity Hub</Link>
               </div>
             </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
