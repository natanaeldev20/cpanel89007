import prisma from "@/libs/db";
import { NextResponse } from "next/server";

//GET

export const GET = async () => {
  try {
    const mission = await prisma.mission.findMany();
    return NextResponse.json(mission, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al mostrar mision" },
      { status: 500 }
    );
  }
};
