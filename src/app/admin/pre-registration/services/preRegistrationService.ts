import axios from "axios";

//METODO PARA CREAR UN REGISTRO

interface PreRegistrationProps {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}

export const createPreRegistration = async (data: PreRegistrationProps) => {
  const res = await axios.post("/api/pre-registration", data);
  return res;
};

//METODO PARA OBTENER NUMERO DE REGISTROS

export const countPreRegistration = async () => {
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/pre-registration/count`
  );
  return data;
};

//METODO PARA MOSTRAR TODOS LOS REGISTROS

export const getPreRegistration = async () => {
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/pre-registration`
  );
  return data;
};

//METODO PARA ELIMINAR UN REGISTRO

export const deletePreRegistration = async (id: string) => {
  try {
    const res = await axios.delete(`/api/pre-registration/${id}`);
    return res;
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    throw error;
  }
};
