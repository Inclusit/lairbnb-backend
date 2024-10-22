//!property GET, PUT, DELETE

import { NextRequest, NextResponse } from "next/server";
import propertyValidator from "@/utils/validators/propertyValidator";
import { PrismaClient, Property } from "@prisma/client";


const prisma =  new PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
    const id = options.params.id;

    try {
    const property: Property | null = await prisma.property.findUnique({
        where: {id},
        include: {
            owner: true
        }
    });

    if (!property){
        return NextResponse.json({
            message: "Property not found"
        },
            {
                status: 404
            }
        )
    };

    return NextResponse.json(property)

    } catch (error:any) {
        console.warn("error fetching property", error.message);
        return NextResponse.json({
            message: "An error occurred while fetching the property"
        },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest, options: APIOptions){
    const id = options.params.id
    let body: Property | null = null;

    try {

        body = await request.json();

        if (!body) {
            throw new Error()
        }

        //run the property through the validator
        const [hasErrors, errors] = propertyValidator(body);

        //if there are errors, return them to the user
        if (hasErrors) {
            return NextResponse.json(errors, {status: 400});
        }

    } catch (error: any) {
        console.warn("error updating property", error)

        return NextResponse.json({
            message: "Property not found"
        },
            { status: 404 }
        )
    }

    try {

        const updatedProperty = await prisma.property.update({
            where: {id},
            data: {
                name: body.name,
                description: body.description,
                location: body.location,
                pricePerNight: body.pricePerNight
            }
        });


    } catch (error: any) {
        return NextResponse.json({
            message: "Property not found"
        },
            { status: 404 }
        )
    }
    
    /* if (hasErrors) {
        return NextResponse.json(errors, {status: 400});
    }

    try {
    const updatedProperty = await prisma.property.update({
        where: {id},
        data: body
    });
    return NextResponse.json(updatedProperty);
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred while updating the property"
        },
            { status: 500 }
        )
    } */

    };





export async function DELETE(request:NextRequest, options: APIOptions){
    const id = options.params.id;
    
    try {

        await prisma.property.delete({
            where: {id}
        });

        return NextResponse.json(null, { status: 204 })

    } catch (error: any) {
    console.warn("error deleting property", error.message);
    return NextResponse.json(
      {
        message: "Property not found",
      },
      { status: 404 }
    );
  }


    /* await prisma.property.delete({
        where: {id}
    });

    return new Response(null, { status: 404 }) */
}