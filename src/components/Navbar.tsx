import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, ShieldCheck, Menu, X, User, FileText, Truck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    activeCategory,
    setActiveCategory,
    setIsAdminOpen,
    isAdminMode,
    setIsAdminMode,
    setIsUserAccountOpen,
    setIsOrderTrackingOpen,
    setIsDocsOpen,
    setIsAboutOpen,
    setIsContactOpen,
    setIsFaqOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-black py-1 px-4 text-xs font-semibold text-center tracking-wide">
        <span className="inline-flex items-center gap-2">
          <span>⚡ FREE SHIPPING ACROSS PAKISTAN ON ORDERS ABOVE RS. 5,000</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">CASH ON DELIVERY (COD) & JAZZCASH / EASYPAISA AVAILABLE</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-display text-2xl font-black text-black tracking-tighter shadow-lg shadow-orange-950/30">
                RD
              </div>
              <div>
                <span className="font-display text-2xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors">
                  RD FITNESS
                </span>
                <span className="block text-[10px] text-neutral-400 tracking-widest font-mono uppercase">
                  PAKISTAN
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => {
                setActiveCategory('all');
                const el = document.getElementById('shop-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors hover:text-amber-400 ${
                activeCategory === 'all' ? 'text-amber-400' : 'text-neutral-300'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => {
                setActiveCategory('supplements');
                const el = document.getElementById('shop-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors hover:text-amber-400 ${
                activeCategory === 'supplements' ? 'text-amber-400' : 'text-neutral-300'
              }`}
            >
              Supplements
            </button>
            <button
              onClick={() => {
                setActiveCategory('clothing');
                const el = document.getElementById('shop-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors hover:text-amber-400 ${
                activeCategory === 'clothing' ? 'text-amber-400' : 'text-neutral-300'
              }`}
            >
              Gym Clothing
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('why-choose');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Why RD
            </button>
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Track Order</span>
            </button>
            <button
              onClick={() => setIsDocsOpen(true)}
              className="text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs"
              title="View Complete Project Architecture & Documentation"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Spec & PDF</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Admin Switcher Toggle */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setIsAdminOpen(true);
              }}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                isAdminMode
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
              title="Open Admin Dashboard & Management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAdminMode ? 'Admin Portal' : 'Admin'}</span>
            </button>

            {/* User Account */}
            <button
              onClick={() => setIsUserAccountOpen(true)}
              className="p-2 text-neutral-400 hover:text-white transition-colors relative"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsUserAccountOpen(true)}
              className="p-2 text-neutral-400 hover:text-white transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-4 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 shadow-md shadow-orange-950/20"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-black text-amber-400 text-xs px-1.5 py-0.5 rounded font-mono font-bold">
                {cartItemsCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                setActiveCategory('all');
                setMobileMenuOpen(false);
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left text-neutral-200 hover:text-amber-400 py-1 font-medium"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                setActiveCategory('supplements');
                setMobileMenuOpen(false);
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left text-neutral-200 hover:text-amber-400 py-1 font-medium"
            >
              Fitness Supplements
            </button>
            <button
              onClick={() => {
                setActiveCategory('clothing');
                setMobileMenuOpen(false);
                document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left text-neutral-200 hover:text-amber-400 py-1 font-medium"
            >
              Gym & Fitness Clothing
            </button>
            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left text-amber-400 py-1 font-medium flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Track Your Order (Pakistan)
            </button>
            <button
              onClick={() => {
                setIsDocsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left text-neutral-400 hover:text-white py-1 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Project Specification & PDF
            </button>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left text-neutral-400 hover:text-white py-1 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
