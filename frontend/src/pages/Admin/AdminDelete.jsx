import DeleteAccount from "../NormalUser/DeleteAccount";
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
