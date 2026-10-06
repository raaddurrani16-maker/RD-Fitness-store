import React from 'react';
import { useStore } from '../context/StoreContext';
import { heroImg } from '../data/mockData';
import { Zap, ShieldCheck, Truck, Award, ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleShopSupplements = () => {
    setActiveCategory('supplements');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopClothing = () => {
    setActiveCategory('clothing');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 min-h-[580px] lg:min-h-[660px] flex items-center border-b border-neutral-900">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="RD Fitness Athlete Training in Karachi Gym"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Subtle natural editorial kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Pakistan’s #1 Athletic Performance Nutrition & Apparel</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
            Train Hard. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
              Look Better.
            </span> <br />
            Live Strong.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Precision formulated supplements and heavy-duty gym apparel crafted for serious Pakistani lifters. From cold-filtered whey isolate to 240 GSM oversized streetwear—engineered for peak output.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={handleShopSupplements}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-200 transform hover:-translate-y-0.5 active:scale-98 shadow-lg shadow-amber-950/40"
            >
              <span>Shop Supplements</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleShopClothing}
              className="inline-flex items-center justify-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Shop Gym Clothing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Social Proof & Quantitative Proof Matrix (Tabular Figures) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/80">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
                25,000+
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">Pakistani Athletes</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                100%
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">Pure Lab Tested</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black text-amber-400 font-mono tabular-nums">
                48-72h
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">Nationwide TCS Delivery</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                4.9 / 5
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
