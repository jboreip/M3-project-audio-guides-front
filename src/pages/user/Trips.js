import React, { Component } from 'react'
import withAuth from '../../components/Auth/withAuth';
import spotsService from '../../services/spots-service';
import tripsService from '../../services/trips-service';
import mapboxService from '../../services/mapbox-service';
import withCoordinates from '../../components/Location/withCoordinates';


class Trips extends Component {

  state = {
    trips: [],
  }

  componentDidMount(){
  // trips del usuario
  console.log(this.props.user.trips)
  // const userTrips = this.props.user.trips;
  const userTrips = [1,2,3];
  this.setState({
    trips: userTrips
  })
  }


  render() {
    return (
      <React.Fragment>
        <h1>Trips</h1>
        {this.state.trips}
      </React.Fragment>
    )
  }
}

export default withCoordinates(withAuth(Trips));