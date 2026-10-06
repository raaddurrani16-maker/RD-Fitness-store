import React from 'react';
import { ShieldCheck, Truck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Lab-Tested',
      desc: 'All whey, creatine, and amino acids undergo rigorous HPLC purity testing. Zero amino spiking, zero banned substances, and full ingredient transparency.',
      tag: 'HPLC Tested',
    },
    {
      icon: Award,
      title: 'Heavyweight Custom Apparel',
      desc: 'Engineered for bodybuilding frames. 450 GSM French Terry hoodies and 240 GSM drop-shoulder tees manufactured right here in Pakistan with export-grade stitching.',
      tag: 'Pakistani Craftsmanship',
    },
    {
      icon: Truck,
      title: 'Nationwide Express Courier',
      desc: 'Direct dispatch from our Karachi and Lahore distribution fulfillment hubs via TCS, Leopards, and Trax. Fast 48 to 72-hour doorstep delivery nationwide.',
      tag: '48-72h Delivery',
    },
    {
      icon: Sparkles,
      title: 'Pakistani Payment Methods',
      desc: 'Seamless Cash on Delivery (COD) anywhere in Pakistan, alongside verified Meezan / HBL direct bank transfers and instant JazzCash & Easypaisa wallet checkout.',
      tag: 'COD & Mobile Wallets',
    },
  ];

  return (
    <section id="why-choose" className="py-20 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
            The RD Fitness Standard
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Built For Serious Lifters. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Zero Compromise on Quality.
            </span>
          </h2>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            In a market flooded with counterfeit supplements and fragile gymwear, RD Fitness was founded to deliver authentic, world-class athletic fuel to Pakistan’s training community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-500/90 font-bold uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Guaranteed Authentic</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
