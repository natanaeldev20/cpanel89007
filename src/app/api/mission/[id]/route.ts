import prisma from "@/libs/db";
import { NextResponse } from "next/server";

//UPDATE

interface UpdateMissionData {
  content?: string;
}

export const PUT = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;
    const missionId = parseInt(id);

    const data: UpdateMissionData = await req.json();

    const updateMission = await prisma.mission.update({
      where: { id: missionId },
      data,
    });

    return NextResponse.json(updateMission);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al actualizar la mision" },
      { status: 500 }
    );
  }
};
