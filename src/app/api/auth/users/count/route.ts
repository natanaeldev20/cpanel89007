import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA MOSTRAR NUMERO DE USUARIOS

export const GET = async () => {
  try {
    const numberUsers = await prisma.user.count();
    return NextResponse.json({ count: numberUsers }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al mostrar numero de usuarios" },
      { status: 500 }
    );
  }
};
