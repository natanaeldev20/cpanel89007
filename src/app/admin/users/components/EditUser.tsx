"use client";

import { useForm, FieldError } from "react-hook-form";
import TextField from "@/components/form/TextField";
import PasswordField from "@/components/form/PasswordField";
import { useRef, useState } from "react";
import { updateUser, UpdateUserData } from "../services/authService";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface EditUserProp {
  user: {
    id: string;
    firsName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
  };
}

const EditUser = ({ user }: EditUserProp) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    defaultValues: {
      firsName: user.firsName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: UpdateUserData) => {
    try {
      setLoading(true);
      await updateUser(user.id, data);
      toast.success("Usuario actualizado correctamente");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg = axiosError.response?.data?.error;
      if (msg === "Error al actualizar el usuario") {
        toast.error("Error al actualizar el usuario", {
          position: "top-right",
        });
      }
    } finally {
      modalRef.current?.close();
      setLoading(false);
      router.refresh();
    }
  };

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      document.body.style.overflow = "auto";
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
        <div className="p-8 bg-white rounded-2xl shadow-2xl">
          <div className="pb-4">
            <h2 className="text-xl font-medium">Editar usuario</h2>
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="changePassword"
                checked={showPasswordField}
                onChange={() => setShowPasswordField(!showPasswordField)}
              />
              <label htmlFor="changePassword" className="text-sm">
                Cambiar contraseña
              </label>
            </div>
            {showPasswordField && (
              <PasswordField
                label="Nueva contraseña"
                placeholder="Ingresar nueva contraseña"
                register={register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
                error={errors.password as FieldError}
              />
            )}
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
              {loading ? "Actualizando usuario..." : "Actualizar usuario"}
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

export default EditUser;
