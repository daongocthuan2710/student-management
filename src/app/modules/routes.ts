// Constants
import { ROUTES } from "../../constants/routes";

// Types
import { Routes } from "../../types/routes";

// Components
import { Dashboard } from "./Dashboard";
import { NotFound } from "./NotFound";
import { Login } from "./auth";

const layoutRoutes: Routes = [
  {
    key: ROUTES.LOGIN.key,
    name: ROUTES.LOGIN.name,
    path: ROUTES.LOGIN.path,
    exact: ROUTES.LOGIN.exact,
    isPrivate: ROUTES.LOGIN.isPrivate,
    component: Login,
  },
  {
    key: ROUTES.DASHBOARD.key,
    name: ROUTES.DASHBOARD.name,
    path: ROUTES.DASHBOARD.path,
    exact: ROUTES.DASHBOARD.exact,
    isPrivate: ROUTES.DASHBOARD.isPrivate,
    component: Dashboard,
  },
  {
    key: ROUTES.NOT_FOUND.key,
    name: ROUTES.NOT_FOUND.name,
    path: ROUTES.NOT_FOUND.path,
    exact: ROUTES.NOT_FOUND.exact,
    isPrivate: ROUTES.NOT_FOUND.isPrivate,
    component: NotFound,
  },
];

export default layoutRoutes;
