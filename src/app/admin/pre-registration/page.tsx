import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/ui/Section";
import { MdAppRegistration } from "react-icons/md";
import CreatePreRegistration from "./components/CreatePreRegistration";
import { ToastContainer } from "react-toastify";
import NumberCard from "@/components/ui/NumberCard";
import { countPreRegistration } from "./services/preRegistrationService";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import PreRegistrationTable from "./components/PreRegistrationTable";
import { getPreRegistration } from "./services/preRegistrationService";

const PreRegistration = async () => {
  const countPreRegistrations = await countPreRegistration();
  const preRegistrations = await getPreRegistration();

  return (
    <>
      <SectionHeader>
        Preinscripciones <MdAppRegistration size={25} />
      </SectionHeader>
      <Section>
        <div className="pb-8">
          <NumberCard
            count={countPreRegistrations}
            borderColor="border-green-500"
            backgroundIcon="bg-green-100"
            title="Usuarios interesados"
          >
            <MdOutlineFamilyRestroom size={25} color="green" />
          </NumberCard>
        </div>
        <div className="flex justify-between mb-8 flex-col gap-4 sm:gap-0 sm:items-center sm:flex-row">
          <div>
            <h2 className="text-lg font-semibold">
              Lista de usuarios interesados para matricularse
            </h2>
            <p>Visualiza los datos de los usuarios interesados.</p>
          </div>
          <CreatePreRegistration />
        </div>
        <PreRegistrationTable preRegistrations={preRegistrations} />
      </Section>
      <ToastContainer />
    </>
  );
};

export default PreRegistration;
