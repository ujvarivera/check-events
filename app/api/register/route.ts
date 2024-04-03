import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "../../validationSchemas";
// import { v4 } from "uuid";
import bcrypt from 'bcrypt';
import prisma from "../../../prisma/client";
import { cookies } from 'next/headers'

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

    // generate hashed password for new user
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    // const id = v4()

    // check if username or email is already in use
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    });

    if (user) {
        return NextResponse.json({ message: "Email or Username is already in use" }, { status: 400 }); 
    }

    // create new user
    try {
        const newUser = await prisma.user.create({
            data: {
              name: name,
              email: email,
              username: username,
              password: hashedPassword,
            },
        });

        cookies().set({
            name: 'username',
            value: username,
            // httpOnly: true,
            maxAge: 60*60 // 1 hour
          })

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message:"Registration failed" }, { status: 500 });
    }
}