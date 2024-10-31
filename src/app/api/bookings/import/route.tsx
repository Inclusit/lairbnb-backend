import { BookingData } from "@/types/booking";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try{

        //get bookings from request body as an array of BookingData objects and import them into the database
        const importedBookings: BookingData[] = await request.json();

        //import bookings into the database using the Prisma client to interact with the database
        const storedBookings = await prisma.booking.findMany();

        //filter out any bookings that already exist in the database to avoid duplicates and only import new bookings
        const uniqueBookings = importedBookings.filter((booking) => {
            return storedBookings.every(
                (newBooking) => newBooking.firstName !== booking.firstName && newBooking.lastName !== booking.lastName
            );
        });

        //if there are no new bookings to import, return a response to the user indicating that no bookings were imported 
        //and exit the function
        if (uniqueBookings.length === 0) {
            return NextResponse.json({
                count: 0,
            }
            )
        };

        //import the new bookings into the database using the Prisma client to interact with the database 
        //and return a response to the user indicating that the bookings were successfully imported
        const response = await prisma.booking.createMany({
            data: uniqueBookings.map((booking) => {
                return {
                    firstName: booking.firstName,
                    lastName: booking.lastName,
                    checkInDate: new Date(booking.checkInDate),
                    checkOutDate: new Date(booking.checkOutDate),
                    totalPrice: booking.totalPrice,
                    propertyId: booking.propertyId,
                    userId: booking.userId
                }
            })
        });


        return NextResponse.json(response);



    } catch(error: any){
        console.warn("error importing bookings", error.message);
        return NextResponse.json({
            message: "An error occurred while importing bookings"
        },
            { status: 400 }
        )
    }
}