import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPKR, calculateDiscount } from '../utils/formatters';
import { Star, Heart, ShoppingBag, Eye, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, wishlist, toggleWishlist } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = calculateDiscount(product.price, product.oldPrice);
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-neutral-900/60 rounded-xl border border-neutral-800/80 overflow-hidden flex flex-col transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-950/50 hover:-translate-y-1">
      {/* Visual Image Container */}
      <div className="relative aspect-[4/3] w-full bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High-grade fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback container if image is hidden */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-500 text-center">
          <Zap className="w-8 h-8 text-amber-500/40 mb-2" />
          <span className="text-xs uppercase font-mono tracking-wider">{product.brand}</span>
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-amber-500 text-black text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-orange-500/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-neutral-900/90 hover:bg-neutral-800 text-white py-2 px-3 rounded-lg text-xs font-semibold backdrop-blur-sm border border-neutral-700/80 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Brand / Metadata */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-amber-500/90">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-neutral-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs tabular-nums">{product.rating}</span>
              <span className="text-neutral-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-semibold text-white text-base leading-snug line-clamp-2 hover:text-amber-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Short Desc snippet */}
          <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-end justify-between gap-3">
          {/* Price block */}
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                {formatPKR(product.oldPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-white font-mono tabular-nums">
              {formatPKR(product.price)}
            </span>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            onClick={() => {
              if (!isOutOfStock) {
                addToCart(product);
              }
            }}
            disabled={isOutOfStock}
            className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-150 ${
              isOutOfStock
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95 shadow-md shadow-amber-950/30'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
