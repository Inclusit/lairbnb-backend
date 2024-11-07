//!BOOKINGS GET AND POST

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bookingValidator from "@/utils/validators/bookingValidator";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: any) {
  const propertyId: string = context.params.id as string;
  const bookings = await prisma.booking.findMany({
    where: {
      propertyId,
    },
  });
  return NextResponse.json(bookings);
}
