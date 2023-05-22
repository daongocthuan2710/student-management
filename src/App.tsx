import React, { useEffect } from 'react';
import cityApi from './api/cityApi';
import { Route, Switch } from 'react-router-dom';
import {Login} from './features/auth/pages';
import {Admin} from './components/layout';
import { NotFound, PrivateRoute } from './components/common';
import { useAppDispatch } from './app/hooks';
import { Button } from 'antd';
import { authActions } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    cityApi.getAll().then(res => console.log(res));
  })
  return ( 
    <> 
    <Button onClick={() => dispatch(authActions.logout())}>Logout</Button>
      <Switch>
        <Route path='/login' exact>
          <Login/>
        </Route>

        <PrivateRoute>
          <Admin/>
        </PrivateRoute>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
