import prisma from "@/libs/db";
import { NextResponse } from "next/server";

interface UpdateVisionData {
  content?: string;
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const visionId = parseInt(params.id);

    const data: UpdateVisionData = await req.json();

    const updateMission = await prisma.vision.update({
      where: { id: visionId },
      data,
    });

    return NextResponse.json(updateMission);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar la vision" },
      { status: 500 }
    );
  }
};
