import DeletePreRegistration from "./DeletePreRegistration";

export interface PreRegistration {
  id: string;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  degree: string;
}

interface UserTableProps {
  preRegistrations: PreRegistration[];
}

const PreRegistrationTable = ({ preRegistrations }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-[#161618] dark:divide-white/15">
        <thead className="text-gray-700 bg-gray-100 dark:bg-[#161618] dark:text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">#</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Nombres</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Apellidos
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Tipo de documento
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Numero de documento
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Correo electronico
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Numero de celular
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Grado</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/15">
          {preRegistrations.map(
            ({
              id,
              name,
              lastName,
              documentType,
              documentNumber,
              email,
              phone,
              degree,
            }) => (
              <tr
                key={id}
                className="text-gray-700 hover:bg-gray-50 dark:hover:bg-[#161618] dark:text-white/90"
              >
                <td className="px-4 text-sm">{id}</td>
                <td className="px-4 text-sm">{name}</td>
                <td className="p-4 text-sm">{lastName}</td>
                <td className="p-4 text-sm">{documentType}</td>
                <td className="p-4 text-sm">{documentNumber}</td>
                <td className="p-4 text-sm">{email}</td>
                <td className="p-4 text-sm">{phone}</td>
                <td className="p-4 text-sm">{degree}</td>
                <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2 ">
                  <DeletePreRegistration id={id} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreRegistrationTable;
