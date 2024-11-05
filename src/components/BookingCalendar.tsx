"use client";

import { useState } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { BookingData } from "@/types/booking";

type BookingCalendarProps = {
    bookedDates: Date[];
    propertyId: string;
    userId: string;
    onBooking: (dates: DateRange) => void;
};

export default function BookingCalendar({ bookedDates = [], propertyId, userId, onBooking }: BookingCalendarProps) {
    const [selectedDates, setSelectedDates] = useState<DateRange>();
    const [error, setError] = useState<string | null>(null);

    const handleBooking = async () => {
        if (!selectedDates?.from || !selectedDates?.to) {
            setError("Vänligen välj ett datumintervall.");
            return;
        }

        const bookingData: BookingData = {
            property: { id: propertyId },
            user: { id: userId },
            checkInDate: selectedDates.from,
            checkOutDate: selectedDates.to,
        };

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "userId": userId || "",
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                onBooking(selectedDates); // Anropa callback för bokning
            } else {
                console.error("Failed to book property:", response.statusText);
            }
        } catch (error:any) {
            console.error("Failed to book property:", error);
        }
    }



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

                        // Kontrollera att bookedDates är definierad och en array
                        const isBooked = bookedDates.some((date) => from < date && to > date);
                        if (isBooked) {
                            return; // Avbryt om datumen redan är bokade
                        }
                    }
                    setSelectedDates(range);
                }}
                fromDate={new Date()}
                disabled={bookedDates} // Se till att detta också fungerar som tänkt
            />
            <Button
                className="absolute bottom-4 right-4"
                onClick={() => {
                    if (selectedDates) {
                        onBooking(selectedDates); // Anropa callback för bokning
                    }
                }}
            >
                Boka
            </Button>
        </div>
    );
}