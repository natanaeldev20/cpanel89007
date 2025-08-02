import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA OBTENER NUMERO DE REGISTROS

export const GET = async () => {
  try {
    const countPreRegistration = await prisma.enrollmentRequest.count();
    return NextResponse.json(countPreRegistration);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al mostrar numero de registros" },
      { status: 500 }
    );
  }
};
