"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2, Clock, Mail, MapPin, Star } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { roomsContent } from "@/data/rooms";
import { siteConfig } from "@/data/site";

const inputClasses = "w-full rounded-lg border border-[#F8F8F5]/15 bg-[#0E141B]/60 px-4 py-3 font-body text-sm text-[#F8F8F5] placeholder:text-[#B9B9B9]/50 transition-colors duration-300 focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]/40";
const labelClasses = "mb-2 block font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#B9B9B9]";
const errorClasses = "mt-1.5 font-body text-xs text-[#F87171]";
const whyBookDirect = ["Best Price Guarantee", "Instant Confirmation", "Free Parking", "Priority Support"];

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 1;
  const diff = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
  return diff > 0 ? diff : 1;
}

export default function BookingExperience() {
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState(roomsContent.rooms[0]?.id ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (!roomParam) return;
    const room = roomsContent.rooms.find((item) => item.id === roomParam || item.slug === roomParam);
    if (room) setRoomId(room.id);
  }, [searchParams]);

  const selectedRoom = useMemo(() => roomsContent.rooms.find((room) => room.id === roomId) ?? roomsContent.rooms[0], [roomId]);
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const estimatedPrice = (selectedRoom?.priceFrom ?? 0) * nights * numberOfRooms;
  const taxes = Math.round(estimatedPrice * 0.12);
  const grandTotal = estimatedPrice + taxes;

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const required: Array<[string, string]> = [
      ["fullName", "Please enter your full name."],
      ["phone", "Please enter your phone number."],
      ["email", "Please enter your email address."],
      ["checkIn", "Please select a check-in date."],
      ["checkOut", "Please select a check-out date."],
      ["roomType", "Please select a room type."],
    ];
    for (const [key, message] of required) if (!String(data.get(key) ?? "").trim()) next[key] = message;
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (phone && phone.length < 10) next.phone = "Please enter a valid phone number.";
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) next.checkOut = "Check-out must be after check-in.";
    if (!data.get("agreeToTerms")) next.agreeToTerms = "Please accept the Terms & Conditions.";
    setErrors(next);
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    const form = event.currentTarget;
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      const first = form.elements.namedItem(Object.keys(validationErrors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }

    const data = new FormData(form);
    setSending(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          checkIn: data.get("checkIn"),
          checkOut: data.get("checkOut"),
          adults: data.get("adults"),
          children: data.get("children"),
          roomType: selectedRoom?.category ?? data.get("roomType"),
          numberOfRooms: data.get("numberOfRooms"),
          promoCode: data.get("promoCode"),
          specialRequests: data.get("specialRequests"),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your booking request.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your booking request.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[40%_60%] lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="space-y-6">
            <div className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.5)] sm:p-8">
              <h3 className="font-display text-xl font-light text-[#F8F8F5]">{siteConfig.brand}</h3>
              <div className="mt-2 flex items-center gap-1.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-[#C9A24A] text-[#C9A24A]" />)}<span className="ml-1 font-body text-sm text-[#F8F8F5]/80">{siteConfig.googleRating}</span></div>
              <div className="mt-5 space-y-3 border-t border-[#F8F8F5]/10 pt-5">
                <div className="flex items-start gap-2.5 text-[#B9B9B9]"><MapPin size={15} className="mt-0.5 shrink-0 text-[#C9A24A]" /><span className="font-body text-sm">Mussoorie, Uttarakhand</span></div>
                <div className="flex items-start gap-2.5 text-[#B9B9B9]"><Clock size={15} className="mt-0.5 shrink-0 text-[#C9A24A]" /><span className="font-body text-sm">Check-in: {siteConfig.checkIn} &nbsp;•&nbsp; Check-out: {siteConfig.checkOut}</span></div>
              </div>
              <div className="mt-6 border-t border-[#F8F8F5]/10 pt-6"><p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-[#C9A24A]">Why Book Direct?</p><ul className="mt-3 space-y-2.5">{whyBookDirect.map((item) => <li key={item} className="flex items-center gap-2.5"><Check size={14} className="shrink-0 text-[#C9A24A]" /><span className="font-body text-sm text-[#F8F8F5]/80">{item}</span></li>)}</ul></div>
            </div>
            <div className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 sm:p-8"><p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-[#C9A24A]">Need Help?</p><p className="mt-3 font-body text-sm text-[#F8F8F5]/80">{siteConfig.phone}</p><div className="mt-4 grid grid-cols-2 gap-3"><a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#0E141B]"><WhatsAppIcon size={14} />WhatsApp</a><a href={siteConfig.emailHref} className="flex items-center justify-center gap-2 rounded-sm border border-[#F8F8F5]/25 px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#F8F8F5]"><Mail size={14} />Email</a></div></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-3xl border border-[#C9A24A]/25 bg-[#111827]/70 p-7 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10"><CheckCircle2 size={30} className="text-[#C9A24A]" /></div><h3 className="mt-6 font-display text-xl font-light text-[#F8F8F5]">Reservation Request Received</h3><p className="mt-2 max-w-sm font-body text-sm font-light text-[#B9B9B9]">Your enquiry has been sent to our reservations team. We&apos;ll get back to you shortly.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-[#25D366] px-5 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#0E141B]">WhatsApp Us</a><a href={siteConfig.emailHref} className="rounded-sm border border-[#F8F8F5]/25 px-5 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#F8F8F5]">Email Us</a></div></div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div><label htmlFor="fullName" className={labelClasses}>Full Name</label><input id="fullName" name="fullName" required placeholder="Your full name" className={`${inputClasses} ${errors.fullName ? "border-[#F87171]" : ""}`} />{errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}</div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label htmlFor="phone" className={labelClasses}>Phone Number</label><input id="phone" name="phone" type="tel" required placeholder="+91 00000 00000" className={`${inputClasses} ${errors.phone ? "border-[#F87171]" : ""}`} />{errors.phone && <p className={errorClasses}>{errors.phone}</p>}</div><div><label htmlFor="email" className={labelClasses}>Email Address</label><input id="email" name="email" type="email" required placeholder="you@email.com" className={`${inputClasses} ${errors.email ? "border-[#F87171]" : ""}`} />{errors.email && <p className={errorClasses}>{errors.email}</p>}</div></div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label htmlFor="checkIn" className={labelClasses}>Check-in</label><input id="checkIn" name="checkIn" type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={`${inputClasses} ${errors.checkIn ? "border-[#F87171]" : ""}`} />{errors.checkIn && <p className={errorClasses}>{errors.checkIn}</p>}</div><div><label htmlFor="checkOut" className={labelClasses}>Check-out</label><input id="checkOut" name="checkOut" type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={`${inputClasses} ${errors.checkOut ? "border-[#F87171]" : ""}`} />{errors.checkOut && <p className={errorClasses}>{errors.checkOut}</p>}</div></div>
                <div className="grid grid-cols-2 gap-5"><div><label htmlFor="adults" className={labelClasses}>Adults</label><select id="adults" name="adults" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={inputClasses}>{Array.from({ length: 8 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select></div><div><label htmlFor="children" className={labelClasses}>Children</label><select id="children" name="children" value={children} onChange={(e) => setChildren(Number(e.target.value))} className={inputClasses}>{Array.from({ length: 6 }, (_, i) => i).map((n) => <option key={n} value={n}>{n}</option>)}</select></div></div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div><label htmlFor="roomType" className={labelClasses}>Room Type</label><select id="roomType" name="roomType" value={roomId} onChange={(e) => setRoomId(e.target.value)} className={`${inputClasses} ${errors.roomType ? "border-[#F87171]" : ""}`}>{roomsContent.rooms.map((room) => <option key={room.id} value={room.id}>{room.category}</option>)}</select>{errors.roomType && <p className={errorClasses}>{errors.roomType}</p>}</div><div><label htmlFor="numberOfRooms" className={labelClasses}>Number of Rooms</label><select id="numberOfRooms" name="numberOfRooms" value={numberOfRooms} onChange={(e) => setNumberOfRooms(Number(e.target.value))} className={inputClasses}>{Array.from({ length: 5 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select></div></div>
                <div><label htmlFor="promoCode" className={labelClasses}>Promo Code (optional)</label><input id="promoCode" name="promoCode" placeholder="Enter promo code" className={inputClasses} /></div>
                <div><label htmlFor="specialRequests" className={labelClasses}>Special Requests</label><textarea id="specialRequests" name="specialRequests" rows={4} placeholder="Anything we should know ahead of your stay?" className={`${inputClasses} resize-none`} /></div>
                <label className="flex items-start gap-3 font-body text-xs font-light text-[#B9B9B9]"><input type="checkbox" name="agreeToTerms" required className="mt-0.5 h-4 w-4 shrink-0" /><span>I agree to the <a href="/terms-and-conditions" className="text-[#C9A24A] hover:underline">Terms &amp; Conditions</a>{errors.agreeToTerms && <span className={`block ${errorClasses}`}>{errors.agreeToTerms}</span>}</span></label>
                {submitError && <div role="alert" className="rounded-lg border border-[#F87171]/30 bg-[#F87171]/10 px-4 py-3 font-body text-sm text-[#FCA5A5]">{submitError}</div>}
                <button type="submit" disabled={sending} className="w-full rounded-sm bg-[#C9A24A] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm">{sending ? "Sending Request…" : "Reserve Now"}</button>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-7 sm:p-9">
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-[#C9A24A]">Live Booking Summary</p>
          <dl className="mt-5 divide-y divide-[#F8F8F5]/10">
            <div className="flex items-center justify-between py-3"><dt className="font-body text-sm text-[#B9B9B9]">Room</dt><dd className="font-body text-sm text-[#F8F8F5]">{selectedRoom?.category} × {numberOfRooms}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="font-body text-sm text-[#B9B9B9]">Guests</dt><dd className="font-body text-sm text-[#F8F8F5]">{adults} Adults{children > 0 ? `, ${children} Children` : ""}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="font-body text-sm text-[#B9B9B9]">Nights</dt><dd className="font-body text-sm text-[#F8F8F5]">{nights}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="font-body text-sm text-[#B9B9B9]">Estimated Price</dt><dd className="font-body text-sm text-[#F8F8F5]">₹{estimatedPrice.toLocaleString("en-IN")}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="font-body text-sm text-[#B9B9B9]">Taxes (12%)</dt><dd className="font-body text-sm text-[#F8F8F5]">₹{taxes.toLocaleString("en-IN")}</dd></div>
            <div className="flex items-center justify-between pt-4"><dt className="font-display text-base font-medium text-[#F8F8F5]">Grand Total</dt><dd className="font-display text-xl font-medium text-[#C9A24A]">₹{grandTotal.toLocaleString("en-IN")}</dd></div>
          </dl>
          <p className="mt-5 font-body text-[11px] font-light text-[#F8F8F5]/40">Estimate only, based on placeholder pricing — final rates are confirmed at booking.</p>
        </motion.div>
      </div>
    </section>
  );
}
