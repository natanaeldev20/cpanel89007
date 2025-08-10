import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaUsers } from "react-icons/fa";
import CreateButton from "@/app/admin/users/components/CreateUser";
import { ToastContainer } from "react-toastify";
import { getUsers, getCountUser } from "./services/authService";
import UserTable from "./components/UserTable";
import NumberCard from "@/components/ui/NumberCard";

const Users = async () => {
  const users = await getUsers();
  const numberUsers = await getCountUser();

  return (
    <>
      <SectionHeader>
        Gestión de Usuarios <FaUsers />
      </SectionHeader>
      <Section>
        <div className="w-full mb-8">
          <NumberCard
            title="Usuarios"
            borderColor="border-amber-500"
            backgroundIcon="bg-amber-100"
            count={numberUsers}
          >
            <FaUsers size={25} color="orange" />
          </NumberCard>
        </div>
        <div className="flex justify-between mb-8 flex-col gap-4 sm:gap-0 sm:items-center sm:flex-row">
          <div>
            <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
            <p>Administra los datos de los usarios.</p>
          </div>
          <CreateButton />
        </div>
        <UserTable users={users} />
      </Section>
      <ToastContainer />
    </>
  );
};

export default Users;
