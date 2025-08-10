import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

//METODO PARA OBTENER TODAS LAS AUTORIDADES

export const GET = async () => {
  try {
    const authority = await prisma.authority.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (authority.length === 0) {
      return NextResponse.json({ authority: [] }, { status: 200 });
    }

    return NextResponse.json({ authority }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      {
        error: "Error al obtener las autoridades",
      },
      { status: 500 }
    );
  }
};

//METODO PARA CREAR UNA AUTORIDAD

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const image = data.get("imageUrl");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "La imagen es requerida y debe ser un archivo válido" },
        { status: 400 }
      );
    }

    const filePath = await processImage(image);
    const resCloudinary = await cloudinary.uploader.upload(filePath);

    if (resCloudinary) {
      await unlink(filePath);
    }

    const newAuthority = await prisma.authority.create({
      data: {
        rol: String(data.get("rol")),
        name: String(data.get("name")),
        lastName: String(data.get("lastName")),
        message: String(data.get("message")),
        imageUrl: resCloudinary.secure_url,
      },
    });

    return NextResponse.json(newAuthority, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al crear la autoridad" },
      { status: 500 }
    );
  }
};
