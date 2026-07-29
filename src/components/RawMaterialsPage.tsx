import React, { useState } from 'react';
import { RawMaterial } from '../types';
import { formatPrice } from '../utils/cuid';
import { Package, Layers, ShieldCheck, MapPin, Truck, Plus } from 'lucide-react';

interface RawMaterialsPageProps {
  rawMaterials: RawMaterial[];
  onAddToCart: (item: any) => void;
}

export const RawMaterialsPage: React.FC<RawMaterialsPageProps> = ({
  rawMaterials,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});

  const categories = [
    'all',
    'Clays & Glazes',
    'Hardwood Timber',
    'Yarns & Dyes',
    'Metals & Wire'
  ];

  const filtered = rawMaterials.filter(m => 
    selectedCategory === 'all' || m.category === selectedCategory
  );

  const getQuantityForMaterial = (m: RawMaterial) => {
    return orderQty[m.id] || m.moq;
  };

  const setQuantityForMaterial = (id: string, qty: number, moq: number) => {
    setOrderQty(prev => ({
      ...prev,
      [id]: Math.max(moq, qty)
    }));
  };

  // Determine tiered unit price based on selected quantity
  const getCalculatedUnitPriceCents = (m: RawMaterial, qty: number) => {
    let price = m.tieredPricing[0].pricePerUnitCents;
    m.tieredPricing.forEach(tier => {
      if (qty >= tier.minQuantity) {
        price = tier.pricePerUnitCents;
      }
    });
    return price;
  };

  const handleAddRawMaterialToCart = (m: RawMaterial) => {
    const qty = getQuantityForMaterial(m);
    const unitPriceCents = getCalculatedUnitPriceCents(m, qty);

    onAddToCart({
      rawMaterialId: m.id,
      itemType: 'raw_material',
      title: m.title,
      image: m.images[0],
      unitPriceCents,
      quantity: qty,
      vendorId: m.supplierVendorId,
      vendorName: m.supplierName,
      unitLabel: m.unit
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-emerald-50 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Wholesale Artisan Supply Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Raw Craft Materials & Wholesale Supplies
          </h1>
          <p className="text-emerald-200/90 text-sm leading-relaxed">
            Source certified high-grade timber, refined clay powders, pure brass sheets, and handspun silk threads at reasonable bulk wholesale prices directly from primary producers.
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-900 text-emerald-100 shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat === 'all' ? 'All Wholesale Supplies' : cat}
          </button>
        ))}
      </div>

      {/* Wholesale Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((material) => {
          const qty = getQuantityForMaterial(material);
          const unitPriceCents = getCalculatedUnitPriceCents(material, qty);
          const totalPriceCents = unitPriceCents * qty;

          return (
            <div
              key={material.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-4">
                <img
                  src={material.images[0]}
                  alt={material.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                      {material.category}
                    </span>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {material.origin}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    {material.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {material.description}
                  </p>

                  <p className="text-xs font-medium text-stone-700 pt-1">
                    Supplier: <span className="text-emerald-950 font-bold">{material.supplierName}</span>
                  </p>
                </div>
              </div>

              {/* Tiered Price Table */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Wholesale Tier Pricing (Per {material.unit})
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {material.tieredPricing.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-center ${
                        qty >= tier.minQuantity
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      <span className="block text-[10px] text-stone-400 font-normal">
                        {tier.minQuantity}+ {material.unit}s
                      </span>
                      <span>{formatPrice(tier.pricePerUnitCents)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Order Bar */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] text-stone-500 block">Bulk Quantity (MOQ: {material.moq})</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantityForMaterial(material.id, qty - 1, material.moq)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-stone-900">{qty}</span>
                    <button
                      onClick={() => setQuantityForMaterial(material.id, qty + 1, material.moq)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Total Price</span>
                  <span className="font-serif font-bold text-emerald-950 text-lg">
                    {formatPrice(totalPriceCents)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddRawMaterialToCart(material)}
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Wholesale Lot
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
