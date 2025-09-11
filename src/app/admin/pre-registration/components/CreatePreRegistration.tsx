"use client";

import { AxiosError } from "axios";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import TextField from "@/components/form/TextField";
import { createPreRegistration } from "../services/preRegistrationService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/form/SelectInput";
import { IoClose } from "react-icons/io5";

interface PreRegistrationProps {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}
const CreatePreRegistration = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreRegistrationProps>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<PreRegistrationProps> = async (data) => {
    try {
      setLoading(true);
      const res = await createPreRegistration(data);

      if (res.status === 201 || res.status === 200) {
        toast.success("Registro creado exitosamente", {
          position: "bottom-right",
        });
        formRef.current?.reset();
        modalRef.current?.close();
        router.refresh();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg = axiosError.response?.data?.error;
      if (msg === "El numero de documento ya existe") {
        toast.error("El numero de documento ya existe", {
          position: "bottom-right",
        });
      } else if (msg === "El email ya existe") {
        toast.error("El email ya existe", {
          position: "bottom-right",
        });
      } else {
        toast.error("Error al crear registro", {
          position: "bottom-right",
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
        <div className="p-8 relative bg-white rounded-2xl shadow-2xl dark:bg-[#161618] dark:text-white">
          <button
            className="p-2 bg-indigo-600 rounded-full text-white shadow-sm cursor-pointer absolute right-3 top-3"
            onClick={handleCloseModal}
          >
            <IoClose size={20} />
          </button>
          <div className="pb-4">
            <h2 className="text-xl font-medium">Crear nuevo registro</h2>
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
              register={register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
              })}
              error={errors.name as FieldError}
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
            <SelectInput
              label="Tipo de documento:"
              register={register("documentType", {
                required: {
                  value: true,
                  message: "El tipo de documento es requerido",
                },
              })}
              error={errors.documentType as FieldError}
              options={[
                { value: "dni", label: "DNI" },
                { value: "carne", label: "Carne de extranjeria" },
                { value: "pasaporte", label: "Pasaporte" },
              ]}
            />
            <TextField
              label="Numero de documento:"
              type="number"
              placeholder="Ingresar numero de documento"
              register={register("documentNumber", {
                required: {
                  value: true,
                  message: "El numero de documento es requerido",
                },
              })}
              error={errors.documentNumber as FieldError}
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
            <SelectInput
              label="Grado:"
              register={register("degree", {
                required: {
                  value: true,
                  message: "El grado es requerido",
                },
              })}
              error={errors.degree as FieldError}
              options={[
                { value: "3 años", label: "3 años" },
                { value: "4 años", label: "4 años" },
                { value: "5 años", label: "5 años" },
                { value: "1 primaria", label: "1° primaria" },
                { value: "2 primaria", label: "2° primaria" },
                { value: "3 primaria", label: "3° primaria" },
                { value: "4 primaria", label: "4° primaria" },
                { value: "5 primaria", label: "5° primaria" },
                { value: "6 primaria", label: "6° primaria" },
              ]}
            />
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Creando registro..." : "Crear registro"}
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
        Agregar un registro
      </button>
    </>
  );
};

export default CreatePreRegistration;
