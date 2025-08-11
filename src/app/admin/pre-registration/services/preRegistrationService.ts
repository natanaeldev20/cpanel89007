import axios from "axios";
import {
  PreRegistration,
  CreatePreRegistrationData,
} from "../types/preRegistrationType";

//METODO PARA MOSTRAR TODOS LOS REGISTROS

export const getPreRegistration = async (): Promise<PreRegistration[]> => {
  try {
    const { data } = await axios.get<{
      preRegistrations: PreRegistration[];
    }>(`${process.env.NEXTAUTH_URL}/api/pre-registration`);

    if (!Array.isArray(data.preRegistrations)) {
      throw new Error("Respuesta inválida del servidor");
    }

    return data.preRegistrations;
  } catch (error) {
    console.error("Error al obtener los registros: ", error);
    throw new Error("No se pudo obtener los registros");
  }
};

//METODO PARA CREAR UN REGISTRO

export const createPreRegistration = async (
  data: CreatePreRegistrationData
) => {
  const res = await axios.post("/api/pre-registration", data);
  return res;
};

//METODO PARA OBTENER NUMERO DE REGISTROS

export const getCountPreRegistration = async (): Promise<number> => {
  try {
    const { data } = await axios.get<{ count: number }>(
      `${process.env.NEXTAUTH_URL}/api/pre-registration/count`
    );

    if (typeof data.count !== "number") {
      throw new Error("Formato incorrecto");
    }

    return data.count;
  } catch (error) {
    console.error("Erro al obtener el numero de registros: ", error);
    throw new Error("No se pudo obtener el numero de registros");
  }
};

//METODO PARA ELIMINAR UN REGISTRO

export const deletePreRegistration = async (id: string) => {
  try {
    const res = await axios.delete(`/api/pre-registration/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    throw new Error("No se pudo eliminar el registro");
  }
};
