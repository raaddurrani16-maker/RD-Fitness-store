export type ProductCategory = 'supplements' | 'clothing';

export type ProductSubCategory =
  | 'whey'
  | 'creatine'
  | 'preworkout'
  | 'bcaa'
  | 'massgainer'
  | 'vitamins'
  | 'electrolytes'
  | 'bars'
  | 'tshirt'
  | 'compression'
  | 'oversized'
  | 'shorts'
  | 'joggers'
  | 'trousers'
  | 'tank'
  | 'hoodie'
  | 'jackets';

export interface ProductVariant {
  name: string; // e.g. "Flavor", "Size", "Color"
  options: string[];
}

export interface NutritionInfo {
  servingSize: string;
  servingsPerContainer: number;
  protein?: string;
  carbs?: string;
  bcaa?: string;
  creatine?: string;
  caffeine?: string;
  calories?: string;
  ingredients: string[];
}

export interface SizeGuide {
  sizes: {
    size: string;
    chest: string;
    length: string;
    waist?: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  shortDesc: string;
  fullDesc: string;
  variants: ProductVariant[];
  images: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  nutrition?: NutritionInfo;
  sizeGuide?: SizeGuide;
  suggestedUsage?: string;
  badge?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product id + variant key)
  product: Product;
  selectedVariants: Record<string, string>;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'cod' | 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'card';

export interface OrderItemSummary {
  productId: string;
  name: string;
  variantText: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
  shippingMethod: 'standard' | 'express';
  shippingFee: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending Verification' | 'Paid' | 'Cash on Delivery';
  items: OrderItemSummary[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  gym?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: {
    id: string;
    label: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
  }[];
}
