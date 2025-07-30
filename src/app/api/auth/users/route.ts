import { NextResponse } from "next/server";
import { prisma } from "@/libs/db";
import bcrypt from "bcrypt";

interface UserRequestBody {
  firsName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

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
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const data: UserRequestBody = await req.json();

    const email = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (email) {
      return NextResponse.json(
        {
          error: "El correo electrónico ya existe",
        },
        {
          status: 400,
        }
      );
    }

    const username = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (username) {
      return NextResponse.json(
        {
          error: "El nombre de usuario ya existe",
        },
        {
          status: 400,
        }
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json(
      {
        error: "Error al crear el usuario",
      },
      {
        status: 500,
      }
    );
  }
};
