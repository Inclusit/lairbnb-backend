import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    try {
        // Get the userId from the request headers
        const userId = request.headers.get("userId");
        if(!userId){
            throw new Error("Failed to retrieve userId from headers");
        }

        // Find the user in the database using the userId from the headers 
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        });

        // Remove the password from the user object before returning it to the client 
        const safeUser = {
            ...user,
            password: undefined
        };

        return NextResponse.json(safeUser);

    }catch (error:any) {
        console.warn("Error: Failed to get user from request", error.message);
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    }
}