"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 grid place-content-center">
      <h1 className="font-bold text-2xl uppercase text-center mb-2 md:text-3xl">
        404 - Página no encontrada
      </h1>
      <p className="text-base text-center mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        className="bg-purple-600 p-4 text-white text-base font-medium text-center rounded-xl shadow-xl mb-8"
        href="/"
      >
        Volver a la página principal
      </Link>
      <figure className="w-full grid place-content-center">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/robot-durmiente-14284342-11431668.png"
          alt="Imagen de 404"
          className="w-full max-w-[12rem]"
        />
      </figure>
    </div>
  );
}
