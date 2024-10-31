import { BookingUpdateData } from "@/types/booking";

export default function bookingUpdateValidator(
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

  const hasErrors = Object.keys(errors).length > 0;

  return [hasErrors, errors];
}
