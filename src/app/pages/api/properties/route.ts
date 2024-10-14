//!PROPERTIES GET AND POST

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request:NextRequest) {
    const properties = await prisma.properties.findMany();
    return NextResponse.json(properties);
}

export async function POST(request:NextRequest) {
    const body = await request.json();
    const newProperty = await prisma.property.create({
        data: {
            name: body.name,
            description: body.description,
            location: body.location,
            pricePerNight: body.pricePerNight,
            availability: body.availability
        }
    });
    
    return NextResponse.json(newProperty);
}
