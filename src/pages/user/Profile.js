import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';


class Profile extends Component {
  render() {
    return (
      <div>
        {/* <h1>Welcome {this.props.user.name}</h1> */}
        <h1>Profile</h1>
      </div>
    )
  }
}

export default withAuth(Profile);