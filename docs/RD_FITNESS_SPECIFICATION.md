# RD FITNESS — Full-Stack E-Commerce Website Master Specification

**Brand Name:** RD FITNESS  
**Tagline:** Train Hard. Look Better. Live Strong.  
**Target Market:** Pakistan  
**Primary Currency:** Pakistani Rupees (PKR / Rs.)  
**Categories:** Fitness Supplements & Gym/Fitness Apparel  

---

## 1. Project Overview & Executive Summary

RD FITNESS is an authentic Pakistani sports nutrition and athletic streetwear e-commerce platform. It eliminates common marketplace pain points—such as counterfeit imported supplements and poor activewear construction—by providing:
1. Cold-filtered, HPLC-tested sports nutrition (Whey Isolate, Pure Creatine Monohydrate, Clinically Dosed Pre-Workouts).
2. Heavyweight athletic streetwear tailored for muscular builds (450 GSM French Terry Hoodies, 240 GSM Drop-Shoulder Oversized Tees, 4-Way Stretch Compression Gear).
3. Nationwide logistics through TCS Express, Trax, and Leopards Couriers with 24–72 hour doorstep delivery.
4. Seamless localized payments including Cash on Delivery (COD), Direct Bank Transfer to Meezan Bank / HBL, and JazzCash / Easypaisa mobile wallets.
5. An operational back-office Admin Command Center for inventory management, order dispatch, status updates, and revenue tracking.

---

## 2. Technical Stack Architecture

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4.
- **Visuals & Media:** High-fidelity generated product imagery, responsive image containers, zero-broken-image fallbacks.
- **State Management:** Reactive Store Context with `localStorage` persistent synchronization for cart, wishlist, custom products, orders, and customer accounts.
- **Typography:** Display face *Oswald*, Body prose *Plus Jakarta Sans*, Metrics/Data *JetBrains Mono* with tabular numerals.
- **Backend / API Structure:** Node.js Express server (`server.ts`) for proxy routes, tokenization endpoints, and checkout verification.
- **Security:** PCI-DSS tokenization pattern, client-side sanitize routines, Pakistani phone regex validation (`+92 3XX XXXXXXX` / `03XX XXXXXXX`).

---

## 3. Product Catalog & Pricing Matrix (Pakistani Rupees)

### Fitness Supplements
| Product Name | Category | Serving Size / Spec | Demo Price (PKR) | Old Price (PKR) | Key Feature |
|---|---|---|---|---|---|
| **RD Whey Pro 100% Isolate** | Whey Protein | 2 KG (66 Servings) | Rs. 15,999 | Rs. 17,999 | 24g Protein, 5.5g BCAAs, DigeZyme |
| **RD Pure Micronized Creatine** | Creatine | 300G (60 Servings) | Rs. 6,499 | Rs. 7,299 | 100% 200-mesh micronized Creapure |
| **RD Pre-Force Pre-Workout** | Pre-Workout | 390G (30 Servings) | Rs. 5,499 | Rs. 6,299 | 350mg Caffeine, 6g L-Citrulline Malate |
| **RD Mass Builder Extreme** | Mass Gainer | 5 KG (16 Servings) | Rs. 18,500 | Rs. 20,500 | 1,250 Cals, 52g Protein Complex |
| **RD EAA Recovery Matrix** | Amino Acids | 400G (40 Servings) | Rs. 4,999 | Rs. 5,799 | 9 EAAs + Coconut Water Powder |
| **RD Daily Multi + Zinc & D3** | Multivitamins | 60 Coated Tablets | Rs. 2,999 | Rs. 3,499 | 30mg Bisglycinate Zinc, 5000 IU D3 |
| **RD Electro Fuel Hydration** | Electrolytes | 30 Stick Packs | Rs. 3,499 | Rs. 3,999 | 1000mg Sodium, Himalayan Pink Salt |

