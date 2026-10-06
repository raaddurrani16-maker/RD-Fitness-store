import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/formatters';
import { Order } from '../types';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, orders } = useStore();

  const [searchQuery, setSearchQuery] = useState('RDF-8921');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return orders.find((o) => o.orderNumber === 'RDF-8921') || orders[0] || null;
  });
  const [notFound, setNotFound] = useState(false);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().toUpperCase();
    const found = orders.find(
      (o) => o.orderNumber.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean
    );
    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received & Queued' },
    { title: 'Verified & Packed', desc: 'Quality Inspection' },
    { title: 'Dispatched via Courier', desc: 'Handed to TCS / Trax' },
    { title: 'In Transit', desc: 'On route to your city' },
    { title: 'Delivered', desc: 'Package Handed Over' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Dispatched':
        return 2;
      case 'In Transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 2;
    }
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                Track RD Fitness Order
              </h2>
              <p className="text-[11px] text-neutral-400">
                Live nationwide courier tracking across Pakistan
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. RDF-8921) or TCS Tracking Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              Track Order
            </button>
          </form>

          {notFound && (
            <div className="mt-3 p-3 bg-rose-950/30 border border-rose-800/40 rounded-lg text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No order found with that reference. Try demo order <strong>RDF-8921</strong>.</span>
            </div>
          )}
        </div>

        {/* Order Details Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {searchedOrder ? (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-neutral-950 border border-neutral-800 rounded-xl gap-3">
                <div>
                  <span className="text-[11px] text-neutral-500 font-mono block">Order Number:</span>
                  <span className="text-xl font-mono font-bold text-white">
                    {searchedOrder.orderNumber}
                  </span>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    Placed on {searchedOrder.createdAt}
                  </span>
                </div>
                <div className="flex flex-col sm:items-end">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase">
                    Status: {searchedOrder.status}
                  </span>
                  <span className="text-xs text-neutral-400 mt-1">
                    Courier: {searchedOrder.courierName} ({searchedOrder.trackingNumber})
                  </span>
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Shipment Progress Timeline
                </h4>
                <div className="relative pl-6 space-y-6 border-l-2 border-neutral-800 ml-3">
                  {steps.map((st, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div key={st.title} className="relative">
                        <div
                          className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] ${
                            isDone
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'bg-neutral-900 border-neutral-700 text-neutral-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <h5
                            className={`text-xs font-bold ${
                              isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-neutral-500'
                            }`}
                          >
                            {st.title}
                          </h5>
                          <p className="text-[11px] text-neutral-400">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recipient & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="font-bold text-amber-400 block text-[11px] uppercase">
                    Delivery Destination
                  </span>
                  <p className="text-white font-medium">{searchedOrder.customer.fullName}</p>
                  <p className="text-neutral-400">{searchedOrder.shippingAddress.address}</p>
                  <p className="text-neutral-400">
                    {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.province}
                  </p>
                  <p className="text-neutral-500 font-mono">Contact: {searchedOrder.customer.phone}</p>
                </div>

                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="font-bold text-amber-400 block text-[11px] uppercase">
                    Payment & Total
                  </span>
                  <div className="flex justify-between text-neutral-300">
                    <span>Payment:</span>
                    <span className="uppercase font-semibold">{searchedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Payment State:</span>
                    <span className="text-emerald-400">{searchedOrder.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1 border-t border-neutral-800">
                    <span>Payable:</span>
                    <span className="text-amber-400 font-mono">{formatPKR(searchedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Items in parcel */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Parcel Contents ({searchedOrder.items.length})
                </h4>
                <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded bg-neutral-900 border border-neutral-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h6 className="font-semibold text-white">{item.name}</h6>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            {item.variantText} · Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-amber-400 tabular-nums">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Enter your RD Fitness order number above to view tracking status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
