import DeletePreRegistration from "./DeletePreRegistration";

export interface PreRegistrationProps {
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
  preRegistrations: PreRegistrationProps[];
}

const PreRegistrationTable = ({ preRegistrations }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Nombres
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Apellidos
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Tipo de documento
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Numero de documento
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Correo electronico
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Numero de celular
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Grado
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
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
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-4 text-sm text-gray-700">{id}</td>
                <td className="px-4 text-sm text-gray-700">{name}</td>
                <td className="p-4 text-sm text-gray-700">{lastName}</td>
                <td className="p-4 text-sm text-gray-700">{documentType}</td>
                <td className="p-4 text-sm text-gray-700">{documentNumber}</td>
                <td className="p-4 text-sm text-gray-700">{email}</td>
                <td className="p-4 text-sm text-gray-700">{phone}</td>
                <td className="p-4 text-sm text-gray-700">{degree}</td>
                <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2">
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
