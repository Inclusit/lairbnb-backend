import { BookingData } from "@/types/booking";

export default function bookingValidator(
  data: BookingData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};

  if (!data.checkInDate) {
    errors.checkInDate = "Check-in date is required";
  }

  if (!data.checkOutDate) {
    errors.checkOutDate = "Check-out date is required";
  } else if (data.checkInDate && data.checkOutDate <= data.checkInDate) {
    errors.checkOutDate = "Check-out date must be after check-in date";
  }

  if (typeof data.totalPrice !== "number" || data.totalPrice <= 0) {
    errors.totalPrice = "Total price must be a positive number";
  }

  if (!data.propertyId) {
    errors.property = "Property is required";
  }

  if (!data.userId) {
    errors.user = "User is required";
  }

  const hasErrors = Object.keys(errors).length > 0;

  return [hasErrors, errors];
}
