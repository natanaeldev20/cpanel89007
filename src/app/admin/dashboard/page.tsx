import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/ui/Section";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import NumberCard from "@/components/ui/NumberCard";
import { FaUsers } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
import { getCountUser } from "../users/services/authService";
import { getCountPreRegistration } from "../pre-registration/services/preRegistrationService";
import { getCountNews } from "../school-news/services/newsService";
import { getCountEvents } from "../school-events/services/eventService";
import { getMission } from "./services/missionService";
import MissionTable from "./components/MissionTable";
import { getVision } from "./services/visionService";
import VisionTable from "./components/VisionTable";
import { ToastContainer } from "react-toastify";
import { getAuthority } from "./services/authorityService";
import AuthorityCard from "./components/AuthorityCard";
import CreateAuthority from "./components/CreateAuthority";

const Dashboard = async () => {
  const numberUsers = await getCountUser();
  const numberPreRegistrations = await getCountPreRegistration();
  const numberNews = await getCountNews();
  const numberEvents = await getCountEvents();
  const mission = await getMission();
  const vision = await getVision();
  const authority = await getAuthority();

  return (
    <>
      <SectionHeader>
        Dashboard
        <MdOutlineDashboardCustomize />
      </SectionHeader>
      <Section>
        <div className="w-full pb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <NumberCard
            title="Usuarios"
            borderColor="border-amber-500"
            backgroundIcon="bg-amber-100"
            count={numberUsers}
          >
            <FaUsers size={25} color="orange" />
          </NumberCard>
          <NumberCard
            count={numberPreRegistrations}
            borderColor="border-green-500"
            backgroundIcon="bg-green-100"
            title="Usuarios interesados"
          >
            <MdOutlineFamilyRestroom size={25} color="green" />
          </NumberCard>
          <NumberCard
            title="Noticias"
            borderColor="border-violet-500"
            backgroundIcon="bg-violet-100"
            count={numberNews}
          >
            <FaNewspaper size={22} color="violet" />
          </NumberCard>
          <NumberCard
            backgroundIcon="bg-blue-100"
            borderColor="border-blue-500"
            title="Eventos"
            count={numberEvents}
          >
            <MdOutlinePostAdd size={22} />
          </NumberCard>
        </div>
        <div className="w-full flex justify-between mb-8 flex-col space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Misión y visión</h2>
            <p>Administra una visión y misión a la institución educativa.</p>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="border-l-4 pl-2 border-orange-600 font-medium text-lg mb-4">
                Misión:
              </h3>
              <MissionTable mission={mission} />
            </div>
            <div>
              <h3 className="border-l-4 pl-2 border-green-600 font-medium text-lg mb-4">
                Visión:
              </h3>
              <VisionTable vision={vision} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-8 flex-col gap-4 sm:gap-0 sm:items-center sm:flex-row">
            <div>
              <h2 className="text-lg font-semibold">Lista de autoridades</h2>
              <p>Gestiona los datos de las autoridades de la institucion.</p>
            </div>
            <CreateAuthority />
          </div>
          <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {authority.map(({ id, name, lastName, rol, imageUrl, message }) => (
              <AuthorityCard
                key={id}
                id={id}
                name={name}
                lastName={lastName}
                rol={rol}
                imageUrl={imageUrl}
                message={message}
              />
            ))}
          </div>
        </div>
      </Section>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
