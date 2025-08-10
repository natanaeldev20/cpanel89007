export const dynamic = "force-dynamic";

import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/ui/Section";
import { MdOutlinePostAdd } from "react-icons/md";
import NumberCard from "@/components/ui/NumberCard";
import { getCountEvents, getEvents } from "./services/eventService";
import CreateEvent from "./components/CreateEvent";
import { ToastContainer } from "react-toastify";
import EventTable from "./components/EventTable";
export const revalidate = 0;

const SchoolEvents = async () => {
  const numberEvents = await getCountEvents();
  const events = await getEvents();

  return (
    <>
      <SectionHeader>
        Gestión de Eventos
        <MdOutlinePostAdd size={22} />
      </SectionHeader>
      <Section>
        <div className="pb-8">
          <NumberCard
            backgroundIcon="bg-blue-100"
            borderColor="border-blue-500"
            title="Eventos"
            count={numberEvents}
          >
            <MdOutlinePostAdd size={22} />
          </NumberCard>
        </div>
        <div className="flex justify-between mb-8 flex-col gap-4 sm:gap-0 sm:items-center sm:flex-row">
          <div>
            <h2 className="text-lg font-semibold">Lista de Eventos</h2>
            <p>Administra los datos de los eventos.</p>
          </div>
          <CreateEvent />
        </div>
        <EventTable events={events} />
      </Section>
      <ToastContainer />
    </>
  );
};

export default SchoolEvents;
