import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export const GET = async () => {
  try {
    const events = await prisma.event.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json({ events }, { status: 200 });

    // Agregar CORS
    response.headers.set("Access-Control-Allow-Origin", "*"); // Permitir desde cualquier dominio
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al cargar los eventos" },
      { status: 500 }
    );
  }
};

// Manejo de preflight (OPTIONS) para CORS
export const OPTIONS = async () => {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

// import { NextResponse } from "next/server";
// import prisma from "@/libs/db";

// export const GET = async () => {
//   try {
//     const events = await prisma.event.findMany({
//       take: 10,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (events.length === 0) {
//       return NextResponse.json({ events: [] }, { status: 200 });
//     }

//     return NextResponse.json({ events }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al cargar los eventos" },
//       { status: 500 }
//     );
//   }
// };
