//PARA MOSTRAR TODOS LOS REGISTROS

export interface PreRegistration {
  id: string;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}

export interface CreatePreRegistrationData {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}

export interface UpdatePreRegistrationData {
  name?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  degree?: string;
}
