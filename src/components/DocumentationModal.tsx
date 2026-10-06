import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Database, Server, Smartphone, ExternalLink } from 'lucide-react';

export const DocumentationModal: React.FC = () => {
  const { isDocsOpen, setIsDocsOpen } = useStore();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isDocsOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'overview', title: '1. Project Overview' },
    { id: 'features', title: '2. Features & User Experience' },
    { id: 'pages', title: '3. Pages & Wireframes' },
    { id: 'techstack', title: '4. Tech Stack Architecture' },
    { id: 'database', title: '5. Database Schema & Models' },
    { id: 'payment', title: '6. Payment Architecture (Pakistan)' },
    { id: 'security', title: '7. Security & Input Validation' },
    { id: 'admin', title: '8. Admin Command Center' },
    { id: 'catalog', title: '9. Categories & Pricing Matrix' },
    { id: 'env', title: '10. Environment Variables & Credentials' },
    { id: 'setup', title: '11. Setup & Migration Guide' },
    { id: 'deploy', title: '12. Deployment & Scalability' },
    { id: 'future', title: '13. Future Roadmap' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col">
        {/* Document Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                  RD FITNESS — Master Architecture & Specification Document
                </h2>
                <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-mono font-bold uppercase">
                  PDF Specification
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Official Technical, Business & Database Blueprint for Client / Investor Review
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Print or Save to PDF via Browser Print"
            >
              <Printer className="w-4 h-4 text-amber-500" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setIsDocsOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation & Document Viewer */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-neutral-950 border-r border-neutral-800 p-3 overflow-y-auto space-y-1 text-xs shrink-0 no-print">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2 py-1 block">
              Document Sections
            </span>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const el = document.getElementById(`doc-${sec.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === sec.id
                    ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Printable Document Body */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-10 text-neutral-300 text-xs sm:text-sm leading-relaxed bg-neutral-900/60 print:bg-white print:text-black">
            {/* Title Page Block */}
            <div className="border-b border-neutral-800 pb-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 inline-block rounded-sm" />
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  PROJECT SPECIFICATION
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                RD FITNESS — Full-Stack E-Commerce System
              </h1>
              <p className="text-neutral-400 text-sm font-sans">
                <strong>Tagline:</strong> Train Hard. Look Better. Live Strong. <br />
                <strong>Target Market:</strong> Pakistan (PKR currency, nationwide logistics, COD, JazzCash, Easypaisa)
              </p>
            </div>

            {/* 1. Project Overview */}
            <section id="doc-overview" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                1. Project Overview
              </h3>
              <p>
                RD FITNESS is a specialized high-performance athletic lifestyle and sports nutrition platform built specifically for Pakistan's burgeoning fitness community. The platform unifies pharmaceutical-grade imported sports nutrition (cold-filtered whey isolate, micronized creatine, pre-workout stimulants) with heavy-duty athletic gym clothing (450 GSM French Terry hoodies, 240 GSM oversized tees, 4-way compression gear).
              </p>
              <p>
                Unlike generic e-commerce templates, RD FITNESS provides a tailored localized user journey featuring Pakistani Rupee (PKR) pricing, real-time TCS/Leopards logistics simulation, multi-channel payment architecture (Cash on Delivery, direct bank transfers to Meezan/HBL, JazzCash & Easypaisa mobile wallets), and an administrative back-office command center.
              </p>
            </section>

            {/* 2. Features & User Experience */}
            <section id="doc-features" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                2. Core Features & UX
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li><strong>Interactive Catalog & Filters:</strong> Real-time filtering by category (Supplements / Gym Wear), price slider, size/color attributes, rating, and stock status.</li>
                <li><strong>Dynamic Product Detail Modal (PDP):</strong> Full image gallery, nutrition facts breakdown, clothing sizing tables, dosage instructions, and verified Pakistani customer reviews.</li>
                <li><strong>Slide-over Cart Drawer:</strong> Quantity steppers, coupon discount calculations (`RDFIT10`, `TRAINHARD`), and dynamic nationwide free delivery progress bar (threshold Rs. 5,000).</li>
                <li><strong>Multi-Step Pakistani Checkout:</strong> 4-step progressive funnel with Pakistani phone regex validation (`03XX-XXXXXXX`), city & province auto-selectors, courier delivery modes, and payment methods.</li>
                <li><strong>Order Confirmation & Tracking:</strong> Generates unique order numbers (`#RDF-XXXX`), simulated courier tracking airway bill (`TCS-XXXX`), timeline stages, and printable tax receipts.</li>
              </ul>
            </section>

            {/* 3. Pages & Structure */}
            <section id="doc-pages" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                3. Pages & Modular Surfaces
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white block">Home Page</strong>
                  <span className="text-neutral-400">Hero banner, Best Sellers, Brand Pillars, Testimonials, Social Gallery.</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white block">Supplements & Apparel Shop</strong>
                  <span className="text-neutral-400">Deep category filters, search autocomplete, quick view, wishlist.</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white block">Customer Account & Tracker</strong>
                  <span className="text-neutral-400">Live order timeline tracker, address book, saved wishlist items.</span>
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white block">Admin Command Center</strong>
                  <span className="text-neutral-400">Catalog CRUD, order status dispatcher, stock updates, revenue KPIs.</span>
                </div>
              </div>
            </section>

            {/* 4. Tech Stack */}
            <section id="doc-techstack" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                4. Tech Stack Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-amber-400 block mb-1">Frontend</strong>
                  <p className="text-neutral-300">React 19 + TypeScript + Vite. Tailwind CSS v4. Motion micro-interactions. Lucide React icons.</p>
                </div>
                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-amber-400 block mb-1">Backend & Server</strong>
                  <p className="text-neutral-300">Node.js Express proxy routes (`server.ts`). REST API endpoints for secure server-side transactions.</p>
                </div>
                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-amber-400 block mb-1">Storage & Schema</strong>
                  <p className="text-neutral-300">Relational schema design with local synchronization and PostgreSQL / Cloud SQL compatible architecture.</p>
                </div>
              </div>
            </section>

            {/* 5. Database Schema */}
            <section id="doc-database" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                5. Relational Database Design
              </h3>
              <p>
                The RD FITNESS relational data model incorporates strict foreign-key integrity, transactional inventory locking to prevent overselling, and audit tracking:
              </p>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-[11px] space-y-2 overflow-x-auto">
                <div className="text-amber-400 font-bold">// Relational Tables Summary</div>
                <div><strong>Users:</strong> (id UUID PK, email VARCHAR UNIQUE, password_hash VARCHAR, role ENUM['customer','admin'], created_at TIMESTAMP)</div>
                <div><strong>Products:</strong> (id UUID PK, slug VARCHAR UNIQUE, name VARCHAR, brand VARCHAR, category_id UUID FK, base_price_pkr NUMERIC, old_price_pkr NUMERIC, stock INT, status VARCHAR)</div>
                <div><strong>ProductVariants:</strong> (id UUID PK, product_id UUID FK, variant_type VARCHAR, option_value VARCHAR, sku VARCHAR, stock_delta INT)</div>
                <div><strong>Orders:</strong> (id UUID PK, order_number VARCHAR UNIQUE, customer_id UUID FK, subtotal_pkr NUMERIC, discount_pkr NUMERIC, shipping_fee_pkr NUMERIC, total_pkr NUMERIC, status ENUM['Pending','Confirmed','Dispatched','Delivered','Cancelled'])</div>
                <div><strong>OrderItems:</strong> (id UUID PK, order_id UUID FK, product_id UUID FK, variant_info JSONB, unit_price_pkr NUMERIC, quantity INT)</div>
                <div><strong>Payments:</strong> (id UUID PK, order_id UUID FK, method ENUM['cod','bank_transfer','jazzcash','easypaisa','card'], status VARCHAR, transaction_ref VARCHAR)</div>
                <div><strong>InventoryAuditLogs:</strong> (id UUID PK, product_id UUID FK, delta INT, reason VARCHAR, timestamp TIMESTAMP)</div>
              </div>
            </section>

            {/* 6. Payment Architecture */}
            <section id="doc-payment" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                6. Payment Architecture (Pakistan Integration Guide)
              </h3>
              <p>
                To adhere to PCI-DSS standards and local banking compliance in Pakistan, credit card numbers are never stored in the application database:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white">1. Cash on Delivery (COD):</strong> Dispatched with TCS/Leopards invoice; courier rider collects PKR cash upon handover.
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white">2. Direct Bank Wire:</strong> Automated IBAN generation for Meezan Bank & HBL. Customer provides transfer reference note; admin verifies via back-office.
                </div>
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <strong className="text-white">3. JazzCash & Easypaisa Mobile Wallets:</strong> Integrates via server-side HTTP webhook callbacks. Merchant credentials reside in secure environment variables.
                </div>
              </div>
            </section>

            {/* 7. Environment Variables Required */}
            <section id="doc-env" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                7. Required Production Environment Variables
              </h3>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs space-y-1.5">
                <div className="text-neutral-500"># Server Port & Core Config</div>
                <div>PORT=3000</div>
                <div>NODE_ENV=production</div>
                <div className="text-neutral-500 pt-2"># Database Connection</div>
                <div>DATABASE_URL=postgresql://rd_admin:secure_password@db-host:5432/rd_fitness</div>
                <div className="text-neutral-500 pt-2"># Pakistan Payment Gateway Credentials</div>
                <div>JAZZCASH_MERCHANT_ID="YOUR_MERCHANT_ID"</div>
                <div>JAZZCASH_PASSWORD="YOUR_PASSWORD"</div>
                <div>JAZZCASH_INTEGRITY_SALT="YOUR_SALT"</div>
                <div>EASYPAISA_STORE_ID="YOUR_STORE_ID"</div>
                <div>EASYPAISA_HASHKEY="YOUR_HASHKEY"</div>
                <div className="text-neutral-500 pt-2"># Courier API Keys (TCS / Trax / Leopards)</div>
                <div>TCS_API_KEY="TCS_PROD_KEY"</div>
                <div>TRAX_API_TOKEN="TRAX_PROD_TOKEN"</div>
              </div>
            </section>

            {/* 8. Setup & Deployment */}
            <section id="doc-setup" className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase border-b border-neutral-800 pb-1 text-amber-400">
                8. Setup & Deployment Instructions
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-300">
                <li><strong>Clone repository:</strong> <code>git clone https://github.com/rdfitness/store.git</code></li>
                <li><strong>Install dependencies:</strong> <code>npm install</code></li>
                <li><strong>Configure environment variables:</strong> <code>cp .env.example .env</code></li>
                <li><strong>Run development build:</strong> <code>npm run dev</code> (Runs on port 3000)</li>
                <li><strong>Production build:</strong> <code>npm run build</code></li>
                <li><strong>Production server start:</strong> <code>npm start</code></li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
