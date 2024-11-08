import { Booking, Property } from "@prisma/client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { BookingWithProperty } from "@/types/booking";

type BookingCardProps = {
    booking: BookingWithProperty;
};

export default function BookingCard({ booking }: BookingCardProps) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={
              /* property.imageUrl || */ `https://picsum.photos/400/300?random=${booking.propertyId}`
            }
            className="w-full h-32 object-cover"
          />
          <CardContent className="p-4">
            <h2 className="font-semibold text-xl mb-2">
              {booking.property.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {booking.firstName} {booking.lastName}
            </p>
            
                <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">
                        {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                    </span>
                    </div>
                    
            <div className="flex justify-end mt-4">
              <span className="text-lg font-bold text-gray-800">
                Totalt pris: {booking.totalPrice} kr
              </span>
            </div>
          </CardContent>
        </Card>
      </>
    );
}