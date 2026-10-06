import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/formatters';
import {
  X,
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  ShoppingBag,
  Truck,
  CheckCircle,
} from 'lucide-react';

export const UserAccountModal: React.FC = () => {
  const {
    isUserAccountOpen,
    setIsUserAccountOpen,
    currentUser,
    orders,
    wishlist,
    products,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    setIsOrderTrackingOpen,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');

  if (!isUserAccountOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                {currentUser?.name || 'Pakistani Lifter Account'}
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                {currentUser?.email || 'raaddurrani16@gmail.com'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUserAccountOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-2.5 bg-neutral-950 border-b border-neutral-800 flex gap-2 overflow-x-auto text-xs">
          {[
            { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'profile', label: 'Security & Profile', icon: Lock },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Nationwide Order History
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-10 text-neutral-500 text-xs">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="font-mono text-white text-sm">
                              {ord.orderNumber}
                            </strong>
                            <span className="text-neutral-500 font-mono text-[11px]">
                              {ord.createdAt}
                            </span>
                          </div>
                          <span className="text-neutral-400 text-[11px]">
                            Destination: {ord.shippingAddress.city}, {ord.shippingAddress.province}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-amber-400 tabular-nums">
                            {formatPKR(ord.total)}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 uppercase">
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-[11px]">
                            <div className="flex items-center gap-2">
                              <img
                                src={it.image}
                                alt={it.name}
                                className="w-8 h-8 rounded object-cover bg-neutral-900 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-neutral-200">
                                {it.name} <span className="text-neutral-500">({it.variantText}) &times; {it.quantity}</span>
                              </span>
                            </div>
                            <span className="font-mono text-neutral-400">
                              {formatPKR(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Courier & Tracking trigger */}
                      <div className="flex justify-between items-center pt-2 border-t border-neutral-800/80 text-[11px]">
                        <span className="text-neutral-400 font-mono">
                          Courier: {ord.courierName} ({ord.trackingNumber})
                        </span>
                        <button
                          onClick={() => {
                            setIsUserAccountOpen(false);
                            setIsOrderTrackingOpen(true);
                          }}
                          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Package</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Saved Items ({wishlistedProducts.length})
              </h3>

              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-10 text-neutral-500 text-xs">
                  <Heart className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Your wishlist is empty.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex gap-3 items-center text-xs"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg bg-neutral-900 shrink-0 cursor-pointer"
                        onClick={() => {
                          setIsUserAccountOpen(false);
                          setSelectedProduct(p);
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            setIsUserAccountOpen(false);
                            setSelectedProduct(p);
                          }}
                          className="font-bold text-white truncate cursor-pointer hover:text-amber-400"
                        >
                          {p.name}
                        </h4>
                        <span className="font-mono text-amber-400 font-bold block mt-0.5">
                          {formatPKR(p.price)}
                        </span>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => addToCart(p)}
                            className="bg-amber-500 hover:bg-amber-400 text-black px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="text-neutral-500 hover:text-rose-400 text-[10px] underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Saved Pakistani Delivery Addresses
              </h3>
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 uppercase text-[11px]">Primary Residence</span>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded text-[10px]">
                    Default
                  </span>
                </div>
                <p className="text-white font-medium">House 42, Street 14, Sector F-8/2</p>
                <p className="text-neutral-400">Islamabad, Islamabad Capital Territory 44000</p>
                <p className="text-neutral-500 font-mono">Mobile: 0300-8451234</p>
              </div>
            </div>
          )}

          {/* TAB: PROFILE & SECURITY */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Profile & Password
              </h3>
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.name}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={currentUser?.email}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-2">
                  <span className="font-bold text-neutral-300 block">Change Account Password</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Profile details updated successfully', 'success')}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
