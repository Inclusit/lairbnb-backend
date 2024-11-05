//!PROPERTIES GET AND POST
//src/app/api/properties/route.ts

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Property } from "@prisma/client";
import { PropertyRegistrationData } from "@/types/property";
import propertyValidator from "@/utils/validators/propertyValidator";
import { getQueries } from "../../../../helpers/apiHelpers";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const [q, name, location, description, _orderBy] = getQueries(request.url, [
    "q",
    "name",
    "location",
    "description",
    "_orderBy",
  ]);

  let orderBy: { [key: string]: any } = {};
  let where: { [key: string]: any } = {};

  if (q) {
    where.name = {
      contains: q,
      mode: "insensitive",
    };
  }

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (location) {
    (where.location = {
      contains: location,
      mode: "insensitive",
    }),
      (where.location = {
        has: location,
      });
  }

  if (description) {
    where.description = {
      contains: description,
      mode: "insensitive",
    };
  }

  if (_orderBy) {
    orderBy.location = _orderBy;
  }

  const properties = await prisma.property.findMany({
    where,
    orderBy,
  });
  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const userId: string = request.headers.get("userId") || "";
  try {
    const body = await request.json();
    const [hasErrors, errors] = propertyValidator(body);

    if (hasErrors) {
      return NextResponse.json(errors, { status: 400 });
    }

    const property: PropertyRegistrationData = await prisma.property.create({
      data: {
        name: body.name,
        description: body.description,
        location: body.location,
        pricePerNight: body.pricePerNight,
        ownerId: userId,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    console.warn("error creating property", error);
    return NextResponse.json(
      { error: "An error occurred while creating the property" },
      { status: 500 }
    );
  }
}
