import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

//METODO PARA OBTENER TODAS LAS NOTICIAS

export const GET = async () => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });

    if (news.length === 0) {
      return NextResponse.json({ news: [] }, { status: 200 });
    }

    return NextResponse.json({ news });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      {
        error: "Error al obtener las noticias",
      },
      { status: 500 }
    );
  }
};

//METODO PARA CREAR UNA NOTICIA

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

    const newNews = await prisma.news.create({
      data: {
        title: String(data.get("title")),
        content: String(data.get("content")),
        imageUrl: resCloudinary.secure_url,
      },
    });

    return NextResponse.json(newNews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear noticia" },
      { status: 500 }
    );
  }
};
