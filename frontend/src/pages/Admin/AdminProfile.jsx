import Profile from "../NormalUser/Profile";
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
