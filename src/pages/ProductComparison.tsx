import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { amazonApi } from '../services/amazonApi';
import { flipkartApi } from '../services/flipkartApi';
import { motion, AnimatePresence } from 'framer-motion';
import { convertToINR } from '../services/currency';

const ProductComparison: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [flipkartMatch, setFlipkartMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        window.scrollTo(0, 0);
        setProduct(null);
        setFlipkartMatch(null);
        setRelated([]);

        try {
          const detailRes = await amazonApi.getProductDetails(id);
          const relatedRes = await amazonApi.getRelatedProducts(id);

          if (detailRes) {
            setProduct(detailRes);
            setRelated(relatedRes || []);

            // Handle images
            const rawImages = detailRes.images || detailRes.product_photos || detailRes.hi_res_images || [];
            if (rawImages.length > 0) {
              const firstImg = typeof rawImages[0] === 'string' ? rawImages[0] : (rawImages[0].url || rawImages[0].link);
              setActiveImage(firstImg || detailRes.image || detailRes.product_photo || '');
            } else {
              setActiveImage(detailRes.image || detailRes.product_photo || '');
            }

            // Marketplace Scout Logic (Flipkart)
            try {
              console.log('Initiating Marketplace Scout for:', detailRes.title);
              const searchResults = await flipkartApi.search(detailRes.title);
              if (searchResults && searchResults.length > 0) {
                const matchedId = searchResults[0].product_id || searchResults[0].pid || searchResults[0].id;
                if (matchedId) {
                  console.log('Fetching Flipkart details for PID:', matchedId);
                  const fkDetails = await flipkartApi.getProductDetails(matchedId);
                  if (fkDetails) {
                    setFlipkartMatch(fkDetails);
                    console.log('Flipkart Deep Scan Success!');
                  }
                }
              }
            } catch (fkErr) {
              console.error("Marketplace Scout failed:", fkErr);
            }
          }
        } catch (error) {
          console.error('Core Intel Node Failure:', error);
        }
        setLoading(false);
      })();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-primary font-mono text-xs uppercase tracking-widest inter">Scanning Intel Node...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface pt-32">
        <p className="plus-jakarta-sans text-xl opacity-50">Intel Node not found. ASIN mismatch.</p>
      </div>
    );
  }

  // Consistent image derivation for the gallery
  const allImages = [...(product.images || []), ...(product.product_photos || []), ...(product.hi_res_images || [])]
    .map((img: any) => typeof img === 'string' ? img : (img.url || img.link || img.hi_res || img.src || img.large))
    .filter((url, index, self) => url && self.indexOf(url) === index) || [];

  if (allImages.length === 0 && (product.image || product.product_photo)) {
    allImages.push(product.image || product.product_photo);
  }

  const features = Array.isArray(product.bullet_points) ? product.bullet_points : (Array.isArray(product.about_product) ? product.about_product : (Array.isArray(product.features) ? product.features : []));

  // Safe rendering helper to prevent object-as-child errors
  const renderSafe = (val: any) => {
    if (val === null || val === undefined) return '';
    if (Array.isArray(val)) return '';
    if (typeof val === 'object') {
      const inner = val.average || val.overall || val.value || val.text || val.label || val.name || val.price || '';
      return typeof inner === 'object' ? '...' : String(inner);
    }
    return String(val);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-32">
      <section className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-1/2 flex flex-col gap-4"
        >
          <div className="aspect-square bg-white rounded-lg overflow-hidden relative rim-light p-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                alt={renderSafe(product.title)}
                className="max-h-full max-w-full object-contain"
                src={activeImage || 'https://via.placeholder.com/600?text=No+Image+Available'}
              />
            </AnimatePresence>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {allImages.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(typeof img === 'string' ? img : img.url)}
                  className={`flex-shrink-0 w-20 h-20 bg-white rounded-md p-2 border-2 transition-all ${activeImage === (typeof img === 'string' ? img : img.url) ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={typeof img === 'string' ? img : img.url} alt="thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-primary-fixed-dim label-md tracking-[0.2em] uppercase font-bold text-xs">
              {renderSafe(product.category_path?.[0]?.name || product.category || 'Best Value Node')}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold plus-jakarta-sans tracking-tight text-on-surface leading-[1.2]">
              {renderSafe(product.title)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span className="jetbrains-mono text-sm font-bold">{renderSafe(product.rating || 'N/A')}</span>
            </div>
            <span className="text-on-surface-variant text-xs opacity-50">|</span>
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{renderSafe(product.reviews_count || product.ratings_count || 0)} Ratings</span>
          </div>

          <div className="mt-2 p-6 rounded-xl bg-secondary-container/10 border border-secondary-container flex items-center gap-5 shadow-[0_10px_40px_-15px_rgba(50,160,151,0.3)]">
            <div className="h-12 w-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
            </div>
            <div>
              <p className="text-secondary text-sm font-bold tracking-wide uppercase mb-1">Live Price Node</p>
              <div className="flex items-end gap-3">
                <p className="text-on-surface font-semibold text-2xl leading-none jetbrains-mono">
                  {convertToINR(product.price || product.product_price || 'Price TBA')}
                </p>
                {(product.original_price || product.product_original_price) && (
                  <span className="text-sm text-on-surface-variant line-through opacity-60 mb-1">{convertToINR(product.original_price || product.product_original_price)}</span>
                )}
              </div>
            </div>
          </div>

          {flipkartMatch && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 rounded-2xl bg-secondary/5 border border-secondary/20 flex flex-col gap-6 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute -right-8 -top-8 opacity-5 rotate-12 group-hover:rotate-0 transition-all duration-1000">
                <span className="material-symbols-outlined text-[140px] text-secondary">rocket_launch</span>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(50,160,151,0.5)]"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary inter">Live Marketplace Scout: FLIPKART</span>
                </div>
                <div className="bg-secondary/10 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase text-secondary border border-secondary/20">Active Node</div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="w-24 h-24 rounded-xl bg-white p-2 shadow-inner group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                  <img
                    src={flipkartMatch.images?.[0] || flipkartMatch.product_photos?.[0] || flipkartMatch.product_photo || flipkartMatch.thumbnail_url}
                    alt="Flipkart Node"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-on-surface line-clamp-1 mb-2 tracking-tight group-hover:text-secondary transition-colors">
                    {renderSafe(flipkartMatch.title || flipkartMatch.product_title || flipkartMatch.product_name)}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase opacity-50 inter mb-1">Listed Price</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl jetbrains-mono font-bold text-on-surface">
                          {convertToINR(flipkartMatch.pricing?.sellingPrice || flipkartMatch.price || flipkartMatch.product_price, true)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase opacity-50 inter mb-1">Consumer Rating</span>
                      <div className="flex items-center gap-2">
                        {flipkartMatch.rating ? (
                          <>
                            <span className="text-lg jetbrains-mono font-bold text-secondary">
                              {renderSafe(flipkartMatch.rating)}★
                            </span>
                            <span className="text-[10px] text-on-surface-variant opacity-50 mb-0.5">
                              ({renderSafe(flipkartMatch.rating?.count || flipkartMatch.product_ratings || 'Global')})
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] text-on-surface-variant italic">Scanning ratings...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex pt-4 border-t border-outline-variant/10 relative z-10">
                <a
                  href={flipkartMatch.url || `https://www.flipkart.com/search?q=${encodeURIComponent(renderSafe(flipkartMatch.title || ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-secondary text-on-secondary rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-secondary/30 transition-all border border-white/10 group/btn"
                >
                  Go To Flipkart Portal
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">bolt</span>
                </a>
              </div>
            </motion.div>
          )}

          {features && Array.isArray(features) && features.length > 0 && (
            <div className="mt-4 space-y-3">
              <h3 className="text-on-surface font-bold text-sm uppercase tracking-widest">Key Specifications</h3>
              <ul className="space-y-2">
                {features.slice(0, 5).map((feature: any, idx: number) => (
                  <li key={idx} className="flex gap-3 text-on-surface-variant text-sm inter leading-relaxed">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                    <span>{renderSafe(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={`https://www.amazon.com/dp/${product.asin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 mt-4"
          >
            Visit Amazon Portal
            <span className="material-symbols-outlined text-xl">open_in_new</span>
          </a>
        </div>
      </section>

      {/* Related Products Node */}
      {related.length > 0 && (
        <section className="pt-10 border-t border-outline-variant/10">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase inter mb-2 block">System Recommendations</span>
              <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tighter leading-tight">Related Nodes</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.slice(0, 4).map((item, i) => (
              <Link
                to={`/compare/${item.asin || item.id}`}
                key={item.asin || i}
                className="group bg-surface-container-low/50 p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-6 bg-surface-container-highest flex items-center justify-center p-4">
                  <img
                    alt={item.title || item.product_title}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 bg-white group-hover:scale-105"
                    src={item.image || item.product_photo || item.thumbnail || item.thumbnail_url || 'https://via.placeholder.com/400?text=No+Image'}
                  />
                </div>
                <div className="space-y-2 flex flex-col flex-grow">
                  <h3 className="font-bold plus-jakarta-sans text-xs leading-tight text-on-surface group-hover:text-on-surface-variant line-clamp-2 h-8">
                    {item.title || item.product_title || 'Identifier Unkown'}
                  </h3>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="jetbrains-mono text-lg font-bold text-on-surface">{convertToINR(item.price || item.product_price || 'Price TBA')}</span>
                    <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductComparison;
