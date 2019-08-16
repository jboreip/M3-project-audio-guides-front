import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import SpotsMap from '../../components/Discover/map/SpotsMap.js';


class Discover extends Component {
  render() {
    return (
        <SpotsMap />
    )
  }
}

export default withAuth(Discover);