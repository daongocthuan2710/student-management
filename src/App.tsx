import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Login} from './features/auth/pages';
import {Admin} from './components/layout';
import { NotFound, PrivateRoute } from './components/common';

function App() {
  return ( 
    <> 
      <Switch>
        <Route path='/login' exact>
          <Login/>
        </Route>

        <PrivateRoute path='/admin'>
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
