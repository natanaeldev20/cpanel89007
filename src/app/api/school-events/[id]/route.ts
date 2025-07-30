import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";
import { unlink } from "fs/promises";

interface EventUpdate {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const eventId = parseInt(params.id);

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener evento" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const eventId = parseInt(params.id);

  try {
    const data = await req.formData();
    const image = data.get("imageURL");

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const location = data.get("location")?.toString();
    const startDate = data.get("startDate")?.toString();
    const endDate = data.get("endDate")?.toString();

    if (!title || !description || !location || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const update: EventUpdate = {
      title,
      description,
      location,
      startDate,
      endDate,
    };

    if (image && image instanceof File) {
      const filePath = await processImage(image);
      const resCloudinary = await cloudinary.uploader.upload(filePath);

      if (resCloudinary) {
        await unlink(filePath);
        update.imageUrl = resCloudinary.secure_url;
      }
    }

    const updateEvent = await prisma.event.update({
      where: { id: eventId },
      data: update,
    });

    return NextResponse.json(updateEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar evento" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const eventId = parseInt(params.id);

  try {
    const deleteEvent = await prisma.event.delete({
      where: { id: eventId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar evento" },
      { status: 500 }
    );
  }
};
