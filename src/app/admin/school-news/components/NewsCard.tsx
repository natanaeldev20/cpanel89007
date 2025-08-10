"use client";

import { FiEye } from "react-icons/fi";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import DeleteNews from "./DeleteNews";
import EditNews from "./EditNews";
import { News } from "../types/newsType";

const NewsCard = ({ id, title, content, imageUrl }: News) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

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
        className="m-auto bg-transparent p-4 w-full max-w-4xl rounded-2xl backdrop:bg-[#0009]"
        onClick={handleBackdrop}
      >
        <div className="rounded-2xl bg-white shadow-xl relative">
          <button
            className="p-2 bg-indigo-600 rounded-full text-white shadow-sm cursor-pointer absolute right-3 top-3"
            onClick={handleCloseModal}
          >
            <IoClose size={30} />
          </button>
          <div className="w-full p-8 pr-16 space-y-2">
            <h2 className="text-xl font-semibold break-words sm:text-2xl lg:text-3xl">
              {title}
            </h2>
            <p className="text-base break-words">{content}</p>
          </div>
          <figure>
            <img className="w-full rounded-b-2xl" src={imageUrl} alt={title} />
            <figcaption className="sr-only">{title}</figcaption>
          </figure>
        </div>
      </dialog>
      <article className="w-full rounded-2xl shadow-xl">
        <figure className="w-full relative flex items-center justify-center">
          <img
            className="w-full rounded-t-2xl object-cover aspect-video"
            src={imageUrl}
            alt={title}
          />
          <button
            className="absolute text-white cursor-pointer p-2 bg-indigo-600 rounded-full shadow-xl duration-300 transition-all hover:scale-[1.1]"
            onClick={handleOpenModal}
          >
            <FiEye size={45} />
          </button>
          <figcaption className="sr-only">{title}</figcaption>
        </figure>
        <div className="w-full p-4">
          <span className="text-lg truncate line-clamp-3  font-medium break-words">
            {title}
          </span>
        </div>
        <div className="w-full px-4 pb-4 flex flex-row items-center gap-4">
          <EditNews news={{ id, content, title, imageUrl }} />
          <DeleteNews id={id} />
        </div>
      </article>
    </>
  );
};

export default NewsCard;
