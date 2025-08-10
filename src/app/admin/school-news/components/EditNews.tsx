"use client";

import { AxiosError } from "axios";
import { useForm, FieldError } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useRef, useState } from "react";
import TextField from "@/components/form/TextField";
import TextArea from "@/components/form/TextArea";
import FileInput from "@/components/form/FileInput";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateNews } from "../services/newsService";
import { IoClose } from "react-icons/io5";

interface NewsFormInputs {
  title: string;
  content: string;
  imageUrl: FileList;
}

interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface EditNewsProps {
  news: News;
}

const EditNews = ({ news }: EditNewsProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFormInputs>({
    defaultValues: {
      title: news.title || "",
      content: news.content || "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: NewsFormInputs) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.imageUrl && data.imageUrl.length > 0) {
        formData.append("imageUrl", data.imageUrl[0]);
      }

      const res = await updateNews(news.id, formData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Noticia actualizada con exito", {
          position: "bottom-right",
        });
        modalRef.current?.close();
        formRef.current?.reset();
        setFile(null);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg = axiosError.response?.data?.error;
      if (msg === "La imagen es requerida y debe ser un archivo válido") {
        toast.error("La imagen es requerida y debe ser un archivo válido", {
          position: "bottom-right",
        });
      } else {
        toast.error("Error al actualizar la noticia", {
          position: "bottom-right",
        });
      }
    } finally {
      setLoading(false);
      modalRef.current?.close();
      router.refresh();
    }
  };

  const handleOpenModal = () => {
    reset({
      title: news.title || "",
      content: news.content || "",
    });
    setFile(null);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      handleCloseModal();
    }
  };

  return (
    <>
      <dialog
        ref={modalRef}
        className="w-xl bg-transparent m-auto backdrop:bg-[#0009]"
        onClick={handleBackdrop}
      >
        <div className="p-8 relative bg-white rounded-2xl shadow-2xl">
          <button
            className="p-2 bg-indigo-600 rounded-full text-white shadow-sm cursor-pointer absolute right-3 top-3"
            onClick={handleCloseModal}
          >
            <IoClose size={20} />
          </button>
          <div className="pb-4">
            <h2 className="text-xl font-medium">Editar noticia</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-6"
          >
            <TextField
              autoFocus
              label="Titulo:"
              type="text"
              placeholder="Ingresar el titulo de la noticia"
              register={register("title", {
                required: {
                  value: false,
                  message: "El titulo es requerido",
                },
              })}
              error={errors.title as FieldError}
            />
            <TextArea
              label="Contenido:"
              placeholder="Ingresa el contenido de la noticia"
              rows={5}
              register={register("content", {
                required: {
                  value: true,
                  message: "El contenido es requerido",
                },
              })}
              error={errors.content as FieldError}
            />
            <FileInput
              label="Imagen:"
              register={register("imageUrl", {
                required: {
                  value: !news.imageUrl,
                  message: "La imagen es requerida",
                },
              })}
              error={errors.imageUrl as FieldError}
              onChange={(file) => setFile(file)}
            />
            <figure className="w-full">
              {file ? (
                <img
                  className="w-full"
                  src={URL.createObjectURL(file)}
                  alt="Nueva imagen"
                />
              ) : (
                news.imageUrl && (
                  <img
                    className="w-full"
                    src={news.imageUrl}
                    alt="Imagen actual"
                  />
                )
              )}
            </figure>
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Actualizando noticia..." : "Actualizar noticia"}
            </button>
          </form>
        </div>
      </dialog>
      <button
        onClick={handleOpenModal}
        type="submit"
        className="px-6 py-3 text-sm cursor-pointer bg-yellow-400 text-black font-medium rounded shadow-sm flex flex-row items-center gap-2"
      >
        <FaEdit />
        Editar
      </button>
    </>
  );
};

export default EditNews;
