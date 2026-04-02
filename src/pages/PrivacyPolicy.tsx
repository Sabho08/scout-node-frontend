import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <header className="mb-16">
        <span className="text-on-surface-variant font-mono text-xs tracking-widest uppercase mb-4 block">Information Protocol</span>
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter text-on-surface leading-tight">
          Privacy <br />
          <span className="text-on-surface-variant font-medium">Standardization.</span>
        </h1>
        <p className="mt-8 text-lg text-on-surface-variant max-w-2xl">
          At **Scout Node**, our commitment to digital curation extends to how we handle your information. We prioritize data sovereignty and transparent data routing.
        </p>
      </header>
      
      <div className="space-y-12 inter text-on-surface-variant leading-relaxed text-base">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">1. Data Collection & Classification</h2>
          <p>
            When you utilize our **Price Intel Hub**, we collect essential identifiers such as your routing address (Email) and specific target thresholds (Alert Price). This data is stored in partitioned, encrypted environments to ensure that your shopping intent remains confidential and protected.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">2. Financial Profiles & Local Storage</h2>
          <p>
            Financial profiles—such as the bank cards you've enabled—are primarily stored locally on your device's secure storage to optimize latency and maximize privacy. We do not transmit or process sensitive financial credentials; our engine merely references the bank names to categorize the most relevant deals for your existing portfolio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">3. Third-Party Routing</h2>
          <p>
            Our "Check Now" and "View Deal" links utilize highly precise affiliate routing. When you leave our site, the destination platform (e.g., Amazon, Flipkart) will apply their own data protocols. We encourage you to review their respective privacy architectures as they are independent of our scout environment.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-on-surface font-headline tracking-tight">4. Transparency & Right to Removal</h2>
          <p>
            You maintain full sovereignty over your data. At any time, you may request a complete flush of your data payload from our active monitor databases. Use our **Connectivity Sync** interface or email our privacy desk directly.
          </p>
        </section>

        <footer className="pt-12 border-t border-outline-variant/10 font-mono text-[10px] uppercase tracking-widest opacity-50">
          Last Revision Checksum: v5.0.0-SN-INTEL
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
