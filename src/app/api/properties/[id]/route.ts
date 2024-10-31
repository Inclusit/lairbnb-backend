//!property GET, PUT, DELETE
//src/app/api/properties/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import propertyValidator from "@/utils/validators/propertyValidator";
import { PrismaClient, Property } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
  const id = options.params.id;

  try {
    const property: Property | null = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(property);
  } catch (error: any) {
    console.warn("error fetching property", error.message);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the property",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const userId = request.headers.get("userId");

  try {
    const property: Property | null = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
        },
        {
          status: 404,
        }
      );
    }

    // Kontrollera att användaren är ägaren till fastigheten
    if (property.ownerId !== userId) {
      return NextResponse.json(
        {
          message: "You are not authorized to update this property",
        },
        {
          status: 403,
        }
      );
    }

    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Kör validering för egenskapen (property)
    const [hasErrors, errors] = propertyValidator(body);

    if (hasErrors) {
      return NextResponse.json(errors, { status: 400 });
    }

    // Försök att uppdatera fastigheten i databasen
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        location: body.location,
        pricePerNight: body.pricePerNight,
      },
    });

    // Returnera uppdaterad fastighet
    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error: any) {
    console.error("Error updating property:", error);

    // Kontrollera om felet är att fastigheten inte hittades
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    // Generiskt felmeddelande
    return NextResponse.json(
      { message: "An error occurred while updating the property" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, options: APIOptions) {
  const id = options.params.id;
  const userId = request.headers.get("userId");

  try {

    const property: Property | null = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
        },
        {
          status: 404,
        }
      );
    }

    if (property.ownerId !== userId) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this property",
        },
        {
          status: 403,
        }
      );
    }

    await prisma.booking.deleteMany({
      where: { propertyId: id }
    })

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.warn("error deleting property", error.message);
    return NextResponse.json(
      {
        message: "Property not found",
      },
      { status: 404 }
    );
  }
}
