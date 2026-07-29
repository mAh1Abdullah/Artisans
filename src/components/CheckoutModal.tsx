import React, { useState } from 'react';
import { CartItem, Address, PaymentMethod, Order } from '../types';
import { COURIER_PROVIDERS } from '../data/mockData';
import { formatPrice } from '../utils/cuid';
import { 
  X, CheckCircle2, ShieldCheck, Truck, 
  MapPin, CreditCard, ArrowRight, Sparkles 
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onOrderPlaced: (
    recipientName: string,
    email: string,
    phone: string,
    address: Address,
    paymentMethod: PaymentMethod,
    courierName: string
  ) => Order;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cart,
  onClose,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');
  
  // Shipping Address Form State
  const [recipientName, setRecipientName] = useState('Anika Rahman');
  const [email, setEmail] = useState('anika@example.com');
  const [phone, setPhone] = useState('+8801712345678');
  const [addressLine, setAddressLine] = useState('House 42, Road 11, Block D');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('Banani');
  const [postalCode, setPostalCode] = useState('1213');
  const [deliveryNote, setDeliveryNote] = useState('Ring bell upon arrival');

  // Selected Courier Provider
  const [selectedCourierId, setSelectedCourierId] = useState('pathao');
  
  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [bKashNumber, setBKashNumber] = useState('01712345678');
  
  // Placed Order Result
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const selectedCourier = COURIER_PROVIDERS.find(c => c.id === selectedCourierId) || COURIER_PROVIDERS[0];

  const subtotalCents = cart.reduce((sum, item) => {
    const customMods = item.customSelections?.reduce((s, c) => s + c.priceModifierCents, 0) || 0;
    return sum + (item.unitPriceCents + customMods) * item.quantity;
  }, 0);

  // Group vendors for shipping calculation
  const uniqueVendors = Array.from(new Set(cart.map(i => i.vendorId)));
  const totalShippingFeeCents = selectedCourier.basePriceCents * uniqueVendors.length;
  const grandTotalCents = subtotalCents + totalShippingFeeCents;

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addressSnapshot: Address = {
      id: 'addr_snap_' + Date.now(),
      recipientName,
      phone,
      addressLine,
      division,
      district,
      upazila,
      postalCode,
      deliveryNote
    };

    const newOrder = onOrderPlaced(
      recipientName,
      email,
      phone,
      addressSnapshot,
      paymentMethod,
      selectedCourier.name
    );

    setPlacedOrder(newOrder);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-stone-800">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Handcrafted Market Checkout</h2>
            <p className="text-xs text-stone-500">Step {step === 'address' ? '1 of 2: Shipping & Delivery' : step === 'payment' ? '2 of 2: Payment Method' : 'Confirmation'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Shipping Address & Courier Selection */}
        {step === 'address' && (
          <form onSubmit={() => setStep('payment')} className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-800" />
                Delivery Address in Bangladesh
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-stone-800 block mb-1">Street Address / House / Road *</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Division *</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">District / Upazila *</label>
                  <input
                    type="text"
                    required
                    value={`${district}, ${upazila}`}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Courier Provider Suggestion Engine */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-800" />
                Automated Courier Provider Suggestion
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {COURIER_PROVIDERS.map((courier) => (
                  <div
                    key={courier.id}
                    onClick={() => setSelectedCourierId(courier.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedCourierId === courier.id
                        ? 'bg-amber-50/80 border-amber-900 ring-2 ring-amber-800/20'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <img src={courier.logo} alt={courier.name} className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">{courier.name}</p>
                      <p className="text-[10px] text-stone-500">{courier.estimatedDeliveryDays}</p>
                      <p className="text-xs font-serif font-bold text-amber-900 mt-0.5">
                        +{formatPrice(courier.basePriceCents * uniqueVendors.length)} shipping
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">Total Payable</span>
                <span className="font-serif font-bold text-amber-950 text-xl">{formatPrice(grandTotalCents)}</span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-950 hover:bg-amber-900 text-amber-100 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrderSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-800" />
                Select Payment Method
              </h3>

              <div className="space-y-3 text-xs">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-50/80 border-amber-900 ring-2 ring-amber-800/20'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">Cash on Delivery (COD)</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Trust Eligible
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Pay in cash upon delivery to your doorstep after inspecting your handcrafted package.
                  </p>
                </div>

                {/* bKash Mobile Wallet */}
                <div
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'bkash'
                      ? 'bg-amber-50/80 border-amber-900 ring-2 ring-amber-800/20'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm text-pink-700">bKash Mobile Payment</span>
                    <span className="bg-pink-100 text-pink-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Instant Verified
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Pay instantly via bKash merchant gateway.
                  </p>
                  {paymentMethod === 'bkash' && (
                    <div className="mt-3 pt-2 border-t border-stone-200">
                      <label className="text-[11px] font-semibold text-stone-700 block mb-1">bKash Account Number</label>
                      <input
                        type="text"
                        value={bKashNumber}
                        onChange={(e) => setBKashNumber(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* SSLCommerz Card */}
                <div
                  onClick={() => setPaymentMethod('sslcommerz')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'sslcommerz'
                      ? 'bg-amber-50/80 border-amber-900 ring-2 ring-amber-800/20'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">SSLCommerz / Debit & Credit Card</span>
                    <span className="text-[10px] text-stone-500">Visa, Mastercard, City Bank</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('address')}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Back to Address
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-950 hover:bg-amber-900 text-amber-100 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Place Order ({formatPrice(grandTotalCents)})
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 'confirmation' && placedOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Order Successfully Placed!</h2>
              <p className="text-xs text-stone-500 mt-1">Transaction CUID: <span className="font-mono font-bold text-stone-800">{placedOrder.id}</span></p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-stone-500">Recipient:</span>
                <span className="font-bold text-stone-800">{placedOrder.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping Address:</span>
                <span className="font-medium text-stone-800">{placedOrder.shippingAddressSnapshot.addressLine}, {placedOrder.shippingAddressSnapshot.division}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-bold text-amber-950 uppercase">{placedOrder.paymentMethod} ({formatPrice(placedOrder.totalAmountCents)})</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-amber-950 text-amber-100 rounded-xl text-xs font-bold hover:bg-amber-900 transition-colors cursor-pointer"
            >
              Done & Return to Market
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
