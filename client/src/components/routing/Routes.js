import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NotFound from '../layout/NotFound';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Admin from '../auth/Admin';
import AdminLogin from '../auth/AdminLogin';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import Registered from '../layout/Registered';
import Posts from '../posts/Posts';
import Post from '../post/Post';

const Routes = () => {
    return (
        <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route exact path="/registered" component={Registered} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      </section>
    );
};

export default Routes;
