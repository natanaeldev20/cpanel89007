import EditVision from "./EditVision";

interface Vision {
  id: string;
  content: string;
}

interface VisionTableProps {
  vision: Vision[];
}

const VisionTable = ({ vision }: VisionTableProps) => {
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
          {vision.map((vision) => (
            <tr key={vision.id} className="hover:bg-gray-50">
              <td className="px-4 text-sm text-gray-700">{vision.id}</td>
              <td className="p-4 text-sm text-gray-700 truncate line-clamp-3 break-words">
                {vision.content}
              </td>
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2">
                <EditVision vision={vision} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisionTable;
