import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/formatters';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    showToast,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (res.success) {
      setCouponCodeInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 5000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-display text-xl font-bold text-white tracking-wide uppercase">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono bg-neutral-800 text-amber-400 px-2 py-0.5 rounded font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-neutral-950 border-b border-neutral-800 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Add <strong className="text-amber-400">{formatPKR(amountNeededForFreeShipping)}</strong> more for <strong>FREE Nationwide Delivery</strong>!
                  </span>
                </p>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Truck className="w-4 h-4" />
                <span>You’ve unlocked FREE TCS Shipping anywhere in Pakistan!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-800/60 flex items-center justify-center mb-4 text-neutral-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Your bag is empty</h3>
                <p className="text-xs text-neutral-400 max-w-xs mb-6">
                  Check out our 100% pure imported supplements and premium gym apparel.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-neutral-950/70 border border-neutral-800/80 rounded-xl flex gap-3.5 items-start"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-900 border border-neutral-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-white leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variant tags */}
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-900/95 space-y-4">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: <strong>{appliedCoupon.code}</strong></span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-neutral-400 hover:text-white underline font-mono"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. RDFIT10, TRAINHARD)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:capitalize placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-1">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-mono text-white tabular-nums">{formatPKR(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-mono tabular-nums">-{formatPKR(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery (Pakistan)</span>
                  <span className="font-mono text-white tabular-nums">
                    {cartShipping === 0 ? <span className="text-emerald-400 font-bold uppercase">Free</span> : formatPKR(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span className="uppercase tracking-wider">Estimated Total</span>
                  <span className="text-amber-400 font-mono text-base tabular-nums">
                    {formatPKR(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-lg shadow-amber-950/40"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Supports Cash on Delivery, Bank Transfer, JazzCash & Easypaisa</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
