// Constants
import { ROUTES } from "../../../constants/routes";

// Types
import { Routes } from "../../../types/routes";

// Components
import StudentManagement from "./containers/StudentManagement";
import Counter from "./containers/counter/Counter";
import DashboardTemp from "./containers/dasboardTemp";

const dashboardRoutes: Routes = [
  {
    key: ROUTES.STUDENT.key,
    name: ROUTES.STUDENT.name,
    path: ROUTES.STUDENT.path,
    exact: ROUTES.STUDENT.exact,
    isPrivate: ROUTES.STUDENT.isPrivate,
    component: StudentManagement,
  },
  {
    key: ROUTES.DASHBOARD_NESTED.key,
    name: ROUTES.DASHBOARD_NESTED.name,
    path: ROUTES.DASHBOARD_NESTED.path,
    exact: ROUTES.DASHBOARD_NESTED.exact,
    isPrivate: ROUTES.DASHBOARD_NESTED.isPrivate,
    component: DashboardTemp,
  },
  {
    key: ROUTES.COUNTER.key,
    name: ROUTES.COUNTER.name,
    path: ROUTES.COUNTER.path,
    exact: ROUTES.COUNTER.exact,
    isPrivate: ROUTES.COUNTER.isPrivate,
    component: Counter,
  },
];

export default dashboardRoutes;
