// Constants

// Types
import { ROUTES } from "../../../../../constants/routes";
import { Routes } from "../../../../../types/routes";
import CreateNewStudent from "./containers/CreateNewStudent";
import StudentTable from "./containers/Table";
import UpdateStudentInfo from "./containers/UpdateStudentInfo";

// Components

const studentManagementRoutes: Routes = [
  {
    key: ROUTES.STUDENT_CREATE.key,
    name: ROUTES.STUDENT_CREATE.name,
    path: ROUTES.STUDENT_CREATE.path,
    exact: ROUTES.STUDENT_CREATE.exact,
    isPrivate: ROUTES.STUDENT_CREATE.isPrivate,
    component: CreateNewStudent,
  },
  {
    key: ROUTES.STUDENT_UPDATE.key,
    name: ROUTES.STUDENT_UPDATE.name,
    path: ROUTES.STUDENT_UPDATE.path,
    exact: ROUTES.STUDENT_UPDATE.exact,
    isPrivate: ROUTES.STUDENT_UPDATE.isPrivate,
    component: UpdateStudentInfo,
  },

  // Must be finally called because when the path don't match the above ones, it will redirect to this component
  {
    key: ROUTES.STUDENT.key,
    name: ROUTES.STUDENT.name,
    path: ROUTES.STUDENT.path,
    exact: ROUTES.STUDENT.exact,
    isPrivate: ROUTES.STUDENT.isPrivate,
    component: StudentTable,
  },
];

export default studentManagementRoutes;
