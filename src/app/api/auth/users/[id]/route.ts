import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

interface UserUpdateBody {
  firsName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const data: UserUpdateBody = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    const { password: _, ...user } = updateUser;

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    const { password, ...userWithoutPassword } = deletedUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al eliminar el usuario" },
      { status: 500 }
    );
  }
};
