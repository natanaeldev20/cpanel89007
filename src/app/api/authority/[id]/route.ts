import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { unlink } from "fs/promises";
import { processImage } from "@/libs/processImage";
import cloudinary from "@/libs/cloudinary";

//METODO PARA ACTUALIZAR UNA AUTORIDAD

export interface UpdateAuthorityData {
  rol?: string;
  name?: string;
  lastName?: string;
  message?: string;
  imageUrl?: string;
}

export const PUT = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  const authorityId = parseInt(id);

  try {
    const data = await req.formData();
    const image = data.get("imageUrl");

    const rol = data.get("rol")?.toString();
    const name = data.get("name")?.toString();
    const lastName = data.get("lastName")?.toString();
    const message = data.get("message")?.toString();

    if (!rol || !name || !lastName || !message) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    const update: UpdateAuthorityData = {
      rol,
      name,
      lastName,
      message,
    };

    if (image && image instanceof File) {
      const filePath = await processImage(image);
      const resCloudinary = await cloudinary.uploader.upload(filePath);

      if (resCloudinary) {
        await unlink(filePath);
        update.imageUrl = resCloudinary.secure_url;
      }
    }

    const updateAuthority = await prisma.authority.update({
      where: { id: authorityId },
      data: update,
    });

    return NextResponse.json(updateAuthority, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al actualizar autoridad" },
      { status: 500 }
    );
  }
};

//METODO PARA ELIMINAR UNA AUTORIDAD

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  const authorityId = parseInt(id);

  try {
    const deleteAuthority = await prisma.authority.delete({
      where: { id: authorityId },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al eliminar autoridad" },
      { status: 500 }
    );
  }
};
