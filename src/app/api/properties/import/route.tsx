import { PropertyData } from "@/types/property";
import { PrismaClient } from "@prisma/client";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try{

        //get properties from request body as an array of PropertyData objects and import them into the database
        const importedProperties: PropertyData[] = await request.json();

        //import properties into the database using the Prisma client to interact with the database
        const storedProperties = await prisma.property.findMany();

        //filter out any properties that already exist in the database to avoid duplicates and only import new properties
        const uniqueProperties = importedProperties.filter((property) => {
            return storedProperties.every(
                (newProperty) => newProperty.name !== property.name && newProperty.ownerId !== property.ownerId
            );
        });

        //if there are no new properties to import, return a response to the user indicating that no properties were imported 
        //and exit the function
        if (uniqueProperties.length === 0) {
            return NextResponse.json({
                count: 0,
            }
            )
        };

        //import the new properties into the database using the Prisma client to interact with the database 
        //and return a response to the user indicating that the properties were successfully imported
        const response = await prisma.property.createMany({
            data: uniqueProperties.map((property) => {
                return {
                    name: property.name,
                    description: property.description,
                    location: property.location,
                    pricePerNight: property.pricePerNight,
                    ownerId: property.ownerId
                }
            })    
        });


        return NextResponse.json(response);



    } catch(error: any){
        console.warn("error importing properties", error.message);
        return NextResponse.json({
            message: "An error occurred while importing properties"
        },
            { status: 400 }
        )
    }
}