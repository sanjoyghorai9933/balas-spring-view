"use client";

import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { roomsContent } from "@/data/rooms";
import { siteConfig } from "@/data/site";

const inputClasses =
  "w-full rounded-lg border border-[#F8F8F5]/15 bg-[#0E141B]/60 px-4 py-3 font-body text-sm text-[#F8F8F5] placeholder:text-[#B9B9B9]/50 transition-colors duration-300 focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]/40";

const labelClasses =
  "mb-2 block font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#B9B9B9]";

const whyBookDirect = [
  "Best Price Guarantee",
  "Instant Confirmation",
  "Free Parking",
  "Priority Support",
];

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

export default function BookingExperience() {
  const [roomId, setRoomId] = useState(roomsContent.rooms[0]?.id ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const selectedRoom = useMemo(
    () => roomsContent.rooms.find((room) => room.id === roomId) ?? roomsContent.rooms[0],
    [roomId],
  );

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  const estimatedPrice = (selectedRoom?.priceFrom ?? 0) * nights * numberOfRooms;
  const taxes = Math.round(estimatedPrice * 0.12);
  const grandTotal = estimatedPrice + taxes;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No booking/payment backend is connected yet — this confirms
    // receipt of the reservation request on the front end only.
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[40%_60%] lg:gap-12">
            {/* LEFT — Booking summary + help */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.5)] sm:p-8">
                <h3 className="font-display text-xl font-light text-[#F8F8F5]">
                  {siteConfig.brand}
                </h3>

                <div className="mt-2 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#C9A24A] text-[#C9A24A]" />
                  ))}
                  <span className="ml-1 font-body text-sm text-[#F8F8F5]/80">
                    {siteConfig.googleRating}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-[#F8F8F5]/10 pt-5">
                  <div className="flex items-start gap-2.5 text-[#B9B9B9]">
                    <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                    <span className="font-body text-sm">Mussoorie, Uttarakhand</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#B9B9B9]">
                    <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                    <span className="font-body text-sm">
                      Check-in: {siteConfig.checkIn} &nbsp;•&nbsp; Check-out: {siteConfig.checkOut}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#F8F8F5]/10 pt-6">
                  <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-[#C9A24A]">
                    Why Book Direct?
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {whyBookDirect.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <Check size={14} strokeWidth={2} className="shrink-0 text-[#C9A24A]" />
                        <span className="font-body text-sm text-[#F8F8F5]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.5)] sm:p-8">
                <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-[#C9A24A]">
                  Need Help?
                </p>
                <p className="mt-3 font-body text-sm text-[#F8F8F5]/80">{siteConfig.phone}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2fe077]"
                  >
                    <WhatsAppIcon size={14} />
                    WhatsApp
                  </a>
                  <a
                    href={siteConfig.emailHref}
                    className="flex items-center justify-center gap-2 rounded-sm border border-[#F8F8F5]/25 px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#F8F8F5] transition-all duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A]"
                  >
                    <Mail size={14} strokeWidth={1.75} />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Reservation form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-[#C9A24A]/25 bg-[#111827]/70 p-7 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10">
                    <CheckCircle2 size={30} strokeWidth={1.5} className="text-[#C9A24A]" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-light text-[#F8F8F5]">
                    Reservation Request Received
                  </h3>
                  <p className="mt-2 max-w-xs font-body text-sm font-light text-[#B9B9B9]">
                    We&apos;ll confirm your booking within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your full name"
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="checkIn" className={labelClasses}>
                        Check-in
                      </label>
                      <input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        required
                        value={checkIn}
                        onChange={(event) => setCheckIn(event.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="checkOut" className={labelClasses}>
                        Check-out
                      </label>
                      <input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        required
                        value={checkOut}
                        onChange={(event) => setCheckOut(event.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="adults" className={labelClasses}>
                        Adults
                      </label>
                      <select
                        id="adults"
                        name="adults"
                        value={adults}
                        onChange={(event) => setAdults(Number(event.target.value))}
                        className={inputClasses}
                      >
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="children" className={labelClasses}>
                        Children
                      </label>
                      <select
                        id="children"
                        name="children"
                        value={children}
                        onChange={(event) => setChildren(Number(event.target.value))}
                        className={inputClasses}
                      >
                        {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="roomType" className={labelClasses}>
                        Room Type
                      </label>
                      <select
                        id="roomType"
                        name="roomType"
                        value={roomId}
                        onChange={(event) => setRoomId(event.target.value)}
                        className={inputClasses}
                      >
                        {roomsContent.rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="numberOfRooms" className={labelClasses}>
                        Number of Rooms
                      </label>
                      <select
                        id="numberOfRooms"
                        name="numberOfRooms"
                        value={numberOfRooms}
                        onChange={(event) => setNumberOfRooms(Number(event.target.value))}
                        className={inputClasses}
                      >
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="promoCode" className={labelClasses}>
                      Promo Code (optional)
                    </label>
                    <input
                      id="promoCode"
                      name="promoCode"
                      type="text"
                      placeholder="Enter promo code"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className={labelClasses}>
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      placeholder="Anything we should know ahead of your stay?"
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <label className="flex items-start gap-3 font-body text-xs font-light text-[#B9B9B9]">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#F8F8F5]/25 bg-[#0E141B]/60 text-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/40"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="/terms-and-conditions"
                        className="text-[#C9A24A] underline-offset-2 hover:underline"
                      >
                        Terms &amp; Conditions
                      </a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-sm bg-[#C9A24A] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
                  >
                    Reserve Now
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* PRICE ESTIMATE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.5)] sm:p-9"
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-[#C9A24A]">
              Live Booking Summary
            </p>

            <dl className="mt-5 divide-y divide-[#F8F8F5]/10">
              <div className="flex items-center justify-between py-3">
                <dt className="font-body text-sm text-[#B9B9B9]">Room</dt>
                <dd className="font-body text-sm text-[#F8F8F5]">
                  {selectedRoom?.category} × {numberOfRooms}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-body text-sm text-[#B9B9B9]">Guests</dt>
                <dd className="font-body text-sm text-[#F8F8F5]">
                  {adults} Adults{children > 0 ? `, ${children} Children` : ""}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-body text-sm text-[#B9B9B9]">Nights</dt>
                <dd className="font-body text-sm text-[#F8F8F5]">{nights}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-body text-sm text-[#B9B9B9]">Estimated Price</dt>
                <dd className="font-body text-sm text-[#F8F8F5]">
                  ₹{estimatedPrice.toLocaleString("en-IN")}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-body text-sm text-[#B9B9B9]">Taxes (12%)</dt>
                <dd className="font-body text-sm text-[#F8F8F5]">
                  ₹{taxes.toLocaleString("en-IN")}
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="font-display text-base font-medium text-[#F8F8F5]">
                  Grand Total
                </dt>
                <dd className="font-display text-xl font-medium text-[#C9A24A]">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>

            <p className="mt-5 font-body text-[11px] font-light text-[#F8F8F5]/40">
              Estimate only, based on placeholder pricing — final rates are confirmed at booking.
            </p>
          </motion.div>
        </div>
      </section>
  );
}
