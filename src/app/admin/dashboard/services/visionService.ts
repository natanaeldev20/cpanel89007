import api from "@/service/api";

//METODO PARA MOSTRAR VISION

export const getVision = async () => {
  try {
    const { data } = await api.get(`/api/vision`);
    return data;
  } catch (error) {
    console.error("Error al obtener la vision: ", error);
    throw new Error("No se pudo obtener la vision");
  }
};

//METODO PARA ACTUALIZAR MISION

interface UpdateVisionData {
  content: string;
}

export const updateVision = async (id: string, data: UpdateVisionData) => {
  try {
    const res = await api.put(`/api/vision/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error actualizando vision:", error);
    throw error;
  }
};
