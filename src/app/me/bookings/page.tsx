"use client";
import { useEffect, useState } from "react";
import { Property, Booking } from "@prisma/client";
import BookingCard from "@/components/admin-comps/BookingCard";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { BookingWithProperty } from "@/types/booking";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function MyBookings() {
  const [bookings, setBookings] = useState<BookingWithProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading, token } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/login");
    }
    if (user) {
      fetchPropertiesAndBookings();
    }
  }, [user, userLoading, router]);

  const fetchPropertiesAndBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/me/properties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const properties: Property[] = await response.json();
      const allBookings: BookingWithProperty[] = [];

      for (const property of properties) {
        const bookingsResponse = await fetch(
          `${BASE_URL}/api/bookings/property/${property.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!bookingsResponse.ok) {
          throw new Error(
            `Failed to fetch bookings for property ${property.id}`
          );
        }
        const propertyBookings: BookingWithProperty[] =
          await bookingsResponse.json();
        allBookings.push(...propertyBookings);
      }

      setBookings(allBookings);
      setLoading(false);
    } catch (error: any) {
      console.warn(
        "Error: Failed to fetch properties and bookings",
        error.message
      );
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);

      
      router.refresh();
    } catch (error: any) {
      console.warn("Error: Failed to delete booking", error.message);
    }

    
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Mina bokningar</h2>
      {loading ? (
        <p>Hämtar bokningar...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-16">
          {bookings.map((booking) => (
            <div key={booking.id}>
              <BookingCard booking={booking} />
              {(user?.id === booking.userId || user?.isAdmin === true) && (
                <>
                  
                  <Button onClick={() => router.push(`/me/bookings/${booking.id}`)} 
                  className="bg-blue-500 text-white p-2 rounded-md">
                    Uppdatera bokning 
                    </Button>
                    <Button
                      onClick={() => deleteBooking(booking.id)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                        Avboka
                    </Button>
                </>
              )}
              
            </div>
          ))}
          {bookings.length === 0 && (
            <p className="text-center">No bookings found.</p>
          )}
        </div>
      )}
    </>
  );
}