### Gym & Fitness Clothing
| Product Name | Category | Sizes Supported | Demo Price (PKR) | Old Price (PKR) | Key Feature |
|---|---|---|---|---|---|
| **RD Core Compression Muscle Tee** | Compression | S, M, L, XL, XXL | Rs. 2,499 | Rs. 2,999 | 4-Way high tensile stretch, mesh vents |
| **RD Iron Oversized Tee** | Streetwear Tee | S, M, L, XL, XXL | Rs. 2,799 | Rs. 3,299 | 240 GSM heavy combed cotton, boxy drop shoulder |
| **RD Performance Raw Cut Tank** | Tank Top | S, M, L, XL | Rs. 2,199 | Rs. 2,599 | Deep cut armholes, raw edge hem |
| **RD Elite Tapered Joggers** | Joggers | S, M, L, XL, XXL | Rs. 4,499 | Rs. 4,999 | Squat gusset, concealed YKK zips |
| **RD Heavyweight Armor Hoodie** | Gym Hoodie | S, M, L, XL, XXL | Rs. 5,999 | Rs. 6,999 | 450 GSM luxury brushed French terry |
| **RD 5" 2-in-1 Training Shorts** | Shorts | S, M, L, XL | Rs. 2,999 | Rs. 3,499 | Built-in compression liner, phone slot |
| **RD Strength Technical Trousers**| Trousers | S, M, L, XL | Rs. 4,299 | Rs. 4,799 | Barbell-abrasion resistant fabric |

---

## 4. Relational Database Architecture

```sql
-- 1. Users & Roles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(180) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('supplements', 'clothing')),
    sub_category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    old_price NUMERIC(10, 2),
    stock INT NOT NULL DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    short_description TEXT,
    full_description TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Variants
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(50) NOT NULL, -- e.g. "Size", "Flavor"
    option_value VARCHAR(100) NOT NULL, -- e.g. "Double Rich Chocolate", "XL"
    sku VARCHAR(80) UNIQUE,
    stock_quantity INT DEFAULT 0
);

-- 4. Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(40) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(80) NOT NULL,
    province VARCHAR(80) NOT NULL,
    postal_code VARCHAR(20),
    delivery_notes TEXT,
    shipping_method VARCHAR(30) NOT NULL,
    shipping_fee NUMERIC(8, 2) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0,
    coupon_code VARCHAR(40),
    total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled')),
    tracking_number VARCHAR(80),
    courier_name VARCHAR(80),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(200) NOT NULL,
    variant_details JSONB,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0)
);

-- 6. Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(40) NOT NULL CHECK (method IN ('cod', 'bank_transfer', 'jazzcash', 'easypaisa', 'card')),
    status VARCHAR(40) NOT NULL,
    transaction_ref VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Pakistan Payment & Logistics Integration Guide

### A. Cash on Delivery (COD)
- Default preferred choice for ~70% of Pakistani e-commerce shoppers.
- Integrated via TCS / Trax open API with automatic consignment note generation.
- Delivery threshold: Orders $\ge$ Rs. 5,000 qualify for **Free Shipping**; otherwise flat Rs. 250 courier fee is added.

### B. Direct Corporate Bank Wire
- Accounts configured for instant receipt generation:
  - **Meezan Bank Ltd:** Title: RD FITNESS PVT LTD | Acc: `0102-0109283741` | IBAN: `PK65MEZN0001020109283741`
  - **Habib Bank Limited (HBL):** Title: RD FITNESS PVT LTD | Acc: `2390-7901238491` | IBAN: `PK44HABB0023907901238491`
- Customer provides transfer transaction reference in checkout. Admin verifies via portal.

### C. JazzCash & Easypaisa Integration
- Server-side REST endpoints configured in `server.ts` to forward push notifications (USSD MPIN prompts and mobile wallet push debits) safely without exposing API keys.

---

## 6. Testing & Quality Checklist Passed

1. **User Flows Verified:**
   - Browsing supplements & gym apparel catalog with responsive filtering.
   - Adding items with specific variant selections (Flavor / Weight / Size / Color) to bag.
   - Slide-over cart drawer opening, updating quantity, applying coupons (`RDFIT10`, `TRAINHARD`).
   - 4-step Pakistani checkout with phone number validation and city selectors.
   - Successful order placement yielding order number `#RDF-XXXX` and courier tracking.
   - Direct order tracking simulator matching orders by reference code.
   - Admin command center overview, inventory updates, and order status transitions.
2. **Design Standards Met:**
   - 60-30-10 color allocation (matte black canvas, charcoal structural surfaces, amber/orange energetic accent).
   - Zero-pill metadata discipline, tabular numerals on all prices and metrics.
   - Printable documentation module formatted for export.
