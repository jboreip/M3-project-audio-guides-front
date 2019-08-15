import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import withCoordinates from '../../components/Location/withCoordinates';

class Discover extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
      </div>
    )
  }
}

export default withCoordinates(withAuth(Discover));