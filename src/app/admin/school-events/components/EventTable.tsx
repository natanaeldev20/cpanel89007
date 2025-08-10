import { Event } from "../types/eventType";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";

interface UserTableProps {
  events: Event[];
}

const EventTable = ({ events }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Título
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Descripción
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Ubicación
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Fecha de inicio
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              fecha de culminación
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-4 text-sm text-gray-700">{event.id}</td>
              <td className="p-4 text-sm text-gray-700">{event.title}</td>
              <td className="p-4 text-sm text-gray-700">{event.description}</td>
              <td className="p-4 text-sm text-gray-700">{event.location}</td>
              <td className="p-4 text-sm text-gray-700">
                {new Date(event.startDate).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4 text-sm text-gray-700">
                {new Date(event.endDate).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2">
                <DeleteEvent id={event.id} />
                <EditEvent events={event} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
