//!BOOKING GET, PUT, DELETE
//src/app/api/bookings/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bookingValidator from "@/utils/validators/bookingValidator";
import { BookingData } from "@/types/booking";

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

export async function PUT(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    let body: BookingData | null = null;
    
    try {
        // Get the booking data from the request body and run it through the validator 
        body = await request.json();

        // If the body is empty, throw an error 
        if (!body) {
            throw new Error()
        }

        const [hasErrors, errors] = bookingValidator(body);

        if (hasErrors) {
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

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                checkInDate: new Date(body.checkInDate),
                checkOutDate: new Date(body.checkOutDate),
                totalPrice: body.totalPrice,
                propertyId: body.propertyId,
                userId: body.userId,
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
