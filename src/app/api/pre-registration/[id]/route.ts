import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { UpdatePreRegistrationData } from "@/app/admin/pre-registration/types/preRegistrationType";

//METODO PARA OBTENER UN REGISTRO

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    const preRegistration = await prisma.enrollmentRequest.findUnique({
      where: { id: preRegistrationId },
    });

    if (!preRegistration) {
      return NextResponse.json(
        { error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(preRegistration, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al obtener registro" },
      { status: 500 }
    );
  }
};

//METODO PARA ACTUALIZAR UN REGISRO

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    const data: UpdatePreRegistrationData = await req.json();

    const existingPreRegistration = await prisma.enrollmentRequest.findUnique({
      where: { id: preRegistrationId },
    });

    if (!existingPreRegistration) {
      return NextResponse.json(
        { error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    const updatePreRegistration = await prisma.enrollmentRequest.update({
      where: { id: preRegistrationId },
      data,
    });

    return NextResponse.json(updatePreRegistration);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar el registro" },
      { status: 500 }
    );
  }
};

//METODO PARA ELIMINAR UN REGISTRO

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    const deletePreRegistration = await prisma.enrollmentRequest.delete({
      where: { id: preRegistrationId },
    });

    return NextResponse.json(deletePreRegistration);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar registro" },
      { status: 500 }
    );
  }
};
