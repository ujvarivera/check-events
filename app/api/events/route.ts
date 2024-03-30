import { NextRequest, NextResponse } from "next/server";
// import prisma from '@/prisma/client'
import prisma from "../../../prisma/client";
import { createEventSchema } from "../../validationSchemas";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
    const events = await prisma.event.findMany()

    return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
    /*
    const formDataObject: Record<string, string> = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value as string;
    }

    const validation = createEventSchema.safeParse(formDataObject); // TODO: image validation doesn't work

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 }); 
    }
    */

    const formData = await request.formData()

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ message: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer()); // TODO: TypeError if file is not a file type
    const filename =  file.name.replaceAll(" ", "_");

    // return NextResponse.json("OK, file name: " + filename);
    const imagePath = path.join(process.cwd(), "public/events/" + filename); // TODO: fix error if no such file or directory
    
    try {
        await writeFile(
          imagePath,
          buffer
        );
        // return NextResponse.json({ message: "Success", status: 201 });
      } catch (error) {
        // console.log("Error occured ", error);
        return NextResponse.json({ message: "File uploading failed", status: 500 });
      }

      try {
        const newEvent = await prisma.event.create({
            data: {
              title: formData.get("title"),
              description: formData.get("description"),
              image: imagePath
            },
        });

        return NextResponse.json(newEvent, { status: 201 });

      } catch (error) {
        return NextResponse.json({ message:"Adding the event failed"}, { status: 500 });
      }   
}