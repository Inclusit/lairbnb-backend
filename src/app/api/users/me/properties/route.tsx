import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request:NextRequest){
    try {
        const userId = request.headers.get("userId");
        if(!userId){
            throw new Error("Failed to retrieve userId from headers");
        }

        const properties = await prisma.property.findMany({
            where: {
                ownerId: userId
            },
        });

        return NextResponse.json(properties);
        
    } catch (error:any) {
        console.warn("Error: Failed to get properties", error.message);
        return { error: "Failed to get properties" };
    }
}
