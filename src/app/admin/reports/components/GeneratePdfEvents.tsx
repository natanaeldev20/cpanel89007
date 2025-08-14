"use client";

import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import { autoTable } from "jspdf-autotable";
import { getEvents } from "../../school-events/services/eventService";
import { toast } from "react-toastify";

const GeneratePdfEvents = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const events = await getEvents();
    if (!events || events.length === 0) {
      toast.error("No hay eventos para hacer un reporte", {
        position: "top-right",
      });
      return;
    }

    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Eventos", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = [
      "ID",
      "Titulo",
      "Descripcion",
      "Ubicacion",
      "Fecha de inicio",
      "Fecha de fin",
    ];

    const formatoFecha = (fecha: string) => {
      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(fecha));
    };

    const tableRows = events.map((event) => [
      event.id.toString(),
      event.title,
      event.description,
      event.location,
      formatoFecha(event.startDate),
      formatoFecha(event.endDate),
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

    doc.save("reporte_eventos.pdf");
    toast.success("Reporte de eventos creado con exito", {
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

export default GeneratePdfEvents;
