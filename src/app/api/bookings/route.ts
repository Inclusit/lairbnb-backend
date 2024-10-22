//!BOOKINGS GET AND POST
//src/app/pages/api/bookings/route.ts

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
  try {
    const body: BookingData = await request.json();
    const [hasErrors, errors] = bookingValidator(body);

    if (hasErrors) {
      return NextResponse.json(errors, { status: 400 });
    }

    //fetch the property to calculate the total price
    const property = await prisma.property.findUnique({
      where: {
        id: body.propertyId,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    //Calculate the total price
    const nights = differenceInDays(
      new Date(body.checkOutDate),
      new Date(body.checkInDate)
    );

    //Check if the check-out date is after the check-in date
    if (nights <= 0) {
      return NextResponse.json(
        {
          message: "Check-out date must be after check-in date",
        },
        { status: 400 }
      );
    }

    //Calculate the total price
    const totalPrice = nights * property.pricePerNight;

    const newBooking = await prisma.booking.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        checkInDate: new Date(body.checkInDate), // convert the string to a Date object
        checkOutDate: new Date(body.checkOutDate),
        totalPrice: totalPrice, // calculated total price based on the number of nights and the price per night of the property
        propertyId: body.propertyId,
        userId: body.userId,
      },
    });

    return NextResponse.json(newBooking);
  } catch (error: any) {
    console.warn("error creating booking", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while creating the booking",
      },
      { status: 400 }
    );
  }
}
