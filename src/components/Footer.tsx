import React from 'react';
import { Store } from 'lucide-react';

interface FooterProps {
  onApplySeller: () => void;
  onOpenRawMaterials: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onApplySeller, onOpenRawMaterials }) => {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6] border-t border-[#2A2A2A] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Callout Banner */}
        <div className="p-8 rounded-tl-[32px] rounded-br-[32px] bg-[#222222] border border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">Partner With Us</p>
            <h3 className="font-serif italic text-xl sm:text-2xl font-bold">Are you an Artist or Wholesale Material Supplier?</h3>
            <p className="text-xs text-[#9E9C96]">List your handcrafted products or wholesale raw craft supplies to conscious buyers nationwide.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={onApplySeller}
              className="px-5 py-3 bg-[#8B4513] hover:bg-[#72370f] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Apply as Seller
            </button>
            <button
              onClick={onOpenRawMaterials}
              className="px-5 py-3 border border-white/30 hover:border-white text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Wholesale Hub
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#8B4513] text-white flex items-center justify-center font-bold">
                <Store className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif italic font-bold text-lg text-white">Artisans Market</span>
            </div>
            <p className="text-[#8E8C82] text-xs leading-relaxed">
              Multi-vendor marketplace empowering independent master artisans, custom crafted commissions, and wholesale raw materials.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-[0.2em] text-[#8B4513]">Craft Collections</h4>
            <ul className="space-y-1.5 text-[#8E8C82] text-xs">
              <li>Terracotta & Clay Pottery</li>
              <li>Hand-Carved Teak Wood</li>
              <li>UNESCO Royal Jamdani Saree</li>
              <li>Botanical Resin Clocks</li>
              <li>Brass Metalsmithing</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-[0.2em] text-[#8B4513]">Wholesale Raw Supply</h4>
            <ul className="space-y-1.5 text-[#8E8C82] text-xs">
              <li>Earthenware Clay Powder</li>
              <li>Seasoned Teak Timber Planks</li>
              <li>Mulberry Silk Yarns</li>
              <li>Brass & Copper Craft Sheets</li>
              <li>Natural Indigo Dyes</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-[0.2em] text-[#8B4513]">Assurance</h4>
            <ul className="space-y-1.5 text-[#8E8C82] text-xs">
              <li>Verified CUID2 Purchase Receipts</li>
              <li>Cash on Delivery & Mobile Wallet</li>
              <li>Direct Artisan Pricing Model</li>
              <li>Nationwide Express Shipping</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#8E8C82] font-medium tracking-wider uppercase gap-3">
          <p>© 2026 Artisans Market. Handcrafted Arts & Wholesale Supply.</p>
          <div className="flex items-center gap-1">
            <span>Direct Artisan Trade • Conscious Craftsmanship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

