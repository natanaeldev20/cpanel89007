import { MdAppRegistration } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import GeneratePdfPreRegistration from "./GeneratePdfPreRegistration";
import GeneratePdfEvents from "./GeneratePdfEvents";
import GeneratePdfNews from "./GeneratePdfNews";
import GeneratePdfUsers from "./GeneratePdfUsers";

interface ReportCardProps {
  title: string;
  text: string;
  iconFrame: string;
  pdf: string;
  color: "bg-green-100" | "bg-orange-100" | "bg-purple-100" | "bg-gray-100";
}

const ReportCard = ({
  title,
  text,
  iconFrame,
  pdf,
  color,
}: ReportCardProps) => {
  const getIcon = (text: string) => {
    switch (text.toLowerCase()) {
      case "registration":
        return <MdAppRegistration size={25} color="green" />;
      case "events":
        return <MdOutlinePostAdd size={25} />;
      case "news":
        return <FaNewspaper size={25} color="violet" />;
      case "users":
        return <FaUsers size={25} color="orange" />;
      default:
        return null;
    }
  };

  const getPDF = (text: string) => {
    switch (text.toLowerCase()) {
      case "registration":
        return <GeneratePdfPreRegistration />;
      case "events":
        return <GeneratePdfEvents />;
      case "news":
        return <GeneratePdfNews />;
      case "users":
        return <GeneratePdfUsers />;
    }
  };

  return (
    <article className="w-full bg-white shadow-2xs p-4 rounded-lg flex flex-col justify-between gap-8">
      <div className="w-full flex flex-row gap-2">
        <div className="w-full">
          <span className="text-lg font-medium">{title}</span>
          <p className="text-gray-700 text-base">{text}</p>
        </div>
        <div>
          <div className={`w-max p-2 ${color} rounded-full`}>
            {getIcon(iconFrame)}
          </div>
        </div>
      </div>
      <div>{getPDF(pdf)}</div>
    </article>
  );
};

export default ReportCard;
