import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <header className="mb-16">
        <span className="text-secondary font-mono text-xs tracking-widest uppercase mb-4 block">Get Technical</span>
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter text-on-surface leading-tight">
          Establish <br />
          <span className="text-on-surface-variant font-medium">Direct Connectivity.</span>
        </h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <section className="col-span-1 md:col-span-5 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-mono">Scout Node Hub</h3>
            <p className="inter text-lg text-on-surface">114 Intel Row, <br />Digital District, <br />Metropolis SN-01</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-mono">Electronic Mail</h3>
            <p className="inter text-lg text-on-surface font-semibold">connectivity@scoutnode.tech</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-2 font-mono">System Latency</h3>
            <p className="inter text-sm text-on-surface-variant/60">Average response time: 24-48 ms (standard node hours)</p>
          </div>
        </section>

        <section className="col-span-1 md:col-span-7 bg-surface-container rounded-xl p-10 rim-light border border-white/5">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">Identification</label>
                <input className="w-full bg-surface-container-lowest border-none rounded px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all placeholder:opacity-30" placeholder="Full name..." type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">Routing</label>
                <input className="w-full bg-surface-container-lowest border-none rounded px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all placeholder:opacity-30" placeholder="Email address..." type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">Classification</label>
              <select className="w-full bg-surface-container-lowest border-none rounded px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all">
                <option>General Inquiry</option>
                <option>Partnership Proposal</option>
                <option>Technical Report</option>
                <option>Curator Request</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-mono">Payload</label>
              <textarea className="w-full bg-surface-container-lowest border-none rounded px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all h-32 resize-none placeholder:opacity-30" placeholder="Informative message content..."></textarea>
            </div>
            <button className="w-full bg-gradient-to-br from-primary to-primary-container px-8 py-3 rounded font-bold text-on-primary hover:brightness-110 active:scale-[0.98] transition-all">
              Initiate Sync
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
