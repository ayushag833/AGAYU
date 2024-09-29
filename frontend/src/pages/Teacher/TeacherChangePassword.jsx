import ChangePassword from "../NormalUser/ChangePassword";
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
