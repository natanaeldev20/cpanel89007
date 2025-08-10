import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA OBTENER NUMERO DE EVENTOS

export const GET = async () => {
  try {
    const numberEvents = await prisma.event.count();
    return NextResponse.json({ count: numberEvents });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al cargar numero de eventos" },
      { status: 500 }
    );
  }
};
