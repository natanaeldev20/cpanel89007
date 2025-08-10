import axios from "axios";

//METODO PARA MOSTRAR VISION

export const getMission = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/mission`);
    return data;
  } catch (error) {
    console.error("Error al obtener la mision: ", error);
    throw new Error("No se pudo obtener la mision");
  }
};

//METODO PARA ACTUALIZAR MISION

interface UpdateMissionData {
  content: string;
}

export const updateMission = async (id: string, data: UpdateMissionData) => {
  try {
    const res = await axios.put(`/api/mission/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error actualizando mision:", error);
    throw error;
  }
};
