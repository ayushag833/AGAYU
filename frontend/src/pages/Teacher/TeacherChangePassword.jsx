import ChangePassword from "../AuthUser/ChangePassword";
import TeacherMenu from "./TeacherMenu";

const TeacherChangePassword = () => {
  return (
    <div className="flex">
      <TeacherMenu />
      <ChangePassword />
    </div>
  );
};

export default TeacherChangePassword;
