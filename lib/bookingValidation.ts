export type BookingValidationValues = {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adults: number | string;
  roomId: string;
  numberOfRooms: number | string;
  agreeToTerms: boolean;
};

export type BookingValidationErrors = Partial<Record<keyof BookingValidationValues, string>>;

export function isNonEmpty(value: string) {
  return value.trim().length > 0;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^[+\d()\s-]+$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}

export function isCheckoutAfterCheckin(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return true;
  return new Date(`${checkOut}T00:00:00`).getTime() > new Date(`${checkIn}T00:00:00`).getTime();
}

export function validateBooking(values: BookingValidationValues): BookingValidationErrors {
  const errors: BookingValidationErrors = {};

  if (!isNonEmpty(values.fullName)) errors.fullName = "Please enter your full name.";
  if (!isValidPhone(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.checkIn) errors.checkIn = "Please select a check-in date.";
  if (!values.checkOut) errors.checkOut = "Please select a check-out date.";
  else if (!isCheckoutAfterCheckin(values.checkIn, values.checkOut)) {
    errors.checkOut = "Check-out must be later than check-in.";
  }
  if (Number(values.adults) < 1) errors.adults = "At least 1 adult is required.";
  if (!isNonEmpty(values.roomId)) errors.roomId = "Please select a room.";
  if (Number(values.numberOfRooms) < 1) errors.numberOfRooms = "Select at least 1 room.";
  if (!values.agreeToTerms) errors.agreeToTerms = "Please agree to the Terms & Conditions.";

  return errors;
}

export function focusFirstInvalidField(form: HTMLFormElement, errors: BookingValidationErrors) {
  const order: Array<keyof BookingValidationValues> = [
    "fullName",
    "phone",
    "email",
    "checkIn",
    "checkOut",
    "adults",
    "roomId",
    "numberOfRooms",
    "agreeToTerms",
  ];

  const field = order.find((name) => errors[name]);
  if (!field) return;

  const element = form.elements.namedItem(field) as HTMLElement | null;
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}
