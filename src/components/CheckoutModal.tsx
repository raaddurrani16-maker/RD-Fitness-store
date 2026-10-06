import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/mockData';
import { formatPKR, validatePakistaniPhone } from '../utils/formatters';
import { PaymentMethod } from '../types';
import {
  X,
  Check,
  Truck,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Lock,
  AlertCircle,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    createOrder,
    currentUser,
    showToast,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Customer details
  const [fullName, setFullName] = useState(currentUser?.name || 'Raad Durrani');
  const [email, setEmail] = useState(currentUser?.email || 'raaddurrani16@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '0300-8451234');
  const [phoneError, setPhoneError] = useState<string>('');

  // Step 2: Address
  const [address, setAddress] = useState(currentUser?.addresses[0]?.address || 'House 42, Street 14, Sector F-8/2');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Islamabad');
  const [province, setProvince] = useState(currentUser?.addresses[0]?.province || 'Islamabad Capital Territory');
  const [postalCode, setPostalCode] = useState(currentUser?.addresses[0]?.postalCode || '44000');
  const [deliveryNotes, setDeliveryNotes] = useState('Call before arrival. Ring the main gate bell.');

  // Step 3: Shipping method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Step 4: Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  // Method specific inputs
  const [bankRefNumber, setBankRefNumber] = useState('');
  const [mobileWalletNumber, setMobileWalletNumber] = useState(currentUser?.phone || '0300-8451234');
  const [cardHolder, setCardHolder] = useState('Raad Durrani');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Shipping costs calculation
  const standardShippingFee = cartSubtotal >= 5000 ? 0 : 250;
  const expressShippingFee = 450;
  const currentShippingFee = shippingMethod === 'standard' ? standardShippingFee : expressShippingFee;
  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + currentShippingFee);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneCheck = validatePakistaniPhone(phone);
    if (!phoneCheck.isValid) {
      setPhoneError(phoneCheck.message || 'Invalid Pakistani phone number');
      return;
    }
    setPhoneError('');
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !city || !province) {
      showToast('Please provide your complete delivery address in Pakistan', 'error');
      return;
    }
    setStep(3);
  };

  const handleNextStep3 = () => {
    setStep(4);
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderSummaryItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        variantText: Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(' / '),
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      }));

      const newOrder = createOrder({
        status: 'Pending',
        customer: { fullName, email, phone },
        shippingAddress: { address, city, province, postalCode, notes: deliveryNotes },
        shippingMethod,
        shippingFee: currentShippingFee,
        paymentMethod,
        paymentStatus:
          paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : paymentMethod === 'card'
            ? 'Paid'
            : 'Pending Verification',
        items: orderSummaryItems,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        couponCode: appliedCoupon?.code,
        total: finalTotal,
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 sticky top-0 z-20">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase font-bold">
              Secure Checkout · Pakistan
            </span>
            <h2 className="font-display text-xl font-bold text-white tracking-wide uppercase">
              RD Fitness Nationwide Delivery
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs">
          {[
            { num: 1, title: 'Customer' },
            { num: 2, title: 'Address' },
            { num: 3, title: 'Courier' },
            { num: 4, title: 'Payment' },
          ].map((item) => (
            <div
              key={item.num}
              className={`flex items-center gap-2 ${
                step >= item.num ? 'text-amber-400 font-bold' : 'text-neutral-500'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step > item.num
                    ? 'bg-amber-500 text-black'
                    : step === item.num
                    ? 'border-2 border-amber-400 text-amber-400'
                    : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {step > item.num ? <Check className="w-3.5 h-3.5" /> : item.num}
              </div>
              <span className="hidden sm:inline">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Customer Information */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>1. Customer Details</span>
              </h3>
              <p className="text-xs text-neutral-400">
                We will send dispatch alerts and TCS/Leopards SMS tracking updates to this number.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Raad Durrani"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="raaddurrani16@gmail.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Pakistan Mobile Number (WhatsApp / Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneError('');
                      }}
                      placeholder="0300 1234567"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                    {phoneError && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Delivery Address</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Address */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                2. Delivery Address (Pakistan)
              </h3>
              <p className="text-xs text-neutral-400">
                Please enter a complete home or gym address for seamless courier delivery.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Street Address, House / Flat #, Area *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House #, Street #, Sector / Block / Society Name"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      City in Pakistan *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Province *
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {PAKISTAN_PROVINCES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="44000"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Special Courier Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, deliver to reception"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Shipping Method</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Shipping Method */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                3. Shipping Method
              </h3>
              <p className="text-xs text-neutral-400">
                Choose your courier preference across Pakistan:
              </p>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-amber-500"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Standard Courier (TCS / Leopards)</h4>
                      <p className="text-xs text-neutral-400">Delivered within 2-4 business days</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                    {standardShippingFee === 0 ? 'FREE' : formatPKR(standardShippingFee)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-amber-500"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Priority Express (Trax Aviation)</h4>
                      <p className="text-xs text-neutral-400">Expedited 24-48 hours delivery</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                    {formatPKR(expressShippingFee)}
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep3}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Payment Method</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Method */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  4. Select Payment Method
                </h3>
                <p className="text-xs text-neutral-400">
                  Choose from Pakistan’s most reliable payment options:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-400 mb-1.5" />
                  <span className="text-xs font-bold block">Cash on Delivery</span>
                  <span className="text-[10px] text-neutral-500">Pay cash to rider</span>
                </button>

                {/* Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Building className="w-5 h-5 text-amber-400 mb-1.5" />
                  <span className="text-xs font-bold block">Bank Transfer</span>
                  <span className="text-[10px] text-neutral-500">Meezan / HBL</span>
                </button>

                {/* JazzCash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-400 mb-1.5" />
                  <span className="text-xs font-bold block">JazzCash</span>
                  <span className="text-[10px] text-neutral-500">Mobile Wallet</span>
                </button>

                {/* Easypaisa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'easypaisa'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-400 mb-1.5" />
                  <span className="text-xs font-bold block">Easypaisa</span>
                  <span className="text-[10px] text-neutral-500">Mobile Wallet</span>
                </button>
              </div>

              {/* Payment Method Details Box */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                {paymentMethod === 'cod' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Cash on Delivery (Pakistan Verified)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Pay <strong className="text-white font-mono">{formatPKR(finalTotal)}</strong> in cash to the TCS / Leopards courier rider when you receive your RD Fitness package at your doorstep. Please keep exact change ready.
                    </p>
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-3 text-xs">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wide">
                      Official RD Fitness Corporate Bank Accounts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                      <div>
                        <strong className="text-white block">Meezan Bank Ltd</strong>
                        <span className="text-neutral-400">Title: RD FITNESS PVT LTD</span>
                        <span className="text-neutral-300 block">Account: 0102-0109283741</span>
                        <span className="text-neutral-400 block">IBAN: PK65MEZN0001020109283741</span>
                      </div>
                      <div>
                        <strong className="text-white block">Habib Bank Limited (HBL)</strong>
                        <span className="text-neutral-400">Title: RD FITNESS PVT LTD</span>
                        <span className="text-neutral-300 block">Account: 2390-7901238491</span>
                        <span className="text-neutral-400 block">IBAN: PK44HABB0023907901238491</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">
                        Bank Transaction Reference / Cheque # (Optional)
                      </label>
                      <input
                        type="text"
                        value={bankRefNumber}
                        onChange={(e) => setBankRefNumber(e.target.value)}
                        placeholder="e.g. MEZN-TX-928192"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'jazzcash' && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wide">
                      JazzCash Direct Mobile Payment
                    </h4>
                    <p className="text-neutral-300">
                      Enter your JazzCash account number. You will receive an MPIN confirmation prompt on your mobile screen.
                    </p>
                    <input
                      type="text"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                )}

                {paymentMethod === 'easypaisa' && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-emerald-400 uppercase tracking-wide">
                      Easypaisa Direct Mobile Payment
                    </h4>
                    <p className="text-neutral-300">
                      Enter your Easypaisa account number. Please authorize the push notification or OTP in your Easypaisa app.
                    </p>
                    <input
                      type="text"
                      value={mobileWalletNumber}
                      onChange={(e) => setMobileWalletNumber(e.target.value)}
                      placeholder="0345 1234567"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Order Review Box */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Items ({cart.length})</span>
                  <span className="font-mono text-white tabular-nums">{formatPKR(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatPKR(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping ({shippingMethod === 'standard' ? 'Standard Courier' : 'Express Priority'})</span>
                  <span className="font-mono text-white tabular-nums">
                    {currentShippingFee === 0 ? 'FREE' : formatPKR(currentShippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span className="uppercase tracking-wider">Final Payable Amount</span>
                  <span className="text-amber-400 font-mono text-base tabular-nums">
                    {formatPKR(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-8 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-amber-950/40 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
