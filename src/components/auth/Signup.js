import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { auth, db } from '../../firebase';

const SignupPage = ({ history }) =>
  <div>
    <h1>Signup Page</h1>
    <SignupForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

const byPropKey = (key, value) => () => ({
  [key]: value,
});

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.signup(email, password)
      .then(authUser => {
        db.createUser(authUser.user.uid, username, email)
          .then((res) => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            placeholder="Full Name"
          />
        </div>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={event => this.setState(byPropKey('confirmPassword', event.target.value))}
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isInvalid}
          >
            Sign Up
          </button>
        </div>

        <div>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignupLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGNUP}>Signup</Link>
  </p>

export default withRouter(SignupPage);

export {
  SignupForm,
  SignupLink,
};
