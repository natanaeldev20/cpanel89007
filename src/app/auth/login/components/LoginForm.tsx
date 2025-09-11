"use client";

import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import { IoSchool } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error, {
          position: "top-right",
        });
      } else {
        toast.success("Inicio de sesión exitoso", {
          position: "top-right",
        });

        console.log(res);
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl shadow-xl transition-all transform hover:shadow-2xl">
        <div className="w-full bg-linear-to-t from-sky-500 to-indigo-500 p-8 rounded-t-2xl">
          <div className="w-full grid place-content-center mb-4">
            <div className="w-max p-2 rounded-full shadow-xl bg-white">
              <IoSchool size={50} className="text-indigo-600" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white text-center">
              InkaEdu360
            </h1>
            <p className="text-indigo-100 text-center">
              Accede a tu cuenta para continuar
            </p>
          </div>
        </div>
        <form
          className="bg-white dark:bg-[#171717] p-8 space-y-6 rounded-b-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Nombre de usuario"
            placeholder="tunombredeusuario"
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
            placeholder="••••••••"
            register={register("password", {
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
            error={errors.password as FieldError}
          />
          <button
            type="submit"
            className="bg-indigo-600 w-full px-4 py-3 rounded-lg font-medium text-white text-base cursor-pointer shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
          <ToastContainer />
        </form>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>© 2025 InkaEdu360. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default LoginForm;
