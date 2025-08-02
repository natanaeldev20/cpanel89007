"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const BaseLink = ({ href, children }: LinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={clsx(
        "w-full flex flex-row items-center justify-center  gap-3 p-4 text-base rounded-lg transition-all duration-200 md:justify-start",
        {
          "bg-indigo-600 text-white shadow-lg": isActive,
          "bg-transparent text-indigo-600 hover:bg-indigo-100": !isActive,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
