import React from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Facebook, Youtube, ShieldCheck, Truck, Phone, MapPin, Mail, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveCategory,
    setIsAboutOpen,
    setIsContactOpen,
    setIsFaqOpen,
    setIsDocsOpen,
    setIsAdminOpen,
    setIsOrderTrackingOpen,
  } = useStore();

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      {/* Top Trust Banner */}
      <div className="border-b border-neutral-900 py-8 bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-display text-lg font-bold text-white block uppercase">
              100% Genuine
            </span>
            <span className="text-[11px] text-neutral-500">Lab Tested Imports</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white block uppercase">
              48-72h Delivery
            </span>
            <span className="text-[11px] text-neutral-500">Nationwide TCS / Trax</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white block uppercase">
              Cash on Delivery
            </span>
            <span className="text-[11px] text-neutral-500">Pay at Your Doorstep</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white block uppercase">
              Pakistani Brand
            </span>
            <span className="text-[11px] text-neutral-500">Designed for Lifters</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-display text-xl font-black text-black">
              RD
            </div>
            <span className="font-display text-2xl font-black tracking-wider text-white">
              RD FITNESS
            </span>
          </div>

          <p className="text-neutral-400 leading-relaxed text-xs max-w-sm">
            Pakistan’s premier athletic performance brand. Engineered sports nutrition and heavy-duty training wear built to endure relentless gym sessions.
          </p>

          <p className="text-neutral-400 italic font-mono text-[11px]">
            "Train Hard. Look Better. Live Strong."
          </p>

          <div className="pt-2 flex items-center gap-3 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 hover:text-amber-400 hover:bg-neutral-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 hover:text-amber-400 hover:bg-neutral-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 hover:text-amber-400 hover:bg-neutral-800 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Shop Catalog */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase">
            Shop Catalog
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('supplements');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Whey Protein Isolate
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('supplements');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Micronized Creatine
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('supplements');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Pre-Workout Stimulants
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('clothing');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Oversized Heavy Cotton Tees
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('clothing');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Compression Gear
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveCategory('clothing');
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                450 GSM Heavy Hoodies
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Policy */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase">
            Customer Care
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-amber-400 transition-colors">
                Track TCS / Trax Order
              </button>
            </li>
            <li>
              <button onClick={() => setIsFaqOpen(true)} className="hover:text-amber-400 transition-colors">
                Shipping & Returns Policy
              </button>
            </li>
            <li>
              <button onClick={() => setIsFaqOpen(true)} className="hover:text-amber-400 transition-colors">
                Product Authenticity QR
              </button>
            </li>
            <li>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-amber-400 transition-colors">
                WhatsApp Hotline (+92 300)
              </button>
            </li>
            <li>
              <button onClick={() => setIsFaqOpen(true)} className="hover:text-amber-400 transition-colors">
                Privacy Policy & Terms
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Corporate & Developer Spec */}
        <div className="space-y-3">
          <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase">
            Architecture & Docs
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setIsAboutOpen(true)} className="hover:text-amber-400 transition-colors">
                About RD Fitness
              </button>
            </li>
            <li>
              <button onClick={() => setIsDocsOpen(true)} className="text-amber-400 hover:underline flex items-center gap-1 font-mono">
                <FileText className="w-3.5 h-3.5" />
                <span>Full PDF Master Spec</span>
              </button>
            </li>
            <li>
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-amber-400 transition-colors">
                Admin Command Center
              </button>
            </li>
            <li>
              <span className="text-neutral-500 font-mono text-[11px] block mt-2">
                Hub: Karachi & Lahore, PK
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment methods & Copyright bar */}
      <div className="border-t border-neutral-900 py-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-neutral-400">
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-amber-400 font-bold">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">
              Meezan Bank Wire
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">
              JazzCash
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-emerald-400">
              Easypaisa
            </span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">
              Visa / Mastercard
            </span>
          </div>

          <div className="text-[11px] text-neutral-500 text-center md:text-right">
            &copy; 2026 RD FITNESS PAKISTAN PVT LTD. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
