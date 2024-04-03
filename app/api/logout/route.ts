import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    cookies().delete('username')

    return NextResponse.json({ message: "Successfully logged out" }, { status: 201 });
}