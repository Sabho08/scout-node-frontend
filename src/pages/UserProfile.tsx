import React from 'react';

const UserProfile: React.FC = () => {
  return (
    <div className="pt-8 pb-16 px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">Member Dashboard</h1>
          <p className="text-on-surface-variant/70 text-lg max-w-2xl leading-relaxed">Personalize your precision engine. Manage alerts and financial profiles for optimized AI recommendations.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-high px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-surface-bright transition-colors border-t border-white/5">
            Export Report
          </button>
          <button className="bg-gradient-to-br from-primary to-primary-container px-6 py-2.5 rounded-lg font-semibold text-sm text-on-primary shadow-lg shadow-primary-container/20 hover:opacity-90 transition-all">
            System Sync
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Profile & Cards */}
        <aside className="lg:col-span-4 space-y-8">
          {/* User Profile Card */}
          <section className="bg-surface-container rounded-dashboard p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4pf92dwKJyxGtFDkoxKDW37aRgbqsrhHv1YTyRMnwHE-CGjyiSw9hDcu-YHRoDoF86kncw1kK9nhR0QDq7gsjCXDfgMpPQ3l07gJCY-kKgLmFUyfx_NfNX6INWf5PmgfhYJImu7g2EomeRQu8vnJaDNLo5I8i5qdfrIGCRVGwRCJl5Cn6w23N3P0aPjWRABP4jGcdj4PVnKN8yDx-jHJR4G-aU15anDm2umfOwlkealekSavRvkDvUCEugJ6iyzBLmcA2d9EL2VCL" 
                />
              </div>
              <div>
                <h2 className="font-headline text-xl font-bold tracking-tight">Adrian Sterling</h2>
                <p className="font-mono text-xs text-primary tracking-widest uppercase opacity-70">Elite Precision Tier</p>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-outline-variant/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Precision Score</span>
                <span className="font-mono text-secondary">94%</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary w-[94%] h-full"></div>
              </div>
            </div>
          </section>

          {/* Cards List */}
          <section className="bg-surface-container rounded-dashboard p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              <h3 className="font-headline font-bold text-lg">Financial Profile</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'HDFC Bank Platinum', label: 'HDFC', checked: true },
                { name: 'ICICI Amazon Pay', label: 'ICICI', checked: true },
                { name: 'SBI Card Prime', label: 'SBI', checked: false }
              ].map(card => (
                <label key={card.name} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-all border border-transparent hover:border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-surface-container-highest rounded-sm flex items-center justify-center text-[8px] font-bold tracking-tighter text-on-surface/50 border border-outline-variant/20">{card.label}</div>
                    <span className="text-sm font-medium">{card.name}</span>
                  </div>
                  <input defaultChecked={card.checked} className="rounded border-outline-variant/40 bg-surface-container-lowest text-primary focus:ring-offset-background focus:ring-primary w-5 h-5" type="checkbox"/>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* Price Monitor Hub */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-surface-container-low rounded-dashboard p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">notifications_active</span>
                <h3 className="font-headline font-bold text-2xl tracking-tight">Price Monitor Hub</h3>
              </div>
              <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold font-mono text-tertiary uppercase tracking-widest">3 Active Watches</span>
            </div>
            <div className="space-y-6">
              {/* Monitoring item */}
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-surface-container border-l-4 border-secondary-container">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container-lowest flex-shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkbn4yJ293b7hbI-d02nrDS6OLkCFX3Vhy9X7Y_1Oa8OLhExrvCvjBgkzicvpc2ycGAhhrv1HXgZGN3T-JMaVGIzT2bTVOs0MsR5fvLzarlXgNEG10i-WNFecAv5CJefVRnV61BiooENoMKi5EkbgQ6j6SK2tqiWJLW6AwanWLcYQ3WRnUiuWV9eVyDf7EP9clbF2qPgnYto2wYCqdKDjGJ6JFMaJjEWgdL1D7ntCDohw6wzKBReND-fEa36SJGo_Epel5G5zrQa5g" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline font-bold text-lg">Dell XPS 15 (OLED 2024)</h4>
                    <span className="text-[10px] font-mono text-on-surface-variant/40">ID: DX-4091</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Alert Trigger</p>
                      <p className="font-mono text-lg text-tertiary-fixed-dim">₹1,85,000</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Current Live</p>
                      <p className="font-mono text-lg text-secondary">₹1,79,990</p>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-end">
                      <span className="bg-secondary-container/20 text-secondary-fixed text-xs px-3 py-1.5 rounded flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">trending_down</span>
                        Target Hit!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
