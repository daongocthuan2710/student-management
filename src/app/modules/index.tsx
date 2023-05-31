import React from "react";

// Navigation
import { Redirect, Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "../components/common/PrivateRoute";

// Routes
import layoutRoutes from "./routes";
import { NotFound } from "./NotFound";

function App() {
  return (
    <Switch>
      {layoutRoutes.map((route) => {
        const { exact, path, component, isPrivate, key } = route;

        if (isPrivate) {
          return (
            <PrivateRoute
              key={key}
              path={path}
              exact={exact}
              component={component}
            />
          );
        }
        return (
          <Route key={key} path={path} exact={exact} component={component} />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
