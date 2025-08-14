"use client";

import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import { autoTable } from "jspdf-autotable";
import { getPreRegistration } from "../../pre-registration/services/preRegistrationService";
import { toast } from "react-toastify";

const GeneratePdfPreRegistration = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const preRegistration = await getPreRegistration();
    if (!preRegistration || preRegistration.length === 0) {
      toast.error("No hay registros para hacer un reporte", {
        position: "top-right",
      });
      return;
    }
    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Registros", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = [
      "ID",
      "Nombre",
      "Apellido",
      "Tipo de documento",
      "Numero de documento",
      "Correo electronico",
      "Telefono",
      "Grado",
    ];

    const tableRows = preRegistration.map((re) => [
      re.id.toString(),
      re.name,
      re.lastName,
      re.documentType,
      re.documentNumber,
      re.email,
      re.phone,
      re.degree,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    doc.save("reporte_registros.pdf");
    toast.success("Reporte de registros creado con exito", {
      position: "top-right",
    });
  };

  return (
    <button
      className="w-full bg-red-100 text-red-600 cursor-pointer p-4 rounded-lg shadow-2xs font-medium flex flex-row items-center justify-center gap-3"
      onClick={generatePDF}
    >
      <FaFilePdf size={22} />
      PDF
    </button>
  );
};

export default GeneratePdfPreRegistration;
