import React from 'react';
import { Sparkles, ArrowRight, Layers, Bot } from 'lucide-react';

interface HeroProps {
  onExploreCrafts: () => void;
  onOpenRawMaterials: () => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCrafts,
  onOpenRawMaterials,
  onOpenAdvisor
}) => {
  return (
    <div className="relative bg-[#FAF9F6] border-b border-[#E5E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Featured Collection Text & Categories */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 pr-0 lg:pr-6 lg:border-r border-[#E5E2D9]">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
                Featured Collection
              </p>
              
              <h1 className="text-5xl sm:text-7xl font-serif leading-[0.9] -ml-1 italic text-[#1A1A1A] font-bold tracking-tight">
                Curated<br />Heritage.
              </h1>

              <p className="pt-2 text-xs sm:text-sm text-[#5C5A52] leading-relaxed max-w-sm">
                Connecting conscious collectors with independent master artisans. Every piece is an immutable record of craftsmanship, secured by high-integrity commerce standards.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={onExploreCrafts}
                  className="bg-[#8B4513] hover:bg-[#72370f] text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
                </button>

                <button
                  onClick={onOpenRawMaterials}
                  className="bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Wholesale Hub</span>
                </button>
              </div>
            </div>

            {/* Editorial Category Index Lines */}
            <div className="space-y-3.5 pt-4 border-t border-[#E5E2D9]">
              <div 
                onClick={onExploreCrafts}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#5C5A52] group-hover:text-[#8B4513] transition-colors">
                  <span>01 / Terracotta & Clay</span>
                  <span className="text-[10px] text-[#8E8C82] font-normal lowercase">pottery studio</span>
                </div>
                <div className="h-px w-full bg-[#E5E2D9] mt-1.5 group-hover:bg-[#8B4513] transition-colors" />
              </div>

              <div 
                onClick={onExploreCrafts}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#5C5A52] group-hover:text-[#8B4513] transition-colors">
                  <span>02 / Jamdani Textiles</span>
                  <span className="text-[10px] text-[#8E8C82] font-normal lowercase">handloom silk</span>
                </div>
                <div className="h-px w-full bg-[#E5E2D9] mt-1.5 group-hover:bg-[#8B4513] transition-colors" />
              </div>

              <div 
                onClick={onExploreCrafts}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#5C5A52] group-hover:text-[#8B4513] transition-colors">
                  <span>03 / Hand-Carved Teak</span>
                  <span className="text-[10px] text-[#8E8C82] font-normal lowercase">solid timber</span>
                </div>
                <div className="h-px w-full bg-[#E5E2D9] mt-1.5 group-hover:bg-[#8B4513] transition-colors" />
              </div>
            </div>
          </div>

          {/* Column 2: Arch Gallery & Editorial Spotlight */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8 items-stretch">
            
            {/* Arch Shaped Featured Product Frame */}
            <div className="flex-1 flex flex-col justify-between bg-[#F5F2ED] p-6 rounded-t-[180px] border border-[#E5E2D9] shadow-xs">
              <div className="aspect-[3/4] rounded-t-[160px] overflow-hidden relative group border border-[#E5E2D9] bg-[#EAE8E0]">
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600"
                  alt="Obsidian Terracotta Pitcher"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-200 mb-1">Spotlight Masterpiece</p>
                  <p className="text-xl font-serif italic font-bold">Obsidian Glaze Pitcher</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center pt-2">
                <div>
                  <p className="text-[10px] text-[#8E8C82] font-bold uppercase tracking-widest">Handcrafted In</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">Dhamrai Pottery Village</p>
                </div>
                <button
                  onClick={onExploreCrafts}
                  className="bg-white border border-[#E5E2D9] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                >
                  View Item
                </button>
              </div>
            </div>

            {/* Dark Editorial Box: Raw Materials & AI Craft Portal */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="bg-[#1A1A1A] text-white p-7 rounded-tl-[40px] rounded-br-[40px] shadow-2xl space-y-4 border border-[#2A2A2A]">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">Wholesale Hub</p>
                  <Sparkles className="w-4 h-4 text-[#8B4513]" />
                </div>

                <h3 className="text-2xl font-serif italic font-bold leading-tight">
                  Raw Materials for Creators & Studios
                </h3>

                <p className="text-xs text-[#9E9C96] leading-relaxed">
                  Purchase refined clay, seasoned teak logs, mulberry silk yarns, and copper craft sheets in verified wholesale batches.
                </p>

                <button
                  onClick={onOpenRawMaterials}
                  className="w-full text-center text-[10px] font-bold border border-white px-4 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Explore Raw Material Supply
                </button>
              </div>

              {/* AI Craft Advisor Card */}
              <div
                onClick={onOpenAdvisor}
                className="p-5 bg-[#F0EEE6] border border-[#E5E2D9] rounded-2xl cursor-pointer hover:border-[#8B4513] transition-colors space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#8B4513]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">AI Custom Craft Advisor</span>
                </div>
                <p className="text-xs text-[#5C5A52] leading-snug">
                  Need custom engravings, heritage motifs, or corporate bespoke gifts? Consult our AI assistant.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

