//!BOOKINGS GET AND POST
//src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bookingValidator from "@/utils/validators/bookingValidator";
import { BookingData } from "@/types/booking";
import { differenceInDays } from "date-fns";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const bookings = await prisma.booking.findMany();
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const userId: string = request.headers.get("userId") || "";

  try {

    //fetch the body of the request and assign it to the variable body 
    const body = await request.json();
    //assign the userId to the body object 
    body.userId = userId;

    //fetch the property from the database using the propertyId from the body object
    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // If totalPrice is missing or invalid, calculate it based on check-in/out dates and price per night
    if (!body.totalPrice || body.totalPrice <= 0) {
      body.totalPrice = calculateTotalPrice(
        body.checkInDate,
        body.checkOutDate,
        property.pricePerNight
      );
    }
    const [hasErrors, errors] = bookingValidator(body);

    if (hasErrors) {
      return NextResponse.json(errors, { status: 400 });
    }

    // Create a new booking in the database and return it 
    const newBooking = await prisma.booking.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        checkInDate: new Date(body.checkInDate),
        checkOutDate: new Date(body.checkOutDate),
        totalPrice: body.totalPrice, // Använd beräknad totalPrice
        propertyId: body.propertyId, // Koppla till fastighet
        userId: userId, // Koppla till användare
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the booking" },
      { status: 500 }
    );
  }
}

// calculate the total price of the booking based on the check-in/out dates and price per night
function calculateTotalPrice(
  checkInDate: string,
  checkOutDate: string,
  pricePerNight: number
): number {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const nights =
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);

  // If the number of nights is invalid, return 0
  if (nights <= 0 || pricePerNight <= 0) {
    return 0;
  }

  return nights * pricePerNight;
}
