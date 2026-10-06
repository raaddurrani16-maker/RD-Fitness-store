import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon, Review, UserProfile, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_USER } from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  appliedCoupon: Coupon | null;
  currentUser: UserProfile | null;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;

  // Navigation & Modals
  activeCategory: 'all' | 'supplements' | 'clothing';
  setActiveCategory: (cat: 'all' | 'supplements' | 'clothing') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isUserAccountOpen: boolean;
  setIsUserAccountOpen: (open: boolean) => void;
  isDocsOpen: boolean;
  setIsDocsOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isFaqOpen: boolean;
  setIsFaqOpen: (open: boolean) => void;

  lastConfirmedOrder: Order | null;
  setLastConfirmedOrder: (order: Order | null) => void;

  // Actions
  addToCart: (product: Product, variants?: Record<string, string>, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber' | 'courierName' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products with local storage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rd_fitness_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rd_fitness_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rd_fitness_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ['rd-whey-pro-2kg', 'rd-core-compression-tee'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rd_fitness_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Modals & Navigation state
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplements' | 'clothing'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isUserAccountOpen, setIsUserAccountOpen] = useState<boolean>(false);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<Order | null>(null);

  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('rd_fitness_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rd_fitness_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rd_fitness_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rd_fitness_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const addToCart = (product: Product, variants?: Record<string, string>, quantity: number = 1) => {
    // Determine default variants if none provided
    const resolvedVariants: Record<string, string> = { ...(variants || {}) };
    product.variants.forEach((v) => {
      if (!resolvedVariants[v.name] && v.options.length > 0) {
        resolvedVariants[v.name] = v.options[0];
      }
    });

    const variantKey = Object.entries(resolvedVariants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, val]) => `${k}:${val}`)
      .join('|');

    const cartItemId = `${product.id}-${variantKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedVariants: resolvedVariants,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });

    const variantDesc = Object.values(resolvedVariants).join(', ');
    showToast(`Added ${product.name}${variantDesc ? ` (${variantDesc})` : ''} to bag!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return { ...item, quantity: Math.min(nextQty, item.product.stock) };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of Rs. ${found.minOrder.toLocaleString('en-PK')}`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: `Applied ${found.code}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  // Free shipping across Pakistan for orders >= Rs. 5000, otherwise flat Rs. 250
  const cartShipping = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 250;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber' | 'courierName' | 'estimatedDelivery'>
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `RDF-${randomNum}`;
    const couriers = ['TCS Express Pakistan', 'Trax Logistics Pakistan', 'Leopards Courier'];
    const chosenCourier = couriers[Math.floor(Math.random() * couriers.length)];
    const trackingNumber = `${chosenCourier.slice(0, 3).toUpperCase()}-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      trackingNumber,
      courierName: chosenCourier,
      estimatedDelivery: 'Within 2-4 business days across Pakistan',
    };

    // Deduct stock for ordered items
    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = orderData.items.find((item) => item.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLastConfirmedOrder(newOrder);
    showToast(`Order #${orderNumber} created successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order status updated to "${status}"`, 'info');
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" added to catalog`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
    };
    setReviews((prev) => [review, ...prev]);
    // update product rating count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newReview.productId) {
          const newCount = p.reviewsCount + 1;
          const newRating = Number(((p.rating * p.reviewsCount + newReview.rating) / newCount).toFixed(1));
          return { ...p, reviewsCount: newCount, rating: newRating };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been submitted.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        coupons,
        reviews,
        appliedCoupon,
        currentUser,
        isAdminMode,
        setIsAdminMode,
        activeCategory,
        setActiveCategory,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isAdminOpen,
        setIsAdminOpen,
        isUserAccountOpen,
        setIsUserAccountOpen,
        isDocsOpen,
        setIsDocsOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        isFaqOpen,
        setIsFaqOpen,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        toasts,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
