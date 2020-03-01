import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound'
// User is LoggedIn
import PrivateRoute from './PrivateRoute'
import Dashboard from './views/User/Dashboard/Dashboard';
import Profile from './views/Profile/Profile';
import UserDetail from './views/User/Users/UserDetail';
const Main = () => (
<Switch>
  {/*User might LogIn*/}
  <Route exact path='/' component={Home}/>
  {/*User will LogIn*/}
  <Route path='/login' component={Login}/>
  {/* User is LoggedIn*/}
  <PrivateRoute path='/dashboard' component={Dashboard}/>
  {/* User will edit profile*/}
  <PrivateRoute path='/profile' component={Profile}/>
  {/* User will see list of other users*/}
  <PrivateRoute path='/userdetail' component={UserDetail}/>
  {/*Page Not Found*/}
  <Route component={NotFound}/>
</Switch>
);
export default Main;