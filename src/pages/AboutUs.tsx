import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <header className="mb-16">
        <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">Our Mission</span>
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter text-on-surface leading-tight">
          Beyond the Search Bar: <br />
          <span className="text-on-surface-variant font-medium">True Price Intelligence.</span>
        </h1>
      </header>
      
      <div className="space-y-12 inter text-on-surface-variant leading-relaxed text-lg">
        <section className="space-y-6">
          <p>
            At <span className="text-on-surface font-bold">Scout Node</span>, we believe that the modern digital marketplace has become a fragmented labyrinth of fluctuating prices and hidden discounts. Finding the best deal shouldn't feel like a job; it should feel like a calculated victory. 
          </p>
          <p>
            We don't just "list" products. We scout them across every major platform in real-time. Our core philosophy—**The Intelligence Node**—is built on the principle of price transparency and technical accuracy. We aggregate data from Amazon, Flipkart, Croma, and hundreds of other retailers to ensure that every quote you see is the absolute cheapest available.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="bg-surface-container rounded-xl p-8 rim-light border border-white/5">
            <h3 className="text-xl font-bold text-on-surface mb-4 font-headline">Vector Scanning</h3>
            <p className="text-sm">Our system bypasses marketplace-specific algorithms to reveal true prices without hidden markups or dynamic pricing traps.</p>
          </div>
          <div className="bg-surface-container rounded-xl p-8 rim-light border border-white/5">
            <h3 className="text-xl font-bold text-on-surface mb-4 font-headline">Scout Intel Hub</h3>
            <p className="text-sm">We find and surface bank card offers, coupon codes, and bundle deals that major shopping engines often fail to calculate.</p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-on-surface font-headline tracking-tight">Our Goal</h2>
          <p>
            Our objective is to provide a unified dashboard where data feels quiet, prices are objective, and discounts are guaranteed. We leverage AI-driven comparison nodes to highlight price history and detect upcoming price drops, giving you the information needed to buy at the right time.
          </p>
          <p>
            Welcome to the future of high-end price intelligence. This is not just a search tool. This is your personal scout for finding the absolute cheapest technology and products online.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
