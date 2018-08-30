import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignupPage from './auth/Signup';
import SigninPage from './auth/Signin';
import ForgotPage from './auth/Forgot';
import AccountPage from './user/Account';
import HomePage from './home/Home';

const App = () =>
  <Router>
    <div>
      <Navigation />
      <hr/>

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGNUP} component={() => <SignupPage />} />
      <Route exact path={routes.SIGNIN} component={() => <SigninPage />} />
      <Route exact path={routes.FORGOT} component={() => <ForgotPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>


export default withAuthentication(App);
