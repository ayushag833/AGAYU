import ChangePassword from "../AuthUser/ChangePassword";
import StudentMenu from "./StudentMenu";

const StudentChangePassword = () => {
  return (
    <div className="flex">
      <StudentMenu />
      <ChangePassword />
    </div>
  );
};

export default StudentChangePassword;
