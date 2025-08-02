import { NextResponse } from "next/server";
import prisma from "@/libs/db";

interface PreRegistrationRequestBody {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}

export const GET = async () => {
  try {
    const preRegistrations = await prisma.enrollmentRequest.findMany();
    return NextResponse.json(preRegistrations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al mostrar usuarios" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const data: PreRegistrationRequestBody = await req.json();

    const documentNumber = await prisma.enrollmentRequest.findUnique({
      where: {
        documentNumber: data.documentNumber,
      },
    });

    if (documentNumber) {
      return NextResponse.json(
        { error: "El numero de documento ya existe" },
        { status: 400 }
      );
    }

    const email = await prisma.enrollmentRequest.findUnique({
      where: {
        email: data.email,
      },
    });

    if (email) {
      return NextResponse.json(
        { error: "El email ya existe" },
        { status: 400 }
      );
    }

    const newPreRegistration = await prisma.enrollmentRequest.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        email: data.email,
        phone: data.phone,
        degree: data.degree,
      },
    });

    return NextResponse.json(newPreRegistration);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al crear registro" },
      { status: 500 }
    );
  }
};
