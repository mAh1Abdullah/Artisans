import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/cuid';
import { Heart, Star, Sparkles, MapPin, Sliders } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAddToCart
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl border border-[#E5E2D9] hover:border-[#8B4513]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#EAE8E0]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-[#8B4513] text-white'
              : 'bg-white/90 hover:bg-white text-stone-700 hover:text-[#8B4513]'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isCustomizable && (
            <span className="bg-[#1A1A1A]/90 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-xs border border-white/20">
              <Sliders className="w-2.5 h-2.5 text-amber-300" />
              Customizable
            </span>
          )}
          {product.isTrending && (
            <span className="bg-[#8B4513]/90 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-xs border border-white/20">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              Spotlight
            </span>
          )}
        </div>

        {/* Location & Workshop Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 text-amber-100 text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 drop-shadow-sm">
          <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
          <span className="truncate">{product.vendorLocation}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF9F6]">
        <div>
          {/* Artisan Vendor Info */}
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B4513] truncate">
            {product.vendorName}
          </p>

          {/* Product Title */}
          <h3 className="font-serif italic font-bold text-base text-[#1A1A1A] line-clamp-2 mt-0.5 group-hover:text-[#8B4513] transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Ratings & Crafts time */}
          <div className="flex items-center gap-2 mt-2 text-xs text-[#5C5A52]">
            <div className="flex items-center text-[#8B4513] font-bold gap-0.5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-600" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#8E8C82] font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[#E5E2D9]">•</span>
            <span className="text-[10px] font-medium text-[#8E8C82] uppercase tracking-wider">{product.craftTimeDays}d craft time</span>
          </div>
        </div>

        {/* Footer: Pricing & Action */}
        <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-[#1A1A1A] text-base">
                {formatPrice(product.priceCents)}
              </span>
              {product.compareAtPriceCents && (
                <span className="text-xs text-[#8E8C82] line-through">
                  {formatPrice(product.compareAtPriceCents)}
                </span>
              )}
            </div>
            <p className="text-[9px] text-[#8E8C82] font-medium uppercase tracking-wider">Artisan Direct Price</p>
          </div>

          <button
            onClick={(e) => onQuickAddToCart(product, e)}
            className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-[#8B4513] text-white text-[10px] font-bold uppercase tracking-widest transition-colors shadow-xs cursor-pointer flex items-center gap-1"
          >
            {product.isCustomizable ? 'Customize' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

