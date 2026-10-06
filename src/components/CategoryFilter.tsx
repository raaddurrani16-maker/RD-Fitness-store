import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface CategoryFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (sub: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSubCategory,
  setSelectedSubCategory,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  maxPrice,
  setMaxPrice,
}) => {
  const { activeCategory, setActiveCategory } = useStore();

  const supplementSubCats = [
    { id: 'all', label: 'All Supplements' },
    { id: 'whey', label: 'Whey Protein' },
    { id: 'creatine', label: 'Creatine' },
    { id: 'preworkout', label: 'Pre-Workout' },
    { id: 'massgainer', label: 'Mass Gainers' },
    { id: 'bcaa', label: 'BCAA / EAA' },
    { id: 'vitamins', label: 'Vitamins & Minerals' },
    { id: 'electrolytes', label: 'Electrolytes' },
  ];

  const clothingSubCats = [
    { id: 'all', label: 'All Gym Wear' },
    { id: 'compression', label: 'Compression Tops' },
    { id: 'oversized', label: 'Oversized Tees' },
    { id: 'tank', label: 'Tank Tops' },
    { id: 'shorts', label: 'Gym Shorts' },
    { id: 'joggers', label: 'Joggers' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'hoodie', label: 'Hoodies' },
  ];

  const currentSubCats =
    activeCategory === 'supplements'
      ? supplementSubCats
      : activeCategory === 'clothing'
      ? clothingSubCats
      : [
          { id: 'all', label: 'All Categories' },
          { id: 'whey', label: 'Whey Protein' },
          { id: 'creatine', label: 'Creatine' },
          { id: 'preworkout', label: 'Pre-Workout' },
          { id: 'compression', label: 'Compression' },
          { id: 'oversized', label: 'Oversized Tees' },
          { id: 'hoodie', label: 'Hoodies' },
          { id: 'joggers', label: 'Joggers' },
        ];

  return (
    <div className="bg-neutral-900/40 border-y border-neutral-800/80 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Top Filter Level: Category Segmented Control + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 shrink-0">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Catalog
            </button>
            <button
              onClick={() => {
                setActiveCategory('supplements');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                activeCategory === 'supplements'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Supplements
            </button>
            <button
              onClick={() => {
                setActiveCategory('clothing');
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                activeCategory === 'clothing'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Gym Clothing
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Whey, Creatine, Hoodies, Joggers, Compression..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-9 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & In-Stock filter */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-200 px-3 py-2 pr-8 focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="bestseller">Best Sellers</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-neutral-300 cursor-pointer select-none px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>In Stock</span>
            </label>
          </div>
        </div>

        {/* Subcategories bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {currentSubCats.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(sub.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedSubCategory === sub.id
                  ? 'bg-neutral-200 text-black font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
