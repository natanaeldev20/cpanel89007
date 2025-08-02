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

    if (events.length === 0) {
      return NextResponse.json(
        { error: "No hay eventos para mostrar" },
        { status: 404 }
      );
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al cargar los eventos" },
      { status: 500 }
    );
  }
};
