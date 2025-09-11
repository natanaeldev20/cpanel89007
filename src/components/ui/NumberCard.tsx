"use client";

type Color =
  | "border-amber-500"
  | "border-blue-500"
  | "border-green-500"
  | "border-pink-500"
  | "border-yellow-500"
  | "border-violet-500"
  | "border-red-500";

type ColorIcon =
  | "bg-amber-100"
  | "bg-blue-100"
  | "bg-green-100"
  | "bg-pink-100"
  | "bg-yellow-100"
  | "bg-violet-100"
  | "bg-red-100";

interface NumberCardProps {
  children: React.ReactNode;
  count: number;
  title: string;
  borderColor: Color;
  backgroundIcon: ColorIcon;
}

const NumberCard = ({
  children,
  count,
  title,
  borderColor,
  backgroundIcon,
}: NumberCardProps) => {
  return (
    <article
      className={`w-full rounded-lg bg-white shadow-sm p-4 py-6 border-l-5 ${borderColor} flex flex-row items-center justify-between transition-all duration-200 hover:shadow-lg dark:bg-white/15 sm:max-w-[18rem]`}
    >
      <div className="flex flex-col">
        <span className="text-base font-medium text-gray-600 dark:text-white">
          {title}
        </span>
        <span className="text-lg font-bold">{count.toString()}</span>
      </div>
      <div className={`p-2 ${backgroundIcon} rounded-full`}>{children}</div>
    </article>
  );
};

export default NumberCard;
