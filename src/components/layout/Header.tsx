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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="z-50 sticky top-0 bg-white shadow-sm lg:h-screen">
      <nav className="flex flex-col sr-only lg:h-full lg:not-sr-only">
        <div className="w-full p-4 shadow-sm flex flex-row items-center gap-3">
          <div className="w-max p-2 rounded-full bg-indigo-600 text-white">
            <IoSchool size={35} />
          </div>
          <span className="text-xl font-semibold">InkaEdu360</span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
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
          </div>
          <div className="w-full p-4 shadow-xl border-t-2 border-gray-200 flex flex-row items-center justify-between">
            <div className="flex px-1 py-4 rounded-lg transition-all duration-300 cursor-pointer flex-row items-center gap-3 hover:bg-gray-200">
              <figure>
                <img
                  src="https://alfabetajuega.com/hero/2024/05/este-cosplay-de-nezuko-kamado-de-demon-slayer-es-lo-mejor-que-veras-en-mucho-tiempo.jpg?width=768&aspect_ratio=16:9&format=nowebp"
                  alt="perfil"
                  className="w-full max-w-[3rem] aspect-square object-cover rounded-full shadow-sm"
                />
              </figure>
              <div className="w-full flex flex-col items-start">
                <span className="text-sm font-medium">Natanael Vasquez</span>
                <span className="text-xs text-gray-400">
                  natanaelpro360@gmail.com
                </span>
              </div>
            </div>

            <button className="cursor-pointer">
              <MdLogout size={25} />
            </button>
          </div>
        </div>
      </nav>
      <nav className="flex flex-row items-center justify-between not-sr-only p-4 lg:sr-only">
        <div className="flex flex-row items-center gap-3">
          <div className="w-max p-2 rounded-full bg-indigo-600 text-white">
            <IoSchool size={30} />
          </div>
          <span className="text-lg font-semibold">InkaEdu360</span>
        </div>
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
          <img
            src="https://alfabetajuega.com/hero/2024/05/este-cosplay-de-nezuko-kamado-de-demon-slayer-es-lo-mejor-que-veras-en-mucho-tiempo.jpg?width=768&aspect_ratio=16:9&format=nowebp"
            alt="perfil"
            className="w-full max-w-[3rem] aspect-square object-cover rounded-full shadow-sm"
          />
        </div>
      </nav>
      {menuOpen && (
        <div
          className="absolute w-full p-4 not-sr-only sm:sr-only"
          ref={popupRef}
        >
          <div className="bg-white shadow-xl p-4">
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
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
