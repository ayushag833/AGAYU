import Profile from "../AuthUser/Profile";
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
