import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";
import bcrypt from "bcrypt";
import { CreateUserData } from "@/app/admin/users/types/userType";

//METODO PARA MOSTRAR TODOS LOS USUARIOS ORDENADOS DE FORMA ASCENDENTE

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firsName: true,
        lastName: true,
        username: true,
        email: true,
        phone: true,
        createAt: true,
        updateAt: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo obtener la lista de usuarios.",
        error: "DatabaseConnectionError",
      },
      { status: 500 }
    );
  }
};

//METODO PARA CREAR USUARIO

export const POST = async (req: Request) => {
  try {
    const data: CreateUserData = await req.json();

    const [emailExists, usernameExists] = await Promise.all([
      prisma.user.findUnique({ where: { email: data.email } }),
      prisma.user.findUnique({ where: { username: data.username } }),
    ]);

    if (emailExists || usernameExists) {
      return NextResponse.json(
        {
          error: emailExists
            ? "El correo electrónico ya existe"
            : "El nombre de usuario ya existe",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        firsName: data.firsName,
        lastName: data.lastName,
        username: data.username,
        password: hashedPassword,
        email: data.email,
        phone: data.phone,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error al crear el usuario:", error);
    }
    return NextResponse.json(
      {
        error: "No se pudo crear el usuario",
      },
      {
        status: 500,
      }
    );
  }
};
