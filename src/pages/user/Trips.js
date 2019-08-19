import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import withAuth from '../../components/Auth/withAuth';
// import spotsService from '../../services/spots-service';
import tripsService from '../../services/trips-service';
// import mapboxService from '../../services/mapbox-service';
import withCoordinates from '../../components/Location/withCoordinates';


class Trips extends Component {

  state = {
    trips: [],
  }

  componentDidMount(){
  // trips del usuario
  tripsService.getUserTrips()
  .then(response => {
    console.log(response)
    this.setState({
      trips: response.listOfTrips.trips
    })
  })
  }


  render() {
    return (
      <React.Fragment>
        <h1>Trips</h1>
        <Link to={'/trips/new'}> Add Trip</Link>
        {this.state.trips.map((trip, i) => {
          return <p key={i}>{trip}</p>
        })}
      </React.Fragment>
    )
  }
}

export default withCoordinates(withAuth(Trips));