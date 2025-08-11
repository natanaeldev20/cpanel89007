import {
  PreRegistration,
  CreatePreRegistrationData,
} from "../types/preRegistrationType";
import api from "@/service/api"; // la instancia que creamos arriba

//METODO PARA MOSTRAR TODOS LOS REGISTROS

export const getPreRegistration = async (): Promise<PreRegistration[]> => {
  try {
    const { data } = await api.get<{
      preRegistrations: PreRegistration[];
    }>(`/api/pre-registration`);

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
  const res = await api.post("/api/pre-registration", data);
  return res;
};

//METODO PARA OBTENER NUMERO DE REGISTROS

export const getCountPreRegistration = async (): Promise<number> => {
  try {
    const res = await api.get(`/api/pre-registration/count`);
    console.log("Respuesta completa:", res.data);
    if (typeof res.data.count !== "number") {
      throw new Error("Formato incorrecto");
    }
    return res.data.count;
  } catch (error) {
    console.error("Error al obtener el número de registros:", error);
    throw new Error("No se pudo obtener el número de registros");
  }
};

//METODO PARA ELIMINAR UN REGISTRO

export const deletePreRegistration = async (id: string) => {
  try {
    const res = await api.delete(`/api/pre-registration/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    throw new Error("No se pudo eliminar el registro");
  }
};
