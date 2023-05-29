import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import StudentPage from './StudentPage';
import CreateNewStudent from './createNewStudent';
import EditStudent from './editStudent';



export default function StudentRoute() {
  return ( 
    <Switch>
      <Route path='/admin/students/listing'>
        <StudentPage />
      </Route>
      <Route path='/admin/students/create-new-student'>
        <CreateNewStudent />
      </Route>
      <Route path='/admin/students/edit-student/:id'>
        <EditStudent />
      </Route>
      <Redirect to="/admin/students/listing" />
    </Switch>
  );
};
