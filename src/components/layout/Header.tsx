"use client";

import { IoSchool } from "react-icons/io5";
import BaseLink from "../ui/BaseLink";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdAppRegistration } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { HiOutlineDocumentReport } from "react-icons/hi";

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="z-50 sticky top-0 bg-white shadow-sm dark:bg-[#161618] dark:border-r-2 dark:border-[#39393b] lg:h-screen">
      {/* --- Barra lateral desktop --- */}
      <nav className="flex flex-col sr-only lg:h-full lg:not-sr-only">
        <Link href="/">
          <div className="w-full p-4 shadow-sm flex flex-row items-center gap-3">
            <div className="w-max p-2 rounded-full bg-indigo-600 text-white">
              <IoSchool size={35} />
            </div>
            <span className="text-xl font-semibold dark:text-white">
              InkaEdu360
            </span>
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-between dark:bg-[#161618]">
          <div className="p-4  space-y-2">
            <BaseLink href="/admin/dashboard">
              <MdOutlineDashboardCustomize size={22} />
              Dashboard
            </BaseLink>
            <BaseLink href="/admin/pre-registration">
              <MdAppRegistration size={22} />
              Preinscripciones
            </BaseLink>
            <BaseLink href="/admin/school-events">
              <MdOutlinePostAdd size={22} />
              Gestión de Eventos
            </BaseLink>
            <BaseLink href="/admin/school-news">
              <FaNewspaper size={22} />
              Gestión de Noticias
            </BaseLink>
            <BaseLink href="/admin/users">
              <FaUsers size={22} />
              Gestión de Usuarios
            </BaseLink>
            <BaseLink href="/admin/reports">
              <HiOutlineDocumentReport size={22} />
              Reportes
            </BaseLink>
          </div>
          <div className="w-full p-4 shadow-xl border-t-2 border-gray-200 flex flex-row items-center justify-between dark:border-none">
            <div className="flex px-1 py-4 rounded-lg transition-all duration-300 cursor-pointer flex-row items-center gap-3 hover:bg-gray-200 dark:hover:bg-[#28272a]">
              <figure>
                <img
                  src="https://www.obrasciviles.utalca.cl/img/desa/ac_generico.jpg"
                  alt="perfil"
                  className="w-full max-w-[3rem] aspect-square object-cover rounded-full shadow-sm"
                />
              </figure>
              <div className="w-full flex flex-col items-start">
                <span className="text-sm font-medium dark:text-white">
                  {session?.user?.name}
                </span>
                <span className="text-xs text-gray-400">
                  {session?.user?.email}
                </span>
              </div>
            </div>

            <button
              className="cursor-pointer dark:text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <MdLogout size={25} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Barra superior móvil --- */}
      <nav className="flex flex-row items-center justify-between not-sr-only p-4 lg:sr-only">
        <Link href="/">
          <div className="flex flex-row items-center gap-3">
            <div className="w-max p-2 rounded-full bg-indigo-600 text-white">
              <IoSchool size={30} />
            </div>
            <span className="text-lg font-semibold dark:text-white">
              InkaEdu360
            </span>
          </div>
        </Link>
        <div className="flex flex-row items-center gap-4 sr-only sm:not-sr-only">
          <BaseLink href="/admin/dashboard">
            <MdOutlineDashboardCustomize size={22} />
          </BaseLink>
          <BaseLink href="/admin/pre-registration">
            <MdAppRegistration size={22} />
          </BaseLink>
          <BaseLink href="/admin/school-events">
            <MdOutlinePostAdd size={22} />
          </BaseLink>
          <BaseLink href="/admin/school-news">
            <FaNewspaper size={22} />
          </BaseLink>
          <BaseLink href="/admin/users">
            <FaUsers size={22} />
          </BaseLink>
          <BaseLink href="/admin/reports">
            <HiOutlineDocumentReport size={22} />
          </BaseLink>
        </div>

        <div className="cursor-pointer flex flex-row items-center gap-3">
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="w-max shadow-lg p-3 rounded-full bg-indigo-600 text-white not-sr-only cursor-pointer sm:sr-only"
          >
            <RiMenu2Fill size={22} />
          </button>
          <div
            ref={profileRef}
            className="relative"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <img
              src="https://www.obrasciviles.utalca.cl/img/desa/ac_generico.jpg"
              alt="perfil"
              className="w-full max-w-[3rem] aspect-square object-cover rounded-full shadow-sm"
            />

            {/* Popup de perfil */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-4 w-48 z-50 dark:bg-white/5">
                <div className="flex flex-col items-start mb-3">
                  <span className="text-sm font-medium dark:text-white">
                    {session?.user?.name}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {session?.user?.email}
                  </span>
                </div>
                <button
                  className="w-full bg-indigo-800 rounded-lg p-2 text-white flex flex-row items-center justify-center gap-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <MdLogout size={20} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Menú móvil hamburguesa */}
      {menuOpen && (
        <div
          className="absolute w-full p-4 not-sr-only sm:sr-only"
          ref={popupRef}
        >
          <div className="bg-white shadow-2xl p-4 rounded-xl dark:bg-[#161618]">
            <nav>
              <BaseLink href="/admin/dashboard">
                <MdOutlineDashboardCustomize size={22} />
                Dashboard
              </BaseLink>
              <BaseLink href="/admin/pre-registration">
                <MdAppRegistration size={22} />
                Preinscripciones
              </BaseLink>
              <BaseLink href="/admin/school-events">
                <MdOutlinePostAdd size={22} />
                Gestión de Eventos
              </BaseLink>
              <BaseLink href="/admin/school-news">
                <FaNewspaper size={22} />
                Gestión de Noticias
              </BaseLink>
              <BaseLink href="/admin/users">
                <FaUsers size={22} />
                Gestión de Usuarios
              </BaseLink>
              <BaseLink href="/admin/reports">
                <HiOutlineDocumentReport size={22} />
                Reportes
              </BaseLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
