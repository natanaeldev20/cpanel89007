import axios from "axios";
import { News } from "../types/newsType";

//METODO PARA OBTENER TODAS LAS NOTICIAS

export const getNews = async (): Promise<News[]> => {
  try {
    const { data } = await axios.get<{ news: News[] }>(
      `${process.env.NEXTAUTH_URL}/api/school-news`
    );

    if (!Array.isArray(data.news)) {
      throw new Error("Respuesta invalida del servidor");
    }

    return data.news;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error al obtener las noticias: ", error);
    }
    throw new Error("No se pudo obtener las noticias");
  }
};

//METODO PARA OBTENER NUMERO DE NOTICIAS

export const getCountNews = async (): Promise<number> => {
  try {
    const { data } = await axios.get<{ count: number }>(
      `${process.env.NEXTAUTH_URL}/api/school-news/count`
    );

    if (typeof data.count !== "number") {
      throw new Error("Respuesta inesperada del servidor");
    }
    return data.count;
  } catch (error) {
    console.error("Error al obtener numero de noticias: ", error);
    throw new Error("No se puedo obtener el numero de noticias");
  }
};

//METODO PARA CREAR UNA NOTICIA

export const createNews = async (data: FormData) => {
  try {
    const res = await axios.post("/api/school-news", data);
    return res;
  } catch (error) {
    console.error("Error al crear el noticia: ", error);
    throw error;
  }
};

//METODO PARA ELIMINAR UNA NOTICIA

export const deleteNews = async (id: string) => {
  try {
    const res = await axios.delete(`/api/school-news/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar noticia: ", error);
    throw error;
  }
};

//METODO PARA ACTUALIZAR UNA NOTICIA

export const updateNews = async (id: string, data: FormData) => {
  try {
    const res = await axios.put(`/api/school-news/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error actualizando noticia:", error);
    throw error;
  }
};
