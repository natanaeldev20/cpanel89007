"use client";

import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import { autoTable } from "jspdf-autotable";
import { getUsers } from "../../users/services/authService";
import { toast } from "react-toastify";

const GeneratePdfUsers = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const users = await getUsers();
    if (!users || users.length === 0) {
      toast.error("No hay usuarios para hacer un reporte", {
        position: "top-right",
      });
      return;
    }
    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Usuarios", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableColumn = [
      "ID",
      "Nombre",
      "Apellido",
      "Nombre de usuario",
      "Correo electronico",
      "Telefono",
    ];

    const tableRows = users.map((user) => [
      user.id.toString(),
      user.firsName,
      user.lastName,
      user.username,
      user.email,
      user.phone,
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

    doc.save("reporte_usuarios.pdf");
    toast.success("Reporte de usuarios creado con exito", {
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

export default GeneratePdfUsers;
