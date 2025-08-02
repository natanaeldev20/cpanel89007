import axios from "axios";

//METODO PARA MOSTRAR USUARIOS

export interface User {
  id: string;
  firsName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
}

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${BASE_URL}/api/auth/users`);
  return data;
};

//METODO PARA CREAR USUARIO

interface UserProps {
  firsName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export const registerUser = async ({
  firsName,
  lastName,
  username,
  password,
  email,
  phone,
}: UserProps) => {
  const res = await axios.post("/api/auth/users", {
    firsName,
    lastName,
    username,
    password,
    email,
    phone,
  });

  return res;
};

//METODO PARA ELIMINAR UN USUARIO

interface IdProp {
  userId: string;
}

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

export interface UpdateUserData {
  firsName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}

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

export const countUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/auth/users/count`);
  return data;
};
