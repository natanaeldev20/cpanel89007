import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export const GET = async () => {
  try {
    const news = await prisma.news.findMany({
      take: 3,
      orderBy: {
        publishedAt: "desc",
      },
    });

    if (news.length === 0) {
      return NextResponse.json(
        { error: "No hay noticias para mostrar" },
        { status: 404 }
      );
    }

    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al cargar noticias" },
      { status: 500 }
    );
  }
};
