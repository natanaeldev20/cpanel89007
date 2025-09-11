import EditAuthority from "./EditAuthority";

interface Authority {
  id: string;
  imageUrl: string;
  name: string;
  lastName: string;
  rol: string;
  message: string;
}

const AuthorityCard = ({
  id,
  imageUrl,
  name,
  lastName,
  rol,
  message,
}: Authority) => {
  return (
    <>
      <article className="w-full rounded-2xl shadow-xl dark:bg-white/10">
        <figure className="w-full flex items-center justify-center">
          <img
            className="w-full rounded-t-2xl object-cover aspect-square"
            src={imageUrl}
            alt={name}
          />
          <figcaption className="sr-only">{name}</figcaption>
        </figure>
        <div className="w-full p-4">
          <span className="text-lg truncate line-clamp-3 font-semibold break-words">
            {name} {lastName}
          </span>
          <span className="text-sm truncate line-clamp-3  font-medium break-words">
            {rol}
          </span>
        </div>
        <div className="w-full px-4 pb-4 flex flex-row items-center gap-4">
          <EditAuthority
            authority={{ id, name, rol, lastName, message, imageUrl }}
          />
        </div>
      </article>
    </>
  );
};

export default AuthorityCard;
