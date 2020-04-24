import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Admin from './components/auth/Admin';
import AdminLogin from './components/auth/AdminLogin';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from "./actions/auth";
import Registered from './components/layout/Registered';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
<Provider store = {store}>
<Router>
<Fragment>
      <Navbar />
      <Route exact path = '/' component={Landing}/ >
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registered" component={Registered} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      </section>
    </Fragment>
</Router>
</Provider>
)};
export default App;
