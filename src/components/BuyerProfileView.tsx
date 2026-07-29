import React, { useState } from 'react';
import { User, Order, Product } from '../types';
import { formatPrice } from '../utils/cuid';
import { ProductCard } from './ProductCard';
import { 
  Package, Heart, Clock, MapPin, CheckCircle, 
  Truck, ShieldCheck, User as UserIcon, FileText 
} from 'lucide-react';

interface BuyerProfileViewProps {
  user: User;
  orders: Order[];
  wishlistProducts: Product[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const BuyerProfileView: React.FC<BuyerProfileViewProps> = ({
  user,
  orders,
  wishlistProducts,
  onToggleWishlist,
  onSelectProduct,
  onQuickAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
  const [selectedSnapshotOrder, setSelectedSnapshotOrder] = useState<Order | null>(null);

  const buyerOrders = orders.filter(o => o.buyerUserId === user.id || true); // Shows buyer orders

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-900/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-stone-900">{user.name}</h1>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Verified Buyer
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{user.email} • {user.phoneNumber || '+8801712345678'}</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 text-amber-800" />
            Order History ({buyerOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'wishlist' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-600" />
            Saved Wishlist ({wishlistProducts.length})
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-stone-900">Your Handcrafted Orders & CUID Snapshots</h2>
            <span className="text-xs text-stone-500">Immutable receipts frozen at checkout</span>
          </div>

          {buyerOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-600 text-sm font-medium">No orders placed yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {buyerOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  {/* Order Top Bar */}
                  <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Transaction CUID</span>
                      <span className="font-mono font-bold text-stone-800 text-xs">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Placed Date</span>
                      <span className="font-medium text-stone-700">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Payment Method</span>
                      <span className="font-semibold text-stone-800 uppercase">{order.paymentMethod} ({order.paymentStatus})</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Total Amount</span>
                      <span className="font-serif font-bold text-amber-950 text-base">{formatPrice(order.totalAmountCents)}</span>
                    </div>
                    <button
                      onClick={() => setSelectedSnapshotOrder(selectedSnapshotOrder?.id === order.id ? null : order)}
                      className="px-3 py-1 bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 rounded-lg font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {selectedSnapshotOrder?.id === order.id ? 'Hide JSON Snapshot' : 'View Snapshot'}
                    </button>
                  </div>

                  {/* Vendor Sub-Orders */}
                  <div className="p-4 space-y-4">
                    {order.vendorOrders.map((vOrder) => (
                      <div key={vOrder.id} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                          <div>
                            <span className="font-bold text-stone-900">{vOrder.vendorName}</span>
                            <span className="text-stone-400 mx-2">•</span>
                            <span className="text-stone-600">Courier: <strong>{vOrder.courierName}</strong></span>
                            {vOrder.trackingNumber && (
                              <span className="ml-2 font-mono text-[11px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
                                Tracking: {vOrder.trackingNumber}
                              </span>
                            )}
                          </div>
                          <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full capitalize text-[11px]">
                            {vOrder.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {vOrder.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-3">
                                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
                                <div>
                                  <p className="font-semibold text-stone-800">{item.title}</p>
                                  {item.customSelections && item.customSelections.length > 0 && (
                                    <div className="flex flex-wrap gap-1 text-[10px] text-amber-900 mt-0.5">
                                      {item.customSelections.map((sel, idx) => (
                                        <span key={idx} className="bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                                          {sel.optionLabel}: "{sel.value}"
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  {item.customNote && (
                                    <p className="text-[10px] text-stone-500 italic mt-0.5">Note: "{item.customNote}"</p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-stone-900">{formatPrice(item.unitPriceCents)} x {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* JSON Snapshot Viewer Modal / Expand */}
                  {selectedSnapshotOrder?.id === order.id && (
                    <div className="p-4 bg-stone-900 text-stone-100 text-[11px] font-mono border-t border-stone-800 space-y-2">
                      <p className="text-amber-400 font-bold text-xs uppercase">Immutable Order Snapshot (JSONB Rule Guarantee)</p>
                      <pre className="overflow-x-auto p-3 bg-stone-950 rounded-lg max-h-48 text-stone-300">
                        {JSON.stringify({
                          orderId: order.id,
                          shippingAddressSnapshot: order.shippingAddressSnapshot,
                          vendorOrders: order.vendorOrders
                        }, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">Your Saved Handcrafted Products</h2>
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-600 text-sm font-medium">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={true}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  onQuickAddToCart={onQuickAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
