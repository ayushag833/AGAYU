import Profile from "../NormalUser/Profile";
import TeacherMenu from "./TeacherMenu";

const TeacherProfile = () => {
  return (
    <div className="flex">
      <TeacherMenu />
      <Profile />
    </div>
  );
};

export default TeacherProfile;
