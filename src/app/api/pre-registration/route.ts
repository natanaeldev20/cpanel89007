import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { CreatePreRegistrationData } from "@/app/admin/pre-registration/types/preRegistrationType";

//METODO PARA OBTENER TODOS LOS REGISTROS

export const GET = async () => {
  try {
    const preRegistrations = await prisma.enrollmentRequest.findMany();
    return NextResponse.json({ preRegistrations }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return NextResponse.json(
      {
        error: "Error al mostrar usuarios",
      },
      { status: 500 }
    );
  }
};

//METODO PARA CREAR UN REGISTRO

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*", // "*" o tu dominio de Astro
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request handler
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Create record
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const [documentNumber, email] = await Promise.all([
      prisma.enrollmentRequest.findUnique({
        where: { documentNumber: data.documentNumber },
      }),
      prisma.enrollmentRequest.findUnique({
        where: { email: data.email },
      }),
    ]);

    if (documentNumber || email) {
      return NextResponse.json(
        {
          error: documentNumber
            ? "El número de documento ya existe"
            : "El email ya existe",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const newPreRegistration = await prisma.enrollmentRequest.create({
      data,
    });

    return NextResponse.json(newPreRegistration, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Error al crear registro" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// export const POST = async (req: Request) => {

//   try {
//     const data: CreatePreRegistrationData = await req.json();

//     const [documentNumber, email] = await Promise.all([
//       prisma.enrollmentRequest.findUnique({
//         where: { documentNumber: data.documentNumber },
//       }),
//       prisma.enrollmentRequest.findUnique({ where: { email: data.email } }),
//     ]);

//     if (documentNumber || email) {
//       return NextResponse.json(
//         {
//           error: documentNumber
//             ? "El numero de documento ya existe"
//             : "El email ya existe",
//         },
//         { status: 400 }
//       );
//     }

//     const newPreRegistration = await prisma.enrollmentRequest.create({
//       data: {
//         name: data.name,
//         lastName: data.lastName,
//         documentType: data.documentType,
//         documentNumber: data.documentNumber,
//         email: data.email,
//         phone: data.phone,
//         degree: data.degree,
//       },
//     });

//     return NextResponse.json(newPreRegistration, { status: 201 });
//   } catch (error) {
//     if (process.env.NODE_ENV === "development") {
//       console.error(error);
//     }
//     return NextResponse.json(
//       { error: "Error al crear registro" },
//       { status: 500 }
//     );
//   }
// };
