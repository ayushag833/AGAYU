import DeleteAccount from "../AuthUser/DeleteAccount";
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
