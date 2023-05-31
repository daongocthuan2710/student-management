import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { STORAGE } from "../../../constants/storage";

export interface PrivateRouteProps extends RouteProps {}

export default function PrivateRoute(props: PrivateRouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(STORAGE.ACCESS_TOKEN));

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}
