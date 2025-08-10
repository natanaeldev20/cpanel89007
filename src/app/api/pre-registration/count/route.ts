import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA OBTENER NUMERO DE REGISTROS

export const GET = async () => {
  try {
    const numberPreRegistrations = await prisma.enrollmentRequest.count();
    return NextResponse.json({ count: numberPreRegistrations });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al obtener numero de registros" },
      { status: 500 }
    );
  }
};
