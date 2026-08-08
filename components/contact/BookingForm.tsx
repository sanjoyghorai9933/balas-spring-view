"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import PhoneButton from "@/components/layout/PhoneButton";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import {
  focusFirstInvalidField,
  validateBooking,
  type BookingValidationErrors,
} from "@/lib/bookingValidation";

const inputClasses =
  "w-full rounded-lg border border-[#F8F8F5]/15 bg-[#0E141B]/60 px-4 py-3 font-body text-sm text-[#F8F8F5] placeholder:text-[#B9B9B9]/50 transition-colors duration-300 focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]/40";
const labelClasses =
  "mb-2 block font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#B9B9B9]";
const errorClasses = "mt-1.5 font-body text-xs text-[#F87171]";

type BookingFormProps = {
  footnote: string;
  submitLabel?: string;
  showTermsCheckbox?: boolean;
};

export default function BookingForm({
  footnote,
  submitLabel = "Book Your Stay",
  showTermsCheckbox = false,
}: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const validationErrors = validateBooking({
      fullName: String(data.get("fullName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      checkIn: String(data.get("checkIn") ?? ""),
      checkOut: String(data.get("checkOut") ?? ""),
      adults: String(data.get("adults") ?? "0"),
      roomId: String(data.get("roomType") ?? ""),
      numberOfRooms: "1",
      agreeToTerms: showTermsCheckbox ? data.get("agreeToTerms") === "on" : true,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      focusFirstInvalidField(form, validationErrors);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10">
          <CheckCircle2 size={30} strokeWidth={1.5} className="text-[#C9A24A]" />
        </div>
        <h3 className="mt-6 font-display text-xl font-light text-[#F8F8F5]">
          Thank you for your enquiry
        </h3>
        <p className="mt-2 max-w-xs font-body text-sm font-light text-[#B9B9B9]">
          {footnote}
        </p>
        <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
          <WhatsAppButton
            label="WhatsApp Us"
            variant="solid"
            message="Hello, I have just submitted an enquiry to Bala's Spring View by Vista Hills. Please help me with my request."
            className="w-full"
          />
          <PhoneButton
            label="Call Us"
            className="w-full justify-center border-[#F8F8F5]/25 px-5 py-3 text-xs uppercase tracking-[0.15em]"
          />
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="fullName" className={labelClasses}>Full Name</label>
        <input id="fullName" name="fullName" type="text" required placeholder="Your full name" className={inputClasses} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
        {errors.fullName && <p id="fullName-error" className={errorClasses}>{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number</label>
          <input id="phone" name="phone" type="tel" required placeholder="+91 00000 00000" className={inputClasses} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <p id="phone-error" className={errorClasses}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" className={inputClasses} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className={errorClasses}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="checkIn" className={labelClasses}>Check-in Date</label>
          <input id="checkIn" name="checkIn" type="date" required className={inputClasses} aria-invalid={Boolean(errors.checkIn)} aria-describedby={errors.checkIn ? "checkIn-error" : undefined} />
          {errors.checkIn && <p id="checkIn-error" className={errorClasses}>{errors.checkIn}</p>}
        </div>
        <div>
          <label htmlFor="checkOut" className={labelClasses}>Check-out Date</label>
          <input id="checkOut" name="checkOut" type="date" required className={inputClasses} aria-invalid={Boolean(errors.checkOut)} aria-describedby={errors.checkOut ? "checkOut-error" : undefined} />
          {errors.checkOut && <p id="checkOut-error" className={errorClasses}>{errors.checkOut}</p>}
        </div>
      </div>

      <div>
        <span className={labelClasses}>Guests</span>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="adults" className="mb-1.5 block font-body text-[10px] text-[#B9B9B9]/70">Adults</label>
            <select id="adults" name="adults" defaultValue="2" className={inputClasses} aria-invalid={Boolean(errors.adults)} aria-describedby={errors.adults ? "adults-error" : undefined}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            {errors.adults && <p id="adults-error" className={errorClasses}>{errors.adults}</p>}
          </div>
          <div>
            <label htmlFor="children" className="mb-1.5 block font-body text-[10px] text-[#B9B9B9]/70">Children</label>
            <select id="children" name="children" defaultValue="0" className={inputClasses}>
              {Array.from({ length: 6 }, (_, i) => i).map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="roomType" className={labelClasses}>Room Type</label>
        <select id="roomType" name="roomType" defaultValue="" className={inputClasses} aria-invalid={Boolean(errors.roomId)} aria-describedby={errors.roomId ? "roomType-error" : undefined}>
          <option value="" disabled>Select Room</option>
          <option value="deluxe-room">Deluxe Room</option>
          <option value="premium-deluxe-room">Premium Deluxe Room</option>
          <option value="family-suite">Family Suite</option>
        </select>
        {errors.roomId && <p id="roomType-error" className={errorClasses}>{errors.roomId}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>Message</label>
        <textarea id="message" name="message" rows={4} placeholder="Special requests" className={`${inputClasses} resize-none`} />
      </div>

      {showTermsCheckbox && (
        <div>
          <label className="flex items-start gap-3 font-body text-xs font-light text-[#B9B9B9]">
            <input type="checkbox" name="agreeToTerms" className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#F8F8F5]/25 bg-[#0E141B]/60 text-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/40" aria-invalid={Boolean(errors.agreeToTerms)} aria-describedby={errors.agreeToTerms ? "terms-error" : undefined} />
            <span>I agree to the{" "}<a href="/terms-and-conditions" className="text-[#C9A24A] underline-offset-2 hover:underline">Terms &amp; Conditions</a></span>
          </label>
          {errors.agreeToTerms && <p id="terms-error" className={errorClasses}>{errors.agreeToTerms}</p>}
        </div>
      )}

      <button type="submit" className="w-full rounded-sm bg-[#C9A24A] px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm">
        {submitLabel}
      </button>

      <p className="text-center font-body text-xs font-light text-[#B9B9B9]">{footnote}</p>
    </form>
  );
}
