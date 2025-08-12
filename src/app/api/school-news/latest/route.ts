import { NextResponse } from "next/server";
import prisma from "@/libs/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // o tu dominio específico
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async () => {
  try {
    const news = await prisma.news.findMany({
      take: 10,
      orderBy: {
        publishedAt: "desc",
      },
    });

    if (news.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No hay noticias para mostrar" }),
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return new NextResponse(JSON.stringify({ news }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return new NextResponse(
      JSON.stringify({ error: "Error al cargar noticias" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
};

// Manejo de preflight CORS
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
};

// import { NextResponse } from "next/server";
// import prisma from "@/libs/db";

// export const GET = async () => {
//   try {
//     const news = await prisma.news.findMany({
//       take: 10,
//       orderBy: {
//         publishedAt: "desc",
//       },
//     });

//     if (news.length === 0) {
//       return NextResponse.json(
//         { error: "No hay noticias para mostrar" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ news }, { status: 200 });
//   } catch (error) {
//     if (process.env.NODE_ENV === "development") {
//       console.error(error);
//     }
//     return NextResponse.json(
//       { error: "Error al cargar noticias" },
//       { status: 500 }
//     );
//   }
// };
