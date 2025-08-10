import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

//METODO PARA OBTENER TODOS LOS EVENTOS

export const GET = async () => {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("Error al obtener los usuarios", error);
    }
    return NextResponse.json(
      {
        success: false,
        message: "Error al cargar eventos",
        error: "DatabaseConnectionError",
      },
      { status: 500 }
    );
  }
};

//METODO PARA CREAR UN EVENTO

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

    // Validación y conversión de fechas
    const rawStartDate = data.get("startDate");
    const rawEndDate = data.get("endDate");

    if (typeof rawStartDate !== "string" || !rawStartDate.trim()) {
      return NextResponse.json(
        { error: "La fecha de inicio es inválida o está vacía." },
        { status: 400 }
      );
    }

    if (typeof rawEndDate !== "string" || !rawEndDate.trim()) {
      return NextResponse.json(
        { error: "La fecha de finalización es inválida o está vacía." },
        { status: 400 }
      );
    }

    const startDate = new Date(rawStartDate);
    const endDate = new Date(rawEndDate);

    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { message: "La fecha de inicio no es válida." },
        { status: 400 }
      );
    }

    if (isNaN(endDate.getTime())) {
      return NextResponse.json(
        { message: "La fecha de finalización no es válida." },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title: String(data.get("title")),
        description: String(data.get("description")),
        location: String(data.get("location")),
        startDate,
        endDate,
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
