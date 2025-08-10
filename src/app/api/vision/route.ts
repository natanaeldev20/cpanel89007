import prisma from "@/libs/db";
import { NextResponse } from "next/server";

//GET

export const GET = async () => {
  try {
    const vision = await prisma.vision.findMany();
    return NextResponse.json(vision, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al mostrar vision" },
      { status: 500 }
    );
  }
};
