"use client";

import { useRef, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateAuthority } from "../services/authorityService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import TextField from "@/components/form/TextField";
import TextArea from "@/components/form/TextArea";
import FileInput from "@/components/form/FileInput";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Authority {
  id: string;
  imageUrl: string;
  name: string;
  lastName: string;
  rol: string;
  message: string;
}

interface AuthorityProps {
  imageUrl: string;
  name: string;
  lastName: string;
  rol: string;
  message: string;
}

interface EditAuthorityProps {
  authority: Authority;
}

const EditAuthority = ({ authority }: EditAuthorityProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorityProps>({
    defaultValues: {
      rol: authority.rol || "",
      name: authority.name || "",
      lastName: authority.lastName || "",
      message: authority.message || "",
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AuthorityProps) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("rol", data.rol);
      formData.append("name", data.name);
      formData.append("lastName", data.lastName);
      formData.append("message", data.message);

      if (data.imageUrl && data.imageUrl.length > 0) {
        formData.append("imageUrl", data.imageUrl[0]);
      }

      const res = await updateAuthority(authority.id, formData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Autoridad actualizada con exito", {
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
      rol: authority.rol || "",
      name: authority.name || "",
      lastName: authority.lastName || "",
      message: authority.message || "",
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
            <h2 className="text-xl font-medium">Editar datos de autoridad</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-6"
          >
            <TextField
              autoFocus
              label="Rol:"
              type="text"
              placeholder="Ingresar el titulo de la noticia"
              register={register("rol", {
                required: {
                  value: false,
                  message: "El rol es requerido",
                },
              })}
              error={errors.rol as FieldError}
            />
            <TextField
              autoFocus
              label="Nombre:"
              type="text"
              placeholder="Ingresar el nombre"
              register={register("name", {
                required: {
                  value: false,
                  message: "El nombre es requerido",
                },
              })}
              error={errors.name as FieldError}
            />
            <TextField
              autoFocus
              label="Apellido:"
              type="text"
              placeholder="Ingresar el apellido"
              register={register("lastName", {
                required: {
                  value: false,
                  message: "El apellido es requerido",
                },
              })}
              error={errors.lastName as FieldError}
            />
            <TextArea
              label="Mensaje:"
              placeholder="Ingresa el mensaje"
              rows={5}
              register={register("message", {
                required: {
                  value: true,
                  message: "El mensaje es requerido",
                },
              })}
              error={errors.message as FieldError}
            />
            <FileInput
              label="Imagen:"
              register={register("imageUrl", {
                required: {
                  value: !authority.imageUrl,
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
                authority.imageUrl && (
                  <img
                    className="w-full"
                    src={authority.imageUrl}
                    alt="Imagen actual"
                  />
                )
              )}
            </figure>
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Actualizando datos..." : "Actualizar datos"}
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

export default EditAuthority;
