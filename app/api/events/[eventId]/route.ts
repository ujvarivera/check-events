import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: NextRequest, {params: {eventId}}) {
    const event = await prisma.event.findUnique({
        where: {
            id: parseInt(eventId)
        }
    })

    if (!event) {
        return NextResponse.json({message: "Event not found"}, {status: 404})
    }

    return NextResponse.json(event);
}

export async function PUT(request: NextRequest, {params: {eventId}}) {
    const body = await request.json();

    try {
        const updatedEvent = await prisma.event.update({
            where: {
                id: parseInt(eventId)
            },
            data: {
                title: body.title,
                description: body.description,
            }
        })        
        return NextResponse.json(updatedEvent);

    } catch (error) {
        return NextResponse.json({message: "Event not found"});
    }
}

export async function DELETE(request: NextRequest, {params: {eventId}}) {
    try {
        const deletedEvent = await prisma.event.delete({
            where: {
                id: parseInt(eventId)
            },
        })
        return NextResponse.json(deletedEvent);
        
    } catch (error) {
        return NextResponse.json({message: "Event not found"});
    }
}