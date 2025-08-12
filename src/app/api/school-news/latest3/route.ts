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
      return new NextResponse(
        JSON.stringify({ error: "No hay noticias para mostrar" }),
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify({ news }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return new NextResponse(
      JSON.stringify({ error: "Error al cargar noticias" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
};

// Manejo de preflight CORS
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};
