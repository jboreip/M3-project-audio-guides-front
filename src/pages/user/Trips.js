import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';


class Trips extends Component {
  render() {
    return (
      <div>
        <h1>Trips</h1>
      </div>
    )
  }
}

export default withAuth(Trips);