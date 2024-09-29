import ChangePassword from "../NormalUser/ChangePassword";
import AdminMenu from "./AdminMenu";

const AdminChangePassword = () => {
  return (
    <div className="flex">
      <AdminMenu />
      <ChangePassword />
    </div>
  );
};

export default AdminChangePassword;
