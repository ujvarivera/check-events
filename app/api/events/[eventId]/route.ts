import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: NextRequest, {params: {eventId}}) {
    const event = await prisma.event.findUnique({
        where: {
            id: parseInt(eventId)
        }
    })

    return NextResponse.json(event);
}

export async function PUT(request: NextRequest, {params: {eventId}}) {
    
}

export async function DELETE(request: NextRequest, {params: {eventId}}) {
    
}