import api from "@/service/api";

interface Authority {
  id: string;
  rol: string;
  name: string;
  lastName: string;
  message: string;
  imageUrl: string;
}

//METODO PARA OBTENER TODAS LAS AUTORIDADES

export const getAuthority = async (): Promise<Authority[]> => {
  try {
    const { data } = await api.get<{ authority: Authority[] }>(
      `/api/authority`
    );

    if (!Array.isArray(data.authority)) {
      throw new Error("Respuesta invalida del servidor");
    }

    return data.authority;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error al obtener las autoridades: ", error);
    }
    throw new Error("No se pudo obtener las autoridades");
  }
};

//METODO PARA ELIMINAR UNA AUTORIDAD

export const deleteAuthority = async (id: string) => {
  try {
    const res = await api.delete(`/api/authority/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar la autoridad: ", error);
    throw error;
  }
};

//METODO PARA ACTUALIZAR UNA AUTORIDAD

export const updateAuthority = async (id: string, data: FormData) => {
  try {
    const res = await api.put(`/api/authority/${id}`, data);
    return res;
  } catch (error) {
    console.error("Error actualizando autoridad:", error);
    throw error;
  }
};

//METODO PARA CREAR UNA AUTORIDAD

export const createAuthority = async (data: FormData) => {
  try {
    const res = await api.post("/api/authority", data);
    return res;
  } catch (error) {
    console.error("Error al crear la autoridad: ", error);
    throw error;
  }
};
