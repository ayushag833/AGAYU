import DeleteAccount from "../NormalUser/DeleteAccount";
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
