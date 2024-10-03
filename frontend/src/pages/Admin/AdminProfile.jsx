import Profile from "../AuthUser/Profile";
import AdminMenu from "./AdminMenu";

const AdminProfile = () => {
  return (
    <div className="flex">
      <AdminMenu />
      <Profile />
    </div>
  );
};

export default AdminProfile;
