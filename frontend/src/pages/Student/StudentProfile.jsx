import Profile from "../NormalUser/Profile";
import StudentMenu from "./StudentMenu";

const StudentProfile = () => {
  return (
    <div className="flex">
      <StudentMenu />
      <Profile />
    </div>
  );
};

export default StudentProfile;
