//!property GET, PUT, DELETE

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import propertyValidator from "@/utils/validators/propertyValidator";


const prisma = PrismaClient();

export async function GET(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    const property = await prisma.property.findUnique({
        where: { id }
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
};

export async function PUT(request: NextRequest, options: APIOptions){
    const id = options.params.id
    const body = await request.json();
    const [hasErrors, errors] = propertyValidator(body);
    
    if (hasErrors) {
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
    }
};

export async function DELETE(request:NextRequest, options: APIOptions){
    const id = options.params.id;
    await prisma.property.delete({
        where: {id}
    });

    return new Response(null, { status: 404 })
}