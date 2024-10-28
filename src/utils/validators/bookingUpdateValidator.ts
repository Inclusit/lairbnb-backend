import { BookingUpdateData } from "@/types/booking";

export default function bookingValidator(
  data: BookingUpdateData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};

  if (!data.checkInDate) {
    errors.checkInDate = "Check-in date is required";
  }

  if (!data.checkOutDate) {
    errors.checkOutDate = "Check-out date is required";
  } else if (data.checkInDate && data.checkOutDate <= data.checkInDate) {
    errors.checkOutDate = "Checkout date must be after check-in date";
  }

  if (typeof data.totalPrice !== "number" || data.totalPrice <= 0) {
    errors.totalPrice = "Total price must be a positive number";
  }

  const hasErrors = Object.keys(errors).length > 0;

  return [hasErrors, errors];
}
