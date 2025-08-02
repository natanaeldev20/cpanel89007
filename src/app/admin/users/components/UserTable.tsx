import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

export interface User {
  id: string;
  firsName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
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
              Usuario
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Teléfono
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 text-sm text-gray-700">{user.id}</td>
              <td className="p-4 text-sm text-gray-700">{user.firsName}</td>
              <td className="p-4 text-sm text-gray-700">{user.lastName}</td>
              <td className="p-4 text-sm text-gray-700">{user.username}</td>
              <td className="p-4 text-sm text-gray-700">{user.email}</td>
              <td className="p-4 text-sm text-gray-700">{user.phone}</td>
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center gap-2">
                <EditUser user={user} />
                <DeleteUser userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
