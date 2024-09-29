import DeleteAccount from "../NormalUser/DeleteAccount";
import TeacherMenu from "./TeacherMenu";

const TeacherDelete = () => {
  return (
    <div className="flex">
      <TeacherMenu />
      <DeleteAccount />
    </div>
  );
};

export default TeacherDelete;
