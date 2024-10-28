//!BOOKING GET, PUT, DELETE
//src/app/api/bookings/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bookingValidator from "@/utils/validators/bookingValidator";
import bookingUpdateValidator from "@/utils/validators/bookingUpdateValidator";
import { BookingData, BookingUpdateData } from "@/types/booking";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
    const id = options.params.id;

    // Fetch the booking with the property included in the response object 
    try {
    const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
            property: true
        }
    });

    if (!booking) {
        return NextResponse.json({
            message: "Booking not found"
        },
            {
                status: 404
            }
        )
    };

    return NextResponse.json(booking)

    } catch (error: any) {
        console.warn("error fetching booking", error.message);
        return NextResponse.json({
            message: "Booking not found"
        },
            { status: 404 }
        )
    }
};

//!BEHÖVER UPPDATERAS, ERROR 400 VID UPPDATERING AV BOKNING ('Total price must be a positive number')
export async function PUT(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    let body: BookingUpdateData | null = null;
    
    try {
        // Get the booking data from the request body and run it through the validator 
        body = await request.json();

        // If the body is empty, throw an error 
        if (!body) {
            throw new Error()
        }

        const [hasErrors, errors] = bookingUpdateValidator(body);

        if (hasErrors) {
            console.warn("error updating booking", errors);
          return NextResponse.json(errors, { status: 400 });
          
        }

       
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred while updating the booking"
        },
            { status: 500 }
        )
    }

    try {

        const existingBooking = await prisma.booking.findUnique({
            where: { id }, 
            include: { property: true }
        });

        if (!existingBooking || !existingBooking.property) {
            return NextResponse.json({
                message: "Booking not found"
            },
                { status: 404 }
            )
        }

        // calculate new totalprice with new dates
        const checkInDate = new Date(body.checkInDate); 
        const checkOutDate = new Date(body.checkOutDate);
        const numberOfNights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

        const totalPrice = numberOfNights * existingBooking.property.pricePerNight;

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                checkInDate: new Date(body.checkInDate),
                checkOutDate: new Date(body.checkOutDate),
                totalPrice: totalPrice
            }
        });

        return NextResponse.json(updatedBooking);

    } catch (error:any) {
        console.error ("error updating booking", error.message);
        return NextResponse.json({
            message: "Booking not found"
        },
            { status: 404 })
    }
};

export async function DELETE(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    
    try {

        await prisma.booking.delete({
            where: { id }
        });

        // Return a 204 status code if the booking was successfully deleted
        return NextResponse.json(null, { status: 204 })

    }catch(error:any){
        console.error("error deleting booking", error.message);
        return NextResponse.json({
            message: "Booking not found"
        },
            { status: 404 }
        )
    }
}
