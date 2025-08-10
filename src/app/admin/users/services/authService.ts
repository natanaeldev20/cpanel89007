import axios from "axios";
import {
  User,
  CreateUserData,
  UpdateUserData,
  IdProp,
} from "../types/userType";

//METODO PARA MOSTRAR USUARIOS

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<{ success: boolean; users: User[] }>(
      `${process.env.NEXTAUTH_URL}/api/auth/users`
    );

    if (!data.success || !Array.isArray(data.users)) {
      throw new Error("Respuesta inválida del servidor");
    }

    return data.users;
  } catch (error) {
    console.error("Error al obtener los usuarios: ", error);
    throw new Error("No se puedo obtener los usuarios");
  }
};

//METODO PARA CREAR USUARIO

export const registerUser = async (user: CreateUserData) => {
  const res = await axios.post("/api/auth/users", user);
  return res;
};

//METODO PARA ELIMINAR UN USUARIO

export const deleteUser = async ({ userId }: IdProp) => {
  try {
    const res = await axios.delete(`/api/auth/users/${userId}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

//METODO PARA ACTUALIZAR UN USUARIO

export const updateUser = async (id: string, data: UpdateUserData) => {
  try {
    const res = await axios.put(`/api/auth/users/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

//METODO PARA MOSTRAR NUMERO DE USARIOS

export const getCountUser = async (): Promise<number> => {
  try {
    const { data } = await axios.get<{ count: number }>(
      `${process.env.NEXTAUTH_URL}/api/auth/users/count`
    );

    if (typeof data.count !== "number") {
      throw new Error("Respuesta inesperada del servidor");
    }

    return data.count;
  } catch (error) {
    console.error("Error al obtener numero de usuarios: ", error);
    throw new Error("No se pudo obtener el numero de usuarios");
  }
};
