import DeleteAccount from "../AuthUser/DeleteAccount";
import StudentMenu from "./StudentMenu";

const StudentDelete = () => {
  return (
    <div className="flex">
      <StudentMenu />
      <DeleteAccount />
    </div>
  );
};

export default StudentDelete;
