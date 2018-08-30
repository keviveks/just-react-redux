import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignoutButton from './auth/Signout';
import * as routes from '../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    { authUser => authUser ?
        <NavigationoAuth /> :
        <NavigationNonoAuth />
    }
  </AuthUserContext.Consumer>

const NavigationoAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignoutButton /></li>
  </ul>

const NavigationNonoAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGNIN}>Sign In</Link></li>
  </ul>

export default Navigation;
