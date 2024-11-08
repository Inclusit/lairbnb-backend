"use client";

import { useEffect, useState } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { BookingData } from "@/types/booking";
import { useUser } from "@/context/user";

type BookingCalendarProps = {
  bookedDates: Date[];
  propertyId: string;
  defaultDates?: DateRange;
  onBooking: (dates: DateRange) => void;
};

export default function BookingCalendar({
  bookedDates = [],
  propertyId,
  onBooking,
  defaultDates,
}: BookingCalendarProps) {
  const { user, token } = useUser();
  const [selectedDates, setSelectedDates] = useState<DateRange>();
  const [error, setError] = useState<string | null>(null);

  useEffect(()  => {
    if (defaultDates) {
      setSelectedDates(defaultDates);
    }
  }
  , [defaultDates]);

  const handleBooking = async () => {
    if (!selectedDates?.from || !selectedDates?.to || !token || !user) {
      setError("Vänligen välj ett datumintervall.");
      return;
    }

    const bookingData: BookingData = {
      propertyId,
      user: { id: user.id },
      checkInDate: selectedDates.from,
      checkOutDate: selectedDates.to,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        onBooking(selectedDates); 
      } else {
        console.error("Failed to book property:", response.statusText);
      }
    } catch (error: any) {
      console.error("Failed to book property:", error);
    }
  };

  return (
    <div className="relative w-full">
      <Calendar
        className="rounded-md border shadow relative"
        mode="range"
        selected={selectedDates}
        onSelect={(range) => {
          if (range && range.from && range.to) {
            const from = range.from;
            const to = range.to;

            
            const isBooked = bookedDates.some(
              (date) => from < date && to > date
            );
            if (isBooked) {
              return; 
            }
          }
          setSelectedDates(range);
          
        }}
        fromDate={new Date()}
        disabled={bookedDates} 
      />
      <Button
        className="absolute bottom-4 right-4"
        onClick={() => {
          if (selectedDates) {
            handleBooking(); 
          }
        }}
      >
        Boka
      </Button>
    </div>
  );
}
