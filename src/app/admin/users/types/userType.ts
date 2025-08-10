//MOSTRAR USUARIOS

export interface User {
  id: string;
  firsName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
}

//CREAR USUARIO

export interface CreateUserData {
  firsName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

//ACTUALIZAR USUARIO

export interface UpdateUserData {
  firsName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
}

//ELIMINAR USUARIO

export interface IdProp {
  userId: string;
}
