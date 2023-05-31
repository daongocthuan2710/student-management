import React from "react";

//  Navigation
import { Switch } from "react-router-dom";

// Components
import PrivateRoute from "../../../../components/common/PrivateRoute";

// Constants
import studentManagementRoutes from "./routes";

export default function StudentManagement() {
  return (
    <Switch>
      {studentManagementRoutes.map((route) => {
        const { exact, path, component, key } = route;
        return (
          <PrivateRoute
            key={key}
            path={path}
            exact={exact}
            component={component}
          />
        );
      })}
    </Switch>
  );
}
