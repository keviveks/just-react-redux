import React, { Component } from 'react';

import withAuthorization from "../withAuthorization";
import { db } from '../../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }

  componentDidMount() {
    db.getUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <p>Home page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Users</h2>
    <p>saved in firebase database</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
