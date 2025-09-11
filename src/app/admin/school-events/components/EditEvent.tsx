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
import { updateEvent } from "../services/eventService";
import { Event, CreateEventData } from "../types/eventType";
import DataPicker from "@/components/form/DatePicker";
import { IoClose } from "react-icons/io5";

interface EditEventProps {
  events: Event;
}

const EditEvent = ({ events }: EditEventProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16); // YYYY-MM-DDTHH:mm
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventData>({
    defaultValues: {
      title: events.title || "",
      description: events.description || "",
      location: events.location || "",
      startDate: formatDateForInput(events.startDate),
      endDate: formatDateForInput(events.endDate),
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CreateEventData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);

      if (data.imageUrl && data.imageUrl.length > 0) {
        formData.append("imageUrl", data.imageUrl[0]);
      }

      const res = await updateEvent(events.id, formData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Evento actualizado con exito", {
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
        toast.error("Error al actualizar el evento", {
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
      title: events.title || "",
      description: events.description || "",
      location: events.location || "",
      startDate: formatDateForInput(events.startDate),
      endDate: formatDateForInput(events.endDate),
    });
    setFile(null);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      router.refresh();
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
        <div className="p-8 relative bg-white rounded-2xl shadow-2xl darK:bg-[#161618] darK:text-white">
          <button
            className="p-2 bg-indigo-600 rounded-full text-white shadow-sm cursor-pointer absolute right-3 top-3"
            onClick={handleCloseModal}
          >
            <IoClose size={20} />
          </button>
          <div className="pb-4">
            <h2 className="text-xl font-medium">Editar evento</h2>
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
                  value: true,
                  message: "El titulo es requerido",
                },
              })}
              error={errors.title as FieldError}
            />
            <TextArea
              label="Descripcion:"
              placeholder="Ingresa la descripcion de la noticia"
              rows={5}
              register={register("description", {
                required: {
                  value: true,
                  message: "La descripcion es requerido",
                },
              })}
              error={errors.description as FieldError}
            />
            <TextField
              label="Ubicacion:"
              type="text"
              register={register("location", {
                required: {
                  value: true,
                  message: "La ubicacion es requerida",
                },
              })}
              error={errors.location as FieldError}
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <DataPicker
                label="Fecha de inicio:"
                register={register("startDate", {
                  required: {
                    value: true,
                    message: "La fecha de inicio es requerida",
                  },
                })}
                error={errors.startDate as FieldError}
              />
              <DataPicker
                label="Fecha de culminacion:"
                register={register("endDate", {
                  required: {
                    value: true,
                    message: "La fecha de culminacion es requerida",
                  },
                })}
                error={errors.endDate as FieldError}
              />
            </div>
            <FileInput
              label="Imagen:"
              register={register("imageUrl", {
                required: {
                  value: !events.imageUrl,
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
                events.imageUrl && (
                  <img
                    className="w-full"
                    src={events.imageUrl}
                    alt="Imagen actual"
                  />
                )
              )}
            </figure>
            <button className="w-full p-4 text-white font-medium rounded-lg shadow-lg cursor-pointer bg-indigo-600">
              {loading ? "Actualizando evento..." : "Actualizar evento"}
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

export default EditEvent;
