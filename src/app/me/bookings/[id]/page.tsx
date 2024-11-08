"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user";
import { Booking } from "@prisma/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingCalendar from "@/components/BookingCalendar";
import { DateRange } from "react-day-picker";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function UpdateBooking() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSelectedDates, setUpdateSelectedDates] = useState<DateRange | undefined>();
  const { user, token } = useUser();
  const router = useRouter();
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm<Booking>();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch booking");
        }
        const data: Booking = await response.json();
        setBooking(data);
        setUpdateSelectedDates({
          from: new Date(data.checkInDate),
          to: new Date(data.checkOutDate),
        });
        setValue("totalPrice", data.totalPrice);
      } catch (error: any) {
        console.warn("Error: Failed to fetch booking", error.message);
      }
    };

    fetchBooking();
  }, [user, id, router, token, setValue]);

  const onSubmit = async (data: Booking) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          checkInDate: updateSelectedDates?.from,
          checkOutDate: updateSelectedDates?.to,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update booking");
      }
      router.push("/me/bookings");
    } catch (error: any) {
      console.warn("Error: Failed to update booking", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!booking) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Update Booking</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BookingCalendar
          bookedDates={[]} 
          propertyId={booking.propertyId}
          defaultDates={updateSelectedDates}
          onBooking={setUpdateSelectedDates}

            
        />
        <div className="mb-4">
          <label
            htmlFor="totalPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Total Price
          </label>
          <input
            id="totalPrice"
            type="number"
            step="0.01"
            {...register("totalPrice")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
}
