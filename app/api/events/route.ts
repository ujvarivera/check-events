import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
// import prisma from '@/prisma/client'
import prisma from "../../../prisma/client";

// validation
const createEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(191),
    description: z.string().min(1, 'Description is required')
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createEventSchema.safeParse(body);

    if (!validation.success) {
        // return NextResponse.json(validation.error.issues, { status: 400 });
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newEvent = await prisma.event.create({
        data: {
          title: body.title,
          description: body.description,
        },
    });
    
    return NextResponse.json(newEvent, { status: 201 });
}