import ChangePassword from "../AuthUser/ChangePassword";
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
