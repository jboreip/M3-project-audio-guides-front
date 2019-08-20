import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import SpotsMap from '../../components/Discover/map/SpotsMap.js';
// import SpotsMapV2 from '../../components/Discover/map/SpotsMapV2.js';


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