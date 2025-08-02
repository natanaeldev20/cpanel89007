import { NextResponse } from "next/server";
import prisma from "@/libs/db";

//METODO PARA MOSTRAR NUMERO DE USUARIOS

export const GET = async () => {
  try {
    const countUser = await prisma.user.count();
    return NextResponse.json(countUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al mostrar numero de usuarios" },
      { status: 500 }
    );
  }
};
