import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPKR } from '../utils/formatters';
import { Product, OrderStatus, Coupon } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Tag,
  CheckCircle,
  Truck,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');
  const [productSearch, setProductSearch] = useState('');

  // Add Product form modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields for Add/Edit
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('RD FITNESS LABS');
  const [prodCategory, setProdCategory] = useState<'supplements' | 'clothing'>('supplements');
  const [prodSubCategory, setProdSubCategory] = useState<any>('whey');
  const [prodPrice, setProdPrice] = useState<number>(5000);
  const [prodOldPrice, setProdOldPrice] = useState<number>(6000);
  const [prodStock, setProdStock] = useState<number>(20);
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodBadge, setProdBadge] = useState('');

  if (!isAdminOpen) return null;

  // Overview KPIs
  const totalSalesPKR = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdName('');
    setProdBrand('RD FITNESS LABS');
    setProdCategory('supplements');
    setProdSubCategory('whey');
    setProdPrice(5000);
    setProdOldPrice(6000);
    setProdStock(25);
    setProdShortDesc('');
    setProdBadge('New');
    setShowAddProductModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdBrand(p.brand);
    setProdCategory(p.category);
    setProdSubCategory(p.subCategory);
    setProdPrice(p.price);
    setProdOldPrice(p.oldPrice || p.price);
    setProdStock(p.stock);
    setProdShortDesc(p.shortDesc);
    setProdBadge(p.badge || '');
    setShowAddProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        brand: prodBrand,
        category: prodCategory,
        subCategory: prodSubCategory,
        price: Number(prodPrice),
        oldPrice: Number(prodOldPrice),
        stock: Number(prodStock),
        shortDesc: prodShortDesc,
        badge: prodBadge || undefined,
      });
    } else {
      const newProd: Product = {
        id: `rd-prod-${Date.now()}`,
        name: prodName,
        brand: prodBrand,
        category: prodCategory,
        subCategory: prodSubCategory,
        price: Number(prodPrice),
        oldPrice: Number(prodOldPrice),
        stock: Number(prodStock),
        rating: 5.0,
        reviewsCount: 1,
        shortDesc: prodShortDesc || 'Engineered for Pakistani athletes.',
        fullDesc: prodShortDesc || 'Authentic high-performance formulation.',
        variants:
          prodCategory === 'supplements'
            ? [{ name: 'Flavor', options: ['Double Chocolate', 'Vanilla'] }]
            : [{ name: 'Size', options: ['M', 'L', 'XL'] }],
        images: [products[0]?.images[0] || ''],
        badge: prodBadge || undefined,
      };
      addProduct(newProd);
    }
    setShowAddProductModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                  RD FITNESS Admin Command Center
                </h2>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Pakistan Operations · Karachi Distribution Center & Lahore Regional Hub
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-neutral-950 border-b border-neutral-800 flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase">Total Revenue</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {formatPKR(totalSalesPKR)}
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-mono">
                    +18.4% this month across PK
                  </span>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase">Total Orders</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[10px] text-neutral-400 block">
                    {pendingOrders.length} pending fulfillment
                  </span>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase">Catalog Items</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {products.length}
                  </div>
                  <span className="text-[10px] text-neutral-400 block">
                    Supplements & Apparel
                  </span>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <span className="text-[11px] text-neutral-400 font-semibold uppercase">Low Stock Alerts</span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-orange-400 tabular-nums">
                    {lowStockProducts.length}
                  </div>
                  <span className="text-[10px] text-neutral-400 block">
                    Stock &le; 5 units
                  </span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Customer Orders (Pakistan)
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-400 hover:underline font-mono"
                  >
                    View all orders &rarr;
                  </button>
                </div>

                <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden text-xs">
                  {orders.slice(0, 3).map((ord) => (
                    <div key={ord.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-mono text-white">{ord.orderNumber}</strong>
                          <span className="text-neutral-400">· {ord.customer.fullName} ({ord.shippingAddress.city})</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {ord.createdAt} · Courier: {ord.courierName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-amber-400 tabular-nums">
                          {formatPKR(ord.total)}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-neutral-900 border border-neutral-700 text-neutral-300 uppercase">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search product inventory..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500"
                  />
                </div>
                <button
                  onClick={handleOpenAdd}
                  className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-neutral-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase border-b border-neutral-800 text-[11px]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (PKR)</th>
                      <th className="p-3">Stock Units</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/40">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-9 h-9 rounded object-cover bg-neutral-900 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <strong className="text-white font-sans text-xs block truncate max-w-xs">
                                {p.name}
                              </strong>
                              <span className="text-[10px] text-neutral-500">{p.brand}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{p.category}</td>
                        <td className="p-3 font-bold text-amber-400">{formatPKR(p.price)}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] ${
                              p.stock <= 5
                                ? 'bg-orange-950 text-orange-400 border border-orange-800 font-bold'
                                : 'text-neutral-300'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                              title="Edit price/stock"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-neutral-500 hover:text-rose-400 rounded hover:bg-neutral-800"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Pakistani Orders Dispatch & Fulfillment
              </h3>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-sm text-white">{ord.orderNumber}</strong>
                        <span className="text-neutral-400">· {ord.customer.fullName}</span>
                        <span className="text-neutral-500 font-mono">({ord.customer.phone})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                          {formatPKR(ord.total)}
                        </span>
                        {/* Status Change Dropdown */}
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-neutral-900 border border-neutral-700 text-xs text-white rounded px-2.5 py-1 font-semibold focus:outline-none focus:border-amber-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-400 text-[11px]">
                      <div>
                        <span className="text-neutral-300 font-semibold block">Delivery Address:</span>
                        <p>{ord.shippingAddress.address}, {ord.shippingAddress.city}, {ord.shippingAddress.province}</p>
                        {ord.shippingAddress.notes && (
                          <p className="text-amber-400/90 italic mt-0.5">Note: "{ord.shippingAddress.notes}"</p>
                        )}
                      </div>
                      <div>
                        <span className="text-neutral-300 font-semibold block">Payment & Courier:</span>
                        <p>Method: <strong className="uppercase text-white">{ord.paymentMethod}</strong> ({ord.paymentStatus})</p>
                        <p className="font-mono">Courier: {ord.courierName} ({ord.trackingNumber})</p>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="pt-1 flex flex-wrap gap-2">
                      {ord.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-[10px] text-neutral-300 font-mono"
                        >
                          {it.name} ({it.variantText}) &times; {it.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Promotional Coupons
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {coupons.map((c) => (
                  <div key={c.code} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-base font-bold text-amber-400">{c.code}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">
                        Active
                      </span>
                    </div>
                    <p className="text-neutral-300 text-[11px]">{c.description}</p>
                    <div className="text-neutral-500 text-[10px] font-mono border-t border-neutral-800 pt-1.5">
                      Min Order: {formatPKR(c.minOrder)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. RD High Voltage Pre-Workout"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  >
                    <option value="supplements">Supplements</option>
                    <option value="clothing">Gym Clothing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={prodBadge}
                    onChange={(e) => setProdBadge(e.target.value)}
                    placeholder="Best Seller / New"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Old Price (PKR)</label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={prodShortDesc}
                  onChange={(e) => setProdShortDesc(e.target.value)}
                  placeholder="Short description of the item..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded text-xs font-bold uppercase tracking-wider"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
