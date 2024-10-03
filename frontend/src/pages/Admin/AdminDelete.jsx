import DeleteAccount from "../AuthUser/DeleteAccount";
import AdminMenu from "./AdminMenu";

const AdminDelete = () => {
  return (
    <div className="flex">
      <AdminMenu />
      <DeleteAccount />
    </div>
  );
};

export default AdminDelete;
