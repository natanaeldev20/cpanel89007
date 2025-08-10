"use client";

import { AxiosError } from "axios";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import TextField from "@/components/form/TextField";
import PasswordField from "@/components/form/PasswordField";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface UserProps {
  firsName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

const CreateButton = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data);

      if (res.status === 201 || res.status === 200) {
        toast.success("Usuario creado exitosamente", {
          position: "top-right",
        });
        formRef.current?.reset();
        modalRef.current?.close();
        router.refresh();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg = axiosError.response?.data?.error;
      if (msg === "El correo electrónico ya existe") {
        toast.error("El correo electrónico ya existe", {
          position: "top-right",
        });
      } else if (msg === "El nombre de usuario ya existe") {
        toast.error("El nombre de usuario ya existe", {
          position: "top-right",
        });
      } else {
        toast.error("Error al crear el usuario", {
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
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
            <h2 className="text-xl font-medium">Agregar nuevo usuario</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-6"
          >
            <TextField
              autoFocus
              label="Nombre:"
              type="text"
              placeholder="Ingresar nombre"
              register={register("firsName", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
              error={errors.firsName as FieldError}
            />
            <TextField
              label="Apellido:"
              type="text"
              placeholder="Ingresar apellido"
              register={register("lastName", {
                required: {
                  value: true,
                  message: "El apellido es requerido",
                },
              })}
              error={errors.lastName as FieldError}
            />
            <TextField
              label="Nombre de usuario:"
              type="text"
              placeholder="Ingresar nombre de usuario"
              register={register("username", {
                required: {
                  value: true,
                  message: "El nombre de usuario es requerido",
                },
              })}
              error={errors.username as FieldError}
            />
            <PasswordField
              label="Contraseña"
              placeholder="Ingresar contraseña"
              register={register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
              })}
              error={errors.password as FieldError}
            />
            <TextField
              label="Correo electrónico:"
              type="email"
              placeholder="Ingresar correo electrónico"
              register={register("email", {
                required: {
                  value: true,
                  message: "El correo electrónico es requerido",
                },
              })}
              error={errors.email as FieldError}
            />
            <TextField
              label="Número de celular:"
              type="number"
              placeholder="Ingresar número de celular"
              register={register("phone", {
                required: {
                  value: true,
                  message: "El número de celular es requerido",
                },
              })}
              error={errors.phone as FieldError}
            />
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Creando usuario..." : "Crear usuario"}
            </button>
          </form>
        </div>
      </dialog>
      <button
        type="submit"
        className="bg-green-500 w-max text-white font-medium flex items-center justify-center gap-2 cursor-pointer p-4 rounded-lg shadow-lg"
        onClick={handleOpenModal}
      >
        <FaPlusCircle />
        Agregar usuario
      </button>
    </>
  );
};

export default CreateButton;
