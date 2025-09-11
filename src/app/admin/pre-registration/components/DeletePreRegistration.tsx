"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deletePreRegistration } from "../services/preRegistrationService";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IdProp {
  id: string;
}

const DeletePreRegistration = ({ id }: IdProp) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePreRegistration(id);
      modalRef.current?.close();
      toast.success("Registro eliminado exitosamente", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Error al eliminar el registro", {
        position: "top-right",
      });
      console.error(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <dialog
        ref={modalRef}
        className="m-auto rounded-lg shadow-md p-6 w-96 backdrop:bg-[#0009] dark:bg-[#161618] dark:text-white"
      >
        <h2 className="text-xl font-semibold mb-4">¿Eliminar registro?</h2>
        <p className="mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => modalRef.current?.close()}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </dialog>

      <button
        onClick={() => modalRef.current?.showModal()}
        className="px-6 py-3 text-sm cursor-pointer bg-red-500 text-white rounded shadow-sm font-medium flex flex-row items-center gap-2"
      >
        <RiDeleteBin6Line />
        Eliminar
      </button>
    </>
  );
};

export default DeletePreRegistration;
