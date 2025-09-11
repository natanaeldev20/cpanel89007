"use client";

import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { useRef, useState } from "react";
import { updateMission } from "../services/missionService";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import TextArea from "@/components/form/TextArea";
import { IoClose } from "react-icons/io5";

interface EditMissionProp {
  mission: {
    id: string;
    content: string;
  };
}

interface UpdateMissionData {
  content: string;
}

const EditMission = ({ mission }: EditMissionProp) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMissionData>({
    defaultValues: {
      content: mission.content,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: UpdateMissionData) => {
    try {
      setLoading(true);
      await updateMission(mission.id, data);
      toast.success("Mision actualizada correctamente");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error: string }>;
      const msg = axiosError.response?.data?.error;
      if (msg === "Error al actualizar la mision") {
        toast.error("Error al actualizar la mision", {
          position: "bottom-right",
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
            <h2 className="text-xl font-medium">Editar misión</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-6"
          >
            <TextArea
              rows={13}
              label="Contenido:"
              placeholder="Ingresar contenido"
              register={register("content", {
                required: {
                  value: true,
                  message: "El contenido es requerido",
                },
              })}
              error={errors.content as FieldError}
            />
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Actualizando misión..." : "Actualizar misión"}
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

export default EditMission;
