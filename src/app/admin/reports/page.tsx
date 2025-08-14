import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/ui/Section";
import { HiOutlineDocumentReport } from "react-icons/hi";
import ReportCard from "./components/ReportCard";

const Reports = () => {
  return (
    <>
      <SectionHeader>
        Reportes
        <HiOutlineDocumentReport />
      </SectionHeader>
      <Section>
        <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
          <ReportCard
            title="Reporte de usuarios"
            text="Informe detallado de todos los usuarios"
            iconFrame="users"
            pdf="users"
            color="bg-orange-100"
          />
          <ReportCard
            title="Reporte de preinscripciones"
            text="Informe detallado de los datos de las personas interesadas en matricularse"
            iconFrame="registration"
            pdf="registration"
            color="bg-green-100"
          />
          <ReportCard
            title="Reporte de noticias"
            text="Informe detallado de todos las noticias"
            iconFrame="news"
            pdf="news"
            color="bg-purple-100"
          />
          <ReportCard
            title="Reporte de eventos"
            text="Informe detallado de todos los eventos"
            iconFrame="events"
            pdf="events"
            color="bg-gray-100"
          />
        </div>
      </Section>
    </>
  );
};

export default Reports;
