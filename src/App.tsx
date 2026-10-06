import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { UserAccountModal } from './components/UserAccountModal';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ReviewsSection } from './components/ReviewsSection';
import { SocialSection } from './components/SocialSection';
import { InfoPagesModals } from './components/InfoPagesModals';
import { DocumentationModal } from './components/DocumentationModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const MainStoreContent: React.FC = () => {
  const {
    products,
    activeCategory,
    selectedProduct,
    setSelectedProduct,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(30000);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Main Category check
        if (activeCategory !== 'all' && product.category !== activeCategory) {
          return false;
        }

        // Subcategory check
        if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) {
          return false;
        }

        // In-stock check
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        // Max price check
        if (product.price > maxPrice) {
          return false;
        }

        // Search text check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchDesc = product.shortDesc.toLowerCase().includes(q);
          const matchSub = product.subCategory.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc && !matchSub) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, selectedSubCategory, inStockOnly, maxPrice, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Catalog Section */}
        <section id="shop-section" className="py-12 bg-neutral-950">
          {/* Filter Bar */}
          <CategoryFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          {/* Product Grid Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Section Header with Item Count */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activeCategory === 'supplements'
                    ? 'Fitness Nutrition & Supplements'
                    : activeCategory === 'clothing'
                    ? 'Gym & Aesthetic Apparel'
                    : 'The Complete RD Collection'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Showing <span className="font-mono font-bold text-amber-400">{filteredProducts.length}</span> high-performance items
                </p>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl">
                <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                <h3 className="font-bold text-white text-base">No matching products found</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Try clearing your search filters or selecting "All Catalog".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-amber-500 text-black rounded-lg text-xs font-bold uppercase"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose RD Fitness Section */}
        <WhyChooseSection />

        {/* Athlete Reviews Section */}
        <ReviewsSection />

        {/* Social Community & Newsletter */}
        <SocialSection />
      </main>

      <Footer />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackerModal />
      <AdminDashboardModal />
      <UserAccountModal />
      <InfoPagesModals />
      <DocumentationModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainStoreContent />
    </StoreProvider>
  );
}
