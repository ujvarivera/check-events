import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "../../validationSchemas";
// import { v4 } from "uuid";
import bcrypt from 'bcrypt';
import prisma from "../../../prisma/client";

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const validation = createUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
      })
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 }); 
    }

    const { name, email, username, password, confirmPassword } = validation.data;

    // Check if passwords match
    if (password !== confirmPassword) {
        return NextResponse.json({ message: "Passwords don't match" }, { status: 400 }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // const id = v4()

    try {
        const newUser = await prisma.user.create({
            data: {
              name: name,
              email: email,
              username: username,
              password: hashedPassword,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message:"Registration failed" }, { status: 500 }); // TODO: if username or email already exists, this error shows 
    }
}