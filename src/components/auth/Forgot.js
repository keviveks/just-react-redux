import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const ForgotPage = () =>
  <div>
    <h1>Password Forget Page</h1>
    <PasswordForgotForm />
  </div>
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.reset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error
    } = this.state;

    const isInvalid = email === '';

    return (
      <form>
        <div>
          <input type="text"
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            placeholder="Email Address"
          />
        </div>
        <div>
          <button type="submit" disabled={isInvalid}>
            Reset My Password
          </button>
        </div>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.FORGOT}>Forgot Password?</Link>
  </p>

export default ForgotPage;

export {
  PasswordForgotForm,
  PasswordForgetLink,
};
