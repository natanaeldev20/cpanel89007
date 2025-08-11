import { Event } from "../types/eventType";
import api from "@/service/api"; // la instancia que creamos arriba

//METODO PARA OBTENER TODOS LOS EVENTOS

export const getEvents = async (): Promise<Event[]> => {
  try {
    const { data } = await api.get<{ events: Event[] }>(`/api/school-events`);

    if (!Array.isArray(data.events)) {
      throw new Error("Respuesta invalida del servidor");
    }

    return data.events;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error al obtener los eventos: ", error);
    }
    throw new Error("No se pudo obtener los eventos");
  }
};

//METODO PARA OBTENER NUMERO DE EVENTOS

export const getCountEvents = async (): Promise<number> => {
  try {
    const { data } = await api.get<{ count: number }>(
      `/api/school-events/count`
    );

    if (typeof data.count !== "number") {
      throw new Error("Respuesta inesperada del servidor");
    }

    return data.count;
  } catch (error) {
    console.error("Error al obtener el numero de eventos: ", error);
    throw new Error("No se puede obtener el numero de eventos");
  }
};

//METODO PARA CREAR UN EVENTO

export const createEvent = async (data: FormData) => {
  try {
    const res = await api.post("/api/school-events", data);
    return res;
  } catch (error) {
    console.error("Error al crear evento: ", error);
    throw error;
  }
};

//METODO PARA ELIMINAR UN EVENTO

export const deleteEvent = async (id: string) => {
  try {
    const res = await api.delete(`/api/school-events/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar evento: ", error);
    throw error;
  }
};

//METODO PARA ACTUALIZAR UN EVENTO

export const updateEvent = async (id: string, data: FormData) => {
  try {
    const res = await api.put(`/api/school-events/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    throw error;
  }
};
