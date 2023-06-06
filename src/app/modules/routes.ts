// Constants
import { ROUTES } from "../../constants/routes";

// Types
import { Routes } from "../../types/routes";

// Components
import { Dashboard } from "./Dashboard";
import { NotFound } from "./NotFound";
import { Test } from "./Test";
import { Login } from "./auth";

const layoutRoutes: Routes = [
  {
    key: ROUTES.HOME.key,
    name: ROUTES.HOME.name,
    path: ROUTES.HOME.path,
    exact: ROUTES.HOME.exact,
    isPrivate: ROUTES.HOME.isPrivate,
    component: Dashboard,
  },
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
    key: ROUTES.TEST.key,
    name: ROUTES.TEST.name,
    path: ROUTES.TEST.path,
    exact: ROUTES.TEST.exact,
    isPrivate: ROUTES.TEST.isPrivate,
    component: Test,
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
