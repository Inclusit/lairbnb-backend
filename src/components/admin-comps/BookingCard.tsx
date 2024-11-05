import { Booking, Property } from "@prisma/client";
import BookingModal from "./BookingModal";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import propertyValidator from "@/utils/validators/propertyValidator";

type BookingCardProps = {
    booking: Booking 
};

export default function BookingCard({ booking }: BookingCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                    src={/* property.imageUrl || */ `https://picsum.photos/400/300?random=${property.id}`} 
                    className="w-full h-32 object-cover"
                />
                <CardContent className="p-4">
                    <h2 className="font-semibold text-xl mb-2">{booking.id}</h2>
                    <p className="text-gray-600 mb-4">
                        {booking.propertyId}
                        {booking.firstName} {booking.lastName}
                    </p>
                    <Button onClick={() => setOpen(true)}>Visa mer</Button>
                </CardContent>
                <BookingModal booking={booking} open={open} onClose={() => setOpen(false)} />
            </Card>
        </>
    );
}