import { NextResponse } from "next/server";
import prisma from "@/libs/db";

interface PreRegistrationUpdateBody {
  name?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  degree?: string;
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    if (isNaN(preRegistrationId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const preRegistration = await prisma.enrollmentRequest.findUnique({
      where: { id: preRegistrationId },
    });

    if (!preRegistration) {
      return NextResponse.json(
        { error: "Registro no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(preRegistration);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener registro" });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    if (isNaN(preRegistrationId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const data: PreRegistrationUpdateBody = await req.json();

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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const preRegistrationId = parseInt(params.id);

    if (isNaN(preRegistrationId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

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
