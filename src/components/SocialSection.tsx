import React, { useState } from 'react';
import { Instagram, Send, Check } from 'lucide-react';
import { compressionTeeImg, hoodieImg, heroImg, wheyImg } from '../data/mockData';

export const SocialSection: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const gallery = [
    { img: heroImg, tag: '@hamza_lifts · Shapes Gym' },
    { img: compressionTeeImg, tag: '@bilal_fitness · DHA Karachi' },
    { img: hoodieImg, tag: '@zain_heavy · Islamabad' },
    { img: wheyImg, tag: '@rdfitnesspakistan' },
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Community Gallery */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-1 block">
                #RDFitnessPakistan
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Join The Movement
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-amber-400 transition-colors uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Follow on Instagram</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={item.img}
                  alt="RD Fitness Athlete"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                  <span className="text-xs font-mono font-bold text-amber-400 truncate">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-1">
              VIP Lifters Club
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Get Rs. 500 Off Your First Order
            </h3>
            <p className="text-xs text-neutral-400 mt-2">
              Subscribe for exclusive restock drop alerts, Pakistan athlete training guides, and members-only flash discounts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            {subscribed ? (
              <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're in! Use coupon code <strong>WELCOME500</strong> at checkout for Rs. 500 off.</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
