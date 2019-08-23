import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import SpotsMap from '../../components/Discover/map/SpotsMap.js';


class Discover extends Component {
  render() {
    return (
      <React.Fragment>
        <SpotsMap props={this.props}/>
      </React.Fragment>
    )
  }
}

export default withAuth(Discover);