import { NextRequest, NextResponse } from "next/server";
import { loginUserSchema } from "../../validationSchemas";
import prisma from "../../../prisma/client";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const validation = loginUserSchema.safeParse({
        // email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 }); 
    }

    const { username, password } = validation.data;

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    })

    if (!user) {
        return NextResponse.json({ message: "Incorrect username or password" }, { status: 400 }); 
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return NextResponse.json({ message: "Incorrect username or password" }, { status: 400 }); 
    }

    cookies().set({
        name: 'username',
        value: username,
        httpOnly: true,
        maxAge: 60*60 // 1 hour
      })

    return NextResponse.json({ message: "Logged in" }, { status: 201 });
}