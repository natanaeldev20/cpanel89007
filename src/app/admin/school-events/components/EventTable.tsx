import { Event } from "../types/eventType";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";

interface UserTableProps {
  events: Event[];
}

const EventTable = ({ events }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-[#161618] dark:divide-white/15">
        <thead className="bg-gray-100 text-gray-700 dark:bg-[#161618] dark:text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">#</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Título</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Descripción
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Ubicación
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Fecha de inicio
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              fecha de culminación
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/15">
          {events.map((event) => (
            <tr
              key={event.id}
              className="text-gray-700 hover:bg-gray-50 dark:hover:bg-[#161618] dark:text-white/90"
            >
              <td className="px-4 text-sm">{event.id}</td>
              <td className="p-4 text-sm">{event.title}</td>
              <td className="p-4 text-sm">{event.description}</td>
              <td className="p-4 text-sm">{event.location}</td>
              <td className="p-4 text-sm">
                {new Date(event.startDate).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4 text-sm">
                {new Date(event.endDate).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4 text-sm flex flex-row items-center gap-2">
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
