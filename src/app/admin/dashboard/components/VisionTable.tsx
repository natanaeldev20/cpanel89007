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
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-[#161618]">
        <thead className="bg-gray-100 dark:bg-[#161618]">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
              Contenido
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {vision.map((vision) => (
            <tr
              key={vision.id}
              className="hover:bg-gray-50 dark:hover:bg-[#161618]"
            >
              <td className="px-4 text-sm text-gray-700 dark:text-white">
                {vision.id}
              </td>
              <td className="p-4 text-sm text-gray-700 truncate line-clamp-3 break-words dark:text-white">
                {vision.content}
              </td>
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2 dark:text-white">
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
