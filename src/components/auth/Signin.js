import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { PasswordForgetLink } from './Forgot';
import { SignupLink } from './Signup';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SigninPage = ({ history }) =>
  <div>
    <h1>Signin Page</h1>
    <SigninForm history={history} />
    <SignupLink />
    <PasswordForgetLink />
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const byPropKey = (key, value) => () => ({
  [key]: value,
});

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.signin(email, password)
      .then(authUser => {
        console.log('---LOGGED IN USER---');
        console.log(authUser);
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            placeholder="Email Address"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            placeholder="Password"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isInvalid}
          >
            Sign In
          </button>
        </div>

        <div>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

export default withRouter(SigninPage);

export {
  SigninForm,
}
