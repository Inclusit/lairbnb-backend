import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const isAdmin = request.headers.get("isAdmin");

    if (isAdmin) {
        const users = await prisma.user.findMany();
         return NextResponse.json(users);

    } else {
        return { error: "Unauthorized" };
    }
}

export async function POST(request: NextRequest) {
    const userId: string = request.headers.get("userId") || "";
    try {
        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                isAdmin: true
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.warn("Error: Failed to update user", error.message);
        return NextResponse.json({ message: "An error occurred while updating user" }, { status: 500 });
    }
}