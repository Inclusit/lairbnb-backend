//src/app/api/users/me/bookings/route.tsx

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("userId");
        if (!userId) {
            throw new Error("Failed to retrieve userId from headers");
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId
            }
        });

        return NextResponse.json(bookings);

    } catch (error: any) {
        console.warn("Error: Failed to get bookings", error.message);

        return NextResponse.json({ message: "Failed to get bookings" }, { status: 500 });
    }
}