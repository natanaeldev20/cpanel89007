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
  "Access-Control-Allow-Origin": "http://localhost:4321", // URL de Astro
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(req: Request) {
  try {
    const data: CreatePreRegistrationData = await req.json();

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
            ? "El numero de documento ya existe"
            : "El email ya existe",
        },
        { status: 400, headers: corsHeaders }
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
