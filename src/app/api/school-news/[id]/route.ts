import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";
import { UpdateNewsData } from "@/app/admin/school-news/types/newsType";

//METODO PARA OBTENER UNA NOTICIA

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const newsId = parseInt(params.id);

  try {
    const news = await prisma.news.findUnique({
      where: { id: newsId },
    });

    if (!news) {
      return NextResponse.json(
        { error: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al obtener evento" },
      { status: 500 }
    );
  }
};

//METODO PARA ACTUALIZAR UNA NOTICIA

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const newsId = parseInt(params.id);

  try {
    const data = await req.formData();
    const image = data.get("imageUrl");

    const title = data.get("title")?.toString();
    const content = data.get("content")?.toString();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const update: UpdateNewsData = {
      title,
      content,
    };

    if (image && image instanceof File) {
      const filePath = await processImage(image);
      const resCloudinary = await cloudinary.uploader.upload(filePath);

      if (resCloudinary) {
        await unlink(filePath);
        update.imageUrl = resCloudinary.secure_url;
      }
    }

    const updateNews = await prisma.news.update({
      where: { id: newsId },
      data: update,
    });

    return NextResponse.json(updateNews);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al actualizar noticia" },
      { status: 500 }
    );
  }
};

//METODO PARA ELIMINAR UNA NOTICIA

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const newsId = parseInt(params.id);

  try {
    const deleteNews = await prisma.news.delete({
      where: { id: newsId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al eliminar noticia" },
      { status: 500 }
    );
  }
};
