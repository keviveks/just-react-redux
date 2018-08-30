import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignoutButton from './auth/Signout';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
      ? <NavigationoAuth />
      : <NavigationNonoAuth />
    }
  </div>

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

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
