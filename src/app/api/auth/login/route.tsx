//src/app/api/auth/login/route.ts

import { UserLoginData } from "@/types/user";
import { comparePasswords } from "@/utils/bcrypt";
import { signJWT } from "@/utils/jwt";
import { userLoginValidator } from "@/utils/validators/userValidator";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try {
        //get user data from request body and run it through the validator
        const body: UserLoginData = await request.json();
        const [hasErrors, errors] = userLoginValidator(body);

        if (hasErrors) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        //Check if user exists
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: body.email.toLowerCase()
            }
        });

        //Check if password is correct
        const validPassword = await comparePasswords(body.password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        //Sign JWT token and return it to the user for authentication
        const token = await signJWT({
            userId: user.id,
        });

        //Return token to user for authentication purposes
        return NextResponse.json({
            token: token,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}