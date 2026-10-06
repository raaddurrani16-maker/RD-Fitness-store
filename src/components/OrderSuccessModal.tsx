import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/formatters';
import { CheckCircle2, Truck, Printer, ArrowRight, ShieldCheck, Copy, X } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder, setIsOrderTrackingOpen, showToast } = useStore();

  if (!lastConfirmedOrder) return null;

  const handleCopyOrderNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lastConfirmedOrder.orderNumber);
      showToast('Order number copied!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800 text-center relative">
          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            Order Confirmed & Logged
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
            Thank You, {lastConfirmedOrder.customer.fullName}!
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto mt-2">
            Your RD Fitness gear is being packed in our central distribution facility. You will receive SMS dispatch notifications shortly.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Order reference banner */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-neutral-500 font-mono block">Order Reference:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-white">
                  {lastConfirmedOrder.orderNumber}
                </span>
                <button
                  onClick={handleCopyOrderNumber}
                  className="p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                  title="Copy Order #"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-neutral-500 font-mono block">Estimated Delivery:</span>
              <span className="text-xs font-bold text-amber-400">
                {lastConfirmedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Courier & Tracking preview */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3.5">
            <Truck className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="flex-1 text-xs">
              <span className="font-bold text-white block">
                Assigned Courier: {lastConfirmedOrder.courierName}
              </span>
              <span className="text-neutral-400 font-mono">
                Tracking Airway Bill: <strong>{lastConfirmedOrder.trackingNumber}</strong>
              </span>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Purchased Items
            </h4>
            <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
              {lastConfirmedOrder.items.map((it, idx) => (
                <div key={idx} className="p-3.5 flex items-center gap-3">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-12 h-12 rounded object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{it.name}</h5>
                    <span className="text-[11px] text-neutral-400 block font-mono">
                      {it.variantText} · Qty: {it.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {formatPKR(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment details summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-amber-400 text-[11px] block">
                Delivery Details
              </span>
              <p className="text-neutral-200">{lastConfirmedOrder.shippingAddress.address}</p>
              <p className="text-neutral-400">
                {lastConfirmedOrder.shippingAddress.city}, {lastConfirmedOrder.shippingAddress.province}
              </p>
              <p className="text-neutral-400 font-mono">Phone: {lastConfirmedOrder.customer.phone}</p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-amber-400 text-[11px] block">
                Payment Summary
              </span>
              <div className="flex justify-between text-neutral-400">
                <span>Method:</span>
                <span className="text-white font-semibold uppercase">{lastConfirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">{lastConfirmedOrder.paymentStatus}</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-1 border-t border-neutral-800">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-mono tabular-nums">
                  {formatPKR(lastConfirmedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setLastConfirmedOrder(null);
                setIsOrderTrackingOpen(true);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Track Live Status</span>
            </button>

            <button
              onClick={() => setLastConfirmedOrder(null)}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
