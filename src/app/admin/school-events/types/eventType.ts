//PARA MOSTRAR TODOS LOS EVENTOS

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

//PARA CREAR UN EVENTO

export interface CreateEventData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: FileList;
}

//PARA ACTUALIZAR UN EVENTO

export interface UpdateEventData {
  title?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  imageUrl?: string;
}

//PARA ELIMINAR

export interface IdProp {
  id: string;
}
