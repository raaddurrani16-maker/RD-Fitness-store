import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RotateCcw, Send, Check } from 'lucide-react';

export const InfoPagesModals: React.FC = () => {
  const {
    isAboutOpen,
    setIsAboutOpen,
    isContactOpen,
    setIsContactOpen,
    isFaqOpen,
    setIsFaqOpen,
    showToast,
  } = useStore();

  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast('Your message has been sent to RD Fitness Support team!', 'success');
  };

  return (
    <>
      {/* ABOUT US MODAL */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                  The Story Behind
                </span>
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                  About RD Fitness Pakistan
                </h2>
              </div>
              <button
                onClick={() => setIsAboutOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <p>
                Founded with a straightforward mission: <strong className="text-white">To rid Pakistan’s fitness market of low-grade, counterfeited supplements and flimsy activewear.</strong>
              </p>
              <p>
                RD FITNESS bridges the gap between international athletic standards and Pakistani lifters. Every batch of our whey protein, micronized creatine, and amino acids is cold-filtered and HPLC lab-certified with zero amino spiking.
              </p>
              <p>
                Our gym apparel line is designed specifically around muscular aesthetics. We utilize heavyweight 450 GSM French Terry and high-tensile 4-way stretch fabrics crafted with reinforced bar-tack stitching so you never have to worry about tears during heavy squat sessions.
              </p>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 mt-4">
                <h4 className="font-bold text-amber-400 uppercase text-xs">Our Core Values:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
                  <li><strong>Authenticity Guaranteed:</strong> 100% verified pure ingredients.</li>
                  <li><strong>Fair Pakistani Pricing:</strong> Direct-to-consumer without middleman markups.</li>
                  <li><strong>Nationwide Accessibility:</strong> Reliable COD delivery from Karachi to Gilgit.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT US MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                  Nationwide Support
                </span>
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                  Contact RD Fitness
                </h2>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[11px]">
                  <MapPin className="w-4 h-4" />
                  <span>Karachi Distribution Hub</span>
                </div>
                <p className="text-neutral-300">Plot 18-C, 4th Commercial Lane, Zamzama DHA Phase 5, Karachi</p>
                <p className="text-neutral-400 font-mono">UAN: +92 (021) 3589-2910</p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[11px]">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Lifters Hotline</span>
                </div>
                <p className="text-neutral-300">Live order support & diet advice: Mon - Sat (10am - 9pm)</p>
                <p className="text-emerald-400 font-mono font-bold">+92 300 8451234</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <h4 className="font-bold text-white uppercase text-xs">Send Message to Customer Care</h4>
              {contactSubmitted ? (
                <div className="p-3 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Thank you! A representative will respond via WhatsApp or Email within 2 business hours.</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      className="bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number (e.g. 0300 1234567)"
                      className="bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white font-mono"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we assist you with your fitness goals or order inquiry?"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-lg font-bold uppercase text-xs tracking-wider"
                  >
                    Send Inquiry
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* FAQS MODAL */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">
                  Help Center
                </span>
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <button
                onClick={() => setIsFaqOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <h4 className="font-bold text-amber-400">How long does delivery take in Pakistan?</h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  We dispatch orders via TCS, Leopards, and Trax. Major cities (Karachi, Lahore, Islamabad, Rawalpindi) arrive within <strong>24 to 48 hours</strong>. Second-tier cities take 2 to 4 business days.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <h4 className="font-bold text-amber-400">Is Cash on Delivery (COD) supported nationwide?</h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  Yes! You can pay cash directly to the courier rider upon package inspection across all Pakistani cities and towns.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <h4 className="font-bold text-amber-400">How can I verify product authenticity?</h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  Each supplement tub features an authentic holographic security seal with a unique scratch-off QR verification code linked directly to our batch certificate database.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1.5">
                <h4 className="font-bold text-amber-400">What is your exchange and return policy?</h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  We offer a 7-day hassle-free return or size exchange on all unworn clothing items with original tags intact. Unopened supplement tubs with unbroken seals are eligible for returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
