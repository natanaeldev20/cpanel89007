import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export const GET = async () => {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al cargar eventos" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const image = data.get("imageUrl");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { message: "La imagen es requerida y debe ser un archivo válido" },
        { status: 400 }
      );
    }

    const filePath = await processImage(image);
    const resCloudinary = await cloudinary.uploader.upload(filePath);

    if (resCloudinary) {
      await unlink(filePath);
    }

    const newEvent = await prisma.event.create({
      data: {
        title: String(data.get("title")),
        description: String(data.get("description")),
        location: String(data.get("location")),
        startDate: String(data.get("startDate")),
        endDate: String(data.get("endDate")),
        imageUrl: resCloudinary.secure_url,
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear evento" },
      { status: 500 }
    );
  }
};
