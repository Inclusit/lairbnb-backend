import { Booking, Property } from "@prisma/client";
import { Dialog, DialogTitle, DialogContent, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { BookingData } from "@/types/booking";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import BookingCalendar from "../BookingCalendar";
import { DateRange } from "react-day-picker";
import ErrorPopup from "../ErrorPopup";

type PropertyModalProps = {
    property: Property & {bookings: BookingData[]};
    open: boolean;
    bookedDates: Date[];
    userId: string;
    onClose: () => void;
};

export default function PropertyModal({ property, open, onClose, bookedDates, userId }: PropertyModalProps) {
    const [errorPopup, seterrorPopup] = useState(false);

    const handleBooking = (dates: DateRange) => {
        if(!userId) {
            seterrorPopup(true);
            return;
        }

        if(!dates.from || !dates.to) {
            console.error('Vänligen välj ett datumintervall.');
            return;
        }

        const bookingData: BookingData = {
            property,
            user: { id: userId }, 
            checkInDate: dates.from,
            checkOutDate: dates.to,
        };

        console.log('Bokningsdata:', bookingData);
        onClose(); 
    };
  

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="flex items-center justify-center fixed bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 mx-auto my-auto">
                    <DialogTitle className="text-lg font-bold text-center">{property.name}</DialogTitle>
                    <div className="flex mt-2">
                        <DialogDescription className="flex-1 mr-4">
                            <p>{property.description}</p>
                        </DialogDescription>
                        <div className="flex-shrink-0">
                            <BookingCalendar 
                                bookedDates={bookedDates || []} 
                                propertyId={property.id} 
                                userId={userId} 
                                onBooking={handleBooking} 
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Button variant="secondary" onClick={onClose}>Stäng</Button>
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
