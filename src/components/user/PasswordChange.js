import React, { Component } from 'react';

import { auth } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { password } = this.state;
    auth.update(password)
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
      password,
      confirmPassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <input type="password"
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            placeholder="New Password"
          />
        </div>
        <div>
          <input type="password"
            value={confirmPassword}
            onChange={event => this.setState(byPropKey('confirmPassword', event.target.value))}
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button disabled={isInvalid} type="submit">
            Reset My Password
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
