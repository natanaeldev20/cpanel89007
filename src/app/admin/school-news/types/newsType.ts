//PARA MOSTRAR TODOS LAS NOTICIAS

export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface CreateNewsData {
  title: string;
  content: string;
  imageUrl: FileList;
}

//PARA ACTUALIZAR UNA NOTICIA

export interface UpdateNewsData {
  title?: string;
  content?: string;
  imageUrl?: string;
}
