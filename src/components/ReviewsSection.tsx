import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews } = useStore();

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 mb-2 block">
              Pakistani Community Feedback
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Trusted By Athletes Across Pakistan
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl self-start">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-mono text-sm font-bold text-white tabular-nums">4.9 / 5.0</span>
            <span className="text-xs text-neutral-400">from 1,400+ orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{rev.author}</h4>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    {rev.city} {rev.gym ? `· ${rev.gym}` : ''}
                  </p>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded font-mono">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Lifter</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
