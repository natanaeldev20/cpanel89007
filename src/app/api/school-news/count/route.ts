import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA OBTENER NUMERO DE NOTICIAS

export const GET = async () => {
  try {
    const numberNews = await prisma.news.count();
    return NextResponse.json({ count: numberNews });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al cargar el numero de noticias" },
      { status: 500 }
    );
  }
};
