import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Storage } from '../../constants';

export interface PrivateRouteProps {
}

export function PrivateRoute (props: PrivateRouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem(Storage.ACCESS_TOKEN))
  if (!isLoggedIn) return <Redirect to='/login' />
 
  return <Route {...props} />;
}
