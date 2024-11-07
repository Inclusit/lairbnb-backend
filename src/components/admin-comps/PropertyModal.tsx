import { Booking, Property } from "@prisma/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BookingData } from "@/types/booking";
import { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BookingCalendar from "../BookingCalendar";
import { DateRange } from "react-day-picker";
import ErrorPopup from "../ErrorPopup";
import { useUser } from "@/context/user";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

type PropertyModalProps = {
  property: Property;
  open: boolean;
  onClose: () => void;
};

export default function PropertyModal({
  property,
  open,
  onClose,
}: PropertyModalProps) {
  const user = useUser();
  const [errorPopup, seterrorPopup] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const bookedDates = bookings.map((booking) => new Date());

  console.log("Bokningar:", bookings, user);

  useEffect(() => {
    if (open) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [open]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/bookings/property/${property.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error: any) {
      console.warn("Error: Failed to fetch bookings", error.message);
    }
  };

  const handleBooking = (dates: DateRange) => {
    if (!user.user?.id) {
      seterrorPopup(true);
      return;
    }

    if (!dates.from || !dates.to) {
      console.error("Vänligen välj ett datumintervall.");
      return;
    }

    const bookingData: BookingData = {
      property,
      user: { id: user.user.id },
      checkInDate: dates.from,
      checkOutDate: dates.to,
    };

    console.log("Bokningsdata:", bookingData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="flex items-center justify-center fixed bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 mx-auto my-auto">
          <DialogTitle className="text-lg font-bold text-center">
            {property.name}
          </DialogTitle>
          <div className="flex mt-2">
            <DialogDescription className="flex-1 mr-4">
              <p>{property.description}</p>
            </DialogDescription>
            <div className="flex-shrink-0">
              <BookingCalendar
                bookedDates={bookedDates || []}
                propertyId={property.id}
                onBooking={handleBooking}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button variant="secondary" onClick={onClose}>
              Stäng
            </Button>
          </div>
        </div>
      </DialogContent>

      <ErrorPopup
        open={errorPopup}
        onClose={() => seterrorPopup(false)}
        message="Du måste vara inloggad för att kunna boka. Vänligen logga in eller registrera dig."
      />
    </Dialog>
  );
}
