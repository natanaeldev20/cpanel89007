import EditMission from "./EditMission";

interface Mission {
  id: string;
  content: string;
}

interface MissionTableProps {
  mission: Mission[];
}

const MissionTable = ({ mission }: MissionTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Contenido
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mission.map((mission) => (
            <tr key={mission.id} className="hover:bg-gray-50">
              <td className="px-4 text-sm text-gray-700">{mission.id}</td>
              <td className="p-4 text-sm text-gray-700 truncate line-clamp-3 break-words">
                {mission.content}
              </td>
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2">
                <EditMission mission={mission} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionTable;
