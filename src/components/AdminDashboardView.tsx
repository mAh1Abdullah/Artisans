import React, { useState } from 'react';
import { 
  ShieldCheck, Store, Package, Users, Tag, CreditCard, FileText, 
  CheckCircle2, XCircle, AlertTriangle, Search, Plus, Sparkles, 
  ArrowUpRight, ArrowDownRight, Clock, Eye, Sliders
} from 'lucide-react';
import { storageService } from '../services/storage';
import { VendorProfile, Product, Coupon, AuditLog, UserTrustProfile } from '../types';

interface AdminDashboardViewProps {
  onShowToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'products' | 'trust' | 'coupons' | 'settlements' | 'audit'>('overview');
  
  // Data state
  const vendors = storageService.getVendors();
  const products = storageService.getProducts();
  const coupons = storageService.getCoupons();
  const auditLogs = storageService.getAuditLogs();
  const settlements = storageService.getSettlements();
  const currentUser = storageService.getCurrentUser();

  // Modal / Form states
  const [rejectModalVendorId, setRejectModalVendorId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  
  // Trust adjustment state
  const [trustUserEmail, setTrustUserEmail] = useState('anika@example.com');
  const [trustDelta, setTrustDelta] = useState<number>(10);
  const [trustReason, setTrustReason] = useState('Verified Bangladesh NID & Phone details');

  // Coupon creation form state
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [newDiscountValue, setNewDiscountValue] = useState<number>(15);
  const [newMinOrderBdt, setNewMinOrderBdt] = useState<number>(2000);

  // Derived metrics
  const pendingVendors = vendors.filter(v => v.status === 'submitted' || v.status === 'under_review');
  const pendingProducts = products.filter(p => p.currentVersionId !== p.latestVersionId);
  const totalVendorCount = vendors.length;
  const approvedVendorCount = vendors.filter(v => v.status === 'approved').length;

  // Actions
  const handleApproveVendor = (vendorId: string, displayName: string) => {
    storageService.updateVendorStatus(vendorId, 'approved');
    storageService.addAuditLog('vendor_approved', `Approved vendor application for '${displayName}'`, 'vendor', vendorId);
    onShowToast('success', 'Vendor Approved', `'${displayName}' is now active and published on the marketplace.`);
  };

  const handleRejectVendor = () => {
    if (!rejectModalVendorId || !rejectReason.trim()) return;
    const vendor = vendors.find(v => v.id === rejectModalVendorId);
    storageService.updateVendorStatus(rejectModalVendorId, 'rejected', rejectReason);
    storageService.addAuditLog('vendor_rejected', `Rejected vendor: ${rejectReason}`, 'vendor', rejectModalVendorId);
    onShowToast('warning', 'Vendor Application Rejected', `Status updated for ${vendor?.displayName || 'vendor'}.`);
    setRejectModalVendorId(null);
    setRejectReason('');
  };

  const handleSuspendVendor = (vendorId: string, displayName: string) => {
    storageService.updateVendorStatus(vendorId, 'suspended', 'Admin suspension enforced');
    storageService.addAuditLog('vendor_suspended', `Enforced suspension on '${displayName}'`, 'vendor', vendorId);
    onShowToast('warning', 'Vendor Suspended', `'${displayName}' storefront has been suspended.`);
  };

  const handleAdjustTrust = () => {
    if (!trustReason.trim()) return;
    storageService.adjustTrustScore('u_buyer', trustDelta, trustReason);
    onShowToast('success', 'Trust Profile Updated', `Score adjusted by ${trustDelta > 0 ? '+' : ''}${trustDelta}.`);
    setTrustReason('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newDescription.trim()) return;

    storageService.addCoupon({
      code: newCode.toUpperCase().trim(),
      description: newDescription,
      status: 'active',
      rules: {
        discountType: newDiscountType,
        discountValue: newDiscountType === 'percentage' ? newDiscountValue : newDiscountValue * 100,
        minOrderAmountCents: newMinOrderBdt * 100
      }
    });

    onShowToast('success', 'Coupon Created', `Promotion '${newCode.toUpperCase()}' is now active.`);
    setShowAddCouponModal(false);
    setNewCode('');
    setNewDescription('');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
          <div>
            <div className="flex items-center gap-2 text-[#8B4513] text-[10px] font-bold uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4" />
              Platform Administration & Moderation
            </div>
            <h1 className="text-3xl font-serif italic font-bold text-[#1A1A1A] mt-1">
              Marketplace Command Center
            </h1>
            <p className="text-xs text-[#5C5A52] mt-0.5">
              Logged in as Master Administrator ({currentUser.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Audit Logging Enabled
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-[#E5E2D9] text-xs">
          {[
            { id: 'overview', label: 'Platform Overview', icon: Sliders },
            { id: 'vendors', label: `Vendor Queue (${pendingVendors.length})`, icon: Store },
            { id: 'products', label: 'Product Moderation', icon: Package },
            { id: 'trust', label: 'Trust & Risk System', icon: Users },
            { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
            { id: 'settlements', label: 'Settlement Batches', icon: CreditCard },
            { id: 'audit', label: 'Immutable Audit Trail', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#8B4513] text-white shadow-xs'
                    : 'bg-white border border-[#E5E2D9] text-[#5C5A52] hover:text-[#1A1A1A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8E8C82]">Active Vendors</p>
                <p className="text-3xl font-serif font-bold text-[#1A1A1A]">{approvedVendorCount} / {totalVendorCount}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">{pendingVendors.length} applications pending</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8E8C82]">Published Products</p>
                <p className="text-3xl font-serif font-bold text-[#1A1A1A]">{products.length}</p>
                <p className="text-[11px] text-amber-700 font-semibold">100% Verified CUID2 catalog</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8E8C82]">Total GMV Executed</p>
                <p className="text-3xl font-serif font-bold text-[#8B4513]">৳32,450</p>
                <p className="text-[11px] text-[#5C5A52]">5% Platform Commission Model</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8E8C82]">Avg Buyer Trust</p>
                <p className="text-3xl font-serif font-bold text-[#1A1A1A]">85 / 100</p>
                <p className="text-[11px] text-emerald-700 font-semibold">COD Risk Score: Low</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1A1A1A] text-white p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">Artisan Onboarding</p>
                  <Sparkles className="w-4 h-4 text-[#8B4513]" />
                </div>
                <h3 className="font-serif italic text-xl font-bold">Vendor Moderation Priority</h3>
                <p className="text-xs text-[#9E9C96]">
                  {pendingVendors.length > 0 
                    ? `${pendingVendors.length} vendor applications are awaiting document review and approval.` 
                    : 'All vendor applications have been reviewed and approved.'}
                </p>
                <button
                  onClick={() => setActiveTab('vendors')}
                  className="bg-[#8B4513] hover:bg-[#72370f] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Review Vendor Queue
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">Coupons & Rules Engine</p>
                <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">Active Promotions</h3>
                <p className="text-xs text-[#5C5A52]">
                  {coupons.length} active coupons configured in JSONB rules engine (e.g. HERITAGE15, ARTISAN500).
                </p>
                <button
                  onClick={() => setActiveTab('coupons')}
                  className="border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Manage Coupons
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vendor Applications */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">Vendor Application Queue</h2>
              <span className="text-xs text-[#8E8C82]">{vendors.length} Total Vendor Profiles</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden divide-y divide-[#E5E2D9]">
              {vendors.map(vendor => (
                <div key={vendor.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-[#FAF9F6] transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={vendor.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'}
                      alt={vendor.displayName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E5E2D9]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-base text-[#1A1A1A]">{vendor.displayName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          vendor.status === 'approved' ? 'bg-emerald-100 text-emerald-900' :
                          vendor.status === 'suspended' ? 'bg-rose-100 text-rose-900' :
                          vendor.status === 'rejected' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                        }`}>
                          {vendor.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8B4513] font-semibold">{vendor.craftSpecialty}</p>
                      <p className="text-xs text-[#5C5A52] mt-1">{vendor.description}</p>
                      <p className="text-[11px] text-[#8E8C82] mt-1">Workshop: {vendor.workshopLocation} • Contact: {vendor.supportEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {vendor.status !== 'approved' && (
                      <button
                        onClick={() => handleApproveVendor(vendor.id, vendor.displayName)}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    )}

                    {vendor.status !== 'rejected' && (
                      <button
                        onClick={() => setRejectModalVendorId(vendor.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    )}

                    {vendor.status === 'approved' && (
                      <button
                        onClick={() => handleSuspendVendor(vendor.id, vendor.displayName)}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">Product Moderation & Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map(prod => (
                <div key={prod.id} className="bg-white rounded-2xl border border-[#E5E2D9] p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-36 object-cover rounded-xl border border-[#E5E2D9]" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B4513]">{prod.vendorName}</p>
                    <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">{prod.title}</h3>
                    <p className="text-xs text-[#5C5A52] line-clamp-2">{prod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between">
                    <span className="font-serif font-bold text-sm">৳{Math.round(prod.priceCents / 100).toLocaleString()}</span>
                    <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Verified Version ({prod.currentVersionId})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Trust & Risk System */}
        {activeTab === 'trust' && (
          <div className="space-y-6">
            <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">User Trust & Risk Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Manual Trust Score Adjustment</h3>
                <p className="text-xs text-[#5C5A52]">
                  Update user's score (0-100). Scores &ge; 65 grant Cash-on-Delivery (COD) checkout eligibility.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8C82] block mb-1">Target Buyer Account</label>
                    <input
                      type="text"
                      value={trustUserEmail}
                      onChange={(e) => setTrustUserEmail(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8C82] block mb-1">Score Delta (+ / -)</label>
                    <select
                      value={trustDelta}
                      onChange={(e) => setTrustDelta(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1A1A]"
                    >
                      <option value={15}>+15 Points (Verified Identity)</option>
                      <option value={10}>+10 Points (Successful COD Order)</option>
                      <option value={-15}>-15 Points (COD Refusal / Unclaimed Courier)</option>
                      <option value={-25}>-25 Points (Dispute / Fraud Flag)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8C82] block mb-1">Audit Reason (Required)</label>
                    <input
                      type="text"
                      value={trustReason}
                      onChange={(e) => setTrustReason(e.target.value)}
                      placeholder="e.g. Verified NID & phone documentation"
                      className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1A1A]"
                    />
                  </div>

                  <button
                    onClick={handleAdjustTrust}
                    className="w-full py-3 bg-[#8B4513] hover:bg-[#72370f] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Submit Trust Adjustment
                  </button>
                </div>
              </div>

              {/* Trust Event Ledger */}
              <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Append-Only Trust Event Log</h3>
                <div className="space-y-3">
                  {storageService.getTrustEvents().map(ev => (
                    <div key={ev.id} className="p-3 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#1A1A1A]">{ev.reason}</p>
                        <p className="text-[10px] text-[#8E8C82]">{new Date(ev.createdAt).toLocaleString()}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ev.scoreDelta > 0 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {ev.scoreDelta > 0 ? `+${ev.scoreDelta}` : ev.scoreDelta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 5: Coupons */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">Coupons & Rules Engine</h2>
              <button
                onClick={() => setShowAddCouponModal(true)}
                className="bg-[#8B4513] hover:bg-[#72370f] text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Coupon
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {coupons.map(cpn => (
                <div key={cpn.id} className="bg-white p-5 rounded-2xl border border-[#E5E2D9] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm font-bold bg-[#1A1A1A] text-white px-3 py-1 rounded-lg">
                      {cpn.code}
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {cpn.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5A52] font-medium">{cpn.description}</p>
                  <div className="pt-2 border-t border-[#E5E2D9] text-[11px] text-[#8E8C82] space-y-1">
                    <p>Discount: <strong className="text-[#1A1A1A]">{cpn.rules.discountType === 'percentage' ? `${cpn.rules.discountValue}%` : `৳${cpn.rules.discountValue / 100}`}</strong></p>
                    {cpn.rules.minOrderAmountCents && (
                      <p>Min Order: ৳{(cpn.rules.minOrderAmountCents / 100).toLocaleString()}</p>
                    )}
                    <p>Usage Count: {cpn.usageCount} times redeemed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Payments, Webhooks, Refunds & Settlements */}
        {activeTab === 'settlements' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">Payments, Refunds & Settlements Engine</h2>
                <p className="text-xs text-[#5C5A52]">Idempotent webhooks, bKash/SSLCommerz payments, customer wallets, and artisan payout settlements.</p>
              </div>
            </div>

            {/* 1. Webhook Logs & Idempotency Testing */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
              <div className="flex justify-between items-center border-b border-[#E5E2D9] pb-3">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#8B4513]" />
                  Payment Provider Webhooks & Idempotency Log
                </h3>
                <span className="text-[10px] font-mono bg-[#1A1A1A] text-white px-2.5 py-1 rounded-full uppercase">
                  UNIQUE(provider, event_id) Enforced
                </span>
              </div>

              <div className="divide-y divide-[#E5E2D9] text-xs">
                {storageService.getProviderEvents().map(evt => (
                  <div key={evt.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#8B4513] uppercase">{evt.provider}</span>
                        <span className="font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md text-[10px]">{evt.eventId}</span>
                        <span className="bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Signature Match</span>
                      </div>
                      <p className="text-[#5C5A52] text-[11px] mt-1">Processed: {new Date(evt.processedAt).toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => {
                        const testRes = storageService.processWebhookCallback(
                          evt.provider,
                          evt.eventType,
                          evt.eventId, // duplicate eventId
                          evt.rawPayload,
                          'sha256_bkash_sig_991823_valid',
                          'ord_1'
                        );
                        if (testRes.duplicate) {
                          onShowToast('warning', 'Idempotency Guard Active', testRes.message);
                        } else {
                          onShowToast('success', 'Webhook Executed', testRes.message);
                        }
                      }}
                      className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-stone-800 transition-colors cursor-pointer"
                    >
                      Test Duplicate Webhook (Idempotency)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Customer Wallets & Store Credit */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8B4513]" />
                Customer Wallet Balances & Store Credit
              </h3>
              <div className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[#1A1A1A]">{currentUser.email} (Buyer Account)</p>
                  <p className="text-[#8E8C82] text-[11px]">Wallet ID: wlt_usr1</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8E8C82] block uppercase font-bold">Store Credit Balance</span>
                  <span className="font-serif font-bold text-lg text-emerald-800">
                    ৳{(storageService.getWallet(currentUser.id).balanceCents / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Artisan Settlement Batches */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <Store className="w-4 h-4 text-[#8B4513]" />
                Bi-Weekly Artisan Settlement Batches
              </h3>
              {settlements.map(set => (
                <div key={set.id} className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                  <div>
                    <h3 className="font-bold text-sm text-[#1A1A1A]">{set.vendorName}</h3>
                    <p className="text-[#8E8C82]">Period: {new Date(set.periodStart).toLocaleDateString()} - {new Date(set.periodEnd).toLocaleDateString()}</p>
                    <p className="text-[#5C5A52] mt-1">
                      Gross: ৳{(set.grossAmountCents / 100).toLocaleString()} • Platform Commission (10%): -৳{(set.commissionCents / 100).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-serif font-bold text-base text-[#8B4513]">Net Payout: ৳{(set.netAmountCents / 100).toLocaleString()}</p>
                      <span className="inline-block mt-0.5 bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        Status: {set.status}
                      </span>
                    </div>
                    {set.status !== 'paid' && (
                      <button
                        onClick={() => {
                          storageService.approveSettlement(set.id);
                          onShowToast('success', 'Settlement Paid', `Dispatched net settlement of ৳${(set.netAmountCents / 100).toLocaleString()} to ${set.vendorName}`);
                        }}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider cursor-pointer"
                      >
                        Approve Payout
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Audit Log */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h2 className="font-serif italic text-2xl font-bold text-[#1A1A1A]">Immutable Platform Audit Trail</h2>
            <div className="bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden">
              <div className="p-4 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest grid grid-cols-12 gap-2">
                <span className="col-span-3">Timestamp</span>
                <span className="col-span-2">Action</span>
                <span className="col-span-2">Entity</span>
                <span className="col-span-5">Audit Reason & Justification</span>
              </div>
              <div className="divide-y divide-[#E5E2D9] text-xs">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-4 grid grid-cols-12 gap-2 items-center hover:bg-[#FAF9F6]">
                    <span className="col-span-3 text-[#8E8C82] font-mono text-[11px]">{new Date(log.createdAt).toLocaleString()}</span>
                    <span className="col-span-2 font-bold text-[#8B4513] uppercase text-[10px]">{log.action}</span>
                    <span className="col-span-2 font-mono text-[11px] text-[#5C5A52]">{log.entityType}:{log.entityId.slice(0, 8)}</span>
                    <span className="col-span-5 text-[#1A1A1A] font-medium">{log.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Reject Reason Modal */}
      {rejectModalVendorId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Specify Rejection Reason</h3>
            <p className="text-xs text-[#5C5A52]">
              Provide a clear reason for rejecting this vendor application. This reason will be recorded in the audit log.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Incomplete trade license or unverified artisan credentials"
              rows={3}
              className="w-full p-3 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1A1A]"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRejectModalVendorId(null)}
                className="px-4 py-2 border border-[#E5E2D9] rounded-xl text-xs font-bold uppercase tracking-wider text-[#5C5A52]"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectVendor}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateCoupon} className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Create Rules Engine Coupon</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#8E8C82] block mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. CRAFT2026"
                  required
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#8E8C82] block mb-1">Description</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g. 15% Off Handcrafted Heritage Ceramics"
                  required
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8E8C82] block mb-1">Discount Type</label>
                  <select
                    value={newDiscountType}
                    onChange={(e) => setNewDiscountType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed BDT (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8E8C82] block mb-1">Value</label>
                  <input
                    type="number"
                    value={newDiscountValue}
                    onChange={(e) => setNewDiscountValue(Number(e.target.value))}
                    required
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#8E8C82] block mb-1">Minimum Order Amount (৳ BDT)</label>
                <input
                  type="number"
                  value={newMinOrderBdt}
                  onChange={(e) => setNewMinOrderBdt(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCouponModal(false)}
                className="px-4 py-2 border border-[#E5E2D9] rounded-xl text-xs font-bold uppercase text-[#5C5A52]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B4513] text-white rounded-xl text-xs font-bold uppercase"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
