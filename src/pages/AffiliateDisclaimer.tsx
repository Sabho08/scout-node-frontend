import React from 'react';

const AffiliateDisclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <header className="mb-16">
        <span className="text-tertiary font-mono text-xs tracking-widest uppercase mb-4 block">Financial Discretions</span>
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter text-on-surface leading-tight">
          Affiliate <br />
          <span className="text-on-surface-variant font-medium">Link Disclosure.</span>
        </h1>
        <p className="mt-8 text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          At Scout Node, we prioritize intellectual honesty and transparent monetization. This is how our scout engine is sustained.
        </p>
      </header>

      <div className="space-y-12 inter text-on-surface-variant leading-relaxed text-base">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">1. Revenue Logic & Scouting Integrity</h2>
          <p>
            When you navigate away from our curated tech Lookbooks via our external "Check Best Deal" links, the respective commerce platform (e.g., Amazon, Flipkart, Reliance Digital) may provide a referral commission to <span className="text-on-surface font-bold text-sm">Scout Node</span> at no additional cost to your final purchase price.
          </p>
          <p>
            This ensures that our scout—the **Scout Authority**—can continue to provide deep-node analysis and precise data comparisons without charge to the end user.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">2. No Direct Endorsement Influence</h2>
          <p>
            Our AI-driven "Pick of the Month" and editorial recommendations are based on raw technical precision and value-to-performance benchmarks. Our monetization partner does not influence our scouting logic. If a product performs poorly in our spec analysis, it is filtered out regardless of affiliate potential.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">3. User Experience Commitment</h2>
          <p>
            We strive to provide the absolute direct route to the best deal. Our routing engine is optimized for accuracy, not commission volume. If a deal is better elsewhere and no affiliate link exists, we will still route you to the best price—maintaining our creed as the **The Global Scout**.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">4. Continued Support</h2>
          <p>
            Using our links is the primary way our community supports the development of our "Price Intel Hub" and our "Intel Scores." We thank you for maintaining the sustainability of this high-end technical evaluation ecosystem.
          </p>
        </section>

        <footer className="pt-12 border-t border-outline-variant/10 font-mono text-[10px] uppercase tracking-widest opacity-50">
          Last Revision: 2024-Q4 Update
        </footer>
      </div>
    </div>
  );
};

export default AffiliateDisclaimer;
