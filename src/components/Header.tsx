import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, User, Store, Package, 
  Sparkles, Menu, X, ChevronDown, Layers
} from 'lucide-react';
import { User as UserType, UserRole } from '../types';
import { formatPrice } from '../utils/cuid';

interface HeaderProps {
  currentUser: UserType;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
  onRoleChange: (role: UserRole) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  onOpenCart,
  onOpenAdvisor,
  onRoleChange,
  activeCategory,
  setActiveCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Handcrafted Arts' },
    { id: 'pottery', label: 'Pottery & Clay' },
    { id: 'woodwork', label: 'Teak & Woodcraft' },
    { id: 'textiles', label: 'Jamdani & Textiles' },
    { id: 'glass_resin', label: 'Resin & Botanical' },
    { id: 'jewelry', label: 'Silver & Metalsmith' },
    { id: 'custom_gifts', label: 'Bespoke Keepsakes' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2D9] transition-all">
      {/* Top Banner */}
      <div className="bg-[#1A1A1A] text-[#FAF9F6] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
          Directly Supporting 2,400+ Independent Master Artisans
        </span>
        <span className="hidden sm:inline text-stone-600">•</span>
        <button 
          onClick={onOpenAdvisor}
          className="hidden sm:inline text-xs text-amber-200 hover:text-white underline underline-offset-4 tracking-wide transition-colors cursor-pointer"
        >
          Ask AI Craft Advisor for Bespoke Orders
        </button>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setActiveView('explore'); setActiveCategory('all'); }} 
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#8B4513] text-white flex items-center justify-center shadow-xs group-hover:bg-[#72370f] transition-colors">
                <Store className="w-4 h-4 text-amber-100" />
              </div>
              <div>
                <h1 className="font-serif italic text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                  Artisans Market
                </h1>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mt-1">
                  Handcrafted Arts & Raw Supplies
                </p>
              </div>
            </button>
          </div>

          {/* Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative items-center bg-[#F0EEE6] rounded-full border border-[#E5E2D9] px-3.5 py-1.5 focus-within:ring-1 focus-within:ring-[#8B4513]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8C82] mr-2 shrink-0">SEARCH</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handcrafted ceramics, textiles, teak, or clay..."
              className="w-full bg-transparent text-xs text-[#1A1A1A] placeholder-[#8E8C82] focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#8E8C82] hover:text-[#1A1A1A] text-[10px] uppercase tracking-wider font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Actions & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Persona / Role Switcher (Crucial for multi-vendor demonstration) */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-xs font-medium text-stone-700 transition-colors cursor-pointer"
                title="Switch view mode between Buyer, Artisan Seller, Wholesaler & Admin"
              >
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="capitalize">{currentUser.role.replace('_', ' ')} Mode</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-stone-100">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Switch Persona Role</p>
                    <p className="text-xs text-stone-600 truncate">{currentUser.name}</p>
                  </div>
                  <button
                    onClick={() => { onRoleChange('user'); setActiveView('explore'); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 ${currentUser.role === 'user' ? 'font-semibold text-amber-900 bg-amber-50/50' : 'text-stone-700'}`}
                  >
                    <User className="w-4 h-4 text-stone-500" />
                    Buyer / Shopper View
                  </button>
                  <button
                    onClick={() => { onRoleChange('vendor_user'); setActiveView('seller_dashboard'); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 ${currentUser.role === 'vendor_user' ? 'font-semibold text-amber-900 bg-amber-50/50' : 'text-stone-700'}`}
                  >
                    <Store className="w-4 h-4 text-amber-700" />
                    Artisan Seller Dashboard
                  </button>
                  <button
                    onClick={() => { onRoleChange('wholesaler'); setActiveView('raw_materials'); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-amber-50 ${currentUser.role === 'wholesaler' ? 'font-semibold text-amber-900 bg-amber-50/50' : 'text-stone-700'}`}
                  >
                    <Layers className="w-4 h-4 text-emerald-700" />
                    Raw Materials Wholesaler
                  </button>
                </div>
              )}
            </div>

            {/* Raw Materials Section Link */}
            <button
              onClick={() => { setActiveView('raw_materials'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'raw_materials' 
                  ? 'bg-amber-900 text-amber-100 shadow-sm' 
                  : 'text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Raw Materials</span>
            </button>

            {/* AI Craft Advisor */}
            <button
              onClick={onOpenAdvisor}
              className="p-2 rounded-lg text-amber-900 hover:bg-amber-100/70 transition-colors relative cursor-pointer"
              title="Open AI Craft Advisor"
            >
              <Sparkles className="w-5 h-5 text-amber-800" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveView('buyer_profile')}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors relative cursor-pointer"
              title="Wishlist & Profile"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-800 text-amber-100 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-100 text-xs font-medium flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-0.5 bg-amber-500 text-amber-950 font-extrabold text-[11px] px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Seller Application */}
            {currentUser.role === 'vendor_user' ? (
              <button
                onClick={() => setActiveView('seller_dashboard')}
                className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Artisan Dashboard"
              >
                <Store className="w-5 h-5 text-amber-800" />
              </button>
            ) : (
              <button
                onClick={() => setActiveView('seller_signup')}
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-900/30 text-amber-900 hover:bg-amber-900 hover:text-white text-xs font-medium transition-all cursor-pointer"
              >
                Apply as Seller
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#E5E2D9] overflow-x-auto no-scrollbar flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (activeView !== 'explore') setActiveView('explore');
              }}
              className={`pb-1 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id && activeView === 'explore'
                  ? 'border-[#8B4513] text-[#8B4513]'
                  : 'border-transparent text-[#8E8C82] hover:text-[#1A1A1A] hover:border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setActiveView('raw_materials')}
            className={`pb-1 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'raw_materials'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#8E8C82] hover:text-[#1A1A1A]'
            }`}
          >
            <Layers className="w-3 h-3 text-[#8B4513]" />
            Wholesale Raw Materials
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handcrafted products & materials..."
              className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={() => { setActiveView('explore'); setMobileMenuOpen(false); }}
              className="p-2 text-left bg-stone-50 rounded-lg font-medium text-stone-800 hover:bg-amber-50"
            >
              Marketplace Home
            </button>
            <button 
              onClick={() => { setActiveView('raw_materials'); setMobileMenuOpen(false); }}
              className="p-2 text-left bg-stone-50 rounded-lg font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Raw Materials
            </button>
            <button 
              onClick={() => { setActiveView('buyer_profile'); setMobileMenuOpen(false); }}
              className="p-2 text-left bg-stone-50 rounded-lg font-medium text-stone-800 hover:bg-amber-50"
            >
              My Buyer Orders & Wishlist
            </button>
            <button 
              onClick={() => { setActiveView('seller_signup'); setMobileMenuOpen(false); }}
              className="p-2 text-left bg-stone-50 rounded-lg font-medium text-amber-900 hover:bg-amber-50"
            >
              Apply to Become Seller
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
