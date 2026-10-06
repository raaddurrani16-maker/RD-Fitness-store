import React, { useState } from 'react';
import { Product, Review } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPKR, calculateDiscount } from '../utils/formatters';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Share2,
} from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen,
    reviews,
    addReview,
    products,
    setSelectedProduct,
    showToast,
  } = useStore();

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) initial[v.name] = v.options[0];
    });
    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review submission form state
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerCity, setReviewerCity] = useState<string>('Karachi');
  const [reviewerGym, setReviewerGym] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = calculateDiscount(product.price, product.oldPrice);
  const isOutOfStock = product.stock <= 0;

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariants, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review', 'error');
      return;
    }
    addReview({
      productId: product.id,
      author: reviewerName.trim(),
      city: reviewerCity,
      gym: reviewerGym.trim() || 'Home Gym',
      rating: reviewRating,
      comment: reviewComment.trim(),
    });
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-semibold">
              {product.brand}
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs text-neutral-400 capitalize">{product.subCategory}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Visual Presentation */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-inner">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                    SAVE {discountPercent}%
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Guarantees Matrix */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="bg-neutral-950/60 border border-neutral-800/80 p-2.5 rounded-lg">
                  <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-neutral-200 block">Fast TCS Delivery</span>
                  <span className="text-[10px] text-neutral-500">2-4 Days PK</span>
                </div>
                <div className="bg-neutral-950/60 border border-neutral-800/80 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-neutral-200 block">100% Genuine</span>
                  <span className="text-[10px] text-neutral-500">Lab Certified</span>
                </div>
                <div className="bg-neutral-950/60 border border-neutral-800/80 p-2.5 rounded-lg">
                  <RotateCcw className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-neutral-200 block">7-Day Return</span>
                  <span className="text-[10px] text-neutral-500">Hassle Free</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({product.reviewsCount} verified lifters)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {formatPKR(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-base text-neutral-500 line-through font-mono tabular-nums">
                      {formatPKR(product.oldPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded">
                      You save {formatPKR(product.oldPrice! - product.price)}
                    </span>
                  )}
                </div>

                {/* Stock status indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOutOfStock
                        ? 'bg-red-500'
                        : product.stock <= 5
                        ? 'bg-orange-500 animate-pulse'
                        : 'bg-emerald-500'
                    }`}
                  />
                  <span className="text-xs font-medium text-neutral-300">
                    {isOutOfStock
                      ? 'Out of Stock'
                      : product.stock <= 5
                      ? `Low Stock: Only ${product.stock} units remaining in Pakistan warehouse`
                      : `In Stock: Ready to ship via TCS / Leopards Courier`}
                  </span>
                </div>
              </div>

              {/* Variants Selector */}
              {product.variants.map((v) => (
                <div key={v.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-neutral-300 uppercase tracking-wide">
                      Select {v.name}:
                    </span>
                    <span className="text-amber-400 font-medium font-mono">
                      {selectedVariants[v.name]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => {
                      const isSelected = selectedVariants[v.name] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleVariantSelect(v.name, opt)}
                          className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-950/40'
                              : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wide block">
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-mono font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                      className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-neutral-500">
                    Max order: {product.stock} units
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs transition-transform active:scale-98 shadow-lg shadow-amber-950/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Sold Out' : 'Add to Shopping Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full bg-neutral-100 hover:bg-white text-black font-extrabold py-3.5 px-6 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 text-orange-600 fill-current" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Deep Tabs: Details, Nutrition/Specs, Reviews */}
          <div className="border-t border-neutral-800 pt-6">
            <div className="flex border-b border-neutral-800 gap-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'text-amber-400 border-amber-400'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                Description & Usage
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'specs'
                    ? 'text-amber-400 border-amber-400'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                {product.category === 'supplements' ? 'Supplement Facts' : 'Size Guide'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === 'reviews'
                    ? 'text-amber-400 border-amber-400'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
              >
                <span>Verified Reviews</span>
                <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                  {productReviews.length}
                </span>
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'details' && (
                <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                  <p>{product.fullDesc}</p>
                  {product.suggestedUsage && (
                    <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                        Suggested Direction of Use:
                      </h4>
                      <p className="text-xs text-neutral-300 leading-normal">
                        {product.suggestedUsage}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  {product.category === 'supplements' && product.nutrition ? (
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 max-w-lg space-y-3 font-mono text-xs">
                      <div className="border-b-4 border-white pb-2">
                        <h4 className="font-sans font-black text-xl text-white">SUPPLEMENT FACTS</h4>
                        <div className="flex justify-between text-neutral-400 text-xs mt-1 font-sans">
                          <span>Serving Size: {product.nutrition.servingSize}</span>
                          <span>Servings Per Container: {product.nutrition.servingsPerContainer}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 py-2 border-b border-neutral-800">
                        {product.nutrition.calories && (
                          <div className="flex justify-between py-1 border-b border-neutral-900">
                            <span className="text-neutral-300">Calories</span>
                            <span className="text-white font-bold">{product.nutrition.calories}</span>
                          </div>
                        )}
                        {product.nutrition.protein && (
                          <div className="flex justify-between py-1 border-b border-neutral-900">
                            <span className="text-neutral-300">Protein</span>
                            <span className="text-white font-bold">{product.nutrition.protein}</span>
                          </div>
                        )}
                        {product.nutrition.bcaa && (
                          <div className="flex justify-between py-1 border-b border-neutral-900">
                            <span className="text-neutral-300">BCAAs / Amino Matrix</span>
                            <span className="text-white font-bold">{product.nutrition.bcaa}</span>
                          </div>
                        )}
                        {product.nutrition.creatine && (
                          <div className="flex justify-between py-1 border-b border-neutral-900">
                            <span className="text-neutral-300">Creatine Monohydrate</span>
                            <span className="text-white font-bold">{product.nutrition.creatine}</span>
                          </div>
                        )}
                        {product.nutrition.caffeine && (
                          <div className="flex justify-between py-1 border-b border-neutral-900">
                            <span className="text-neutral-300">Caffeine Anhydrous</span>
                            <span className="text-white font-bold">{product.nutrition.caffeine}</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-2 text-[11px] text-neutral-400 font-sans">
                        <span className="font-bold text-neutral-300">Ingredients: </span>
                        {product.nutrition.ingredients.join(', ')}
                      </div>
                    </div>
                  ) : product.sizeGuide ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono border border-neutral-800 rounded-lg overflow-hidden">
                        <thead className="bg-neutral-950 text-neutral-300 uppercase">
                          <tr>
                            <th className="p-3 border-b border-neutral-800">Size</th>
                            <th className="p-3 border-b border-neutral-800">Chest</th>
                            <th className="p-3 border-b border-neutral-800">Length</th>
                            <th className="p-3 border-b border-neutral-800">Waist</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800 text-neutral-200">
                          {product.sizeGuide.sizes.map((row) => (
                            <tr key={row.size} className="hover:bg-neutral-950/40">
                              <td className="p-3 font-bold text-amber-400">{row.size}</td>
                              <td className="p-3">{row.chest}</td>
                              <td className="p-3">{row.length}</td>
                              <td className="p-3">{row.waist || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400">Standard Pakistani athletic regular fit.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews CTA & List */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">Customer Feedback</h4>
                      <p className="text-xs text-neutral-400">Authentic Pakistani athlete ratings</p>
                    </div>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
                    >
                      {showReviewForm ? 'Cancel' : 'Write a Review'}
                    </button>
                  </div>

                  {/* Submission Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl space-y-4">
                      <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
                        Submit Your Gym Experience
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Asad Ali"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">City in Pakistan</label>
                          <select
                            value={reviewerCity}
                            onChange={(e) => setReviewerCity(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                          >
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Faisalabad">Faisalabad</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Multan">Multan</option>
                            <option value="Quetta">Quetta</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Gym (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Shapes / Core / Gold's"
                            value={reviewerGym}
                            onChange={(e) => setReviewerGym(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="p-1"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= reviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-neutral-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Review Comment</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="How did the product perform during training? Taste, mixability, stitch quality..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-xs text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider"
                      >
                        Publish Verified Review
                      </button>
                    </form>
                  )}

                  {/* Reviews List */}
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic">
                      Be the first Pakistani lifter to review this item!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {productReviews.map((r) => (
                        <div key={r.id} className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{r.author}</span>
                              <span className="text-neutral-500 font-mono text-[11px]">
                                {r.city} {r.gym ? `· ${r.gym}` : ''}
                              </span>
                              {r.verified && (
                                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-neutral-500 text-[11px] font-mono">{r.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-neutral-300 leading-relaxed">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-800 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Lifters Also Purchased
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      // Reset variants & quantity for new product
                      const newVars: Record<string, string> = {};
                      rel.variants.forEach((v) => {
                        if (v.options.length > 0) newVars[v.name] = v.options[0];
                      });
                      setSelectedVariants(newVars);
                      setQuantity(1);
                    }}
                    className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors flex items-center gap-3"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-14 object-cover rounded-lg bg-neutral-900 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-semibold text-white truncate">{rel.name}</h5>
                      <span className="text-xs text-amber-400 font-bold font-mono">
                        {formatPKR(rel.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
