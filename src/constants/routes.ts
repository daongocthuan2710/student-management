export const ROUTES = {
  HOME: {
    key: "home",
    name: "Home",
    path: "/",
    exact: true,
    isPrivate: false,
  },
  LOGIN: {
    key: "login",
    name: "Login",
    path: "/login",
    exact: true,
    isPrivate: false,
  },
  DASHBOARD: {
    key: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    exact: false,
    isPrivate: true,
  },

  // Student
  STUDENT: {
    key: "student",
    name: "Students",
    path: "/dashboard/students",
    exact: false,
    isPrivate: true,
  },
  STUDENT_CREATE: {
    key: "create-new-student",
    name: "Create New Student",
    path: "/dashboard/students/create-new-student",
    exact: false,
    isPrivate: true,
  },
  STUDENT_UPDATE: {
    key: "edit-student",
    name: "Edit Student",
    path: "/dashboard/students/update-student/:id",
    exact: false,
    isPrivate: true,
  },

  // DashboardTemp
  DASHBOARD_NESTED: {
    key: "dashboardNested",
    name: "Dashboard Nested",
    path: "/dashboard/dashboard-nested",
    exact: false,
    isPrivate: true,
  },

  // Counter
  COUNTER: {
    key: "counter",
    name: "Counter",
    path: "/dashboard/counter",
    exact: false,
    isPrivate: true,
  },

  // Todo List
  TODOLIST: {
    key: "todoList",
    name: "Todo List",
    path: "/dashboard/todolist",
    exact: false,
    isPrivate: true,
  },

  TEST: {
    key: "test",
    name: "Test",
    path: "/test",
    exact: false,
    isPrivate: false,
  },

  NOT_FOUND: {
    key: "notFound",
    name: "Not Found",
    path: "/not-found",
    exact: false,
    isPrivate: false,
  },
};
