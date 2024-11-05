"use client";

import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { Booking } from "@prisma/client";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error: any) {
        console.warn("Error: Failed to fetch bookings", error.message);
      }
    };
    fetchBookings();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-16">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}